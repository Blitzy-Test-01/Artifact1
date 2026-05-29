# Artifact1

A minimal Node.js HTTP server built with the [Express 5](https://expressjs.com/) web framework. It exposes two plain-text greeting endpoints and is intentionally small, serving as a tutorial-style example of an idiomatic Express project. The project uses CommonJS modules (`require` / `module.exports`).

## Endpoints

| Method | Path | Response body |
|--------|------|---------------|
| GET | `/` | `Hello world` |
| GET | `/good-evening` | `Good evening` |

Responses are sent via Express's `res.send`, which uses the default `Content-Type: text/html; charset=utf-8` header. The response bodies themselves are the exact plain-text strings shown above.

## Prerequisites

- **Node.js `>=18`** — required by Express 5, which dropped support for Node.js versions older than 18. This matches the `engines.node` field in [`package.json`](./package.json).
- **npm** — bundled with Node.js; used to install dependencies and run the server.

## Installation

Install the project's dependencies (this installs `express ^5.2.1` and generates `package-lock.json` along with the `node_modules/` directory):

```bash
npm install
```

## Running the server

Start the server with:

```bash
npm start
```

This runs `node src/index.js`. The server listens on the port defined by the `PORT` environment variable, falling back to `3000` (`process.env.PORT || 3000`). By default it is available at `http://localhost:3000`.

## Smoke test

With the server running, verify both endpoints:

```bash
curl -s http://localhost:3000/              # Hello world
curl -s http://localhost:3000/good-evening  # Good evening
```

## Project structure

```text
.
├── package.json            # Project manifest: express dependency and "start" script
├── package-lock.json       # Locked dependency tree
├── .gitignore              # Ignores node_modules/, logs, and .env
├── README.md               # This file
└── src/
    ├── index.js            # Bootstrap: requires the app and calls app.listen(PORT)
    ├── app.js              # Express application factory: creates the app and mounts the router
    └── routes/
        └── greetings.js    # express.Router defining GET / and GET /good-evening
```

The layout follows two common Express conventions: the application definition (`src/app.js`) is separated from the process bootstrap (`src/index.js`), and the routes are extracted into a dedicated router module (`src/routes/greetings.js`).
