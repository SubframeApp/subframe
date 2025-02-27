#!/usr/bin/env node
import 'isomorphic-fetch';
import 'isomorphic-webcrypto';
import { Command, Option, program } from '@commander-js/extra-typings';
import { readFileSync, existsSync } from 'node:fs';
import { readFile, writeFile, mkdir, stat, rm, readdir } from 'node:fs/promises';
import { join, resolve, relative, dirname } from 'node:path';
import prompts from 'prompts';
import { parse, assign, stringify } from 'comment-json';
import detectIndent from 'detect-indent';
import ora, { oraPromise } from 'ora';
import retry from 'fetch-retry';
import XDGAppPaths from 'xdg-app-paths';
import chalk from 'chalk';
import { execa } from 'execa';
import { coerce, lt } from 'semver';
import { detect } from '@antfu/ni';
import { Analytics } from '@segment/analytics-node';
import degit from 'degit';
import { ts, Project, printNode } from 'ts-morph';

const IGNORE_UPDATE_KEYWORD = "@subframe/sync-disable";
const DEFAULT_SUBFRAME_TS_ALIAS = "@/ui";
const ROOT_FOLDER_NAME = "ui";

async function hasAliasSetup(tsConfigPath, aliases) {
  try {
    const tsConfig = await readFile(tsConfigPath, "utf-8");
    const parsed = parse(tsConfig);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Could not parse tsconfig.json, invalid config file");
    }
    const compilerOptions = "compilerOptions" in parsed && typeof parsed.compilerOptions === "object" && parsed.compilerOptions !== null ? parsed.compilerOptions : {};
    const paths = "paths" in compilerOptions && typeof compilerOptions.paths === "object" && compilerOptions.paths !== null ? compilerOptions.paths : {};
    return Object.keys(aliases).every((alias) => {
      if (!(alias in paths)) {
        return false;
      }
      const aliasPaths = paths[alias] || [];
      return aliasPaths.length === aliases[alias].length;
    });
  } catch (e) {
    return false;
  }
}
async function addAliasesToTSConfig(tsConfigPath, aliases) {
  try {
    const tsConfig = await readFile(tsConfigPath, "utf-8");
    const indent = detectIndent(tsConfig).indent || 2;
    const parsed = parse(tsConfig);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Could not parse tsconfig.json, invalid config file");
    }
    const compilerOptions = "compilerOptions" in parsed && typeof parsed.compilerOptions === "object" && parsed.compilerOptions !== null ? parsed.compilerOptions : {};
    const updated = assign(parsed, {
      compilerOptions: assign(compilerOptions, {
        paths: assign("paths" in compilerOptions ? compilerOptions.paths : {}, aliases)
      })
    });
    await writeFile(tsConfigPath, stringify(updated, null, indent));
  } catch (e) {
    const warningMessage = ["Subframe could not automatically configure your tsconfig.json"].join("\n");
    console.warn(warningMessage);
  }
}

const AUTOINSTALLED_DEPENDENCIES = { "@subframe/core": "latest" };
const SUBFRAME_DIR = ".subframe";
const SYNC_SETTINGS_FILENAME = "sync.json";
const ACCESS_TOKEN_FILENAME = "access-token";
const SUBFRAME_SYNC_MESSAGE = "Subframe - all changes synced";
const SUBFRAME_INIT_MESSAGE = "Subframe - initialized successfully";
const MALFORMED_INIT_MESSAGE = "It looks like you need to first run the init command to setup your codebase for Subframe CLI.\nYou can do so by following the instructions here:\n\nhttps://app.subframe.com/library?component=installation";
const MULTIPLE_PROJECTS_SUGGESTION = "We suggest using a separate package for each project. If you want to start fresh, you can run the CLI init again. You can find instructions here:\n\nhttps://app.subframe.com/library?component=installation";
const WRONG_PROJECT_MESSAGE = `
t seems you're trying to sync with a project that doesn't match the project in your current Subframe settings (sync.json)

${MULTIPLE_PROJECTS_SUGGESTION}
`;

function abortOnState(state) {
  if (state.aborted) {
    process.nextTick(() => {
      process.exit(0);
    });
  }
}

async function exists(path) {
  const pathStat = await stat(path).catch(() => null);
  if (!pathStat) {
    return false;
  }
  return true;
}
async function isDirectory(path) {
  const pathStat = await stat(path).catch(() => null);
  if (!pathStat) {
    return false;
  }
  return pathStat.isDirectory();
}
async function mkdirIfNotExist(path) {
  if (!await isDirectory(path)) {
    await mkdir(path, { recursive: true });
  }
}

