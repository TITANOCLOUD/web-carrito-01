import { NextResponse } from "next/server"

export const runtime = "edge"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Simulación de ping - En producción esto haría ping real
  const latency = Math.floor(Math.random() * 40) + 8
  const packetLoss = Math.random() > 0.95 ? Math.floor(Math.random() * 10) : 0

  const status = packetLoss > 5 ? "offline" : latency > 100 ? "warning" : "online"

  return NextResponse.json({
    ping: {
      current: latency,
      average: Math.floor(latency * 1.2),
      min: Math.floor(latency * 0.6),
      max: Math.floor(latency * 2.5),
      packetLoss,
      history: Array.from({ length: 20 }, () => Math.floor(Math.random() * 40) + 8),
    },
    status,
  })
}
