import { NextRequest, NextResponse } from 'next/server';
import { getMonitoringPool } from '@/lib/db-monitoring';

export async function POST(request: NextRequest) {
  let pool;
  
  try {
    const data = await request.json();
    
    console.log('[v0] ========================================');
    console.log('[v0] PAYLOAD COMPLETO RECIBIDO:');
    console.log(JSON.stringify(data, null, 2));
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

    console.log('[v0] CPU:', JSON.stringify(data.cpu || {}));
    console.log('[v0] Memory:', JSON.stringify(data.memory || {}));
    console.log('[v0] Disk:', JSON.stringify(data.disk || {}, null, 2));
    console.log('[v0] Network:', JSON.stringify(data.network || {}, null, 2));
    console.log('[v0] Security Alerts:', JSON.stringify(data.security_alerts || []));

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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      systemMetricsValues
    );
    
    insertedCount++;
    console.log('[v0] ✅ system_metrics insertado');

    const diskPartitions = disk.partitions || data.filesystems || [];
    console.log('[v0] Particiones encontradas:', diskPartitions.length);
    
    if (diskPartitions && Array.isArray(diskPartitions) && diskPartitions.length > 0) {
      await pool.execute('DELETE FROM disk_partitions WHERE host_id = ?', [hostId]);
      
      for (const partition of diskPartitions) {
        console.log('[v0] Insertando partición:', JSON.stringify(partition));
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
      console.log(`[v0] ✅ ${diskPartitions.length} particiones insertadas`);
    } else {
      console.log('[v0] ⚠️ No se encontraron particiones para insertar');
    }

    const networkInterfaces = network.interfaces || data.interfaces || [];
    console.log('[v0] Interfaces encontradas:', networkInterfaces.length);
    
    if (networkInterfaces && Array.isArray(networkInterfaces) && networkInterfaces.length > 0) {
      await pool.execute('DELETE FROM network_interfaces WHERE host_id = ?', [hostId]);
      
      for (const iface of networkInterfaces) {
        const addresses = iface.addresses || [];
        console.log('[v0] Interface:', iface.name, 'Addresses:', addresses.length);
        
        for (const addr of addresses) {
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
      console.log(`[v0] ✅ ${networkInterfaces.length} interfaces insertadas`);
    } else {
      console.log('[v0] ⚠️ No se encontraron interfaces para insertar');
    }

    const securityAlerts = data.security_alerts || [];
    console.log('[v0] Alertas de seguridad encontradas:', securityAlerts.length);
    
    if (securityAlerts && Array.isArray(securityAlerts) && securityAlerts.length > 0) {
      for (const alert of securityAlerts) {
        console.log('[v0] Insertando alerta:', alert.severity, alert.source);
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
      console.log(`[v0] ✅ ${securityAlerts.length} alertas insertadas`);
    } else {
      console.log('[v0] ⚠️ No se encontraron alertas de seguridad');
    }

    console.log('[v0] ====================================');
    console.log('[v0] ✅ DATOS PROCESADOS CORRECTAMENTE');
    console.log('[v0] Total insertado:', insertedCount);
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
    message: 'Endpoint de métricas activo - Versión completa con logging'
  });
}