function getLocalSyncSettings(cwd) {
  try {
    const contents = readFileSync(join(cwd, SUBFRAME_DIR, SYNC_SETTINGS_FILENAME), "utf-8");
    const parsed = JSON.parse(contents);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return null;
    }
    return parsed;
  } catch (e) {
    return null;
  }
}
async function setupSyncSettings(cwd, options, initOptions) {
  const subframeDirPath = join(cwd, SUBFRAME_DIR);
  const syncSettingsPath = join(subframeDirPath, SYNC_SETTINGS_FILENAME);
  const accessTokenPath = join(subframeDirPath, ACCESS_TOKEN_FILENAME);
  if (await exists(accessTokenPath)) {
    await rm(accessTokenPath);
  }
  const tsConfigPath = join(cwd, "tsconfig.json");
  const subframeDirExists = await isDirectory(subframeDirPath);
  if (!subframeDirExists) {
    await mkdir(subframeDirPath);
  }
  const config = {
    directory: options.directory,
    importAlias: options.importAlias,
    projectId: options.projectId
  };
  if (!options.directory) {
    prompts.override({
      directory: initOptions.dir
    });
    const response = await prompts({
      type: "text",
      name: "directory",
      initial: "./src",
      message: "Where should the Subframe components be synced to?",
      validate: (value) => {
        return existsSync(join(cwd, value)) ? true : `Directory ${value} does not exist`;
      },
      onState: abortOnState
    });
    config.directory = "./" + join(response.directory, ROOT_FOLDER_NAME);
  }
  if (!options.importAlias) {
    prompts.override({
      componentsDirAlias: initOptions.alias
    });
    const response = await prompts({
      type: "text",
      name: "componentsDirAlias",
      initial: `${DEFAULT_SUBFRAME_TS_ALIAS}/*`,
      message: `Configure an alias for the subframe component directory (e.g. ${DEFAULT_SUBFRAME_TS_ALIAS})`,
      validate: (value) => {
        return typeof value === "string" && value.endsWith("/*") ? true : "Alias must end with '/*' so that it matches all files in the directory";
      },
      onState: abortOnState
    });
    if (response.componentsDirAlias && config.directory) {
      config.importAlias = response.componentsDirAlias;
      const aliases = {
        /** just the one alias for now */
        [response.componentsDirAlias]: [`${config.directory}/*`]
      };
      if (await exists(tsConfigPath)) {
        const isSetup = await hasAliasSetup(tsConfigPath, aliases);
        if (!isSetup) {
          await addAliasesToTSConfig(tsConfigPath, aliases);
        }
      }
    }
  }
  await writeFile(syncSettingsPath, JSON.stringify(config, null, 2));
  return {
    directory: config.directory,
    importAlias: config.importAlias,
    projectId: options.projectId
  };
}

const isDev = process.argv.includes("--dev");
const cwd = process.cwd();
const localSyncSettings = getLocalSyncSettings(cwd);

const CLI_AUTH_ROUTE = "/cli/auth";

function prepareHttpBody(body, headers) {
  if (headers?.["Content-Type"] === "application/json") {
    return JSON.stringify(body);
  }
  return body;
}
const MAX_RETRIES = 3;
const fetchWithRetries = retry(fetch, {
  retries: MAX_RETRIES,
  retryDelay: (attempt) => {
    return Math.pow(2, attempt) * 1e3;
  },
  retryOn: function(attempt, error, response) {
    return attempt < MAX_RETRIES && Boolean(error !== null || response && response.status >= 400);
  }
});
const http = async (url, {
  method,
  body,
  headers = {
    "Content-Type": "application/json"
  }
}) => {
  const response = await fetchWithRetries(url, {
    method,
    headers,
    body: body ? prepareHttpBody(body, headers) : void 0
  });
  if (response.ok) {
    return response.json();
  } else {
    const { message } = await response.json();
    throw new Error(message);
  }
};

const BASE_URL$1 = isDev ? "http://localhost:6501" : "https://app.subframe.com";
async function apiVerifyToken(token) {
  const search = new URLSearchParams();
  search.set("token", token);
  const url = `${BASE_URL$1}/api/cli/verify?${search.toString()}`;
  const response = await http(url, { method: "GET" });
  return response.success;
}
async function apiInitProject({ token, truncatedProjectId }) {
  return http(`${BASE_URL$1}/api/cli/init`, {
    method: "POST",
    body: { token, truncatedProjectId }
  });
}
async function apiUpdateImportAlias({ token, truncatedProjectId, importAlias }) {
  const response = await http(`${BASE_URL$1}/api/cli/import-alias`, {
    method: "POST",
    body: { token, truncatedProjectId, importAlias }
  });
  return response.success;
}
async function apiSyncProject({ token, truncatedProjectId, components, importAlias }) {
  return http(`${BASE_URL$1}/api/cli/sync`, {
    method: "POST",
    body: { token, truncatedProjectId, components, importAlias }
  });
}

