import { NextResponse } from 'next/server'
import { getMonitoringPool } from '@/lib/db-monitoring'

export async function GET() {
  const pool = getMonitoringPool()
  const results: any = {}
  
  try {
    // Test de conexión básica
    const [testResult] = await pool.query('SELECT 1 as test')
    results.connection = 'OK'
    
    // Contar registros en cada tabla
    try {
      const [hostsCount] = await pool.query('SELECT COUNT(*) as count FROM hosts')
      results.hosts_count = (hostsCount as any)[0].count
    } catch (e: any) {
      results.hosts_error = e.message
    }
    
    try {
      const [metricsCount] = await pool.query('SELECT COUNT(*) as count FROM system_metrics')
      results.metrics_count = (metricsCount as any)[0].count
    } catch (e: any) {
      results.metrics_error = e.message
    }
    
    try {
      const [disksCount] = await pool.query('SELECT COUNT(*) as count FROM disk_partitions')
      results.disks_count = (disksCount as any)[0].count
    } catch (e: any) {
      results.disks_error = e.message
    }
    
    try {
      const [netCount] = await pool.query('SELECT COUNT(*) as count FROM network_interfaces')
      results.network_count = (netCount as any)[0].count
    } catch (e: any) {
      results.network_error = e.message
    }
    
    // Obtener todos los hosts
    try {
      const [hosts] = await pool.query('SELECT id, hostname, ip_address, status, last_seen FROM hosts ORDER BY id DESC')
      results.hosts = hosts
    } catch (e: any) {
      results.hosts_query_error = e.message
    }
    
    // Obtener últimas métricas
    try {
      const [metrics] = await pool.query(`
        SELECT 
          sm.id, 
          sm.host_id, 
          h.hostname,
          sm.cpu_usage, 
          sm.memory_used, 
          sm.memory_total,
          sm.timestamp 
        FROM system_metrics sm 
        LEFT JOIN hosts h ON sm.host_id = h.id 
        ORDER BY sm.timestamp DESC 
        LIMIT 10
      `)
      results.latest_metrics = metrics
    } catch (e: any) {
      results.metrics_query_error = e.message
    }
    
    return NextResponse.json(results)
    
  } catch (error: any) {
    return NextResponse.json({
      error: 'Error general',
      message: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}
