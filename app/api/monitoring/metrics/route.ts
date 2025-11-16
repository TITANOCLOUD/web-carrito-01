import { NextRequest, NextResponse } from 'next/server';
import { getMonitoringPool } from '@/lib/db-monitoring';

export async function POST(request: NextRequest) {
  let pool;
  
  try {
    const data = await request.json();
    
    console.log('[v0] ========================================');
    console.log('[v0] MÉTRICAS RECIBIDAS');
    console.log('[v0] Keys:', Object.keys(data));
    console.log('[v0] ========================================');

    pool = getMonitoringPool();
    
    const systemInfo = data.system_info || {};
    const hostname = systemInfo.hostname || 'unknown';
    const ipAddress = systemInfo.ip_address || data.ip_address || 'unknown';
    
    // Registrar/actualizar host primero
    const [hostResult]: any = await pool.execute(
      `INSERT INTO hosts (hostname, ip_address, os_type, os_version, architecture, agent_version, last_seen)
       VALUES (?, ?, ?, ?, ?, ?, NOW())
       ON DUPLICATE KEY UPDATE 
         ip_address = VALUES(ip_address),
         os_type = VALUES(os_type),
         os_version = VALUES(os_version),
         architecture = VALUES(architecture),
         agent_version = VALUES(agent_version),
         last_seen = NOW()`,
      [
        hostname,
        ipAddress,
        systemInfo.os_type || systemInfo.os_release || 'unknown',
        systemInfo.os_version || 'unknown',
        systemInfo.architecture || systemInfo.processor || 'unknown',
        systemInfo.python_version || '1.0.0'
      ]
    );
    
    const hostId = hostResult.insertId || (await pool.execute(
      'SELECT id FROM hosts WHERE hostname = ?', [hostname]
    ))[0][0]?.id;
    
    console.log('[v0] Host ID:', hostId);

    let insertedCount = 0;

    const cpu = data.cpu || {};
    const memory = data.memory || {};
    const disk = data.disk || {};
    const network = data.network || {};
    const uptime = data.uptime || {};
    
    const systemMetricsValues = [
      hostId,
      cpu.cpu_percent || 0,
      cpu.cpu_count || cpu.cpu_count_logical || 0,
      cpu.load_average?.[0] || 0,
      cpu.load_average?.[1] || 0,
      cpu.load_average?.[2] || 0,
      memory.memory_total || 0,
      memory.memory_used || 0,
      memory.memory_available || 0,
      memory.memory_percent || 0,
      memory.swap_total || 0,
      memory.swap_used || 0,
      memory.swap_percent || 0,
      disk.io_stats?.read_bytes || 0,
      disk.io_stats?.write_bytes || 0,
      disk.io_stats?.read_count || 0,
      disk.io_stats?.write_count || 0,
      network.bytes_sent || 0,
      network.bytes_recv || 0,
      network.packets_sent || 0,
      network.packets_recv || 0,
      uptime.uptime_seconds || 0,
      Math.floor(Date.now() / 1000) - (uptime.uptime_seconds || 0)
    ];

    await pool.execute(
      `INSERT INTO system_metrics (
        host_id, cpu_percent, cpu_count,
        load_average_1, load_average_5, load_average_15,
        memory_total, memory_used, memory_available, memory_percent,
        swap_total, swap_used, swap_percent,
        disk_read_bytes, disk_write_bytes, disk_read_count, disk_write_count,
        network_bytes_sent, network_bytes_recv,
        network_packets_sent, network_packets_recv,
        uptime_seconds, boot_time
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      systemMetricsValues
    );
    
    insertedCount++;
    console.log('[v0] ✅ system_metrics insertado');

    if (disk.partitions && Array.isArray(disk.partitions)) {
      await pool.execute('DELETE FROM disk_partitions WHERE host_id = ?', [hostId]);
      
      for (const partition of disk.partitions) {
        await pool.execute(
          `INSERT INTO disk_partitions 
           (host_id, device, mountpoint, fstype, total_bytes, used_bytes, free_bytes, percent_used)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            hostId,
            partition.device || 'unknown',
            partition.mountpoint || '/',
            partition.fstype || 'unknown',
            partition.total || 0,
            partition.used || 0,
            partition.free || 0,
            partition.percent || 0
          ]
        );
      }
      console.log(`[v0] ✅ ${disk.partitions.length} particiones insertadas`);
    }

    if (network.interfaces && Array.isArray(network.interfaces)) {
      await pool.execute('DELETE FROM network_interfaces WHERE host_id = ?', [hostId]);
      
      for (const iface of network.interfaces) {
        for (const addr of iface.addresses || []) {
          await pool.execute(
            `INSERT INTO network_interfaces
             (host_id, interface_name, ip_address, ip_type, netmask, broadcast)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
              hostId,
              iface.name || 'unknown',
              addr.address || '',
              addr.type || 'IPv4',
              addr.netmask || '',
              addr.broadcast || ''
            ]
          );
        }
      }
      console.log(`[v0] ✅ ${network.interfaces.length} interfaces insertadas`);
    }

    if (data.security_alerts && Array.isArray(data.security_alerts) && data.security_alerts.length > 0) {
      for (const alert of data.security_alerts) {
        await pool.execute(
          `INSERT INTO security_alerts
           (host_id, category, component, source, severity, message)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            hostId,
            'security',
            'system',
            alert.source || 'monitoring_agent',
            alert.severity || 'warning',
            (alert.message || '').substring(0, 1000)
          ]
        );
      }
      console.log(`[v0] ✅ ${data.security_alerts.length} alertas insertadas`);
    }

    console.log('[v0] ====================================');
    console.log('[v0] ✅ DATOS PROCESADOS CORRECTAMENTE');
    console.log('[v0] ====================================');

    return NextResponse.json({
      status: 'ok',
      message: 'Métricas procesadas correctamente',
      host_id: hostId,
      hostname: hostname,
      inserted: insertedCount,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('[v0] ❌ ERROR:', error.message);
    console.error('[v0] Stack:', error.stack);
    
    return NextResponse.json({
      status: 'error',
      error: error.message || 'Error desconocido',
      message: 'Error al procesar métricas'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/monitoring/metrics',
    message: 'Endpoint de métricas activo - Versión completa'
  });
}
