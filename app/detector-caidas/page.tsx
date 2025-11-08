"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Activity,
  RefreshCw,
  Clock,
  Users,
  Globe,
  AlertOctagon,
  TrendingUp,
} from "lucide-react"
import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

type ServiceStatus = "Operacional" | "Degradado" | "Caído" | "Error"

interface RegionData {
  region: string
  domain: string
  reports: number
  status: ServiceStatus
}

interface ApiServiceData {
  domain: string
  service: string
  slug: string
  reports: number
  status: ServiceStatus
  lastChecked: string
  locale: string
}

interface Service {
  id: string
  name: string
  slug: string
  clearbitDomain: string
  status: ServiceStatus
  regions: RegionData[]
  lastIncident: string
  graphData: Array<{
    time: string
    global: number
    mx: number
    pe: number
    ca: number
    co: number
  }>
}

const CLOUD_PROVIDERS = [
  { id: "aws", name: "Amazon Web Services", slug: "aws", clearbitDomain: "aws.amazon.com" },
  { id: "azure", name: "Microsoft Azure", slug: "azure", clearbitDomain: "azure.microsoft.com" },
  { id: "google-cloud", name: "Google Cloud", slug: "google-cloud", clearbitDomain: "cloud.google.com" },
  { id: "oracle-cloud", name: "Oracle Cloud", slug: "oracle-cloud", clearbitDomain: "oracle.com" },
  { id: "huawei-cloud", name: "Huawei Cloud", slug: "huawei-cloud", clearbitDomain: "huawei.com" },
  { id: "alibaba-cloud", name: "Alibaba Cloud", slug: "alibaba-cloud", clearbitDomain: "alibabacloud.com" },
  { id: "ovhcloud", name: "OVHcloud", slug: "ovhcloud", clearbitDomain: "ovhcloud.com" },
  { id: "vultr", name: "Vultr", slug: "vultr", clearbitDomain: "vultr.com" },
  { id: "linode", name: "Linode", slug: "linode", clearbitDomain: "linode.com" },
  { id: "unihost", name: "Unihost", slug: "unihost", clearbitDomain: "unihost.com" },
]

const REGIONS = [
  { label: "Global", key: "global", domain: "downdetector.com", color: "#10b981" },
  { label: "México", key: "mx", domain: "downdetector.mx", color: "#3b82f6" },
  { label: "Perú", key: "pe", domain: "downdetector.pe", color: "#a855f7" },
  { label: "Canadá", key: "ca", domain: "downdetector.ca", color: "#eab308" },
  { label: "Colombia", key: "co", domain: "downdetector.com.co", color: "#ec4899" },
]

async function fetchCloudStatus(): Promise<ApiServiceData[]> {
  try {
    const response = await fetch("/api/cloud-status")
    const data = await response.json()
    return data.services || []
  } catch (error) {
    console.error("[v0] Error fetching cloud status:", error)
    return []
  }
}

async function fetchCloudHistory(): Promise<Record<string, Array<{ ts: number; reports: number; status: string }>>> {
  try {
    const response = await fetch("/api/cloud-history")
    const data = await response.json()
    return data
  } catch (error) {
    console.error("[v0] Error fetching cloud history:", error)
    return {}
  }
}

