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

interface CloudIncident {
  provider: string
  title: string
  status: "investigating" | "identified" | "monitoring" | "resolved"
  affectedServices: string[]
  regions: string[]
  startTime: string
  lastUpdate: string
  description: string
  url: string
}

const CLOUD_PROVIDERS = [
  { id: "aws", name: "Amazon Web Services", slug: "aws", clearbitDomain: "aws.amazon.com", group: "aws" },
  { id: "azure", name: "Microsoft Azure", slug: "azure", clearbitDomain: "azure.microsoft.com", group: "azure" },
  {
    id: "google-cloud",
    name: "Google Cloud",
    slug: "google-cloud",
    clearbitDomain: "cloud.google.com",
    group: "google",
  },
  { id: "oracle-cloud", name: "Oracle Cloud", slug: "oracle-cloud", clearbitDomain: "oracle.com", group: "oracle" },
  { id: "huawei-cloud", name: "Huawei Cloud", slug: "huawei-cloud", clearbitDomain: "huawei.com", group: "others" },
  {
    id: "alibaba-cloud",
    name: "Alibaba Cloud",
    slug: "alibaba-cloud",
    clearbitDomain: "alibabacloud.com",
    group: "alibaba",
  },
  { id: "ovhcloud", name: "OVHcloud", slug: "ovhcloud", clearbitDomain: "ovhcloud.com", group: "ovh" },
  { id: "vultr", name: "Vultr", slug: "vultr", clearbitDomain: "vultr.com", group: "others" },
  { id: "linode", name: "Linode", slug: "linode", clearbitDomain: "linode.com", group: "linode" },
  { id: "unihost", name: "Unihost", slug: "unihost", clearbitDomain: "unihost.com", group: "others" },
]

const REGIONS = [
  { label: "Global", key: "global", domain: "downdetector.com", color: "#10b981" },
  { label: "México", key: "mx", domain: "downdetector.mx", color: "#3b82f6" },
  { label: "Perú", key: "pe", domain: "downdetector.pe", color: "#a855f7" },
  { label: "Canadá", key: "ca", domain: "downdetector.ca", color: "#eab308" },
  { label: "Colombia", key: "co", domain: "downdetector.com.co", color: "#ec4899" },
]

