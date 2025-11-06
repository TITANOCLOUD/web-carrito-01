"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { Server, Check, Cpu, HardDrive, Network, Shield, Zap, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function VPSPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const vpsPlans = [
    {
      name: "VPS Básico",
      cpu: "2 vCPU",
      ram: "4 GB RAM",
      storage: "80 GB SSD NVMe",
      bandwidth: "Ilimitado",
      price: "$15",
      features: ["Panel cPanel", "SSL gratuito", "Backup semanal", "Soporte 24/7"],
    },
    {
      name: "VPS Pro",
      cpu: "4 vCPU",
      ram: "8 GB RAM",
      storage: "160 GB SSD NVMe",
      bandwidth: "Ilimitado",
      price: "$35",
      features: ["Todo de Básico", "Backup diario", "CDN incluido", "Soporte prioritario"],
      popular: true,
    },
    {
      name: "VPS Enterprise",
      cpu: "8 vCPU",
      ram: "16 GB RAM",
      storage: "320 GB SSD NVMe",
      bandwidth: "Ilimitado",
      price: "$70",
      features: ["Todo de Pro", "IP dedicada", "Firewall avanzado", "Soporte dedicado"],
    },
  ]

  const faqs = [
    {
      question: "¿Qué es un VPS?",
      answer:
        "Un VPS (Virtual Private Server) es un servidor virtual que funciona como un servidor dedicado dentro de un servidor físico más grande. Ofrece recursos garantizados, control total del sistema operativo y aislamiento de otros usuarios.",
    },
    {
      question: "¿Cuánto cuesta un servidor VPS?",
      answer:
        "El precio de un VPS depende de varios factores: cantidad de CPU, memoria RAM, almacenamiento y ancho de banda. Nuestros planes comienzan desde $15/mes para proyectos pequeños hasta $70/mes para aplicaciones empresariales. Los factores que influyen en el precio incluyen el tipo de almacenamiento (SSD NVMe es más rápido), la cantidad de RAM necesaria para tus aplicaciones, y el sistema operativo elegido.",
    },
    {
      question: "¿Qué sistemas operativos están disponibles?",
      answer:
        "Ofrecemos una amplia selección de sistemas operativos gratuitos y de pago. Entre los gratuitos incluimos distribuciones Linux como Ubuntu, CentOS, Fedora y Debian. También disponemos de licencias para Windows Server con costos adicionales según la versión requerida.",
    },
    {
      question: "¿Puedo escalar mi VPS?",
      answer:
        "Sí, todos nuestros planes VPS son escalables. Puedes aumentar CPU, RAM y almacenamiento en cualquier momento sin tiempo de inactividad significativo. El proceso es simple desde tu panel de control.",
    },
    {
      question: "¿Qué tipo de almacenamiento utilizan?",
      answer:
        "Todos nuestros VPS utilizan almacenamiento SSD NVMe de última generación, que ofrece velocidades de lectura/escritura hasta 6 veces más rápidas que los SSD SATA tradicionales. Esto se traduce en mejor rendimiento para bases de datos y aplicaciones.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Logo className="h-20" />
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/vps" className="text-cyan-400 font-semibold">
              VPS
            </Link>
            <Link href="/bare-metal" className="text-slate-300 hover:text-cyan-400 transition-colors">
              Bare Metal
            </Link>
            <Link href="/clusters" className="text-slate-300 hover:text-cyan-400 transition-colors">
              Clusters
            </Link>
            <Button
              asChild
              variant="outline"
              className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white bg-transparent"
            >
              <Link href="/login">INGRESAR</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-6">
          <Server className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold">Servidores Privados Virtuales</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          VPS de Alto Rendimiento
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Servidores virtuales con recursos dedicados, control total y escalabilidad instantánea. Perfecto para
          aplicaciones web, bases de datos y desarrollo.
        </p>
      </section>

      {/* Plans Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Planes VPS</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Elige el plan perfecto para tu proyecto</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {vpsPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`bg-slate-900 ${plan.popular ? "border-2 border-cyan-500 relative" : "border-slate-800"}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  MÁS POPULAR
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                <CardDescription className="text-slate-400">Recursos garantizados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    <span>{plan.cpu}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Server className="w-5 h-5 text-cyan-400" />
                    <span>{plan.ram}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <HardDrive className="w-5 h-5 text-cyan-400" />
                    <span>{plan.storage}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Network className="w-5 h-5 text-cyan-400" />
                    <span>{plan.bandwidth}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400">/mes</span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-slate-300 text-sm">
                        <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.popular ? "bg-cyan-500 hover:bg-cyan-600" : "bg-slate-800 hover:bg-slate-700 text-white"
                  }`}
                >
                  Contratar Ahora
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 bg-slate-950/50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Características Incluidas</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Todo lo que necesitas en un VPS</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Zap className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">SSD NVMe Ultra Rápido</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">
                Almacenamiento de última generación con velocidades de hasta 3500 MB/s para máximo rendimiento
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Shield className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Protección DDoS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">
                Protección automática contra ataques DDoS incluida en todos los planes sin costo adicional
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Server className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">99.9% Uptime SLA</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">
                Garantía de disponibilidad del 99.9% con infraestructura redundante y monitoreo 24/7
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Preguntas Frecuentes</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Todo lo que necesitas saber sobre nuestros VPS</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="bg-slate-900 border-slate-800">
              <CardHeader
                className="cursor-pointer hover:bg-slate-800/50 transition-colors"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white">{faq.question}</CardTitle>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                  />
                </div>
              </CardHeader>
              {openFaq === index && (
                <CardContent>
                  <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-4 text-white">¿Listo para comenzar?</h2>
          <p className="text-slate-300 mb-8 text-lg">
            Despliega tu VPS en menos de 60 segundos. Sin compromisos a largo plazo.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8">
              Comenzar Ahora
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent px-8"
            >
              Hablar con Ventas
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="container mx-auto px-4"></div>
      </footer>
    </div>
  )
}
