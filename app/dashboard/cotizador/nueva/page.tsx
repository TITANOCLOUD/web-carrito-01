"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, FileText, Save, Send } from "lucide-react"
import { useRouter } from "next/navigation"

interface Item {
  ref: string
  nombre: string
  descripcion: string
  precio: number
  descuento: number
  cantidad: number
  impuesto: string
}

export default function NuevaCotizacionPage() {
  const router = useRouter()
  const [items, setItems] = useState<Item[]>([
    {
      ref: "INFRACLOUD",
      nombre: "INFRAESTRUCTURA CLOUD PERSONALIZADA",
      descripcion: "PROCESADOR AMD EPYC 4345P - 8C/16T - 3.8GHZ/5.5GHZ, MEMORIA 128GB DDR5 ECC ON-DIE 5600MHZ",
      precio: 25500,
      descuento: 0,
      cantidad: 1,
      impuesto: "IVA 16%",
    },
  ])

  // Datos del cliente
  const [clienteNombre, setClienteNombre] = useState("")
  const [clienteNivel, setClienteNivel] = useState("Gold")
  const [zona, setZona] = useState("Colombia")
  const [agente, setAgente] = useState("")
  const [formaPago, setFormaPago] = useState("Por definir")

  // Configuración de impuestos por zona
  const impuestosPorZona: Record<string, { iva: number; retencion: number }> = {
    Colombia: { iva: 16, retencion: 0 },
    México: { iva: 16, retencion: 0 },
    Perú: { iva: 18, retencion: 0 },
    Argentina: { iva: 21, retencion: 0 },
    "Estados Unidos": { iva: 0, retencion: 0 },
    Canadá: { iva: 0, retencion: 0 },
    Guatemala: { iva: 12, retencion: 0 },
  }

  // Descuentos por nivel
  const descuentosPorNivel: Record<string, number> = {
    Bronce: 5,
    Silver: 10,
    Gold: 15,
    Platinum: 20,
  }

  const agregarItem = () => {
    setItems([
      ...items,
      {
        ref: "",
        nombre: "",
        descripcion: "",
        precio: 0,
        descuento: 0,
        cantidad: 1,
        impuesto: "IVA 16%",
      },
    ])
  }

  const eliminarItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const actualizarItem = (index: number, campo: keyof Item, valor: any) => {
    const nuevosItems = [...items]
    nuevosItems[index] = { ...nuevosItems[index], [campo]: valor }
    setItems(nuevosItems)
  }

  const calcularSubtotal = (item: Item) => {
    const descuentoAdicional = descuentosPorNivel[clienteNivel] || 0
    const descuentoTotal = item.descuento + descuentoAdicional
    const precioConDescuento = item.precio * (1 - descuentoTotal / 100)
    return precioConDescuento * item.cantidad
  }

  const calcularBase = () => {
    return items.reduce((sum, item) => sum + calcularSubtotal(item), 0)
  }

  const calcularImpuestos = () => {
    const base = calcularBase()
    const configImpuesto = impuestosPorZona[zona]
    return (base * configImpuesto.iva) / 100
  }

  const calcularTotal = () => {
    return calcularBase() + calcularImpuestos()
  }

  const generarNumeroCotizacion = () => {
    return `COV${String(Math.floor(Math.random() * 100000)).padStart(5, "0")}`
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Nueva Cotización</h1>
            <p className="text-slate-400">Crea una nueva cotización para tus clientes</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-slate-700 text-slate-300 bg-transparent"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button className="bg-slate-700 hover:bg-slate-600">
              <Save className="w-4 h-4 mr-2" />
              Guardar Borrador
            </Button>
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              <Send className="w-4 h-4 mr-2" />
              Enviar Cotización
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulario Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Datos del Cliente */}
            <Card className="bg-slate-900 border-slate-800 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Datos del Cliente</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Nombre del Cliente</Label>
                  <Input
                    value={clienteNombre}
                    onChange={(e) => setClienteNombre(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                    placeholder="TELSTRA SAB DE CV"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Nivel de Cliente</Label>
                  <Select value={clienteNivel} onValueChange={setClienteNivel}>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="Bronce">Bronce (5% descuento)</SelectItem>
                      <SelectItem value="Silver">Silver (10% descuento)</SelectItem>
                      <SelectItem value="Gold">Gold (15% descuento)</SelectItem>
                      <SelectItem value="Platinum">Platinum (20% descuento)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Zona Geográfica</Label>
                  <Select value={zona} onValueChange={setZona}>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="Colombia">Colombia (IVA 16%)</SelectItem>
                      <SelectItem value="México">México (IVA 16%)</SelectItem>
                      <SelectItem value="Perú">Perú (IGV 18%)</SelectItem>
                      <SelectItem value="Argentina">Argentina (IVA 21%)</SelectItem>
                      <SelectItem value="Estados Unidos">Estados Unidos (Sin IVA)</SelectItem>
                      <SelectItem value="Canadá">Canadá (Sin IVA)</SelectItem>
                      <SelectItem value="Guatemala">Guatemala (IVA 12%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Agente</Label>
                  <Input
                    value={agente}
                    onChange={(e) => setAgente(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                    placeholder="Elizabeth Sierra"
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-slate-300">Forma de Pago</Label>
                  <Input
                    value={formaPago}
                    onChange={(e) => setFormaPago(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>
            </Card>

            {/* Items de la Cotización */}
            <Card className="bg-slate-900 border-slate-800 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Items de la Cotización</h2>
                <Button onClick={agregarItem} size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Item
                </Button>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <Card key={index} className="bg-slate-800 border-slate-700 p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-cyan-400 font-semibold">Item #{index + 1}</h3>
                      <Button
                        onClick={() => eliminarItem(index)}
                        size="sm"
                        variant="ghost"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-slate-300 text-sm">Referencia</Label>
                        <Input
                          value={item.ref}
                          onChange={(e) => actualizarItem(index, "ref", e.target.value)}
                          className="bg-slate-900 border-slate-600 text-white"
                          placeholder="INFRACLOUD"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300 text-sm">Nombre del Producto</Label>
                        <Input
                          value={item.nombre}
                          onChange={(e) => actualizarItem(index, "nombre", e.target.value)}
                          className="bg-slate-900 border-slate-600 text-white"
                          placeholder="INFRAESTRUCTURA CLOUD"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label className="text-slate-300 text-sm">Descripción / Características</Label>
                        <Textarea
                          value={item.descripcion}
                          onChange={(e) => actualizarItem(index, "descripcion", e.target.value)}
                          className="bg-slate-900 border-slate-600 text-white"
                          rows={3}
                          placeholder="Características técnicas del producto..."
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300 text-sm">Precio Unitario</Label>
                        <Input
                          type="number"
                          value={item.precio}
                          onChange={(e) => actualizarItem(index, "precio", Number(e.target.value))}
                          className="bg-slate-900 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300 text-sm">Descuento Adicional (%)</Label>
                        <Input
                          type="number"
                          value={item.descuento}
                          onChange={(e) => actualizarItem(index, "descuento", Number(e.target.value))}
                          className="bg-slate-900 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300 text-sm">Cantidad</Label>
                        <Input
                          type="number"
                          value={item.cantidad}
                          onChange={(e) => actualizarItem(index, "cantidad", Number(e.target.value))}
                          className="bg-slate-900 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300 text-sm">Subtotal</Label>
                        <Input
                          value={`$${calcularSubtotal(item).toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
                          disabled
                          className="bg-slate-900 border-slate-600 text-cyan-400 font-semibold"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          {/* Resumen */}
          <div className="space-y-6">
            <Card className="bg-slate-900 border-slate-800 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-white mb-4">Resumen de Cotización</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Número:</span>
                  <span className="text-cyan-400 font-semibold">{generarNumeroCotizacion()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Fecha:</span>
                  <span className="text-white">{new Date().toLocaleDateString("es-ES")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Cliente:</span>
                  <span className="text-white">{clienteNombre || "Sin definir"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Nivel:</span>
                  <span className="text-white">{clienteNivel}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Zona:</span>
                  <span className="text-white">{zona}</span>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Descuento por Nivel:</span>
                  <span className="text-green-400">{descuentosPorNivel[clienteNivel]}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">BASE:</span>
                  <span className="text-white font-semibold">
                    ${calcularBase().toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">
                    {zona === "Perú" ? "IGV" : "IVA"} {impuestosPorZona[zona].iva}%:
                  </span>
                  <span className="text-white font-semibold">
                    ${calcularImpuestos().toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="border-t border-slate-800 pt-3 flex justify-between">
                  <span className="text-lg font-bold text-white">TOTAL:</span>
                  <span className="text-2xl font-bold text-cyan-400">
                    ${calcularTotal().toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800">
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700 mb-3">
                  <FileText className="w-4 h-4 mr-2" />
                  Vista Previa PDF
                </Button>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar al Cliente
                </Button>
              </div>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-4">
              <p className="text-xs text-slate-400 italic">
                Los precios se calculan según la lista de precios de la compañía y se aplican descuentos según el nivel
                del cliente y configuración de partners.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
