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
      const isWindows = process.platform === "win32"
      const traceCommand = isWindows ? `tracert -d -h 30 ${host}` : `traceroute -n -m 30 ${host}`

      const { stdout } = await execAsync(traceCommand, { timeout: 60000 })

      // Parsear resultado del traceroute
      const hops: any[] = []
      const lines = stdout.split("\n")

      for (const line of lines) {
        if (isWindows) {
          // Parsear formato Windows: "  1    <1 ms    <1 ms    <1 ms  192.168.1.1"
          const match = line.match(/^\s*(\d+)\s+(?:[\d<]+\s*ms\s+){3}([\d.]+)/)
          if (match) {
            const hopNum = Number.parseInt(match[1])
            const ip = match[2]
            const times = line.match(/(\d+)\s*ms/g) || []
            const rtt = times.map((t) => Number.parseFloat(t.replace(/\s*ms/, "")))

            hops.push({
              hop: hopNum,
              ip: ip,
              hostname: ip,
              rtt: rtt.length > 0 ? rtt : [0, 0, 0],
            })
          }
        } else {
          // Parsear formato Linux/Mac: " 1  192.168.1.1  0.567 ms  0.445 ms  0.398 ms"
          const match = line.match(/^\s*(\d+)\s+([\d.]+)\s+([\d.]+\s*ms)/)
          if (match) {
            const hopNum = Number.parseInt(match[1])
            const ip = match[2]
            const times = line.match(/([\d.]+)\s*ms/g) || []
            const rtt = times.map((t) => Number.parseFloat(t.replace(/\s*ms/, "")))

            hops.push({
              hop: hopNum,
              ip: ip,
              hostname: ip,
              rtt: rtt.length > 0 ? rtt : [0, 0, 0],
            })
          }
        }
      }

      return NextResponse.json({
        host: host,
        hops: hops,
        complete: hops.length > 0,
        rawOutput: stdout,
      })
    } catch (error: any) {
      return NextResponse.json({
        host: host,
        hops: [],
        complete: false,
        error: error.message,
      })
    }
  } catch (error: any) {
    console.error("Error en traceroute:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
