'use strict';

/**
 * @file    src/index.js
 * @module  index
 *
 * Process entry point / HTTP server bootstrap for the Artifact1 Express 5
 * tutorial server.
 *
 * This module is the executable referenced by the root `package.json` `"main"`
 * field and invoked by its `"start"` script (`node src/index.js`). Running it
 * boots the HTTP server and begins accepting connections.
 *
 * Design pattern applied:
 *
 * - **App / server separation.** This file owns ONLY the process-level concern
 *   of binding the configured Express application to an HTTP listening socket.
 *   The application itself — middleware registration and route mounting — is
 *   defined and exported by {@link module:app} (`src/app.js`), which is kept
 *   transport-agnostic and therefore independently unit-testable without
 *   opening a real network socket. Concentrating the `listen` call here keeps
 *   that separation clean: `src/app.js` answers "what the application does" and
 *   this module answers "how the process exposes it over HTTP".
 *
 * - **Configuration via environment.** The listening port is resolved from the
 *   `PORT` environment variable with a `3000` fallback, avoiding a hardcoded
 *   environment coupling while keeping the tutorial runnable with zero
 *   configuration.
 *
 * Scope discipline (per AAP §0.2.2 / §0.7.1): this bootstrap intentionally adds
 * NO clustering, graceful-shutdown handlers, signal traps, HTTPS termination,
 * `.env` file loading, or any other infrastructure. Its single responsibility
 * is to listen. Route handlers and middleware are deliberately NOT defined here
 * — they live in `src/app.js` and `src/routes/greetings.js`.
 *
 * Module system: **CommonJS.** The root `package.json` does not set
 * `"type": "module"`, so this file uses `require` (not ESM `import`). Using ESM
 * here would break the `node src/index.js` start contract and the
 * `require('./app')` resolution below.
 */

// Internal dependency: the fully configured Express application instance.
// Resolves to `src/app.js`, which exports the assembled `app` (with the
// greetings router already mounted) via `module.exports = app`. The app is
// transport-agnostic and performs no `listen` of its own — that is this
// module's job.
const app = require('./app');

/**
 * The TCP port the HTTP server binds to.
 *
 * Resolved from the `PORT` environment variable so the port can be overridden
 * per deployment environment (e.g. `PORT=8080 npm start`); when `PORT` is unset
 * or empty it falls back to `3000`, the documented default (AAP §0.1.1 /
 * §0.7.2). `process.env.PORT` is always a string when present, which Node's
 * `server.listen` accepts directly.
 *
 * @type {string|number}
 */
const PORT = process.env.PORT || 3000;

// Bind the configured application to the resolved port and begin accepting
// connections. `app.listen` is an Express convenience that internally creates a
// Node `http.Server` wrapping the application and starts it listening — the
// drop-in equivalent of `http.createServer(app).listen(PORT)`. The callback
// fires once the socket is bound and logs the active port for tutorial
// clarity, making it obvious where to send requests (e.g.
// `curl http://localhost:3000/`).
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
