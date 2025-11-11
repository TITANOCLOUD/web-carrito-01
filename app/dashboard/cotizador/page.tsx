"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, FileText, TrendingUp, DollarSign, Users } from "lucide-react"
import Link from "next/link"

export default function CotizadorPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const cotizaciones = [
    {
      id: "COV03263",
      cliente: "TELSTRA SAB DE CV",
      agente: "Elizabeth Sierra",
      fecha: "2025/11/10",
      total: 41180.0,
      estado: "Enviada",
      nivel: "Gold",
    },
    {
      id: "COV03264",
      cliente: "INTEGRA TECH",
      agente: "Juan Pérez",
      fecha: "2025/11/09",
      total: 28500.0,
      estado: "Borrador",
      nivel: "Silver",
    },
    {
      id: "COV03265",
      cliente: "CLOUD SYSTEMS",
      agente: "María González",
      fecha: "2025/11/08",
      total: 65000.0,
      estado: "Aprobada",
      nivel: "Platinum",
    },
  ]

  const stats = [
    { label: "Cotizaciones Totales", value: "156", icon: FileText, color: "text-blue-400" },
    { label: "Valor Total", value: "$2.5M", icon: DollarSign, color: "text-green-400" },
    { label: "Tasa Conversión", value: "68%", icon: TrendingUp, color: "text-cyan-400" },
    { label: "Clientes Activos", value: "89", icon: Users, color: "text-purple-400" },
  ]

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Sistema de Cotizaciones</h1>
            <p className="text-slate-400">Gestiona cotizaciones, precios e impuestos por zona</p>
          </div>
          <Link href="/dashboard/cotizador/nueva">
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Cotización
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="bg-slate-900 border-slate-800 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/dashboard/cotizador/listas-precios">
            <Card className="bg-slate-900 border-slate-800 p-6 hover:bg-slate-800 cursor-pointer transition-colors">
              <h3 className="text-white font-semibold mb-2">Listas de Precios</h3>
              <p className="text-slate-400 text-sm">Gestiona precios por compañía y zona</p>
            </Card>
          </Link>
          <Link href="/dashboard/cotizador/impuestos">
            <Card className="bg-slate-900 border-slate-800 p-6 hover:bg-slate-800 cursor-pointer transition-colors">
              <h3 className="text-white font-semibold mb-2">Configurar Impuestos</h3>
              <p className="text-slate-400 text-sm">Define impuestos por país/zona</p>
            </Card>
          </Link>
          <Link href="/dashboard/cotizador/niveles-cliente">
            <Card className="bg-slate-900 border-slate-800 p-6 hover:bg-slate-800 cursor-pointer transition-colors">
              <h3 className="text-white font-semibold mb-2">Niveles de Cliente</h3>
              <p className="text-slate-400 text-sm">Configura descuentos por nivel</p>
            </Card>
          </Link>
        </div>

        {/* Search */}
        <Card className="bg-slate-900 border-slate-800 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Buscar cotización por número, cliente o agente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <Button variant="outline" className="border-slate-700 text-slate-300 bg-transparent">
              Filtrar
            </Button>
          </div>
        </Card>

        {/* Cotizaciones Table */}
        <Card className="bg-slate-900 border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left p-4 text-slate-400 font-medium">Número</th>
                  <th className="text-left p-4 text-slate-400 font-medium">Cliente</th>
                  <th className="text-left p-4 text-slate-400 font-medium">Agente</th>
                  <th className="text-left p-4 text-slate-400 font-medium">Nivel</th>
                  <th className="text-left p-4 text-slate-400 font-medium">Fecha</th>
                  <th className="text-right p-4 text-slate-400 font-medium">Total</th>
                  <th className="text-center p-4 text-slate-400 font-medium">Estado</th>
                  <th className="text-center p-4 text-slate-400 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cotizaciones.map((cot) => (
                  <tr key={cot.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="p-4">
                      <span className="text-cyan-400 font-medium">{cot.id}</span>
                    </td>
                    <td className="p-4 text-white">{cot.cliente}</td>
                    <td className="p-4 text-slate-300">{cot.agente}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          cot.nivel === "Platinum"
                            ? "bg-purple-500/20 text-purple-300"
                            : cot.nivel === "Gold"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : cot.nivel === "Silver"
                                ? "bg-slate-500/20 text-slate-300"
                                : "bg-orange-500/20 text-orange-300"
                        }`}
                      >
                        {cot.nivel}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300">{cot.fecha}</td>
                    <td className="p-4 text-right text-white font-medium">
                      ${cot.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          cot.estado === "Aprobada"
                            ? "bg-green-500/20 text-green-300"
                            : cot.estado === "Enviada"
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-slate-500/20 text-slate-300"
                        }`}
                      >
                        {cot.estado}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 bg-transparent">
                        Ver
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
