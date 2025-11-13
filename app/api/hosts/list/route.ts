import { NextRequest, NextResponse } from 'next/server';
import { queryMonitoring } from '@/lib/db-monitoring';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const reactor = searchParams.get('reactor');

    let query = `
      SELECT 
        h.*,
        m.cpu_usage,
        m.memory_used,
        m.memory_total,
        m.disk_used,
        m.disk_total,
        m.created_at as last_seen
      FROM hosts h
      LEFT JOIN (
        SELECT * FROM metrics m1
        WHERE id IN (
          SELECT MAX(id) FROM metrics GROUP BY host_id
        )
      ) m ON h.id = m.host_id
      WHERE 1=1
    `;

    const params: any[] = [];

    if (type) {
      query += ' AND h.type = ?';
      params.push(type);
    }

    if (reactor) {
      query += ' AND h.reactor_id = ?';
      params.push(parseInt(reactor));
    }

    query += ' ORDER BY h.reactor_id, h.name';

    const hosts = await queryMonitoring(query, params) as any[];

    console.log('[v0] Fetched hosts:', hosts.length);

    return NextResponse.json({ hosts });
  } catch (error: any) {
    console.error('[v0] Error fetching hosts:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
