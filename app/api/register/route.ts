import { NextRequest, NextResponse } from 'next/server'
import { getMonitoringPool } from '@/lib/db-monitoring'

export async function POST(req: NextRequest) {
  const startTime = Date.now()
  
  try {
    const body = await req.json()
    const { hostname, ip, os_type, os_version, architecture, agent_version } = body

    console.log('[v0] /api/register - Recibida petición:', { hostname, ip })

    if (!hostname) {
      console.log('[v0] /api/register - Datos incompletos')
      return NextResponse.json(
        { error: 'hostname es requerido' },
        { status: 400 }
      )
    }

    const pool = await getMonitoringPool()
    
    console.log('[v0] /api/register - Verificando si host existe...')
    const [existingHosts] = await pool.query(
      'SELECT id FROM hosts WHERE hostname = ? LIMIT 1',
      [hostname]
    )

    let hostId: number

    if (Array.isArray(existingHosts) && existingHosts.length > 0) {
      hostId = (existingHosts[0] as any).id
      console.log('[v0] /api/register - Host existente encontrado:', hostId)
      
      await pool.query(
        `UPDATE hosts 
         SET ip_address = ?, os_type = ?, os_version = ?, architecture = ?, agent_version = ?, last_seen = NOW() 
         WHERE id = ?`,
        [ip || null, os_type || null, os_version || null, architecture || null, agent_version || null, hostId]
      )
    } else {
      console.log('[v0] /api/register - Insertando nuevo host...')
      const [result] = await pool.query(
        `INSERT INTO hosts (hostname, ip_address, os_type, os_version, architecture, agent_version, first_seen, last_seen) 
         VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [hostname, ip || null, os_type || null, os_version || null, architecture || null, agent_version || null]
      )
      hostId = (result as any).insertId
      console.log('[v0] /api/register - Nuevo host creado:', hostId)
    }

    const duration = Date.now() - startTime
    console.log(`[v0] /api/register - Registro completado en ${duration}ms`)

    return NextResponse.json({ 
      success: true,
      host_id: hostId,
      message: 'Host registrado correctamente'
    })

  } catch (error) {
    const duration = Date.now() - startTime
    console.error('[v0] /api/register - ERROR:', error)
    console.error(`[v0] /api/register - Falló después de ${duration}ms`)
    
    return NextResponse.json(
      { error: 'Error al registrar host', details: String(error) },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    endpoint: '/api/register',
    message: 'Endpoint de registro de hosts activo'
  })
}
