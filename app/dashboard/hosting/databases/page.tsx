"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Plus, Server, Gauge } from "lucide-react"

export default function DatabasesPage() {
  const plans = [
    { name: "Start SQL", storage: "250 MB", price: 2.99, connections: 10 },
    { name: "Basic SQL", storage: "500 MB", price: 4.99, connections: 25 },
    { name: "Pro SQL", storage: "1 GB", price: 7.99, connections: 50 },
    { name: "Business SQL", storage: "2 GB", price: 12.99, connections: 100 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Bases de datos adicionales</h1>
        <p className="text-slate-400">Aumenta el rendimiento y facilita la gestión de tu alojamiento</p>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Database className="w-6 h-6" />
            Web Cloud Databases
          </CardTitle>
          <CardDescription>
            Elige un servidor de bases de datos SQL o NoSQL totalmente administrado y seguro. Reagrupa todas tus bases
            de datos en un mismo servicio y adapta los recursos al ritmo de tu crecimiento.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, idx) => (
          <Card key={idx} className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="p-3 bg-cyan-500/20 rounded-lg w-fit mb-2">
                <Server className="w-6 h-6 text-cyan-400" />
              </div>
              <CardTitle className="text-white">{plan.name}</CardTitle>
              <div className="pt-2">
                <div className="text-3xl font-bold text-cyan-400">${plan.price}</div>
                <div className="text-slate-400">/mes</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Almacenamiento</span>
                  <span className="text-white font-medium">{plan.storage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Conexiones</span>
                  <span className="text-white font-medium">{plan.connections}</span>
                </div>
              </div>
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                <Plus className="w-4 h-4 mr-2" />
                Agregar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-cyan-900/20 to-slate-800/50 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Gauge className="w-6 h-6 text-cyan-400" />
            Características principales
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-white">Compatibilidad</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• MySQL 5.7 y 8.0</li>
              <li>• PostgreSQL</li>
              <li>• Redis</li>
              <li>• MongoDB</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-white">Características</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Backups automáticos</li>
              <li>• Alta disponibilidad</li>
              <li>• Cifrado de datos</li>
              <li>• Soporte 24/7</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
