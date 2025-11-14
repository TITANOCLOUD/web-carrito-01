import { NextRequest, NextResponse } from 'next/server';
import { queryMonitoring } from '@/lib/db-monitoring';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    console.log('[v0] === REGISTRO INICIADO ===');
    console.log('[v0] Hostname:', data.hostname);

    try {
      // Verificar si el host ya existe
      console.log('[v0] Verificando si host existe...');
      
      const existing = await queryMonitoring(
        'SELECT id FROM hosts WHERE hostname = ? LIMIT 1',
        [data.hostname]
      );

      let hostId;
      
      if (existing && existing.length > 0) {
        hostId = existing[0].id;
        console.log('[v0] Host encontrado con ID:', hostId);
        
        await queryMonitoring(
          'UPDATE hosts SET ip_address = ?, last_seen = NOW() WHERE id = ?',
          [data.ip || data.ip_address || 'unknown', hostId]
        );
        
        console.log('[v0] ✓ Host actualizado correctamente');
      } else {
        console.log('[v0] Host nuevo, insertando...');
        
        const result = await queryMonitoring(
          'INSERT INTO hosts (hostname, ip_address, os_type, os_version, architecture, agent_version) VALUES (?, ?, ?, ?, ?, ?)',
          [
            data.hostname,
            data.ip || data.ip_address || 'unknown',
            data.os_type || data.os || 'unknown',
            data.os_version || 'unknown',
            data.architecture || data.arch || 'unknown',
            data.agent_version || '1.0.0'
          ]
        );
        
        hostId = (result as any).insertId;
        console.log('[v0] ✓ Host insertado con ID:', hostId);
      }

      return NextResponse.json({
        status: 'ok',
        host_id: hostId,
        message: 'Host registrado correctamente'
      });
      
    } catch (dbError: any) {
      console.error('[v0] ❌ ERROR EN BASE DE DATOS:');
      console.error('[v0] Error message:', dbError.message);
      console.error('[v0] Error code:', dbError.code);
      console.error('[v0] Error stack:', dbError.stack);
      
      return NextResponse.json({
        status: 'error',
        error: 'Database error: ' + dbError.message,
        message: 'No se pudo registrar el host en la base de datos'
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('[v0] Error en registro:', error.message);
    return NextResponse.json({
      status: 'error',
      error: error.message
    }, { status: 500 });
  }
}
