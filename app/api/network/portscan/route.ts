import { exec } from "child_process"
import { promisify } from "util"
import { NextResponse } from "next/server"

const execAsync = promisify(exec)

export async function POST(request: Request) {
  try {
    const { host } = await request.json()

    if (!host) {
      return NextResponse.json({ error: "Host is required" }, { status: 400 })
    }

    console.log("[v0] Ejecutando nmap en:", host)

    // Ejecutar nmap con los parámetros especificados
    const command = `nmap -p 1-65535 -T4 -A -v ${host}`

    try {
      const { stdout, stderr } = await execAsync(command, {
        timeout: 300000, // 5 minutos de timeout
      })

      // Parsear resultado de nmap
      const output = stdout || stderr

      // Extraer puertos abiertos
      const openPorts: Array<{
        port: number
        protocol: string
        service: string
        version: string
      }> = []

      const portLines = output.split("\n").filter((line) => /^\d+\//.test(line))
      portLines.forEach((line) => {
        const match = line.match(/^(\d+)\/(tcp|udp)\s+(\w+)\s+(.+)/)
        if (match) {
          openPorts.push({
            port: Number.parseInt(match[1]),
            protocol: match[2],
            service: match[3],
            version: match[4].trim(),
          })
        }
      })

      // Extraer información del sistema operativo
      const osMatch = output.match(/OS details: (.+)/)
      const os = osMatch ? osMatch[1] : "Unknown"

      // Extraer información de latencia
      const latencyMatch = output.match(/Host is up $$(.+?)s latency$$/)
      const latency = latencyMatch ? Number.parseFloat(latencyMatch[1]) * 1000 : 0

      return NextResponse.json({
        success: true,
        host,
        openPorts,
        os,
        latency,
        rawOutput: output,
        scannedAt: new Date().toISOString(),
      })
    } catch (execError: any) {
      console.error("[v0] Error ejecutando nmap:", execError)
      return NextResponse.json(
        {
          error: "Failed to execute nmap",
          details: execError.message,
          stdout: execError.stdout,
          stderr: execError.stderr,
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("[v0] Error en portscan:", error)
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 })
  }
}
