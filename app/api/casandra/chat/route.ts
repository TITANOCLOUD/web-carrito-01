import { type NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(req: NextRequest) {
  const { messages, context } = await req.json()
  const lastMessage = messages[messages.length - 1].content.toLowerCase()

  let response = ""

  if (lastMessage.includes("alerta") || lastMessage.includes("problema")) {
    response = `He detectado ${context.alerts} alertas activas en este momento. Las más críticas son:

- proxmox-cluster-01: CPU al 95%
- spam-filter-01: Disco al 92%

Te recomiendo revisar estos sistemas de inmediato. Ya he generado tareas en tu buzón para cada incidente.`
  } else if (lastMessage.includes("tarea") || lastMessage.includes("pendiente")) {
    response = `Tienes ${context.tasks} tareas pendientes de revisión:

1. Revisar carga de CPU en proxmox-cluster-01 (Alta prioridad)
2. Limpiar espacio en spam-filter-01 (Alta prioridad)
3. Optimizar memoria en vps-web-server-03 (Prioridad media)

¿Necesitas ayuda con alguna de ellas?`
  } else if (lastMessage.includes("reactor") || lastMessage.includes("estado")) {
    response = `El estado general de los reactores es el siguiente:

✅ Hosting Servers: Operacional (100%)
⚠️ Clusters Proxmox: Advertencia (CPU alta)
✅ VPS Servers: Operacional con observación
❌ Spam Filters: Crítico (Disco lleno)
✅ Backup Systems: Operacional (100%)

Te sugiero atender urgentemente el Spam Filter y revisar el Cluster Proxmox.`
  } else if (lastMessage.includes("cpu") || lastMessage.includes("procesador")) {
    response = `La carga de CPU está elevada en varios servidores. Causas comunes:

1. Procesos huérfanos consumiendo recursos
2. Ataques DDoS o tráfico inusual
3. Backups programados en horarios no óptimos

Te recomiendo ejecutar 'top' en proxmox-cluster-01 para identificar el proceso específico.`
  } else {
    response = `Como tu Arquitecta NOC/SOC, estoy monitoreando continuamente toda tu infraestructura. 

Actualmente tengo ${context.alerts} alertas activas y ${context.tasks} tareas pendientes para ti.

Puedo ayudarte con:
- Análisis de alertas críticas
- Recomendaciones de optimización
- Diagnóstico de problemas
- Seguimiento de tareas

¿En qué específicamente puedo asistirte?`
  }

  return NextResponse.json({ message: response })
}
