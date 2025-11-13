"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { ChevronDown, Globe, Menu, X } from "lucide-react"

export function Header() {
  const [currency, setCurrency] = useState("USD")
  const [language, setLanguage] = useState("ES")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`border-b border-[#1a1f2e] bg-[#0a0e1a] sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "py-3" : "py-8"}`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <Logo className={`transition-all duration-300 ${isScrolled ? "h-16 my-1" : "h-24 my-2"}`} />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
              <span>Bare Metal & VPS</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-2 w-72 bg-[#0f1419] border border-[#1a1f2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link
                href="/vps"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors first:rounded-t-lg"
              >
                <div className="font-medium text-sm">VPS</div>
                <div className="text-xs text-slate-500">Servidores virtuales flexibles</div>
              </Link>
              <Link
                href="/bare-metal"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">Bare Metal</div>
                <div className="text-xs text-slate-500">Servidores físicos dedicados</div>
              </Link>
              <Link
                href="/servidores-dedicados"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">Servidores Dedicados</div>
                <div className="text-xs text-slate-500">Máxima potencia y control</div>
              </Link>
              <Link
                href="/clusters"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">Clusters de Servidores</div>
                <div className="text-xs text-slate-500">Alta disponibilidad garantizada</div>
              </Link>
              <Link
                href="/gpu-servers"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">Servidores GPU</div>
                <div className="text-xs text-slate-500">Potencia para AI y rendering</div>
              </Link>
              <Link
                href="/storage-servers"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">Servidores de Almacenamiento</div>
                <div className="text-xs text-slate-500">Capacidad masiva de datos</div>
              </Link>
              <Link
                href="/calculadora"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">Calculadora de Configuración</div>
                <div className="text-xs text-slate-500">Estima costos y especificaciones</div>
              </Link>
              <Link
                href="/comparador-servidores"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors last:rounded-b-lg"
              >
                <div className="font-medium text-sm">Comparador de Servidores</div>
                <div className="text-xs text-slate-500">Encuentra tu mejor opción</div>
              </Link>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium whitespace-nowrap">
              <span>Nube Pública</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-2 w-72 bg-[#0f1419] border border-[#1a1f2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link
                href="/public-cloud"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors first:rounded-t-lg font-semibold border-b border-slate-700"
              >
                <div className="font-medium text-sm">Primeros Pasos Nube Pública</div>
                <div className="text-xs text-slate-500">Comienza tu viaje en la nube</div>
              </Link>
              <Link
                href="/public-cloud/compute"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">Compute</div>
                <div className="text-xs text-slate-500">Instancias y procesamiento</div>
              </Link>
              <Link
                href="/public-cloud/storage"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">Storage</div>
                <div className="text-xs text-slate-500">Almacenamiento escalable</div>
              </Link>
              <Link
                href="/public-cloud/network"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">Network</div>
                <div className="text-xs text-slate-500">Redes privadas y balanceo</div>
              </Link>
              <Link
                href="/public-cloud/containers"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">Containers</div>
                <div className="text-xs text-slate-500">Kubernetes y Docker</div>
              </Link>
              <Link
                href="/public-cloud/databases"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">Databases</div>
                <div className="text-xs text-slate-500">Bases de datos gestionadas</div>
              </Link>
              <Link
                href="/public-cloud/ai-ml"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">AI & Machine Learning</div>
                <div className="text-xs text-slate-500">Entrenamiento de modelos IA</div>
              </Link>
              <Link
                href="/public-cloud/analytics"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">Analytics</div>
                <div className="text-xs text-slate-500">Big Data y análisis</div>
              </Link>
              <Link
                href="/public-cloud/security"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors last:rounded-b-lg"
              >
                <div className="font-medium text-sm">Security</div>
                <div className="text-xs text-slate-500">Protección y cumplimiento</div>
              </Link>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
              <span>Dominios, Hosting y Email</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-2 w-72 bg-[#0f1419] border border-[#1a1f2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link
                href="/domains/search"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors first:rounded-t-lg"
              >
                <div className="font-medium text-sm">Buscar Dominio</div>
                <div className="text-xs text-slate-500">Registra tu dominio ideal</div>
              </Link>
              <Link
                href="/domains/renew"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">Renovar Dominio</div>
                <div className="text-xs text-slate-500">Mantén tu dominio activo</div>
              </Link>
              <Link
                href="/domains/aftermarket"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">Mercado Secundario</div>
                <div className="text-xs text-slate-500">Compra dominios premium</div>
              </Link>
              <Link
                href="/hosting/packages"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">Packs de Hosting</div>
                <div className="text-xs text-slate-500">Alojamiento web compartido</div>
              </Link>
              <Link
                href="/hosting/ssl"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">Certificados SSL</div>
                <div className="text-xs text-slate-500">Seguridad HTTPS garantizada</div>
              </Link>
              <Link
                href="/hosting/cdn"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">CDN</div>
                <div className="text-xs text-slate-500">Acelera tu sitio web</div>
              </Link>
              <Link
                href="/hosting/wordpress"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">WordPress Hosting</div>
                <div className="text-xs text-slate-500">Optimizado para WordPress</div>
              </Link>
              <Link
                href="/domains/whois"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors last:rounded-b-lg"
              >
                <div className="font-medium text-sm">Whois</div>
                <div className="text-xs text-slate-500">Consulta información de dominios</div>
              </Link>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
              <span>Nube Privada Alojada</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-2 w-72 bg-[#0f1419] border border-[#1a1f2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link
                href="/nube-privada"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors first:rounded-t-lg font-semibold"
              >
                <div className="font-medium text-sm">Descripción General</div>
                <div className="text-xs text-slate-500">Visión completa de la nube privada</div>
              </Link>
              <div className="border-t border-slate-700 my-1"></div>
              <Link
                href="/nube-privada/nutanix"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">Nutanix Cloud Platform</div>
                <div className="text-xs text-slate-500">Hiperconvergencia empresarial</div>
              </Link>
              <Link
                href="/nube-privada/sap-hana"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">SAP HANA on Cloud</div>
                <div className="text-xs text-slate-500">ERP en memoria de alto rendimiento</div>
              </Link>
              <Link
                href="/nube-privada/almacenamiento"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">Almacenamiento Enterprise</div>
                <div className="text-xs text-slate-500">Soluciones de storage crítico</div>
              </Link>
              <div className="border-t border-slate-700 my-1"></div>
              <Link
                href="/nube-privada/iam"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">Identity & Access Management</div>
                <div className="text-xs text-slate-500">Control de accesos centralizado</div>
              </Link>
              <Link
                href="/nube-privada/logs-platform"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors last:rounded-b-lg"
              >
                <div className="font-medium text-sm">Logs Data Platform</div>
                <div className="text-xs text-slate-500">Análisis de logs en tiempo real</div>
              </Link>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
              <span>Connect+</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-2 w-72 bg-[#0f1419] border border-[#1a1f2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link
                href="/connect/troncales"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors first:rounded-t-lg"
              >
                <div className="font-medium text-sm">Troncales SIP</div>
                <div className="text-xs text-slate-500">Comunicación VoIP empresarial</div>
              </Link>
              <Link
                href="/connect/ivr"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">IVR (Sistema de Respuesta)</div>
                <div className="text-xs text-slate-500">Menús automáticos inteligentes</div>
              </Link>
              <Link
                href="/connect/callcenter"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">Call Center</div>
                <div className="text-xs text-slate-500">Gestión de atención al cliente</div>
              </Link>
              <Link
                href="/connect/pbx"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">PBX Virtual</div>
                <div className="text-xs text-slate-500">Central telefónica en la nube</div>
              </Link>
              <Link
                href="/connect/esim"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                <div className="font-medium text-sm">eSIM Plataforma</div>
                <div className="text-xs text-slate-500">Conectividad móvil global</div>
              </Link>
              <Link
                href="/connect/sms"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors last:rounded-b-lg"
              >
                <div className="font-medium text-sm">SMS & WhatsApp API</div>
                <div className="text-xs text-slate-500">Mensajería masiva automatizada</div>
              </Link>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
              <span>{currency}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 mt-2 w-32 bg-[#0f1419] border border-[#1a1f2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <button
                onClick={() => setCurrency("USD")}
                className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors first:rounded-t-lg"
              >
                USD $
              </button>
              <button
                onClick={() => setCurrency("EUR")}
                className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                EUR €
              </button>
              <button
                onClick={() => setCurrency("MXN")}
                className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors last:rounded-b-lg"
              >
                MXN $
              </button>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-base">{language === "ES" ? "🇪🇸" : "🇺🇸"}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-[#0f1419] border border-[#1a1f2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <button
                onClick={() => setLanguage("ES")}
                className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors flex items-center gap-2 first:rounded-t-lg"
              >
                <span className="text-base">🇪🇸</span>
                <span>Español</span>
              </button>
              <button
                onClick={() => setLanguage("EN")}
                className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors flex items-center gap-2 last:rounded-b-lg"
              >
                <span className="text-base">🇺🇸</span>
                <span>English</span>
              </button>
            </div>
          </div>

          <Button asChild variant="default" className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm ml-2">
            <Link href="/login">INGRESAR</Link>
          </Button>
        </div>

        <button
          className="lg:hidden text-slate-300 hover:text-cyan-400"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#1a1f2e] bg-[#0f1419]">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/vps"
              className="text-slate-300 hover:text-cyan-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              VPS
            </Link>
            <Link
              href="/bare-metal"
              className="text-slate-300 hover:text-cyan-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Bare Metal
            </Link>
            <Link
              href="/clusters"
              className="text-slate-300 hover:text-cyan-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Clusters de Servidores
            </Link>
            <Link
              href="/calculadora"
              className="text-slate-300 hover:text-cyan-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Calculadora de Configuración
            </Link>
            <Link
              href="/dominios"
              className="text-slate-300 hover:text-cyan-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dominios, Hosting y Email
            </Link>
            <Link
              href="/nube-privada"
              className="text-slate-300 hover:text-cyan-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nube Privada Alojada
            </Link>
            <Link
              href="/connect"
              className="text-slate-300 hover:text-cyan-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Connect+
            </Link>
            <Button asChild variant="default" className="bg-cyan-500 hover:bg-cyan-600 text-white w-full mt-2">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                INGRESAR
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
