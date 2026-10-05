const custom = require("eslint-config-custom")

module.exports = [
  { ignores: ["dist/**", "bin/**"] },
  ...custom,
  {
    rules: {
      "no-restricted-properties": [
        "error",
        {
          object: "process",
          property: "exit",
          message:
            "Throw (UserError for user conditions) or set process.exitCode; index.ts flushes telemetry before the process ends.",
        },
      ],
    },
  },
]
