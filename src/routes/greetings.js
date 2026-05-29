'use strict';

/**
 * @file    src/routes/greetings.js
 * @module  routes/greetings
 *
 * Greeting routes for the Artifact1 Express 5 tutorial server.
 *
 * This module implements the **Router pattern**: rather than declaring routes
 * inline on the application object, the endpoint definitions are encapsulated
 * in a dedicated {@link https://expressjs.com/en/5x/api.html#router express.Router}
 * instance. The application factory (`src/app.js`) mounts this router at the
 * root mount point via `app.use('/', require('./routes/greetings'))`, so the
 * router-relative paths declared below resolve to the final application routes:
 *
 *   | Method | Path            | Response body |
 *   | ------ | --------------- | ------------- |
 *   | GET    | `/`             | `Hello world` |
 *   | GET    | `/good-evening` | `Good evening`|
 *
 * Implementation notes:
 * - **CommonJS only.** The project does not set `"type": "module"` in
 *   `package.json`, so this file uses `require` / `module.exports` (not ESM).
 *   Using ESM here would break `require('./routes/greetings')` in `src/app.js`.
 * - **Content-Type.** `res.send(string)` sets the `Content-Type` header to
 *   `text/html; charset=utf-8` and auto-populates the `200` status code and the
 *   `Content-Length` header. The response bodies are byte-identical plain-text
 *   greetings; only the header differs from a native `text/plain` server. This
 *   is the single accepted, documented behavioral variance.
 * - **Error handling.** Both handlers are static and synchronous. Express 5
 *   automatically catches and forwards synchronous exceptions to its error
 *   pipeline, so no `try/catch` or `next(err)` plumbing is required here.
 * - **Routing-syntax safety.** The literal paths `/` and `/good-evening`
 *   contain no path-to-regexp tokens, so Express 5's path-matching changes do
 *   not affect them.
 */

// Acquire a fresh Express Router instance. `express` is the sole external
// runtime dependency (declared as `express ^5.2.1` in the root package.json);
// this module has no in-repo dependencies.
const router = require('express').Router();

/**
 * GET / — baseline greeting endpoint.
 *
 * Responds with the exact plain-text body `Hello world` and HTTP status 200.
 *
 * @name    GET /
 * @function
 * @param   {import('express').Request}  req - The incoming HTTP request.
 * @param   {import('express').Response} res - The outgoing HTTP response.
 * @returns {import('express').Response} The response carrying the greeting body.
 */
router.get('/', (req, res) => res.send('Hello world'));

/**
 * GET /good-evening — evening greeting endpoint.
 *
 * Responds with the exact plain-text body `Good evening` and HTTP status 200.
 *
 * @name    GET /good-evening
 * @function
 * @param   {import('express').Request}  req - The incoming HTTP request.
 * @param   {import('express').Response} res - The outgoing HTTP response.
 * @returns {import('express').Response} The response carrying the greeting body.
 */
router.get('/good-evening', (req, res) => res.send('Good evening'));

/**
 * Export the configured router so the application factory (`src/app.js`) can
 * mount it. The export is the `express.Router` instance itself (a middleware
 * function), satisfying the consumer contract
 * `app.use('/', require('./routes/greetings'))`.
 *
 * @type {import('express').Router}
 */
module.exports = router;
