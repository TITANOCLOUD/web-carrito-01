import { NextResponse } from 'next/server'
import { getMonitoringPool } from '@/lib/db-monitoring'

export async function GET() {
  try {
    const pool = getMonitoringPool()
    
    // Obtener hosts registrados
    const [hosts] = await pool.query(
      'SELECT * FROM hosts ORDER BY last_seen DESC LIMIT 10'
    )
    
    // Obtener últimas métricas
    const [metrics] = await pool.query(`
      SELECT 
        h.hostname,
        h.ip_address,
        h.os_type,
        h.status,
        h.last_seen,
        sm.cpu_usage,
        sm.memory_usage,
        sm.disk_usage,
        sm.created_at as metric_time
      FROM hosts h
      LEFT JOIN system_metrics sm ON h.id = sm.host_id
      WHERE sm.created_at > DATE_SUB(NOW(), INTERVAL 5 MINUTE)
      ORDER BY sm.created_at DESC
      LIMIT 20
    `)
    
    // Contar total de registros
    const [counts] = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM hosts) as total_hosts,
        (SELECT COUNT(*) FROM system_metrics) as total_metrics,
        (SELECT COUNT(*) FROM hosts WHERE last_seen > DATE_SUB(NOW(), INTERVAL 5 MINUTE)) as active_hosts
    `)
    
    return NextResponse.json({
      success: true,
      hosts,
      recent_metrics: metrics,
      stats: counts[0]
    })
    
  } catch (error: any) {
    console.error('[MONITORING STATUS ERROR]', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error al obtener estado de monitoreo',
        details: error.message 
      },
      { status: 500 }
    )
  }
}
