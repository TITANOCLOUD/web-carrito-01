"use client"

import { use, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Server, Database, Network, Container, HardDrive, Cloud, Settings } from "lucide-react"
import Link from "next/link"

export default function ProjectDetailPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = use(params)
  const [activeTab, setActiveTab] = useState("inicio")

  const services = [
    {
      icon: Server,
      title: "Crear una instancia",
      description: "Servidor cloud bajo demanda",
      href: `/dashboard/public-cloud/${projectId}/instancias/nueva`,
      color: "text-blue-400",
    },
    {
      icon: Container,
      title: "Crear un cluster Kubernetes",
      description: "Orquestación de contenedores",
      href: `/dashboard/public-cloud/${projectId}/kubernetes/nuevo`,
      color: "text-purple-400",
    },
    {
      icon: HardDrive,
      title: "Crear un contenedor Object Storage",
      description: "Almacenamiento de objetos S3",
      href: `/dashboard/public-cloud/${projectId}/object-storage/nuevo`,
      color: "text-orange-400",
    },
    {
      icon: Cloud,
      title: "Crear un volumen Block Storage",
      description: "Almacenamiento en bloque",
      href: `/dashboard/public-cloud/${projectId}/block-storage/nuevo`,
      color: "text-green-400",
    },
    {
      icon: Network,
      title: "Gestionar las redes privadas (vRack)",
      description: "Redes privadas virtuales",
      href: `/dashboard/public-cloud/${projectId}/vrack`,
      color: "text-cyan-400",
    },
    {
      icon: Database,
      title: "Crear una base de datos",
      description: "Bases de datos administradas",
      href: `/dashboard/public-cloud/${projectId}/databases/nueva`,
      color: "text-pink-400",
    },
    {
      icon: Server,
      title: "Crear un AI Notebook",
      description: "Entorno de desarrollo IA",
      href: `/dashboard/public-cloud/${projectId}/ai-notebook/nuevo`,
      color: "text-indigo-400",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900 px-8 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/public-cloud">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Volver
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-cyan-400">{projectId}</h1>
              <p className="text-sm text-gray-400">ID: {projectId}</p>
            </div>
          </div>
          <Link href={`/dashboard/public-cloud/${projectId}/ajustes`}>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
              <Settings className="w-4 h-4 mr-2" />
              Ajustes
            </Button>
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-800 bg-gray-900 px-8">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-transparent border-0 h-auto p-0">
              <TabsTrigger
                value="inicio"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-500 data-[state=active]:bg-transparent bg-transparent px-6 py-3"
              >
                Inicio
              </TabsTrigger>
              <TabsTrigger
                value="ajustes"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-500 data-[state=active]:bg-transparent bg-transparent px-6 py-3"
              >
                Ajustes
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link key={index} href={service.href}>
                <Card className="bg-gray-900 border-gray-800 p-6 hover:border-cyan-500 transition-all cursor-pointer h-full">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`p-4 rounded-lg bg-gray-800 ${service.color}`}>
                      <service.icon className="w-12 h-12" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-white text-lg">{service.title}</h3>
                      <p className="text-sm text-gray-400">{service.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Info Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
            {/* Facturación */}
            <Card className="bg-gray-900 border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Facturación</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Código promocional:</p>
                  <p className="text-sm text-cyan-400">Credit provisionning</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">$455.48 USD</p>
                  <p className="text-xs text-gray-400">Válido hasta el 30 de abril de 2026 23:00</p>
                </div>
              </div>
            </Card>

            {/* Documentación */}
            <Card className="bg-gray-900 border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Documentación</h3>
              <div className="space-y-3">
                <Link href="#" className="block text-sm text-cyan-400 hover:text-cyan-300">
                  Primeros pasos →
                </Link>
                <Link href="#" className="block text-sm text-cyan-400 hover:text-cyan-300">
                  Public Cloud →
                </Link>
                <Link href="#" className="block text-sm text-cyan-400 hover:text-cyan-300">
                  Gestionar sus instancias →
                </Link>
              </div>
            </Card>

            {/* Comunidad */}
            <Card className="bg-gray-900 border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Comunidad</h3>
              <div className="space-y-3">
                <Link href="#" className="block text-sm text-cyan-400 hover:text-cyan-300">
                  Roadmap →
                </Link>
                <Link href="#" className="block text-sm text-cyan-400 hover:text-cyan-300">
                  Participa en Discord →
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
