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
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Panel de Control</h1>
            <p className="text-slate-400">Gestiona tus clusters y configuraciones</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* IBG Cluster Card */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-cyan-500 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">IBG</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                    Activo
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    />
                  </svg>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Tipo:</span>
                  <span className="text-white font-medium">HGR Scale</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">RAM:</span>
                  <span className="text-white">128 GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Almacenamiento:</span>
                  <span className="text-white">4x 2TB NVMe</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Ancho de Banda:</span>
                  <span className="text-white">10 Gbps</span>
                </div>
              </div>
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">Configurar</Button>
            </div>

            {/* INTEGRA Cluster Card */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-cyan-500 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">INTEGRA</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                    Activo
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    />
                  </svg>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Tipo:</span>
                  <span className="text-white font-medium">Standard</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">RAM:</span>
                  <span className="text-white">64 GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Almacenamiento:</span>
                  <span className="text-white">2x 1TB HDD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Ancho de Banda:</span>
                  <span className="text-white">2.5 Gbps</span>
                </div>
              </div>
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">Configurar</Button>
            </div>

            {/* KATIA RIVERO Cluster Card */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-cyan-500 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">KATIA RIVERO</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                    Mantenimiento
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    />
                  </svg>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Tipo:</span>
                  <span className="text-white font-medium">HGR Scale</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">RAM:</span>
                  <span className="text-white">256 GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Almacenamiento:</span>
                  <span className="text-white">6x 4TB NVMe</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Ancho de Banda:</span>
                  <span className="text-white">10 Gbps</span>
                </div>
              </div>
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">Configurar</Button>
            </div>

            {/* Servidor de Prueba Card */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-cyan-500 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Servidor de Prueba</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    Testing
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    />
                  </svg>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Tipo:</span>
                  <span className="text-white font-medium">Standard</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">RAM:</span>
                  <span className="text-white">32 GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Almacenamiento:</span>
                  <span className="text-white">1x 500GB HDD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Ancho de Banda:</span>
                  <span className="text-white">1 Gbps</span>
                </div>
              </div>
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">Configurar</Button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-950 border-t border-slate-800 px-6 py-4 text-center text-sm text-slate-500">
          Copyright © 2025 Saturno. Desarrollado por Saturno Software. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  )
}
