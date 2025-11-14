import { NextRequest, NextResponse } from 'next/server';
import { queryMonitoring } from '@/lib/db-monitoring';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validar API Key
    const apiKey = data.api_key;
    if (!apiKey) {
      return NextResponse.json({ error: 'API Key requerida' }, { status: 401 });
    }

    // Verificar si el token existe en la base de datos
    const tokenResult = await queryMonitoring(
      'SELECT host_id, active FROM api_tokens WHERE token = ?',
      [apiKey]
    ) as any[];

    if (tokenResult.length === 0) {
      return NextResponse.json({ error: 'API Key inválida' }, { status: 401 });
    }

    if (!tokenResult[0].active) {
      return NextResponse.json({ error: 'API Key desactivada' }, { status: 403 });
    }

    const hostId = tokenResult[0].host_id;

    // Actualizar last_used del token
    await queryMonitoring(
      'UPDATE api_tokens SET last_used = NOW() WHERE token = ?',
      [apiKey]
    );

    // Actualizar información del host
    const info = data.info || {};
    await queryMonitoring(
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
    );

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
