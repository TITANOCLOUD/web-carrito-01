import { NextResponse } from "next/server"
import { scrapeAllProviders, getAllActiveIncidents } from "@/scripts/cloud-status-scraper-v2"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    console.log("[v0] Obteniendo incidentes activos...")

    // Scrapear datos de todas las fuentes
    const cloudStatuses = await scrapeAllProviders()

    // Extraer incidentes activos
    const activeIncidents = getAllActiveIncidents(cloudStatuses)

    console.log(`[v0] Incidentes activos encontrados: ${activeIncidents.length}`)

    return NextResponse.json({
      updatedAt: Date.now(),
      incidents: activeIncidents,
      count: activeIncidents.length,
    })
  } catch (error) {
    console.error("[v0] Error obteniendo incidentes:", error)

    // Retornar array vacío si hay error
    return NextResponse.json({
      updatedAt: Date.now(),
      incidents: [],
      count: 0,
    })
  }
}
