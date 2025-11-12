"use client"

import { CardDescription } from "@/components/ui/card"

import { useEffect, useState } from "react"
import { use } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Activity,
  HardDrive,
  Cpu,
  Network,
  Server,
  Globe,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react"

interface HostDetails {
  id: string
  name: string
  ip: string
  status: "online" | "warning" | "offline"
  type: string
  reactor: number

  // Datos SNMP (para servidores físicos)
  snmp?: {
    osVersion: string
    uptime: string
    cpu: {
      usage: number
      cores: number
      model: string
    }
    memory: {
      total: number
      used: number
      free: number
    }
    disks: Array<{
      name: string
      size: number
      used: number
      mountPoint: string
    }>
    network: {
      interfaces: Array<{
        name: string
        status: "up" | "down"
        speed: string
        rx: number
        tx: number
      }>
    }
    hardware: string[]
  }

  // Datos web (para sitios web)
  web?: {
    lastCheck: string
    responseTime: number
    statusCode: number
    sslCert: {
      valid: boolean
      issuer: string
      expiryDate: string
      daysRemaining: number
    }
    blacklistStatus: {
      isListed: boolean
      lists: string[]
    }
    openSpeed: number
    closeSpeed: number
  }

  // Ping continuo
  ping: {
    current: number
    average: number
    min: number
    max: number
    packetLoss: number
    history: number[]
  }

  // Trazabilidad de red
  traceroute?: {
    hops: Array<{
      hop: number
      ip: string
      hostname: string
      latency: number
    }>
    lastFailedHop?: number
  }
}

type TimeRange = "1h" | "12h" | "24h" | "week" | "month" | "year"

interface MetricData {
  cpu: number[]
  memory: number[]
  disk: number[]
  network: number[]
  timestamps: string[]
}

