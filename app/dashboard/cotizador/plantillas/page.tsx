"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, Download, Eye } from "lucide-react"

export default function PlantillasPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("default")
  const [CLIENTE, setCLIENTE] = useState("Nombre del Cliente")
  const [NUMERO_COT, setNUMERO_COT] = useState("12345")
  const [FECHA, setFECHA] = useState("2023-10-01")
  const [AGENTE, setAGENTE] = useState("Agente Comercial")
  const [ITEMS, setITEMS] = useState("Tabla de productos")
  const [SUBTOTAL, setSUBTOTAL] = useState("1000")
  const [IVA, setIVA] = useState("160")
  const [TOTAL, setTOTAL] = useState("1160")

  const variables = [
    { nombre: "{{NUMERO_COT}}", descripcion: "Número de cotización" },
    { nombre: "{{FECHA}}", descripcion: "Fecha de emisión" },
    { nombre: "{{CLIENTE}}", descripcion: "Nombre del cliente" },
    { nombre: "{{AGENTE}}", descripcion: "Agente comercial" },
    { nombre: "{{ITEMS}}", descripcion: "Tabla de productos" },
    { nombre: "{{SUBTOTAL}}", descripcion: "Subtotal antes de impuestos" },
    { nombre: "{{IVA}}", descripcion: "Valor del IVA" },
    { nombre: "{{TOTAL}}", descripcion: "Total a pagar" },
    { nombre: "{{NIVEL_CLIENTE}}", descripcion: "Nivel del cliente" },
    { nombre: "{{DESCUENTO}}", descripcion: "Porcentaje de descuento" },
  ]

  const plantillas = [
    { id: "default", nombre: "Plantilla Estándar", descripcion: "Formato corporativo predeterminado" },
    { id: "inbu", nombre: "Plantilla INBU", descripcion: "Formato personalizado INBU" },
    { id: "integra", nombre: "Plantilla INTEGRA", descripcion: "Formato personalizado INTEGRA" },
  ]

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Editor de Plantillas</h1>
            <p className="text-slate-400">Personaliza el formato de tus cotizaciones</p>
          </div>
          <Button className="bg-cyan-600 hover:bg-cyan-700">
            <Upload className="w-4 h-4 mr-2" />
            Subir Nueva Plantilla
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Plantillas disponibles */}
          <Card className="bg-slate-900 border-slate-800 p-4">
            <h3 className="text-white font-semibold mb-4">Plantillas Disponibles</h3>
            <div className="space-y-2">
              {plantillas.map((plantilla) => (
                <button
                  key={plantilla.id}
                  onClick={() => setSelectedTemplate(plantilla.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedTemplate === plantilla.id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <div className="font-medium">{plantilla.nombre}</div>
                  <div className="text-sm opacity-75">{plantilla.descripcion}</div>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800">
              <h4 className="text-white font-medium mb-3">Variables Disponibles</h4>
              <div className="space-y-2">
                {variables.map((variable) => (
                  <div key={variable.nombre} className="bg-slate-800 p-2 rounded text-sm">
                    <div className="text-cyan-400 font-mono">{variable.nombre}</div>
                    <div className="text-slate-400 text-xs">{variable.descripcion}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Editor de plantilla */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-900 border-slate-800 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-semibold">Vista Previa</h3>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-slate-700 text-slate-300 bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver PDF
                  </Button>
                  <Button variant="outline" className="border-slate-700 text-slate-300 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </Button>
                </div>
              </div>

              {/* Vista previa del documento */}
              <div className="bg-white p-8 rounded-lg text-slate-900 min-h-[800px]">
                <div className="border-b-2 border-slate-900 pb-4 mb-6">
                  <h2 className="text-2xl font-bold">RENTA MENSUAL - SDE EN SINGAPUR</h2>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="font-bold mb-2">DATOS DEL CLIENTE</h3>
                    <p className="font-semibold">{CLIENTE}</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">DATOS DE COTIZACIÓN DE VENTA</h3>
                    <p>Número: {NUMERO_COT}</p>
                    <p>Fecha: {FECHA}</p>
                    <p>Forma de pago: Por definir</p>
                    <p>Agente: {AGENTE}</p>
                  </div>
                </div>

                <table className="w-full mb-6 border border-slate-900">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="border border-slate-900 p-2 text-left text-sm">REF.</th>
                      <th className="border border-slate-900 p-2 text-left text-sm">NOMBRE</th>
                      <th className="border border-slate-900 p-2 text-right text-sm">PRECIO</th>
                      <th className="border border-slate-900 p-2 text-center text-sm">DTO.</th>
                      <th className="border border-slate-900 p-2 text-center text-sm">UDS.</th>
                      <th className="border border-slate-900 p-2 text-right text-sm">SUBTOTAL</th>
                      <th className="border border-slate-900 p-2 text-center text-sm">IMP.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-slate-500">
                        {ITEMS}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="flex justify-end">
                  <div className="w-64">
                    <div className="flex justify-between mb-2">
                      <span>BASE:</span>
                      <span>{SUBTOTAL}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>IVA 16.00%:</span>
                      <span>{IVA}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>TOTAL:</span>
                      <span>{TOTAL}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-xs text-slate-600">
                  <p className="italic mb-4">
                    "LOS ACUERDOS TELEFÓNICOS NO TENDRÁN EFECTO Y AUTORIZO A ESTA EMPRESA PUEDA FACILITAR ESTA
                    COTIZACIÓN A CONTPAQi PARA QUE SEA SUJETO A REVISIÓN DE CALIDAD DE LOS SERVICIOS PRESTADOS POR LOS
                    DISTRIBUIDORES"
                  </p>
                  <h4 className="font-bold mb-2">Condiciones de venta:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Precios sujetos a cambio sin previo aviso.</li>
                    <li>El tiempo de soporte es aproximado y depende de la complejidad de la implementación.</li>
                    <li>No se aceptan devoluciones.</li>
                    <li>La garantía del software es otorgada por el fabricante.</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
