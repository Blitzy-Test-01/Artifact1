/**
 * Express application factory for the Artifact1 greeting server.
 *
 * Responsibilities (and only these — see AAP §0.4.2 / §0.5.2):
 *   1. Instantiate the Express application.
 *   2. Mount the greetings router at the base path '/'.
 *   3. Export the configured app instance.
 *
 * Deliberately excluded (out of scope per the minimal-change rule):
 *   - The HTTP listener: `app.listen(...)` lives in the bootstrap
 *     (src/index.js), keeping this factory side-effect free and reusable
 *     by tests.
 *   - Extra middleware (body parsers, CORS, Helmet, compression, logging,
 *     static serving, view/templating engines) — none are required to
 *     serve the two greeting endpoints.
 *
 * Module system: CommonJS. The root package.json intentionally omits
 * `"type": "module"`, so this file uses require()/module.exports and must
 * never use ESM import/export syntax.
 *
 * @module app
 */

'use strict';

const express = require('express');
const greetingsRouter = require('./routes/greetings');

// Create the Express application instance.
const app = express();

// Mount the greetings router at the base path '/'. The router defines:
//   GET /              -> "Hello world"
//   GET /good-evening  -> "Good evening"
app.use('/', greetingsRouter);

// Export the configured app so the bootstrap (src/index.js) can start the
// HTTP listener, and so future tests can exercise the routes in-process
// without binding to a port.
module.exports = app;
