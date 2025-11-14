import { NextRequest, NextResponse } from 'next/server';
import { queryMonitoring } from '@/lib/db-monitoring';

export async function POST(request: NextRequest) {
  try {
    console.log('[v0] Registro iniciado');
    const data = await request.json();

    const apiKey = data.api_key || data.apikey;
    if (!apiKey) {
      console.log('[v0] API Key faltante');
      return NextResponse.json({ error: 'API Key requerida' }, { status: 401 });
    }

    const tokenResult = await queryMonitoring(
      'SELECT host_id, active FROM api_tokens WHERE token = ? LIMIT 1',
      [apiKey]
    ) as any[];

    if (tokenResult.length === 0) {
      console.log('[v0] API Key no encontrada');
      return NextResponse.json({ error: 'API Key inválida' }, { status: 401 });
    }

    if (!tokenResult[0].active) {
      console.log('[v0] API Key desactivada');
      return NextResponse.json({ error: 'API Key desactivada' }, { status: 403 });
    }

    const hostId = tokenResult[0].host_id;

    const info = data.info || {};
    
    // No esperamos a que termine esta actualización
    queryMonitoring(
      `UPDATE hosts SET 
        os_type = ?,
        os_version = ?,
        architecture = ?,
        kernel_version = ?,
        last_seen = NOW()
      WHERE host_id = ?`,
      [
        info.os || 'Linux',
        info.os_version || '',
        info.arch || '',
        info.kernel || '',
        hostId
      ]
    ).catch(err => console.error('[v0] Error actualizando host:', err));

    // No esperamos a que termine esta actualización
    queryMonitoring(
      'UPDATE api_tokens SET last_used = NOW() WHERE token = ?',
      [apiKey]
    ).catch(err => console.error('[v0] Error actualizando token:', err));

    console.log(`[v0] Host registrado: ${data.hostname} (ID: ${hostId})`);

    return NextResponse.json({
      status: 'ok',
      host_id: hostId,
      message: 'Host registrado correctamente'
    });

  } catch (error: any) {
    console.error('[v0] Error en registro:', error);
    return NextResponse.json({
      error: 'Error al registrar host',
      details: error.message
    }, { status: 500 });
  }
}
