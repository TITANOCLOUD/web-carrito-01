import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { host } = await request.json()

    if (!host) {
      return NextResponse.json({ error: "Host is required" }, { status: 400 })
    }

    console.log("[v0] Ejecutando traceroute a:", host)

    // Simular traceroute con datos realistas
    // En producción, esto se conectaría a un servicio real de traceroute
    const hops = []
    const hopCount = Math.floor(Math.random() * 10) + 5

    for (let i = 1; i <= hopCount; i++) {
      hops.push({
        hop: i,
        ip: `192.168.${i}.${Math.floor(Math.random() * 255)}`,
        hostname: `hop${i}.network.example.com`,
        rtt: [Math.random() * 50 + 10, Math.random() * 50 + 10, Math.random() * 50 + 10],
      })
    }

    // Último hop es el destino
    hops.push({
      hop: hopCount + 1,
      ip: host,
      hostname: host,
      rtt: [Math.random() * 20 + 5, Math.random() * 20 + 5, Math.random() * 20 + 5],
    })

    return NextResponse.json({
      host: host,
      hops: hops,
      complete: true,
    })
  } catch (error: any) {
    console.error("[v0] Error en traceroute:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
