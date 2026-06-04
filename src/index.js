/**
 * HTTP server bootstrap (entry point) for the Artifact1 greeting server.
 *
 * Sole responsibility (AAP §0.4.1 — Application group: "HTTP bootstrap;
 * reads PORT; calls app.listen"):
 *   1. Import the already-configured Express application from ./app.
 *   2. Resolve the listen port from process.env.PORT (default 3000).
 *   3. Start the HTTP listener so both greeting endpoints become reachable:
 *        GET /              -> "Hello world"
 *        GET /good-evening  -> "Good evening"
 *
 * This module is the `main` / `npm start` entry point declared in the root
 * package.json ("main": "src/index.js", "scripts": { "start": "node
 * src/index.js" }).
 *
 * Deliberately excluded (out of scope per the minimal-change rule, AAP §0.5.2):
 *   - Express instantiation and route definitions — those live in src/app.js
 *     and src/routes/greetings.js. Keeping this entry point a thin listener
 *     ensures the app stays importable by future tests without binding a port.
 *   - Clustering, graceful-shutdown handlers, env-file loaders (dotenv),
 *     logging frameworks, and error middleware.
 *
 * Module system: CommonJS. The root package.json intentionally omits
 * `"type": "module"`, so this file uses require() and must never use ESM
 * import/export syntax.
 *
 * @module index
 */

'use strict';

// Import the configured Express application (the default CommonJS export of
// the sibling application factory). The app already has the greetings router
// mounted; here we only start its HTTP listener.
const app = require('./app');

// Resolve the listen port: honor process.env.PORT when provided, otherwise
// fall back to the conventional default of 3000 (AAP §0.6 "Configurable port").
const PORT = process.env.PORT || 3000;

// Bind and start the HTTP listener. The startup callback logs a single
// confirmation line — the only side-effect permitted beyond app.listen under
// the minimal-scope rule.
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
