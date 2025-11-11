import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, ShoppingCart, TrendingUp, FileText, Eye, Download } from "lucide-react"

export default function FinancieroPage() {
  const ordenes = [
    {
      id: "ORD-001",
      cliente: "TechCorp SA",
      producto: "VPS Premium",
      monto: 149.99,
      estado: "pagado",
      fecha: "2024-01-15",
      seguimiento: "completado",
    },
    {
      id: "ORD-002",
      cliente: "Digital Agency",
      producto: "Bare Metal",
      monto: 299.99,
      estado: "pendiente",
      fecha: "2024-01-14",
      seguimiento: "en_progreso",
    },
    {
      id: "ORD-003",
      cliente: "StartupXYZ",
      producto: "Hosting Pro",
      monto: 49.99,
      estado: "pagado",
      fecha: "2024-01-13",
      seguimiento: "sin_seguimiento",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Centro Financiero & CRM</h1>
          <p className="text-slate-400">Gestión de órdenes, cotizaciones y seguimiento de clientes</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-cyan-600 to-cyan-700 p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8" />
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold">$12,450</h3>
            <p className="text-cyan-100">Ingresos del mes</p>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-green-700 p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold">24</h3>
            <p className="text-green-100">Órdenes activas</p>
          </Card>

          <Card className="bg-gradient-to-br from-orange-600 to-orange-700 p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold">8</h3>
            <p className="text-orange-100">Cotizaciones pendientes</p>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold">12</h3>
            <p className="text-purple-100">Clientes sin seguimiento</p>
          </Card>
        </div>

        <Card className="bg-slate-900 border-slate-800 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Órdenes de Compra</h2>
            <div className="flex gap-2">
              <select className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm">
                <option>Todos los estados</option>
                <option>Pagado</option>
                <option>Pendiente</option>
                <option>Cancelado</option>
              </select>
              <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                Exportar
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">ID</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Cliente</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Producto</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Monto</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Estado</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Seguimiento</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ordenes.map((orden) => (
                  <tr key={orden.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="py-4 px-4 font-mono text-sm">{orden.id}</td>
                    <td className="py-4 px-4">{orden.cliente}</td>
                    <td className="py-4 px-4 text-slate-300">{orden.producto}</td>
                    <td className="py-4 px-4 font-semibold">${orden.monto}</td>
                    <td className="py-4 px-4">
                      <Badge className={orden.estado === "pagado" ? "bg-green-600" : "bg-orange-600"}>
                        {orden.estado}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant="outline"
                        className={
                          orden.seguimiento === "completado"
                            ? "border-green-500 text-green-500"
                            : orden.seguimiento === "en_progreso"
                              ? "border-cyan-500 text-cyan-500"
                              : "border-red-500 text-red-500"
                        }
                      >
                        {orden.seguimiento.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-cyan-600 text-cyan-500 bg-transparent">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-600 bg-transparent">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
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
