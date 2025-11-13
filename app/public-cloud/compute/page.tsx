"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Server,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  Cpu,
  HardDrive,
  Database,
  Images,
  Leaf,
  Lock,
  RefreshCw,
  Settings,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function ComputePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("vmi")
  const [pricingTab, setPricingTab] = useState("linux-hourly")

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#0f1419] to-[#0a0e1a]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6 text-balance">Descubra la gama</h1>
          <p className="text-xl text-slate-300 mb-12 text-pretty">
            Servicios de cómputo escalables para todas sus necesidades
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="bg-[#1a1f2e] border-slate-800">
              <CardContent className="p-6">
                <Settings className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Para todos los usos</h3>
                <p className="text-slate-400 text-sm">
                  Amplia gama diseñada para aplicaciones, bases de datos e inteligencia artificial
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#1a1f2e] border-slate-800">
              <CardContent className="p-6">
                <Zap className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Flexibilidad y escalabilidad</h3>
                <p className="text-slate-400 text-sm">
                  Sin compromiso, facturación por horas y escalado instantáneo según necesidades
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#1a1f2e] border-slate-800">
              <CardContent className="p-6">
                <Server className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Interconexión con el catálogo</h3>
                <p className="text-slate-400 text-sm">
                  Acceso completo a soluciones IaaS y PaaS para infraestructuras adaptadas
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#1a1f2e] border-slate-800">
              <CardContent className="p-6">
                <RefreshCw className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Uso moderno y automatización</h3>
                <p className="text-slate-400 text-sm">
                  Automatización completa vía API, Terraform y SDK con enfoque DevOps
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#1a1f2e] border-slate-800">
              <CardContent className="p-6">
                <HardDrive className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Optimización de los costes</h3>
                <p className="text-slate-400 text-sm">
                  Excelente relación rendimiento-precio, una de las más competitivas del mercado
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#1a1f2e] border-slate-800">
              <CardContent className="p-6">
                <Globe className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Disponibilidad mundial</h3>
                <p className="text-slate-400 text-sm">
                  Presencia global con Local Zones y regiones 1-AZ o 3-AZ para alta disponibilidad
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4 mb-8 border-b border-slate-800">
            <button
              onClick={() => setActiveTab("vmi")}
              className={`pb-4 px-6 font-semibold transition-all ${
                activeTab === "vmi" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-slate-400 hover:text-white"
              }`}
            >
              Virtual Machine Instances
            </button>
            <button
              onClick={() => setActiveTab("gpu")}
              className={`pb-4 px-6 font-semibold transition-all ${
                activeTab === "gpu" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-slate-400 hover:text-white"
              }`}
            >
              Cloud GPU
            </button>
            <button
              onClick={() => setActiveTab("metal")}
              className={`pb-4 px-6 font-semibold transition-all ${
                activeTab === "metal" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-slate-400 hover:text-white"
              }`}
            >
              Metal Instances
            </button>
          </div>

          {activeTab === "vmi" && (
            <div className="space-y-12">
              <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-4">Virtual Machine Instances</h2>
                    <p className="text-slate-300 mb-6 text-lg">
                      Disfrute de instancias polivalentes y adaptadas a todos sus usos.
                    </p>
                    <p className="text-slate-400 mb-6">
                      Lance sus proyectos cloud conservando todas sus posibilidades de evolución. Nuestras instancias
                      virtuales ofrecen diferentes capacidades en términos de memoria y vCPU para responder a un gran
                      número de casos de uso.
                    </p>
                    <Button
                      onClick={() => router.push("/public-cloud/compute/vmi/precios")}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                      Ver Precios
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <div className="relative h-64">
                    <img
                      src="/virtual-machine-instance-datacenter-servers.jpg"
                      alt="Virtual Machine Instances"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Modelos */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-[#1a1f2e] border-slate-800">
                  <CardContent className="p-6">
                    <Cpu className="w-12 h-12 text-cyan-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">General Purpose</h3>
                    <p className="text-slate-400 text-sm">Equilibradas y polivalentes para gestión de servidores</p>
                  </CardContent>
                </Card>
                <Card className="bg-[#1a1f2e] border-slate-800">
                  <CardContent className="p-6">
                    <Zap className="w-12 h-12 text-cyan-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Compute Optimized</h3>
                    <p className="text-slate-400 text-sm">Optimizadas para CPU y cálculos masivos</p>
                  </CardContent>
                </Card>
                <Card className="bg-[#1a1f2e] border-slate-800">
                  <CardContent className="p-6">
                    <Server className="w-12 h-12 text-cyan-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Memory Optimized</h3>
                    <p className="text-slate-400 text-sm">Diseñadas para tratamientos orientados a la memoria</p>
                  </CardContent>
                </Card>
                <Card className="bg-[#1a1f2e] border-slate-800">
                  <CardContent className="p-6">
                    <HardDrive className="w-12 h-12 text-cyan-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Storage Optimized</h3>
                    <p className="text-slate-400 text-sm">IOPS optimizadas con tarjetas NVMe</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "gpu" && (
            <div className="space-y-12">
              <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-4">Cloud GPU</h2>
                    <p className="text-slate-300 mb-6 text-lg">
                      Descubra la velocidad de nuestras instancias Public Cloud más potentes: hasta mil veces más
                      rápidas que una CPU para el cálculo paralelo.
                    </p>
                    <p className="text-slate-400 mb-6">
                      Soluciones Cloud GPU a medida con nuestra amplia selección optimizada para IA, machine learning y
                      computación de alto rendimiento.
                    </p>
                    <Button
                      onClick={() => router.push("/public-cloud/compute/gpu/precios")}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                      Ver Precios
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <div className="relative h-64">
                    <img
                      src="/nvidia-gpu-server-ai-computing.jpg"
                      alt="Cloud GPU"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* GPU Models */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-[#1a1f2e] border-slate-800">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-cyan-400 mb-4">H100</div>
                    <h3 className="text-xl font-bold text-white mb-2">NVIDIA H100</h3>
                    <p className="text-slate-400 text-sm mb-4">80 GB HBM2e - PCIe 5.0</p>
                    <p className="text-slate-400 text-sm">
                      Para IA y deep learning más exigentes, inferencia LLM y redes neuronales complejas
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-[#1a1f2e] border-slate-800">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-cyan-400 mb-4">L40S</div>
                    <h3 className="text-xl font-bold text-white mb-2">NVIDIA L40S</h3>
                    <p className="text-slate-400 text-sm mb-4">48 GB GDDR6 - PCIe 4.0</p>
                    <p className="text-slate-400 text-sm">
                      Combinan rendimiento IA y aceleración gráfica para inferencia generativa y gráficos 3D
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-[#1a1f2e] border-slate-800">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-cyan-400 mb-4">A10</div>
                    <h3 className="text-xl font-bold text-white mb-2">NVIDIA A10</h3>
                    <p className="text-slate-400 text-sm mb-4">24 GB GDDR6 - PCIe 4.0</p>
                    <p className="text-slate-400 text-sm">
                      Perfectas para inferencia de IA y virtualización de escritorios gráficos
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "metal" && (
            <div className="space-y-12">
              <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-4">Metal Instances</h2>
                    <p className="text-slate-300 mb-6 text-lg">
                      Combine todas las ventajas de los servidores dedicados con la flexibilidad del cloud y la
                      automatización por API.
                    </p>
                    <p className="text-slate-400 mb-6">
                      Rendimiento y fiabilidad gracias al acceso directo a todos los recursos disponibles en el servidor
                      sin capa de virtualización.
                    </p>
                    <Button
                      onClick={() => router.push("/public-cloud/compute/metal/precios")}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                      Ver Precios
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <div className="relative h-64">
                    <img
                      src="/bare-metal-server-rack-datacenter.jpg"
                      alt="Metal Instances"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Metal Plans */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-[#1a1f2e] border-slate-800">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Small</h3>
                    <p className="text-slate-400 text-sm mb-4">
                      Aislamiento total a precio asequible para alta frecuencia de cálculo
                    </p>
                    <div className="text-3xl font-bold text-cyan-400 mb-2">$0.545</div>
                    <p className="text-slate-500 text-sm">/hora</p>
                  </CardContent>
                </Card>
                <Card className="bg-[#1a1f2e] border-slate-800">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Medium</h3>
                    <p className="text-slate-400 text-sm mb-4">
                      Best-seller para aplicaciones distribuidas con balance perfecto
                    </p>
                    <div className="text-3xl font-bold text-cyan-400 mb-2">$0.927</div>
                    <p className="text-slate-500 text-sm">/hora</p>
                  </CardContent>
                </Card>
                <Card className="bg-[#1a1f2e] border-slate-800">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Large</h3>
                    <p className="text-slate-400 text-sm mb-4">
                      Mejor relación prestaciones-precio para usos intensivos
                    </p>
                    <div className="text-3xl font-bold text-cyan-400 mb-2">$1.58</div>
                    <p className="text-slate-500 text-sm">/hora</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          <div className="mt-16 bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Precios de Virtual Machine Instances</h2>

            {/* Tabs de precios */}
            <div className="flex flex-wrap gap-4 mb-8 border-b border-slate-800">
              <button
                onClick={() => setPricingTab("linux-hourly")}
                className={`pb-4 px-6 font-semibold transition-all text-sm ${
                  pricingTab === "linux-hourly"
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Linux - Por Horas
              </button>
              <button
                onClick={() => setPricingTab("windows-hourly")}
                className={`pb-4 px-6 font-semibold transition-all text-sm ${
                  pricingTab === "windows-hourly"
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Windows - Por Horas
              </button>
              <button
                onClick={() => setPricingTab("linux-monthly")}
                className={`pb-4 px-6 font-semibold transition-all text-sm ${
                  pricingTab === "linux-monthly"
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Linux - Mensual
              </button>
              <button
                onClick={() => setPricingTab("windows-monthly")}
                className={`pb-4 px-6 font-semibold transition-all text-sm ${
                  pricingTab === "windows-monthly"
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Windows - Mensual
              </button>
            </div>

            {/*Tabla Linux Por Horas */}
            {pricingTab === "linux-hourly" && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Modelo</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">vCore</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Memoria</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Almacenamiento Local</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Ancho de banda</th>
                      <th className="text-right py-3 px-4 text-slate-300 font-semibold">Precio/hora</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* General Purpose */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={6} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">General Purpose</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-2</td>
                      <td className="py-3 px-4 text-slate-300">1</td>
                      <td className="py-3 px-4 text-slate-300">2 GB</td>
                      <td className="py-3 px-4 text-slate-300">10 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 Mbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.009</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-4</td>
                      <td className="py-3 px-4 text-slate-300">1</td>
                      <td className="py-3 px-4 text-slate-300">4 GB</td>
                      <td className="py-3 px-4 text-slate-300">10 GB</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.018</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-8</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">8 GB</td>
                      <td className="py-3 px-4 text-slate-300">20 GB</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.036</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-16</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">40 GB</td>
                      <td className="py-3 px-4 text-slate-300">1 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.073</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-32</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">80 GB</td>
                      <td className="py-3 px-4 text-slate-300">2 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.146</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-64</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">160 GB</td>
                      <td className="py-3 px-4 text-slate-300">4 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.291</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-128</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">320 GB</td>
                      <td className="py-3 px-4 text-slate-300">8 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.583</td>
                    </tr>

                    {/* Compute Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={6} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Compute Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-2</td>
                      <td className="py-3 px-4 text-slate-300">1</td>
                      <td className="py-3 px-4 text-slate-300">2 GB</td>
                      <td className="py-3 px-4 text-slate-300">25 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 Mbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.018</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-4</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">4 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.036</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-8</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">8 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 GB</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.073</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-16</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">200 GB</td>
                      <td className="py-3 px-4 text-slate-300">1 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.146</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-32</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB</td>
                      <td className="py-3 px-4 text-slate-300">2 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.291</td>
                    </tr>

                    {/* Memory Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={6} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Memory Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-16</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">25 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 Mbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.036</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-32</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.073</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-64</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 GB</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.146</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-128</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">200 GB</td>
                      <td className="py-3 px-4 text-slate-300">1 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.291</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Tabla Windows Por Horas */}
            {pricingTab === "windows-hourly" && (
              <div className="overflow-x-auto">
                <div className="mb-4 p-4 bg-blue-950/30 border border-blue-500/30 rounded-lg">
                  <p className="text-slate-300 text-sm">
                    * El precio mostrado incluye el costo de la licencia Windows ($0.039 /vCore/hora).
                  </p>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Nombre</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Memoria</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">vCore</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Almacenamiento</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Red pública</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Red privada</th>
                      <th className="text-right py-3 px-4 text-slate-300 font-semibold">Precio /hora</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* General Purpose */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">General Purpose</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-8</td>
                      <td className="py-3 px-4 text-slate-300">8 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.1288</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-16</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.2576</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-32</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.5153</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-64</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.0305</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-128</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.0611</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-256</td>
                      <td className="py-3 px-4 text-slate-300">256 GB</td>
                      <td className="py-3 px-4 text-slate-300">64</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">16 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">16 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$4.1222</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-512</td>
                      <td className="py-3 px-4 text-slate-300">512 GB</td>
                      <td className="py-3 px-4 text-slate-300">128</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$8.2831</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-640</td>
                      <td className="py-3 px-4 text-slate-300">640 GB</td>
                      <td className="py-3 px-4 text-slate-300">160</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$10.3538</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-7</td>
                      <td className="py-3 px-4 text-slate-300">7 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">300 Mbit/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.211</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-15</td>
                      <td className="py-3 px-4 text-slate-300">15 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.387</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-30</td>
                      <td className="py-3 px-4 text-slate-300">30 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.651</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-60</td>
                      <td className="py-3 px-4 text-slate-300">60 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.972</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-120</td>
                      <td className="py-3 px-4 text-slate-300">120 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.579</td>
                    </tr>

                    {/* Compute Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Compute Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-4</td>
                      <td className="py-3 px-4 text-slate-300">4 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.1233</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-8</td>
                      <td className="py-3 px-4 text-slate-300">8 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.2467</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-16</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.4933</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-32</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.9867</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-64</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.9734</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-128</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">64</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$3.9468</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-256</td>
                      <td className="py-3 px-4 text-slate-300">256 GB</td>
                      <td className="py-3 px-4 text-slate-300">128</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$7.9282</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-320</td>
                      <td className="py-3 px-4 text-slate-300">320 GB</td>
                      <td className="py-3 px-4 text-slate-300">160</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$9.9102</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-7</td>
                      <td className="py-3 px-4 text-slate-300">7 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">300 Mbit/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.249</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-15</td>
                      <td className="py-3 px-4 text-slate-300">15 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.476</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-30</td>
                      <td className="py-3 px-4 text-slate-300">30 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.952</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-60</td>
                      <td className="py-3 px-4 text-slate-300">60 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.451</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-120</td>
                      <td className="py-3 px-4 text-slate-300">120 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.443</td>
                    </tr>

                    {/* Memory Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Memory Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-16</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.1438</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-32</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.2875</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-64</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.5751</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-128</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.1501</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-256</td>
                      <td className="py-3 px-4 text-slate-300">256 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.3002</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-512</td>
                      <td className="py-3 px-4 text-slate-300">512 GB</td>
                      <td className="py-3 px-4 text-slate-300">64</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$4.6005</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-1024</td>
                      <td className="py-3 px-4 text-slate-300">1.024 TB</td>
                      <td className="py-3 px-4 text-slate-300">128</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$9.251</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-15</td>
                      <td className="py-3 px-4 text-slate-300">15 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.277</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-30</td>
                      <td className="py-3 px-4 text-slate-300">30 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.465</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-60</td>
                      <td className="py-3 px-4 text-slate-300">60 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.636</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-120</td>
                      <td className="py-3 px-4 text-slate-300">120 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.927</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-240</td>
                      <td className="py-3 px-4 text-slate-300">240 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.579</td>
                    </tr>

                    {/* Storage Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Storage Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">i1-45</td>
                      <td className="py-3 px-4 text-slate-300">45 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD + 1.9 TB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.06</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">i1-90</td>
                      <td className="py-3 px-4 text-slate-300">90 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD + 2 x 1.9 TB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.576</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">i1-180</td>
                      <td className="py-3 px-4 text-slate-300">180 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD + 4 x 1.9 TB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.633</td>
                    </tr>

                    {/* Cloud GPU */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Cloud GPU</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">rtx5000-28</td>
                      <td className="py-3 px-4 text-slate-300">28 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.756</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">rtx5000-56</td>
                      <td className="py-3 px-4 text-slate-300">56 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.512</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">rtx5000-84</td>
                      <td className="py-3 px-4 text-slate-300">84 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.424</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t1-45</td>
                      <td className="py-3 px-4 text-slate-300">45 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.491</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t1-90</td>
                      <td className="py-3 px-4 text-slate-300">90 GB</td>
                      <td className="py-3 px-4 text-slate-300">18</td>
                      <td className="py-3 px-4 text-slate-300">800 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$4.415</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t1-180</td>
                      <td className="py-3 px-4 text-slate-300">180 GB</td>
                      <td className="py-3 px-4 text-slate-300">36</td>
                      <td className="py-3 px-4 text-slate-300">50 GB + 2 x 2 TB NVMe Passthrough</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$8.342</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t2-45</td>
                      <td className="py-3 px-4 text-slate-300">45 GB</td>
                      <td className="py-3 px-4 text-slate-300">15</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.63</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t2-90</td>
                      <td className="py-3 px-4 text-slate-300">90 GB</td>
                      <td className="py-3 px-4 text-slate-300">30</td>
                      <td className="py-3 px-4 text-slate-300">800 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$4.772</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t2-180</td>
                      <td className="py-3 px-4 text-slate-300">180 GB</td>
                      <td className="py-3 px-4 text-slate-300">60</td>
                      <td className="py-3 px-4 text-slate-300">50 GB + 2 x 2 TB NVMe Passthrough</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$9.056</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-4 p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
                  <p className="text-slate-400 text-sm">
                    Las instancias incluyen una dirección IPv4 por defecto, excepto en el caso de las instancias en
                    Local Zones, en las que las direcciones IP adicionales son de pago.
                  </p>
                </div>
              </div>
            )}

            {pricingTab === "linux-monthly" && (
              <div className="overflow-x-auto">
                <div className="mb-4 p-4 bg-blue-950/30 border border-blue-500/30 rounded-lg">
                  <p className="text-slate-300 text-sm">
                    * Precio para un Savings Plan de un mes. Puede consultar los precios de los Savings Plans para 6,
                    12, 24 y 36 meses en nuestra página dedicada Savings Plans.
                  </p>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Nombre</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Memoria</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">vCore</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Almacenamiento</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Red pública</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Red privada</th>
                      <th className="text-right py-3 px-4 text-slate-300 font-semibold">Precio /mes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* General Purpose */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">General Purpose</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-8</td>
                      <td className="py-3 px-4 text-slate-300">8 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$28.21 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-16</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$56.41 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-32</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$112.82 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-64</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$225.63 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-128</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$451.25 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-256</td>
                      <td className="py-3 px-4 text-slate-300">256 GB</td>
                      <td className="py-3 px-4 text-slate-300">64</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">16 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">16 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$902.50 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-512</td>
                      <td className="py-3 px-4 text-slate-300">512 GB</td>
                      <td className="py-3 px-4 text-slate-300">128</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,805 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-640</td>
                      <td className="py-3 px-4 text-slate-300">640 GB</td>
                      <td className="py-3 px-4 text-slate-300">160</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2,256.24 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-7</td>
                      <td className="py-3 px-4 text-slate-300">7 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">300 Mbit/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$29</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-15</td>
                      <td className="py-3 px-4 text-slate-300">15 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$55.40</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-30</td>
                      <td className="py-3 px-4 text-slate-300">30 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$112</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-60</td>
                      <td className="py-3 px-4 text-slate-300">60 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$218</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-120</td>
                      <td className="py-3 px-4 text-slate-300">120 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$429</td>
                    </tr>

                    {/* Compute Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Compute Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-4</td>
                      <td className="py-3 px-4 text-slate-300">4 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$82.11 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-8</td>
                      <td className="py-3 px-4 text-slate-300">8 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$164.21 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-16</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$328.41 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-32</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$656.82 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-64</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,313.63 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-128</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">64</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2,627.25 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-256</td>
                      <td className="py-3 px-4 text-slate-300">256 GB</td>
                      <td className="py-3 px-4 text-slate-300">128</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$5,254.50 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-320</td>
                      <td className="py-3 px-4 text-slate-300">320 GB</td>
                      <td className="py-3 px-4 text-slate-300">160</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$6,568.12 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-7</td>
                      <td className="py-3 px-4 text-slate-300">7 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">300 Mbit/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$90</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-15</td>
                      <td className="py-3 px-4 text-slate-300">15 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$155</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-30</td>
                      <td className="py-3 px-4 text-slate-300">30 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$288</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-60</td>
                      <td className="py-3 px-4 text-slate-300">60 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$462</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-120</td>
                      <td className="py-3 px-4 text-slate-300">120 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$807</td>
                    </tr>

                    {/* Memory Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Memory Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-16</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$36.50 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-32</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$73 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-64</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$146 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-128</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$291.99 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-256</td>
                      <td className="py-3 px-4 text-slate-300">256 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$583.97 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-512</td>
                      <td className="py-3 px-4 text-slate-300">512 GB</td>
                      <td className="py-3 px-4 text-slate-300">64</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,167.94 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-1024</td>
                      <td className="py-3 px-4 text-slate-300">1.024 TB</td>
                      <td className="py-3 px-4 text-slate-300">128</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2,335.88 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-15</td>
                      <td className="py-3 px-4 text-slate-300">15 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$42.20</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-30</td>
                      <td className="py-3 px-4 text-slate-300">30 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$48.80</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-60</td>
                      <td className="py-3 px-4 text-slate-300">60 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$636</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-120</td>
                      <td className="py-3 px-4 text-slate-300">120 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$927</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-240</td>
                      <td className="py-3 px-4 text-slate-300">240 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.501</td>
                    </tr>

                    {/* Storage Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Storage Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">i1-45</td>
                      <td className="py-3 px-4 text-slate-300">45 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD + 1.9 TB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$245</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">i1-90</td>
                      <td className="py-3 px-4 text-slate-300">90 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD + 2 x 1.9 TB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$490</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">i1-180</td>
                      <td className="py-3 px-4 text-slate-300">180 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD + 4 x 1.9 TB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$979</td>
                    </tr>

                    {/* Cloud GPU */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Cloud GPU</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">rtx5000-28</td>
                      <td className="py-3 px-4 text-slate-300">28 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$551.88</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">rtx5000-56</td>
                      <td className="py-3 px-4 text-slate-300">56 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,103.76</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">rtx5000-84</td>
                      <td className="py-3 px-4 text-slate-300">84 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,769.52</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t1-45</td>
                      <td className="py-3 px-4 text-slate-300">45 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,166</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t1-90</td>
                      <td className="py-3 px-4 text-slate-300">90 GB</td>
                      <td className="py-3 px-4 text-slate-300">18</td>
                      <td className="py-3 px-4 text-slate-300">800 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2,226</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t1-180</td>
                      <td className="py-3 px-4 text-slate-300">180 GB</td>
                      <td className="py-3 px-4 text-slate-300">36</td>
                      <td className="py-3 px-4 text-slate-300">50 GB + 2 x 2 TB NVMe Passthrough</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$4,332</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t2-45</td>
                      <td className="py-3 px-4 text-slate-300">45 GB</td>
                      <td className="py-3 px-4 text-slate-300">15</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,224</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t2-90</td>
                      <td className="py-3 px-4 text-slate-300">90 GB</td>
                      <td className="py-3 px-4 text-slate-300">30</td>
                      <td className="py-3 px-4 text-slate-300">800 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2,309</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t2-180</td>
                      <td className="py-3 px-4 text-slate-300">180 GB</td>
                      <td className="py-3 px-4 text-slate-300">60</td>
                      <td className="py-3 px-4 text-slate-300">50 GB + 2 x 2 TB NVMe Passthrough</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$4,430.49</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-4 p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
                  <p className="text-slate-400 text-sm">
                    Las instancias incluyen una dirección IPv4 por defecto, excepto en el caso de las instancias en
                    Local Zones, en las que las direcciones IP adicionales son de pago.
                  </p>
                </div>
              </div>
            )}

            {pricingTab === "linux-monthly" && (
              <div className="overflow-x-auto">
                <div className="mb-4 p-4 bg-blue-950/30 border border-blue-500/30 rounded-lg">
                  <p className="text-slate-300 text-sm">
                    * Precio para un Savings Plan de un mes. Puede consultar los precios de los Savings Plans para 6,
                    12, 24 y 36 meses en nuestra página dedicada Savings Plans.
                  </p>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Nombre</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Memoria</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">vCore</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Almacenamiento</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Red pública</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Red privada</th>
                      <th className="text-right py-3 px-4 text-slate-300 font-semibold">Precio /mes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* General Purpose */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">General Purpose</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-8</td>
                      <td className="py-3 px-4 text-slate-300">8 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$28.21 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-16</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$56.41 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-32</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$112.82 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-64</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$225.63 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-128</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$451.25 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-256</td>
                      <td className="py-3 px-4 text-slate-300">256 GB</td>
                      <td className="py-3 px-4 text-slate-300">64</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">16 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">16 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$902.50 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-512</td>
                      <td className="py-3 px-4 text-slate-300">512 GB</td>
                      <td className="py-3 px-4 text-slate-300">128</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,805 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-640</td>
                      <td className="py-3 px-4 text-slate-300">640 GB</td>
                      <td className="py-3 px-4 text-slate-300">160</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2,256.24 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-7</td>
                      <td className="py-3 px-4 text-slate-300">7 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">300 Mbit/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$29</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-15</td>
                      <td className="py-3 px-4 text-slate-300">15 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$55.40</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-30</td>
                      <td className="py-3 px-4 text-slate-300">30 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$112</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-60</td>
                      <td className="py-3 px-4 text-slate-300">60 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$218</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-120</td>
                      <td className="py-3 px-4 text-slate-300">120 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$429</td>
                    </tr>

                    {/* Compute Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Compute Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-4</td>
                      <td className="py-3 px-4 text-slate-300">4 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$25.17 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-8</td>
                      <td className="py-3 px-4 text-slate-300">8 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$50.33 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-16</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$100.65 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-32</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$201.30 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-64</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$402.59 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-128</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">64</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$805.17 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-256</td>
                      <td className="py-3 px-4 text-slate-300">256 GB</td>
                      <td className="py-3 px-4 text-slate-300">128</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,610.34 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-320</td>
                      <td className="py-3 px-4 text-slate-300">320 GB</td>
                      <td className="py-3 px-4 text-slate-300">160</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2,012.92 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-7</td>
                      <td className="py-3 px-4 text-slate-300">7 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">300 Mbit/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$249</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-15</td>
                      <td className="py-3 px-4 text-slate-300">15 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$476</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-30</td>
                      <td className="py-3 px-4 text-slate-300">30 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$952</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-60</td>
                      <td className="py-3 px-4 text-slate-300">60 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.451</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-120</td>
                      <td className="py-3 px-4 text-slate-300">120 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.443</td>
                    </tr>

                    {/* Memory Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Memory Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-16</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$36.50 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-32</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$73 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-64</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$146 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-128</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$291.99 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-256</td>
                      <td className="py-3 px-4 text-slate-300">256 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$583.97 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-512</td>
                      <td className="py-3 px-4 text-slate-300">512 GB</td>
                      <td className="py-3 px-4 text-slate-300">64</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,167.94 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-1024</td>
                      <td className="py-3 px-4 text-slate-300">1.024 TB</td>
                      <td className="py-3 px-4 text-slate-300">128</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2,335.88 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-15</td>
                      <td className="py-3 px-4 text-slate-300">15 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$42.20</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-30</td>
                      <td className="py-3 px-4 text-slate-300">30 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$48.80</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-60</td>
                      <td className="py-3 px-4 text-slate-300">60 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$636</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-120</td>
                      <td className="py-3 px-4 text-slate-300">120 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$927</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-240</td>
                      <td className="py-3 px-4 text-slate-300">240 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.501</td>
                    </tr>

                    {/* Storage Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Storage Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">i1-45</td>
                      <td className="py-3 px-4 text-slate-300">45 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD + 1.9 TB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$245</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">i1-90</td>
                      <td className="py-3 px-4 text-slate-300">90 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD + 2 x 1.9 TB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$490</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">i1-180</td>
                      <td className="py-3 px-4 text-slate-300">180 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD + 4 x 1.9 TB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$979</td>
                    </tr>

                    {/* Cloud GPU */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Cloud GPU</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">rtx5000-28</td>
                      <td className="py-3 px-4 text-slate-300">28 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$551.88</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">rtx5000-56</td>
                      <td className="py-3 px-4 text-slate-300">56 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,103.76</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">rtx5000-84</td>
                      <td className="py-3 px-4 text-slate-300">84 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,769.52</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t1-45</td>
                      <td className="py-3 px-4 text-slate-300">45 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,166</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t1-90</td>
                      <td className="py-3 px-4 text-slate-300">90 GB</td>
                      <td className="py-3 px-4 text-slate-300">18</td>
                      <td className="py-3 px-4 text-slate-300">800 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2,226</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t1-180</td>
                      <td className="py-3 px-4 text-slate-300">180 GB</td>
                      <td className="py-3 px-4 text-slate-300">36</td>
                      <td className="py-3 px-4 text-slate-300">50 GB + 2 x 2 TB NVMe Passthrough</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$4,332</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t2-45</td>
                      <td className="py-3 px-4 text-slate-300">45 GB</td>
                      <td className="py-3 px-4 text-slate-300">15</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,224</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t2-90</td>
                      <td className="py-3 px-4 text-slate-300">90 GB</td>
                      <td className="py-3 px-4 text-slate-300">30</td>
                      <td className="py-3 px-4 text-slate-300">800 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2,309</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t2-180</td>
                      <td className="py-3 px-4 text-slate-300">180 GB</td>
                      <td className="py-3 px-4 text-slate-300">60</td>
                      <td className="py-3 px-4 text-slate-300">50 GB + 2 x 2 TB NVMe Passthrough</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$4,430.49</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-4 p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
                  <p className="text-slate-400 text-sm">
                    Las instancias incluyen una dirección IPv4 por defecto, excepto en el caso de las instancias en
                    Local Zones, en las que las direcciones IP adicionales son de pago.
                  </p>
                </div>
              </div>
            )}

            {pricingTab === "windows-monthly" && (
              <div className="overflow-x-auto">
                <div className="mb-4 p-4 bg-blue-950/30 border border-blue-500/30 rounded-lg">
                  <p className="text-slate-300 text-sm">
                    * Precio para un Savings Plan de un mes. En el caso de las instancias Windows, el precio mostrado
                    incluye el precio de la licencia ( $0.039 /vCore/hora ). Puede consultar los precios de los Savings
                    Plans para 6, 12, 24 y 36 meses en nuestra página dedicada Savings Plans.
                  </p>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Nombre</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Memoria</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">vCore</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Almacenamiento</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Red pública</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Red privada</th>
                      <th className="text-right py-3 px-4 text-slate-300 font-semibold">Precio /mes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* General Purpose */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">General Purpose</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-8</td>
                      <td className="py-3 px-4 text-slate-300">8 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$85.15 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-16</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$170.29 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-32</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$340.58 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-64</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$681.15 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-128</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,362.29 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-256</td>
                      <td className="py-3 px-4 text-slate-300">256 GB</td>
                      <td className="py-3 px-4 text-slate-300">64</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">16 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">16 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2,724.58 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-512</td>
                      <td className="py-3 px-4 text-slate-300">512 GB</td>
                      <td className="py-3 px-4 text-slate-300">128</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$5,449.16 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-640</td>
                      <td className="py-3 px-4 text-slate-300">640 GB</td>
                      <td className="py-3 px-4 text-slate-300">160</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$6,811.44 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-7</td>
                      <td className="py-3 px-4 text-slate-300">7 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">300 Mbit/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$76</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-15</td>
                      <td className="py-3 px-4 text-slate-300">15 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$122</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-30</td>
                      <td className="py-3 px-4 text-slate-300">30 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$194</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-60</td>
                      <td className="py-3 px-4 text-slate-300">60 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$308</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-120</td>
                      <td className="py-3 px-4 text-slate-300">120 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$525</td>
                    </tr>

                    {/* Compute Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Compute Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-4</td>
                      <td className="py-3 px-4 text-slate-300">4 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$144.35 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-8</td>
                      <td className="py-3 px-4 text-slate-300">8 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$288.70 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-16</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$577.40 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-32</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,154.81 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-64</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2,309.62 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-128</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">64</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$4,619.23 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-256</td>
                      <td className="py-3 px-4 text-slate-300">256 GB</td>
                      <td className="py-3 px-4 text-slate-300">128</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$9,238.47 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-320</td>
                      <td className="py-3 px-4 text-slate-300">320 GB</td>
                      <td className="py-3 px-4 text-slate-300">160</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$11,548.09 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-7</td>
                      <td className="py-3 px-4 text-slate-300">7 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">300 Mbit/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$110</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-15</td>
                      <td className="py-3 px-4 text-slate-300">15 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$208</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-30</td>
                      <td className="py-3 px-4 text-slate-300">30 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$388</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-60</td>
                      <td className="py-3 px-4 text-slate-300">60 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$750</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-120</td>
                      <td className="py-3 px-4 text-slate-300">120 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,350</td>
                    </tr>

                    {/* Memory Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Memory Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-16</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$36.50 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-32</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$73 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-64</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$146 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-128</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$291.99 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-256</td>
                      <td className="py-3 px-4 text-slate-300">256 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$583.97 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-512</td>
                      <td className="py-3 px-4 text-slate-300">512 GB</td>
                      <td className="py-3 px-4 text-slate-300">64</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,167.94 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-1024</td>
                      <td className="py-3 px-4 text-slate-300">1.024 TB</td>
                      <td className="py-3 px-4 text-slate-300">128</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2,335.88 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-15</td>
                      <td className="py-3 px-4 text-slate-300">15 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$42.20</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-30</td>
                      <td className="py-3 px-4 text-slate-300">30 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$48.80</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-60</td>
                      <td className="py-3 px-4 text-slate-300">60 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$636</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-120</td>
                      <td className="py-3 px-4 text-slate-300">120 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$927</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-240</td>
                      <td className="py-3 px-4 text-slate-300">240 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.501</td>
                    </tr>

                    {/* Storage Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Storage Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">i1-45</td>
                      <td className="py-3 px-4 text-slate-300">45 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD + 1.9 TB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$245</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">i1-90</td>
                      <td className="py-3 px-4 text-slate-300">90 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD + 2 x 1.9 TB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$490</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">i1-180</td>
                      <td className="py-3 px-4 text-slate-300">180 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD + 4 x 1.9 TB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$979</td>
                    </tr>

                    {/* Discovery */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Discovery</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">d2-2</td>
                      <td className="py-3 px-4 text-slate-300">2 GB</td>
                      <td className="py-3 px-4 text-slate-300">1</td>
                      <td className="py-3 px-4 text-slate-300">25 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 Mbit/s</td>
                      <td className="py-3 px-4 text-slate-300">100 Mbit/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$6.57</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">d2-4</td>
                      <td className="py-3 px-4 text-slate-300">4 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$13.20</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">d2-8</td>
                      <td className="py-3 px-4 text-slate-300">8 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">50 GB</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$23.70</td>
                    </tr>

                    {/* Cloud GPU */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Cloud GPU</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">rtx5000-28</td>
                      <td className="py-3 px-4 text-slate-300">28 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$551.88</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">rtx5000-56</td>
                      <td className="py-3 px-4 text-slate-300">56 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,103.76</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">rtx5000-84</td>
                      <td className="py-3 px-4 text-slate-300">84 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,769.52</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t1-45</td>
                      <td className="py-3 px-4 text-slate-300">45 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,166</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t1-90</td>
                      <td className="py-3 px-4 text-slate-300">90 GB</td>
                      <td className="py-3 px-4 text-slate-300">18</td>
                      <td className="py-3 px-4 text-slate-300">800 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2,226</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t1-180</td>
                      <td className="py-3 px-4 text-slate-300">180 GB</td>
                      <td className="py-3 px-4 text-slate-300">36</td>
                      <td className="py-3 px-4 text-slate-300">50 GB + 2 x 2 TB NVMe Passthrough</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$4,332</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t2-45</td>
                      <td className="py-3 px-4 text-slate-300">45 GB</td>
                      <td className="py-3 px-4 text-slate-300">15</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,224</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t2-90</td>
                      <td className="py-3 px-4 text-slate-300">90 GB</td>
                      <td className="py-3 px-4 text-slate-300">30</td>
                      <td className="py-3 px-4 text-slate-300">800 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2,309</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t2-180</td>
                      <td className="py-3 px-4 text-slate-300">180 GB</td>
                      <td className="py-3 px-4 text-slate-300">60</td>
                      <td className="py-3 px-4 text-slate-300">50 GB + 2 x 2 TB NVMe Passthrough</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$4,430.49</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-4 p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
                  <p className="text-slate-400 text-sm">
                    Las instancias incluyen una dirección IPv4 por defecto, excepto en el caso de las instancias en
                    Local Zones, en las que las direcciones IP adicionales son de pago.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Características comunes */}
          <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-8 mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Una gama que evoluciona con sus necesidades</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Shield className="w-10 h-10 text-cyan-400" />
                <h4 className="text-white font-semibold">Para todos los usos</h4>
                <p className="text-slate-400 text-sm">
                  Amplia gama diseñada para adaptarse a todas sus necesidades, desde aplicaciones hasta inteligencia
                  artificial
                </p>
              </div>
              <div className="space-y-3">
                <Zap className="w-10 h-10 text-cyan-400" />
                <h4 className="text-white font-semibold">Flexibilidad y escalabilidad</h4>
                <p className="text-slate-400 text-sm">
                  Solución cloud sin compromiso con facturación por horas y escalado instantáneo
                </p>
              </div>
              <div className="space-y-3">
                <Globe className="w-10 h-10 text-cyan-400" />
                <h4 className="text-white font-semibold">Disponibilidad mundial</h4>
                <p className="text-slate-400 text-sm">
                  Despliegue en todo el mundo con Local Zones y regiones específicas
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-8 mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Complete su solución</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Database className="w-12 h-12 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Instance Backup</h3>
                <p className="text-slate-400">
                  La solución Instance Backup replica estos datos en un sistema de almacenamiento diferente y garantiza
                  la triple replicación, asegurando así la máxima fiabilidad de la copia de seguridad.
                </p>
              </div>
              <div className="space-y-4">
                <Images className="w-12 h-12 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Private Image Catalog</h3>
                <p className="text-slate-400">
                  Ponga a disposición de sus instancias sistemas operativos específicamente configurados para su uso o
                  dispositivos provistos por un editor.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-950/50 to-blue-950/50 border border-cyan-500/30 rounded-lg p-8 mt-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">¿Por qué elegir Titano Cloud?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Accesibilidad y reversibilidad</h3>
                <p className="text-slate-400">
                  Disfrute de servicios cloud accesibles y reversibles. En Titano Cloud valoramos la libre elección y la
                  independencia con respecto a los diferentes proveedores informáticos. Usted controla su
                  infraestructura: migre sus datos fácilmente y sin restricciones.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Instancias Compute sostenibles</h3>
                <p className="text-slate-400">
                  Gracias a nuestro sistema de refrigeración líquida (watercooling), nuestros datacenters funcionan sin
                  climatización. ¿El resultado? Nuestra huella de carbono y la suya se reducen. Nuestro control sobre la
                  cadena de producción también nos permite realizar una gestión responsable y eficiente de nuestras
                  infraestructuras para ofrecer un cloud sostenible.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Lock className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Soberanía y seguridad de los datos</h3>
                <p className="text-slate-400">
                  Mantenga el control sobre sus datos y disfrute del nivel más exigente de seguridad. Aloje sus datos,
                  así como los datos de sus clientes, en un entorno certificado y conforme. Nuestro sistema anti-DDoS y
                  un cifrado completo protegen sus datos en todo momento (incluyendo los datos de salud HDS).
                  Garantizamos su disponibilidad en nuestras regiones 1-AZ y 3-AZ.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-500 rounded-lg p-8 text-center mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Comience con $300 en Créditos Gratis</h2>
            <p className="text-slate-300 mb-6">Pruebe cualquier servicio de Public Cloud sin costo durante 60 días</p>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Activar Prueba Gratuita
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
