"use client"

import { useState } from "react"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { ChevronDown, Globe } from "lucide-react"

export function Header() {
  const [currency, setCurrency] = useState("USD")
  const [language, setLanguage] = useState("ES")

  return (
    <nav className="border-b border-[#1a1f2e] bg-[#0a0e1a] sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Logo className="h-20" />
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors">
              <span>Bare Metal & VPS</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-[#0f1419] border border-[#1a1f2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link
                href="/vps"
                className="block px-4 py-2 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors first:rounded-t-lg"
              >
                VPS
              </Link>
              <Link
                href="/bare-metal"
                className="block px-4 py-2 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                Bare Metal
              </Link>
              <Link
                href="/clusters"
                className="block px-4 py-2 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors"
              >
                Clusters
              </Link>
              <Link
                href="/calculadora"
                className="block px-4 py-2 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors last:rounded-b-lg"
              >
                Calculadora de VPS
              </Link>
            </div>
          </div>

          <Link href="/dominios" className="text-slate-300 hover:text-cyan-400 transition-colors">
            Dominios, Hosting y Email
          </Link>

          <Link href="/nube-publica" className="text-slate-300 hover:text-cyan-400 transition-colors">
            Nube Pública
          </Link>

          <Link href="/nube-privada" className="text-slate-300 hover:text-cyan-400 transition-colors">
            Nube Privada Alojada
          </Link>

          <Link href="/soluciones" className="text-slate-300 hover:text-cyan-400 transition-colors">
            Soluciones
          </Link>

          <Link href="/ecosistema" className="text-slate-300 hover:text-cyan-400 transition-colors">
            Ecosistema
          </Link>

          <Link href="/acerca-de" className="text-slate-300 hover:text-cyan-400 transition-colors">
            Acerca de
          </Link>

          <Link href="/detector" className="text-slate-300 hover:text-cyan-400 transition-colors">
            Detector de Caídas
          </Link>

          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors">
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
              <Globe className="w-5 h-5" />
              <span className="text-xl">{language === "ES" ? "🇪🇸" : "🇺🇸"}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-[#0f1419] border border-[#1a1f2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <button
                onClick={() => setLanguage("ES")}
                className="w-full px-4 py-2 text-left text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors flex items-center gap-2 first:rounded-t-lg"
              >
                <span className="text-xl">🇪🇸</span>
                <span>Español</span>
              </button>
              <button
                onClick={() => setLanguage("EN")}
                className="w-full px-4 py-2 text-left text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors flex items-center gap-2 last:rounded-b-lg"
              >
                <span className="text-xl">🇺🇸</span>
                <span>English</span>
              </button>
            </div>
          </div>

          <Button
            asChild
            variant="outline"
            className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white bg-transparent"
          >
            <Link href="/login">INGRESAR</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
