"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Cpu, Check, Zap, Server, HardDrive } from "lucide-react"

export default function GPUServersPage() {
  const gpuServers = [
    {
      name: "Scale-GPU-1 2024",
      gpu: "NVIDIA A100 40GB",
      cpu: "AMD EPYC GENOA 9354",
      cores: "32c/64t - 3.25GHz/3.8GHz",
      ram: "192GB-1.125TB",
      storage: "2x1.92TB hasta 2x7.68TB",
      bandwidth: "5-25 Gbps público, 50 Gbps privado",
      price: 1145,
      features: ["Deep Learning", "AI Training", "Renderizado 3D", "Computación Científica"],
    },
    {
      name: "Scale-GPU-2 2024",
      gpu: "NVIDIA A100 80GB",
      cpu: "AMD EPYC GENOA 9454",
      cores: "48c/96t - 2.75GHz/3.8GHz",
      ram: "192GB-1.125TB",
      storage: "2x1.92TB hasta 2x7.68TB",
      bandwidth: "5-25 Gbps público, 50 Gbps privado",
      price: 1180,
      features: ["Modelos LLM", "AI Inference", "Computer Vision", "HPC"],
      popular: true,
    },
    {
      name: "Scale-GPU-3 2024",
      gpu: "NVIDIA H100 80GB",
      cpu: "AMD EPYC GENOA 9554",
      cores: "64c/128t - 3.1GHz/3.75GHz",
      ram: "192GB-1.125TB",
      storage: "2x1.92TB hasta 2x7.68TB",
      bandwidth: "5-25 Gbps público, 50 Gbps privado",
      price: 1216,
      features: ["GPT Training", "Stable Diffusion", "Análisis Big Data", "Simulaciones"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-6">
          <Zap className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold">Servidores GPU</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600 bg-clip-text text-transparent">
          Aceleración GPU para IA y HPC
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Servidores equipados con GPUs NVIDIA de última generación para Machine Learning, Deep Learning y computación
          de alto rendimiento
        </p>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {gpuServers.map((server) => (
            <Card
              key={server.name}
              className={`bg-slate-900 ${server.popular ? "border-2 border-cyan-500" : "border-slate-800"}`}
            >
              {server.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                  MÁS POPULAR
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-white">{server.name}</CardTitle>
                <p className="text-cyan-400 font-semibold">{server.gpu}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span>{server.cpu}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Server className="w-4 h-4 text-cyan-400" />
                    <span>{server.ram}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <HardDrive className="w-4 h-4 text-cyan-400" />
                    <span>{server.storage}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-800">
                  <p className="text-slate-400 text-sm mb-3">Casos de uso:</p>
                  <div className="space-y-2">
                    {server.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-slate-300 text-xs">
                        <Check className="w-3 h-3 text-cyan-400" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">${server.price}</span>
                    <span className="text-slate-400">/mes</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${server.popular ? "bg-cyan-500 hover:bg-cyan-600" : "bg-slate-800 hover:bg-slate-700"} text-white`}
                >
                  Configurar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 bg-slate-950/50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">¿Por qué elegir nuestros servidores GPU?</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Zap className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Rendimiento Extremo</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-400">
              GPUs NVIDIA A100 y H100 con Tensor Cores para acelerar tus cargas de trabajo de IA hasta 20x
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Server className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Red de Alta Velocidad</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-400">
              Hasta 100 Gbps de red privada para comunicación rápida entre nodos en clusters GPU
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Check className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Software Preinstalado</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-400">
              CUDA, cuDNN, TensorFlow, PyTorch y más frameworks listos para usar
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
