import { NextRequest, NextResponse } from 'next/server'
import { getMonitoringPool } from '@/lib/db-monitoring'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    const hostname = body.hostname
    const ip = body.ip || body.ip_address
    const os_type = body.os_type || body.os || body.osType || null
    const os_version = body.os_version || body.osVersion || null
    const architecture = body.architecture || body.arch || null
    const agent_version = body.agent_version || body.agentVersion || '1.0.0'

    if (!hostname) {
      return NextResponse.json(
        { error: 'hostname es requerido' },
        { status: 400 }
      )
    }

    const pool = await getMonitoringPool()
    
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
    } else {
      const [result] = await pool.query(
        `INSERT INTO hosts (hostname, ip_address, os_type, os_version, architecture, agent_version, first_seen, last_seen) 
         VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [hostname, ip, os_type, os_version, architecture, agent_version]
      ) as any[]
      hostId = result.insertId
    }

    return NextResponse.json({ 
      success: true,
      host_id: hostId,
      message: 'Host registrado correctamente'
    })

  } catch (error) {
    console.error('[v0] /api/register - ERROR:', error)
    
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
