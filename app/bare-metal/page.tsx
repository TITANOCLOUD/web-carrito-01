"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { Server, Cpu, HardDrive, Network, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function BareMetalPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const riseServers = [
    {
      name: "RISE-1",
      cpu: "Intel Xeon-E 2386G",
      cores: "6c/12t - 3.5GHz/4.7GHz",
      ram: "32-128 GB",
      storage: "2x512GB hasta 2x512GB+2x6TB",
      bandwidth: "1 Gbps público, 1 Gbps privado",
      price: "$64",
    },
    {
      name: "RISE-3",
      cpu: "AMD Ryzen 9 5900X",
      cores: "12c/24t - 3.7GHz/4.8GHz",
      ram: "32-128 GB",
      storage: "2x512GB hasta 2x512GB+2x6TB",
      bandwidth: "1-3 Gbps público, 1-2 Gbps privado",
      price: "$102",
      popular: true,
    },
    {
      name: "RISE-5",
      cpu: "AMD Epyc 7413",
      cores: "24c/48t - 2.65GHz/3.6GHz",
      ram: "128GB-1TB",
      storage: "2x960GB hasta 2x960GB+2x6TB",
      bandwidth: "1-3 Gbps público, 1-2 Gbps privado",
      price: "$200",
    },
  ]

  const advanceServers = [
    {
      name: "Advance-1 2024",
      cpu: "AMD EPYC 4244P",
      cores: "6c/12t - 3.8GHz/5.1GHz",
      ram: "32-192 GB",
      storage: "2x960GB hasta 4x7.68TB",
      bandwidth: "1-5 Gbps público, 25 Gbps privado ilimitado",
      price: "$90",
    },
    {
      name: "Advance-3 2024",
      cpu: "AMD EPYC 4464P",
      cores: "12c/24t - 3.7GHz/5.4GHz",
      ram: "64-192 GB",
      storage: "2x960GB hasta 4x7.68TB",
      bandwidth: "1-5 Gbps público, 25 Gbps privado ilimitado",
      price: "$167.99",
    },
    {
      name: "Advance-5 2024",
      cpu: "AMD EPYC 8224P",
      cores: "24c/48t - 2.55GHz/3GHz",
      ram: "96-576 GB",
      storage: "2x960GB hasta 8x7.68TB",
      bandwidth: "1-5 Gbps público, 25 Gbps privado ilimitado",
      price: "$224",
    },
  ]

  const faqs = [
    {
      question: "¿Cuánto cuesta un servidor dedicado?",
      answer:
        "El precio de un servidor dedicado depende de diferentes factores como el tipo de servidor, las características del hardware y el sistema operativo. Por ejemplo, un servidor puede ser monoprocesador o tener un doble procesador. Le recomendamos que elija un modelo que disponga de los recursos de hardware necesarios para su proyecto en términos de CPU, RAM, espacio de almacenamiento y red. La cantidad de memoria RAM, el almacenamiento y la potencia de procesamiento necesarios determinarán el coste total de la máquina. Nuestros servidores comienzan desde $64/mes para la serie RISE hasta $1,340/mes para servidores de alto rendimiento HGR.",
    },
    {
      question: "¿Qué sistemas operativos están disponibles?",
      answer:
        "Los servidores dedicados de SATURNO ponen a su disposición una amplia selección de sistemas operativos open source gratuitos, así como licencias de pago para los sistemas más populares. Incluimos distribuciones Linux como Ubuntu, CentOS, Fedora y Debian de forma gratuita. También ofrecemos licencias para Windows Server con costos adicionales según la versión y características requeridas.",
    },
    {
      question: "¿Qué es un servidor Bare Metal?",
      answer:
        "Un servidor Bare Metal es un servidor físico dedicado exclusivamente para un solo cliente. A diferencia de los VPS, no hay virtualización, lo que significa que obtienes acceso directo al hardware completo sin compartir recursos. Esto proporciona el máximo rendimiento, seguridad y control total sobre la configuración del servidor.",
    },
    {
      question: "¿Cuál es la diferencia entre RISE, Advance y Scale?",
      answer:
        "RISE es nuestra línea de entrada con excelente relación precio-rendimiento, ideal para proyectos en crecimiento. Advance ofrece procesadores AMD EPYC de última generación con mayor ancho de banda privado (25 Gbps), perfecto para aplicaciones empresariales. Scale está diseñado para cargas de trabajo intensivas con procesadores de múltiples núcleos y opciones de GPU para IA y machine learning.",
    },
    {
      question: "¿Puedo actualizar mi servidor después?",
      answer:
        "Sí, ofrecemos opciones de actualización de RAM y almacenamiento en la mayoría de nuestros servidores. Para cambios de CPU o arquitectura, podemos ayudarte a migrar a un servidor más potente con mínimo tiempo de inactividad. Nuestro equipo técnico te asistirá en todo el proceso de migración.",
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
            <Link href="/vps" className="text-slate-300 hover:text-cyan-400 transition-colors">
              VPS
            </Link>
            <Link href="/bare-metal" className="text-cyan-400 font-semibold">
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
          <Cpu className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold">Servidores Dedicados Bare Metal</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Máximo Rendimiento Dedicado
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Hardware físico completo para tu proyecto. Sin virtualización, sin vecinos ruidosos. Solo potencia pura y
          control total.
        </p>
      </section>

      {/* RISE Series */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Serie RISE</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Servidores de entrada con excelente relación precio-rendimiento
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {riseServers.map((server) => (
            <Card
              key={server.name}
              className={`bg-slate-900 ${server.popular ? "border-2 border-cyan-500 relative" : "border-slate-800"}`}
            >
              {server.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  RECOMENDADO
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-white">{server.name}</CardTitle>
                <CardDescription className="text-slate-400">{server.cpu}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 text-slate-300">
                    <Cpu className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{server.cores}</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <Server className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{server.ram}</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <HardDrive className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{server.storage}</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <Network className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{server.bandwidth}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">{server.price}</span>
                    <span className="text-slate-400">/mes</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    server.popular ? "bg-cyan-500 hover:bg-cyan-600" : "bg-slate-800 hover:bg-slate-700 text-white"
                  }`}
                >
                  Configurar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Advance Series */}
      <section className="container mx-auto px-4 py-20 bg-slate-950/50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Serie Advance</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Procesadores AMD EPYC de última generación con 25 Gbps de red privada
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {advanceServers.map((server) => (
            <Card key={server.name} className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">{server.name}</CardTitle>
                <CardDescription className="text-slate-400">{server.cpu}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 text-slate-300">
                    <Cpu className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{server.cores}</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <Server className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{server.ram}</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <HardDrive className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{server.storage}</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <Network className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{server.bandwidth}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">{server.price}</span>
                    <span className="text-slate-400">/mes</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white">Configurar</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Preguntas Frecuentes</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Todo lo que necesitas saber sobre servidores dedicados</p>
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
          <h2 className="text-4xl font-bold mb-4 text-white">¿Necesitas ayuda para elegir?</h2>
          <p className="text-slate-300 mb-8 text-lg">
            Nuestro equipo de expertos puede ayudarte a encontrar el servidor perfecto para tu proyecto
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8">
              Hablar con un Experto
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent px-8"
            >
              Ver Todos los Servidores
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-6">
            <Logo variant="minimal" className="h-16" />
            <p className="text-slate-400 text-center">Producto desarrollado por Titano Cloud Corporate</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
