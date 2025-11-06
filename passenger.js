#!/usr/bin/env node

/**
 * Passenger Entry Point for Next.js
 *
 * Este archivo exporta un servidor HTTP que Passenger puede controlar.
 * NO llama a .listen() porque Passenger maneja eso automáticamente.
 */

const { createServer } = require("http")
const { parse } = require("url")
const next = require("next")
const PhusionPassenger = require("phusion-passenger")

const dev = process.env.NODE_ENV !== "production"
const hostname = "localhost"
const port = Number.parseInt(process.env.PORT || "3000", 10)

// Inicializar Next.js
const app = next({ dev, hostname, port, customServer: true })
const handle = app.getRequestHandler()

// Variable para rastrear si Next.js está listo
let isReady = false
const readyPromise = app
  .prepare()
  .then(() => {
    isReady = true
    console.log("[v0] Next.js is ready")
    return true
  })
  .catch((err) => {
    console.error("[v0] Error preparing Next.js:", err)
    throw err
  })

// Crear el servidor HTTP
const server = createServer(async (req, res) => {
  try {
    // Esperar a que Next.js esté listo
    if (!isReady) {
      await readyPromise
    }

    const parsedUrl = parse(req.url, true)
    await handle(req, res, parsedUrl)
  } catch (err) {
    console.error("[v0] Error handling request:", err)
    res.statusCode = 500
    res.end("Internal Server Error")
  }
})

// Passenger controlará el puerto y el inicio del servidor
if (typeof PhusionPassenger !== "undefined") {
  PhusionPassenger.configure({ autoInstall: false })
}

module.exports = server
