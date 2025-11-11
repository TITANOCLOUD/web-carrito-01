"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Save, Plus } from "lucide-react"

export default function ImpuestosPage() {
  const [zonas, setZonas] = useState([
    { id: 1, pais: "Colombia", iva: 16, retencion: 0, aplicaRetencion: false },
    { id: 2, pais: "México", iva: 16, retencion: 0, aplicaRetencion: false },
    { id: 3, pais: "Perú", iva: 18, retencion: 0, aplicaRetencion: false },
    { id: 4, pais: "Argentina", iva: 21, retencion: 0, aplicaRetencion: false },
    { id: 5, pais: "Estados Unidos", iva: 0, retencion: 0, aplicaRetencion: false },
    { id: 6, pais: "Canadá", iva: 0, retencion: 0, aplicaRetencion: false },
    { id: 7, pais: "Guatemala", iva: 12, retencion: 0, aplicaRetencion: false },
  ])

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Configuración de Impuestos</h1>
            <p className="text-slate-400">Define impuestos y retenciones por zona geográfica</p>
          </div>
          <Button className="bg-cyan-600 hover:bg-cyan-700">
            <Plus className="w-4 h-4 mr-2" />
            Agregar Zona
          </Button>
        </div>

        <Card className="bg-slate-900 border-slate-800 p-6 mb-6">
          <h3 className="text-white font-semibold mb-4">Fórmulas de Cálculo</h3>
          <div className="space-y-3 bg-slate-800 p-4 rounded-lg">
            <div className="text-slate-300">
              <span className="text-cyan-400 font-mono">Subtotal</span> = Precio × Cantidad × (1 - Descuento%)
            </div>
            <div className="text-slate-300">
              <span className="text-cyan-400 font-mono">IVA</span> = Subtotal × (IVA% / 100)
            </div>
            <div className="text-slate-300">
              <span className="text-cyan-400 font-mono">Retención</span> = Subtotal × (Retención% / 100)
            </div>
            <div className="text-slate-300 font-semibold border-t border-slate-700 pt-3 mt-3">
              <span className="text-green-400 font-mono">Total</span> = Subtotal + IVA - Retención
            </div>
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left p-4 text-slate-400 font-medium">País/Zona</th>
                  <th className="text-center p-4 text-slate-400 font-medium">IVA (%)</th>
                  <th className="text-center p-4 text-slate-400 font-medium">Retención (%)</th>
                  <th className="text-center p-4 text-slate-400 font-medium">Aplica Retención</th>
                  <th className="text-center p-4 text-slate-400 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {zonas.map((zona) => (
                  <tr key={zona.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="p-4">
                      <Input
                        value={zona.pais}
                        className="bg-slate-800 border-slate-700 text-white"
                        onChange={(e) => {
                          const newZonas = [...zonas]
                          const index = newZonas.findIndex((z) => z.id === zona.id)
                          newZonas[index].pais = e.target.value
                          setZonas(newZonas)
                        }}
                      />
                    </td>
                    <td className="p-4">
                      <Input
                        type="number"
                        value={zona.iva}
                        className="bg-slate-800 border-slate-700 text-white text-center"
                        onChange={(e) => {
                          const newZonas = [...zonas]
                          const index = newZonas.findIndex((z) => z.id === zona.id)
                          newZonas[index].iva = Number.parseFloat(e.target.value)
                          setZonas(newZonas)
                        }}
                      />
                    </td>
                    <td className="p-4">
                      <Input
                        type="number"
                        value={zona.retencion}
                        className="bg-slate-800 border-slate-700 text-white text-center"
                        onChange={(e) => {
                          const newZonas = [...zonas]
                          const index = newZonas.findIndex((z) => z.id === zona.id)
                          newZonas[index].retencion = Number.parseFloat(e.target.value)
                          setZonas(newZonas)
                        }}
                      />
                    </td>
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={zona.aplicaRetencion}
                        className="w-5 h-5 rounded bg-slate-800 border-slate-700"
                        onChange={(e) => {
                          const newZonas = [...zonas]
                          const index = newZonas.findIndex((z) => z.id === zona.id)
                          newZonas[index].aplicaRetencion = e.target.checked
                          setZonas(newZonas)
                        }}
                      />
                    </td>
                    <td className="p-4 text-center">
                      <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                        <Save className="w-3 h-3 mr-1" />
                        Guardar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
