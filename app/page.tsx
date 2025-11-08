"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Server,
  Zap,
  Shield,
  HeadphonesIcon,
  Check,
  Clock,
  Globe,
  Award,
  TrendingUp,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Send,
  ArrowRight,
} from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])
  const [userInput, setUserInput] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [requiresCaptcha, setRequiresCaptcha] = useState(false)

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

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true"
      setIsAuthenticated(authStatus)
    }

    checkAuth()
    window.addEventListener("storage", checkAuth)
    window.addEventListener("visibilitychange", checkAuth)

    return () => {
      window.removeEventListener("storage", checkAuth)
      window.removeEventListener("visibilitychange", checkAuth)
    }
  }, [])

  useEffect(() => {
    if (window.location.hash === "#chat") {
      const chatSection = document.getElementById("chat")
      if (chatSection) {
        chatSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [])

  const handleSendMessage = async () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true)
      setMessages([
        ...messages,
        {
          role: "assistant",
          content:
            "🔒 **Acceso Restringido**\n\nLoise es exclusiva para clientes autenticados. Por favor, inicia sesión o crea una cuenta para acceder a la consultoría gratuita con nuestra Arquitecta Cloud.\n\nUna vez autenticado, podrás recibir análisis profesional de infraestructura cloud sin costo.",
        },
      ])
      return
    }

    if (!userInput.trim()) return

    const newMessages = [...messages, { role: "user" as const, content: userInput }]
    setMessages(newMessages)
    setUserInput("")
    setIsAnalyzing(true)
    setShowLoginPrompt(false)

    try {
      console.log("[v0] Sending message to API")

      const response = await fetch("/api/loise/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          isAuthenticated,
        }),
      })

      console.log("[v0] Response status:", response.status)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] Response received")

      if (data.role === "assistant" && data.content) {
        setMessages([...newMessages, { role: "assistant", content: data.content }])

        if (data.content.includes("crear cuenta") || data.content.includes("iniciar sesión")) {
          setShowLoginPrompt(true)
        }
      } else {
        throw new Error("Respuesta inválida del servidor")
      }

      setIsAnalyzing(false)
    } catch (error) {
      console.error("[v0] Error sending message:", error)
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "❌ Lo siento, ha ocurrido un error de conexión. Por favor, verifica tu conexión e intenta de nuevo.",
        },
      ])
      setIsAnalyzing(false)
    }
  }

  const handleLogin = () => {
    window.location.href = "/login?returnTo=/#chat"
  }

  const handleCompleteCaptcha = () => {
    setRequiresCaptcha(false)
    setMessages([
      ...messages,
      {
        role: "assistant",
        content: "✅ Verificación completada. Puedes continuar con tu consulta.",
      },
    ])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950">
      {/* Hero Carousel */}
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
                {slide.video && (
                  <video src={slide.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
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
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-10 py-7 text-lg rounded-full shadow-2xl hover:shadow-xl transition-all"
                >
                  <a href="/ contacto">{slide.cta}</a>
                </Button>
              </div>
            </div>
          ))}
        </div>

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

      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            ¿Por Qué Elegir <span className="text-cyan-400">Titanocloud</span>?
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            No somos solo otro proveedor de hosting. Somos tu socio tecnológico comprometido con tu éxito
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Advantage 1 */}
          <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-cyan-500/30 hover:border-cyan-500 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
            <CardHeader>
              <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-cyan-400" />
              </div>
              <CardTitle className="text-2xl text-white">Despliegue en 60 Segundos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 leading-relaxed">
                Mientras la competencia te hace esperar horas o días, nosotros activamos tu infraestructura en menos de
                un minuto. Tu tiempo vale oro, y nosotros lo respetamos.
              </p>
            </CardContent>
          </Card>

          {/* Advantage 2 */}
          <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-cyan-500/30 hover:border-cyan-500 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
            <CardHeader>
              <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4">
                <HeadphonesIcon className="w-8 h-8 text-cyan-400" />
              </div>
              <CardTitle className="text-2xl text-white">Soporte Humano Real 24/7</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 leading-relaxed">
                Olvídate de bots y respuestas automáticas. Nuestro equipo de expertos está disponible las 24 horas para
                resolver tus problemas técnicos. No tickets sin respuesta, no esperas infinitas.
              </p>
            </CardContent>
          </Card>

          {/* Advantage 3 */}
          <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-cyan-500/30 hover:border-cyan-500 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
            <CardHeader>
              <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-cyan-400" />
              </div>
              <CardTitle className="text-2xl text-white">Hardware de Última Generación</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 leading-relaxed">
                Mientras otros reciclan hardware de hace 5 años, nosotros invertimos constantemente en AMD EPYC, Intel
                Xeon de última generación, y NVMe exclusivamente. Rendimiento sin compromisos.
              </p>
            </CardContent>
          </Card>

          {/* Advantage 4 */}
          <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-cyan-500/30 hover:border-cyan-500 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
            <CardHeader>
              <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-cyan-400" />
              </div>
              <CardTitle className="text-2xl text-white">Seguridad Sin Costos Ocultos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 leading-relaxed">
                Protección DDoS, firewalls avanzados, backups automáticos y certificados SSL incluidos sin cargos
                adicionales. Lo que ves es lo que pagas. Sin sorpresas en tu factura.
              </p>
            </CardContent>
          </Card>

          {/* Advantage 5 */}
          <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-cyan-500/30 hover:border-cyan-500 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
            <CardHeader>
              <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-cyan-400" />
              </div>
              <CardTitle className="text-2xl text-white">Escalabilidad Instantánea</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 leading-relaxed">
                Tu negocio crece, tu infraestructura también. Escala verticalmente u horizontalmente en segundos sin
                downtime. No necesitas migrar servidores ni perder tu configuración.
              </p>
            </CardContent>
          </Card>

          {/* Advantage 6 */}
          <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-cyan-500/30 hover:border-cyan-500 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
            <CardHeader>
              <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-cyan-400" />
              </div>
              <CardTitle className="text-2xl text-white">Arquitecta Cloud con IA</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 leading-relaxed">
                ¿No tienes arquitecto cloud? Loise, nuestra IA experta, diseña tu infraestructura ideal gratuitamente.
                Análisis profesional sin costo de consultoría.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24 bg-slate-950/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Titanocloud vs <span className="text-slate-500">La Competencia</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Una comparación honesta de lo que realmente importa
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Others */}
            <div className="space-y-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-slate-400 mb-8 flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  Otros Proveedores
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-500 text-sm">✗</span>
                    </div>
                    <span className="text-slate-400">Soporte por tickets que tardan 24-48 horas en responder</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-500 text-sm">✗</span>
                    </div>
                    <span className="text-slate-400">Cargos ocultos por backups, SSL y protección DDoS</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-500 text-sm">✗</span>
                    </div>
                    <span className="text-slate-400">Hardware compartido con máquinas de 3-4 años de antigüedad</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-500 text-sm">✗</span>
                    </div>
                    <span className="text-slate-400">Proceso de activación que puede tomar horas o días</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-500 text-sm">✗</span>
                    </div>
                    <span className="text-slate-400">Panel de control complicado y poco intuitivo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-500 text-sm">✗</span>
                    </div>
                    <span className="text-slate-400">Migración costosa y con downtime garantizado</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Titanocloud */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-cyan-950/50 to-slate-900 border-2 border-cyan-500 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Award className="w-12 h-12 text-cyan-400 opacity-20" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                  Titanocloud
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-200 font-medium">
                      Soporte humano real en menos de 5 minutos, 24/7/365
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-200 font-medium">
                      Todo incluido: Backups, SSL, DDoS protection sin costos extra
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-200 font-medium">
                      Hardware dedicado de última generación: AMD EPYC & Intel Xeon nuevos
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-200 font-medium">Activación instantánea en 60 segundos o menos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-200 font-medium">
                      Panel moderno con IA incluida (Loise, tu arquitecta cloud)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-200 font-medium">
                      Migración gratuita asistida con cero downtime garantizado
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold px-12 py-7 text-lg rounded-full shadow-2xl"
            >
              <a href="/contacto">
                Experimenta la Diferencia <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* AI Loise Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              ¿No sabes quién te puede ayudar a <span className="text-cyan-400">diseñar lo que necesitas?</span>
            </h2>
            <div className="text-lg text-slate-300 max-w-3xl mx-auto">
              <p className="mb-4">
                La persona responsable de diseñar, planificar y supervisar la infraestructura tecnológica en la nube de
                una organización es el <strong className="text-cyan-400">Arquitecto Cloud</strong>. Esto incluye
                servidores, redes, almacenamiento y seguridad, integrados de modo que respondan a los objetivos del
                negocio.
              </p>
              <p className="text-xl font-semibold text-white">
                Si no tienes uno, aquí te presentamos a <span className="text-cyan-400">Loise de Titanocloud</span>.
                Puedes usarla desde que expliques todo a detalle.
              </p>
            </div>
          </div>

          <div id="chat" className="grid md:grid-cols-2 gap-8 items-start">
            <div className="relative hidden md:block">
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl sticky top-8">
                <Image
                  src="/attractive-professional-tech-woman-with-headset-ai-.jpg"
                  alt="Loise - Arquitecta Cloud"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30">
                    <p className="text-white font-semibold mb-1">Loise - Tu Arquitecta Cloud Personal</p>
                    <p className="text-slate-300 text-sm">Disponible 24/7 para diseñar tu infraestructura ideal</p>
                    {isAuthenticated && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-400 text-xs font-medium">Sesión activa</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-cyan-500/30 shadow-2xl">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Sparkles className="w-7 h-7 text-cyan-400 animate-pulse" />
                  <CardTitle className="text-2xl md:text-3xl font-bold text-white">Loise AI Assistant</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                {!isAuthenticated && (
                  <div className="bg-orange-500/20 border-2 border-orange-500 rounded-xl p-6 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg mb-2">Autenticación Requerida</h3>
                        <p className="text-orange-100 text-sm mb-4">
                          Loise es una herramienta exclusiva para clientes de Titanocloud. Inicia sesión para acceder a
                          consultoría profesional gratuita.
                        </p>
                        <Button
                          onClick={handleLogin}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                        >
                          Iniciar Sesión para Acceder
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {messages.length === 0 ? (
                    <div className="text-center py-8">
                      <Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-pulse" />
                      <p className="text-slate-400">
                        ¡Hola! Soy Loise, tu Arquitecta Cloud. Cuéntame sobre tu proyecto y te ayudaré a encontrar la
                        mejor solución.
                      </p>
                    </div>
                  ) : (
                    messages.map((msg, idx) => (
                      <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        {msg.role === "assistant" && (
                          <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            msg.role === "user"
                              ? "bg-cyan-500 text-white"
                              : "bg-slate-950 text-slate-200 border border-cyan-500/30"
                          }`}
                        >
                          <p className="whitespace-pre-line text-sm leading-relaxed">{msg.content}</p>
                        </div>
                        {msg.role === "user" && (
                          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-bold">Tú</span>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                  {isAnalyzing && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white animate-spin" />
                      </div>
                      <div className="bg-slate-950 border border-cyan-500/30 rounded-lg p-4">
                        <p className="text-slate-400 text-sm">Loise está analizando tu consulta...</p>
                      </div>
                    </div>
                  )}
                </div>

                {showLoginPrompt && (
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                    <p className="text-orange-400 font-semibold mb-3">🔒 Autenticación Requerida</p>
                    <Button onClick={handleLogin} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      Iniciar Sesión / Registrarse
                    </Button>
                  </div>
                )}

                {requiresCaptcha && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <p className="text-red-400 font-semibold mb-3">⚠️ Verificación de Seguridad</p>
                    <Button onClick={handleCompleteCaptcha} className="w-full bg-red-500 hover:bg-red-600 text-white">
                      Completar CAPTCHA
                    </Button>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="relative">
                    <textarea
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                      placeholder={
                        isAuthenticated
                          ? "Ejemplo: Necesito alojar una aplicación web con base de datos que espero tenga 5000 usuarios concurrentes..."
                          : "Inicia sesión para consultar con Loise..."
                      }
                      className="w-full h-32 px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 resize-none text-base"
                      disabled={isAnalyzing || !isAuthenticated}
                    />
                    {!isAuthenticated && (
                      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Shield className="w-12 h-12 text-orange-400 mx-auto mb-2" />
                          <p className="text-orange-400 font-semibold">Inicia sesión para usar Loise</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={isAuthenticated ? handleSendMessage : handleLogin}
                    disabled={(!userInput.trim() || isAnalyzing) && isAuthenticated}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {!isAuthenticated ? (
                      <>
                        <Shield className="w-5 h-5 mr-2" />
                        Iniciar Sesión para Consultar
                      </>
                    ) : isAnalyzing ? (
                      <>
                        <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                        Loise está pensando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Enviar Consulta
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-slate-500 text-center">
                    {isAuthenticated
                      ? "Presiona Enter para enviar • Shift + Enter para nueva línea"
                      : "Necesitas iniciar sesión para usar Loise AI"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
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
            <video
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/65ffb1f37ddab9d2d6003117-1mHLhKwgrx3VSDs5V80gZQRgNBM2Qq.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Red de Alta Velocidad</h3>
              <p className="text-slate-300 text-sm">Conectividad de 10Gbps con baja latencia</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg aspect-video bg-slate-900 border border-slate-800 hover:border-cyan-500 transition-all duration-300">
            <video
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gen-3%20Alpha%20990622162%2C%20todo%20un%20equipo%20de%20es%20%281%29-iDYoV2fgcDVphStTjtUIbdns3cJQmx.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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

      <section className="container mx-auto px-4 py-20 bg-slate-950/50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Explora Nuestras Soluciones</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Desde VPS escalables hasta servidores bare metal de alto rendimiento
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="bg-slate-900 border-slate-800 hover:border-cyan-500 transition-all duration-300 group">
            <CardHeader className="text-center">
              <Server className="w-12 h-12 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <CardTitle className="text-white">Servidores VPS</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-400 text-sm mb-4">Flexibles, escalables y listos en 60 segundos</p>
              <Button
                asChild
                variant="outline"
                className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white bg-transparent"
              >
                <a href="/vps">Ver Planes</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 hover:border-cyan-500 transition-all duration-300 group">
            <CardHeader className="text-center">
              <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <CardTitle className="text-white">Bare Metal</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-400 text-sm mb-4">Máximo rendimiento con hardware dedicado</p>
              <Button
                asChild
                variant="outline"
                className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white bg-transparent"
              >
                <a href="/bare-metal">Ver Planes</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 hover:border-cyan-500 transition-all duration-300 group">
            <CardHeader className="text-center">
              <Globe className="w-12 h-12 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <CardTitle className="text-white">Clusters Kubernetes</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-400 text-sm mb-4">Orquestación de contenedores gestionada</p>
              <Button
                asChild
                variant="outline"
                className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white bg-transparent"
              >
                <a href="/clusters">Ver Planes</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 hover:border-cyan-500 transition-all duration-300 group">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <CardTitle className="text-white">Calculadora VPS</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-400 text-sm mb-4">Diseña tu servidor ideal y compara precios</p>
              <Button
                asChild
                variant="outline"
                className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white bg-transparent"
              >
                <a href="/calculadora">Calcular</a>
              </Button>
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
            <div className="group relative bg-slate-900 border border-slate-800 hover:border-cyan-500 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="relative h-24 flex items-center justify-center">
                <Image
                  src="/ovhcloud-new.png"
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

            <div className="group relative bg-slate-900 border border-slate-800 hover:border-cyan-500 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="relative h-24 flex items-center justify-center">
                <Image
                  src="/aws-new.png"
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

            <div className="group relative bg-slate-900 border border-slate-800 hover:border-cyan-500 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="relative h-24 flex items-center justify-center">
                <Image
                  src="/azure-new.png"
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
    </div>
  )
}
