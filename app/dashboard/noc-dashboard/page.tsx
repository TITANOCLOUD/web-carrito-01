"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertTriangle, CheckCircle2, Server, TrendingUp, XCircle } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data for uptime history
const generateUptimeData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    uptime: 95 + Math.random() * 5,
  }))
}

export default function NOCDashboardPage() {
  const [hosts, setHosts] = useState([
    // Reactor 1 - CEPH Clusters
    {
      name: "483431-IBG-SCA3-G2-CEPH-BAY-01",
      ip: "72.251.3.93",
      status: "up",
      uptime: 99.98,
      responseTime: 12,
      reactor: 1,
    },
    {
      name: "501691-IBG-SCA3-G2-CEPH-BAY-02",
      ip: "72.251.3.238",
      status: "up",
      uptime: 99.95,
      responseTime: 15,
      reactor: 1,
    },
    {
      name: "493196-IBG-SCA3-G2-CEPH-BAY-03",
      ip: "72.251.3.212",
      status: "up",
      uptime: 99.99,
      responseTime: 10,
      reactor: 1,
    },
    { name: "469453-SCA1-CEPH-BAY-01", ip: "15.235.67.86", status: "up", uptime: 100, responseTime: 8, reactor: 1 },
    { name: "469864-SCA1-CEPH-BAY-02", ip: "15.235.67.180", status: "up", uptime: 99.97, responseTime: 11, reactor: 1 },
    { name: "469855-SCA1-CEPH-BAY-03", ip: "15.235.43.103", status: "up", uptime: 99.92, responseTime: 13, reactor: 1 },
    { name: "COOTRARIS-CEPH-BAY-01", ip: "72.251.3.189", status: "up", uptime: 99.95, responseTime: 14, reactor: 1 },
    { name: "COOTRARIS-CEPH-BAY-02", ip: "72.251.3.227", status: "up", uptime: 99.98, responseTime: 12, reactor: 1 },
    { name: "ICONET-CEPH-BAY-01", ip: "72.251.3.159", status: "up", uptime: 99.96, responseTime: 13, reactor: 1 },
    {
      name: "BETCONNECTIONS-CEPH-BAY-01",
      ip: "72.251.3.108",
      status: "up",
      uptime: 99.94,
      responseTime: 15,
      reactor: 1,
    },

    // Reactor 4 - VPS y Bare Metal
    { name: "VPS-CTRLONLINE-01", ip: "158.69.43.200", status: "up", uptime: 99.99, responseTime: 8, reactor: 4 },
    { name: "VPS-CTRLONLINE-02", ip: "158.69.43.201", status: "up", uptime: 99.97, responseTime: 10, reactor: 4 },
    { name: "VPS-OAKSYSTEM-01", ip: "158.69.43.202", status: "up", uptime: 99.98, responseTime: 9, reactor: 4 },
    {
      name: "506748-IBG-ADVSTO-G2-PBS-01",
      ip: "148.113.216.7",
      status: "up",
      uptime: 99.5,
      responseTime: 12,
      reactor: 4,
    },
    {
      name: "472841-ADVSTORE-G2-PBS-01",
      ip: "148.113.169.29",
      status: "up",
      uptime: 99.96,
      responseTime: 13,
      reactor: 4,
    },
    { name: "PROXMOX-VE-01", ip: "148.113.216.8", status: "up", uptime: 99.99, responseTime: 7, reactor: 4 },
    { name: "PROXMOX-VE-02", ip: "148.113.169.30", status: "up", uptime: 99.98, responseTime: 8, reactor: 4 },

    // Reactor 2 - Correo
    { name: "MAIL-SERVER-01", ip: "158.69.43.210", status: "up", uptime: 99.99, responseTime: 6, reactor: 2 },
    { name: "MAIL-SERVER-02", ip: "158.69.43.211", status: "up", uptime: 99.98, responseTime: 7, reactor: 2 },

    // Reactor 3 - SPAM
    { name: "SPAM-FILTER-01", ip: "158.69.43.220", status: "up", uptime: 99.97, responseTime: 9, reactor: 3 },
    { name: "SPAM-FILTER-02", ip: "158.69.43.221", status: "up", uptime: 99.96, responseTime: 10, reactor: 3 },

    // Websites
    {
      name: "controlonlineinternational.com",
      ip: "158.69.43.230",
      status: "up",
      uptime: 99.99,
      responseTime: 15,
      reactor: 5,
    },
    { name: "controlonline.app", ip: "158.69.43.231", status: "up", uptime: 99.98, responseTime: 16, reactor: 5 },
    { name: "sistemaexcell.com", ip: "158.69.43.232", status: "up", uptime: 99.97, responseTime: 17, reactor: 5 },
    { name: "oaksystem.co", ip: "158.69.43.233", status: "up", uptime: 99.99, responseTime: 14, reactor: 5 },
  ])

  const stats = {
    total: hosts.length,
    up: hosts.filter((h) => h.status === "up").length,
    degraded: hosts.filter((h) => h.status === "degraded").length,
    down: hosts.filter((h) => h.status === "down").length,
    avgUptime: (hosts.reduce((acc, h) => acc + h.uptime, 0) / hosts.length).toFixed(2),
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "up":
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
      case "up":
        return <CheckCircle2 className="w-4 h-4" />
      case "degraded":
        return <AlertTriangle className="w-4 h-4" />
      case "down":
        return <XCircle className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const hostsByReactor = hosts.reduce(
    (acc, host) => {
      const reactor = host.reactor || 0
      if (!acc[reactor]) acc[reactor] = []
      acc[reactor].push(host)
      return acc
    },
    {} as Record<number, typeof hosts>,
  )

  const reactorNames: Record<number, string> = {
    1: "Reactor 1 - CEPH Clusters",
    2: "Reactor 2 - Correo",
    3: "Reactor 3 - SPAM",
    4: "Reactor 4 - VPS y Bare Metal",
    5: "Reactor 5 - Websites",
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard NOC - Disponibilidad de Hosts</h1>
        <p className="text-slate-400">Monitoreo en tiempo real de todos los hosts y servicios</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card className="bg-slate-950 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Hosts</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
              <Server className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-950 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Operacionales</p>
                <p className="text-3xl font-bold text-green-400">{stats.up}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-950 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Degradados</p>
                <p className="text-3xl font-bold text-yellow-400">{stats.degraded}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-950 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Caídos</p>
                <p className="text-3xl font-bold text-red-400">{stats.down}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-950 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Uptime Promedio</p>
                <p className="text-3xl font-bold text-cyan-400">{stats.avgUptime}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Uptime Graph */}
      <Card className="bg-slate-950 border-slate-800 mb-8">
        <CardHeader>
          <CardTitle className="text-white">Disponibilidad General (Últimas 24 horas)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={generateUptimeData()}>
              <XAxis dataKey="time" stroke="#64748b" />
              <YAxis stroke="#64748b" domain={[90, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="uptime" stroke="#06b6d4" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {Object.entries(hostsByReactor).map(([reactor, reactorHosts]) => (
        <Card key={reactor} className="bg-slate-950 border-slate-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white">{reactorNames[Number(reactor)]}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reactorHosts.map((host, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={getStatusColor(host.status)}>{getStatusIcon(host.status)}</div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-sm">{host.name}</h3>
                      <p className="text-slate-500 text-xs">{host.ip}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-slate-400 text-xs">Uptime</p>
                      <p className="text-white font-medium">{host.uptime}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-xs">Response</p>
                      <p className="text-white font-medium">{host.responseTime}ms</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(host.status)}`}>
                      {host.status.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