const SUBFRAME_DIRECTORY = XDGAppPaths("com.subframe.cli").dataDirs()[0];
const SUBFRAME_AUTH_CONFIG_PATH = join(SUBFRAME_DIRECTORY, "auth.json");
function isAuthConfig(config) {
  return typeof config === "object" && config !== null && typeof config.token === "string";
}
async function readAuthConfig() {
  try {
    if (!await exists(SUBFRAME_AUTH_CONFIG_PATH)) {
      return null;
    }
    const config = JSON.parse(await readFile(SUBFRAME_AUTH_CONFIG_PATH, "utf8"));
    if (!isAuthConfig(config)) {
      return null;
    }
    return config;
  } catch (err) {
    return null;
  }
}
async function writeAuthConfig(authConfig) {
  mkdir(SUBFRAME_DIRECTORY, { recursive: true });
  writeFile(SUBFRAME_AUTH_CONFIG_PATH, JSON.stringify(authConfig, null, 2));
}

const highlight = chalk.cyan;
const link = chalk.cyan.underline;
chalk.green;

const BASE_URL = isDev ? "http://localhost:6501" : "https://app.subframe.com";
async function verifyToken(token) {
  try {
    const isValid = await apiVerifyToken(token);
    return isValid;
  } catch (error) {
    throw new Error("Failed to authenticate with Subframe");
  }
}
async function verifyTokenWithOra(token) {
  try {
    await oraPromise(verifyToken(token), {
      prefixText: "",
      text: "Authenticating with Subframe",
      successText: "Authenticated",
      failText: "Failed to authenticate"
    });
    return true;
  } catch (error) {
    return false;
  }
}
async function getAccessToken() {
  const authConfig = await readAuthConfig();
  if (authConfig && await verifyTokenWithOra(authConfig.token)) {
    return authConfig.token;
  }
  if (!authConfig) {
    console.log("> No existing credentials found.");
  } else {
    console.log("> Credentials are no longer valid.");
  }
  console.log("> To get new credentials, please visit the following URL in your web browser:");
  console.log(`> ${link(`${BASE_URL}${CLI_AUTH_ROUTE}`)}`);
  console.log();
  console.log("> You will need to login then enter the provided credentials below.");
  const { token } = await prompts({
    type: "text",
    name: "token",
    message: "Access token",
    validate: async (token2) => {
      const isValid = await verifyTokenWithOra(token2);
      return isValid ? true : `Invalid token`;
    },
    onState: abortOnState
  });
  await writeAuthConfig({ token });
  return token;
}

async function getInstalledPackageVersion(packageName, cwd) {
  try {
    const packageJSON = JSON.parse(
      await readFile(`${cwd}/package.json`, "utf-8")
    );
    if (!packageJSON.dependencies) {
      return null;
    }
    if (!packageJSON.dependencies[packageName]) {
      return null;
    }
    return packageJSON.dependencies[packageName];
  } catch (e) {
    return null;
  }
}
async function getPackageManager(cwd) {
  const packageManager = await detect({ programmatic: true, cwd });
  switch (packageManager) {
    case "yarn":
    case "yarn@berry":
      return "yarn";
    case "pnpm":
    case "pnpm@6":
      return "pnpm";
    case "bun":
      return "bun";
    case "npm":
    default:
      return "npm";
  }
}
async function getLatestPackageVersion(packageName) {
  return execa("curl", [`https://registry.npmjs.org/${packageName}/latest`]).then((result) => result.stdout).then((result) => JSON.parse(result)).then((result) => result.version);
}
function makePackageSpecifier(packageName, packageVersion) {
  return `${packageName}@${packageVersion}`;
}

async function installDependencies(cwd, opts) {
  const packageManager = await getPackageManager(cwd);
  const toInstall = /* @__PURE__ */ new Map();
  for (const [packageName, packageVersion] of Object.entries(AUTOINSTALLED_DEPENDENCIES)) {
    const installedVersion = await getInstalledPackageVersion(packageName, cwd).then(coerce);
    const targetVersion = packageVersion === "latest" ? await getLatestPackageVersion(packageName) : packageVersion;
    if (!installedVersion) {
      toInstall.set(packageName, targetVersion);
    } else {
      if (installedVersion === null) {
        toInstall.set(packageName, targetVersion);
        continue;
      }
      if (lt(installedVersion, targetVersion)) {
        toInstall.set(packageName, targetVersion);
      }
    }
  }
  if (toInstall.size === 0) {
    return;
  }
  const packageSpecifiers = Array.from(toInstall.entries()).map(
    ([packageName, packageVersion]) => makePackageSpecifier(packageName, packageVersion)
  );
  prompts.override({
    install: opts.install
  });
  const response = await prompts({
    type: "confirm",
    name: "install",
    initial: true,
    message: ["Would you like to install dependencies?"].join("\n"),
    onState: abortOnState
  });
  if (!response.install) {
    return;
  }
  await execa(packageManager, [packageManager === "yarn" ? "add" : "install", ...packageSpecifiers], { cwd }).pipeStdout?.(process.stdout).pipeStderr?.(process.stderr);
}

