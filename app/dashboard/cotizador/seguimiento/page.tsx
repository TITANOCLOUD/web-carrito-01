"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Clock, CheckCircle, XCircle, Send, User } from "lucide-react"

export default function SeguimientoPage() {
  const pipeline = [
    { estado: "Borrador", cantidad: 12, color: "bg-slate-500", icon: FileText },
    { estado: "Enviada", cantidad: 8, color: "bg-blue-500", icon: Send },
    { estado: "En Revisión", cantidad: 5, color: "bg-yellow-500", icon: Clock },
    { estado: "Aprobada", cantidad: 15, color: "bg-green-500", icon: CheckCircle },
    { estado: "Rechazada", cantidad: 3, color: "bg-red-500", icon: XCircle },
  ]

  const cotizaciones = [
    {
      id: "COV03263",
      cliente: "TELSTRA SAB DE CV",
      agente: "Elizabeth Sierra",
      estado: "En Revisión",
      valor: 41180.0,
      fecha: "2025/11/10",
      ultimaActividad: "Cliente revisando propuesta",
      probabilidad: 75,
      proximoSeguimiento: "2025/11/15",
    },
    {
      id: "COV03264",
      cliente: "INTEGRA TECH",
      agente: "Juan Pérez",
      estado: "Enviada",
      valor: 28500.0,
      fecha: "2025/11/09",
      ultimaActividad: "Cotización enviada por correo",
      probabilidad: 50,
      proximoSeguimiento: "2025/11/12",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Seguimiento CRM de Cotizaciones</h1>
          <p className="text-slate-400">Gestiona el pipeline y haz seguimiento a cada cotización</p>
        </div>

        {/* Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {pipeline.map((etapa) => {
            const Icon = etapa.icon
            return (
              <Card key={etapa.estado} className="bg-slate-900 border-slate-800 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${etapa.color}/20`}>
                    <Icon className={`w-5 h-5 text-${etapa.color.replace("bg-", "")}`} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{etapa.cantidad}</div>
                    <div className="text-slate-400 text-sm">{etapa.estado}</div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Lista de cotizaciones con seguimiento */}
        <div className="space-y-4">
          {cotizaciones.map((cot) => (
            <Card key={cot.id} className="bg-slate-900 border-slate-800 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-cyan-400 font-mono text-lg font-bold">{cot.id}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        cot.estado === "Aprobada"
                          ? "bg-green-500/20 text-green-300"
                          : cot.estado === "En Revisión"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : cot.estado === "Enviada"
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-slate-500/20 text-slate-300"
                      }`}
                    >
                      {cot.estado}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{cot.cliente}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {cot.agente}
                    </span>
                    <span>Fecha: {cot.fecha}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white mb-2">
                    ${cot.valor.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 bg-transparent">
                      Ver Detalles
                    </Button>
                    <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                      Seguimiento
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <div className="text-slate-400 text-sm mb-1">Última Actividad</div>
                  <div className="text-white">{cot.ultimaActividad}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-sm mb-1">Probabilidad de Cierre</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-800 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${cot.probabilidad}%` }} />
                    </div>
                    <span className="text-white font-medium">{cot.probabilidad}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 text-sm mb-1">Próximo Seguimiento</div>
                  <div className="text-white flex items-center gap-1">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    {cot.proximoSeguimiento}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
