import { NextRequest, NextResponse } from 'next/server'
import { getMonitoringPool } from '@/lib/db-monitoring'

export async function POST(req: NextRequest) {
  const startTime = Date.now()
  
  try {
    const body = await req.json()
    const { hostname, ip } = body

    console.log('[v0] /api/register - Recibida petición:', { hostname, ip })

    if (!hostname || !ip) {
      console.log('[v0] /api/register - Datos incompletos')
      return NextResponse.json(
        { error: 'hostname e ip son requeridos' },
        { status: 400 }
      )
    }

    const pool = await getMonitoringPool()
    
    // Verificar si el host ya existe
    console.log('[v0] /api/register - Verificando si host existe...')
    const [existingHosts] = await pool.query(
      'SELECT host_id FROM hosts WHERE hostname = ? OR ip = ? LIMIT 1',
      [hostname, ip]
    )

    let hostId: number

    if (Array.isArray(existingHosts) && existingHosts.length > 0) {
      hostId = (existingHosts[0] as any).host_id
      console.log('[v0] /api/register - Host existente encontrado:', hostId)
      
      // Actualizar última conexión
      await pool.query(
        'UPDATE hosts SET last_seen = NOW() WHERE host_id = ?',
        [hostId]
      )
    } else {
      console.log('[v0] /api/register - Insertando nuevo host...')
      const [result] = await pool.query(
        'INSERT INTO hosts (hostname, ip, status, created_at, last_seen) VALUES (?, ?, ?, NOW(), NOW())',
        [hostname, ip, 'online']
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
