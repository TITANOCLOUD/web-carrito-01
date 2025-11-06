#!/usr/bin/env node

/**
 * Passenger Entry Point for Next.js Standalone
 *
 * Este archivo es el punto de entrada para Passenger.
 * Inicia el servidor Next.js en modo standalone.
 */

const { createServer } = require("http")
const { parse } = require("url")
const next = require("./.next/standalone/server.js")

const dev = process.env.NODE_ENV !== "production"
const hostname = process.env.HOSTNAME || "localhost"
const port = process.env.PORT || 3000

// Iniciar el servidor Next.js
const app = next({
  dev,
  hostname,
  port,
})

const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error("Error occurred handling", req.url, err)
      res.statusCode = 500
      res.end("Internal server error")
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
