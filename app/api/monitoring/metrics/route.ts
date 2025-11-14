import { NextRequest, NextResponse } from 'next/server';
import { queryMonitoring } from '@/lib/db-monitoring';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const apiKey = data.api_key;
    if (!apiKey) {
      return NextResponse.json({ error: 'API Key requerida' }, { status: 401 });
    }

    const tokenResult = await queryMonitoring(
      'SELECT host_id, active FROM api_tokens WHERE token = ? LIMIT 1',
      [apiKey]
    ) as any[];

    if (tokenResult.length === 0 || !tokenResult[0].active) {
      return NextResponse.json({ error: 'API Key inválida' }, { status: 401 });
    }

    const hostId = data.host_id || tokenResult[0].host_id;

    const response = NextResponse.json({
      status: 'ok',
      message: 'Métricas recibidas',
      host_id: hostId,
      timestamp: new Date().toISOString()
    });

    setImmediate(async () => {
      try {
        const cpu = data.cpu || {};
        const load = data.load || {};
        const memory = data.memory || {};
        const diskIo = data.disk_io || {};
        const network = data.network || {};

        // Insertar métricas del sistema
        await queryMonitoring(
          `INSERT INTO system_metrics (
            host_id, timestamp,
            cpu_percent, cpu_count,
            load_average_1, load_average_5, load_average_15,
            memory_total, memory_used, memory_available, memory_percent,
            swap_total, swap_used, swap_percent,
            disk_read_bytes, disk_write_bytes, disk_read_count, disk_write_count,
            network_bytes_sent, network_bytes_recv, network_packets_sent, network_packets_recv,
            uptime_seconds
          ) VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            hostId,
            cpu.percent || 0,
            cpu.cores || 0,
            load['1'] || 0,
            load['5'] || 0,
            load['15'] || 0,
            memory.ram_total || 0,
            memory.ram_used || 0,
            memory.ram_free || 0,
            memory.ram_percent || 0,
            memory.swap_total || 0,
            memory.swap_used || 0,
            memory.swap_percent || 0,
            diskIo.read_bytes || 0,
            diskIo.write_bytes || 0,
            diskIo.reads || 0,
            diskIo.writes || 0,
            network.bytes_sent || 0,
            network.bytes_recv || 0,
            network.packets_sent || 0,
            network.packets_recv || 0,
            data.uptime || 0
          ]
        );

        // Actualizar last_seen
        await queryMonitoring(
          'UPDATE hosts SET last_seen = NOW() WHERE host_id = ?',
          [hostId]
        );

        // Insertar particiones de disco
        const filesystems = data.filesystems || {};
        for (const [mountpoint, fs] of Object.entries(filesystems) as any) {
          await queryMonitoring(
            `INSERT INTO disk_partitions (
              host_id, timestamp, device, mountpoint, fstype,
              total_bytes, used_bytes, free_bytes, percent_used
            ) VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?)`,
            [
              hostId,
              fs.device || mountpoint,
              mountpoint,
              fs.fstype || 'unknown',
              fs.total || 0,
              fs.used || 0,
              fs.free || 0,
              fs.percent || 0
            ]
          );
        }

        // Insertar interfaces de red
        const interfaces = data.interfaces || {};
        for (const [ifaceName, addrs] of Object.entries(interfaces) as any) {
          if (Array.isArray(addrs)) {
            for (const addr of addrs) {
              await queryMonitoring(
                `INSERT INTO network_interfaces (
                  host_id, timestamp, interface_name, ip_address, ip_type, netmask, broadcast
                ) VALUES (?, NOW(), ?, ?, ?, ?, ?)`,
                [
                  hostId,
                  ifaceName,
                  addr.address || '',
                  addr.family || 'IPv4',
                  addr.netmask || null,
                  addr.broadcast || null
                ]
              );
            }
          }
        }

        console.log(`[v0] Métricas almacenadas para host_id: ${hostId}`);
      } catch (error: any) {
        console.error('[v0] Error almacenando métricas en background:', error);
      }
    });

    return response;

  } catch (error: any) {
    console.error('[v0] Error procesando métricas:', error);
    return NextResponse.json({
      error: 'Error al procesar métricas',
      details: error.message
    }, { status: 500 });
  }
}
