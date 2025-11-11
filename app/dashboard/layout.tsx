"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  ChevronRight,
  Activity,
  Database,
  Server,
  Settings,
  Users,
  Building2,
  Shield,
  CreditCard,
  Code,
} from "lucide-react"
import Image from "next/image"
import { CasandraWidget } from "@/components/casandra-widget"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [clustersOpen, setClustersOpen] = useState(true)
  const [monitoringOpen, setMonitoringOpen] = useState(true)
  const [securityOpen, setSecurityOpen] = useState(false)
  const [integrationsOpen, setIntegrationsOpen] = useState(false)

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
          <button
            onClick={() => router.push("/dashboard")}
            className={`w-full flex items-center gap-3 px-3 py-2 mb-6 rounded-lg transition-colors ${
              isActive("/dashboard") ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
          >
            <Activity className="w-5 h-5" />
            <span className="font-semibold">Bienvenido al Reactor</span>
          </button>

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

            {/* Monitoreo NOC */}
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

            {/* Seguridad y Usuarios */}
            <div>
              <button
                onClick={() => setSecurityOpen(!securityOpen)}
                className="w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Shield className="w-5 h-5" />
                <span>Seguridad y Usuarios</span>
                {securityOpen ? (
                  <ChevronDown className="w-4 h-4 ml-auto" />
                ) : (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>

              {securityOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  <button
                    onClick={() => router.push("/dashboard/users")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/users")
                        ? "bg-slate-800 text-slate-200"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Gestión de Usuarios
                    </div>
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/clients")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/clients")
                        ? "bg-slate-800 text-slate-200"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Clientes y Subclientes
                    </div>
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/2fa")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/2fa")
                        ? "bg-slate-800 text-slate-200"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Autenticación 2FA
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Integraciones */}
            <div>
              <button
                onClick={() => setIntegrationsOpen(!integrationsOpen)}
                className="w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Code className="w-5 h-5" />
                <span>Integraciones</span>
                {integrationsOpen ? (
                  <ChevronDown className="w-4 h-4 ml-auto" />
                ) : (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>

              {integrationsOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  <button
                    onClick={() => router.push("/dashboard/payment-gateways")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/payment-gateways")
                        ? "bg-slate-800 text-slate-200"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Pasarelas de Pago
                    </div>
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/vercel-deploy")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/vercel-deploy")
                        ? "bg-slate-800 text-slate-200"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      Despliegue Vercel
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Panel Interno Administración Página */}
            <button
              onClick={() => router.push("/dashboard/admin")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive("/dashboard/admin") ? "bg-slate-800 text-slate-200" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Panel Interno Administración Página</span>
            </button>

            {/* Redes Sociales del Portal */}
            <button
              onClick={() => router.push("/dashboard/social-config")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive("/dashboard/social-config")
                  ? "bg-slate-800 text-slate-200"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              <span>Redes Sociales del Portal</span>
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

      <main className="flex-1 overflow-y-auto bg-slate-900">
        {children}
        <CasandraWidget />
      </main>
    </div>
  )
}
