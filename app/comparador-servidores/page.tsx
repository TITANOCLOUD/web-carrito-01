"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X, Server } from "lucide-react"

export default function ComparadorServidoresPage() {
  const comparison = [
    { feature: "CPU", vps: "Compartida", dedicado: "Exclusiva", baremental: "Exclusiva" },
    { feature: "RAM", vps: "Compartida", dedicado: "Exclusiva", baremental: "Exclusiva" },
    { feature: "Almacenamiento", vps: "SSD Compartido", dedicado: "SSD Dedicado", baremental: "NVMe Dedicado" },
    { feature: "Red", vps: "1 Gbps", dedicado: "1-10 Gbps", baremental: "10-100 Gbps" },
    { feature: "Virtualización", vps: true, dedicado: false, baremental: false },
    { feature: "Control Total", vps: false, dedicado: true, baremental: true },
    { feature: "Rendimiento", vps: "Bueno", dedicado: "Excelente", baremental: "Máximo" },
    { feature: "Precio desde", vps: "$4.20/mes", dedicado: "$61/mes", baremental: "$61/mes" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-6">
          <Server className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold">Comparador de Servidores</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          VPS vs Dedicado vs Bare Metal
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Compara características y encuentra el servidor perfecto para tu proyecto
        </p>
      </section>

      <section className="container mx-auto px-4 py-20">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">Comparación Detallada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left p-4 text-slate-400">Característica</th>
                    <th className="text-center p-4 text-cyan-400">VPS</th>
                    <th className="text-center p-4 text-blue-400">Dedicado</th>
                    <th className="text-center p-4 text-purple-400">Bare Metal</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={i} className="border-b border-slate-800">
                      <td className="p-4 text-white font-semibold">{row.feature}</td>
                      <td className="p-4 text-center text-slate-300">
                        {typeof row.vps === "boolean" ? (
                          row.vps ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-red-500 mx-auto" />
                          )
                        ) : (
                          row.vps
                        )}
                      </td>
                      <td className="p-4 text-center text-slate-300">
                        {typeof row.dedicado === "boolean" ? (
                          row.dedicado ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-red-500 mx-auto" />
                          )
                        ) : (
                          row.dedicado
                        )}
                      </td>
                      <td className="p-4 text-center text-slate-300">
                        {typeof row.baremental === "boolean" ? (
                          row.baremental ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-red-500 mx-auto" />
                          )
                        ) : (
                          row.baremental
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-8">¿Necesitas ayuda para elegir?</h2>
        <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
          Hablar con un Experto
        </Button>
      </section>
    </div>
  )
}
