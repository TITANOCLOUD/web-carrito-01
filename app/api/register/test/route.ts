import { NextRequest, NextResponse } from 'next/server'
import { getMonitoringPool } from '@/lib/db-monitoring'

export async function POST(request: NextRequest) {
  let pool
  try {
    console.log('[v0] === TEST REGISTRO INICIADO ===')
    
    const body = await request.json()
    console.log('[v0] Body recibido:', JSON.stringify(body, null, 2))
    
    const hostname = body.hostname
    const ipAddress = body.ip || body.ip_address
    
    if (!hostname || !ipAddress) {
      return NextResponse.json({
        error: 'Faltan campos requeridos',
        required: ['hostname', 'ip o ip_address'],
        received: body
      }, { status: 400 })
    }
    
    pool = await getMonitoringPool()
    console.log('[v0] Pool de conexión obtenido')
    
    // Test 1: Verificar si el host existe
    console.log('[v0] Test 1: Buscando host existente...')
    const [existing] = await pool.query(
      'SELECT id, hostname, ip_address FROM hosts WHERE hostname = ?',
      [hostname]
    )
    console.log('[v0] Host existente:', existing)
    
    if (Array.isArray(existing) && existing.length > 0) {
      // Test 2: Intentar actualizar
      console.log('[v0] Test 2: Intentando UPDATE...')
      const updateQuery = 'UPDATE hosts SET ip_address = ?, last_seen = NOW() WHERE hostname = ?'
      console.log('[v0] Query UPDATE:', updateQuery)
      console.log('[v0] Parámetros:', [ipAddress, hostname])
      
      const [updateResult] = await pool.query(updateQuery, [ipAddress, hostname])
      console.log('[v0] Resultado UPDATE:', updateResult)
      
      return NextResponse.json({
        success: true,
        action: 'updated',
        host_id: existing[0].id,
        query: updateQuery,
        params: [ipAddress, hostname],
        result: updateResult
      })
    } else {
      // Test 3: Intentar insertar
      console.log('[v0] Test 3: Intentando INSERT...')
      const insertQuery = `
        INSERT INTO hosts (hostname, ip_address, agent_version, first_seen, last_seen)
        VALUES (?, ?, '1.0.0', NOW(), NOW())
      `
      console.log('[v0] Query INSERT:', insertQuery)
      console.log('[v0] Parámetros:', [hostname, ipAddress])
      
      const [insertResult]: any = await pool.query(insertQuery, [hostname, ipAddress])
      console.log('[v0] Resultado INSERT:', insertResult)
      
      return NextResponse.json({
        success: true,
        action: 'inserted',
        host_id: insertResult.insertId,
        query: insertQuery,
        params: [hostname, ipAddress],
        result: insertResult
      })
    }
    
  } catch (error: any) {
    console.error('[v0] ERROR CAPTURADO:', error)
    return NextResponse.json({
      error: 'Error en test de registro',
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      sqlMessage: error.sqlMessage,
      sql: error.sql,
      stack: error.stack
    }, { status: 500 })
  } finally {
    if (pool) {
      await pool.end()
    }
  }
}
