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

        <div className="hidden lg:flex items-center gap-8">
          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
              <span>Bare Metal & VPS</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-2 w-56 bg-[#0f1419] border border-[#1a1f2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link
                href="/vps"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors first:rounded-t-lg text-sm"
              >
                VPS
              </Link>
              <Link
                href="/bare-metal"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors text-sm"
              >
                Bare Metal
              </Link>
              <Link
                href="/clusters"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors text-sm"
              >
                Clusters
              </Link>
              <Link
                href="/calculadora"
                className="block px-4 py-3 text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors last:rounded-b-lg text-sm"
              >
                Calculadora de VPS
              </Link>
            </div>
          </div>

          <Link
            href="/dominios"
            className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium whitespace-nowrap"
          >
            Dominios, Hosting y Email
          </Link>

          <Link
            href="/nube-publica"
            className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium whitespace-nowrap"
          >
            Nube Pública
          </Link>

          <Link
            href="/nube-privada"
            className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium whitespace-nowrap"
          >
            Nube Privada Alojada
          </Link>

          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
              <span>{currency}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 mt-2 w-32 bg-[#0f1419] border border-[#1a1f2e] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <button
                onClick={() => setCurrency("USD")}
                className="w-full px-4 py-2 text-left text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors first:rounded-t-lg text-sm"
              >
                USD $
              </button>
              <button
                onClick={() => setCurrency("EUR")}
                className="w-full px-4 py-2 text-left text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors text-sm"
              >
                EUR €
              </button>
              <button
                onClick={() => setCurrency("MXN")}
                className="w-full px-4 py-2 text-left text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors last:rounded-b-lg text-sm"
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
                className="w-full px-4 py-2 text-left text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors flex items-center gap-2 first:rounded-t-lg text-sm"
              >
                <span className="text-lg">🇪🇸</span>
                <span>Español</span>
              </button>
              <button
                onClick={() => setLanguage("EN")}
                className="w-full px-4 py-2 text-left text-slate-300 hover:bg-[#1a1f2e] hover:text-cyan-400 transition-colors flex items-center gap-2 last:rounded-b-lg text-sm"
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
            <Link href="/login">INGRESAR</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
