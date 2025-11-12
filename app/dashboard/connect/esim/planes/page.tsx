"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Package, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PlanesPage() {
  const router = useRouter()
  const [planes] = useState([
    {
      id: 1,
      pais: "Colombia",
      bandera: "co",
      plan: "20GB - 30 días",
      precio: "$45.00",
      estado: "Activo",
      fechaCreacion: "2025-01-05",
    },
    {
      id: 2,
      pais: "México",
      bandera: "mx",
      plan: "15GB - 30 días",
      precio: "$40.00",
      estado: "Activo",
      fechaCreacion: "2025-01-03",
    },
    {
      id: 3,
      pais: "Latinoamérica",
      bandera: null,
      plan: "10GB - 15 días",
      precio: "$35.00",
      estado: "Activo",
      fechaCreacion: "2024-12-28",
    },
  ])

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Gestión de Planes</h1>
            <p className="text-slate-400">Administra los planes de eSIM disponibles</p>
          </div>
          <Button
            onClick={() => router.push("/dashboard/connect/esim/agregar")}
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Plan
          </Button>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-cyan-400" />
              <div>
                <CardTitle>Planes Disponibles</CardTitle>
                <CardDescription>Listado completo de planes de eSIM</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-400">País/Región</TableHead>
                  <TableHead className="text-slate-400">Plan</TableHead>
                  <TableHead className="text-slate-400">Precio</TableHead>
                  <TableHead className="text-slate-400">Estado</TableHead>
                  <TableHead className="text-slate-400">Fecha de Creación</TableHead>
                  <TableHead className="text-slate-400">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {planes.map((plan) => (
                  <TableRow key={plan.id} className="border-slate-700">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {plan.bandera ? (
                          <img
                            src={`https://flagcdn.com/w40/${plan.bandera}.png`}
                            alt={plan.pais}
                            className="w-10 h-7 object-cover rounded"
                          />
                        ) : (
                          <div className="w-10 h-7 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded flex items-center justify-center text-xs font-bold">
                            LATAM
                          </div>
                        )}
                        <span className="font-medium">{plan.pais}</span>
                      </div>
                    </TableCell>
                    <TableCell>{plan.plan}</TableCell>
                    <TableCell className="font-semibold text-green-400">{plan.precio}</TableCell>
                    <TableCell>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                        {plan.estado}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-400">{plan.fechaCreacion}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
                          Editar
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-600 text-red-400 bg-transparent">
                          Eliminar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
