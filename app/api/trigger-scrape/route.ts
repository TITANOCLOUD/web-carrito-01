import { NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

export async function POST(request: Request) {
  try {
    // Verificar authorization si quieres proteger el endpoint
    const authHeader = request.headers.get("authorization")
    const expectedAuth = process.env.SCRAPER_SECRET || "dev-secret-key"

    if (authHeader !== `Bearer ${expectedAuth}`) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    console.log("[v0] Ejecutando scraper manualmente...")

    const { stdout, stderr } = await execAsync("npx tsx scripts/cloud-status-scraper.ts")

    console.log("[v0] Scraper completado:", stdout)
    if (stderr) console.error("[v0] Stderr:", stderr)

    return NextResponse.json({
      success: true,
      message: "Scraper ejecutado exitosamente",
      timestamp: new Date().toISOString(),
      output: stdout,
    })
  } catch (error: any) {
    console.error("[v0] Error ejecutando scraper:", error)
    return NextResponse.json(
      {
        error: "Error al ejecutar el scraper",
        details: error.message,
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  const fs = require("fs")
  const path = require("path")

  const statusPath = path.join(process.cwd(), "data", "cloud-status.json")
  const historyPath = path.join(process.cwd(), "data", "cloud-history.json")

  const statusExists = fs.existsSync(statusPath)
  const historyExists = fs.existsSync(historyPath)

  let lastUpdate = null
  if (statusExists) {
    const data = JSON.parse(fs.readFileSync(statusPath, "utf-8"))
    lastUpdate = data.updatedAt ? new Date(data.updatedAt).toISOString() : null
  }

  return NextResponse.json({
    scraperConfigured: true,
    dataFilesExist: {
      status: statusExists,
      history: historyExists,
    },
    lastUpdate,
    recommendation: statusExists
      ? "✅ Scraper funcionando correctamente"
      : "⚠️ Ejecuta: npx tsx scripts/cloud-status-scraper.ts",
  })
}
