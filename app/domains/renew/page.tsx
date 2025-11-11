"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Globe, Search } from "lucide-react"
import { useState } from "react"

export default function RenewDomainPage() {
  const [domain, setDomain] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-6">
          <Globe className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold">Renovación de Dominios</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Renueva tu Dominio
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Mantén tu presencia online activa renovando tu dominio antes de que expire
        </p>
      </section>

      <section className="container mx-auto px-4 py-20">
        <Card className="bg-slate-900 border-slate-800 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Buscar Dominio para Renovar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="ejemplo.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="flex-1 bg-slate-950 border-slate-700 text-white"
              />
              <Button className="bg-cyan-500 hover:bg-cyan-600">
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
            </div>
            <p className="text-slate-400 text-sm mt-4">
              Ingresa el dominio que deseas renovar. Te mostraremos el precio y opciones de renovación disponibles.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
