export const runtime = "nodejs"

// API para recibir métricas de los servidores
export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validar que venga el API key correcto
    const authHeader = request.headers.get("authorization")
    const apiKey = authHeader?.replace("Bearer ", "")

    // TODO: Validar API key contra base de datos
    // if (!isValidApiKey(apiKey)) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    console.log("[v0] Recibiendo métricas del servidor:", data.hostId)

    // Estructura esperada de datos
    const metrics = {
      hostId: data.hostId,
      timestamp: new Date().toISOString(),
      cpu: {
        usage: data.cpu.usage,
        cores: data.cpu.cores,
        model: data.cpu.model,
        vendor: data.cpu.vendor,
      },
      memory: {
        total: data.memory.total,
        used: data.memory.used,
        free: data.memory.free,
        cached: data.memory.cached,
      },
      disks: data.disks || [],
      network: {
        interfaces: data.network.interfaces || [],
        totalRx: data.network.totalRx || 0,
        totalTx: data.network.totalTx || 0,
      },
      system: {
        osVersion: data.system.osVersion,
        uptime: data.system.uptime,
        hostname: data.system.hostname,
        kernelVersion: data.system.kernelVersion,
      },
      hardware: data.hardware || [],
      ping: data.ping || null,
    }

    // TODO: Guardar en base de datos MariaDB
    // await saveMetrics(metrics)

    console.log("[v0] Métricas guardadas correctamente para", data.hostId)

    return Response.json({
      success: true,
      message: "Metrics received",
      timestamp: metrics.timestamp,
    })
  } catch (error) {
    console.error("[v0] Error al procesar métricas:", error)
    return Response.json(
      {
        success: false,
        error: "Failed to process metrics",
      },
      { status: 500 },
    )
  }
}
