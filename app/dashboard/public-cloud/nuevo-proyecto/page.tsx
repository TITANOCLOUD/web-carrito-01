"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function NuevoProyectoPage() {
  const router = useRouter()
  const [projectName, setProjectName] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("eu-west")

  const regions = [
    { id: "eu-west", name: "Europa Oeste", location: "Francia" },
    { id: "eu-central", name: "Europa Central", location: "Alemania" },
    { id: "us-east", name: "US Este", location: "Estados Unidos" },
    { id: "us-west", name: "US Oeste", location: "Estados Unidos" },
    { id: "asia-pacific", name: "Asia Pacífico", location: "Singapur" },
  ]

  const handleCreateProject = () => {
    const projectId = `project-${new Date().toISOString().split("T")[0]}`
    router.push(`/dashboard/public-cloud/${projectId}`)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/dashboard/public-cloud">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Volver a proyectos
          </Button>
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Crear Nuevo Proyecto</h1>
          <p className="text-gray-400">Configura tu proyecto de Public Cloud</p>
        </div>

        <Card className="bg-gray-900 border-gray-800 p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white text-lg">
              Nombre del Proyecto
            </Label>
            <Input
              id="name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Mi Proyecto Cloud"
              className="bg-gray-800 border-gray-700 text-white text-lg py-6"
            />
          </div>

          <div className="space-y-4">
            <Label className="text-white text-lg">Región Principal</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {regions.map((region) => (
                <Card
                  key={region.id}
                  onClick={() => setSelectedRegion(region.id)}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedRegion === region.id
                      ? "bg-cyan-500/20 border-cyan-500"
                      : "bg-gray-800 border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <p className="font-semibold text-white">{region.name}</p>
                  <p className="text-sm text-gray-400">{region.location}</p>
                </Card>
              ))}
            </div>
          </div>

          <Button
            onClick={handleCreateProject}
            disabled={!projectName}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-6 text-lg"
          >
            Crear Proyecto
          </Button>
        </Card>
      </div>
    </div>
  )
}
