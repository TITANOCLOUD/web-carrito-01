import { NextRequest, NextResponse } from 'next/server'
import { getMonitoringPool } from '@/lib/db-monitoring'

export async function POST(req: NextRequest) {
  const startTime = Date.now()
  
  try {
    const body = await req.json()
    console.log('[v0] /api/register - Body completo recibido:', JSON.stringify(body, null, 2))
    
    const hostname = body.hostname
    const ip = body.ip || body.ip_address
    const os_type = body.os_type || body.os || body.osType
    const os_version = body.os_version || body.osVersion
    const architecture = body.architecture || body.arch
    const agent_version = body.agent_version || body.agentVersion || '1.0.0'

    console.log('[v0] /api/register - Datos procesados:', { hostname, ip, os_type, os_version, architecture, agent_version })

    if (!hostname) {
      console.log('[v0] /api/register - hostname faltante')
      return NextResponse.json(
        { error: 'hostname es requerido' },
        { status: 400 }
      )
    }

    let pool
    try {
      pool = await getMonitoringPool()
      console.log('[v0] /api/register - Pool de conexión obtenido correctamente')
    } catch (poolError) {
      console.error('[v0] /api/register - ERROR al obtener pool:', poolError)
      return NextResponse.json(
        { error: 'Error de conexión a base de datos', details: String(poolError) },
        { status: 500 }
      )
    }
    
    console.log('[v0] /api/register - Verificando si host existe...')
    
    let existingHosts
    try {
      [existingHosts] = await pool.query(
        'SELECT id FROM hosts WHERE hostname = ? LIMIT 1',
        [hostname]
      )
      console.log('[v0] /api/register - Query SELECT ejecutado, resultados:', existingHosts)
    } catch (selectError) {
      console.error('[v0] /api/register - ERROR en SELECT:', selectError)
      throw selectError
    }

    let hostId: number

    if (Array.isArray(existingHosts) && existingHosts.length > 0) {
      hostId = (existingHosts[0] as any).id
      console.log('[v0] /api/register - Host existente encontrado:', hostId)
      
      try {
        await pool.query(
          `UPDATE hosts 
           SET ip_address = ?, os_type = ?, os_version = ?, architecture = ?, agent_version = ?, last_seen = NOW() 
           WHERE id = ?`,
          [ip || null, os_type || null, os_version || null, architecture || null, agent_version || null, hostId]
        )
        console.log('[v0] /api/register - Host actualizado EXITOSAMENTE')
      } catch (updateError) {
        console.error('[v0] /api/register - ERROR en UPDATE:', updateError)
        throw updateError
      }
    } else {
      console.log('[v0] /api/register - Insertando nuevo host...')
      
      try {
        const [result] = await pool.query(
          `INSERT INTO hosts (hostname, ip_address, os_type, os_version, architecture, agent_version, first_seen, last_seen) 
           VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [hostname, ip || null, os_type || null, os_version || null, architecture || null, agent_version || null]
        )
        hostId = (result as any).insertId
        console.log('[v0] /api/register - Nuevo host creado EXITOSAMENTE:', hostId)
      } catch (insertError) {
        console.error('[v0] /api/register - ERROR en INSERT:', insertError)
        console.error('[v0] /api/register - Detalles del error:', {
          message: (insertError as Error).message,
          code: (insertError as any).code,
          errno: (insertError as any).errno,
          sql: (insertError as any).sql
        })
        throw insertError
      }
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
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    endpoint: '/api/register',
    message: 'Endpoint de registro de hosts activo'
  })
}
