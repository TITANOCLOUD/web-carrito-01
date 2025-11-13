"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function GPUPreciosPage() {
  const gpuPlans = [
    {
      name: "NVIDIA H100",
      model: "H100",
      memory: "80 GB HBM2e",
      pcie: "PCIe 5.0",
      price: 2.99,
      image: "/nvidia-h100-gpu.png",
      features: ["80 GB HBM2e", "Inferencia LLM", "Deep Learning", "Redes neuronales complejas", "Hasta 25 Gb/s red"],
      recommended: true,
    },
    {
      name: "NVIDIA L40S",
      model: "L40S",
      memory: "48 GB GDDR6",
      pcie: "PCIe 4.0",
      price: 1.8,
      image: "/nvidia-l40s-gpu.jpg",
      features: ["48 GB GDDR6", "IA Generativa", "Gráficos 3D", "Renderizado", "Inferencia ML"],
    },
    {
      name: "NVIDIA A10",
      model: "A10",
      memory: "24 GB GDDR6",
      pcie: "PCIe 4.0",
      price: 1.0,
      image: "/nvidia-a10-gpu.jpg",
      features: ["24 GB GDDR6", "Inferencia IA", "Virtualización", "Escritorios gráficos", "Producción ML"],
    },
    {
      name: "NVIDIA V100S",
      model: "V100S",
      memory: "32 GB HBM2",
      pcie: "PCIe 3.0",
      price: 0.88,
      image: "/nvidia-v100s-gpu.jpg",
      features: ["32 GB HBM2", "Deep Learning", "Machine Learning", "Cálculo científico", "HPC"],
    },
    {
      name: "NVIDIA L4",
      model: "L4",
      memory: "24 GB GDDR6",
      pcie: "PCIe 4.0",
      price: 1.0,
      image: "/nvidia-l4-gpu.jpg",
      features: ["24 GB GDDR6", "Universal", "Bajo consumo", "IA y vídeo", "Escritorio remoto"],
    },
    {
      name: "NVIDIA RTX 5000",
      model: "RTX 5000",
      memory: "16 GB GDDR6",
      pcie: "PCIe 3.0",
      price: 0.6,
      image: "/nvidia-quadro-rtx-5000.jpg",
      features: ["16 GB GDDR6", "Visualización 3D", "Renderizado", "Inferencia IA", "Creación de contenido"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#0f1419] to-[#0a0e1a]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">Precios Cloud GPU</h1>
            <p className="text-xl text-slate-300">Aceleración GPU para IA y ML</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gpuPlans.map((plan) => (
              <Card
                key={plan.model}
                className={`bg-slate-900 ${plan.recommended ? "border-2 border-cyan-500 relative" : "border-slate-800"} hover:border-cyan-500/50 transition-all`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                    Más Potente
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl font-bold text-cyan-400">{plan.model}</div>
                    <img src={plan.image || "/placeholder.svg"} alt={plan.name} className="w-20 h-20 object-contain" />
                  </div>
                  <CardTitle className="text-xl text-white">{plan.name}</CardTitle>
                  <p className="text-slate-400 text-sm">
                    {plan.memory} - {plan.pcie}
                  </p>
                  <div className="flex items-baseline gap-2 mt-4">
                    <span className="text-sm text-slate-400">Desde</span>
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-slate-400">/hora</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-slate-300 text-sm">
                      <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  <Button
                    className={`w-full mt-4 ${plan.recommended ? "bg-cyan-500 hover:bg-cyan-600" : "bg-blue-600 hover:bg-blue-700"}`}
                  >
                    Contratar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
