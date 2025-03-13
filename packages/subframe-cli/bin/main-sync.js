#! /usr/bin/env node

/**
 * Entrypoint for the CLI
 */

/**
 * Taken from https://davidwalsh.name/window-crypto-node
 * Shim is needed because we use the uuid package, which uses window.crypto
 */
import "isomorphic-webcrypto"

// Polyfill fetch
import("isomorphic-fetch")

import("../dist/index.js")
