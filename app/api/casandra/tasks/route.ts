import { NextResponse } from "next/server"

export const runtime = "edge"

export async function GET() {
  const tasks = [
    {
      id: "task-001",
      title: "Revisar carga de CPU en proxmox-cluster-01",
      description: "La CPU ha estado al 95% por más de 2 minutos. Verificar procesos y considerar escalado.",
      priority: "high" as const,
      status: "pending" as const,
      createdAt: new Date(Date.now() - 120000),
      relatedHost: "proxmox-cluster-01",
    },
    {
      id: "task-002",
      title: "Limpiar espacio en spam-filter-01",
      description: "El disco está al 92%. Limpiar logs antiguos y archivos temporales.",
      priority: "high" as const,
      status: "pending" as const,
      createdAt: new Date(Date.now() - 60000),
      relatedHost: "spam-filter-01",
    },
    {
      id: "task-003",
      title: "Optimizar memoria en vps-web-server-03",
      description: "RAM al 82%. Revisar procesos y considerar restart de servicios.",
      priority: "medium" as const,
      status: "pending" as const,
      createdAt: new Date(Date.now() - 300000),
      relatedHost: "vps-web-server-03",
    },
    {
      id: "task-004",
      title: "Actualización de certificados SSL",
      description: "3 certificados SSL vencen en los próximos 7 días. Renovar.",
      priority: "medium" as const,
      status: "completed" as const,
      createdAt: new Date(Date.now() - 86400000),
    },
  ]

  return NextResponse.json({ tasks })
}

export async function PATCH() {
  // Simular actualización de tarea
  return NextResponse.json({ success: true })
}
