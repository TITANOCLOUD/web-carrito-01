import { NextRequest, NextResponse } from 'next/server'
import { getMonitoringPool } from '@/lib/db-monitoring'

export async function POST(req: NextRequest) {
  const startTime = Date.now()
  
  try {
    const body = await req.json()
    const { host_id, metrics } = body

    console.log('[v0] /api/metrics - Recibida petición para host_id:', host_id)

    if (!host_id || !metrics) {
      console.log('[v0] /api/metrics - Datos incompletos')
      return NextResponse.json(
        { error: 'host_id y metrics son requeridos' },
        { status: 400 }
      )
    }

    const pool = await getMonitoringPool()
    
    // Insertar métricas del sistema
    if (metrics.cpu !== undefined || metrics.memory !== undefined || metrics.disk !== undefined) {
      console.log('[v0] /api/metrics - Insertando métricas del sistema...')
      await pool.query(
        `INSERT INTO system_metrics (host_id, cpu_usage, memory_usage, disk_usage, timestamp) 
         VALUES (?, ?, ?, ?, NOW())`,
        [
          host_id,
          metrics.cpu || 0,
          metrics.memory || 0,
          metrics.disk || 0
        ]
      )
      console.log('[v0] /api/metrics - Métricas del sistema insertadas')
    }

    // Insertar particiones de disco si existen
    if (metrics.partitions && Array.isArray(metrics.partitions)) {
      console.log('[v0] /api/metrics - Insertando particiones:', metrics.partitions.length)
      for (const partition of metrics.partitions) {
        await pool.query(
          `INSERT INTO disk_partitions (host_id, device, mountpoint, used_gb, total_gb, usage_percent, timestamp)
           VALUES (?, ?, ?, ?, ?, ?, NOW())`,
          [
            host_id,
            partition.device || 'unknown',
            partition.mountpoint || '/',
            partition.used_gb || 0,
            partition.total_gb || 0,
            partition.usage_percent || 0
          ]
        )
      }
      console.log('[v0] /api/metrics - Particiones insertadas')
    }

    // Insertar interfaces de red si existen
    if (metrics.network && Array.isArray(metrics.network)) {
      console.log('[v0] /api/metrics - Insertando interfaces de red:', metrics.network.length)
      for (const iface of metrics.network) {
        await pool.query(
          `INSERT INTO network_interfaces (host_id, interface_name, rx_bytes, tx_bytes, rx_packets, tx_packets, timestamp)
           VALUES (?, ?, ?, ?, ?, ?, NOW())`,
          [
            host_id,
            iface.name || 'unknown',
            iface.rx_bytes || 0,
            iface.tx_bytes || 0,
            iface.rx_packets || 0,
            iface.tx_packets || 0
          ]
        )
      }
      console.log('[v0] /api/metrics - Interfaces de red insertadas')
    }

    // Actualizar last_seen del host
    await pool.query(
      'UPDATE hosts SET last_seen = NOW(), status = ? WHERE id = ?',
      ['online', host_id]
    )

    const duration = Date.now() - startTime
    console.log(`[v0] /api/metrics - Métricas procesadas en ${duration}ms`)

    return NextResponse.json({ 
      success: true,
      message: 'Métricas almacenadas correctamente'
    })

  } catch (error) {
    const duration = Date.now() - startTime
    console.error('[v0] /api/metrics - ERROR:', error)
    console.error(`[v0] /api/metrics - Falló después de ${duration}ms`)
    
    return NextResponse.json(
      { error: 'Error al procesar métricas', details: String(error) },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    endpoint: '/api/metrics',
    message: 'Endpoint de métricas activo'
  })
}
