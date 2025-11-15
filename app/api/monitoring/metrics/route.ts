import { NextRequest, NextResponse } from 'next/server';
import { queryMonitoring } from '@/lib/db-monitoring';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const hostId = data.host_id || 1;
    
    console.log('[v0] ========================================');
    console.log('[v0] MÉTRICAS RECIBIDAS - Host ID:', hostId);
    console.log('[v0] Payload completo:', JSON.stringify(data, null, 2));
    console.log('[v0] ========================================');

    let insertedMetrics = 0;

    if (data.cpu_usage !== undefined || data.system) {
      const sys = data.system || data;
      
      const values = [
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
      ];
      
      const sqlQuery = `INSERT INTO system_metrics (
        host_id, cpu_percent, cpu_count, load_avg_1, load_avg_5, load_avg_15,
        memory_total, memory_used, memory_available, memory_percent,
        swap_total, swap_used, swap_percent,
        disk_read_bytes, disk_write_bytes, disk_read_count, disk_write_count,
        network_sent_bytes, network_recv_bytes, network_sent_packets, network_recv_packets,
        uptime_seconds, boot_time
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      
      console.log('[v0] 📝 SQL Query:', sqlQuery);
      console.log('[v0] 📊 Valores (', values.length, '):', values);
      
      try {
        const result = await queryMonitoring(sqlQuery, values);
        
        console.log('[v0] 📋 Resultado completo del INSERT:', JSON.stringify(result, null, 2));
        console.log('[v0] 📈 Affected rows:', result?.affectedRows);
        console.log('[v0] 🆔 Insert ID:', result?.insertId);
        
        if (result && result.affectedRows > 0) {
          insertedMetrics++;
          console.log('[v0] ✅ System metrics insertadas exitosamente');
        } else {
          console.error('[v0] ⚠️ INSERT ejecutado pero no afectó ninguna fila');
          throw new Error(`INSERT no afectó filas. Resultado: ${JSON.stringify(result)}`);
        }
      } catch (insertError: any) {
        console.error('[v0] ❌ ERROR FATAL al insertar system_metrics');
        console.error('[v0] Error message:', insertError.message);
        console.error('[v0] Error code:', insertError.code);
        console.error('[v0] Error errno:', insertError.errno);
        console.error('[v0] SQL State:', insertError.sqlState);
        console.error('[v0] Full error:', JSON.stringify(insertError, null, 2));
        
        return NextResponse.json({
          status: 'error',
          error: insertError.message,
          details: {
            code: insertError.code,
            errno: insertError.errno,
            sqlState: insertError.sqlState
          },
          message: 'Error al insertar métricas del sistema'
        }, { status: 500 });
      }
    }

    if (data.disks && Array.isArray(data.disks)) {
      console.log('[v0] Procesando', data.disks.length, 'discos');
      for (const disk of data.disks) {
        try {
          const result = await queryMonitoring(
            'INSERT INTO disk_partitions (host_id, device, mountpoint, filesystem_type, total_space, used_space, free_space, usage_percent) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [hostId, disk.device || 'unknown', disk.mountpoint || '/', disk.fstype || disk.filesystem_type || 'ext4', disk.total || disk.total_space || 0, disk.used || disk.used_space || 0, disk.free || disk.free_space || 0, disk.percent || disk.usage_percent || 0]
          );
          console.log('[v0] ✅ Disco insertado:', disk.device, '- Affected rows:', result?.affectedRows);
          if (result && result.affectedRows > 0) {
            insertedMetrics++;
          }
        } catch (diskError: any) {
          console.error('[v0] ❌ ERROR al insertar disco:', disk.device, '- Error:', diskError.message);
        }
      }
    }

    if (data.network && Array.isArray(data.network)) {
      console.log('[v0] Procesando', data.network.length, 'interfaces de red');
      for (const iface of data.network) {
        try {
          const result = await queryMonitoring(
            'INSERT INTO network_interfaces (host_id, interface_name, bytes_sent, bytes_recv, packets_sent, packets_recv) VALUES (?, ?, ?, ?, ?, ?)',
            [hostId, iface.name || 'eth0', iface.bytes_sent || 0, iface.bytes_recv || 0, iface.packets_sent || 0, iface.packets_recv || 0]
          );
          console.log('[v0] ✅ Interface insertada:', iface.name, '- Affected rows:', result?.affectedRows);
          if (result && result.affectedRows > 0) {
            insertedMetrics++;
          }
        } catch (netError: any) {
          console.error('[v0] ❌ ERROR al insertar interface:', iface.name, '- Error:', netError.message);
        }
      }
    }

    console.log('[v0] ====================================');
    console.log('[v0] ✅ MÉTRICAS PROCESADAS:', insertedMetrics, 'registros insertados');
    console.log('[v0] ====================================');

    return NextResponse.json({
      status: 'ok',
      message: 'Métricas insertadas correctamente',
      host_id: hostId,
      inserted_count: insertedMetrics,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('[v0] ❌❌❌ ERROR CRÍTICO EN ENDPOINT DE MÉTRICAS');
    console.error('[v0] Error message:', error.message);
    console.error('[v0] Error code:', error.code);
    console.error('[v0] Stack trace:', error.stack);
    
    return NextResponse.json({
      status: 'error',
      error: error.message || 'Error desconocido',
      message: 'No se pudieron insertar las métricas'
    }, { status: 500 });
  }
}
