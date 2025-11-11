"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Zap, Check } from "lucide-react"

export default function OneClickPage() {
  const apps = [
    {
      name: "WordPress",
      description: "El CMS más popular del mundo",
      features: ["Blog incluido", "Miles de temas", "Plugins infinitos"],
    },
    {
      name: "PrestaShop",
      description: "E-commerce profesional",
      features: ["Tienda online", "Gestión productos", "Pasarelas pago"],
    },
    {
      name: "Nextcloud",
      description: "Tu nube privada",
      features: ["Archivos", "Calendario", "Contactos"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-6">
          <Zap className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold">Instalación en Un Clic</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Aplicaciones Listas para Usar
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Instala aplicaciones populares en segundos sin conocimientos técnicos
        </p>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {apps.map((app) => (
            <Card key={app.name} className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">{app.name}</CardTitle>
                <p className="text-slate-400">{app.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {app.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-slate-300">
                      <Check className="w-4 h-4 text-cyan-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600">Instalar Ahora</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
