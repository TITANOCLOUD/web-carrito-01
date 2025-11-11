"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Server, Shield, Zap, HardDrive } from "lucide-react"

export default function ServidoresDedicadosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-6">
          <Server className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold">Servidores Dedicados</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Potencia Dedicada para tu Negocio
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Servidores físicos completos dedicados exclusivamente a tu proyecto con máximo rendimiento y control total
        </p>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Shield className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Seguridad Total</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300">
              Hardware dedicado sin compartir recursos con otros usuarios, máxima seguridad y privacidad
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Zap className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Alto Rendimiento</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300">
              Recursos garantizados sin vecinos ruidosos, rendimiento consistente y predecible
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <HardDrive className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Control Completo</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300">
              Acceso root completo, personalización total del hardware y software
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 text-center">
        <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
          Ver Configuraciones Disponibles
        </Button>
      </section>
    </div>
  )
}
