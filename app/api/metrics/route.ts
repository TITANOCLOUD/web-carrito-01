import { NextRequest, NextResponse } from 'next/server'
import { getMonitoringPool } from '@/lib/db-monitoring'

export async function POST(req: NextRequest) {
  const startTime = Date.now()
  
  try {
    const body = await req.json()
    const { host_id, system, disks, network, processes } = body

    console.log('[v0] /api/metrics - Recibida petición para host_id:', host_id)

    if (!host_id) {
      console.log('[v0] /api/metrics - Datos incompletos')
      return NextResponse.json(
        { error: 'host_id es requerido' },
        { status: 400 }
      )
    }

    const pool = await getMonitoringPool()
    
    if (system) {
      console.log('[v0] /api/metrics - Insertando métricas del sistema...')
      await pool.query(
        `INSERT INTO system_metrics (
          host_id, cpu_percent, cpu_count, load_average_1, load_average_5, load_average_15,
          memory_total, memory_used, memory_available, memory_percent,
          swap_total, swap_used, swap_percent,
          disk_read_bytes, disk_write_bytes, disk_read_count, disk_write_count,
          network_bytes_sent, network_bytes_recv, network_packets_sent, network_packets_recv,
          uptime_seconds, boot_time, timestamp
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          host_id,
          system.cpu_percent || null,
          system.cpu_count || null,
          system.load_average?.[0] || null,
          system.load_average?.[1] || null,
          system.load_average?.[2] || null,
          system.memory_total || null,
          system.memory_used || null,
          system.memory_available || null,
          system.memory_percent || null,
          system.swap_total || null,
          system.swap_used || null,
          system.swap_percent || null,
          system.disk_read_bytes || null,
          system.disk_write_bytes || null,
          system.disk_read_count || null,
          system.disk_write_count || null,
          system.network_bytes_sent || null,
          system.network_bytes_recv || null,
          system.network_packets_sent || null,
          system.network_packets_recv || null,
          system.uptime_seconds || null,
          system.boot_time || null
        ]
      )
      console.log('[v0] /api/metrics - Métricas del sistema insertadas')
    }

    if (disks && Array.isArray(disks)) {
      console.log('[v0] /api/metrics - Insertando particiones:', disks.length)
      for (const disk of disks) {
        await pool.query(
          `INSERT INTO disk_partitions (
            host_id, device, mountpoint, fstype, total_bytes, used_bytes, free_bytes, percent_used, timestamp
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
          [
            host_id,
            disk.device || null,
            disk.mountpoint || null,
            disk.fstype || null,
            disk.total || null,
            disk.used || null,
            disk.free || null,
            disk.percent || null
          ]
        )
      }
      console.log('[v0] /api/metrics - Particiones insertadas')
    }

    if (network && Array.isArray(network)) {
      console.log('[v0] /api/metrics - Insertando interfaces de red:', network.length)
      for (const iface of network) {
        await pool.query(
          `INSERT INTO network_interfaces (
            host_id, interface_name, ip_address, ip_type, netmask, broadcast, timestamp
          ) VALUES (?, ?, ?, ?, ?, ?, NOW())`,
          [
            host_id,
            iface.interface || null,
            iface.address || null,
            iface.family || null,
            iface.netmask || null,
            iface.broadcast || null
          ]
        )
      }
      console.log('[v0] /api/metrics - Interfaces de red insertadas')
    }

    if (processes && Array.isArray(processes)) {
      console.log('[v0] /api/metrics - Insertando procesos:', Math.min(processes.length, 20))
      for (const proc of processes.slice(0, 20)) {
        await pool.query(
          `INSERT INTO processes_usage (
            host_id, pid, process_name, user, cpu_percent, memory_percent, memory_bytes, status, cmdline, timestamp
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
          [
            host_id,
            proc.pid || null,
            proc.name || null,
            proc.username || null,
            proc.cpu_percent || null,
            proc.memory_percent || null,
            proc.memory_info?.rss || null,
            proc.status || null,
            proc.cmdline ? JSON.stringify(proc.cmdline) : null
          ]
        )
      }
      console.log('[v0] /api/metrics - Procesos insertados')
    }

    // Actualizar last_seen del host
    await pool.query(
      'UPDATE hosts SET last_seen = NOW() WHERE id = ?',
      [host_id]
    )

    const duration = Date.now() - startTime
    console.log(`[v0] /api/metrics - Métricas procesadas en ${duration}ms`)

    return NextResponse.json({ 
      success: true,
      message: 'Métricas almacenadas correctamente'
    })

  } catch (error) {
    const duration = Date.now() - startTime
    console.error('[v0] /api/metrics - ERROR:', error)
    console.error(`[v0] /api/metrics - Falló después de ${duration}ms`)
    
    return NextResponse.json(
      { error: 'Error al procesar métricas', details: String(error) },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    endpoint: '/api/metrics',
    message: 'Endpoint de métricas activo'
  })
}
