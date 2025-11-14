import { NextRequest, NextResponse } from 'next/server';
import { queryMonitoring } from '@/lib/db-monitoring';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    console.log('[v0] === MÉTRICAS RECIBIDAS ===');
    console.log('[v0] Host ID:', data.host_id);
    console.log('[v0] CPU:', data.cpu_usage + '%');
    console.log('[v0] Memory:', data.memory_usage + '%');

    try {
      const hostId = data.host_id || 1;

      // Insertar métricas del sistema y verificar resultado
      if (data.cpu_usage !== undefined) {
        console.log('[v0] Insertando métricas del sistema...');
        
        const result = await queryMonitoring(
          'INSERT INTO system_metrics (host_id, cpu_usage, memory_usage, disk_usage, timestamp) VALUES (?, ?, ?, ?, NOW())',
          [
            hostId,
            data.cpu_usage || 0,
            data.memory_usage || 0,
            data.disk_usage || 0
          ]
        );
        
        console.log('[v0] ✓ Métricas del sistema insertadas, insertId:', (result as any).insertId);
      }

      if (data.disk_partitions && Array.isArray(data.disk_partitions)) {
        console.log('[v0] Insertando', data.disk_partitions.length, 'particiones...');
        
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
        
        console.log('[v0] ✓ Particiones insertadas');
      }

      if (data.network_interfaces && Array.isArray(data.network_interfaces)) {
        console.log('[v0] Insertando', data.network_interfaces.length, 'interfaces...');
        
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
        
        console.log('[v0] ✓ Interfaces insertadas');
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
    }

  } catch (error: any) {
    console.error('[v0] ❌ Error general en métricas:', error);
    return NextResponse.json({
      status: 'error',
      error: error.message
    }, { status: 500 });
  }
}
