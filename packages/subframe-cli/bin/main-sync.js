#! /usr/bin/env node

/**
 * Entrypoint for the CLI
 */

/**
 * Taken from https://davidwalsh.name/window-crypto-node
 * Shim is needed because we use the uuid package, which uses window.crypto
 */
const crypto = require("crypto").webcrypto

// Shims the crypto property onto global
global.crypto = crypto

// fetch-polyfill.js taken from https://github.com/node-fetch/node-fetch?tab=readme-ov-file#providing-global-access
const fetch = require("node-fetch")

if (!globalThis.fetch) {
  globalThis.fetch = fetch
  globalThis.Headers = fetch.Headers
  globalThis.Request = fetch.Request
  globalThis.Response = fetch.Response
}

require("../dist/index.js")
