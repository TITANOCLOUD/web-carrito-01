import { NextResponse } from 'next/server'
import { getMonitoringPool } from '@/lib/db-monitoring'

export async function GET() {
  try {
    const pool = getMonitoringPool()
    
    console.log('[TEST] Intentando conectar a base de datos de monitoreo...')
    
    // Test de conexión
    const [result] = await pool.query('SELECT 1 as test')
    console.log('[TEST] Conexión exitosa:', result)
    
    // Ver estructura de tablas
    const [tables] = await pool.query('SHOW TABLES')
    console.log('[TEST] Tablas disponibles:', tables)
    
    // Ver hosts registrados
    const [hosts] = await pool.query('SELECT * FROM hosts')
    console.log('[TEST] Hosts registrados:', hosts)
    
    // Ver métricas
    const [metrics] = await pool.query('SELECT * FROM system_metrics ORDER BY created_at DESC LIMIT 5')
    console.log('[TEST] Últimas métricas:', metrics)
    
    return NextResponse.json({
      success: true,
      connection: 'OK',
      tables,
      hosts,
      recent_metrics: metrics
    })
    
  } catch (error: any) {
    console.error('[TEST ERROR]', error)
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
