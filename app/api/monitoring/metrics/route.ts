import { NextRequest, NextResponse } from 'next/server';
import { getMonitoringPool } from '@/lib/db-monitoring';

export async function POST(request: NextRequest) {
  let pool;
  
  try {
    const data = await request.json();
    const hostId = data.host_id || 1;
    
    console.log('[v0] ========================================');
    console.log('[v0] MÉTRICAS RECIBIDAS - Host ID:', hostId);
    console.log('[v0] ========================================');

    pool = getMonitoringPool();
    let insertedMetrics = 0;

    if (data.cpu_usage !== undefined || data.system) {
      const sys = data.system || data;
      
      const values = [
        hostId,                                              // 1
        sys.cpu_percent || sys.cpu_usage || 0,              // 2
        sys.cpu_count || sys.cpu_cores || 0,                // 3
        sys.load_avg_1 || sys.load_average?.[0] || 0,       // 4
        sys.load_avg_5 || sys.load_average?.[1] || 0,       // 5
        sys.load_avg_15 || sys.load_average?.[2] || 0,      // 6
        sys.memory_total || 0,                              // 7
        sys.memory_used || 0,                               // 8
        sys.memory_available || 0,                          // 9
        sys.memory_percent || sys.memory_usage || 0,        // 10
        sys.swap_total || 0,                                // 11
        sys.swap_used || 0,                                 // 12
        sys.swap_percent || 0,                              // 13
        sys.disk_read_bytes || 0,                           // 14
        sys.disk_write_bytes || 0,                          // 15
        sys.disk_read_count || 0,                           // 16
        sys.disk_write_count || 0,                          // 17
        sys.network_sent_bytes || sys.network_bytes_sent || 0,  // 18
        sys.network_recv_bytes || sys.network_bytes_recv || 0,  // 19
        sys.network_sent_packets || sys.network_packets_sent || 0, // 20
        sys.network_recv_packets || sys.network_packets_recv || 0, // 21
        sys.uptime || sys.uptime_seconds || 0,              // 22
        sys.boot_time || 0                                  // 23
      ];
      
      console.log('[v0] 📊 Valores preparados:', values.length, 'campos');
      
      const sqlQuery = `
        INSERT INTO system_metrics (
          host_id, cpu_percent, cpu_count, 
          load_average_1, load_average_5, load_average_15,
          memory_total, memory_used, memory_available, memory_percent,
          swap_total, swap_used, swap_percent,
          disk_read_bytes, disk_write_bytes, disk_read_count, disk_write_count,
          network_bytes_sent, network_bytes_recv, 
          network_packets_sent, network_packets_recv,
          uptime_seconds, boot_time
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      try {
        const [result]: any = await pool.execute(sqlQuery, values);
        
        console.log('[v0] ✅ INSERT ejecutado');
        console.log('[v0] 📈 Affected rows:', result.affectedRows);
        console.log('[v0] 🆔 Insert ID:', result.insertId);
        
        if (result.affectedRows > 0) {
          insertedMetrics++;
          console.log('[v0] ✅✅ System metrics insertadas: ID', result.insertId);
        } else {
          console.error('[v0] ⚠️ INSERT no afectó filas');
          throw new Error('INSERT no afectó ninguna fila en system_metrics');
        }
      } catch (insertError: any) {
        console.error('[v0] ❌ ERROR al insertar system_metrics:', insertError.message);
        console.error('[v0] SQL State:', insertError.sqlState);
        console.error('[v0] Error code:', insertError.code);
        console.error('[v0] SQL Query:', sqlQuery);
        console.error('[v0] Values:', values);
        
        return NextResponse.json({
          status: 'error',
          error: insertError.message,
          code: insertError.code,
          message: 'Error al insertar métricas del sistema'
        }, { status: 500 });
      }
    }

    console.log('[v0] ====================================');
    console.log('[v0] ✅ TOTAL INSERTADO:', insertedMetrics, 'registros');
    console.log('[v0] ====================================');

    return NextResponse.json({
      status: 'ok',
      message: 'Métricas insertadas correctamente',
      host_id: hostId,
      inserted_count: insertedMetrics,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('[v0] ❌ ERROR CRÍTICO:', error.message);
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
    message: 'Endpoint de métricas activo'
  });
}
