"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function ConfigurarClusterPage() {
  const router = useRouter()
  const params = useParams()
  const clusterName = decodeURIComponent(params.cluster as string)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Configuration state
  const [clusterType, setClusterType] = useState("standard")
  const [bandwidth, setBandwidth] = useState("1")
  const [diskType, setDiskType] = useState("hdd")
  const [diskCount, setDiskCount] = useState("1")
  const [diskSize, setDiskSize] = useState("500")
  const [ram, setRam] = useState("32")
  const [privateBandwidth, setPrivateBandwidth] = useState("1")

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    if (auth !== "true") {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  const handleSave = () => {
    console.log("[v0] Saving configuration:", {
      cluster: clusterName,
      clusterType,
      bandwidth,
      diskType,
      diskCount,
      diskSize,
      ram,
      privateBandwidth,
    })
    alert("Configuración guardada exitosamente")
    router.push("/dashboard")
  }

  const maxBandwidth = clusterType === "hgr" || clusterType === "scale" ? "10" : "5"

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-white"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-white">Configurar: {clusterName}</h1>
              <p className="text-sm text-slate-400">Ajusta los parámetros de tu cluster</p>
            </div>
          </div>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen14-iOqrZUcVQtbyBOYH9Ywjt9HAsmSKXd.png"
            alt="SATURNO"
            width={120}
            height={30}
            className="object-contain"
          />
        </div>
      </header>

      {/* Content */}
      <main className="p-8 max-w-4xl mx-auto">
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tipo de Cluster */}
            <div className="space-y-2">
              <Label htmlFor="clusterType" className="text-white">
                Tipo de Cluster
              </Label>
              <Select value={clusterType} onValueChange={setClusterType}>
                <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="hgr">HGR</SelectItem>
                  <SelectItem value="scale">Scale</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-400">
                {clusterType === "hgr" || clusterType === "scale"
                  ? "Soporta hasta 10 Gbps de ancho de banda"
                  : "Ancho de banda limitado a 5 Gbps"}
              </p>
            </div>

            {/* Ancho de Banda Público */}
            <div className="space-y-2">
              <Label htmlFor="bandwidth" className="text-white">
                Ancho de Banda Público
              </Label>
              <Select value={bandwidth} onValueChange={setBandwidth}>
                <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Gbps</SelectItem>
                  <SelectItem value="2.5">2.5 Gbps</SelectItem>
                  <SelectItem value="5">5 Gbps</SelectItem>
                  {(clusterType === "hgr" || clusterType === "scale") && <SelectItem value="10">10 Gbps</SelectItem>}
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-400">Máximo disponible para este tipo: {maxBandwidth} Gbps</p>
            </div>

            {/* Ancho de Banda Privado (Switching) */}
            <div className="space-y-2">
              <Label htmlFor="privateBandwidth" className="text-white">
                Ancho de Banda Privado (Switching)
              </Label>
              <Select value={privateBandwidth} onValueChange={setPrivateBandwidth}>
                <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Gbps</SelectItem>
                  <SelectItem value="2.5">2.5 Gbps</SelectItem>
                  <SelectItem value="5">5 Gbps</SelectItem>
                  <SelectItem value="10">10 Gbps</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-400">Red interna entre nodos del cluster</p>
            </div>

            {/* RAM */}
            <div className="space-y-2">
              <Label htmlFor="ram" className="text-white">
                RAM (GB)
              </Label>
              <Input
                id="ram"
                type="number"
                value={ram}
                onChange={(e) => setRam(e.target.value)}
                className="bg-slate-900 border-slate-600 text-white"
                min="8"
                max="1024"
                step="8"
              />
              <p className="text-xs text-slate-400">Memoria RAM en gigabytes (8-1024 GB)</p>
            </div>

            {/* Tipo de Disco */}
            <div className="space-y-2">
              <Label htmlFor="diskType" className="text-white">
                Tipo de Disco
              </Label>
              <Select value={diskType} onValueChange={setDiskType}>
                <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hdd">HDD (SATA)</SelectItem>
                  <SelectItem value="nvme">NVMe (SSD)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-400">
                {diskType === "nvme" ? "Alto rendimiento para I/O intensivo" : "Almacenamiento económico y confiable"}
              </p>
            </div>

            {/* Cantidad de Discos */}
            <div className="space-y-2">
              <Label htmlFor="diskCount" className="text-white">
                Cantidad de Discos
              </Label>
              <Input
                id="diskCount"
                type="number"
                value={diskCount}
                onChange={(e) => setDiskCount(e.target.value)}
                className="bg-slate-900 border-slate-600 text-white"
                min="1"
                max="24"
              />
              <p className="text-xs text-slate-400">Número de discos duros (1-24)</p>
            </div>

            {/* Tamaño por Disco */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="diskSize" className="text-white">
                Tamaño por Disco (GB)
              </Label>
              <Input
                id="diskSize"
                type="number"
                value={diskSize}
                onChange={(e) => setDiskSize(e.target.value)}
                className="bg-slate-900 border-slate-600 text-white"
                min="100"
                max="10000"
                step="100"
              />
              <p className="text-xs text-slate-400">
                Capacidad individual de cada disco (100-10,000 GB) • Total:{" "}
                {(Number.parseInt(diskCount) * Number.parseInt(diskSize)) / 1000} TB
              </p>
            </div>
          </div>

          {/* Resumen */}
          <div className="mt-8 p-6 bg-slate-900 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Resumen de Configuración</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Cluster:</span>
                <span className="text-white ml-2 font-medium">{clusterName}</span>
              </div>
              <div>
                <span className="text-slate-400">Tipo:</span>
                <span className="text-white ml-2 font-medium uppercase">{clusterType}</span>
              </div>
              <div>
                <span className="text-slate-400">RAM:</span>
                <span className="text-white ml-2">{ram} GB</span>
              </div>
              <div>
                <span className="text-slate-400">Almacenamiento:</span>
                <span className="text-white ml-2">
                  {diskCount}x {diskSize}GB {diskType.toUpperCase()}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Banda Pública:</span>
                <span className="text-white ml-2">{bandwidth} Gbps</span>
              </div>
              <div>
                <span className="text-slate-400">Banda Privada:</span>
                <span className="text-white ml-2">{privateBandwidth} Gbps</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-4">
            <Button onClick={handleSave} className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-6 text-lg">
              Guardar Configuración
            </Button>
            <Button
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800 py-6 text-lg"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
