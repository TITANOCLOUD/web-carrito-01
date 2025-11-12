"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  ChevronRight,
  Activity,
  Server,
  Settings,
  Users,
  Building2,
  Shield,
  CreditCard,
  Code,
  AlertTriangle,
} from "lucide-react"
import Image from "next/image"
import { CasandraWidget } from "@/components/casandra-widget"
import { UserMenu } from "@/components/user-menu"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [publicCloudOpen, setPublicCloudOpen] = useState(false)
  const [privateCloudOpen, setPrivateCloudOpen] = useState(false)
  const [domainEmailOpen, setDomainEmailOpen] = useState(false)
  const [hostingOpen, setHostingOpen] = useState(false)
  const [monitoringOpen, setMonitoringOpen] = useState(true)
  const [securityOpen, setSecurityOpen] = useState(false)
  const [integrationsOpen, setIntegrationsOpen] = useState(false)
  const [domainWebOpen, setDomainWebOpen] = useState(false)
  const [hostingPacksOpen, setHostingPacksOpen] = useState(false)
  const [quickAccessOpen, setQuickAccessOpen] = useState(false)
  const [connectOpen, setConnectOpen] = useState(false)
  const [ticketsOpen, setTicketsOpen] = useState(false)
  const [herramientasOpen, setHerramientasOpen] = useState(false)
  const [cotizadorOpen, setCotizadorOpen] = useState(true)

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
            <div>
              <button
                onClick={() => setPublicCloudOpen(!publicCloudOpen)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
                <span className="font-medium">Public Cloud</span>
                {publicCloudOpen ? (
                  <ChevronDown className="w-4 h-4 ml-auto" />
                ) : (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>

              {publicCloudOpen && (
                <div className="ml-6 mt-2 space-y-1 border-l border-slate-700 pl-3">
                  <button
                    onClick={() => router.push("/dashboard/public-cloud/compute")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/public-cloud/compute")
                        ? "bg-cyan-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    Compute
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/public-cloud/storage")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/public-cloud/storage")
                        ? "bg-cyan-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    Storage
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/public-cloud/network")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/public-cloud/network")
                        ? "bg-cyan-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    Network
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/public-cloud/containers")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/public-cloud/containers")
                        ? "bg-cyan-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    Containers & Orchestration
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/public-cloud/databases")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/public-cloud/databases")
                        ? "bg-cyan-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    Databases
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/public-cloud/analytics")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/public-cloud/analytics")
                        ? "bg-cyan-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    Analytics
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/public-cloud/ai-ml")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/public-cloud/ai-ml")
                        ? "bg-cyan-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    AI & Machine Learning
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/public-cloud/quantum")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/public-cloud/quantum")
                        ? "bg-cyan-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    Quantum Computing
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/public-cloud/savings-plans")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/public-cloud/savings-plans")
                        ? "bg-cyan-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    Savings Plans
                  </button>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setPrivateCloudOpen(!privateCloudOpen)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Server className="w-5 h-5" />
                <span className="font-medium">Nube Privada Alojada</span>
                {privateCloudOpen ? (
                  <ChevronDown className="w-4 h-4 ml-auto" />
                ) : (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>

              {privateCloudOpen && (
                <div className="ml-6 mt-2 space-y-1 border-l border-slate-700 pl-3">
                  <button
                    onClick={() => router.push("/dashboard/private-cloud/nutanix")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/private-cloud/nutanix")
                        ? "bg-cyan-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    Nutanix
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/private-cloud/sap")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/private-cloud/sap")
                        ? "bg-cyan-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    SAP HANA
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/private-cloud/storage")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/private-cloud/storage")
                        ? "bg-cyan-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    Almacenamiento y Backup
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/private-cloud/network")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/private-cloud/network")
                        ? "bg-cyan-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    Red
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/private-cloud/security")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/private-cloud/security")
                        ? "bg-cyan-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    Seguridad de Red
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/private-cloud/iam")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/private-cloud/iam")
                        ? "bg-cyan-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    Identity & Access Management
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/private-cloud/logs-platform")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/private-cloud/logs-platform")
                        ? "bg-cyan-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    Logs Data Platform
                  </button>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setDomainEmailOpen(!domainEmailOpen)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-medium">Dominio, Hosting y Email</span>
                {domainEmailOpen ? (
                  <ChevronDown className="w-4 h-4 ml-auto" />
                ) : (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>

              {domainEmailOpen && (
                <div className="ml-6 mt-2 space-y-2 border-l-2 border-cyan-800 pl-3">
                  {/* Dominio Web Section */}
                  <div className="space-y-1">
                    <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider px-3 py-1">
                      Dominio Web
                    </p>
                    <button
                      onClick={() => router.push("/dashboard/domains/search")}
                      className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        isActive("/dashboard/domains/search")
                          ? "bg-cyan-600 text-white"
                          : "text-slate-300 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      Busque su dominio
                    </button>
                    <button
                      onClick={() => router.push("/dashboard/domains/renew")}
                      className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        isActive("/dashboard/domains/renew")
                          ? "bg-cyan-600 text-white"
                          : "text-slate-300 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      Renueve su dominio
                    </button>
                    <button
                      onClick={() => router.push("/dashboard/domains/aftermarket")}
                      className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        isActive("/dashboard/domains/aftermarket")
                          ? "bg-cyan-600 text-white"
                          : "text-slate-300 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      Mercado secundario
                    </button>
                  </div>

                  {/* Hosting Section */}
                  <div className="space-y-1 pt-2">
                    <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider px-3 py-1">Hosting</p>
                    <button
                      onClick={() => router.push("/dashboard/hosting/all-packs")}
                      className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        isActive("/dashboard/hosting/all-packs")
                          ? "bg-cyan-600 text-white"
                          : "text-slate-300 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      Todos los packs Web
                    </button>
                    <button
                      onClick={() => router.push("/dashboard/hosting/databases")}
                      className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        isActive("/dashboard/hosting/databases")
                          ? "bg-cyan-600 text-white"
                          : "text-slate-300 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      Bases de datos adicionales
                    </button>
                    <button
                      onClick={() => router.push("/dashboard/hosting/ssl")}
                      className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        isActive("/dashboard/hosting/ssl")
                          ? "bg-cyan-600 text-white"
                          : "text-slate-300 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      Opción SSL
                    </button>
                    <button
                      onClick={() => router.push("/dashboard/hosting/cdn")}
                      className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        isActive("/dashboard/hosting/cdn")
                          ? "bg-cyan-600 text-white"
                          : "text-slate-300 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      Opción CDN
                    </button>
                  </div>

                  {/* Acceso Rápido Section */}
                  <div className="space-y-1 pt-2">
                    <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider px-3 py-1">
                      Acceso Rápido
                    </p>
                    <button
                      onClick={() => router.push("/dashboard/domains/prices")}
                      className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        isActive("/dashboard/domains/prices")
                          ? "bg-cyan-600 text-white"
                          : "text-slate-300 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      Precios de los dominios
                    </button>
                    <button
                      onClick={() => router.push("/dashboard/domains/whois")}
                      className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        isActive("/dashboard/domains/whois")
                          ? "bg-cyan-600 text-white"
                          : "text-slate-300 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      Whois: buscar información
                    </button>
                    <button
                      onClick={() => router.push("/dashboard/domains/dns")}
                      className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        isActive("/dashboard/domains/dns")
                          ? "bg-cyan-600 text-white"
                          : "text-slate-300 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      Servidor DNS
                    </button>
                    <button
                      onClick={() => router.push("/dashboard/quick-access/create-website")}
                      className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        isActive("/dashboard/quick-access/create-website")
                          ? "bg-cyan-600 text-white"
                          : "text-slate-300 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      ¿Cómo crear un sitio web?
                    </button>
                    <button
                      onClick={() => router.push("/dashboard/quick-access/wordpress-hosting")}
                      className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        isActive("/dashboard/quick-access/wordpress-hosting")
                          ? "bg-cyan-600 text-white"
                          : "text-slate-300 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      Aloje su sitio WordPress
                    </button>
                    <button
                      onClick={() => router.push("/dashboard/quick-access/one-click-website")}
                      className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        isActive("/dashboard/quick-access/one-click-website")
                          ? "bg-cyan-600 text-white"
                          : "text-slate-300 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      Cree su sitio web en un clic
                    </button>
                  </div>

                  {/* Email */}
                  <div className="pt-2">
                    <button
                      onClick={() => router.push("/dashboard/email/management")}
                      className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        isActive("/dashboard/email/management")
                          ? "bg-cyan-600 text-white"
                          : "text-slate-300 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      <span className="font-medium">Email</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Connect+ */}
            <div>
              <button
                onClick={() => setConnectOpen(!connectOpen)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="font-medium">Connect+</span>
                {connectOpen ? (
                  <ChevronDown className="w-4 h-4 ml-auto" />
                ) : (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>

              {connectOpen && (
                <div className="ml-6 mt-2 space-y-1 border-l border-slate-700 pl-3">
                  <button
                    onClick={() => router.push("/dashboard/connect/troncales")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${isActive("/dashboard/connect/troncales") ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                  >
                    Troncales SIP
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/connect/ivr")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${isActive("/dashboard/connect/ivr") ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                  >
                    IVR
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/connect/callcenter")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${isActive("/dashboard/connect/callcenter") ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                  >
                    Call Center
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/connect/pbx")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${isActive("/dashboard/connect/pbx") ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                  >
                    PBX Virtual
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/connect/esim")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${isActive("/dashboard/connect/esim") ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                  >
                    eSIM
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/connect/sms")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${isActive("/dashboard/connect/sms") ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                  >
                    SMS/WhatsApp API
                  </button>
                </div>
              )}
            </div>

            {/* Sistema de Tickets (GLPI) */}
            <div>
              <button
                onClick={() => setTicketsOpen(!ticketsOpen)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5a2 2 0 00-2 2v3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
                <span className="font-medium">Sistema de Tickets</span>
                {ticketsOpen ? (
                  <ChevronDown className="w-4 h-4 ml-auto" />
                ) : (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>

              {ticketsOpen && (
                <div className="ml-6 mt-2 space-y-1 border-l border-slate-700 pl-3">
                  <button
                    onClick={() => router.push("/dashboard/tickets")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${isActive("/dashboard/tickets") ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                  >
                    Gestión de Tickets
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/tickets/calendar")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${isActive("/dashboard/tickets/calendar") ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                  >
                    Calendario
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/tickets/email")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${isActive("/dashboard/tickets/email") ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                  >
                    Gestión de Correos
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/tickets/knowledge-base")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${isActive("/dashboard/tickets/knowledge-base") ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                  >
                    Base de Conocimientos
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/tickets/reports")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${isActive("/dashboard/tickets/reports") ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                  >
                    Reportes y Estadísticas
                  </button>
                </div>
              )}
            </div>

            {/* Herramientas */}
            <div>
              <button
                onClick={() => setHerramientasOpen(!herramientasOpen)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.066z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-medium">Herramientas</span>
                {herramientasOpen ? (
                  <ChevronDown className="w-4 h-4 ml-auto" />
                ) : (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>

              {herramientasOpen && (
                <div className="ml-6 mt-2 space-y-1 border-l border-slate-700 pl-3">
                  <button
                    onClick={() => router.push("/dashboard/productos")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${isActive("/dashboard/productos") ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                  >
                    Gestión de Productos
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/financiero")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${isActive("/dashboard/financiero") ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                  >
                    Centro Financiero
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/plantillas")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${isActive("/dashboard/plantillas") ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                  >
                    Generador de Plantillas
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/integraciones")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${isActive("/dashboard/integraciones") ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                  >
                    Integraciones Cloud
                  </button>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setCotizadorOpen(!cotizadorOpen)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-medium">Sistema de Cotizaciones</span>
                {cotizadorOpen ? (
                  <ChevronDown className="w-4 h-4 ml-auto" />
                ) : (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>

              {cotizadorOpen && (
                <div className="ml-6 mt-2 space-y-1 border-l border-slate-700 pl-3">
                  <button
                    onClick={() => router.push("/dashboard/cotizador")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${isActive("/dashboard/cotizador") ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                  >
                    Dashboard Cotizaciones
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/cotizador/nueva")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${isActive("/dashboard/cotizador/nueva") ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                  >
                    Nueva Cotización
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/cotizador/listas-precios")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${isActive("/dashboard/cotizador/listas-precios") ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                  >
                    Listas de Precios
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/cotizador/impuestos")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${isActive("/dashboard/cotizador/impuestos") ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                  >
                    Configuración de Impuestos
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/cotizador/niveles-cliente")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${isActive("/dashboard/cotizador/niveles-cliente") ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                  >
                    Niveles de Cliente
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/cotizador/plantillas")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${isActive("/dashboard/cotizador/plantillas") ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                  >
                    Plantillas Personalizadas
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/cotizador/seguimiento")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${isActive("/dashboard/cotizador/seguimiento") ? "bg-cyan-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                  >
                    Seguimiento CRM
                  </button>
                </div>
              )}
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
                    onClick={() => router.push("/dashboard/intervenciones")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/intervenciones")
                        ? "bg-slate-800 text-slate-200"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Intervenciones Técnicas
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
        <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 px-8 py-4 flex justify-end">
          <UserMenu />
        </div>
        {children}
        <CasandraWidget />
      </main>
    </div>
  )
}
