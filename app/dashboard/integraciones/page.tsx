import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Settings, RefreshCw } from "lucide-react"

export default function IntegracionesPage() {
  const integraciones = [
    { id: "cloudflare", nombre: "Cloudflare", logo: "☁️", estado: "conectado", lastSync: "5 min ago" },
    { id: "acronis", nombre: "Acronis", logo: "🔒", estado: "desconectado", lastSync: "N/A" },
    { id: "azure", nombre: "Microsoft Azure", logo: "⚡", estado: "conectado", lastSync: "1 min ago" },
    { id: "aws", nombre: "Amazon AWS", logo: "📦", estado: "conectado", lastSync: "3 min ago" },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Integraciones API</h1>
          <p className="text-slate-400">Conecta y administra proveedores cloud desde un solo lugar</p>
        </div>

        <div className="grid gap-6">
          {integraciones.map((int) => (
            <Card key={int.id} className="bg-slate-900 border-slate-800 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center text-3xl">
                    {int.logo}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      {int.nombre}
                      {int.estado === "conectado" ? (
                        <Badge className="bg-green-600 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Conectado
                        </Badge>
                      ) : (
                        <Badge className="bg-red-600 flex items-center gap-1">
                          <XCircle className="w-3 h-3" />
                          Desconectado
                        </Badge>
                      )}
                    </h3>
                    <p className="text-slate-400 text-sm">Última sincronización: {int.lastSync}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-cyan-600 text-cyan-500 bg-transparent">
                    <Settings className="w-4 h-4 mr-1" />
                    Configurar
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-600 bg-transparent">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {int.estado === "conectado" && (
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <h4 className="font-semibold mb-3">Recursos Sincronizados</h4>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-slate-800 rounded p-3 text-center">
                      <div className="text-2xl font-bold text-cyan-500">24</div>
                      <div className="text-xs text-slate-400">Servidores</div>
                    </div>
                    <div className="bg-slate-800 rounded p-3 text-center">
                      <div className="text-2xl font-bold text-cyan-500">12</div>
                      <div className="text-xs text-slate-400">Dominios</div>
                    </div>
                    <div className="bg-slate-800 rounded p-3 text-center">
                      <div className="text-2xl font-bold text-cyan-500">8</div>
                      <div className="text-xs text-slate-400">IPs</div>
                    </div>
                    <div className="bg-slate-800 rounded p-3 text-center">
                      <div className="text-2xl font-bold text-cyan-500">156GB</div>
                      <div className="text-xs text-slate-400">Storage</div>
                    </div>
                  </div>
                </div>
              )}

              {int.estado === "desconectado" && (
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>API Key</Label>
                      <Input type="password" className="bg-slate-800 border-slate-700" placeholder="••••••••••••" />
                    </div>
                    <div>
                      <Label>API Secret</Label>
                      <Input type="password" className="bg-slate-800 border-slate-700" placeholder="••••••••••••" />
                    </div>
                  </div>
                  <Button className="mt-4 bg-cyan-600 hover:bg-cyan-700">Conectar {int.nombre}</Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