const EXCEPTION_EVENT_NAME = "EXCEPTION_LOGGING";

function shouldEnableLogger() {
  return process.env.NODE_ENV === "production";
}
function makeNodeLogger(userId) {
  let segmentAnalytics = null;
  let currentUserId = null;
  function identifyUser(userId2) {
    currentUserId = userId2;
  }
  if (shouldEnableLogger()) {
    segmentAnalytics = new Analytics({
      writeKey: "",
      flushAt: 1
    }).on("error", console.error);
    identifyUser(userId);
  }
  function trackEventRaw(userId2, event, additionalData = {}) {
    return new Promise((resolve) => {
      if (!shouldEnableLogger()) {
        console.log("[Track Event]", event, additionalData);
        resolve();
        return;
      }
      segmentAnalytics.track({ userId: userId2 || "", event, properties: additionalData }, () => resolve());
    });
  }
  function trackEvent(event) {
    const { type, ...additionalData } = event;
    return trackEventRaw(currentUserId, type, additionalData);
  }
  async function trackEventAndFlush(event) {
    await trackEvent(event);
    await flushAndClose();
  }
  function trackWarning(event, additionalData = {}) {
    return trackEventRaw(currentUserId, `[Warning]: ${event}`, {
      ...additionalData,
      warning: true,
      raw: JSON.stringify(additionalData)
    });
  }
  async function trackWarningAndFlush(event, additionalData = {}) {
    await trackWarning(event, additionalData);
    await flushAndClose();
  }
  function trackPageView() {
    throw new Error("trackPage not implemented on server side");
  }
  function logException(error, additionalData = {}) {
    return trackEventRaw(currentUserId, EXCEPTION_EVENT_NAME, {
      ...additionalData,
      error: JSON.stringify({
        name: error.name,
        message: error.message,
        stack: error.stack,
        // taken from https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify
        raw: JSON.stringify(error, Object.getOwnPropertyNames(error))
      })
    });
  }
  async function logExceptionAndFlush(error, additionalData = {}) {
    await logException(error, additionalData);
    await flushAndClose();
  }
  async function flushAndClose() {
    if (!shouldEnableLogger()) {
      return;
    }
    return segmentAnalytics.closeAndFlush();
  }
  return {
    identifyUser,
    trackEvent,
    trackEventAndFlush,
    trackWarning,
    trackWarningAndFlush,
    trackPageView,
    logException,
    logExceptionAndFlush
  };
}

const ANONYMOUS_CLI_USER_ID = "ANONYMOUS_CLI_USER-db6a3ec1-756a-4931-acdd-ec29f531603c";
function makeCLILogger() {
  return makeNodeLogger(ANONYMOUS_CLI_USER_ID);
}

async function isInGitRepository(cwd) {
  try {
    await execa("git", ["rev-parse", "--is-inside-work-tree"], { cwd });
    return true;
  } catch (_) {
  }
  return false;
}
async function isInMercurialRepository(cwd) {
  try {
    await execa("hg", ["--cwd", ".", "root"], { cwd });
    return true;
  } catch (_) {
  }
  return false;
}
async function isDefaultBranchSet(cwd) {
  try {
    await execa("git config init.defaultBranch", { cwd });
    return true;
  } catch (_) {
  }
  return false;
}
async function tryGitInit(cwd) {
  let didInit = false;
  try {
    await execa("git", ["--version"], { cwd });
    const [inGit, inHg] = await Promise.all([isInGitRepository(cwd), isInMercurialRepository(cwd)]);
    if (inGit || inHg) {
      return false;
    }
    await execa("git", ["init"], { cwd });
    didInit = true;
    if (!isDefaultBranchSet(cwd)) {
      await execa("git", ["checkout", "-b", "main"], { cwd });
    }
    await execa("git", ["add", "-A"], { cwd });
    await execa("git", ["commit", "-m", "Initial commit from Subframe init"], { cwd });
    return true;
  } catch (e) {
    if (didInit) {
      try {
        await rm(join(cwd, ".git"), { recursive: true, force: true });
      } catch (_) {
      }
    }
    return false;
  }
}

