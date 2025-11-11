"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Upload } from "lucide-react"

export default function ListasPreciosPage() {
  const [selectedCompany, setSelectedCompany] = useState("inbu")

  const companies = [
    { id: "inbu", name: "INBU", productos: 45 },
    { id: "integra", name: "INTEGRA", productos: 38, parent: "INBU", descuento: 15 },
    { id: "telstra", name: "TELSTRA", productos: 42 },
  ]

  const productos = [
    {
      ref: "INFRACLOUD",
      nombre: "INFRAESTRUCTURA CLOUD PERSONALIZADA",
      descripcion: "AMD EPYC 4345P - 8C/16T, 128GB DDR5, 4× 1.92TB SSD NVME",
      precio: 25500.0,
      zona: "Singapur",
    },
    {
      ref: "MTTOCOLOSSAL",
      nombre: "MANTENIMIENTO MENSUAL SERVIDORES VIRTUALES - COLOSSAL",
      descripcion: "Incluye correcto funcionamiento del sistema operativo, seguridad, atención 24/7",
      precio: 10000.0,
      zona: "Global",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Listas de Precios por Compañía</h1>
            <p className="text-slate-400">Cada empresa gestiona sus propios precios para sus clientes</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-slate-700 text-slate-300 bg-transparent">
              <Upload className="w-4 h-4 mr-2" />
              Importar CSV
            </Button>
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Producto
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Companies Sidebar */}
          <Card className="bg-slate-900 border-slate-800 p-4 h-fit">
            <h3 className="text-white font-semibold mb-4">Compañías</h3>
            <div className="space-y-2">
              {companies.map((company) => (
                <button
                  key={company.id}
                  onClick={() => setSelectedCompany(company.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedCompany === company.id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <div className="font-medium">{company.name}</div>
                  <div className="text-sm opacity-75">{company.productos} productos</div>
                  {company.parent && (
                    <div className="text-xs mt-1 opacity-60">
                      Partner de {company.parent} ({company.descuento}% dto)
                    </div>
                  )}
                </button>
              ))}
            </div>
          </Card>

          {/* Products List */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="bg-slate-900 border-slate-800 p-6">
              <div className="flex items-center gap-4 mb-6">
                <Input placeholder="Buscar productos..." className="bg-slate-800 border-slate-700 text-white" />
                <Button variant="outline" className="border-slate-700 text-slate-300 bg-transparent">
                  Filtrar
                </Button>
              </div>

              <div className="space-y-4">
                {productos.map((producto) => (
                  <Card key={producto.ref} className="bg-slate-800 border-slate-700 p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-cyan-400 font-mono text-sm">{producto.ref}</span>
                          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-xs">
                            {producto.zona}
                          </span>
                        </div>
                        <h4 className="text-white font-semibold mb-1">{producto.nombre}</h4>
                        <p className="text-slate-400 text-sm">{producto.descripcion}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white mb-2">
                          ${producto.precio.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-600 text-slate-300 bg-transparent"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-900 text-red-400 hover:bg-red-950 bg-transparent"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
