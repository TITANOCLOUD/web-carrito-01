"use client"

import { Button } from "@/components/ui/button"
import { Plus, Users, Phone, Clock, TrendingUp } from "lucide-react"

export default function CallCenterAdminPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Centro de Llamadas</h1>
          <p className="text-slate-400 mt-2">Monitorea y gestiona tu operación de call center en tiempo real</p>
        </div>
        <Button className="bg-cyan-500 hover:bg-cyan-600">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Agente
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">Agentes Activos</span>
            <Users className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-bold text-white">23 / 30</p>
        </div>

        <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">Llamadas en Cola</span>
            <Phone className="w-5 h-5 text-orange-400" />
          </div>
          <p className="text-3xl font-bold text-white">8</p>
        </div>

        <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">Tiempo Espera Prom.</span>
            <Clock className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white">0:45</p>
          <p className="text-sm text-slate-500 mt-1">segundos</p>
        </div>

        <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">Nivel de Servicio</span>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">94%</p>
          <p className="text-sm text-green-500 mt-1">+3% vs ayer</p>
        </div>
      </div>

      <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Agentes en Línea</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a0e1a]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Agente</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Llamadas Hoy</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Tiempo Promedio</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Satisfacción</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1f2e]">
              {[
                { nombre: "María González", estado: "En llamada", llamadas: 24, tiempo: "3:45", satisfaccion: 4.8 },
                { nombre: "Carlos Ruiz", estado: "Disponible", llamadas: 19, tiempo: "4:12", satisfaccion: 4.6 },
                { nombre: "Ana Martínez", estado: "En llamada", llamadas: 22, tiempo: "3:58", satisfaccion: 4.9 },
              ].map((agente, idx) => (
                <tr key={idx} className="hover:bg-[#1a1f2e] transition-colors">
                  <td className="px-6 py-4 text-slate-300">{agente.nombre}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        agente.estado === "En llamada"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-cyan-500/20 text-cyan-400"
                      }`}
                    >
                      {agente.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{agente.llamadas}</td>
                  <td className="px-6 py-4 text-slate-300">{agente.tiempo}</td>
                  <td className="px-6 py-4 text-yellow-400">{agente.satisfaccion} ⭐</td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm" className="text-cyan-400">
                      Ver Perfil
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