async function cloneStarterKit({ name, type }) {
  const spinner = ora(`Cloning starter kit...`).start();
  const emitter = degit(`SubframeApp/subframe/starter-kits/${type}`);
  await emitter.clone(`${name}`);
  const projectPath = join(cwd, name);
  spinner.text = `Initializing git repository...`;
  await tryGitInit(projectPath);
  const packageJsonPath = join(projectPath, "package.json");
  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
  packageJson.name = name;
  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
  spinner.succeed(`Successfully created ${name} at ${projectPath}`);
  return projectPath;
}
async function prepareProject(cliLogger, options) {
  if (!await exists(resolve(cwd, "package.json")) || options.template !== void 0) {
    prompts.override({
      type: options.template,
      name: options.name
    });
    const { type, name } = await prompts([
      {
        type: "select",
        name: "type",
        message: `The path ${highlight(
          cwd
        )} does not contain a package.json file.
  Would you like to start a new project?`,
        choices: [
          { title: "Next.js", value: "nextjs" },
          { title: "Vite", value: "vite" },
          { title: "Astro", value: "astro" }
        ],
        initial: 0
      },
      {
        type: "text",
        name: "name",
        message: "What is your project named?",
        initial: "my-app",
        format: (value) => value.trim(),
        validate: (value) => value.length > 128 ? `Name should be less than 128 characters.` : true
      }
    ]);
    const projectPath = await cloneStarterKit({ name, type });
    cliLogger.trackEvent({ type: "cli:starter-kit_cloned", framework: type });
    return { projectPath };
  }
  return { projectPath: cwd };
}

function isDefaultExport(node) {
  if (ts.isExportAssignment(node)) {
    return true;
  }
  if (ts.isBinaryExpression(node) && ts.isPropertyAccessExpression(node.left)) {
    return node.left.expression.getText() === "module" && node.left.name.getText() === "exports";
  }
  return false;
}
function getExpressionForDefaultExport(node) {
  if (ts.isExportAssignment(node)) {
    return node.expression;
  }
  return node.right;
}

function isPresetsProperty(property) {
  if (ts.isPropertyAssignment(property) && (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) && ts.isArrayLiteralExpression(property.initializer)) {
    return property.name.text === "presets";
  }
  return false;
}
function isContentProperty(property) {
  if (ts.isPropertyAssignment(property) && (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) && ts.isArrayLiteralExpression(property.initializer)) {
    return property.name.text === "content";
  }
  return false;
}
function makeSubframeContentGlob(cwd, subframeDirPath) {
  return "./" + join(relative(cwd, subframeDirPath), "**", "*.{tsx,ts,js,jsx}");
}
function hasSubframeContentGlob(globs, cwd, subframeDirPath) {
  const subframeContentGlob = makeSubframeContentGlob(cwd, subframeDirPath);
  return globs.elements.some((element) => {
    if (ts.isStringLiteral(element)) {
      return element.text === subframeContentGlob;
    }
    return false;
  });
}
function getSuframeTailwindPresetPath(cwd, subframeDirPath) {
  return "./" + join(relative(cwd, subframeDirPath), "tailwind.config.js");
}
function makeSubframeRequire(cwd, subframeDirPath) {
  const relativeImportPath = "./" + join(relative(cwd, subframeDirPath), "tailwind.config.js");
  return ts.factory.createCallExpression(
    ts.factory.createIdentifier("require"),
    [],
    [ts.factory.createStringLiteral(relativeImportPath)]
  );
}
function hasSubframeRequire(presets, cwd, subframeDirPath) {
  const subframeRequirePath = getSuframeTailwindPresetPath(cwd, subframeDirPath);
  return presets.elements.some((element) => {
    if (ts.isCallExpression(element) && ts.isIdentifier(element.expression) && ts.isStringLiteral(element.arguments[0])) {
      return element.expression.text === "require" && element.arguments[0].text === subframeRequirePath;
    }
    return false;
  });
}

