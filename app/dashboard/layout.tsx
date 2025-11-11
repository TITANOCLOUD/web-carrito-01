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
} from "lucide-react"
import Image from "next/image"
import { CasandraWidget } from "@/components/casandra-widget"

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
                    onClick={() => router.push("/dashboard/private-cloud/vmware")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/private-cloud/vmware")
                        ? "bg-cyan-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    VMware on OVHcloud
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/private-cloud/vcf")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/private-cloud/vcf")
                        ? "bg-cyan-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    Public VCF as a Service
                  </button>
                  <button
                    onClick={() => router.push("/dashboard/private-cloud/vsphere")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/private-cloud/vsphere")
                        ? "bg-cyan-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    Managed VMware vSphere
                  </button>
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
                <div className="ml-6 mt-2 space-y-3 border-l border-slate-700 pl-3">
                  <div>
                    <button
                      onClick={() => setDomainWebOpen(!domainWebOpen)}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-slate-400 hover:text-white text-sm font-medium"
                    >
                      <ChevronRight className={`w-3 h-3 transition-transform ${domainWebOpen ? "rotate-90" : ""}`} />
                      <span>Dominio Web</span>
                    </button>
                    {domainWebOpen && (
                      <div className="ml-4 mt-1 space-y-1">
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
                          Mercado secundario (aftermarket)
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      onClick={() => setHostingPacksOpen(!hostingPacksOpen)}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-slate-400 hover:text-white text-sm font-medium"
                    >
                      <ChevronRight className={`w-3 h-3 transition-transform ${hostingPacksOpen ? "rotate-90" : ""}`} />
                      <span>Hosting</span>
                    </button>
                    {hostingPacksOpen && (
                      <div className="ml-4 mt-1 space-y-1">
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
                    )}
                  </div>

                  <div>
                    <button
                      onClick={() => setQuickAccessOpen(!quickAccessOpen)}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-slate-400 hover:text-white text-sm font-medium"
                    >
                      <ChevronRight className={`w-3 h-3 transition-transform ${quickAccessOpen ? "rotate-90" : ""}`} />
                      <span>Acceso rápido</span>
                    </button>
                    {quickAccessOpen && (
                      <div className="ml-4 mt-1 space-y-1">
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
                    )}
                  </div>

                  <button
                    onClick={() => router.push("/dashboard/email/management")}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      isActive("/dashboard/email/management")
                        ? "bg-cyan-600 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    Email
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
