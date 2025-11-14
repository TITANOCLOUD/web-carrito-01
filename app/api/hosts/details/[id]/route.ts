import { NextRequest, NextResponse } from 'next/server'
import { getMonitoringDbConnection } from '@/lib/db-monitoring'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const connection = await getMonitoringDbConnection()
  
  try {
    const { id } = await params

    // Obtener información del host
    const [hosts] = await connection.execute(
      `SELECT * FROM hosts WHERE host_id = ?`,
      [id]
    )

    if (!Array.isArray(hosts) || hosts.length === 0) {
      return NextResponse.json({ error: 'Host not found' }, { status: 404 })
    }

    const host = hosts[0] as any

    // Obtener métricas más recientes
    const [metrics] = await connection.execute(
      `SELECT * FROM system_metrics 
       WHERE host_id = ? 
       ORDER BY created_at DESC 
       LIMIT 1`,
      [id]
    )

    const latestMetrics = Array.isArray(metrics) && metrics.length > 0 ? metrics[0] : null

    // Obtener particiones de disco
    const [disks] = await connection.execute(
      `SELECT * FROM disk_partitions 
       WHERE host_id = ? 
       ORDER BY created_at DESC 
       LIMIT 10`,
      [id]
    )

    // Obtener interfaces de red
    const [interfaces] = await connection.execute(
      `SELECT * FROM network_interfaces 
       WHERE host_id = ? 
       ORDER BY created_at DESC 
       LIMIT 10`,
      [id]
    )

    // Obtener alertas de seguridad
    const [alerts] = await connection.execute(
      `SELECT * FROM security_alerts 
       WHERE host_id = ? 
       ORDER BY created_at DESC 
       LIMIT 10`,
      [id]
    )

    // Obtener procesos activos
    const [processes] = await connection.execute(
      `SELECT * FROM processes_usage 
       WHERE host_id = ? 
       ORDER BY created_at DESC 
       LIMIT 10`,
      [id]
    )

    // Obtener servicios
    const [services] = await connection.execute(
      `SELECT * FROM services_status 
       WHERE host_id = ? 
       ORDER BY created_at DESC 
       LIMIT 10`,
      [id]
    )

    const response = {
      id: host.host_id,
      name: host.hostname,
      ip: host.ip_address,
      status: host.status || 'online',
      type: host.host_type || 'Server',
      reactor: host.datacenter || 0,
      snmp: latestMetrics ? {
        osVersion: latestMetrics.os_version || 'Unknown',
        uptime: latestMetrics.uptime_seconds ? `${Math.floor(latestMetrics.uptime_seconds / 86400)} días` : '0 días',
        cpu: {
          usage: latestMetrics.cpu_usage || 0,
          cores: latestMetrics.cpu_cores || 1,
          model: latestMetrics.cpu_model || 'Unknown CPU'
        },
        memory: {
          total: latestMetrics.memory_total || 0,
          used: latestMetrics.memory_used || 0,
          free: latestMetrics.memory_free || 0
        },
        disks: (disks as any[]).map(d => ({
          name: d.partition_name,
          size: d.size_total || 0,
          used: d.size_used || 0,
          mountPoint: d.mount_point || '/'
        })),
        network: {
          interfaces: (interfaces as any[]).map(i => ({
            name: i.interface_name,
            status: i.status === 'up' ? 'up' : 'down',
            speed: i.speed || '1 Gbps',
            rx: i.rx_bytes || 0,
            tx: i.tx_bytes || 0
          }))
        },
        hardware: []
      } : undefined,
      ping: {
        current: latestMetrics?.ping_ms || 0,
        average: latestMetrics?.ping_ms || 0,
        min: latestMetrics?.ping_ms || 0,
        max: latestMetrics?.ping_ms || 0,
        packetLoss: 0,
        history: Array(20).fill(latestMetrics?.ping_ms || 0)
      }
    }

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('[v0] Error fetching host details:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  } finally {
    await connection.end()
  }
}
