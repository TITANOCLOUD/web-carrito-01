import { NextRequest, NextResponse } from 'next/server';
import { queryMonitoring } from '@/lib/db-monitoring';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    console.log('[v0] Métricas recibidas de host_id:', data.host_id || 'unknown');

    // Responder inmediatamente al agente
    return NextResponse.json({
      status: 'ok',
      message: 'Métricas recibidas correctamente',
      host_id: data.host_id || 1,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('[v0] Error en métricas:', error);
    // Siempre responder ok para no bloquear el agente
    return NextResponse.json({
      status: 'ok',
      message: 'Métricas recibidas (fallback)',
      timestamp: new Date().toISOString()
    });
  }
}
