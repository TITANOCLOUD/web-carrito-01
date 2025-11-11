import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Edit, Copy, Download } from "lucide-react"

export default function PlantillasPage() {
  const plantillas = [
    { id: 1, nombre: "Proforma Básica", tipo: "proforma", campos: 8, uso: 45 },
    { id: 2, nombre: "Cotización Detallada", tipo: "cotizacion", campos: 12, uso: 32 },
    { id: 3, nombre: "Contrato de Servicio", tipo: "contrato", campos: 15, uso: 18 },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Generador de Plantillas</h1>
            <p className="text-slate-400">Crea y gestiona plantillas para proformas, cotizaciones y documentos</p>
          </div>
          <Button className="bg-cyan-600 hover:bg-cyan-700">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Plantilla
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-slate-900 border-slate-800 p-6">
            <h2 className="text-xl font-bold mb-4">Plantillas Existentes</h2>
            <div className="space-y-3">
              {plantillas.map((plantilla) => (
                <div key={plantilla.id} className="bg-slate-800 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        <FileText className="w-4 h-4 text-cyan-500" />
                        {plantilla.nombre}
                      </h3>
                      <div className="flex gap-2 mt-2">
                        <Badge className="bg-cyan-600">{plantilla.tipo}</Badge>
                        <span className="text-sm text-slate-400">{plantilla.campos} campos</span>
                        <span className="text-sm text-slate-400">Usado {plantilla.uso} veces</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-cyan-600 text-cyan-500 bg-transparent">
                      <Edit className="w-3 h-3 mr-1" />
                      Editar
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 bg-transparent">
                      <Copy className="w-3 h-3 mr-1" />
                      Duplicar
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 bg-transparent">
                      <Download className="w-3 h-3 mr-1" />
                      Exportar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-slate-900 border-slate-800 p-6">
            <h2 className="text-xl font-bold mb-4">Constructor de Plantilla</h2>
            <div className="space-y-4">
              <div>
                <Label>Nombre de la Plantilla</Label>
                <Input className="bg-slate-800 border-slate-700" placeholder="Ej: Cotización VPS" />
              </div>
              <div>
                <Label>Tipo de Documento</Label>
                <select className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2">
                  <option>Proforma</option>
                  <option>Cotización</option>
                  <option>Contrato</option>
                  <option>Factura</option>
                </select>
              </div>
              <div>
                <Label>Campos Dinámicos</Label>
                <div className="space-y-2 mt-2">
                  {[
                    "Nombre del Cliente",
                    "Producto/Servicio",
                    "Cantidad",
                    "Precio Unitario",
                    "Descuento %",
                    "Total",
                  ].map((campo, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-800 p-2 rounded">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-sm">{campo}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Crear Plantilla</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
