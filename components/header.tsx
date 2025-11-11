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
            <button className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors text-base font-medium">
              <span>Bare Metal & VPS</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-2 w-56 bg-[#0f1419] border border-[#1a1f2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link
                href="/vps"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors first:rounded-t-lg"
              >
                VPS
              </Link>
              <Link
                href="/bare-metal"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                Bare Metal
              </Link>
              <Link
                href="/clusters"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                Clusters
              </Link>
              <Link
                href="/calculadora"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors last:rounded-b-lg"
              >
                Calculadora de VPS
              </Link>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors text-base font-medium whitespace-nowrap">
              <span>Dominios, Hosting y Email</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-2 w-72 bg-[#0f1419] border border-[#1a1f2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 max-h-[80vh] overflow-y-auto">
              {/* Dominio Web */}
              <div className="px-4 py-2 bg-cyan-950/30 border-b border-cyan-500/30">
                <p className="text-cyan-400 font-bold text-sm">Dominio Web</p>
              </div>
              <Link
                href="/domains/search"
                className="block px-4 py-2.5 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors text-sm"
              >
                Busque su dominio
              </Link>
              <Link
                href="/domains/renew"
                className="block px-4 py-2.5 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors text-sm"
              >
                Renueve su dominio
              </Link>
              <Link
                href="/domains/aftermarket"
                className="block px-4 py-2.5 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors text-sm"
              >
                Mercado secundario (aftermarket)
              </Link>

              {/* Hosting */}
              <div className="px-4 py-2 bg-cyan-950/30 border-b border-cyan-500/30 border-t border-cyan-500/30 mt-1">
                <p className="text-cyan-400 font-bold text-sm">Hosting</p>
              </div>
              <Link
                href="/hosting/packages"
                className="block px-4 py-2.5 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors text-sm"
              >
                Todos los packs Web
              </Link>
              <Link
                href="/hosting/databases"
                className="block px-4 py-2.5 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors text-sm"
              >
                Bases de datos adicionales
              </Link>
              <Link
                href="/hosting/ssl"
                className="block px-4 py-2.5 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors text-sm"
              >
                Opción SSL
              </Link>
              <Link
                href="/hosting/cdn"
                className="block px-4 py-2.5 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors text-sm"
              >
                Opción CDN
              </Link>

              {/* Acceso rápido */}
              <div className="px-4 py-2 bg-cyan-950/30 border-b border-cyan-500/30 border-t border-cyan-500/30 mt-1">
                <p className="text-cyan-400 font-bold text-sm">Acceso rápido</p>
              </div>
              <Link
                href="/domains/pricing"
                className="block px-4 py-2.5 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors text-sm"
              >
                Precios de los dominios
              </Link>
              <Link
                href="/domains/whois"
                className="block px-4 py-2.5 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors text-sm"
              >
                Whois: buscar información de un dominio
              </Link>
              <Link
                href="/domains/dns"
                className="block px-4 py-2.5 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors text-sm"
              >
                Servidor DNS
              </Link>
              <Link
                href="/hosting/how-to-create"
                className="block px-4 py-2.5 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors text-sm"
              >
                ¿Cómo crear un sitio web?
              </Link>
              <Link
                href="/hosting/wordpress"
                className="block px-4 py-2.5 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors text-sm"
              >
                Aloje su sitio web WordPress
              </Link>
              <Link
                href="/hosting/one-click"
                className="block px-4 py-2.5 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors text-sm last:rounded-b-lg"
              >
                Cree su sitio web en un clic
              </Link>
            </div>
          </div>

          <Link
            href="/nube-publica"
            className="text-slate-300 hover:text-cyan-400 transition-colors text-base font-medium whitespace-nowrap"
          >
            Nube Pública
          </Link>

          <Link
            href="/nube-privada"
            className="text-slate-300 hover:text-cyan-400 transition-colors text-base font-medium whitespace-nowrap"
          >
            Nube Privada Alojada
          </Link>

          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors text-base font-medium">
              <span>{currency}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 mt-2 w-32 bg-[#0f1419] border border-[#1a1f2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <button
                onClick={() => setCurrency("USD")}
                className="w-full px-4 py-2 text-left text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors first:rounded-t-lg"
              >
                USD $
              </button>
              <button
                onClick={() => setCurrency("EUR")}
                className="w-full px-4 py-2 text-left text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                EUR €
              </button>
              <button
                onClick={() => setCurrency("MXN")}
                className="w-full px-4 py-2 text-left text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors last:rounded-b-lg"
              >
                MXN $
              </button>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-lg">{language === "ES" ? "🇪🇸" : "🇺🇸"}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-[#0f1419] border border-[#1a1f2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <button
                onClick={() => setLanguage("ES")}
                className="w-full px-4 py-2 text-left text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors flex items-center gap-2 first:rounded-t-lg"
              >
                <span className="text-lg">🇪🇸</span>
                <span>Español</span>
              </button>
              <button
                onClick={() => setLanguage("EN")}
                className="w-full px-4 py-2 text-left text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors flex items-center gap-2 last:rounded-b-lg"
              >
                <span className="text-lg">🇺🇸</span>
                <span>English</span>
              </button>
            </div>
          </div>

          <Button
            asChild
            variant="outline"
            className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white bg-transparent"
          >
            <a href="/contacto">REGISTRAR</a>
          </Button>

          <Button asChild variant="default" className="bg-cyan-500 hover:bg-cyan-600 text-white ml-2">
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
              Clusters
            </Link>
            <Link
              href="/calculadora"
              className="text-slate-300 hover:text-cyan-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Calculadora de VPS
            </Link>
            <Link
              href="/dominios"
              className="text-slate-300 hover:text-cyan-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dominios, Hosting y Email
            </Link>
            <Link
              href="/nube-publica"
              className="text-slate-300 hover:text-cyan-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nube Pública
            </Link>
            <Link
              href="/nube-privada"
              className="text-slate-300 hover:text-cyan-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nube Privada Alojada
            </Link>
            <Button
              asChild
              variant="outline"
              className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white bg-transparent w-full"
            >
              <a href="/contacto" onClick={() => setIsMobileMenuOpen(false)}>
                REGISTRAR
              </a>
            </Button>
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
