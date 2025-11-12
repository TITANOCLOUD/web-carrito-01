"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Smartphone, Package, History, ShoppingCart, Users, Globe } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ESimDashboard() {
  const router = useRouter()

  const [stats] = useState({
    planesActivos: 0,
    planesPendientes: 3,
    esimsActivas: 0,
    usuarios: 0,
  })

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Gestión de eSIMs</h1>
            <p className="text-slate-400">
              Administra tus planes de eSIM para conectarte desde cualquier parte del mundo
            </p>
          </div>
          <Button
            onClick={() => router.push("/dashboard/connect/esim/agregar")}
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar eSIM
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Planes activos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Globe className="w-6 h-6 text-blue-500" />
                </div>
                <div className="text-3xl font-bold">{stats.planesActivos}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Planes pendientes de activación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-500/10 rounded-lg">
                  <Package className="w-6 h-6 text-orange-500" />
                </div>
                <div className="text-3xl font-bold">{stats.planesPendientes}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">eSIMs activas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg">
                  <Smartphone className="w-6 h-6 text-cyan-500" />
                </div>
                <div className="text-3xl font-bold">{stats.esimsActivas}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Usuarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
                <div className="text-3xl font-bold">{stats.usuarios}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            className="bg-slate-800 border-slate-700 cursor-pointer hover:bg-slate-750 transition-colors"
            onClick={() => router.push("/dashboard/connect/esim/planes")}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Package className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Planes</CardTitle>
                  <CardDescription>Gestiona tus planes de eSIM</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card
            className="bg-slate-800 border-slate-700 cursor-pointer hover:bg-slate-750 transition-colors"
            onClick={() => router.push("/dashboard/connect/esim/historial-planes")}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <History className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Historial de Planes</CardTitle>
                  <CardDescription>Revisa el historial de planes</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card
            className="bg-slate-800 border-slate-700 cursor-pointer hover:bg-slate-750 transition-colors"
            onClick={() => router.push("/dashboard/connect/esim/historial-esim")}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-cyan-500/10 rounded-lg">
                  <Smartphone className="w-6 h-6 text-cyan-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Historial de eSIM</CardTitle>
                  <CardDescription>Consulta tu historial de eSIMs</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card
            className="bg-slate-800 border-slate-700 cursor-pointer hover:bg-slate-750 transition-colors"
            onClick={() => router.push("/dashboard/connect/esim/ordenes")}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Historial de Órdenes</CardTitle>
                  <CardDescription>Revisa tus órdenes de compra</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Active Plans Section */}
        <Card className="bg-slate-800 border-slate-700 mt-8">
          <CardHeader>
            <CardTitle>Mostrando 3 Plan(es)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Plan 1 - Colombia */}
              <div className="flex items-center justify-between p-4 bg-slate-900 rounded-lg">
                <div className="flex items-center gap-4">
                  <img src="https://flagcdn.com/w40/co.png" alt="Colombia" className="w-10 h-7 object-cover rounded" />
                  <div>
                    <div className="font-semibold">Colombia</div>
                    <div className="text-sm text-slate-400">Inactivo</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-xs text-slate-400">VIGENCIA</div>
                    <div className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm mt-1">
                      Activación pendiente
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400">ESIM</div>
                    <div className="text-sm font-mono mt-1">dsUAskjioiqL</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400">CONSUMO DE DATOS</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: "0%" }} />
                      </div>
                      <span className="text-sm">0.00 GB/20.00 GB</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400">USUARIO</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-8 h-8 bg-slate-700 rounded-full" />
                      <span className="text-sm">Propio</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-cyan-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Plan 2 - Colombia */}
              <div className="flex items-center justify-between p-4 bg-slate-900 rounded-lg">
                <div className="flex items-center gap-4">
                  <img src="https://flagcdn.com/w40/co.png" alt="Colombia" className="w-10 h-7 object-cover rounded" />
                  <div>
                    <div className="font-semibold">Colombia</div>
                    <div className="text-sm text-slate-400">Inactivo</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-xs text-slate-400">VIGENCIA</div>
                    <div className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm mt-1">
                      Activación pendiente
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400">ESIM</div>
                    <div className="text-sm font-mono mt-1">gidTjOVD8eqo</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400">CONSUMO DE DATOS</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: "0%" }} />
                      </div>
                      <span className="text-sm">0.00 GB/20.00 GB</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400">USUARIO</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-8 h-8 bg-slate-700 rounded-full" />
                      <span className="text-sm">Propio</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-cyan-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Plan 3 - Latinoamérica */}
              <div className="flex items-center justify-between p-4 bg-slate-900 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-7 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded flex items-center justify-center text-xs font-bold">
                    LATAM
                  </div>
                  <div>
                    <div className="font-semibold">Latinoamérica</div>
                    <div className="text-sm text-slate-400">Inactivo</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-xs text-slate-400">VIGENCIA</div>
                    <div className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm mt-1">
                      Activación pendiente
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400">ESIM</div>
                    <div className="text-sm font-mono mt-1">7lr4bQ9uJgMC</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400">CONSUMO DE DATOS</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: "0%" }} />
                      </div>
                      <span className="text-sm">0.00 GB/10.00 GB</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400">USUARIO</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-8 h-8 bg-slate-700 rounded-full" />
                      <span className="text-sm">Propio</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-cyan-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
