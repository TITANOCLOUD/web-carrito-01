"use client"
import { Button } from "@/components/ui/button"
import { Plus, Phone, Clock, TrendingUp } from "lucide-react"

export default function IVRAdminPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestión de IVR</h1>
          <p className="text-slate-400 mt-2">Configura y administra tus sistemas de respuesta de voz interactiva</p>
        </div>
        <Button className="bg-cyan-500 hover:bg-cyan-600">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo IVR
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">IVRs Activos</span>
            <Phone className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-bold text-white">5</p>
        </div>

        <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">Llamadas Procesadas</span>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">3,452</p>
          <p className="text-sm text-green-500 mt-1">+18% vs mes anterior</p>
        </div>

        <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">Tiempo Promedio</span>
            <Clock className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white">1:23</p>
          <p className="text-sm text-slate-500 mt-1">minutos</p>
        </div>

        <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">Tasa de Resolución</span>
            <span className="text-cyan-400">%</span>
          </div>
          <p className="text-3xl font-bold text-white">76%</p>
          <p className="text-sm text-green-500 mt-1">+5% vs mes anterior</p>
        </div>
      </div>

      <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Menús IVR Configurados</h2>
        <div className="space-y-4">
          {[
            { nombre: "IVR Principal - Atención al Cliente", opciones: 5, llamadas: 1847 },
            { nombre: "IVR Soporte Técnico", opciones: 4, llamadas: 923 },
            { nombre: "IVR Ventas", opciones: 3, llamadas: 682 },
          ].map((ivr, idx) => (
            <div
              key={idx}
              className="bg-[#0a0e1a] border border-[#1a1f2e] rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="text-white font-medium">{ivr.nombre}</h3>
                <p className="text-sm text-slate-400 mt-1">
                  {ivr.opciones} opciones configuradas • {ivr.llamadas.toLocaleString()} llamadas hoy
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-cyan-400">
                  Editar
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-400">
                  Estadísticas
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
