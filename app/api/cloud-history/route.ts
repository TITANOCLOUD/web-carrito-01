import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")

    const historyPath = path.join(process.cwd(), "data", "cloud-history.json")

    if (!fs.existsSync(historyPath)) {
      console.log("[v0] cloud-history.json no existe, usando datos mock")
      return NextResponse.json(generateMockHistory(slug))
    }

    const history = JSON.parse(fs.readFileSync(historyPath, "utf-8"))

    // Si se solicita un slug específico, devolver solo ese
    if (slug) {
      const filtered: Record<string, any> = {}
      Object.keys(history).forEach((key) => {
        if (key.startsWith(`${slug}_`)) {
          filtered[key] = history[key]
        }
      })
      return NextResponse.json(filtered)
    }

    return NextResponse.json(history)
  } catch (error) {
    console.error("[v0] Error reading cloud history:", error)
    return NextResponse.json(generateMockHistory(null))
  }
}

function generateMockHistory(slug: string | null) {
  const providers = slug
    ? [slug]
    : ["aws", "azure", "google-cloud", "oracle-cloud", "huawei-cloud", "alibaba-cloud", "ovhcloud", "vultr", "linode"]

  const history: Record<string, any[]> = {}
  const now = Date.now()

  providers.forEach((p) => {
    const key = `${p}_downdetector.com`
    history[key] = []

    // Generar 24 puntos de datos (últimas 2 horas, cada 5 minutos)
    for (let i = 24; i >= 0; i--) {
      history[key].push({
        ts: now - i * 5 * 60 * 1000,
        reports: Math.floor(Math.random() * 150),
      })
    }
  })

  return history
}
