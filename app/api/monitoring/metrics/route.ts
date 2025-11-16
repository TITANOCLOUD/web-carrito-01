import { NextRequest, NextResponse } from 'next/server';
import { getMonitoringPool } from '@/lib/db-monitoring';

export async function POST(request: NextRequest) {
  let pool;
  
  try {
    const data = await request.json();
    
    const hostId = data.host_id;
    const cpu = data.cpu || {};
    const load = data.load || {};
    const memory = data.memory || {};
    const diskIo = data.disk_io || {};
    const network = data.network || {};
    const uptime = data.uptime || 0;
    
    console.log('[v0] ========================================');
    console.log('[v0] MÉTRICAS RECIBIDAS DEL AGENTE');
    console.log('[v0] Host ID:', hostId);
    console.log('[v0] CPU:', cpu);
    console.log('[v0] Load:', load);
    console.log('[v0] Memory:', memory);
    console.log('[v0] ========================================');

    if (!hostId) {
      return NextResponse.json({
        status: 'error',
        message: 'host_id es requerido'
      }, { status: 400 });
    }

    pool = getMonitoringPool();
    
    const values = [
      hostId,                           // 1. host_id
      cpu.percent || 0,                 // 2. cpu_percent
      cpu.cores || 0,                   // 3. cpu_count
      load['1'] || 0,                   // 4. load_average_1
      load['5'] || 0,                   // 5. load_average_5
      load['15'] || 0,                  // 6. load_average_15
      memory.ram_total || 0,            // 7. memory_total
      memory.ram_used || 0,             // 8. memory_used
      memory.ram_free || 0,             // 9. memory_available
      memory.ram_percent || 0,          // 10. memory_percent
      memory.swap_total || 0,           // 11. swap_total
      memory.swap_used || 0,            // 12. swap_used
      memory.swap_percent || 0,         // 13. swap_percent
      diskIo.read_bytes || 0,           // 14. disk_read_bytes
      diskIo.write_bytes || 0,          // 15. disk_write_bytes
      diskIo.reads || 0,                // 16. disk_read_count
      diskIo.writes || 0,               // 17. disk_write_count
      network.bytes_sent || 0,          // 18. network_bytes_sent
      network.bytes_recv || 0,          // 19. network_bytes_recv
      network.packets_sent || 0,        // 20. network_packets_sent
      network.packets_recv || 0,        // 21. network_packets_recv
      uptime,                           // 22. uptime_seconds
      0                                 // 23. boot_time (opcional, lo calculamos después si es necesario)
    ];
    
    console.log('[v0] 📊 Valores mapeados:', values.length, 'campos');
    console.log('[v0] 📋 Valores:', values);
    
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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const [result]: any = await pool.execute(sqlQuery, values);
    
    console.log('[v0] ✅ INSERT ejecutado');
    console.log('[v0] 📈 Affected rows:', result.affectedRows);
    console.log('[v0] 🆔 Insert ID:', result.insertId);
    
    if (result.affectedRows === 0) {
      throw new Error('INSERT no afectó ninguna fila');
    }

    console.log('[v0] ✅✅✅ Métrica insertada correctamente en system_metrics');

    return NextResponse.json({
      status: 'ok',
      message: 'Métricas insertadas correctamente',
      host_id: hostId,
      inserted_id: result.insertId,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('[v0] ❌ ERROR:', error.message);
    console.error('[v0] Stack:', error.stack);
    if (error.code) console.error('[v0] SQL Code:', error.code);
    if (error.sqlState) console.error('[v0] SQL State:', error.sqlState);
    
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
