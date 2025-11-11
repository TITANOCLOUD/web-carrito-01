import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log(`[v0] Solicitando ping para host: ${params.id}`)

    // TODO: Obtener últimos 20 pings desde MariaDB
    // const pingData = await db.query(`
    //   SELECT ping_ms, packet_loss, timestamp
    //   FROM host_pings
    //   WHERE host_id = ?
    //   ORDER BY timestamp DESC
    //   LIMIT 20
    // `, [params.id])

    // Por ahora estructura vacía hasta que lleguen datos reales
    return NextResponse.json({
      message: "Esperando datos de ping del agente",
      ping: null,
      status: "waiting",
    })
  } catch (error) {
    console.error(`[v0] Error obteniendo ping:`, error)
    return NextResponse.json({ error: "Failed to get ping data" }, { status: 500 })
  }
}
