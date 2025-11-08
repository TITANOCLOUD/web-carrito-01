"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CloudMonitorChart } from "@/components/cloud-monitor-chart"
import { Activity, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import Image from "next/image"

interface CloudService {
  domain: string
  service: string
  slug: string
  reports: number
  status: "Operacional" | "Degradado" | "Caído" | "Error"
  lastChecked: string
  locale: string
}

interface CloudStatusData {
  updatedAt: number
  services: CloudService[]
}

const CLOUD_PROVIDERS = [
  { slug: "aws", name: "Amazon Web Services", logo: "https://logo.clearbit.com/aws.amazon.com" },
  { slug: "azure", name: "Microsoft Azure", logo: "https://logo.clearbit.com/azure.microsoft.com" },
  { slug: "google-cloud", name: "Google Cloud", logo: "https://logo.clearbit.com/cloud.google.com" },
  { slug: "oracle-cloud", name: "Oracle Cloud", logo: "https://logo.clearbit.com/oracle.com" },
  { slug: "huawei-cloud", name: "Huawei Cloud", logo: "https://logo.clearbit.com/huawei.com" },
  { slug: "alibaba-cloud", name: "Alibaba Cloud", logo: "https://logo.clearbit.com/alibabacloud.com" },
  { slug: "ovhcloud", name: "OVHcloud", logo: "https://logo.clearbit.com/ovhcloud.com" },
  { slug: "vultr", name: "Vultr", logo: "https://logo.clearbit.com/vultr.com" },
  { slug: "linode", name: "Linode", logo: "https://logo.clearbit.com/linode.com" },
  { slug: "unihost", name: "Unihost", logo: "https://logo.clearbit.com/unihost.com" },
]

export default function CloudMonitorPage() {
  const [statusData, setStatusData] = useState<CloudStatusData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cloud-status")
        const data = await response.json()
        setStatusData(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching cloud status:", error)
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 60000) // Actualizar cada minuto

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Operacional":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "Degradado":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case "Caído":
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return <Activity className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Operacional":
        return "bg-green-500/20 border-green-500 text-green-400"
      case "Degradado":
        return "bg-yellow-500/20 border-yellow-500 text-yellow-400"
      case "Caído":
        return "bg-red-500/20 border-red-500 text-red-400"
      default:
        return "bg-gray-500/20 border-gray-500 text-gray-400"
    }
  }

  // Agrupar servicios por slug
  const groupedServices = CLOUD_PROVIDERS.map((provider) => {
    const services = statusData?.services.filter((s) => s.slug === provider.slug) || []
    const totalReports = services.reduce((acc, s) => acc + s.reports, 0)
    const worstStatus = services.reduce(
      (worst, s) => {
        const severity = { Caído: 3, Degradado: 2, Error: 1, Operacional: 0 }
        return (severity[s.status] || 0) > (severity[worst] || 0) ? s.status : worst
      },
      "Operacional" as CloudService["status"],
    )

    return {
      ...provider,
      services,
      totalReports,
      worstStatus,
    }
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-16 h-16 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Cargando datos del monitor cloud...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Monitor de <span className="text-cyan-400">Cloud Providers</span>
          </h1>
          <p className="text-slate-300 text-lg mb-6">
            Monitoreo en tiempo real de los principales proveedores cloud a nivel global
          </p>
          {statusData && (
            <p className="text-slate-500 text-sm">
              Última actualización: {new Date(statusData.updatedAt).toLocaleString("es-MX")}
            </p>
          )}
        </div>

        {/* Grid de proveedores */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {groupedServices.map((provider) => (
            <Card
              key={provider.slug}
              className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-cyan-500/30 hover:border-cyan-500 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  {/* Logo */}
                  <div className="w-14 h-14 rounded-xl bg-white/5 p-2 flex items-center justify-center">
                    <Image
                      src={provider.logo || "/placeholder.svg"}
                      alt={provider.name}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>

                  {/* Título y estado */}
                  <div className="flex-1">
                    <CardTitle className="text-xl text-white mb-1">{provider.name}</CardTitle>
                    <div className="text-sm text-slate-400">Proveedor Cloud</div>
                  </div>

                  {/* Badge de estado */}
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 ${getStatusColor(
                      provider.worstStatus,
                    )}`}
                  >
                    {getStatusIcon(provider.worstStatus)}
                    <span className="font-semibold">{provider.worstStatus}</span>
                    <span className="text-sm ml-2">{provider.totalReports}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* Gráfica */}
                <CloudMonitorChart slug={provider.slug} />

                {/* Estado por región */}
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                  {provider.services.map((service) => (
                    <div
                      key={`${service.slug}-${service.domain}`}
                      className="bg-slate-950/50 rounded-lg p-2 border border-slate-700"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            service.status === "Operacional"
                              ? "bg-green-400"
                              : service.status === "Degradado"
                                ? "bg-yellow-400"
                                : service.status === "Caído"
                                  ? "bg-red-400"
                                  : "bg-gray-400"
                          }`}
                        />
                        <div className="text-xs text-slate-300">
                          {service.locale.toUpperCase()}: {service.reports}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
