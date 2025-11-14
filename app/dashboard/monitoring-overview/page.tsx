"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertTriangle, CheckCircle2, Database, Disc, Globe, Shield, TrendingUp, XCircle } from 'lucide-react'

export default function MonitoringOverviewPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState([])
  const [systems, setSystems] = useState([])
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    if (auth !== "true") {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }
    // Cargar datos reales de la API
    fetchRealData()
  }, [router])

  const fetchRealData = async () => {
    try {
      const response = await fetch('/api/hosts/list')
      const data = await response.json()
      // Procesar y actualizar estado con datos reales
      setStats(data.stats)
      setSystems(data.systems)
      setAlerts(data.alerts)
    } catch (error) {
      console.error('Error fetching monitoring data:', error)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-400"
      case "degraded":
        return "text-yellow-400"
      case "down":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle2 className="w-4 h-4" />
      case "degraded":
        return <AlertTriangle className="w-4 h-4" />
      case "down":
        return <XCircle className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/10 border border-red-500/30"
      case "warning":
        return "bg-yellow-500/10 border border-yellow-500/30"
      default:
        return "bg-gray-500/10 border border-gray-500/30"
    }
  }

  const getAlertSeverityTextColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-400"
      case "warning":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard de Monitoreo</h1>
          <p className="text-slate-400">Vista general del estado de todos los sistemas monitoreados</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="bg-slate-950 border-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-2">{stat.title}</p>
                      <p className="text-3xl font-bold text-white mb-1">
                        {stat.value}
                        {stat.total && <span className="text-slate-500 text-lg">/{stat.total}</span>}
                      </p>
                      {stat.description && <p className="text-slate-500 text-xs">{stat.description}</p>}
                    </div>
                    <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Systems Status */}
        <Card className="bg-slate-950 border-slate-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Estado de Sistemas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systems.map((system) => {
                const Icon = system.icon
                return (
                  <div key={system.name} className="flex items-center justify-between p-4 bg-slate-900 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-800 p-3 rounded-lg">
                        <Icon className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{system.name}</h3>
                        <p className="text-slate-500 text-sm">{system.usage}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 ${getStatusColor(system.status)}`}>
                      {getStatusIcon(system.status)}
                      <span className="capitalize">{system.status}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="bg-slate-950 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Alertas Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className={`flex items-start gap-3 p-3 ${getAlertSeverityColor(alert.severity)} rounded-lg`}>
                  <AlertTriangle className="w-5 h-5" style={{ color: getAlertSeverityTextColor(alert.severity) }} />
                  <div className="flex-1">
                    <p className="text-white font-medium">{alert.message}</p>
                    <p className="text-slate-400 text-sm">{alert.timeAgo}</p>
                  </div>
                  <span className="text-xs capitalize bg-slate-800/20 px-2 py-1 rounded">{alert.severity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
