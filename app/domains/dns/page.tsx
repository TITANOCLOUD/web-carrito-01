"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Network, Shield, Zap, Globe } from "lucide-react"

export default function DNSPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-6">
          <Network className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold">Servidores DNS</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          DNS Administrado
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Gestiona tus registros DNS con nuestra infraestructura global de alta disponibilidad
        </p>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Zap className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Resolución Rápida</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-400">
              Anycast DNS para respuestas ultrarrápidas desde el servidor más cercano
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Shield className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Protección DDoS</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-400">Protección incluida contra ataques DDoS a nivel DNS</CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Globe className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Red Global</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-400">
              Servidores DNS en múltiples continentes para máxima disponibilidad
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 text-center">
        <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
          Configurar DNS
        </Button>
      </section>
    </div>
  )
}
