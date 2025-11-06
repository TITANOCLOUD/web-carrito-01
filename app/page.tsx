"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Server,
  Zap,
  Shield,
  HeadphonesIcon,
  Check,
  Cpu,
  HardDrive,
  Container,
  GitBranch,
  Terminal,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Send,
} from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [recommendation, setRecommendation] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const slides = [
    {
      title: "Infraestructura Cloud",
      highlight: "Sin Límites",
      subtitle:
        "Donde otros ponen barreras, nosotros ponemos posibilidades. Escala, adapta y evoluciona con una plataforma que se alinea con tus sueños y los hace realidad.",
      cta: "EXPLORAR SOLUCIONES",
      video:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gen-3%20Alpha%201526416146%2C%20An%20award-winning%20doc%2C%20M%205-VPbQWqMh9T89eE5wBBPdqZ2pHUkKm1.mp4",
    },
    {
      title: "Despliegue en",
      highlight: "60 Segundos",
      subtitle:
        "No importa si tu idea es grande o pequeña, nosotros la levantamos al instante. Infraestructura cloud ágil, soporte dedicado y tecnología de IA lista para que brilles desde el primer minuto.",
      cta: "COMENZAR AHORA",
      video:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250217_1848_Futuristic%20Truck%20Journey_simple_compose_01jmb4z8tcfm2vf0jhvev9m7fj-WpdItknruB6KhR3HufrlXbjaXLTkwh.mp4",
    },
    {
      title: "Soporte Técnico",
      highlight: "Experto 24/7",
      subtitle:
        "Estamos contigo en cada paso: integración, mantenimiento, escalado. Nuestro equipo actúa como parte de tu proyecto, para que tú solo te enfoques en crecer. Soporte real, no promesas.",
      cta: "CONTACTAR SOPORTE",
      video:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250210_0934_Futuristic%20Spartan%20Patrol_simple_compose_01jkr4g0rcezjbc3hqvw5jftvc-0dY1WN4r87nCSqF1vcHkpxJjkQcWuG.mp4",
    },
    {
      title: "AI + Innovation + Development",
      highlight: "Building the Next Era of Cloud Technology",
      subtitle:
        "Integrar IA en tus procesos no es futuro: es ahora. Creamos soluciones inteligentes que aprenden, optimizan y transforman tu negocio. Con nosotros, no sólo estás en la nube — estás en la nube inteligente.",
      cta: "DESCUBRE NUESTRA IA",
      video:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0f39b7b7-2666-4ec8-a0bc-ad51b86ada0a_4978c8a8-1754-42ab-a1b1-7f3c30df1fa9-xZw6fiRSD5O92S1AU5LQ4FZsxcQHjr.mp4",
      isAISlide: true,
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleRecommendation = async () => {
    if (!userInput.trim()) return

    setIsAnalyzing(true)
    setRecommendation("")

    setTimeout(() => {
      const input = userInput.toLowerCase()
      let result = ""

      // Check if the question is related to cloud architecture
      const isCloudRelated =
        input.includes("servidor") ||
        input.includes("hosting") ||
        input.includes("cloud") ||
        input.includes("aplicación") ||
        input.includes("web") ||
        input.includes("base de datos") ||
        input.includes("sitio") ||
        input.includes("proyecto") ||
        input.includes("infraestructura") ||
        input.includes("vps") ||
        input.includes("dedicado") ||
        input.includes("bare metal") ||
        input.includes("usuarios") ||
        input.includes("tráfico") ||
        input.includes("rendimiento")

      if (!isCloudRelated) {
        result = `⚠️ **Pregunta fuera de alcance**

Lo siento, solo puedo ayudarte con preguntas relacionadas con arquitectura cloud y nuestros productos (VPS y Bare Metal).

Por favor, describe tu proyecto o necesidad de infraestructura y te ayudaré a encontrar la mejor solución.`
        setRecommendation(result)
        setIsAnalyzing(false)
        return
      }

      // Recommend VPS or Bare Metal based on requirements
      if (
        input.includes("pequeño") ||
        input.includes("startup") ||
        input.includes("blog") ||
        input.includes("básico") ||
        input.includes("empezar") ||
        (input.includes("usuarios") && (input.includes("100") || input.includes("500") || input.includes("1000")))
      ) {
        result = `🎯 **Recomendación: VPS Básico**

Basado en tu descripción, te recomendamos nuestro **VPS Básico**:

**Especificaciones:**
• 2 vCPU
• 4 GB RAM
• 80 GB SSD NVMe
• Ancho de banda ilimitado
• Panel de control cPanel

**Precio: $15/mes**

✅ **Ideal para:**
- Sitios web pequeños y blogs
- Aplicaciones en desarrollo
- Proyectos con tráfico bajo a medio

💡 **Ventaja:** Puedes escalar fácilmente a un plan superior cuando tu proyecto crezca.`
      } else if (
        input.includes("ecommerce") ||
        input.includes("tienda") ||
        input.includes("ventas") ||
        input.includes("medio") ||
        input.includes("wordpress") ||
        (input.includes("usuarios") && (input.includes("2000") || input.includes("3000") || input.includes("5000")))
      ) {
        result = `🎯 **Recomendación: VPS Pro**

Para tu proyecto, te sugerimos el **VPS Pro**:

**Especificaciones:**
• 4 vCPU
• 8 GB RAM
• 160 GB SSD NVMe
• SSL gratuito incluido
• Backups diarios automáticos

**Precio: $35/mes**

✅ **Ideal para:**
- Tiendas online y e-commerce
- Aplicaciones con tráfico medio
- Bases de datos medianas
- Múltiples sitios web

💡 **Ventaja:** Rendimiento garantizado con recursos dedicados y backups automáticos.`
      } else if (
        input.includes("alto rendimiento") ||
        input.includes("empresa") ||
        input.includes("dedicado") ||
        input.includes("bare metal") ||
        input.includes("crítico") ||
        input.includes("potencia") ||
        (input.includes("usuarios") && (input.includes("10000") || input.includes("20000") || input.includes("50000")))
      ) {
        result = `🎯 **Recomendación: Bare Metal Premium**

Para máximo rendimiento, necesitas nuestro **Bare Metal Premium**:

**Especificaciones:**
• AMD EPYC 7543P (32 cores / 64 threads)
• 256 GB DDR4 ECC
• 4x 2TB NVMe SSD RAID 10
• Red de 10 Gbps ilimitado
• Hardware 100% dedicado

**Precio: $599/mes**

✅ **Ideal para:**
- Aplicaciones empresariales críticas
- Alto tráfico y concurrencia
- Big data y procesamiento intensivo
- Máximo control y rendimiento

💡 **Ventaja:** Hardware completamente dedicado sin vecinos ruidosos, rendimiento predecible y constante.`
      } else if (input.includes("medio rendimiento") || input.includes("crecimiento") || input.includes("escalable")) {
        result = `🎯 **Recomendación: Bare Metal Standard**

Para un balance perfecto entre rendimiento y costo, te recomendamos **Bare Metal Standard**:

**Especificaciones:**
• Intel Xeon E-2288G (8 cores / 16 threads)
• 64 GB DDR4 ECC
• 2x 1TB NVMe SSD RAID 1
• Red de 1 Gbps ilimitado
• Hardware dedicado

**Precio: $199/mes**

✅ **Ideal para:**
- Aplicaciones en crecimiento
- Proyectos que necesitan más potencia que VPS
- Bases de datos grandes
- Aplicaciones con requisitos específicos

💡 **Ventaja:** Rendimiento de servidor dedicado a un precio accesible.`
      } else {
        result = `🎯 **Recomendación Personalizada**

Basado en tu descripción, te sugiero comenzar con nuestro **VPS Pro** ($35/mes):

**¿Por qué VPS Pro?**
• Recursos escalables según tu crecimiento
• Rendimiento garantizado
• Soporte técnico 24/7
• Backups automáticos
• Fácil upgrade a Bare Metal si lo necesitas

**Si necesitas más potencia:**
Podemos escalar a **Bare Metal** cuando tu proyecto lo requiera, sin interrupciones.

💡 **Consejo:** Nuestro equipo puede ayudarte a diseñar la arquitectura perfecta para tu proyecto específico. ¡Contáctanos para una consulta gratuita!`
      }

      setRecommendation(result)
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950">
      {/* Navigation */}

      <section className="relative overflow-hidden w-full">
        <div className="relative h-[700px] md:h-[800px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0">
                {slide.video ? (
                  <video src={slide.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                ) : (
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={`${slide.title} - SATURNO`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
                {slide.isAISlide ? (
                  <>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 leading-tight drop-shadow-2xl">
                      AI <span className="text-cyan-400">+</span> Innovation <span className="text-cyan-400">+</span>{" "}
                      Development <span className="text-cyan-400">=</span>
                    </h2>
                    <h3 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
                      <span className="text-cyan-400">Building</span>{" "}
                      <span className="text-white">the Next Era of Cloud Technology</span>
                    </h3>
                  </>
                ) : (
                  <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight drop-shadow-2xl">
                    {slide.title} <span className="text-cyan-400">{slide.highlight}</span>
                  </h2>
                )}
                <p className="text-xl md:text-2xl text-slate-100 mb-8 max-w-3xl drop-shadow-lg">{slide.subtitle}</p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-10 py-7 text-lg rounded-full shadow-2xl hover:shadow-xl transition-all"
                >
                  {slide.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-slate-900/80 hover:bg-slate-800 text-white p-3 rounded-full transition-all"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-slate-900/80 hover:bg-slate-800 text-white p-3 rounded-full transition-all"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-cyan-400 w-8" : "bg-slate-600 hover:bg-slate-500"
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* AI Product Recommendation Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              ¿No sabes quién te puede ayudar a <span className="text-cyan-400">diseñar lo que necesitas?</span>
            </h2>
            <div className="text-lg text-slate-300 max-w-4xl mx-auto space-y-4 text-left">
              <p>
                Un arquitecto de cloud es el responsable de diseñar, planificar y supervisar la infraestructura
                tecnológica en la nube de una organización. Su función principal es garantizar que los servicios cloud
                —como servidores, redes, almacenamiento y seguridad— estén correctamente integrados, optimizados y
                alineados con los objetivos del negocio. Este rol implica definir arquitecturas escalables, seguras y
                resilientes, eligiendo las tecnologías y proveedores adecuados (como AWS, Azure u OpenStack) según las
                necesidades de cada proyecto.
              </p>
              <p>
                Para validar la información que maneja un arquitecto de cloud, se utilizan procesos y herramientas de
                control: revisión de arquitecturas mediante peer review, documentación técnica estandarizada, auditorías
                de configuración, y pruebas de rendimiento o seguridad (por ejemplo, stress testing, penetration testing
                o análisis de cumplimiento con normas ISO/IEC 27001). Además, toda decisión arquitectónica debe quedar
                trazada en diagramas, manuales y repositorios verificables, permitiendo a otros equipos validar,
                mantener y escalar la infraestructura con transparencia y precisión.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative hidden md:block">
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl">
                <Image
                  src="/friendly-technical-support-person-with-headset-in-.jpg"
                  alt="Arquitecto Cloud"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30">
                    <p className="text-white font-semibold mb-1">Tu Arquitecto Cloud Personal</p>
                    <p className="text-slate-300 text-sm">Disponible 24/7 para diseñar tu infraestructura ideal</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-cyan-500/30 shadow-2xl">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Sparkles className="w-7 h-7 text-cyan-400 animate-pulse" />
                  <CardTitle className="text-2xl md:text-3xl font-bold text-white">Asistente Inteligente</CardTitle>
                </div>
                <CardDescription className="text-slate-300 text-base">
                  Cuéntame sobre tu proyecto y te recomendaré la mejor solución
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-3">
                  <label className="text-slate-200 font-medium block text-lg">Describe tu proyecto o necesidad:</label>
                  <div className="relative">
                    <textarea
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Ejemplo: Necesito alojar una aplicación web con base de datos que espero tenga 5000 usuarios concurrentes..."
                      className="w-full h-40 px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 resize-none text-base"
                      disabled={isAnalyzing}
                    />
                  </div>
                  <Button
                    onClick={handleRecommendation}
                    disabled={!userInput.trim() || isAnalyzing}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                        Analizando tu proyecto...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Obtener Recomendación
                      </>
                    )}
                  </Button>
                </div>

                {recommendation && (
                  <div className="mt-6 p-6 bg-slate-950 border border-cyan-500/30 rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-start gap-3 mb-4">
                      <Sparkles className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">Tu Solución Recomendada</h3>
                        <div className="text-slate-200 whitespace-pre-line leading-relaxed">{recommendation}</div>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button className="flex-1 bg-cyan-500 hover:bg-cyan-600">Ver Detalles</Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                      >
                        Hablar con Experto
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Infraestructura Cloud de Nueva Generación
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Potencia tu negocio con soluciones de hosting escalables, seguras y de alto rendimiento
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
            Comenzar Ahora
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
          >
            Ver Planes
          </Button>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Nuestra Infraestructura</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Centros de datos de última generación con tecnología de punta
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="group relative overflow-hidden rounded-lg aspect-video bg-slate-900 border border-slate-800 hover:border-cyan-500 transition-all duration-300">
            <video
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250302_0144_Sustainable%20Nordic%20Data%20Center_simple_compose_01jnasjptjebbv6vjrnzjqjzhz-2FgFcG5ALsu91wMvFbQc0BdPMIF5Jp.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Centros de Datos TIER IV</h3>
              <p className="text-slate-300 text-sm">Somos conformes pero ecológicos</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg aspect-video bg-slate-900 border border-slate-800 hover:border-cyan-500 transition-all duration-300">
            <video
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/84163ebe-30d6-4cc7-b74d-dee266072e18_ab45ad1e-125c-4711-9935-0306fe40e59d-TRhSsRHE7syUEk25ng9YgWoLUfiwdu.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Monitoreo 24/7</h3>
              <p className="text-slate-300 text-sm">Supervisión continua de toda la infraestructura</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg aspect-video bg-slate-900 border border-slate-800 hover:border-cyan-500 transition-all duration-300">
            <Image
              src="/fiber-optic-cables-high-speed-network.jpg"
              alt="Red de Alta Velocidad"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Red de Alta Velocidad</h3>
              <p className="text-slate-300 text-sm">Conectividad de 10Gbps con baja latencia</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg aspect-video bg-slate-900 border border-slate-800 hover:border-cyan-500 transition-all duration-300">
            <Image
              src="/cybersecurity-shield-protection-multi-layer.jpg"
              alt="Seguridad Multicapa"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Seguridad Multicapa</h3>
              <p className="text-slate-300 text-sm">Protección DDoS y firewalls avanzados</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg aspect-video bg-slate-900 border border-slate-800 hover:border-cyan-500 transition-all duration-300">
            <video
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a3757e01-ec2e-4022-a410-4d66541e4c58_7ea54835-a64c-4190-897e-339fa2b91000-iVNgh7Uo8DgNWA7P9r6eVEucnpTIoJ.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Escalabilidad Instantánea</h3>
              <p className="text-slate-300 text-sm">Recursos que crecen con tu negocio</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg aspect-video bg-slate-900 border border-slate-800 hover:border-cyan-500 transition-all duration-300">
            <Image
              src="/green-energy-efficient-data-center-with-cooling-sy.jpg"
              alt="Eficiencia energética"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Eficiencia Energética</h3>
              <p className="text-slate-300 text-sm">Tecnología verde y sostenible</p>
            </div>
          </div>
        </div>
      </section>

      {/* VPS Section */}
      <section id="vps" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Servidores Privados Virtuales</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">VPS escalables con recursos dedicados y control total</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "VPS Básico", cpu: "2 vCPU", ram: "4 GB RAM", storage: "80 GB SSD", price: "$15/mes" },
            { name: "VPS Pro", cpu: "4 vCPU", ram: "8 GB RAM", storage: "160 GB SSD", price: "$35/mes" },
            { name: "VPS Enterprise", cpu: "8 vCPU", ram: "16 GB RAM", storage: "320 GB SSD", price: "$70/mes" },
          ].map((plan) => (
            <Card key={plan.name} className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-cyan-400">{plan.name}</CardTitle>
                <CardDescription className="text-slate-400">Ideal para aplicaciones escalables</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-slate-300">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>{plan.cpu}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Server className="w-4 h-4 text-cyan-400" />
                  <span>{plan.ram}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <HardDrive className="w-4 h-4 text-cyan-400" />
                  <span>{plan.storage}</span>
                </div>
                <div className="pt-4 border-t border-slate-800">
                  <p className="text-3xl font-bold text-white">{plan.price}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600">Contratar</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Bare Metal Section */}
      <section id="bare-metal" className="container mx-auto px-4 py-20 bg-slate-950/50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Servidores Bare Metal</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Máximo rendimiento con hardware dedicado</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <Server className="w-6 h-6" />
                Bare Metal Standard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-slate-300">
                  <strong>CPU:</strong> Intel Xeon E-2288G (8 cores / 16 threads)
                </p>
                <p className="text-slate-300">
                  <strong>RAM:</strong> 64 GB DDR4 ECC
                </p>
                <p className="text-slate-300">
                  <strong>Storage:</strong> 2x 1TB NVMe SSD RAID 1
                </p>
                <p className="text-slate-300">
                  <strong>Network:</strong> 1 Gbps ilimitado
                </p>
              </div>
              <p className="text-3xl font-bold text-white">$199/mes</p>
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600">Contratar</Button>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <Server className="w-6 h-6" />
                Bare Metal Premium
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-slate-300">
                  <strong>CPU:</strong> AMD EPYC 7543P (32 cores / 64 threads)
                </p>
                <p className="text-slate-300">
                  <strong>RAM:</strong> 256 GB DDR4 ECC
                </p>
                <p className="text-slate-300">
                  <strong>Storage:</strong> 4x 2TB NVMe SSD RAID 10
                </p>
                <p className="text-slate-300">
                  <strong>Network:</strong> 10 Gbps ilimitado
                </p>
              </div>
              <p className="text-3xl font-bold text-white">$599/mes</p>
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600">Contratar</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Clusters Section */}
      <section id="clusters" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Kubernetes Clusters</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Orquestación de contenedores gestionada</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Container className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Cluster Básico</CardTitle>
              <CardDescription className="text-slate-400">3 nodos worker</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Auto-scaling
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Load Balancer
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Monitoreo 24/7
                </li>
              </ul>
              <p className="text-3xl font-bold text-white mt-6">$120/mes</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-6">
                Aprovechar Oferta
              </Button>
            </CardFooter>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Container className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Cluster Pro</CardTitle>
              <CardDescription className="text-slate-400">5 nodos worker</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Todo de Básico
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> CI/CD integrado
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Backup automático
                </li>
              </ul>
              <p className="text-3xl font-bold text-white mt-6">$250/mes</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-6">
                Aprovechar Oferta
              </Button>
            </CardFooter>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Container className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Cluster Enterprise</CardTitle>
              <CardDescription className="text-slate-400">10+ nodos worker</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Todo de Pro
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Multi-región
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Soporte dedicado
                </li>
              </ul>
              <p className="text-3xl font-bold text-white mt-6">$500/mes</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-6">
                Aprovechar Oferta
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Dominios Section */}
      <section id="dominios" className="container mx-auto px-4 py-20 bg-slate-950/50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Registro de Dominios</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Encuentra y registra tu dominio perfecto</p>
        </div>
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Busca tu dominio..."
              className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
            <Button className="bg-cyan-500 hover:bg-cyan-600">Buscar</Button>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { tld: ".com", price: "$12.99/año" },
            { tld: ".net", price: "$14.99/año" },
            { tld: ".org", price: "$13.99/año" },
            { tld: ".io", price: "$39.99/año" },
          ].map((domain) => (
            <Card key={domain.tld} className="bg-slate-900 border-slate-800 text-center">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-2xl">{domain.tld}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white font-bold">{domain.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* IAC Section */}
      <section id="iac" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Infrastructure as Code</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Automatiza tu infraestructura con las mejores herramientas</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Terminal className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Terraform</CardTitle>
              <CardDescription className="text-slate-400">Provisión declarativa de infraestructura</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Módulos pre-configurados
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> State management
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Multi-cloud
                </li>
              </ul>
              <Button className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600">Ver Documentación</Button>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <GitBranch className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Ansible</CardTitle>
              <CardDescription className="text-slate-400">Automatización de configuración</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Playbooks listos
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Gestión de inventario
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Idempotencia
                </li>
              </ul>
              <Button className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600">Ver Documentación</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="container mx-auto px-4 py-20 bg-slate-950/50">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">¿Por qué elegir SATURNO?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Zap className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Alto Rendimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">Infraestructura de última generación con SSD NVMe y red de 10Gbps</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Shield className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Seguridad Avanzada</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">Protección DDoS, firewalls configurables y backups automáticos</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <HeadphonesIcon className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Soporte 24/7</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">Equipo técnico disponible en todo momento para ayudarte</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Partners Gallery Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Con Quiénes <span className="text-cyan-400">Trabajamos</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Integramos las mejores tecnologías cloud del mercado para ofrecerte soluciones de clase mundial
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* OVHcloud */}
            <div className="group relative bg-slate-900 border border-slate-800 hover:border-cyan-500 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="relative h-24 flex items-center justify-center">
                <Image
                  src="/ovh-logo.jpg"
                  alt="OVHcloud Partner"
                  fill
                  className="object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">OVHcloud</h3>
                <p className="text-slate-400 text-sm">Infraestructura europea de alto rendimiento</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </div>

            {/* AWS */}
            <div className="group relative bg-slate-900 border border-slate-800 hover:border-cyan-500 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="relative h-24 flex items-center justify-center">
                <Image
                  src="/aws-logo.jpg"
                  alt="AWS Partner"
                  fill
                  className="object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Amazon Web Services</h3>
                <p className="text-slate-400 text-sm">Líder mundial en servicios cloud</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </div>

            {/* Azure */}
            <div className="group relative bg-slate-900 border border-slate-800 hover:border-cyan-500 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="relative h-24 flex items-center justify-center">
                <Image
                  src="/azure-logo.jpg"
                  alt="Microsoft Azure Partner"
                  fill
                  className="object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Microsoft Azure</h3>
                <p className="text-slate-400 text-sm">Plataforma cloud empresarial de Microsoft</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-400 text-lg">
              Combinamos lo mejor de cada plataforma para crear soluciones híbridas y multi-cloud optimizadas para tu
              negocio
            </p>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full mb-6 animate-pulse">
            <Zap className="w-6 h-6" />
            <span className="font-bold text-lg">OFERTAS DEL DÍA</span>
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Descuentos Especiales por Tiempo Limitado</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Aprovecha estas ofertas exclusivas antes de que terminen
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Deal 1: VPS */}
          <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-2 border-orange-500 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm rotate-12 shadow-lg">
              -40% OFF
            </div>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-10 h-10 text-orange-400" />
                <div>
                  <CardTitle className="text-2xl text-white">VPS Pro</CardTitle>
                  <CardDescription className="text-slate-400">Oferta Flash</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-orange-400" />
                  <span>4 vCPU</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-orange-400" />
                  <span>8 GB RAM</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-orange-400" />
                  <span>160 GB SSD NVMe</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-orange-400" />
                  <span>Ancho de banda ilimitado</span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-500 line-through text-xl">$35</span>
                  <span className="text-4xl font-bold text-orange-400">$21</span>
                  <span className="text-slate-400">/mes</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">Precio especial por 12 meses</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-6">
                Aprovechar Oferta
              </Button>
            </CardFooter>
          </Card>

          {/* Deal 2: Bare Metal */}
          <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-2 border-cyan-500 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-cyan-500 text-white px-4 py-2 rounded-full font-bold text-sm rotate-12 shadow-lg">
              -30% OFF
            </div>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-10 h-10 text-cyan-400" />
                <div>
                  <CardTitle className="text-2xl text-white">Bare Metal RISE-3</CardTitle>
                  <CardDescription className="text-slate-400">Oferta Especial</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-cyan-400" />
                  <span>AMD Ryzen 9 5900X (12c/24t)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-cyan-400" />
                  <span>32 GB RAM DDR4</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-cyan-400" />
                  <span>2 x 512 GB NVMe SSD</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-cyan-400" />
                  <span>1 Gbps garantizado</span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-500 line-through text-xl">$102</span>
                  <span className="text-4xl font-bold text-cyan-400">$71</span>
                  <span className="text-slate-400">/mes</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">Ahorra $31/mes durante 6 meses</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-6">
                Aprovechar Oferta
              </Button>
            </CardFooter>
          </Card>

          {/* Deal 3: Cluster */}
          <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-2 border-purple-500 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-purple-500 text-white px-4 py-2 rounded-full font-bold text-sm rotate-12 shadow-lg">
              -25% OFF
            </div>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <Container className="w-10 h-10 text-purple-400" />
                <div>
                  <CardTitle className="text-2xl text-white">Cluster Pro</CardTitle>
                  <CardDescription className="text-slate-400">Kubernetes Managed</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-purple-400" />
                  <span>5 nodos worker</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-purple-400" />
                  <span>Auto-scaling automático</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-purple-400" />
                  <span>CI/CD integrado</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-purple-400" />
                  <span>Load Balancer incluido</span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-500 line-through text-xl">$250</span>
                  <span className="text-4xl font-bold text-purple-400">$187</span>
                  <span className="text-slate-400">/mes</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">Oferta válida por 3 meses</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-6">
                Aprovechar Oferta
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-400 text-lg">
            ⏰ Ofertas válidas hasta agotar stock o fin de mes • Sin compromisos a largo plazo
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="container mx-auto px-4"></div>
      </footer>
    </div>
  )
}
