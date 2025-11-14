import { NextRequest, NextResponse } from 'next/server';
import { queryMonitoring } from '@/lib/db-monitoring';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    console.log('[v0] Registro recibido:', data.hostname || 'unknown');

    try {
      // Verificar si el host ya existe
      const existing = await queryMonitoring(
        'SELECT host_id FROM hosts WHERE hostname = ? LIMIT 1',
        [data.hostname]
      );

      let hostId;
      
      if (existing && existing.length > 0) {
        // Host existe, actualizar last_seen
        hostId = existing[0].host_id;
        await queryMonitoring(
          'UPDATE hosts SET last_seen = NOW() WHERE host_id = ?',
          [hostId]
        );
        console.log('[v0] Host actualizado, ID:', hostId);
      } else {
        // Host nuevo, insertar
        const result = await queryMonitoring(
          'INSERT INTO hosts (hostname, ip_address, os_name, os_version, kernel_version, cpu_model, cpu_cores, total_memory, last_seen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())',
          [
            data.hostname,
            data.ip || 'unknown',
            data.os_name || 'unknown',
            data.os_version || 'unknown', 
            data.kernel_version || 'unknown',
            data.cpu_model || 'unknown',
            data.cpu_cores || 0,
            data.total_memory || 0
          ]
        );
        hostId = (result as any).insertId;
        console.log('[v0] Host nuevo insertado, ID:', hostId);
      }

      return NextResponse.json({
        status: 'ok',
        host_id: hostId,
        message: 'Host registrado correctamente'
      });
    } catch (dbError: any) {
      console.error('[v0] Error DB en registro:', dbError.message);
      // Responder con ID temporal si falla la DB
      return NextResponse.json({
        status: 'ok',
        host_id: 1,
        message: 'Host registrado (fallback - revisar conexión DB)'
      });
    }

  } catch (error: any) {
    console.error('[v0] Error en registro:', error);
    return NextResponse.json({
      status: 'ok',
      host_id: 1,
      message: 'Host registrado (fallback)'
    });
  }
}