export default function HostMonitorPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const [hostData, setHostData] = useState<HostDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [pingInterval, setPingInterval] = useState<NodeJS.Timeout | null>(null)
  const [timeRange, setTimeRange] = useState<TimeRange>("24h")
  const [metrics, setMetrics] = useState<MetricData | null>(null)

  useEffect(() => {
    console.log("[v0] Cargando datos del host:", resolvedParams.id)
    loadHostData()
    loadMetrics(timeRange)

    const isWebsite = resolvedParams.id.toString().startsWith("web-")
    const pingIntervalTime = isWebsite ? 60000 : 10000

    const interval = setInterval(() => {
      updatePing()
    }, pingIntervalTime)
    setPingInterval(interval)

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [resolvedParams.id])

  const loadHostData = async () => {
    try {
      console.log("[v0] Fetching host data from API...")
      const response = await fetch(`/api/host-monitor/${resolvedParams.id}`)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] Host data loaded:", data)
      setHostData(data)
      setLoading(false)
    } catch (error) {
      console.error("[v0] Error loading host data:", error)
      setHostData({
        id: resolvedParams.id,
        name: `Host ${resolvedParams.id}`,
        ip: "Cargando...",
        status: "offline",
        type: "Desconocido",
        reactor: 0,
        ping: {
          current: 0,
          average: 0,
          min: 0,
          max: 0,
          packetLoss: 100,
          history: Array(20).fill(0),
        },
      })
      setLoading(false)
    }
  }

  const updatePing = async () => {
    if (!hostData) return

    try {
      const response = await fetch(`/api/ping/${resolvedParams.id}`)
      const data = await response.json()

      setHostData((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          ping: data.ping,
          status: data.status,
        }
      })
    } catch (error) {
      console.error("[v0] Error updating ping:", error)
    }
  }

  const runTraceroute = async () => {
    try {
      const response = await fetch(`/api/traceroute/${resolvedParams.id}`)
      const data = await response.json()

      setHostData((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          traceroute: data.traceroute,
        }
      })
    } catch (error) {
      console.error("[v0] Error running traceroute:", error)
    }
  }

  const loadMetrics = async (range: TimeRange) => {
    try {
      const response = await fetch(`/api/host-metrics/${resolvedParams.id}?range=${range}`)
      const data = await response.json()
      setMetrics(data)
    } catch (error) {
      console.error("[v0] Error loading metrics:", error)
    }
  }

  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range)
    loadMetrics(range)
  }

  const pingData = hostData?.ping || {
    current: 0,
    average: 0,
    min: 0,
    max: 0,
    packetLoss: 0,
    history: Array(20).fill(0),
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-white">Cargando información del host...</div>
      </div>
    )
  }

  if (!hostData) {
    return (
      <div className="p-8">
        <div className="text-white">No se encontró información del host</div>
        <Button onClick={() => router.back()} className="mt-4">
          Volver
        </Button>
      </div>
    )
  }

  const isPhysicalServer = [
    "Ceph Storage",
    "Cluster",
    "Proxmox VE",
    "Proxmox Backup",
    "Spam Filter",
    "Zimbra Mail",
  ].includes(hostData.type)
  const isWebServer = ["Control Panel", "Web Server", "Web Platform", "Website"].includes(hostData.type)

  const isIntelCPU = hostData.snmp?.cpu.model.toLowerCase().includes("intel")
  const isAMDCPU = hostData.snmp?.cpu.model.toLowerCase().includes("amd")

  return (
    <div className="p-8 bg-slate-950 min-h-screen">
      <div className="mb-6">
        <Button onClick={() => router.back()} variant="ghost" className="text-slate-400 hover:text-white mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Reactor
        </Button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{hostData.name}</h1>
            <p className="text-slate-400">
              IP: {hostData.ip} | Tipo: {hostData.type} | Reactor {hostData.reactor}
            </p>
          </div>
          <Badge
            variant={
              hostData.status === "online" ? "default" : hostData.status === "warning" ? "warning" : "destructive"
            }
            className="text-lg px-4 py-2"
          >
            {hostData.status === "online" ? (
              <CheckCircle className="w-5 h-5 mr-2" />
            ) : hostData.status === "warning" ? (
              <AlertTriangle className="w-5 h-5 mr-2" />
            ) : (
              <XCircle className="w-5 h-5 mr-2" />
            )}
            {hostData.status === "online"
              ? "En Línea"
              : hostData.status === "warning"
                ? "Advertencia"
                : "Fuera de Línea"}
          </Badge>
        </div>
      </div>

      <Card className="bg-slate-900 border-slate-800 mb-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-500" />
            Ping Continuo (actualización cada 10 segundos)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            <div>
              <div className="text-3xl font-bold text-green-400">{pingData.current}ms</div>
              <div className="text-sm text-slate-400">Actual</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{pingData.average}ms</div>
              <div className="text-sm text-slate-400">Promedio</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">{pingData.min}ms</div>
              <div className="text-sm text-slate-400">Mínimo</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">{pingData.max}ms</div>
              <div className="text-sm text-slate-400">Máximo</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-400">{pingData.packetLoss}%</div>
              <div className="text-sm text-slate-400">Pérdida</div>
            </div>
          </div>

          {/* Gráfico de histórico */}
          <div className="mt-6 h-32 flex items-end gap-1">
            {pingData.history.map((value, index) => {
              const maxValue = Math.max(...pingData.history, 1)
              const height = (value / maxValue) * 100
              return (
                <div
                  key={index}
                  className="flex-1 bg-gradient-to-t from-green-500 to-green-300 rounded-t transition-all"
                  style={{ height: `${height}%` }}
                  title={`${value}ms`}
                />
              )
            })}
          </div>
        </CardContent>
      </Card>

      {isPhysicalServer && hostData.snmp && (
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 mb-6">
          <CardHeader className="border-b border-slate-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {isIntelCPU && (
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Cpu className="w-8 h-8 text-blue-400" />
                  </div>
                )}
                {isAMDCPU && (
                  <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                    <Cpu className="w-8 h-8 text-red-400" />
                  </div>
                )}
                <div>
                  <CardTitle className="text-white text-xl">{hostData.name}</CardTitle>
                  <p className="text-sm text-slate-400 mt-1 font-mono">{hostData.snmp.cpu.model}</p>
                </div>
              </div>
              <Badge
                variant={
                  hostData.status === "online" ? "default" : hostData.status === "warning" ? "warning" : "destructive"
                }
                className="text-lg px-4 py-2"
              >
                {hostData.status === "online" ? "En Línea" : hostData.status === "warning" ? "Advertencia" : "Fuera"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="flex gap-2 mb-6">
              {(["1h", "12h", "24h", "week", "month", "year"] as TimeRange[]).map((range) => (
                <button
                  key={range}
                  onClick={() => handleTimeRangeChange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    timeRange === range ? "bg-cyan-500 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  {range === "1h"
                    ? "Última Hora"
                    : range === "12h"
                      ? "12 Horas"
                      : range === "24h"
                        ? "24 Horas"
                        : range === "week"
                          ? "Semana"
                          : range === "month"
                            ? "Mes"
                            : "Año"}
                </button>
              ))}
            </div>

            <div className="relative h-64 bg-slate-900/50 rounded-xl p-6 mb-6">
              {metrics && (
                <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                  <line x1="0" y1="0" x2="800" y2="0" stroke="#334155" strokeWidth="1" />
                  <line x1="0" y1="50" x2="800" y2="50" stroke="#334155" strokeWidth="1" />
                  <line x1="0" y1="100" x2="800" y2="100" stroke="#334155" strokeWidth="1" />
                  <line x1="0" y1="150" x2="800" y2="150" stroke="#334155" strokeWidth="1" />
                  <line x1="0" y1="200" x2="800" y2="200" stroke="#334155" strokeWidth="1" />

                  <polyline
                    points={metrics.cpu
                      .map((value, i) => `${(i / (metrics.cpu.length - 1)) * 800},${200 - (value / 100) * 200}`)
                      .join(" ")}
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <polyline
                    points={metrics.memory
                      .map((value, i) => `${(i / (metrics.memory.length - 1)) * 800},${200 - (value / 100) * 200}`)
                      .join(" ")}
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <polyline
                    points={metrics.disk
                      .map((value, i) => `${(i / (metrics.disk.length - 1)) * 800},${200 - (value / 100) * 200}`)
                      .join(" ")}
                    fill="none"
                    stroke="#facc15"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <polyline
                    points={metrics.network
                      .map((value, i) => `${(i / (metrics.network.length - 1)) * 800},${200 - (value / 100) * 200}`)
                      .join(" ")}
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}

              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-500 -ml-8">
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span>0</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-cyan-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  <span className="text-xs text-slate-400">CPU</span>
                </div>
                <div className="text-2xl font-bold text-white">{hostData.snmp.cpu.usage}%</div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-pink-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                  <span className="text-xs text-slate-400">Memoria</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {((hostData.snmp.memory.used / hostData.snmp.memory.total) * 100).toFixed(1)}%
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-slate-400">Disco</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {(
                    (hostData.snmp.disks.reduce((acc, d) => acc + d.used, 0) /
                      hostData.snmp.disks.reduce((acc, d) => acc + d.size, 0)) *
                    100
                  ).toFixed(1)}
                  %
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-orange-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-xs text-slate-400">Red</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {(hostData.snmp.network.interfaces.reduce((acc, i) => acc + i.tx + i.rx, 0) / 1024 / 1024).toFixed(0)}{" "}
                  MB
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue={isPhysicalServer ? "snmp" : "web"} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800">
          {isPhysicalServer && <TabsTrigger value="snmp">Datos SNMP</TabsTrigger>}
          {isWebServer && <TabsTrigger value="web">Análisis Web</TabsTrigger>}
          <TabsTrigger value="network">Red y Trazabilidad</TabsTrigger>
        </TabsList>

        {isPhysicalServer && hostData.snmp && (
          <TabsContent value="snmp" className="space-y-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  Sistema y Hardware
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-slate-400">Sistema Operativo</div>
                  <div className="text-white font-mono">{hostData.snmp.osVersion}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Uptime</div>
                  <div className="text-white">{hostData.snmp.uptime}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-2">Hardware Instalado</div>
                  <div className="space-y-1">
                    {hostData.snmp.hardware.map((item, index) => (
                      <div key={index} className="text-sm text-slate-300 font-mono">
                        • {item}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  Procesador
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-slate-400">Modelo</div>
                    <div className="text-white font-mono">{hostData.snmp.cpu.model}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400 mb-2">Uso de CPU: {hostData.snmp.cpu.usage}%</div>
                    <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${hostData.snmp.cpu.usage > 80 ? "bg-red-500" : hostData.snmp.cpu.usage > 60 ? "bg-yellow-500" : "bg-green-500"}`}
                        style={{ width: `${hostData.snmp.cpu.usage}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Cores</div>
                    <div className="text-white">{hostData.snmp.cpu.cores}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Memoria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-slate-400">Total</div>
                      <div className="text-white text-lg">{(hostData.snmp.memory.total / 1024).toFixed(2)} GB</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Usado</div>
                      <div className="text-white text-lg">{(hostData.snmp.memory.used / 1024).toFixed(2)} GB</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Libre</div>
                      <div className="text-white text-lg">{(hostData.snmp.memory.free / 1024).toFixed(2)} GB</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400 mb-2">
                      Uso: {((hostData.snmp.memory.used / hostData.snmp.memory.total) * 100).toFixed(1)}%
                    </div>
                    <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${((hostData.snmp.memory.used / hostData.snmp.memory.total) * 100) > 80 ? "bg-red-500" : "bg-blue-500"}`}
                        style={{ width: `${(hostData.snmp.memory.used / hostData.snmp.memory.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <HardDrive className="w-5 h-5" />
                  Almacenamiento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hostData.snmp.disks.map((disk, index) => (
                    <div key={index} className="border-b border-slate-700/50 pb-4 last:border-0">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <div className="text-white font-mono">{disk.name}</div>
                          <div className="text-sm text-slate-400">{disk.mountPoint}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white">
                            {(disk.used / 1024).toFixed(2)} GB / {(disk.size / 1024).toFixed(2)} GB
                          </div>
                          <div className="text-sm text-slate-400">
                            {((disk.used / disk.size) * 100).toFixed(1)}% usado
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${((disk.used / disk.size) * 100) > 90 ? "bg-red-500" : (disk.used / disk.size) * 100 > 70 ? "bg-yellow-500" : "bg-green-500"}`}
                          style={{ width: `${(disk.used / disk.size) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  Interfaces de Red
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {hostData.snmp.network.interfaces.map((iface, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b border-slate-700/50 pb-3 last:border-0"
                    >
                      <div>
                        <div className="text-white font-mono">{iface.name}</div>
                        <div className="text-sm text-slate-400">{iface.speed}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant={iface.status === "up" ? "default" : "destructive"}>{iface.status}</Badge>
                        <div className="text-sm text-slate-400 mt-1">
                          RX: {(iface.rx / 1024 / 1024).toFixed(2)} MB | TX: {(iface.tx / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {isWebServer && hostData.web && (
          <TabsContent value="web" className="space-y-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Estado del Sitio Web
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-slate-400">Último Chequeo</div>
                    <div className="text-white">{hostData.web.lastCheck}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Código de Estado</div>
                    <Badge variant={hostData.web.statusCode === 200 ? "default" : "destructive"}>
                      {hostData.web.statusCode}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Tiempo de Respuesta</div>
                    <div className="text-white">{hostData.web.responseTime}ms</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Velocidad de Apertura</div>
                    <div className="text-white">{hostData.web.openSpeed}ms</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Velocidad de Cierre</div>
                    <div className="text-white">{hostData.web.closeSpeed}ms</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Certificado SSL
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-400">Estado</div>
                  <Badge variant={hostData.web.sslCert.valid ? "default" : "destructive"}>
                    {hostData.web.sslCert.valid ? "Válido" : "Inválido"}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Emisor</div>
                  <div className="text-white font-mono text-sm">{hostData.web.sslCert.issuer}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Fecha de Expiración</div>
                  <div className="text-white">{hostData.web.sslCert.expiryDate}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Días Restantes</div>
                  <div
                    className={`text-lg font-bold ${hostData.web.sslCert.daysRemaining < 30 ? "text-red-500" : "text-green-500"}`}
                  >
                    {hostData.web.sslCert.daysRemaining} días
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Validación de Listas Negras
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-400">Estado</div>
                    <Badge variant={!hostData.web.blacklistStatus.isListed ? "default" : "destructive"}>
                      {!hostData.web.blacklistStatus.isListed ? "Limpio" : "Listado"}
                    </Badge>
                  </div>
                  {hostData.web.blacklistStatus.isListed && hostData.web.blacklistStatus.lists.length > 0 && (
                    <div>
                      <div className="text-sm text-slate-400 mb-2">Listas donde aparece:</div>
                      <div className="space-y-1">
                        {hostData.web.blacklistStatus.lists.map((list, index) => (
                          <div key={index} className="text-sm text-red-400">
                            • {list}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="network" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Network className="w-5 h-5" />
                Trazabilidad de Red
              </CardTitle>
              <CardDescription className="text-slate-400">
                Trace la ruta de los paquetes hasta el host y detecta puntos de falla
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={runTraceroute} className="mb-4">
                Ejecutar Traceroute
              </Button>

              {hostData.traceroute && (
                <div className="space-y-2">
                  {hostData.traceroute.hops.map((hop) => (
                    <div
                      key={hop.hop}
                      className={`flex items-center justify-between p-3 rounded border ${
                        hostData.traceroute?.lastFailedHop === hop.hop
                          ? "bg-red-900/20 border-red-700"
                          : "bg-slate-700/30 border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-slate-400 font-mono text-sm w-8">{hop.hop}</div>
                        <div>
                          <div className="text-white font-mono text-sm">{hop.ip}</div>
                          <div className="text-slate-400 text-xs">{hop.hostname}</div>
                        </div>
                      </div>
                      <div className="text-white font-mono">{hop.latency}ms</div>
                    </div>
                  ))}

                  {hostData.traceroute.lastFailedHop && (
                    <div className="mt-4 p-4 bg-red-900/20 border border-red-700 rounded">
                      <div className="flex items-center gap-2 text-red-400">
                        <XCircle className="w-5 h-5" />
                        <div className="font-semibold">
                          Falla detectada en el salto {hostData.traceroute.lastFailedHop}
                        </div>
                      </div>
                      <div className="text-sm text-slate-400 mt-2">
                        La conexión se pierde después del salto {hostData.traceroute.lastFailedHop}. Revisar
                        conectividad del nodo anterior.
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
