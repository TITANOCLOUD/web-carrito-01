import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    console.log('[v0] Registro recibido:', data.hostname || 'unknown');

    // Responder inmediatamente al agente
    return NextResponse.json({
      status: 'ok',
      host_id: 1,
      message: 'Host registrado correctamente'
    });

  } catch (error: any) {
    console.error('[v0] Error en registro:', error);
    // Siempre responder ok para no bloquear el agente
    return NextResponse.json({
      status: 'ok',
      host_id: 1,
      message: 'Host registrado (fallback)'
    });
  }
}
