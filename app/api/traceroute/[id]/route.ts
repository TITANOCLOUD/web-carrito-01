import { NextResponse } from "next/server"

export const runtime = "edge"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Simulación de traceroute - En producción esto ejecutaría traceroute real
  const hops = [
    { hop: 1, ip: "192.168.1.1", hostname: "gateway.local", latency: 1 },
    { hop: 2, ip: "10.0.0.1", hostname: "router-core.isp.net", latency: 5 },
    { hop: 3, ip: "203.0.113.1", hostname: "edge-router.isp.net", latency: 12 },
    { hop: 4, ip: "198.51.100.1", hostname: "transit-1.backbone.net", latency: 18 },
    { hop: 5, ip: "198.51.100.50", hostname: "transit-2.backbone.net", latency: 25 },
    { hop: 6, ip: "72.251.3.1", hostname: "dc-gateway.provider.net", latency: 32 },
    { hop: 7, ip: "72.251.3.93", hostname: params.id, latency: 38 },
  ]

  // Simular falla aleatoria
  const hasFailed = Math.random() > 0.9
  const lastFailedHop = hasFailed ? Math.floor(Math.random() * 5) + 3 : undefined

  return NextResponse.json({
    traceroute: {
      hops: lastFailedHop ? hops.slice(0, lastFailedHop) : hops,
      lastFailedHop,
    },
  })
}
