import { NextRequest, NextResponse } from 'next/server';
import { queryMonitoring } from '@/lib/db-monitoring';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      console.log('[v0] No token provided');
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const tokenResult = await queryMonitoring(
      'SELECT host_id FROM api_tokens WHERE token = ? AND active = 1',
      [token]
    ) as any[];

    if (tokenResult.length === 0) {
      console.log('[v0] Invalid token');
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const hostId = tokenResult[0].host_id;
    const data = await request.json();

    console.log('[v0] Receiving metrics for host_id:', hostId);

    await queryMonitoring(
      `INSERT INTO metrics (
        host_id, cpu_usage, memory_total, memory_used, memory_free,
        disk_total, disk_used, disk_free, network_rx, network_tx,
        load_avg, uptime, processes, cpu_model, os_version
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        hostId,
        data.cpu_usage,
        data.memory.total,
        data.memory.used,
        data.memory.free,
        data.disk.total,
        data.disk.used,
        data.disk.free,
        data.network.rx_bytes,
        data.network.tx_bytes,
        data.load_avg,
        data.uptime,
        data.processes,
        data.cpu_model,
        data.os_version
      ]
    );

    console.log('[v0] Metrics saved successfully');

    return NextResponse.json({ success: true, message: 'Metrics received' });
  } catch (error: any) {
    console.error('[v0] Error saving metrics:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Test de conexión a base de datos
    await queryMonitoring('SELECT 1');
    
    return NextResponse.json({
      status: 'ok',
      service: 'Monitoring API',
      database: 'data-monitoring',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      error: error.message
    }, { status: 500 });
  }
}
