import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, FileText, Send, Download } from "lucide-react"

export default function CotizacionesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Generador de Cotizaciones</h1>
            <p className="text-slate-400">Crea proformas y cotizaciones dinámicas</p>
          </div>
          <Button className="bg-cyan-600 hover:bg-cyan-700">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Cotización
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="bg-slate-900 border-slate-800 p-6">
              <h2 className="text-xl font-bold mb-6">Información del Cliente</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label>Nombre del Cliente</Label>
                  <Input className="bg-slate-800 border-slate-700" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" className="bg-slate-800 border-slate-700" />
                </div>
                <div>
                  <Label>Empresa</Label>
                  <Input className="bg-slate-800 border-slate-700" />
                </div>
                <div>
                  <Label>Teléfono</Label>
                  <Input className="bg-slate-800 border-slate-700" />
                </div>
              </div>

              <h2 className="text-xl font-bold mb-4">Productos/Servicios</h2>
              <div className="space-y-3 mb-4">
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-5">
                      <Label className="text-xs">Producto</Label>
                      <select className="w-full bg-slate-700 border-slate-600 rounded px-2 py-1 text-sm">
                        <option>VPS Basic</option>
                        <option>Bare Metal Server</option>
                        <option>Cloud Storage</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs">Cantidad</Label>
                      <Input type="number" defaultValue="1" className="bg-slate-700 border-slate-600 text-sm" />
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs">Precio Unit.</Label>
                      <Input type="number" defaultValue="9.99" className="bg-slate-700 border-slate-600 text-sm" />
                    </div>
                    <div className="col-span-3">
                      <Label className="text-xs">Total</Label>
                      <div className="bg-slate-700 rounded px-2 py-1 text-sm font-bold">$9.99</div>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="border-cyan-600 text-cyan-500 mb-6 bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Producto
              </Button>

              <div className="border-t border-slate-800 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="font-semibold">$9.99</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">Descuento (10%)</span>
                  <span className="font-semibold text-green-500">-$1.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">IVA (19%)</span>
                  <span className="font-semibold">$1.71</span>
                </div>
                <div className="flex justify-between text-xl pt-2 border-t border-slate-700">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-cyan-500">$10.70</span>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card className="bg-slate-900 border-slate-800 p-6 mb-4">
              <h3 className="font-bold mb-4">Vista Previa</h3>
              <div className="bg-white text-black p-4 rounded text-xs space-y-2">
                <div className="font-bold text-lg">COTIZACIÓN</div>
                <div className="text-gray-600">COT-2024-001</div>
                <div className="border-t border-gray-300 my-2"></div>
                <div>
                  <div className="font-semibold">Cliente:</div>
                  <div className="text-gray-600">TechCorp SA</div>
                </div>
                <div className="border-t border-gray-300 my-2"></div>
                <div className="font-semibold">Items:</div>
                <div className="text-gray-600">VPS Basic x1 - $9.99</div>
                <div className="border-t border-gray-300 my-2"></div>
                <div className="font-bold">Total: $10.70</div>
              </div>
            </Card>

            <div className="space-y-2">
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                <Send className="w-4 h-4 mr-2" />
                Enviar al Cliente
              </Button>
              <Button variant="outline" className="w-full border-slate-600 bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
              </Button>
              <Button variant="outline" className="w-full border-slate-600 bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                Guardar Borrador
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
