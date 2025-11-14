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

    if (tokenResult.length === 0) {
      return NextResponse.json({ error: 'API Key inválida' }, { status: 401 });
    }

    if (!tokenResult[0].active) {
      return NextResponse.json({ error: 'API Key desactivada' }, { status: 403 });
    }

    const hostId = tokenResult[0].host_id;

    const response = NextResponse.json({
      status: 'ok',
      host_id: hostId,
      message: 'Host registrado correctamente'
    });

    Promise.all([
      queryMonitoring(
        'UPDATE api_tokens SET last_used = NOW() WHERE token = ?',
        [apiKey]
      ),
      queryMonitoring(
        `UPDATE hosts SET 
          os_type = ?,
          os_version = ?,
          architecture = ?,
          kernel_version = ?,
          last_seen = NOW()
        WHERE host_id = ?`,
        [
          data.info?.os || 'Linux',
          data.info?.os_version || '',
          data.info?.arch || '',
          data.info?.kernel || '',
          hostId
        ]
      )
    ]).catch(err => console.error('[v0] Error en actualización async:', err));

    console.log(`[v0] Host registrado: ${data.hostname} (ID: ${hostId})`);

    return response;

  } catch (error: any) {
    console.error('[v0] Error en registro:', error);
    return NextResponse.json({
      error: 'Error al registrar host',
      details: error.message
    }, { status: 500 });
  }
}
