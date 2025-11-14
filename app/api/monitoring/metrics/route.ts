import { NextRequest, NextResponse } from 'next/server';
import { queryMonitoring } from '@/lib/db-monitoring';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const hostId = data.host_id || 1;
    
    console.log('[v0] === MÉTRICAS RECIBIDAS ===');
    console.log('[v0] Host ID:', hostId);
    console.log('[v0] CPU:', data.cpu_usage + '%');
    console.log('[v0] Memory:', data.memory_usage + '%');

    if (data.cpu_usage !== undefined || data.system) {
      const sys = data.system || data;
      
      await queryMonitoring(
        `INSERT INTO system_metrics (
          host_id, cpu_percent, cpu_count, load_average_1, load_average_5, load_average_15,
          memory_total, memory_used, memory_available, memory_percent,
          swap_total, swap_used, swap_percent,
          disk_read_bytes, disk_write_bytes, disk_read_count, disk_write_count,
          network_bytes_sent, network_bytes_recv, network_packets_sent, network_packets_recv,
          uptime_seconds, boot_time
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          hostId,
          sys.cpu_percent || sys.cpu_usage || 0,
          sys.cpu_count || sys.cpu_cores || 0,
          sys.load_avg_1 || sys.load_average?.[0] || 0,
          sys.load_avg_5 || sys.load_average?.[1] || 0,
          sys.load_avg_15 || sys.load_average?.[2] || 0,
          sys.memory_total || 0,
          sys.memory_used || 0,
          sys.memory_available || 0,
          sys.memory_percent || sys.memory_usage || 0,
          sys.swap_total || 0,
          sys.swap_used || 0,
          sys.swap_percent || 0,
          sys.disk_read_bytes || 0,
          sys.disk_write_bytes || 0,
          sys.disk_read_count || 0,
          sys.disk_write_count || 0,
          sys.network_sent_bytes || sys.network_bytes_sent || 0,
          sys.network_recv_bytes || sys.network_bytes_recv || 0,
          sys.network_sent_packets || sys.network_packets_sent || 0,
          sys.network_recv_packets || sys.network_packets_recv || 0,
          sys.uptime || sys.uptime_seconds || 0,
          sys.boot_time || 0
        ]
      );
    }

    if (data.disks && Array.isArray(data.disks)) {
      for (const disk of data.disks) {
        await queryMonitoring(
          'INSERT INTO disk_partitions (host_id, device, mountpoint, fstype, total_bytes, used_bytes, free_bytes, percent_used) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [hostId, disk.device || 'unknown', disk.mountpoint || '/', disk.fstype || 'ext4', disk.total || 0, disk.used || 0, disk.free || 0, disk.percent || 0]
        );
      }
    }

    if (data.network && Array.isArray(data.network)) {
      for (const iface of data.network) {
        await queryMonitoring(
          'INSERT INTO network_interfaces (host_id, interface_name, bytes_sent, bytes_recv, packets_sent, packets_recv) VALUES (?, ?, ?, ?, ?, ?)',
          [hostId, iface.name || 'eth0', iface.bytes_sent || 0, iface.bytes_recv || 0, iface.packets_sent || 0, iface.packets_recv || 0]
        );
      }
    }

    console.log('[v0] ✓✓✓ TODAS LAS MÉTRICAS INSERTADAS CORRECTAMENTE');

    return NextResponse.json({
      status: 'ok',
      message: 'Métricas insertadas correctamente',
      host_id: hostId,
      timestamp: new Date().toISOString()
    });

  } catch (dbError: any) {
    console.error('[v0] ❌ ERROR EN BASE DE DATOS:');
    console.error('[v0] Error message:', dbError.message);
    console.error('[v0] Error code:', dbError.code);
    
    return NextResponse.json({
      status: 'error',
      error: 'Database error: ' + dbError.message,
      message: 'No se pudieron insertar las métricas'
    }, { status: 500 });
  } catch (error: any) {
    console.error('[v0] Error en métricas:', error.message);
    return NextResponse.json({
      status: 'error',
      error: error.message
    }, { status: 500 });
  }
}
