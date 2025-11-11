import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Package, DollarSign, Layers } from "lucide-react"

export default function ProductosPage() {
  const productos = [
    { id: 1, nombre: "VPS Basic", categoria: "VPS", precio: 9.99, addons: ["Backup", "SSL"], estado: "activo" },
    {
      id: 2,
      nombre: "Bare Metal Server",
      categoria: "Bare Metal",
      precio: 149.99,
      addons: ["Anti-DDoS", "Backup"],
      estado: "activo",
    },
    { id: 3, nombre: "Hosting Starter", categoria: "Hosting", precio: 4.99, addons: ["SSL", "CDN"], estado: "activo" },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Gestión de Productos</h1>
            <p className="text-slate-400">Administra catálogo, precios y addons</p>
          </div>
          <Button className="bg-cyan-600 hover:bg-cyan-700">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Producto
          </Button>
        </div>

        <div className="grid gap-6 mb-8">
          <Card className="bg-slate-900 border-slate-800 p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-cyan-500" />
              Productos Activos
            </h2>

            <div className="space-y-4">
              {productos.map((producto) => (
                <div key={producto.id} className="bg-slate-800 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{producto.nombre}</h3>
                      <Badge className="bg-cyan-600">{producto.categoria}</Badge>
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        {producto.estado}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />${producto.precio}/mes
                      </span>
                      <span className="flex items-center gap-1">
                        <Layers className="w-4 h-4" />
                        {producto.addons.length} addons
                      </span>
                    </div>
                    <div className="mt-2 flex gap-2">
                      {producto.addons.map((addon, idx) => (
                        <span key={idx} className="text-xs bg-slate-700 px-2 py-1 rounded">
                          {addon}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-cyan-600 text-cyan-500 hover:bg-cyan-600 hover:text-white bg-transparent"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white bg-transparent"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-slate-900 border-slate-800 p-6">
              <h3 className="text-lg font-bold mb-4">Configurar Producto</h3>
              <div className="space-y-4">
                <div>
                  <Label>Nombre del Producto</Label>
                  <Input className="bg-slate-800 border-slate-700" placeholder="VPS Premium" />
                </div>
                <div>
                  <Label>Precio Base (USD/mes)</Label>
                  <Input type="number" className="bg-slate-800 border-slate-700" placeholder="19.99" />
                </div>
                <div>
                  <Label>Categoría</Label>
                  <select className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2">
                    <option>VPS</option>
                    <option>Bare Metal</option>
                    <option>Hosting</option>
                    <option>Cloud Storage</option>
                  </select>
                </div>
                <div>
                  <Label>Descripción</Label>
                  <Textarea className="bg-slate-800 border-slate-700" rows={3} />
                </div>
              </div>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-6">
              <h3 className="text-lg font-bold mb-4">Addons Disponibles</h3>
              <div className="space-y-3">
                {[
                  "Backup Automático (+$5/mes)",
                  "SSL Premium (+$3/mes)",
                  "Anti-DDoS (+$10/mes)",
                  "CDN (+$8/mes)",
                  "Monitoring 24/7 (+$7/mes)",
                ].map((addon, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700"
                  >
                    <input type="checkbox" className="w-4 h-4" />
                    <span>{addon}</span>
                  </label>
                ))}
              </div>
              <Button className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700">Guardar Configuración</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
