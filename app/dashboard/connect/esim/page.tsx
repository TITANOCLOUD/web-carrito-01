"use client"

import { Button } from "@/components/ui/button"
import { Plus, Smartphone, Globe, TrendingUp, DollarSign } from "lucide-react"

export default function eSIMAdminPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Plataforma eSIM</h1>
          <p className="text-slate-400 mt-2">Gestiona y provisiona eSIMs para tus clientes</p>
        </div>
        <Button className="bg-cyan-500 hover:bg-cyan-600">
          <Plus className="w-4 h-4 mr-2" />
          Provisionar eSIM
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">eSIMs Activas</span>
            <Smartphone className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-bold text-white">847</p>
          <p className="text-sm text-green-500 mt-1">+52 este mes</p>
        </div>

        <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">Países Activos</span>
            <Globe className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">45</p>
        </div>

        <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">Datos Consumidos</span>
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white">2.4 TB</p>
          <p className="text-sm text-slate-500 mt-1">Este mes</p>
        </div>

        <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">Ingresos Mes</span>
            <DollarSign className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">$12,450</p>
          <p className="text-sm text-green-500 mt-1">+23% vs mes anterior</p>
        </div>
      </div>

      <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">eSIMs Recientes</h2>
          <Button variant="ghost" size="sm" className="text-cyan-400">
            Ver Todas
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a0e1a]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">ICCID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Cliente</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">País</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Plan</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Datos Usados</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1f2e]">
              {[
                {
                  iccid: "8934076...",
                  cliente: "Juan Pérez",
                  pais: "México",
                  plan: "5GB",
                  uso: "2.3 GB",
                  estado: "activo",
                },
                {
                  iccid: "8934077...",
                  cliente: "María López",
                  pais: "USA",
                  plan: "10GB",
                  uso: "7.8 GB",
                  estado: "activo",
                },
                {
                  iccid: "8934078...",
                  cliente: "Carlos Ruiz",
                  pais: "España",
                  plan: "3GB",
                  uso: "1.2 GB",
                  estado: "suspendido",
                },
              ].map((esim, idx) => (
                <tr key={idx} className="hover:bg-[#1a1f2e] transition-colors">
                  <td className="px-6 py-4 text-slate-300 font-mono text-sm">{esim.iccid}</td>
                  <td className="px-6 py-4 text-slate-300">{esim.cliente}</td>
                  <td className="px-6 py-4 text-slate-300">{esim.pais}</td>
                  <td className="px-6 py-4 text-slate-300">{esim.plan}</td>
                  <td className="px-6 py-4 text-cyan-400">{esim.uso}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        esim.estado === "activo" ? "bg-green-500/20 text-green-400" : "bg-orange-500/20 text-orange-400"
                      }`}
                    >
                      {esim.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm" className="text-cyan-400">
                      Gestionar
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
