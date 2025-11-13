"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function MetalPreciosPage() {
  const metalPlans = [
    {
      name: "Small",
      cpu: "8 cores @ 3.4 GHz",
      ram: "32 GB DDR4",
      storage: "2x 960 GB SSD NVMe",
      bandwidth: "1 Gbps",
      price: 0.545,
      image: "/small-bare-metal-server.jpg",
      features: [
        "Intel Xeon E-2388G",
        "32 GB RAM ECC",
        "2x 960 GB NVMe RAID",
        "Sin virtualización",
        "Tráfico ilimitado",
      ],
    },
    {
      name: "Medium",
      cpu: "16 cores @ 2.9 GHz",
      ram: "128 GB DDR4",
      storage: "2x 960 GB SSD NVMe",
      bandwidth: "2 Gbps",
      price: 0.927,
      recommended: true,
      image: "/medium-bare-metal-server.jpg",
      features: ["AMD EPYC 7443P", "128 GB RAM ECC", "2x 960 GB NVMe RAID", "Hardware dedicado", "Protección DDoS"],
    },
    {
      name: "Large",
      cpu: "32 cores @ 2.45 GHz",
      ram: "256 GB DDR4",
      storage: "4x 960 GB SSD NVMe",
      bandwidth: "4 Gbps",
      price: 1.58,
      image: "/large-bare-metal-server.jpg",
      features: ["AMD EPYC 7543P", "256 GB RAM ECC", "4x 960 GB NVMe RAID", "Máximo rendimiento", "Automatización API"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#0f1419] to-[#0a0e1a]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">Precios Metal Instances</h1>
            <p className="text-xl text-slate-300">Servidores bare metal con flexibilidad cloud</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {metalPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`bg-slate-900 ${plan.recommended ? "border-2 border-cyan-500 relative" : "border-slate-800"} hover:border-cyan-500/50 transition-all`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                    Best Seller
                  </div>
                )}
                <CardHeader className="text-center">
                  <img
                    src={plan.image || "/placeholder.svg"}
                    alt={plan.name}
                    className="w-24 h-24 mx-auto mb-4 object-contain"
                  />
                  <CardTitle className="text-3xl text-white mb-2">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-2 mt-4">
                    <span className="text-sm text-slate-400">Desde</span>
                    <span className="text-5xl font-bold text-white">${plan.price}</span>
                    <span className="text-slate-400">/hora</span>
                  </div>
                  <p className="text-sm text-slate-500">~${(plan.price * 730).toFixed(2)}/mes</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-t border-slate-800 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">CPU</span>
                      <span className="text-white font-semibold">{plan.cpu}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">RAM</span>
                      <span className="text-white font-semibold">{plan.ram}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Storage</span>
                      <span className="text-white font-semibold">{plan.storage}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Ancho de banda</span>
                      <span className="text-white font-semibold">{plan.bandwidth}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-800 pt-4 space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-slate-300 text-sm">
                        <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full mt-6 ${plan.recommended ? "bg-cyan-500 hover:bg-cyan-600" : "bg-blue-600 hover:bg-blue-700"}`}
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
