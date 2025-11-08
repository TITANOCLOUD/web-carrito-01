"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-300 text-lg">Cargando datos en tiempo real desde DownDetector...</p>
          <p className="text-slate-500 text-sm mt-2">Scrapeando múltiples regiones</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950">
      {/* Header */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Activity className="w-10 h-10 text-cyan-400 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Detector de Caídas Cloud
            </h1>
          </div>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-1">
            Monitoreo en tiempo real del estado de los principales proveedores Cloud a nivel mundial
          </p>
          <p className="text-xs text-slate-400 max-w-2xl mx-auto">
            Datos scrapeados en tiempo real desde múltiples sitios de DownDetector en diferentes regiones
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">Última actualización: {lastUpdate.toLocaleTimeString("es-ES")}</span>
            </div>
            <Button
              onClick={() => setAutoRefresh(!autoRefresh)}
              variant="outline"
              size="sm"
              className={`border-slate-700 text-xs ${
                autoRefresh ? "text-cyan-400 border-cyan-500" : "text-slate-400"
              } hover:bg-slate-800 bg-transparent`}
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-2 ${autoRefresh ? "animate-spin" : ""}`} />
              {autoRefresh ? "Auto ON" : "Auto OFF"}
            </Button>
            <Button
              onClick={loadData}
              variant="outline"
              size="sm"
              className="border-slate-700 text-xs text-slate-400 hover:bg-slate-800 bg-transparent"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-2" />
              Actualizar
            </Button>
          </div>
        </div>

        {/* Resumen de Fallas Detectadas */}
        {servicesWithIssues.length > 0 && (
          <Card className="mb-8 bg-gradient-to-br from-red-950/40 to-orange-950/40 border-2 border-red-500/50 shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-white flex items-center gap-3">
                <AlertOctagon className="w-6 h-6 text-red-400 animate-pulse" />
                Resumen de Fallas Detectadas
              </CardTitle>
              <CardDescription className="text-slate-300">
                {servicesWithIssues.length} proveedor{servicesWithIssues.length > 1 ? "es" : ""} con problemas
                reportados actualmente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {servicesWithIssues.map((service) => {
                  const totalReports = service.regions.reduce((sum, r) => sum + r.reports, 0)
                  const affectedRegions = service.regions.filter((r) => r.status !== "Operacional")

                  return (
                    <div
                      key={service.id}
                      className={`p-3 rounded-lg border transition-all ${
                        service.status === "Caído"
                          ? "bg-red-950/30 border-red-500/40"
                          : "bg-yellow-950/30 border-yellow-500/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://logo.clearbit.com/${service.clearbitDomain}`}
                            alt={service.name}
                            className="w-8 h-8 rounded bg-white p-1 object-contain"
                            onError={(e) => {
                              e.currentTarget.src = `https://ui-avatars.com/api/?name=${service.name}&background=0D8ABC&color=fff&size=32`
                            }}
                          />
                          <div>
                            <h3 className="font-semibold text-white text-sm">{service.name}</h3>
                            <p className="text-xs text-slate-400">
                              {affectedRegions.length} región{affectedRegions.length > 1 ? "es" : ""} afectada
                              {affectedRegions.length > 1 ? "s" : ""}
                              {affectedRegions.length > 0 && ": "}
                              {affectedRegions.map((r) => r.region).join(", ")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-lg font-bold text-white">{totalReports}</div>
                            <div className="text-[10px] text-slate-400">reportes</div>
                          </div>
                          <div
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                              service.status === "Caído"
                                ? "bg-red-500/20 text-red-400 border border-red-500/40"
                                : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"
                            }`}
                          >
                            {service.status === "Caído" ? (
                              <XCircle className="w-3 h-3" />
                            ) : (
                              <AlertTriangle className="w-3 h-3" />
                            )}
                            {service.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-green-950/20 border-green-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-green-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Operacionales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-400">{operationalCount}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Funcionando bien</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/20 to-yellow-950/20 border-yellow-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-yellow-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Degradados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-400">{degradedCount}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Con problemas</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-900/20 to-red-950/20 border-red-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-red-400 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5" />
                Caídos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-400">{downCount}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">No disponibles</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-900/20 to-cyan-950/20 border-cyan-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-cyan-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Reportes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-cyan-400">{totalReports.toLocaleString()}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Total activo</p>
            </CardContent>
          </Card>
        </div>

        {/* Grid de servicios */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => {
            const totalReports = service.regions.reduce((sum, r) => sum + r.reports, 0)

            return (
              <Card
                key={service.id}
                className={`bg-slate-900/50 backdrop-blur border transition-all hover:shadow-lg hover:scale-[1.02] ${getStatusColor(service.status)}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={`https://logo.clearbit.com/${service.clearbitDomain}`}
                        alt={service.name}
                        className="w-10 h-10 rounded-lg bg-white p-1.5 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${service.name}&background=0D8ABC&color=fff&size=40`
                        }}
                      />
                      <div>
                        <CardTitle className="text-sm text-white leading-tight">{service.name}</CardTitle>
                        <CardDescription className="text-[10px] flex items-center gap-1.5 mt-1">
                          {getStatusIcon(service.status)}
                          <span
                            className={
                              service.status === "Operacional"
                                ? "text-green-400"
                                : service.status === "Degradado"
                                  ? "text-yellow-400"
                                  : "text-red-400"
                            }
                          >
                            {service.status}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">{totalReports}</div>
                      <div className="text-[9px] text-slate-400">reportes</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* Gráfica */}
                  <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={service.graphData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.2} />
                        <XAxis
                          dataKey="time"
                          stroke="#64748b"
                          fontSize={9}
                          tickLine={false}
                          axisLine={{ stroke: "#334155" }}
                          interval="preserveStartEnd"
                        />
                        <YAxis stroke="#64748b" fontSize={9} tickLine={false} axisLine={{ stroke: "#334155" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0f172a",
                            border: "1px solid #334155",
                            borderRadius: "6px",
                            fontSize: "11px",
                          }}
                          labelStyle={{ color: "#cbd5e1" }}
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
                            animationDuration={300}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Leyenda */}
                  <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-800/50">
                    {REGIONS.map((region) => (
                      <div key={region.key} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: region.color }} />
                        <span className="text-[10px] text-slate-400">{region.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Badges de región */}
                  <div className="grid grid-cols-5 gap-1.5">
                    {service.regions.map((region) => (
                      <div
                        key={region.region}
                        className="text-center p-1.5 bg-slate-950/50 rounded border border-slate-800/50"
                      >
                        <div className="text-[9px] text-slate-500 mb-0.5 truncate">{region.region.slice(0, 3)}</div>
                        <div className="font-bold text-white text-xs">{region.reports}</div>
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
              ¿Cómo funciona el Detector de Caídas Cloud?
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
              Detector de Caídas Cloud • Monitoreo Multi-Región en Tiempo Real • Producto de SATURNO
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