const PROVIDER_GROUPS = [
  { key: "aws", name: "Amazon Web Services", color: "from-orange-500 to-orange-600" },
  { key: "azure", name: "Microsoft Azure", color: "from-blue-500 to-blue-600" },
  { key: "google", name: "Google Cloud Platform", color: "from-red-500 to-yellow-500" },
  { key: "oracle", name: "Oracle Cloud", color: "from-red-600 to-red-700" },
  { key: "alibaba", name: "Alibaba Cloud", color: "from-orange-400 to-orange-500" },
  { key: "ovh", name: "OVH Cloud", color: "from-blue-600 to-blue-700" },
  { key: "linode", name: "Linode / Akamai", color: "from-green-500 to-green-600" },
  { key: "others", name: "Otros Proveedores", color: "from-slate-500 to-slate-600" },
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

async function fetchActiveIncidents(): Promise<CloudIncident[]> {
  try {
    const response = await fetch("/api/cloud-incidents")
    const data = await response.json()
    return data.incidents || []
  } catch (error) {
    console.error("[v0] Error fetching incidents:", error)
    return []
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
  const [activeIncidents, setActiveIncidents] = useState<CloudIncident[]>([])
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [expandedIncidents, setExpandedIncidents] = useState<Record<string, boolean>>({})

  const [masterGraphData, setMasterGraphData] = useState<any[]>([])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [statusData, historyData, incidentsData] = await Promise.all([
        fetchCloudStatus(),
        fetchCloudHistory(),
        fetchActiveIncidents(),
      ])
      const transformedServices = transformApiDataToServices(statusData, historyData)
      setServices(transformedServices)
      setActiveIncidents(incidentsData)
      setLastUpdate(new Date())

      if (transformedServices.length > 0) {
        const maxLength = Math.max(...transformedServices.map((s) => s.graphData.length))
        const masterData = []

        for (let i = 0; i < maxLength; i++) {
          const point: any = {
            time: transformedServices[0].graphData[i]?.time || "",
          }

          transformedServices.forEach((service) => {
            if (service.graphData[i]) {
              const totalReports = REGIONS.reduce((sum, region) => {
                return sum + (service.graphData[i][region.key] || 0)
              }, 0)
              point[service.id] = totalReports
            }
          })

          if (point.time) {
            masterData.push(point)
          }
        }

        setMasterGraphData(masterData)
      }
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
        return "text-white bg-green-600 border-green-700"
      case "Degradado":
        return "text-black bg-yellow-500 border-yellow-600"
      case "Caído":
        return "text-white bg-red-600 border-red-700"
      case "Error":
        return "text-white bg-blue-600 border-blue-700"
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

  const getIncidentStatusColor = (status: string) => {
    switch (status) {
      case "investigating":
        return "bg-red-500/20 text-red-400 border-red-500/40"
      case "identified":
        return "bg-orange-500/20 text-orange-400 border-orange-500/40"
      case "monitoring":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
      case "resolved":
        return "bg-green-500/20 text-green-400 border-green-500/40"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/40"
    }
  }

  const getIncidentStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      investigating: "Investigando",
      identified: "Identificado",
      monitoring: "Monitoreando",
      resolved: "Resuelto",
    }
    return statusMap[status] || status
  }

  const groupedServices = PROVIDER_GROUPS.map((group) => ({
    ...group,
    services: services.filter((s) => {
      const provider = CLOUD_PROVIDERS.find((p) => p.id === s.id)
      return provider?.group === group.key
    }),
  })).filter((group) => group.services.length > 0)

  const incidentsByProvider = activeIncidents.reduce(
    (acc, incident) => {
      if (!acc[incident.provider]) {
        acc[incident.provider] = []
      }
      acc[incident.provider].push(incident)
      return acc
    },
    {} as Record<string, CloudIncident[]>,
  )

  if (isLoading && services.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950 flex items-center justify-center">
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
              Monitoreo de Proveedores Cloud
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

        {/* Estado General de Proveedores Cloud */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Estado General de Proveedores Cloud
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="bg-green-600 border-green-700">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-white mb-1">{operationalCount}</div>
                <div className="text-xs text-white/90">Operacionales</div>
              </CardContent>
            </Card>
            <Card className="bg-yellow-500 border-yellow-600">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-black mb-1">{degradedCount}</div>
                <div className="text-xs text-black/90">Degradados</div>
              </CardContent>
            </Card>
            <Card className="bg-red-600 border-red-700">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-white mb-1">{downCount}</div>
                <div className="text-xs text-white/90">Caídos</div>
              </CardContent>
            </Card>
            <Card className="bg-blue-600 border-blue-700">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-white mb-1">{totalReports}</div>
                <div className="text-xs text-white/90">Reportes</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tendencia de Reportes por Proveedor */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Tendencia de Reportes por Proveedor
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const totalReports = service.regions.reduce((sum, r) => sum + r.reports, 0)

              return (
                <Card
                  key={service.id}
                  className="bg-slate-900/40 backdrop-blur border border-slate-700 transition-all hover:shadow-md hover:scale-[1.01]"
                >
                  <CardHeader className="pb-3 px-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={`https://logo.clearbit.com/${service.clearbitDomain}`}
                          alt={service.name}
                          className="w-10 h-10 rounded-md bg-white/95 p-1.5 object-contain shadow-sm"
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${service.name}&background=random&size=40`
                          }}
                        />
                        <div>
                          <CardTitle className="text-sm text-white leading-tight">{service.name}</CardTitle>
                          <div className="flex items-center gap-1.5 mt-1">
                            {getStatusIcon(service.status)}
                            <span
                              className={`text-xs font-medium ${
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
                        <div className="text-2xl font-bold text-white">{totalReports}</div>
                        <div className="text-[9px] text-slate-500">reportes</div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3 px-4 pb-4">
                    <div className="h-32 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={service.graphData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.2} />
                          <XAxis dataKey="time" stroke="#475569" fontSize={9} tickLine={false} />
                          <YAxis stroke="#475569" fontSize={9} tickLine={false} axisLine={false} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#0f172a",
                              border: "1px solid #334155",
                              borderRadius: "6px",
                              fontSize: "11px",
                              padding: "6px 8px",
                            }}
                          />
                          {REGIONS.map((region) => (
                            <Line
                              key={region.key}
                              type="monotone"
                              dataKey={region.key}
                              stroke={region.color}
                              strokeWidth={2}
                              dot={false}
                              name={region.label}
                            />
                          ))}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-5 gap-1.5">
                      {service.regions.map((region) => (
                        <div
                          key={region.region}
                          className="text-center p-1.5 bg-slate-950/40 rounded border border-slate-800/40 hover:border-slate-700/60 transition-colors"
                        >
                          <div className="text-[9px] text-slate-500 mb-0.5 truncate font-medium">
                            {region.region.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="font-bold text-white text-xs">{region.reports}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Gráfica Comparativa de Todos los Proveedores Cloud */}
        <Card className="mb-8 bg-slate-900/40 border border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              Gráfica Comparativa de Todos los Proveedores Cloud
            </CardTitle>
            <p className="text-xs text-slate-400 mt-1">
              Visualización consolidada de reportes en tiempo real por proveedor • Datos desde fuentes oficiales
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={masterGraphData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      fontSize: "12px",
                      padding: "8px 12px",
                    }}
                  />
                  {services.map((service, index) => {
                    const colors = [
                      "#10b981",
                      "#3b82f6",
                      "#a855f7",
                      "#eab308",
                      "#ec4899",
                      "#06b6d4",
                      "#f97316",
                      "#8b5cf6",
                      "#14b8a6",
                      "#f59e0b",
                    ]
                    return (
                      <Line
                        key={service.id}
                        type="monotone"
                        dataKey={service.id}
                        stroke={colors[index % colors.length]}
                        strokeWidth={2}
                        dot={false}
                        name={service.name}
                      />
                    )
                  })}
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
              {services.map((service, index) => {
                const colors = [
                  "#10b981",
                  "#3b82f6",
                  "#a855f7",
                  "#eab308",
                  "#ec4899",
                  "#06b6d4",
                  "#f97316",
                  "#8b5cf6",
                  "#14b8a6",
                  "#f59e0b",
                ]
                return (
                  <div key={service.id} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
                    <span className="text-xs text-slate-300">{service.name}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Alertas Activas */}
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

        {/* Incidentes Oficiales */}
        {activeIncidents.length > 0 && (
          <Card className="mb-6 bg-gradient-to-br from-orange-950/30 to-red-950/30 border border-orange-500/40 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertOctagon className="w-5 h-5 text-orange-400" />
                  <CardTitle className="text-base text-white">Incidentes Oficiales</CardTitle>
                  <Badge variant="destructive" className="ml-2 bg-orange-500/20 text-orange-300 border-orange-500/40">
                    {activeIncidents.length}
                  </Badge>
                </div>
                <div className="text-xs text-orange-400">Desde páginas oficiales de status</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(incidentsByProvider).map(([provider, incidents]) => (
                <div key={provider} className="space-y-2">
                  <Button
                    onClick={() =>
                      setExpandedIncidents({ ...expandedIncidents, [provider]: !expandedIncidents[provider] })
                    }
                    variant="ghost"
                    className="w-full justify-between p-3 h-auto bg-slate-900/40 hover:bg-slate-900/60 border border-slate-800/50"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{provider}</span>
                      <Badge className="bg-red-500/20 text-red-300 border-red-500/40 text-xs">
                        {incidents.length} {incidents.length === 1 ? "incidente" : "incidentes"}
                      </Badge>
                    </div>
                    <span className="text-slate-400">{expandedIncidents[provider] ? "▼" : "▶"}</span>
                  </Button>

                  {expandedIncidents[provider] && (
                    <div className="space-y-2 pl-4">
                      {incidents.map((incident, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/50 hover:border-slate-700/50 transition-all"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge
                                  className={`text-[10px] px-1.5 py-0.5 ${getIncidentStatusColor(incident.status)}`}
                                >
                                  {getIncidentStatusText(incident.status)}
                                </Badge>
                              </div>
                              <h4 className="text-sm font-semibold text-white mb-1.5">{incident.title}</h4>
                              {incident.description && (
                                <p className="text-xs text-slate-400 mb-2">{incident.description}</p>
                              )}
                              <div className="flex items-center gap-3 text-[10px] text-slate-500">
                                <div className="flex items-center gap-1">
                                  <Globe className="w-3 h-3" />
                                  <span>{incident.regions.join(", ")}</span>
                                </div>
                                {incident.affectedServices.length > 0 && (
                                  <div className="flex items-center gap-1">
                                    <Activity className="w-3 h-3" />
                                    <span>{incident.affectedServices.slice(0, 3).join(", ")}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{incident.startTime}</span>
                                </div>
                              </div>
                            </div>
                            <a
                              href={incident.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-cyan-400 hover:text-cyan-300 underline ml-3"
                            >
                              Ver más
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Info Section */}
        <Card className="mt-10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2.5">
              <Globe className="w-6 h-6 text-cyan-400" />
              ¿Cómo funciona el Monitoreo de Proveedores Cloud?
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
              Monitoreo de Proveedores Cloud • Monitoreo Multi-Región en Tiempo Real • Producto de SATURNO
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
