"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Phone, TrendingUp, Users } from "lucide-react"

export default function TroncalesAdminPage() {
  const [troncales, setTroncales] = useState([
    {
      id: 1,
      nombre: "Troncal Principal - México",
      canales: 50,
      activos: 23,
      minutos: 4582,
      estado: "activo",
    },
    { id: 2, nombre: "Troncal USA", canales: 30, activos: 15, minutos: 2341, estado: "activo" },
    { id: 3, nombre: "Troncal Europa", canales: 20, activos: 8, minutos: 1205, estado: "inactivo" },
  ])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestión de Troncales SIP</h1>
          <p className="text-slate-400 mt-2">Administra tus troncales de comunicación empresarial</p>
        </div>
        <Button className="bg-cyan-500 hover:bg-cyan-600">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Troncal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">Total Canales</span>
            <Phone className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-bold text-white">100</p>
          <p className="text-sm text-slate-500 mt-1">Activos: 46</p>
        </div>

        <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">Llamadas Hoy</span>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">1,247</p>
          <p className="text-sm text-green-500 mt-1">+12% vs ayer</p>
        </div>

        <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">Minutos Totales</span>
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white">8,128</p>
          <p className="text-sm text-slate-500 mt-1">Este mes</p>
        </div>

        <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">Costo Estimado</span>
            <span className="text-cyan-400">$</span>
          </div>
          <p className="text-3xl font-bold text-white">$246</p>
          <p className="text-sm text-slate-500 mt-1">Mes actual</p>
        </div>
      </div>

      <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg overflow-hidden">
        <div className="p-6 border-b border-[#1a1f2e]">
          <h2 className="text-xl font-semibold text-white">Troncales Activas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a0e1a]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Nombre</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Canales</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">En Uso</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Minutos Hoy</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1f2e]">
              {troncales.map((troncal) => (
                <tr key={troncal.id} className="hover:bg-[#1a1f2e] transition-colors">
                  <td className="px-6 py-4 text-slate-300">{troncal.nombre}</td>
                  <td className="px-6 py-4 text-slate-300">{troncal.canales}</td>
                  <td className="px-6 py-4">
                    <span className="text-cyan-400 font-semibold">{troncal.activos}</span>
                    <span className="text-slate-500"> / {troncal.canales}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{troncal.minutos.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        troncal.estado === "activo"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-slate-500/20 text-slate-400"
                      }`}
                    >
                      {troncal.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                      Ver Detalles
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
