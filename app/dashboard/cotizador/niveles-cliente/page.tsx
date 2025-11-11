"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Crown, Award, Medal, Star } from "lucide-react"

export default function NivelesClientePage() {
  const niveles = [
    {
      nombre: "Bronce",
      descuento: 5,
      icon: Medal,
      color: "orange",
      bgColor: "bg-orange-500/20",
      textColor: "text-orange-300",
      descripcion: "Cliente básico con descuento inicial",
    },
    {
      nombre: "Silver",
      descuento: 10,
      icon: Star,
      color: "slate",
      bgColor: "bg-slate-500/20",
      textColor: "text-slate-300",
      descripcion: "Cliente frecuente con mejores beneficios",
    },
    {
      nombre: "Gold",
      descuento: 15,
      icon: Award,
      color: "yellow",
      bgColor: "bg-yellow-500/20",
      textColor: "text-yellow-300",
      descripcion: "Cliente premium con descuentos preferentes",
    },
    {
      nombre: "Platinum",
      descuento: 20,
      icon: Crown,
      color: "purple",
      bgColor: "bg-purple-500/20",
      textColor: "text-purple-300",
      descripcion: "Cliente VIP con máximo descuento",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Niveles de Cliente</h1>
          <p className="text-slate-400">Configura descuentos por nivel y hitos comerciales</p>
        </div>

        <Card className="bg-slate-900 border-slate-800 p-6 mb-8">
          <h3 className="text-white font-semibold mb-4">Sistema de Partners</h3>
          <p className="text-slate-400 mb-4">
            Los partners reciben descuentos adicionales sobre los precios base. Ejemplo: INTEGRA es partner de INBU con
            15% de descuento. Los clientes de INTEGRA ven los precios con el descuento de partner aplicado, y luego se
            aplica su nivel de cliente (Bronce, Silver, Gold, Platinum).
          </p>
          <div className="bg-slate-800 p-4 rounded-lg">
            <div className="text-slate-300 font-mono text-sm space-y-2">
              <div>
                <span className="text-cyan-400">Precio Base INBU:</span> $1,000
              </div>
              <div>
                <span className="text-cyan-400">Descuento Partner (15%):</span> -$150 = $850
              </div>
              <div>
                <span className="text-cyan-400">Descuento Cliente Gold (15%):</span> -$127.50 ={" "}
                <span className="text-green-400 font-bold">$722.50</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {niveles.map((nivel) => {
            const Icon = nivel.icon
            return (
              <Card key={nivel.nombre} className={`bg-slate-900 border-slate-800 p-6 ${nivel.bgColor} border-2`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${nivel.bgColor}`}>
                      <Icon className={`w-6 h-6 ${nivel.textColor}`} />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${nivel.textColor}`}>{nivel.nombre}</h3>
                      <p className="text-slate-400 text-sm">{nivel.descripcion}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-slate-400 text-sm mb-2 block">Descuento (%)</label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        value={nivel.descuento}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                      <span className={`text-2xl font-bold ${nivel.textColor}`}>{nivel.descuento}%</span>
                    </div>
                  </div>

                  <div className="bg-slate-800 p-3 rounded-lg">
                    <div className="text-sm text-slate-400 mb-1">Ejemplo de ahorro</div>
                    <div className="text-slate-300">
                      <span className="line-through">$1,000</span>
                      {" → "}
                      <span className="text-green-400 font-bold">
                        ${(1000 * (1 - nivel.descuento / 100)).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Actualizar Nivel</Button>
                </div>
              </Card>
            )
          })}
        </div>

        <Card className="bg-slate-900 border-slate-800 p-6 mt-8">
          <h3 className="text-white font-semibold mb-4">Asignación de Clientes por Nivel</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left p-3 text-slate-400 font-medium">Cliente</th>
                  <th className="text-left p-3 text-slate-400 font-medium">Compañía</th>
                  <th className="text-center p-3 text-slate-400 font-medium">Nivel Actual</th>
                  <th className="text-center p-3 text-slate-400 font-medium">Descuento</th>
                  <th className="text-center p-3 text-slate-400 font-medium">Cambiar Nivel</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-800 hover:bg-slate-800/50">
                  <td className="p-3 text-white">TELSTRA SAB DE CV</td>
                  <td className="p-3 text-slate-300">INBU</td>
                  <td className="p-3 text-center">
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">Gold</span>
                  </td>
                  <td className="p-3 text-center text-green-400 font-medium">15%</td>
                  <td className="p-3 text-center">
                    <select className="bg-slate-800 border-slate-700 text-white rounded px-3 py-1">
                      <option>Bronce</option>
                      <option>Silver</option>
                      <option selected>Gold</option>
                      <option>Platinum</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
