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
        'SELECT host_id FROM hosts WHERE hostname = ? LIMIT 1',
        [data.hostname]
      );

      let hostId;
      
      if (existing && existing.length > 0) {
        hostId = existing[0].host_id;
        console.log('[v0] Host encontrado con ID:', hostId);
        
        await queryMonitoring(
          'UPDATE hosts SET last_seen = NOW() WHERE host_id = ?',
          [hostId]
        );
        
        console.log('[v0] ✓ Host actualizado correctamente');
      } else {
        console.log('[v0] Host nuevo, insertando...');
        
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
    console.error('[v0] ❌ Error general en registro:', error);
    return NextResponse.json({
      status: 'error',
      error: error.message
    }, { status: 500 });
  }
}