function transformApiDataToServices(
  apiData: ApiServiceData[],
  historyData: Record<string, Array<{ ts: number; reports: number; status: string }>>,
): Service[] {
  return CLOUD_PROVIDERS.map((provider) => {
    // Filter data for this provider
    const providerData = apiData.filter((d) => d.slug === provider.slug)

    // Build regions data
    const regions: RegionData[] = REGIONS.map((region) => {
      const regionData = providerData.find((d) => d.domain === region.domain)
      return {
        region: region.label,
        domain: region.domain,
        reports: regionData?.reports || 0,
        status: regionData?.status || "Operacional",
      }
    })

    // Build graph data from history
    const graphData: Array<{
      time: string
      global: number
      mx: number
      pe: number
      ca: number
      co: number
    }> = []

    // Get history for each region
    const historyKeys = REGIONS.map((r) => `${provider.slug}_${r.domain}`)
    const maxLength = Math.max(
      ...historyKeys.map((key) => historyData[key]?.length || 0),
      1, // At least 1 to avoid empty graphs
    )

    // Build time series (last 24 points)
    const pointsToShow = Math.min(maxLength, 24)
    for (let i = Math.max(0, maxLength - pointsToShow); i < maxLength; i++) {
      const point: any = {
        time: "",
      }

      REGIONS.forEach((region) => {
        const key = `${provider.slug}_${region.domain}`
        const history = historyData[key] || []
        const dataPoint = history[i]

        if (dataPoint) {
          point[region.key] = dataPoint.reports
          if (!point.time) {
            point.time = new Date(dataPoint.ts).toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })
          }
        } else {
          point[region.key] = 0
        }
      })

      if (point.time) {
        graphData.push(point)
      }
    }

    // If no history data, create at least one point with current data
    if (graphData.length === 0) {
      const currentPoint: any = {
        time: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
      }
      regions.forEach((r) => {
        const regionKey = REGIONS.find((reg) => reg.label === r.region)?.key || "global"
        currentPoint[regionKey] = r.reports
      })
      graphData.push(currentPoint)
    }

    // Determine overall status (worst status wins)
    let overallStatus: ServiceStatus = "Operacional"
    if (regions.some((r) => r.status === "Caído")) {
      overallStatus = "Caído"
    } else if (regions.some((r) => r.status === "Degradado")) {
      overallStatus = "Degradado"
    } else if (regions.some((r) => r.status === "Error")) {
      overallStatus = "Error"
    }

    // Calculate last incident time
    const lastChecked = providerData[0]?.lastChecked
    const lastIncident = lastChecked
      ? `Hace ${Math.floor((Date.now() - new Date(lastChecked).getTime()) / 1000 / 60)} minutos`
      : "Desconocido"

    return {
      ...provider,
      status: overallStatus,
      regions,
      lastIncident,
      graphData,
    }
  })
}

