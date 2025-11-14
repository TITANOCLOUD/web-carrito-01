import { NextRequest, NextResponse } from 'next/server';
import { queryMonitoring } from '@/lib/db-monitoring';

export async function POST(request: NextRequest) {
  try {
    // Validar API Key desde header
    const apiKey = request.headers.get('x-api-key') || request.headers.get('authorization')?.replace('Bearer ', '');

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key requerida' }, { status: 401 });
    }

    const data = await request.json();

    // 1. Buscar o crear el host
    let hostId: number;
    
    const existingHost = await queryMonitoring(
      'SELECT id FROM hosts WHERE hostname = ?',
      [data.host.hostname]
    ) as any[];

    if (existingHost.length > 0) {
      hostId = existingHost[0].id;
      
      // Actualizar información del host
      await queryMonitoring(
        `UPDATE hosts SET 
          ip_address = ?,
          os_type = ?,
          os_version = ?,
          architecture = ?,
          agent_version = ?,
          last_seen = NOW()
        WHERE id = ?`,
        [
          data.host.ip_address,
          data.host.os_type,
          data.host.os_version,
          data.host.architecture,
          data.host.agent_version,
          hostId
        ]
      );
    } else {
      // Crear nuevo host
      const result = await queryMonitoring(
        `INSERT INTO hosts (
          hostname, ip_address, os_type, os_version, architecture, agent_version, first_seen, last_seen
        ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          data.host.hostname,
          data.host.ip_address,
          data.host.os_type,
          data.host.os_version,
          data.host.architecture,
          data.host.agent_version
        ]
      ) as any;
      
      hostId = result.insertId;
    }

    // 2. Insertar system_metrics
    if (data.system_metrics) {
      const m = data.system_metrics;
      await queryMonitoring(
        `INSERT INTO system_metrics (
          host_id, timestamp, cpu_percent, cpu_count, 
          load_average_1, load_average_5, load_average_15,
          memory_total, memory_used, memory_available, memory_percent,
          swap_total, swap_used, swap_percent,
          disk_read_bytes, disk_write_bytes, disk_read_count, disk_write_count,
          network_bytes_sent, network_bytes_recv, network_packets_sent, network_packets_recv,
          uptime_seconds, boot_time
        ) VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          hostId,
          m.cpu_percent || 0,
          m.cpu_count || 0,
          m.load_average_1 || 0,
          m.load_average_5 || 0,
          m.load_average_15 || 0,
          m.memory_total || 0,
          m.memory_used || 0,
          m.memory_available || 0,
          m.memory_percent || 0,
          m.swap_total || 0,
          m.swap_used || 0,
          m.swap_percent || 0,
          m.disk_read_bytes || 0,
          m.disk_write_bytes || 0,
          m.disk_read_count || 0,
          m.disk_write_count || 0,
          m.network_bytes_sent || 0,
          m.network_bytes_recv || 0,
          m.network_packets_sent || 0,
          m.network_packets_recv || 0,
          m.uptime_seconds || 0,
          m.boot_time || null
        ]
      );
    }

    // 3. Insertar disk_partitions
    if (data.disk_partitions && Array.isArray(data.disk_partitions)) {
      for (const disk of data.disk_partitions) {
        await queryMonitoring(
          `INSERT INTO disk_partitions (
            host_id, timestamp, device, mountpoint, fstype, 
            total_bytes, used_bytes, free_bytes, percent_used
          ) VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?)`,
          [
            hostId,
            disk.device,
            disk.mountpoint,
            disk.fstype,
            disk.total_bytes || 0,
            disk.used_bytes || 0,
            disk.free_bytes || 0,
            disk.percent_used || 0
          ]
        );
      }
    }

    // 4. Insertar network_interfaces
    if (data.network_interfaces && Array.isArray(data.network_interfaces)) {
      for (const iface of data.network_interfaces) {
        await queryMonitoring(
          `INSERT INTO network_interfaces (
            host_id, timestamp, interface_name, ip_address, ip_type, netmask, broadcast
          ) VALUES (?, NOW(), ?, ?, ?, ?, ?)`,
          [
            hostId,
            iface.interface_name,
            iface.ip_address,
            iface.ip_type || 'IPv4',
            iface.netmask || null,
            iface.broadcast || null
          ]
        );
      }
    }

    // 5. Insertar security_alerts
    if (data.security_alerts && Array.isArray(data.security_alerts)) {
      for (const alert of data.security_alerts) {
        await queryMonitoring(
          `INSERT INTO security_alerts (
            host_id, timestamp, category, component, source, event_id, severity, message, acknowledged
          ) VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, 0)`,
          [
            hostId,
            alert.category,
            alert.component,
            alert.source,
            alert.event_id || null,
            alert.severity,
            alert.message
          ]
        );

        // Registrar eventos críticos en noc_events
        if (alert.severity === 'critical' || alert.severity === 'high') {
          await queryMonitoring(
            `INSERT INTO noc_events (
              timestamp, host_id, component, event_type, severity, message, raw_payload, acknowledged, resolved
            ) VALUES (NOW(), ?, ?, 'security_alert', ?, ?, ?, 0, 0)`,
            [
              hostId,
              alert.component,
              alert.severity,
              alert.message,
              JSON.stringify(alert)
            ]
          );
        }
      }
    }

    // 6. Insertar processes_usage
    if (data.processes && Array.isArray(data.processes)) {
      for (const proc of data.processes) {
        await queryMonitoring(
          `INSERT INTO processes_usage (
            host_id, timestamp, pid, process_name, user, cpu_percent, memory_percent, memory_bytes, status, cmdline
          ) VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            hostId,
            proc.pid,
            proc.process_name,
            proc.user,
            proc.cpu_percent || 0,
            proc.memory_percent || 0,
            proc.memory_bytes || 0,
            proc.status,
            proc.cmdline || null
          ]
        );
      }
    }

    // 7. Insertar services_status
    if (data.services && Array.isArray(data.services)) {
      for (const service of data.services) {
        await queryMonitoring(
          `INSERT INTO services_status (
            host_id, timestamp, service_name, display_name, status, start_type, pid
          ) VALUES (?, NOW(), ?, ?, ?, ?, ?)`,
          [
            hostId,
            service.service_name,
            service.display_name || service.service_name,
            service.status,
            service.start_type || 'manual',
            service.pid || null
          ]
        );
      }
    }

    // 8. Insertar ping_status
    if (data.ping && Array.isArray(data.ping)) {
      for (const ping of data.ping) {
        await queryMonitoring(
          `INSERT INTO ping_status (
            host_id, timestamp, target, latency_ms, packet_loss, status
          ) VALUES (?, NOW(), ?, ?, ?, ?)`,
          [
            hostId,
            ping.target,
            ping.latency_ms || 0,
            ping.packet_loss || 0,
            ping.status
          ]
        );
      }
    }

    // 9. Insertar datos de Ceph (si existen)
    if (data.ceph) {
      // Ceph cluster health
      if (data.ceph.cluster_health) {
        const ceph = data.ceph.cluster_health;
        await queryMonitoring(
          `INSERT INTO ceph_cluster_health (
            host_id, timestamp, health_status, health_score, mon_quorum,
            osd_up, osd_down, osd_in, osd_out,
            pg_total, pg_active_clean, pg_degraded, pg_stuck, pg_recovery,
            raw_used_bytes, raw_total_bytes, raw_available_bytes
          ) VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            hostId,
            ceph.health_status,
            ceph.health_score || 0,
            ceph.mon_quorum || 0,
            ceph.osd_up || 0,
            ceph.osd_down || 0,
            ceph.osd_in || 0,
            ceph.osd_out || 0,
            ceph.pg_total || 0,
            ceph.pg_active_clean || 0,
            ceph.pg_degraded || 0,
            ceph.pg_stuck || 0,
            ceph.pg_recovery || 0,
            ceph.raw_used_bytes || 0,
            ceph.raw_total_bytes || 0,
            ceph.raw_available_bytes || 0
          ]
        );
      }

      // Ceph OSD status
      if (data.ceph.osd_status && Array.isArray(data.ceph.osd_status)) {
        for (const osd of data.ceph.osd_status) {
          await queryMonitoring(
            `INSERT INTO ceph_osd_status (
              host_id, timestamp, osd_id, status, in_cluster, weight, reweight, last_heartbeat, latency_ms
            ) VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?)`,
            [
              hostId,
              osd.osd_id,
              osd.status,
              osd.in_cluster ? 1 : 0,
              osd.weight || 0,
              osd.reweight || 0,
              osd.last_heartbeat || null,
              osd.latency_ms || 0
            ]
          );
        }
      }

      // Ceph PG status
      if (data.ceph.pg_status && Array.isArray(data.ceph.pg_status)) {
        for (const pg of data.ceph.pg_status) {
          await queryMonitoring(
            `INSERT INTO ceph_pg_status (
              host_id, timestamp, pg_id, state, objects, bytes, clean, degraded, undersized, recovery_state
            ) VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              hostId,
              pg.pg_id,
              pg.state,
              pg.objects || 0,
              pg.bytes || 0,
              pg.clean ? 1 : 0,
              pg.degraded ? 1 : 0,
              pg.undersized ? 1 : 0,
              pg.recovery_state || null
            ]
          );
        }
      }

      // Ceph SMART health
      if (data.ceph.smart && Array.isArray(data.ceph.smart)) {
        for (const smart of data.ceph.smart) {
          await queryMonitoring(
            `INSERT INTO ceph_smart_health (
              host_id, timestamp, device, temperature, power_on_hours, wear_level,
              reallocated_sectors, pending_sectors, smart_status, message
            ) VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              hostId,
              smart.device,
              smart.temperature || null,
              smart.power_on_hours || null,
              smart.wear_level || null,
              smart.reallocated_sectors || null,
              smart.pending_sectors || null,
              smart.smart_status,
              smart.message || null
            ]
          );
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Métricas recibidas y almacenadas correctamente',
      host_id: hostId,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('[v0] Error procesando métricas:', error);
    return NextResponse.json({
      error: 'Error al procesar métricas',
      details: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await queryMonitoring('SELECT 1');
    
    return NextResponse.json({
      status: 'ok',
      service: 'Monitoring API',
      endpoint: '/api/monitoring',
      database: 'data-monitoring',
      host: 'saturn-o-cloud.com',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      error: error.message
    }, { status: 500 });
  }
}
