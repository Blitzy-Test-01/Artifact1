# Artifact1 — Express Greeting Server

A minimal Node.js server built with [Express](https://expressjs.com/) that exposes two plain-text greeting endpoints.

## Requirements

- Node.js `>= 18` (required by Express 5). The target runtime is Node.js 22.x LTS.

## Installation

Install the dependencies (Express `^5.2.1`):

```bash
npm install
```

## Running the server

Start the server with:

```bash
npm start
```

This runs `node src/index.js`. The server listens on the port from the `PORT` environment variable, defaulting to `3000`. You can override it, for example:

```bash
PORT=8080 npm start
```

## Endpoints

| Method | Path | Response body (HTTP 200) |
|---|---|---|
| GET | `/` | `Hello world` |
| GET | `/good-evening` | `Good evening` |

## Verify

With the server running, request each endpoint:

```bash
curl http://localhost:3000/
# -> Hello world

curl http://localhost:3000/good-evening
# -> Good evening
```
