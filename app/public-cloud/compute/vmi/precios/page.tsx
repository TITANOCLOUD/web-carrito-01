"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function VMIPreciosPage() {
  const plans = [
    {
      name: "B2-7",
      type: "General Purpose",
      vcpu: 2,
      ram: 7,
      storage: 50,
      price: 0.04,
      features: ["2 vCPUs", "7 GB RAM", "50 GB SSD NVMe", "Tráfico ilimitado", "Backup incluido"],
    },
    {
      name: "B2-15",
      type: "General Purpose",
      vcpu: 4,
      ram: 15,
      storage: 100,
      price: 0.08,
      featured: true,
      features: ["4 vCPUs", "15 GB RAM", "100 GB SSD NVMe", "Tráfico ilimitado", "Backup incluido"],
    },
    {
      name: "C2-7",
      type: "Compute Optimized",
      vcpu: 2,
      ram: 7,
      storage: 50,
      price: 0.06,
      features: ["2 vCPUs", "7 GB RAM", "50 GB SSD NVMe", "CPU alta frecuencia", "Backup incluido"],
    },
    {
      name: "C2-15",
      type: "Compute Optimized",
      vcpu: 4,
      ram: 15,
      storage: 100,
      price: 0.12,
      features: ["4 vCPUs", "15 GB RAM", "100 GB SSD NVMe", "CPU alta frecuencia", "Backup incluido"],
    },
    {
      name: "R2-15",
      type: "Memory Optimized",
      vcpu: 2,
      ram: 15,
      storage: 50,
      price: 0.08,
      features: ["2 vCPUs", "15 GB RAM", "50 GB SSD NVMe", "Ratio 1:8 CPU:RAM", "Backup incluido"],
    },
    {
      name: "R2-30",
      type: "Memory Optimized",
      vcpu: 2,
      ram: 30,
      storage: 50,
      price: 0.16,
      features: ["2 vCPUs", "30 GB RAM", "50 GB SSD NVMe", "Ratio 1:8 CPU:RAM", "Backup incluido"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#0f1419] to-[#0a0e1a]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">Precios Virtual Machine Instances</h1>
            <p className="text-xl text-slate-300">Instancias flexibles con facturación por hora</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`bg-slate-900 ${plan.featured ? "border-2 border-cyan-500 relative" : "border-slate-800"} hover:border-cyan-500/50 transition-all`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                    Recomendado
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                    <img src="/server-instance-icon.jpg" alt="" className="w-10 h-10" />
                  </div>
                  <p className="text-cyan-400 text-sm font-semibold">{plan.type}</p>
                  <div className="flex items-baseline gap-2 mt-4">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-slate-400">/hora</span>
                  </div>
                  <p className="text-sm text-slate-500">~${(plan.price * 730).toFixed(2)}/mes</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-slate-300 text-sm">
                      <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  <Button
                    className={`w-full mt-4 ${plan.featured ? "bg-cyan-500 hover:bg-cyan-600" : "bg-blue-600 hover:bg-blue-700"}`}
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
