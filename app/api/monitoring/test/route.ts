import { NextResponse } from 'next/server'
import { getMonitoringPool } from '@/lib/db-monitoring'

export async function GET() {
  try {
    const pool = getMonitoringPool()
    
    console.log('[v0] [TEST] Intentando conectar a base de datos de monitoreo...')
    
    // Test de conexión
    const [result] = await pool.query('SELECT 1 as test')
    console.log('[v0] [TEST] Conexión exitosa:', result)
    
    const [dbInfo] = await pool.query('SELECT DATABASE() as current_db')
    console.log('[v0] [TEST] Base de datos actual:', dbInfo)
    
    // Ver estructura de tablas
    const [tables] = await pool.query('SHOW TABLES')
    console.log('[v0] [TEST] Tablas disponibles:', tables)
    
    // Ver hosts registrados
    const [hosts] = await pool.query('SELECT * FROM hosts')
    console.log('[v0] [TEST] Hosts registrados:', hosts)
    console.log('[v0] [TEST] Número de hosts:', (hosts as any[]).length)
    
    // Ver métricas
    const [metrics] = await pool.query('SELECT * FROM system_metrics ORDER BY timestamp DESC LIMIT 5')
    console.log('[v0] [TEST] Últimas métricas:', metrics)
    console.log('[v0] [TEST] Número de métricas:', (metrics as any[]).length)
    
    return NextResponse.json({
      success: true,
      connection: 'OK',
      current_database: dbInfo,
      tables,
      hosts,
      hosts_count: (hosts as any[]).length,
      recent_metrics: metrics,
      metrics_count: (metrics as any[]).length
    })
    
  } catch (error: any) {
    console.error('[v0] [TEST ERROR]', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        stack: error.stack 
      },
      { status: 500 }
    )
  }
}
