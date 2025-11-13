import { NextRequest, NextResponse } from 'next/server';
import { queryMonitoring } from '@/lib/db-monitoring';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { hostname, ip_address, description } = await request.json();

    if (!hostname) {
      return NextResponse.json({ error: 'Hostname es requerido' }, { status: 400 });
    }

    // Verificar si el host ya existe
    const existingHost = await queryMonitoring(
      'SELECT host_id, hostname FROM hosts WHERE hostname = ?',
      [hostname]
    ) as any[];

    let hostId: number;

    if (existingHost.length > 0) {
      hostId = existingHost[0].host_id;
      console.log('[v0] Host ya existe:', hostname, 'host_id:', hostId);
    } else {
      // Crear nuevo host
      const result = await queryMonitoring(
        'INSERT INTO hosts (hostname, ip_address, description) VALUES (?, ?, ?)',
        [hostname, ip_address || null, description || null]
      ) as any;

      hostId = result.insertId;
      console.log('[v0] Nuevo host creado:', hostname, 'host_id:', hostId);
    }

    // Verificar si ya tiene un token activo
    const existingToken = await queryMonitoring(
      'SELECT token FROM api_tokens WHERE host_id = ? AND active = 1',
      [hostId]
    ) as any[];

    if (existingToken.length > 0) {
      return NextResponse.json({
        success: true,
        host_id: hostId,
        hostname: hostname,
        api_key: existingToken[0].token,
        message: 'Host ya registrado, token existente'
      });
    }

    // Generar token único
    const token = crypto.randomBytes(32).toString('hex');

    // Guardar token
    await queryMonitoring(
      'INSERT INTO api_tokens (host_id, token) VALUES (?, ?)',
      [hostId, token]
    );

    console.log('[v0] Token generado para host_id:', hostId);

    return NextResponse.json({
      success: true,
      host_id: hostId,
      hostname: hostname,
      api_key: token,
      message: 'Host registrado exitosamente'
    });

  } catch (error: any) {
    console.error('[v0] Error registrando host:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
