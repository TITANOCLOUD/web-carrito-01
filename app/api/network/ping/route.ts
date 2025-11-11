import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { host } = await request.json()

    if (!host) {
      return NextResponse.json({ error: "Host is required" }, { status: 400 })
    }

    console.log("[v0] Ejecutando ping a:", host)

    const startTime = Date.now()

    // Usar fetch para verificar conectividad (alternativa a ping real)
    try {
      const response = await fetch(`http://${host}`, {
        method: "HEAD",
        signal: AbortSignal.timeout(5000),
      })

      const endTime = Date.now()
      const time = endTime - startTime

      return NextResponse.json({
        alive: true,
        time: time,
        host: host,
      })
    } catch (error) {
      const endTime = Date.now()
      const time = endTime - startTime

      return NextResponse.json({
        alive: false,
        time: time,
        host: host,
        error: "Host unreachable",
      })
    }
  } catch (error: any) {
    console.error("[v0] Error en ping:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
