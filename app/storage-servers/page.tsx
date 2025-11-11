"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { HardDrive, Check, Database, Shield } from "lucide-react"

export default function StorageServersPage() {
  const storageServers = [
    {
      name: "RISE-STOR",
      cpu: "AMD Ryzen 7 Pro 3700",
      storage: "4x14TB hasta 6x14TB",
      capacity: "56TB - 84TB",
      raid: "RAID 0/1/5/6/10",
      price: 183,
    },
    {
      name: "Advance-STOR 2024",
      cpu: "AMD EPYC 4344P",
      storage: "2x22TB hasta 8x22TB",
      capacity: "44TB - 176TB",
      raid: "RAID 0/1/5/6/10/50/60",
      price: 202,
      popular: true,
    },
    {
      name: "HGR-STOR-1",
      cpu: "Intel Xeon Gold 6554S",
      storage: "24x22TB hasta 36x22TB + 2x15.36TB SSD",
      capacity: "528TB - 792TB",
      raid: "RAID 0/1/5/6/10/50/60 + Caché SSD",
      price: 1340,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-6">
          <HardDrive className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold">Servidores de Almacenamiento</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Almacenamiento Masivo y Confiable
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Servidores optimizados para almacenamiento con hasta 792TB de capacidad, RAID avanzado y backups automáticos
        </p>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {storageServers.map((server) => (
            <Card
              key={server.name}
              className={`bg-slate-900 ${server.popular ? "border-2 border-cyan-500" : "border-slate-800"}`}
            >
              {server.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                  RECOMENDADO
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-white">{server.name}</CardTitle>
                <p className="text-cyan-400 font-semibold">{server.capacity} Total</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-slate-300">
                  <p>
                    <strong>CPU:</strong> {server.cpu}
                  </p>
                  <p>
                    <strong>Discos:</strong> {server.storage}
                  </p>
                  <p>
                    <strong>RAID:</strong> {server.raid}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">${server.price}</span>
                    <span className="text-slate-400">/mes</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${server.popular ? "bg-cyan-500 hover:bg-cyan-600" : "bg-slate-800 hover:bg-slate-700"} text-white`}
                >
                  Configurar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 bg-slate-950/50">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Database className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Casos de Uso</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Backups y archivos
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Media servers
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Bases de datos
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Almacenamiento objeto
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Shield className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Redundancia</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> RAID por hardware
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Hot-swap disks
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Backups automáticos
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Monitoreo 24/7
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <HardDrive className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Rendimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Discos enterprise 7200 RPM
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Caché SSD opcional
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> 10 Gbps de red
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Latencia &lt; 5ms
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