function printManualTailwindSteps(cwd, subframeDirPath, prependText) {
  const subframePresetRequire = printNode(makeSubframeRequire(cwd, subframeDirPath));
  const subframeContentGlob = makeSubframeContentGlob(cwd, subframeDirPath);
  const warningMessage = `${prependText}
1. Append the following to the presets array, or create if it doesn't exist: ${subframePresetRequire}
2. Append the following to the content array: ${subframeContentGlob}

Your end results should look something like this:

module.exports = {
  presets: [${subframePresetRequire}], // added by Subframe
  content: [
    // already existing content
    "${subframeContentGlob}", // added by Subframe
  ],
  // everything else
};
`;
  console.log("\x1B[36m%s\x1B[0m", warningMessage);
}
async function setupTailwindConfig(cwd, subframeDirPath) {
  const subframePresetRequireAST = makeSubframeRequire(cwd, subframeDirPath);
  const subframeContentGlob = makeSubframeContentGlob(cwd, subframeDirPath);
  const project = new Project({ compilerOptions: { allowJs: true } });
  project.addSourceFileAtPathIfExists(join(cwd, "tailwind.config.js"));
  const tailwindConfig = project.getSourceFile(join(cwd, "tailwind.config.js"));
  if (!tailwindConfig) {
    printManualTailwindSteps(
      cwd,
      subframeDirPath,
      "Subframe could not find a tailwind.config.js file. If you use a .ts file, you'll need to configure it manually:"
    );
    return;
  }
  const initialText = tailwindConfig.print();
  if (initialText.indexOf(
    // example: require("./<path-to-subframe>/tailwind.config.js")
    printNode(subframePresetRequireAST)
  ) !== -1 && initialText.indexOf(
    // example: "./<path-to-subframe>/**/*.{tsx,ts,js,jsx}"
    subframeContentGlob
  ) !== -1) {
    return;
  }
  const response = await prompts({
    type: "confirm",
    name: "updateTailwindConfig",
    initial: true,
    message: "Do you want Subframe to configure your Tailwind config?",
    onState: abortOnState
  });
  if (!response.updateTailwindConfig) {
    return;
  }
  transformTailwindConfigFile(tailwindConfig, cwd, subframeDirPath);
  await tailwindConfig.save();
}
function transformTailwindConfigFile(tailwindConfig, cwd, subframeDirPath) {
  const subframePresetRequireAST = makeSubframeRequire(cwd, subframeDirPath);
  const subframeContentGlob = makeSubframeContentGlob(cwd, subframeDirPath);
  const initialText = tailwindConfig.print();
  tailwindConfig.transform((traversal) => {
    const node = traversal.visitChildren();
    if (isDefaultExport(node)) {
      const exportedExpression = getExpressionForDefaultExport(node);
      if (
        // assert that the default export is an object literal:
        !ts.isObjectLiteralExpression(exportedExpression)
      ) {
        return node;
      }
      const properties = exportedExpression.properties.map((property) => {
        if (isContentProperty(property) && !hasSubframeContentGlob(property.initializer, cwd, subframeDirPath)) {
          return traversal.factory.updatePropertyAssignment(
            property,
            property.name,
            traversal.factory.createArrayLiteralExpression([
              ...property.initializer.elements,
              traversal.factory.createStringLiteral(subframeContentGlob)
            ])
          );
        }
        if (isPresetsProperty(property) && !hasSubframeRequire(property.initializer, cwd, subframeDirPath)) {
          return traversal.factory.updatePropertyAssignment(
            property,
            property.name,
            traversal.factory.createArrayLiteralExpression([
              ...property.initializer.elements,
              subframePresetRequireAST
            ])
          );
        }
        return property;
      });
      if (properties.findIndex(isContentProperty) === -1) {
        properties.push(
          traversal.factory.createPropertyAssignment(
            traversal.factory.createIdentifier("content"),
            traversal.factory.createArrayLiteralExpression([
              traversal.factory.createStringLiteral(subframeContentGlob)
            ])
          )
        );
      }
      if (properties.findIndex(isPresetsProperty) === -1) {
        properties.push(
          traversal.factory.createPropertyAssignment(
            traversal.factory.createIdentifier("presets"),
            traversal.factory.createArrayLiteralExpression([subframePresetRequireAST])
          )
        );
      }
      if (ts.isExportAssignment(node)) {
        return traversal.factory.updateExportAssignment(
          node,
          node.modifiers,
          traversal.factory.updateObjectLiteralExpression(exportedExpression, properties)
        );
      }
      return traversal.factory.updateBinaryExpression(
        node,
        node.left,
        node.operatorToken,
        traversal.factory.updateObjectLiteralExpression(exportedExpression, properties)
      );
    }
    return node;
  });
  const finalText = tailwindConfig.print();
  if (initialText === finalText) {
    printManualTailwindSteps(
      cwd,
      subframeDirPath,
      "Subframe could not automatically configure your Tailwind config. To setup manually:"
    );
    return;
  }
  tailwindConfig.formatText({
    indentSize: 2
  });
}