export default function DetectorCaidas() {
  const [services, setServices] = useState<Service[]>([])
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [statusData, historyData] = await Promise.all([fetchCloudStatus(), fetchCloudHistory()])
      const transformedServices = transformApiDataToServices(statusData, historyData)
      setServices(transformedServices)
      setLastUpdate(new Date())
    } catch (error) {
      console.error("[v0] Error loading data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      loadData()
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [autoRefresh])

  const getStatusColor = (status: ServiceStatus) => {
    switch (status) {
      case "Operacional":
        return "text-green-400 bg-green-500/10 border-green-500/30"
      case "Degradado":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30"
      case "Caído":
        return "text-red-400 bg-red-500/10 border-red-500/30"
      case "Error":
        return "text-gray-400 bg-gray-500/10 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: ServiceStatus) => {
    switch (status) {
      case "Operacional":
        return <CheckCircle2 className="w-5 h-5" />
      case "Degradado":
        return <AlertTriangle className="w-5 h-5" />
      case "Caído":
        return <XCircle className="w-5 h-5" />
      case "Error":
        return <XCircle className="w-5 h-5" />
    }
  }

  const operationalCount = services.filter((s) => s.status === "Operacional").length
  const degradedCount = services.filter((s) => s.status === "Degradado").length
  const downCount = services.filter((s) => s.status === "Caído" || s.status === "Error").length
  const totalReports = services.reduce((sum, s) => sum + s.regions.reduce((rSum, r) => rSum + r.reports, 0), 0)

  const servicesWithIssues = services.filter((s) => s.status === "Degradado" || s.status === "Caído")

  if (isLoading && services.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-300 text-lg font-semibold">Scrapeando datos en tiempo real...</p>
          <p className="text-slate-500 text-sm mt-2">Recopilando información desde DownDetector multi-región</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-600">
            <Globe className="w-4 h-4" />
            <span>Global • México • Perú • Canadá • Colombia</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <section className="container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Activity className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Monitor Cloud NOC/SOC
            </h1>
          </div>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto mb-2">
            Scraping en tiempo real desde DownDetector • Datos reales de 5 regiones
          </p>
          <div className="flex items-center justify-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Clock className="w-3 h-3" />
              <span>Actualizado: {lastUpdate.toLocaleTimeString("es-ES")}</span>
            </div>
            <Button
              onClick={() => setAutoRefresh(!autoRefresh)}
              variant="ghost"
              size="sm"
              className={`h-7 px-2 text-xs ${autoRefresh ? "text-cyan-400" : "text-slate-500"}`}
            >
              <RefreshCw className={`w-3 h-3 mr-1.5 ${autoRefresh ? "animate-spin" : ""}`} />
              {autoRefresh ? "Auto" : "Manual"}
            </Button>
            <Button onClick={loadData} variant="ghost" size="sm" className="h-7 px-2 text-xs text-slate-500">
              <RefreshCw className="w-3 h-3 mr-1.5" />
              Refrescar
            </Button>
          </div>
        </div>

        {servicesWithIssues.length > 0 && (
          <Card className="mb-6 bg-gradient-to-br from-red-950/30 to-orange-950/30 border border-red-500/40 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertOctagon className="w-5 h-5 text-red-400" />
                  <CardTitle className="text-base text-white">Alertas Activas</CardTitle>
                  <Badge variant="destructive" className="ml-2 bg-red-500/20 text-red-300 border-red-500/40">
                    {servicesWithIssues.length}
                  </Badge>
                </div>
                <div className="text-xs text-red-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {servicesWithIssues.reduce((sum, s) => sum + s.regions.reduce((r, reg) => r + reg.reports, 0), 0)}{" "}
                  reportes totales
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {servicesWithIssues.map((service) => {
                const totalReports = service.regions.reduce((sum, r) => sum + r.reports, 0)
                const affectedRegions = service.regions.filter((r) => r.status !== "Operacional")

                return (
                  <div
                    key={service.id}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/50 hover:border-slate-700/50 transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={`https://logo.clearbit.com/${service.clearbitDomain}`}
                        alt={service.name}
                        className="w-7 h-7 rounded bg-white/95 p-1 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${service.name}&background=random&size=28`
                        }}
                      />
                      <div>
                        <h3 className="font-semibold text-white text-xs leading-tight">{service.name}</h3>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          {affectedRegions.map((r) => r.region).join(" • ")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-sm font-bold text-white">{totalReports}</div>
                        <div className="text-[9px] text-slate-500">reportes</div>
                      </div>
                      <Badge
                        variant={service.status === "Caído" ? "destructive" : "secondary"}
                        className={`text-[10px] px-1.5 py-0.5 ${
                          service.status === "Caído"
                            ? "bg-red-500/20 text-red-400 border-red-500/40"
                            : "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
                        }`}
                      >
                        {service.status}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-4 gap-2.5 mb-6">
          <Card className="bg-gradient-to-br from-green-950/30 to-green-900/20 border-green-500/20">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-green-400">{operationalCount}</p>
                  <p className="text-[10px] text-slate-400">Operacionales</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-green-400/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-950/30 to-yellow-900/20 border-yellow-500/20">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-yellow-400">{degradedCount}</p>
                  <p className="text-[10px] text-slate-400">Degradados</p>
                </div>
                <AlertTriangle className="w-5 h-5 text-yellow-400/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-950/30 to-red-900/20 border-red-500/20">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-red-400">{downCount}</p>
                  <p className="text-[10px] text-slate-400">Caídos</p>
                </div>
                <XCircle className="w-5 h-5 text-red-400/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-950/30 to-cyan-900/20 border-cyan-500/20">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-cyan-400">{totalReports.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400">Reportes</p>
                </div>
                <Users className="w-5 h-5 text-cyan-400/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((service) => {
            const totalReports = service.regions.reduce((sum, r) => sum + r.reports, 0)

            return (
              <Card
                key={service.id}
                className={`bg-slate-900/40 backdrop-blur border transition-all hover:shadow-md hover:scale-[1.01] ${getStatusColor(service.status)}`}
              >
                <CardHeader className="pb-2 px-3 pt-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://logo.clearbit.com/${service.clearbitDomain}`}
                        alt={service.name}
                        className="w-8 h-8 rounded-md bg-white/95 p-1 object-contain shadow-sm"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${service.name}&background=random&size=32`
                        }}
                      />
                      <div>
                        <CardTitle className="text-xs text-white leading-tight">{service.name}</CardTitle>
                        <div className="flex items-center gap-1 mt-0.5">
                          {getStatusIcon(service.status)}
                          <span
                            className={`text-[10px] font-medium ${
                              service.status === "Operacional"
                                ? "text-green-400"
                                : service.status === "Degradado"
                                  ? "text-yellow-400"
                                  : "text-red-400"
                            }`}
                          >
                            {service.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">{totalReports}</div>
                      <div className="text-[8px] text-slate-500">reportes</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-2 px-3 pb-3">
                  <div className="h-24 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={service.graphData} margin={{ top: 2, right: 2, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.15} />
                        <XAxis dataKey="time" stroke="#475569" fontSize={8} tickLine={false} hide />
                        <YAxis stroke="#475569" fontSize={8} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0f172a",
                            border: "1px solid #334155",
                            borderRadius: "4px",
                            fontSize: "10px",
                            padding: "4px 6px",
                          }}
                        />
                        {REGIONS.map((region) => (
                          <Line
                            key={region.key}
                            type="monotone"
                            dataKey={region.key}
                            stroke={region.color}
                            strokeWidth={1.5}
                            dot={false}
                            name={region.label}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-5 gap-1">
                    {service.regions.map((region) => (
                      <div
                        key={region.region}
                        className="text-center p-1 bg-slate-950/40 rounded border border-slate-800/40 hover:border-slate-700/60 transition-colors"
                      >
                        <div className="text-[8px] text-slate-500 mb-0.5 truncate font-medium">
                          {region.region.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="font-bold text-white text-[11px]">{region.reports}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Info Section */}
        <Card className="mt-10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2.5">
              <Globe className="w-6 h-6 text-cyan-400" />
              ¿Cómo funciona el Monitor Cloud NOC/SOC?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-300 text-sm">
            <p>
              Nuestro sistema NOC/SOC scrapea en tiempo real datos desde múltiples dominios de DownDetector (Global,
              México, Perú, Canadá y Colombia) para analizar el estado de los principales proveedores Cloud, ofreciendo
              información precisa y actualizada sobre incidentes y degradaciones de servicio.
            </p>
            <div className="grid md:grid-cols-3 gap-3 mt-4">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-6 h-6 text-green-400 mb-2" />
                <h3 className="font-bold text-white mb-1.5 text-sm">Operacional</h3>
                <p className="text-xs text-slate-400">
                  El proveedor funciona correctamente sin problemas reportados significativos en ninguna región.
                </p>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <AlertTriangle className="w-6 h-6 text-yellow-400 mb-2" />
                <h3 className="font-bold text-white mb-1.5 text-sm">Degradado</h3>
                <p className="text-xs text-slate-400">
                  El proveedor presenta problemas de rendimiento o funcionalidad limitada en una o más regiones.
                </p>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <XCircle className="w-6 h-6 text-red-400 mb-2" />
                <h3 className="font-bold text-white mb-1.5 text-sm">Caído</h3>
                <p className="text-xs text-slate-400">
                  El proveedor no está disponible o presenta fallos críticos generalizados en múltiples regiones.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            <p className="text-slate-400 text-center text-sm">
              Monitor Cloud NOC/SOC • Monitoreo Multi-Región en Tiempo Real • Producto de SATURNO
            </p>
            <p className="text-slate-500 text-xs text-center">
              Datos scrapeados desde downdetector.com, .mx, .pe, .ca y .com.co
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
