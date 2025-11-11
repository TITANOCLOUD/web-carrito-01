import { type NextRequest, NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  try {
    const { host } = await request.json()

    if (!host) {
      return NextResponse.json({ error: "Host is required" }, { status: 400 })
    }

    try {
      // Usar comando ping según el sistema operativo
      // -c 4 = 4 paquetes (Linux/Mac), -n 4 = 4 paquetes (Windows)
      const isWindows = process.platform === "win32"
      const pingCommand = isWindows ? `ping -n 4 ${host}` : `ping -c 4 ${host}`

      const { stdout, stderr } = await execAsync(pingCommand, { timeout: 10000 })

      // Parsear resultado del ping
      let packetsLost = 0
      let avgTime = 0
      let minTime = 0
      let maxTime = 0
      let ttl = 64

      if (isWindows) {
        // Parsear salida de Windows
        const lossMatch = stdout.match(/(\d+)% loss/)
        if (lossMatch) packetsLost = Number.parseInt(lossMatch[1])

        const timeMatch = stdout.match(/Average = (\d+)ms/)
        if (timeMatch) avgTime = Number.parseInt(timeMatch[1])

        const ttlMatch = stdout.match(/TTL=(\d+)/)
        if (ttlMatch) ttl = Number.parseInt(ttlMatch[1])
      } else {
        // Parsear salida de Linux/Mac
        const lossMatch = stdout.match(/(\d+)% packet loss/)
        if (lossMatch) packetsLost = Number.parseInt(lossMatch[1])

        const statsMatch = stdout.match(/min\/avg\/max\/[a-z]+ = ([\d.]+)\/([\d.]+)\/([\d.]+)/)
        if (statsMatch) {
          minTime = Number.parseFloat(statsMatch[1])
          avgTime = Number.parseFloat(statsMatch[2])
          maxTime = Number.parseFloat(statsMatch[3])
        }

        const ttlMatch = stdout.match(/ttl=(\d+)/)
        if (ttlMatch) ttl = Number.parseInt(ttlMatch[1])
      }

      return NextResponse.json({
        alive: packetsLost < 100,
        time: avgTime,
        minTime: minTime,
        maxTime: maxTime,
        packetsLost: packetsLost,
        ttl: ttl,
        host: host,
        rawOutput: stdout,
      })
    } catch (error: any) {
      // Si el ping falla, el host está down
      return NextResponse.json({
        alive: false,
        time: -1,
        packetsLost: 100,
        ttl: 0,
        host: host,
        error: "Host unreachable",
      })
    }
  } catch (error: any) {
    console.error("Error en ping:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
