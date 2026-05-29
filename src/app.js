'use strict';

/**
 * @file    src/app.js
 * @module  app
 *
 * Express 5 application factory for the Artifact1 tutorial server.
 *
 * This module centralizes creation and configuration of the Express
 * application: it instantiates the app, mounts the greetings router, and
 * exports the single configured `app` instance. It is the structural template
 * recommended by the Express official routing documentation and community best
 * practices.
 *
 * Design patterns applied:
 *
 * - **Application factory.** Application creation, middleware registration, and
 *   route mounting are concentrated in this one module, which exports exactly
 *   one fully configured `app`. Consumers receive a ready-to-use application
 *   without needing to know how it was assembled.
 *
 * - **App / server separation.** This module is intentionally
 *   transport-agnostic: it performs NO `app.listen` call. Binding the
 *   application to an HTTP port is the sole responsibility of `src/index.js`.
 *   Keeping the listen concern out of this file makes the application
 *   independently unit-testable (e.g. with an in-process HTTP assertion library)
 *   without opening a real network socket.
 *
 * - **Router pattern.** Route handlers are NOT declared inline on the
 *   application object. Instead, the endpoint definitions live in a dedicated
 *   {@link module:routes/greetings} `express.Router`, which is mounted here.
 *   This keeps the endpoint definitions cohesive and the application factory
 *   focused on assembly rather than per-route logic.
 *
 * Mounting the greetings router at the root mount point (`'/'`) composes the
 * router-relative paths into the final application routes:
 *
 *   | Method | Path            | Response body |
 *   | ------ | --------------- | ------------- |
 *   | GET    | `/`             | `Hello world` |
 *   | GET    | `/good-evening` | `Good evening`|
 *
 * Scope and middleware discipline:
 *
 * - **No body parser.** Both endpoints are `GET` requests returning static
 *   text, so `express.json()` / `express.urlencoded()` would add no value and
 *   are deliberately omitted.
 * - **No custom 404 or error-handling middleware.** Express 5 automatically
 *   catches and forwards synchronous exceptions thrown in handlers, which fully
 *   covers these static, synchronous handlers. Requests to unmatched routes
 *   correctly receive Express's built-in `404` response — an intentional,
 *   documented behavior, not an omission.
 * - **No logging / CORS / helmet / compression.** None are required by the two
 *   greeting endpoints, so none are added (scope discipline).
 *
 * Module system: **CommonJS.** The root `package.json` does not set
 * `"type": "module"`, so this file uses `require` / `module.exports` (not ESM
 * `import` / `export`). Using ESM here would break the `require('./app')`
 * contract relied upon by `src/index.js`.
 */

// External runtime dependency: the Express web framework (declared as
// `express ^5.2.1` in the root package.json). Provides the application factory
// `express()` and the `app.use` middleware-mounting pipeline used below.
const express = require('express');

// Internal dependency: the greetings router module. Resolves to
// `src/routes/greetings.js`, which exports a configured `express.Router`
// (a mountable middleware function) defining `GET /` and `GET /good-evening`.
const greetingsRouter = require('./routes/greetings');

/**
 * The configured Express application instance.
 *
 * Created via the Express application factory. After the greetings router is
 * mounted below, this object is a complete, transport-agnostic application ready
 * to be bound to an HTTP server by `src/index.js`.
 *
 * @type {import('express').Express}
 */
const app = express();

// Mount the greetings router at the root mount point. Because the router is
// mounted at '/', its router-relative paths ('/' and '/good-evening') map
// directly onto the application's public routes. `app.use` accepts the router
// instance as middleware, keeping all route definitions encapsulated in the
// dedicated routes module (router pattern).
app.use('/', greetingsRouter);

/**
 * Export the fully configured application instance.
 *
 * The default export is the Express `app` object itself, satisfying the
 * consumer contract `const app = require('./app')` used by `src/index.js`
 * (which performs the `app.listen`). Exporting the app — rather than starting
 * the server here — preserves app/server separation and testability.
 *
 * @type {import('express').Express}
 */
module.exports = app;
