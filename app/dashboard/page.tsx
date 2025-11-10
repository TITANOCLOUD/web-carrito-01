"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sun, Lock, Maximize2, Menu, ChevronDown, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function DashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [clustersOpen, setClustersOpen] = useState(true)
  const [monitoringOpen, setMonitoringOpen] = useState(false)

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

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/light-logoWHI-U4g3b0uwpZ2MefpUxtA4JDuq0yC2Fh.png"
            alt="SATURNO"
            width={150}
            height={50}
            className="object-contain"
          />
        </div>

        <nav className="flex-1 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-4">MENÚ PRINCIPAL</p>

          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span>Centro de Datos</span>
              <ChevronDown className="w-4 h-4 ml-auto" />
            </button>

            <div className="ml-4 space-y-1">
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

            <button
              onClick={() => setMonitoringOpen(!monitoringOpen)}
              className="w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <span>Monitoreo NOC/SOC</span>
              {monitoringOpen ? (
                <ChevronDown className="w-4 h-4 ml-auto" />
              ) : (
                <ChevronRight className="w-4 h-4 ml-auto" />
              )}
            </button>

            {monitoringOpen && (
              <div className="ml-4 space-y-1">
                <button
                  onClick={() => router.push("/dashboard/monitoring-overview")}
                  className="w-full text-left px-3 py-2 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
                >
                  Dashboard de Monitoreo
                </button>
                <button
                  onClick={() => router.push("/dashboard/monitoring")}
                  className="w-full text-left px-3 py-2 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
                >
                  Monitoreo Detallado
                </button>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" className="text-slate-400">
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-slate-400">
              <Sun className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400">
              <Lock className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400">
              <Maximize2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400">
              <Menu className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center ml-2">
              <span className="text-white text-sm font-medium">A</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-white">Bienvenido a Titano Cloud</h1>
          <p className="text-slate-400 mt-2">Selecciona una opción del menú para comenzar</p>
        </main>

        {/* Footer */}
        <footer className="bg-slate-950 border-t border-slate-800 px-6 py-4 text-center text-sm text-slate-500">
          Copyright © 2025 Saturno. Desarrollado por Saturno Software. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  )
}
