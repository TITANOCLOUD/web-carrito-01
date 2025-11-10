"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Activity, Database, Server, Settings } from "lucide-react"
import Image from "next/image"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [clustersOpen, setClustersOpen] = useState(true)
  const [monitoringOpen, setMonitoringOpen] = useState(true)

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    if (auth !== "true") {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  const isActive = (path: string) => pathname === path

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/light-logoWHI-U4g3b0uwpZ2MefpUxtA4JDuq0yC2Fh.png"
            alt="TITANO CLOUD"
            width={150}
            height={50}
            className="object-contain"
          />
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-4">MENÚ PRINCIPAL</p>

          <div className="space-y-2">
            {/* Centro de Datos */}
            <div>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">
                <Database className="w-5 h-5" />
                <span>Centro de Datos</span>
                <ChevronDown className="w-4 h-4 ml-auto" />
              </button>

              <div className="ml-4 mt-2 space-y-1">
                <button
                  onClick={() => setClustersOpen(!clustersOpen)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {clustersOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  <span>Clusteres</span>
                </button>

                {clustersOpen && (
                  <div className="ml-6 space-y-1">
                    <button className="w-full text-left px-3 py-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors">
                      IBG
                    </button>
                    <button className="w-full text-left px-3 py-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors">
                      INTEGRA
                    </button>
                    <button className="w-full text-left px-3 py-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors">
                      KATIA RIVERO
                    </button>
                    <button className="w-full text-left px-3 py-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors">
                      Servidor de Prueba
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                onClick={() => setMonitoringOpen(!monitoringOpen)}
                className="w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Activity className="w-5 h-5" />
                <span>Monitoreo NOC</span>
                {monitoringOpen ? (
                  <ChevronDown className="w-4 h-4 ml-auto" />
                ) : (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>

              {monitoringOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  <button
                    onClick={() => router.push("/dashboard")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard")
                        ? "bg-slate-800 text-slate-200"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    Bienvenido al Reactor
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/noc-dashboard")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/noc-dashboard")
                        ? "bg-slate-800 text-slate-200"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    Dashboard NOC
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/hosts")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/hosts")
                        ? "bg-slate-800 text-slate-200"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4" />
                      Hosts y Servidores
                    </div>
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/monitoring-overview")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/monitoring-overview")
                        ? "bg-slate-800 text-slate-200"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    Dashboard de Monitoreo
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/monitoring")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/monitoring")
                        ? "bg-slate-800 text-slate-200"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    Monitoreo Detallado
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => router.push("/dashboard/admin")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive("/dashboard/admin") ? "bg-slate-800 text-slate-200" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Panel Interno Administración Página</span>
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Button
            variant="outline"
            className="w-full bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800"
            onClick={() => {
              localStorage.removeItem("isAuthenticated")
              router.push("/login")
            }}
          >
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-slate-900">{children}</main>
    </div>
  )
}
