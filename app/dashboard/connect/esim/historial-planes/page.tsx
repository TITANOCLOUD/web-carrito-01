"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function HistorialPlanesPage() {
  const [itemsPerPage, setItemsPerPage] = useState("10")

  const planes = [
    {
      plan: { pais: "Colombia", bandera: "co", estado: "Inactivo" },
      vigencia: "Activación pendiente",
      esim: "dsUAskjioiqL",
      consumo: { usado: 0, total: 20 },
      usuario: "Propio",
    },
    {
      plan: { pais: "Colombia", bandera: "co", estado: "Inactivo" },
      vigencia: "Activación pendiente",
      esim: "gidTjOVD8eqo",
      consumo: { usado: 0, total: 20 },
      usuario: "Propio",
    },
    {
      plan: { pais: "Latinoamérica", bandera: null, estado: "Terminado" },
      vigencia: "2025-07-24",
      esim: "7lr4bQ9uJgMC",
      consumo: { usado: 10, total: 10 },
      usuario: "Propio",
    },
    {
      plan: { pais: "Latinoamérica", bandera: null, estado: "Terminado" },
      vigencia: "2025-07-30",
      esim: "7lr4bQ9uJgMC",
      consumo: { usado: 10, total: 10 },
      usuario: "Propio",
    },
    {
      plan: { pais: "Latinoamérica", bandera: null, estado: "Terminado" },
      vigencia: "2025-08-01",
      esim: "7lr4bQ9uJgMC",
      consumo: { usado: 0.03, total: 10 },
      usuario: "Propio",
    },
    {
      plan: { pais: "Latinoamérica", bandera: null, estado: "Terminado" },
      vigencia: "2025-08-23",
      esim: "7lr4bQ9uJgMC",
      consumo: { usado: 7.35, total: 20 },
      usuario: "Propio",
    },
    {
      plan: { pais: "Latinoamérica", bandera: null, estado: "Inactivo" },
      vigencia: "Activación pendiente",
      esim: "7lr4bQ9uJgMC",
      consumo: { usado: 0, total: 10 },
      usuario: "Propio",
    },
  ]

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Historial de Planes</h1>

        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 border-b border-gray-200">
                  <TableHead className="text-gray-600 font-semibold uppercase text-xs">PLAN</TableHead>
                  <TableHead className="text-gray-600 font-semibold uppercase text-xs">VIGENCIA</TableHead>
                  <TableHead className="text-gray-600 font-semibold uppercase text-xs">ESIM</TableHead>
                  <TableHead className="text-gray-600 font-semibold uppercase text-xs">CONSUMO DE DATOS</TableHead>
                  <TableHead className="text-gray-600 font-semibold uppercase text-xs">USUARIO</TableHead>
                  <TableHead className="text-gray-600 font-semibold uppercase text-xs">ACCIONES</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {planes.map((item, index) => {
                  const porcentaje = (item.consumo.usado / item.consumo.total) * 100

                  return (
                    <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {item.plan.bandera ? (
                            <img
                              src={`https://flagcdn.com/w40/${item.plan.bandera}.png`}
                              alt={item.plan.pais}
                              className="w-8 h-6 object-cover rounded"
                            />
                          ) : (
                            <div className="w-8 h-6 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded" />
                          )}
                          <div>
                            <div className="font-medium text-gray-800">{item.plan.pais}</div>
                            {item.plan.estado === "Inactivo" && (
                              <span className="text-xs text-gray-500">{item.plan.estado}</span>
                            )}
                            {item.plan.estado === "Terminado" && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                                ● {item.plan.estado}
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.vigencia === "Activación pendiente" ? (
                          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium border border-orange-300">
                            {item.vigencia}
                          </span>
                        ) : (
                          <span className="text-gray-700">{item.vigencia}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <code className="font-mono text-sm text-gray-700">{item.esim}</code>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3 min-w-[200px]">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: `${porcentaje}%`,
                                    backgroundColor: porcentaje >= 90 ? "#3b82f6" : "#3b82f6",
                                  }}
                                />
                              </div>
                              <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
                                {item.consumo.usado.toFixed(2)} GB/{item.consumo.total.toFixed(2)} GB
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 bg-gray-400">
                            <AvatarFallback className="bg-gray-400 text-white text-xs">JC</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-700">{item.usuario}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" className="text-blue-600 hover:bg-blue-50">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between p-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Mostrar</span>
                <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                  <SelectTrigger className="w-20 h-8 bg-white border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-gray-600">por página</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">1-7 of 7</span>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0" disabled>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-gray-100">
                    1
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0" disabled>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
