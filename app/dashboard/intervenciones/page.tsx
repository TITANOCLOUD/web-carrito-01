"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertTriangle, Calendar, Clock, Search, RefreshCw, Server, CheckCircle } from "lucide-react"

interface Intervention {
  id: number
  serviceName: string
  type?: string
  date?: string
  duration?: number
  status?: string
  reason?: string
  description?: string
}

export default function IntervencionesPage() {
  const [activeInterventions, setActiveInterventions] = useState<Intervention[]>([])
  const [plannedInterventions, setPlannedInterventions] = useState<Intervention[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState<"active" | "planned">("active")

  const fetchInterventions = async () => {
    setLoading(true)
    try {
      const [activeRes, plannedRes] = await Promise.all([
        fetch("/api/ovh/interventions"),
        fetch("/api/ovh/interventions/planned"),
      ])

      const activeData = await activeRes.json()
      const plannedData = await plannedRes.json()

      if (activeData.success) {
        setActiveInterventions(activeData.interventions)
      }

      if (plannedData.success) {
        setPlannedInterventions(plannedData.interventions)
      }
    } catch (error) {
      console.error("[v0] Error fetching interventions:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInterventions()
    const interval = setInterval(fetchInterventions, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  const filteredActiveInterventions = activeInterventions.filter((intervention) =>
    intervention.serviceName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredPlannedInterventions = plannedInterventions.filter((intervention) =>
    intervention.serviceName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "in_progress":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      case "scheduled":
      case "planned":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/50"
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Intervenciones Técnicas</h1>
            <p className="text-slate-400 text-lg">
              Monitoreo de intervenciones activas y planificadas en servidores OVHcloud
            </p>
          </div>
          <Button
            onClick={fetchInterventions}
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-700 text-white h-12 px-6"
          >
            <RefreshCw className={`w-5 h-5 mr-2 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-900 border-red-500/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-base mb-2">Intervenciones Activas</p>
                <p className="text-4xl font-bold text-red-400">{activeInterventions.length}</p>
              </div>
              <AlertTriangle className="w-12 h-12 text-red-400" />
            </div>
          </Card>

          <Card className="bg-slate-900 border-yellow-500/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-base mb-2">Intervenciones Planificadas</p>
                <p className="text-4xl font-bold text-yellow-400">{plannedInterventions.length}</p>
              </div>
              <Calendar className="w-12 h-12 text-yellow-400" />
            </div>
          </Card>

          <Card className="bg-slate-900 border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-base mb-2">Servidores Afectados</p>
                <p className="text-4xl font-bold text-slate-200">
                  {new Set([...activeInterventions, ...plannedInterventions].map((i) => i.serviceName)).size}
                </p>
              </div>
              <Server className="w-12 h-12 text-slate-400" />
            </div>
          </Card>
        </div>

        {/* Search and Tabs */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar servidor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 bg-slate-900 border-slate-700 text-slate-200 text-base"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setSelectedTab("active")}
              variant={selectedTab === "active" ? "default" : "outline"}
              className={`h-12 px-6 ${
                selectedTab === "active"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-slate-900 text-slate-400 border-slate-700 hover:bg-slate-800"
              }`}
            >
              <AlertTriangle className="w-5 h-5 mr-2" />
              Activas ({filteredActiveInterventions.length})
            </Button>
            <Button
              onClick={() => setSelectedTab("planned")}
              variant={selectedTab === "planned" ? "default" : "outline"}
              className={`h-12 px-6 ${
                selectedTab === "planned"
                  ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                  : "bg-slate-900 text-slate-400 border-slate-700 hover:bg-slate-800"
              }`}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Planificadas ({filteredPlannedInterventions.length})
            </Button>
          </div>
        </div>

        {/* Interventions List */}
        <div className="space-y-4">
          {loading ? (
            <Card className="bg-slate-900 border-slate-800 p-12 text-center">
              <RefreshCw className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-spin" />
              <p className="text-slate-400 text-lg">Cargando intervenciones...</p>
            </Card>
          ) : selectedTab === "active" ? (
            filteredActiveInterventions.length === 0 ? (
              <Card className="bg-slate-900 border-slate-800 p-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <p className="text-slate-300 text-xl font-semibold mb-2">No hay intervenciones activas</p>
                <p className="text-slate-400 text-base">Todos los servidores están operativos</p>
              </Card>
            ) : (
              filteredActiveInterventions.map((intervention) => (
                <Card
                  key={`${intervention.serviceName}-${intervention.id}`}
                  className="bg-slate-900 border-red-500/50 p-6 hover:border-red-500 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-red-500/20 rounded-lg">
                        <Server className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{intervention.serviceName}</h3>
                        <p className="text-slate-400 text-base">ID de Intervención: {intervention.id}</p>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(intervention.status)} px-4 py-2 text-base`}>
                      {intervention.status || "En Progreso"}
                    </Badge>
                  </div>

                  {intervention.description && (
                    <div className="mb-4 p-4 bg-slate-800 rounded-lg">
                      <p className="text-slate-300 text-base">{intervention.description}</p>
                    </div>
                  )}

                  {intervention.reason && (
                    <div className="mb-4">
                      <p className="text-slate-400 text-sm mb-1">Motivo:</p>
                      <p className="text-slate-200 text-base">{intervention.reason}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 text-sm">
                    {intervention.date && (
                      <div className="flex items-center gap-2 text-slate-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-base">{new Date(intervention.date).toLocaleString("es-ES")}</span>
                      </div>
                    )}
                    {intervention.duration && (
                      <div className="flex items-center gap-2 text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-base">{intervention.duration} minutos</span>
                      </div>
                    )}
                  </div>
                </Card>
              ))
            )
          ) : filteredPlannedInterventions.length === 0 ? (
            <Card className="bg-slate-900 border-slate-800 p-12 text-center">
              <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-300 text-xl font-semibold mb-2">No hay intervenciones planificadas</p>
              <p className="text-slate-400 text-base">No se han programado mantenimientos próximos</p>
            </Card>
          ) : (
            filteredPlannedInterventions.map((intervention) => (
              <Card
                key={`${intervention.serviceName}-${intervention.id}`}
                className="bg-slate-900 border-yellow-500/50 p-6 hover:border-yellow-500 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-500/20 rounded-lg">
                      <Server className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{intervention.serviceName}</h3>
                      <p className="text-slate-400 text-base">ID de Intervención: {intervention.id}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor("planned")} px-4 py-2 text-base`}>Planificada</Badge>
                </div>

                {intervention.description && (
                  <div className="mb-4 p-4 bg-slate-800 rounded-lg">
                    <p className="text-slate-300 text-base">{intervention.description}</p>
                  </div>
                )}

                {intervention.reason && (
                  <div className="mb-4">
                    <p className="text-slate-400 text-sm mb-1">Motivo:</p>
                    <p className="text-slate-200 text-base">{intervention.reason}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 text-sm">
                  {intervention.date && (
                    <div className="flex items-center gap-2 text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-base">
                        Programada: {new Date(intervention.date).toLocaleString("es-ES")}
                      </span>
                    </div>
                  )}
                  {intervention.duration && (
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-base">Duración estimada: {intervention.duration} minutos</span>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
