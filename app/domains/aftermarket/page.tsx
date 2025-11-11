"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { TrendingUp, Shield, Clock } from "lucide-react"

export default function AftermarketPage() {
  const premiumDomains = [
    { name: "tech.com", price: "$50,000", category: "Tecnología", views: 1234 },
    { name: "cloud.io", price: "$25,000", category: "Cloud", views: 890 },
    { name: "app.net", price: "$15,000", category: "Software", views: 567 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-6">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold">Mercado Secundario</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Dominios Premium
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Compra dominios exclusivos y premium ya registrados en nuestro mercado secundario
        </p>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {premiumDomains.map((domain) => (
            <Card key={domain.name} className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">{domain.name}</CardTitle>
                <p className="text-slate-400">{domain.category}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-cyan-400">{domain.price}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{domain.views} visitas</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600">Ver Detalles</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 bg-slate-950/50">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Shield className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Compra Segura</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-400">
              Sistema de custodia garantiza transferencia segura del dominio
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <TrendingUp className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Valoración Real</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-400">
              Precios basados en métricas de tráfico y valor de mercado
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Clock className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Transferencia Rápida</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-400">Proceso de transferencia completado en 24-48 horas</CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
