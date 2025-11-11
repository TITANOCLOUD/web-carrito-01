"use client"

import { use, useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, Server, Network, HardDrive, Cpu, ChevronLeft } from "lucide-react"
import Link from "next/link"

interface HostMetrics {
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
  networkIn: number
  networkOut: number
  uptime: number
  ping: number
}

export default function HostMonitorPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [metrics, setMetrics] = useState<HostMetrics>({
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0,
    networkIn: 0,
    networkOut: 0,
    uptime: 0,
    ping: 0,
  })
  const [host, setHost] = useState<any>(null)

  useEffect(() => {
    console.log("[v0] Solicitando métricas para host:", resolvedParams.id)

    // Simular carga de host y métricas
    const mockHost = {
      id: resolvedParams.id,
      name: `Host-${resolvedParams.id}`,
      ip: "192.168.1." + Math.floor(Math.random() * 255),
      type: "CEPH",
      reactor: 1,
      status: "online",
    }

    setHost(mockHost)

    const interval = setInterval(() => {
      setMetrics({
        cpuUsage: Math.random() * 100,
        memoryUsage: Math.random() * 100,
        diskUsage: Math.random() * 100,
        networkIn: Math.random() * 1000,
        networkOut: Math.random() * 1000,
        uptime: Date.now(),
        ping: Math.random() * 50,
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [resolvedParams.id])

  if (!host) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Activity className="w-12 h-12 animate-spin mx-auto mb-4 text-cyan-500" />
          <p className="text-slate-400">Cargando información del host...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/noc-dashboard">
            <Button variant="outline" size="icon">
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">{host.name}</h1>
            <p className="text-slate-400">{host.ip}</p>
          </div>
        </div>
        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
          <Activity className="w-3 h-3 mr-1" />
          {host.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              CPU Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.cpuUsage.toFixed(1)}%</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Server className="w-4 h-4" />
              Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.memoryUsage.toFixed(1)}%</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <HardDrive className="w-4 h-4" />
              Disk Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.diskUsage.toFixed(1)}%</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Network className="w-4 h-4" />
              Ping
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.ping.toFixed(0)}ms</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Network Traffic</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Incoming</span>
                <span className="text-cyan-400">{metrics.networkIn.toFixed(2)} MB/s</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 transition-all duration-500"
                  style={{ width: `${Math.min(metrics.networkIn / 10, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Outgoing</span>
                <span className="text-purple-400">{metrics.networkOut.toFixed(2)} MB/s</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 transition-all duration-500"
                  style={{ width: `${Math.min(metrics.networkOut / 10, 100)}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">System Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Reactor</span>
              <span className="text-white">Reactor {host.reactor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Type</span>
              <span className="text-white">{host.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">IP Address</span>
              <span className="text-white">{host.ip}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Host ID</span>
              <span className="text-white">{host.id}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
