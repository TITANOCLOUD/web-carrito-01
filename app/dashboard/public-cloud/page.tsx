"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Cloud } from "lucide-react"
import Link from "next/link"

export default function PublicCloudPage() {
  const [projects] = useState([
    {
      id: "project-2025-04-15",
      name: "Project 2025-04-15",
      created: "2025-04-15",
      region: "EU-West",
      billing: "$455.48 USD",
      resources: 12,
    },
  ])

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Public Cloud</h1>
            <p className="text-gray-400">Gestiona tus proyectos e infraestructura cloud</p>
          </div>
          <Link href="/dashboard/public-cloud/nuevo-proyecto">
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Crear Proyecto
            </Button>
          </Link>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Mis Proyectos</h2>
          {projects.map((project) => (
            <Card
              key={project.id}
              className="bg-gray-900 border-gray-800 p-6 hover:border-cyan-500 transition-all cursor-pointer"
            >
              <Link href={`/dashboard/public-cloud/${project.id}`}>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-cyan-400">{project.name}</h3>
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <span>Creado: {project.created}</span>
                      <span>Región: {project.region}</span>
                      <span>Recursos: {project.resources}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{project.billing}</div>
                    <div className="text-sm text-gray-400">Facturación estimada</div>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        {/* Quick Actions - Only shown if no projects */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <Cloud className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No tienes proyectos aún</h3>
            <p className="text-gray-400 mb-6">Crea tu primer proyecto para comenzar a usar Public Cloud</p>
            <Link href="/dashboard/public-cloud/nuevo-proyecto">
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">Crear Primer Proyecto</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
