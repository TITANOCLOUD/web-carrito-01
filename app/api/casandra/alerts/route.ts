import { NextResponse } from "next/server"

export const runtime = "edge"

export async function GET() {
  const alerts = [
    {
      id: "alert-001",
      severity: "red" as const,
      host: "proxmox-cluster-01",
      message: "CPU al 95% - Carga crítica detectada",
      timestamp: new Date(Date.now() - 120000),
      reactor: "Clusters Proxmox",
      metric: "CPU Usage",
      value: "95%",
      threshold: "> 90%",
    },
    {
      id: "alert-002",
      severity: "yellow" as const,
      host: "vps-web-server-03",
      message: "Memoria RAM al 82% - Advertencia",
      timestamp: new Date(Date.now() - 300000),
      reactor: "VPS Servers",
      metric: "RAM Usage",
      value: "82%",
      threshold: "> 80%",
    },
    {
      id: "alert-003",
      severity: "red" as const,
      host: "spam-filter-01",
      message: "Disco al 92% - Espacio crítico",
      timestamp: new Date(Date.now() - 60000),
      reactor: "Spam Filters",
      metric: "Disk Usage",
      value: "92%",
      threshold: "> 90%",
    },
  ]

  return NextResponse.json({ alerts })
}
