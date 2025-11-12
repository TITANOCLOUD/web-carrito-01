"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, Info } from "lucide-react"

export default function OrdenesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")

  const ordenes = [
    {
      idOrden: "aFNpgy3OH63q",
      usuario: "user@markcom.com.mx",
      fechaRegistro: "2025-09-08 14:56:33",
      estatus: "Concluido",
    },
    {
      idOrden: "TGr74fOgFS2J",
      usuario: "eldehector@gmail.com",
      fechaRegistro: "2025-08-24 09:40:15",
      estatus: "Concluido",
    },
  ]

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Historial de Órdenes</h1>

        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span className="text-sm font-medium">Filtro de estados</span>
            </div>
          </div>

          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-white border-gray-300"
            />
          </div>
        </div>

        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 border-b border-gray-200">
                  <TableHead className="text-gray-600 font-semibold uppercase text-xs">ID ORDEN</TableHead>
                  <TableHead className="text-gray-600 font-semibold uppercase text-xs">USUARIO</TableHead>
                  <TableHead className="text-gray-600 font-semibold uppercase text-xs">FECHA REGISTRO</TableHead>
                  <TableHead className="text-gray-600 font-semibold uppercase text-xs">ESTATUS</TableHead>
                  <TableHead className="text-gray-600 font-semibold uppercase text-xs">ACCIONES</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordenes.map((orden, index) => (
                  <TableRow key={orden.idOrden} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <TableCell>
                      <code className="px-2 py-1 bg-gray-200 rounded text-gray-700 font-mono text-sm">
                        {orden.idOrden}
                      </code>
                    </TableCell>
                    <TableCell className="text-gray-700">{orden.usuario}</TableCell>
                    <TableCell>
                      <code className="px-2 py-1 bg-gray-200 rounded text-gray-700 font-mono text-xs">
                        {orden.fechaRegistro}
                      </code>
                    </TableCell>
                    <TableCell>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {orden.estatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" className="text-gray-600 hover:bg-gray-100">
                        <Info className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="p-4 border-t border-gray-200 text-sm text-gray-500 italic">
              *Se muestran las órdenes del último año.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