const initCommand = new Command().name("init").description("Initializes Subframe in your local project or sets up a new one for you").option("-z, --auth-token <auth-token>", "auth token to use").addOption(
  new Option("--template <template>", "create a new project with a specific template").choices([
    "vite",
    "nextjs",
    "astro"
  ])
).option("-n, --name <name>", "name of the project to create").option("-d, --dir <path>", "directory you want to sync your Subframe components to").option("-p, --projectId <projectId>", "project id to run sync with").option("-i, --install", "install dependencies after initializing").option("-t, --tailwind", "setup tailwind config").option("-a, --alias <alias>", "import alias to use");
initCommand.action(async (opts) => {
  const cliLogger = makeCLILogger();
  try {
    const { projectPath } = await prepareProject(cliLogger, opts);
    const truncatedProjectId = opts.projectId;
    let accessToken = opts.authToken;
    if (accessToken) {
      await verifyTokenWithOra(accessToken);
      throw new Error("Failed to authenticate with provided token");
    } else if (!accessToken) {
      accessToken = await getAccessToken();
    }
    console.time(SUBFRAME_INIT_MESSAGE);
    const { styleFile, oldImportAlias } = await oraPromise(
      apiInitProject({
        token: accessToken,
        truncatedProjectId
      }),
      {
        text: "Initializing Subframe project",
        failText: "Failed to initialize Subframe project"
      }
    );
    const { importAlias: rawImportAlias, directory } = await setupSyncSettings(
      projectPath,
      {
        directory: opts.dir ?? localSyncSettings?.directory,
        importAlias: localSyncSettings?.importAlias,
        projectId: opts.projectId ?? localSyncSettings?.projectId
      },
      opts
    );
    const importAlias = rawImportAlias.endsWith("/*") ? rawImportAlias.slice(0, -2) : rawImportAlias;
    await installDependencies(projectPath, opts);
    const rootPath = join(projectPath, directory);
    await mkdirIfNotExist(rootPath);
    const absPath = join(rootPath, styleFile.fileName);
    await writeFile(absPath, styleFile.contents);
    if (oldImportAlias !== importAlias) {
      console.log(`Change in import alias detected. Before: "${oldImportAlias}", After: "${importAlias}"`);
      console.log(
        `Syncing changes to your project settings. Any code you copy / paste from Subframe will now use the new import alias like this: import { Button } from "${importAlias}/components/Button";`
      );
      try {
        await oraPromise(
          apiUpdateImportAlias({
            token: accessToken,
            truncatedProjectId,
            importAlias
          }),
          {
            text: "Updating import alias",
            successText: "Import alias updated",
            failText: "Failed to update import alias"
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
    await setupTailwindConfig(projectPath, rootPath);
    console.timeEnd(SUBFRAME_INIT_MESSAGE);
  } catch (err) {
    console.error(err);
    await cliLogger.trackWarningAndFlush("CLI init: uncaught error", { error: err.toString() });
    await cliLogger.logExceptionAndFlush(err);
  }
});

function isFileContentsWriteable(contents) {
  return contents.indexOf(IGNORE_UPDATE_KEYWORD) < 0;
}
async function getAllAbsFilePaths(directoryPath) {
  const childrenFiles = await readdir(directoryPath);
  const allFiles = await Promise.all(
    childrenFiles.map(async (file) => {
      const absPath = join(directoryPath, file);
      if (await isDirectory(absPath)) {
        return getAllAbsFilePaths(absPath);
      } else {
        return [absPath];
      }
    })
  );
  return allFiles.flat();
}

const syncCommand = new Command().name("sync").description("syncs Subframe components to your local project").argument("[components...]", "the components to sync").option("-a, --all", "sync all components").option("-p, --projectId <projectId>", "project id to run sync with").option("-i, --install", "install dependencies after syncing").action(async (components, opts) => {
  const cliLogger = makeCLILogger();
  try {
    if (localSyncSettings?.projectId && opts.projectId && localSyncSettings.projectId !== opts.projectId) {
      await cliLogger.trackWarningAndFlush("[CLI]: sync project id mismatch");
      console.error(WRONG_PROJECT_MESSAGE);
      process.exit(1);
    }
    const truncatedProjectId = opts.projectId ?? localSyncSettings?.projectId;
    if (!localSyncSettings) {
      await cliLogger.trackWarningAndFlush("[CLI] sync local sync settings do not exist");
      console.error(MALFORMED_INIT_MESSAGE);
      process.exit(1);
    }
    const accessToken = await getAccessToken();
    const importAlias = localSyncSettings.importAlias.endsWith("/*") ? localSyncSettings.importAlias.slice(0, -2) : localSyncSettings.importAlias;
    console.time(SUBFRAME_SYNC_MESSAGE);
    const { definitionFiles, otherFiles } = await oraPromise(
      apiSyncProject({
        token: accessToken,
        truncatedProjectId,
        components,
        importAlias
      }),
      {
        text: "Syncing Subframe components",
        failText: "Failed to sync Subframe components"
      }
    );
    console.clear();
    await installDependencies(cwd, { install: opts.install });
    console.log(
      `Tip: You can ignore any updates for a specific file by adding the following comment anywhere in the file:
// ${IGNORE_UPDATE_KEYWORD}
`
    );
    const rootPath = join(cwd, localSyncSettings.directory);
    await mkdir(rootPath, { recursive: true });
    const allAbsFilePaths = await getAllAbsFilePaths(rootPath);
    const fileNamesToIgnore = /* @__PURE__ */ new Set();
    await Promise.all(
      allAbsFilePaths.map(async (fileName) => {
        const file = await readFile(fileName);
        if (isFileContentsWriteable(file)) {
          if (!components.length) {
            return rm(fileName);
          }
        } else {
          fileNamesToIgnore.add(fileName);
          console.log(`Ignoring file: ${fileName}`);
        }
      })
    );
    await Promise.all(
      definitionFiles.map(async ({ file, folderName }) => {
        const absPath = join(rootPath, folderName, file.fileName);
        if (fileNamesToIgnore.has(absPath)) {
          return null;
        }
        await mkdir(dirname(absPath), { recursive: true });
        return writeFile(absPath, file.contents);
      })
    );
    await Promise.all(
      otherFiles.map((file) => {
        const absPath = join(rootPath, file.fileName);
        if (fileNamesToIgnore.has(absPath)) {
          return null;
        }
        return writeFile(absPath, file.contents);
      })
    );
    console.timeEnd(SUBFRAME_SYNC_MESSAGE);
  } catch (err) {
    console.error(err);
    await cliLogger.trackWarningAndFlush("[CLI]: sync uncaught error", { error: err.toString() });
    await cliLogger.logExceptionAndFlush(err);
  }
});

var name = "@subframe/cli";
var version = "1.169.0";
var description = "Subframe's CLI tool for syncing your code with Subframe designs.";
var type = "module";
var scripts = {
  test: "jest",
  "test:watch": "jest --watch",
  build: "NODE_ENV=production tsc --noEmit && rollup -c rollup.config.js && npm run shebang",
  dev: "NODE_ENV=development rollup -c rollup.config.js --watch",
  start: "node bin/main-sync.js",
  "build-for-publish": "npm run build",
  "update-version": "npm version minor",
  shebang: "sed -i '' '1s/^/#!\\/usr\\/bin\\/env node\\n/' bin/main-sync.js",
  "minor-publish": "npm run build-for-publish && npm run publish-to-npm",
  "publish-to-npm": "npm publish --access public",
  ts: "tsc --noEmit",
  "ts:watch": "tsc --watch --incremental --noEmit"
};
var keywords = [
  "subframe"
];
var author = "Irvin Zhan";
var license = "ISC";
var bin = {
  "main-sync": "./bin/main-sync.js"
};
var dependencies = {
  "@antfu/ni": "0.21.8",
  "@commander-js/extra-typings": "^13.1.0",
  "@segment/analytics-node": "2.1.2",
  chalk: "4.1.2",
  commander: "^13.1.0",
  "comment-json": "4.2.3",
  degit: "^2.8.4",
  "detect-indent": "7.0.1",
  execa: "7.2.0",
  "isomorphic-fetch": "^3.0.0",
  "isomorphic-webcrypto": "^2.3.8",
  "node-fetch": "2.7.0",
  ora: "8.2.0",
  prompts: "2.4.2",
  semver: "7.6.3",
  "ts-morph": "19.0.0",
  "xdg-app-paths": "8.3.0"
};
var devDependencies = {
  "@rollup/plugin-node-resolve": "15.2.2",
  "@rollup/plugin-replace": "^6.0.2",
  "@types/degit": "^2.8.6",
  "@types/prompts": "2.4.5",
  "@types/segment-analytics": "0.0.34",
  esbuild: "^0.25.0",
  jest: "29.7.0",
  rollup: "3.29.5",
  "rollup-plugin-esbuild": "^6.2.0",
  shared: "*",
  typescript: "^5.1.3"
};
var files = [
  "bin/",
  "package.json"
];
var package_default = {
  name,
  version,
  description,
  type,
  scripts,
  keywords,
  author,
  license,
  bin,
  dependencies,
  devDependencies,
  files
};

program.version(package_default.version).description("Subframe CLI");
if (isDev) {
  program.option("--dev");
}
program.addCommand(initCommand);
program.addCommand(syncCommand);
process.env.NODE_ENV = isDev ? "development" : "production";
program.parseAsync(process.argv);
