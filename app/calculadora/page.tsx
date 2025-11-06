"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Calculator, TrendingDown, Check, ArrowRight } from "lucide-react"
import { useState } from "react"

export default function CalculadoraPage() {
  const [cpu, setCpu] = useState(4)
  const [ram, setRam] = useState(8)
  const [storage, setStorage] = useState(160)
  const [bandwidth, setBandwidth] = useState(1000)
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")

  // Pricing formulas for each provider (simplified estimates)
  const calculateAzure = () => {
    const baseCost = cpu * 35 + ram * 4.5 + storage * 0.15 + bandwidth * 0.08
    return billingPeriod === "yearly" ? baseCost * 12 * 0.9 : baseCost
  }

  const calculateAWS = () => {
    const baseCost = cpu * 32 + ram * 4.2 + storage * 0.12 + bandwidth * 0.09
    return billingPeriod === "yearly" ? baseCost * 12 * 0.88 : baseCost
  }

  const calculateOVH = () => {
    const baseCost = cpu * 18 + ram * 2.8 + storage * 0.08 + bandwidth * 0.02
    return billingPeriod === "yearly" ? baseCost * 12 * 0.85 : baseCost
  }

  const calculateTitano = () => {
    const baseCost = cpu * 12 + ram * 2.2 + storage * 0.05 + bandwidth * 0.01
    return billingPeriod === "yearly" ? baseCost * 12 * 0.8 : baseCost
  }

  const azurePrice = calculateAzure()
  const awsPrice = calculateAWS()
  const ovhPrice = calculateOVH()
  const titanoPrice = calculateTitano()

  const prices = [
    { name: "Azure", price: azurePrice, color: "from-blue-500 to-cyan-500", logo: "🔷" },
    { name: "AWS", price: awsPrice, color: "from-orange-500 to-yellow-500", logo: "🟧" },
    { name: "OVHcloud", price: ovhPrice, color: "from-blue-600 to-blue-400", logo: "🔵" },
    { name: "Titano Cloud", price: titanoPrice, color: "from-cyan-500 to-blue-600", logo: "⚡" },
  ].sort((a, b) => a.price - b.price)

  const cheapest = prices[0]
  const savingsVsAzure = ((azurePrice - titanoPrice) / azurePrice) * 100
  const savingsVsAWS = ((awsPrice - titanoPrice) / awsPrice) * 100
  const savingsVsOVH = ((ovhPrice - titanoPrice) / ovhPrice) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Calculator className="w-12 h-12 text-cyan-400" />
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Calculadora de Costos VPS
          </h1>
        </div>
        <p className="text-xl text-slate-300 mb-4 max-w-3xl mx-auto">
          Compara precios entre los principales proveedores de cloud
        </p>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Configura las especificaciones de tu servidor y descubre cuánto puedes ahorrar con Titano Cloud
        </p>
      </section>

      {/* Calculator Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Configura tu Servidor</CardTitle>
              <CardDescription className="text-slate-400">
                Ajusta las especificaciones según tus necesidades
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* CPU Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-medium">CPU (vCores)</label>
                  <span className="text-cyan-400 font-bold text-lg">{cpu} vCPU</span>
                </div>
                <Slider
                  value={[cpu]}
                  onValueChange={(value) => setCpu(value[0])}
                  min={1}
                  max={32}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>1 vCPU</span>
                  <span>32 vCPU</span>
                </div>
              </div>

              {/* RAM Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-medium">Memoria RAM (GB)</label>
                  <span className="text-cyan-400 font-bold text-lg">{ram} GB</span>
                </div>
                <Slider
                  value={[ram]}
                  onValueChange={(value) => setRam(value[0])}
                  min={2}
                  max={128}
                  step={2}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>2 GB</span>
                  <span>128 GB</span>
                </div>
              </div>

              {/* Storage Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-medium">Almacenamiento SSD (GB)</label>
                  <span className="text-cyan-400 font-bold text-lg">{storage} GB</span>
                </div>
                <Slider
                  value={[storage]}
                  onValueChange={(value) => setStorage(value[0])}
                  min={20}
                  max={2000}
                  step={20}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>20 GB</span>
                  <span>2000 GB</span>
                </div>
              </div>

              {/* Bandwidth Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-medium">Ancho de Banda (GB/mes)</label>
                  <span className="text-cyan-400 font-bold text-lg">
                    {bandwidth >= 10000 ? "Ilimitado" : `${bandwidth} GB`}
                  </span>
                </div>
                <Slider
                  value={[bandwidth]}
                  onValueChange={(value) => setBandwidth(value[0])}
                  min={100}
                  max={10000}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>100 GB</span>
                  <span>Ilimitado</span>
                </div>
              </div>

              {/* Billing Period Toggle */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <label className="text-slate-200 font-medium block">Período de Facturación</label>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setBillingPeriod("monthly")}
                    variant={billingPeriod === "monthly" ? "default" : "outline"}
                    className={
                      billingPeriod === "monthly"
                        ? "flex-1 bg-cyan-500 hover:bg-cyan-600"
                        : "flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                    }
                  >
                    Mensual
                  </Button>
                  <Button
                    onClick={() => setBillingPeriod("yearly")}
                    variant={billingPeriod === "yearly" ? "default" : "outline"}
                    className={
                      billingPeriod === "yearly"
                        ? "flex-1 bg-cyan-500 hover:bg-cyan-600"
                        : "flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                    }
                  >
                    Anual (Ahorra hasta 20%)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Comparación de Precios</CardTitle>
                <CardDescription className="text-slate-400">
                  Precios estimados {billingPeriod === "monthly" ? "mensuales" : "anuales"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {prices.map((provider, index) => (
                  <div
                    key={provider.name}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      index === 0
                        ? "border-green-500 bg-green-500/10"
                        : "border-slate-700 bg-slate-950/50 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{provider.logo}</span>
                        <div>
                          <h3 className="text-lg font-bold text-white">{provider.name}</h3>
                          {index === 0 && <span className="text-xs text-green-400 font-semibold">✓ Mejor Precio</span>}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">${provider.price.toFixed(2)}</p>
                        <p className="text-xs text-slate-400">{billingPeriod === "monthly" ? "/mes" : "/año"}</p>
                      </div>
                    </div>
                    {index > 0 && (
                      <div className="flex items-center gap-2 text-sm text-slate-400 mt-2">
                        <TrendingDown className="w-4 h-4 text-red-400" />
                        <span>
                          ${(provider.price - cheapest.price).toFixed(2)} más caro que {cheapest.name}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Savings Card */}
            <Card className="bg-gradient-to-br from-green-900/30 via-slate-900 to-slate-900 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <TrendingDown className="w-6 h-6 text-green-400" />
                  Ahorro con Titano Cloud
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg">
                    <span className="text-slate-300">vs Azure</span>
                    <span className="text-green-400 font-bold text-lg">-{savingsVsAzure.toFixed(0)}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg">
                    <span className="text-slate-300">vs AWS</span>
                    <span className="text-green-400 font-bold text-lg">-{savingsVsAWS.toFixed(0)}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg">
                    <span className="text-slate-300">vs OVHcloud</span>
                    <span className="text-green-400 font-bold text-lg">-{savingsVsOVH.toFixed(0)}%</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <p className="text-slate-300 mb-2">Ahorro total anual estimado:</p>
                  <p className="text-3xl font-bold text-green-400">${((azurePrice - titanoPrice) * 12).toFixed(2)}</p>
                  <p className="text-sm text-slate-500 mt-1">comparado con Azure</p>
                </div>

                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-6 text-lg">
                  Comenzar con Titano Cloud
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-white mb-4">¿Por qué Titano Cloud es más económico?</CardTitle>
            <CardDescription className="text-slate-400 text-lg">
              Optimización de costos sin sacrificar calidad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Infraestructura Propia</h3>
                <p className="text-slate-400">Sin intermediarios, controlamos toda la cadena de valor</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Eficiencia Energética</h3>
                <p className="text-slate-400">Centros de datos optimizados reducen costos operativos</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Sin Costos Ocultos</h3>
                <p className="text-slate-400">Precio transparente, pagas solo por lo que usas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="container mx-auto px-4"></div>
      </footer>
    </div>
  )
}
