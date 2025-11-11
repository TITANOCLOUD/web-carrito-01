import { NextResponse } from "next/server"

export const runtime = "nodejs"

// Mock data generator - En producción esto se conectaría a sistemas SNMP reales
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    // TODO: Conectar a MariaDB y obtener las últimas métricas del host
    // const metrics = await db.query(`
    //   SELECT * FROM host_metrics
    //   WHERE host_id = ?
    //   ORDER BY timestamp DESC
    //   LIMIT 1
    // `, [id])

    // Por ahora retornamos estructura esperada con mensaje
    // Una vez conectada la DB, esto retornará datos reales
    console.log(`[v0] Solicitando métricas para host: ${id}`)

    // Estructura que vendrá de la base de datos
    const response = {
      id,
      message: "Esperando datos del agente de monitoreo",
      instructions: "Instala el agente con: curl -sSL https://tu-dominio.com/scripts/install-monitor.sh | sudo bash",
      // Los datos reales se llenarán una vez el agente envíe métricas
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error(`[v0] Error obteniendo métricas del host ${id}:`, error)
    return NextResponse.json({ error: "Failed to get host metrics" }, { status: 500 })
  }
}
