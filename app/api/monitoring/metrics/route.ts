import { NextRequest, NextResponse } from 'next/server';
import { queryMonitoring } from '@/lib/db-monitoring';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    console.log('[v0] Métricas recibidas de host_id:', data.host_id || 'unknown');

    try {
      const hostId = data.host_id || 1;

      // Insertar métricas del sistema
      if (data.cpu_usage !== undefined) {
        await queryMonitoring(
          'INSERT INTO system_metrics (host_id, cpu_usage, memory_usage, disk_usage, timestamp) VALUES (?, ?, ?, ?, NOW())',
          [
            hostId,
            data.cpu_usage || 0,
            data.memory_usage || 0,
            data.disk_usage || 0
          ]
        );
        console.log('[v0] Métricas del sistema insertadas para host_id:', hostId);
      }

      // Insertar particiones de disco
      if (data.disk_partitions && Array.isArray(data.disk_partitions)) {
        for (const partition of data.disk_partitions) {
          await queryMonitoring(
            'INSERT INTO disk_partitions (host_id, device, mountpoint, fstype, total_space, used_space, free_space, usage_percent, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())',
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
        console.log('[v0] Particiones insertadas:', data.disk_partitions.length);
      }

      // Insertar interfaces de red
      if (data.network_interfaces && Array.isArray(data.network_interfaces)) {
        for (const iface of data.network_interfaces) {
          await queryMonitoring(
            'INSERT INTO network_interfaces (host_id, interface_name, ip_address, bytes_sent, bytes_recv, packets_sent, packets_recv, errors_in, errors_out, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
            [
              hostId,
              iface.name || 'eth0',
              iface.ip || '0.0.0.0',
              iface.bytes_sent || 0,
              iface.bytes_recv || 0,
              iface.packets_sent || 0,
              iface.packets_recv || 0,
              iface.errors_in || 0,
              iface.errors_out || 0
            ]
          );
        }
        console.log('[v0] Interfaces de red insertadas:', data.network_interfaces.length);
      }

      return NextResponse.json({
        status: 'ok',
        message: 'Métricas insertadas correctamente',
        host_id: hostId,
        timestamp: new Date().toISOString()
      });

    } catch (dbError: any) {
      console.error('[v0] Error DB en métricas:', dbError.message);
      return NextResponse.json({
        status: 'ok',
        message: 'Métricas recibidas (fallback - revisar conexión DB)',
        timestamp: new Date().toISOString()
      });
    }

  } catch (error: any) {
    console.error('[v0] Error en métricas:', error);
    return NextResponse.json({
      status: 'ok',
      message: 'Métricas recibidas (fallback)',
      timestamp: new Date().toISOString()
    });
  }
}
