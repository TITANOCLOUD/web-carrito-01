import { NextRequest, NextResponse } from 'next/server'
import { getMonitoringPool } from '@/lib/db-monitoring'

export async function POST(req: NextRequest) {
  const startTime = Date.now()
  let pool
  
  try {
    const body = await req.json()
    console.log('[v0] /api/register - Body completo recibido:', JSON.stringify(body, null, 2))
    
    const hostname = body.hostname
    const ip = body.ip || body.ip_address
    const os_type = body.os_type || body.os || body.osType || null
    const os_version = body.os_version || body.osVersion || null
    const architecture = body.architecture || body.arch || null
    const agent_version = body.agent_version || body.agentVersion || '1.0.0'

    console.log('[v0] /api/register - Datos procesados:', { hostname, ip, os_type, os_version, architecture, agent_version })

    if (!hostname) {
      console.log('[v0] /api/register - hostname faltante')
      return NextResponse.json(
        { error: 'hostname es requerido' },
        { status: 400 }
      )
    }

    pool = await getMonitoringPool()
    console.log('[v0] /api/register - Pool de conexión obtenido correctamente')
    
    const [existingHosts] = await pool.query(
      'SELECT id FROM hosts WHERE hostname = ? LIMIT 1',
      [hostname]
    ) as any[]

    let hostId: number

    if (existingHosts && existingHosts.length > 0) {
      hostId = existingHosts[0].id
      await pool.query(
        `UPDATE hosts 
         SET ip_address = ?, os_type = ?, os_version = ?, architecture = ?, agent_version = ?, last_seen = NOW() 
         WHERE id = ?`,
        [ip, os_type, os_version, architecture, agent_version, hostId]
      )
      console.log('[v0] /api/register - Host actualizado EXITOSAMENTE')
    } else {
      const [result] = await pool.query(
        `INSERT INTO hosts (hostname, ip_address, os_type, os_version, architecture, agent_version, first_seen, last_seen) 
         VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [hostname, ip, os_type, os_version, architecture, agent_version]
      ) as any[]
      hostId = result.insertId
      console.log('[v0] /api/register - Nuevo host creado EXITOSAMENTE:', hostId)
    }

    const duration = Date.now() - startTime
    console.log(`[v0] /api/register - Registro completado EXITOSAMENTE en ${duration}ms`)

    return NextResponse.json({ 
      success: true,
      host_id: hostId,
      message: 'Host registrado correctamente'
    })

  } catch (error) {
    const duration = Date.now() - startTime
    console.error('[v0] /api/register - ERROR CAPTURADO:', error)
    console.error('[v0] /api/register - Stack trace:', (error as Error).stack)
    console.error(`[v0] /api/register - Falló después de ${duration}ms`)
    
    return NextResponse.json(
      { error: 'Error al registrar host', details: String(error) },
      { status: 500 }
    )
  } finally {
    if (pool) {
      await pool.end()
    }
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    endpoint: '/api/register',
    message: 'Endpoint de registro de hosts activo'
  })
}
