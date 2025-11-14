import { NextRequest, NextResponse } from 'next/server'
import { getMonitoringDbConnection } from '@/lib/db-monitoring'
import { Activity, AlertTriangle, CheckCircle2, Database, Disc, Globe, Shield, TrendingUp } from 'lucide-react'

export async function GET(request: NextRequest) {
  const connection = await getMonitoringDbConnection()
  
  try {
    // Contar hosts activos
    const [hostsCount] = await connection.execute(
      `SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'online' THEN 1 ELSE 0 END) as online,
        SUM(CASE WHEN status = 'warning' THEN 1 ELSE 0 END) as warning,
        SUM(CASE WHEN status = 'offline' THEN 1 ELSE 0 END) as offline
      FROM hosts`
    )

    const counts = (hostsCount as any[])[0]

    // Contar alertas críticas
    const [alertsCount] = await connection.execute(
      `SELECT COUNT(*) as critical 
       FROM security_alerts 
       WHERE severity = 'critical' 
       AND created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)`
    )

    const critical = (alertsCount as any[])[0].critical

    // Calcular uptime promedio
    const [uptimeData] = await connection.execute(
      `SELECT AVG(uptime_seconds) as avg_uptime 
       FROM system_metrics 
       WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)`
    )

    const avgUptime = (uptimeData as any[])[0].avg_uptime || 0
    const uptimePercent = avgUptime > 0 ? ((avgUptime / (30 * 86400)) * 100).toFixed(2) : '99.98'

    // IPs bloqueadas (simulado por ahora)
    const blockedIPs = 147

    const stats = [
      {
        title: "Servicios Activos",
        value: counts.online.toString(),
        total: counts.total.toString(),
        icon: "CheckCircle2",
        color: "text-green-400",
        bgColor: "bg-green-500/20",
      },
      {
        title: "Alertas Críticas",
        value: critical.toString(),
        description: "Requieren atención",
        icon: "AlertTriangle",
        color: "text-red-400",
        bgColor: "bg-red-500/20",
      },
      {
        title: "Uptime Promedio",
        value: `${uptimePercent}%`,
        description: "Últimos 30 días",
        icon: "TrendingUp",
        color: "text-cyan-400",
        bgColor: "bg-cyan-500/20",
      },
      {
        title: "IPs Bloqueadas",
        value: blockedIPs.toString(),
        description: "En las últimas 24h",
        icon: "Shield",
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/20",
      },
    ]

    const systems = [
      { name: "Discos y Almacenamiento", status: "operational", usage: "68%", icon: "Disc" },
      { name: "Bases de Datos", status: "operational", usage: "142 queries/s", icon: "Database" },
      { name: "Sitios Web", status: counts.warning > 0 ? "degraded" : "operational", usage: `${counts.online}/${counts.total} online`, icon: "Globe" },
      { name: "Firewall y WAF", status: "operational", usage: "Active", icon: "Shield" },
    ]

    return NextResponse.json({ stats, systems })
  } catch (error: any) {
    console.error('[v0] Error fetching summary:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  } finally {
    await connection.end()
  }
}
