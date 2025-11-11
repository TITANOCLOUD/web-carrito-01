"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Send, Sparkles, Phone, MessageCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import { tracker } from "@/lib/tracking-client"

export function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showProactiveMessages, setShowProactiveMessages] = useState(false)
  const [proactiveMessageIndex, setProactiveMessageIndex] = useState(0)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactName, setContactName] = useState("")
  const [contactLastName, setContactLastName] = useState("")
  const [contactCompany, setContactCompany] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [contactCountry, setContactCountry] = useState("")
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isQualifiedLead, setIsQualifiedLead] = useState(false)
  const [visitedSections, setVisitedSections] = useState<string[]>([])
  const [interactionCount, setInteractionCount] = useState(0)
  const [timeOnSite, setTimeOnSite] = useState(0)
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])
  const [userInput, setUserInput] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const siteEntryTime = useRef<number>(Date.now())

  const getProactiveMessages = () => {
    const messages = ["Hola! Soy Andrea Cardoso, tu asesora cloud. Veo que estás explorando nuestra plataforma."]

    if (visitedSections.includes("/vps")) {
      messages.push("Noto que has revisado nuestros VPS. Tenemos planes desde $5/mes con gran rendimiento.")
    }

    if (visitedSections.includes("/speedtest")) {
      messages.push("Has probado nuestro speedtest. ¿Te gustaría saber más sobre nuestras velocidades garantizadas?")
    }

    if (visitedSections.includes("/detector-caidas")) {
      messages.push("Veo que revisas nuestro monitor de servicios. Ofrecemos 99.9% de uptime garantizado.")
    }

    if (visitedSections.length >= 3) {
      messages.push("Has explorado varias secciones. ¿Te gustaría que conversemos sobre tus necesidades específicas?")
    }

    if (timeOnSite > 120) {
      messages.push(
        "Llevas ya algunos minutos con nosotros. Estoy aquí para ayudarte a encontrar la mejor solución cloud para ti.",
      )
    }

    return messages
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, proactiveMessageIndex])

  useEffect(() => {
    if (showProactiveMessages && !contactFormSubmitted) {
      const proactiveMessages = getProactiveMessages()

      if (proactiveMessageIndex < proactiveMessages.length) {
        const timer = setTimeout(() => {
          setProactiveMessageIndex(proactiveMessageIndex + 1)
        }, 4000) // Nuevo mensaje cada 4 segundos

        return () => clearTimeout(timer)
      }
    }
  }, [showProactiveMessages, proactiveMessageIndex, visitedSections, timeOnSite, contactFormSubmitted])

  useEffect(() => {
    console.log("[v0] Andrea tracking page:", pathname)

    if (tracker) {
      tracker.track("page_view", {
        page: pathname,
        url: window.location.href,
        title: document.title,
        timeOnSite,
        visitedSections: visitedSections.length,
      })
    }

    // Add to visited sections
    if (pathname && !visitedSections.includes(pathname)) {
      setVisitedSections([...visitedSections, pathname])
      setInteractionCount(interactionCount + 1)

      console.log("[v0] Andrea: Nueva sección visitada", pathname)
      console.log("[v0] Andrea: Total secciones visitadas", visitedSections.length + 1)
    }

    const timer = setTimeout(() => {
      const hasSeenWidget = sessionStorage.getItem("hasSeenAndrea")

      if (!hasSeenWidget) {
        setIsOpen(true)
        setShowProactiveMessages(true)
        sessionStorage.setItem("hasSeenAndrea", "true")
      }

      if (visitedSections.length >= 3 && timeOnSite > 60 && !isQualifiedLead) {
        console.log("[v0] Andrea: Lead calificado detectado")
        setIsQualifiedLead(true)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [pathname, visitedSections, timeOnSite, interactionCount, isQualifiedLead])

  useEffect(() => {
    const checkAuth = () => {
      const auth = typeof window !== "undefined" && localStorage.getItem("isAuthenticated") === "true"
      setIsAuthenticated(auth)
      console.log("[v0] Andrea: Usuario autenticado", auth)
    }

    checkAuth()
    window.addEventListener("storage", checkAuth)
    return () => window.removeEventListener("storage", checkAuth)
  }, [])

  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/login")) {
    return null
  }

  const handleStartConversation = () => {
    setShowProactiveMessages(false)
    setShowContactForm(true)
    console.log("[v0] Andrea: Usuario inicia conversación")

    if (tracker) {
      tracker.track("andrea_conversation_started", {
        visitedSections: visitedSections.length,
        timeOnSite,
      })
    }
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      contactName.trim() &&
      contactLastName.trim() &&
      contactCompany.trim() &&
      contactPhone.trim() &&
      contactCountry.trim()
    ) {
      console.log("[v0] Andrea: Formulario de contacto enviado")

      if (tracker) {
        tracker.track("contact_form_submitted", {
          name: `${contactName} ${contactLastName}`,
          company: contactCompany,
          phone: contactPhone,
          country: contactCountry,
          visitedSections: visitedSections.length,
          timeOnSite,
        })
      }

      setContactFormSubmitted(true)
      setShowContactForm(false)

      setMessages([
        {
          role: "assistant",
          content: `Hola ${contactName}! Gracias por tu información. He visto que has explorado ${visitedSections.length > 1 ? "varias de nuestras secciones" : "nuestro sitio"}. ¿En qué te puedo ayudar específicamente?`,
        },
      ])
    }
  }

  const handleSendMessage = async () => {
    if (!userInput.trim() || isAnalyzing) return

    console.log("[v0] Andrea: Mensaje enviado por usuario")
    setInteractionCount(interactionCount + 1)

    const newMessages = [...messages, { role: "user" as const, content: userInput }]
    setMessages(newMessages)
    setUserInput("")
    setIsAnalyzing(true)

    try {
      const response = await fetch("/api/andrea/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          context: {
            isAuthenticated,
            contactFormSubmitted,
            visitedSections,
            timeOnSite,
            interactionCount,
            isQualifiedLead,
            contactInfo: contactFormSubmitted
              ? {
                  name: `${contactName} ${contactLastName}`,
                  company: contactCompany,
                  phone: contactPhone,
                  country: contactCountry,
                }
              : null,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.message) {
        setMessages([...newMessages, { role: "assistant", content: data.message }])

        if (data.qualified || data.confidence > 0.7) {
          console.log("[v0] Andrea: Lead calificado por IA")
          setIsQualifiedLead(true)
        }

        if (data.actions) {
          const whatsappAction = data.actions.find((a: any) => a.type === "redirect_whatsapp")
          if (whatsappAction && isQualifiedLead && data.shouldContact) {
            window.open(
              `https://api.whatsapp.com/send?phone=573023229535&text=${encodeURIComponent(`Hola, soy ${contactName} de ${contactCompany}. Estoy interesado en tener un contacto cercano sobre sus servicios cloud.`)}`,
              "_blank",
            )
          }
        }
      }
    } catch (error) {
      console.error("[v0] Andrea Widget Error:", error)
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Disculpa, tuve un problema técnico. ¿Podrías intentar de nuevo? Sigo aquí para ayudarte.",
        },
      ])
    } finally {
      setIsAnalyzing(false)
    }
  }

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Abrir asistente Andrea"
      >
        <div className="relative">
          <img
            src="/andrea-assistant.jpg"
            alt="Andrea - Asesora Cloud"
            className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-cyan-400 group-hover:border-cyan-300 transition-all"
          />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          {(showProactiveMessages || isQualifiedLead) && (
            <div className="absolute -top-2 -left-2 bg-cyan-500 text-white text-xs px-2 py-1 rounded-full shadow-lg animate-bounce">
              Tengo un mensaje
            </div>
          )}
        </div>
      </button>
    )
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Abrir chat con Andrea"
        >
          <div className="relative">
            <img
              src="/andrea-assistant.jpg"
              alt="Andrea"
              className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-cyan-400 group-hover:border-cyan-300 transition-all group-hover:scale-110"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </div>
        </button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-96 shadow-2xl border-cyan-400/50 bg-gradient-to-br from-slate-900 to-slate-800 max-h-[600px] flex flex-col">
          <div className="p-4 flex-shrink-0">
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <img
                src="/andrea-assistant.jpg"
                alt="Andrea"
                className="w-14 h-14 rounded-full object-cover border-2 border-cyan-400 shadow-lg"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold">Andrea Cardoso</h3>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                <p className="text-xs text-gray-400">{isAuthenticated ? "Asesora VIP" : "Asesora Cloud"} · En línea</p>
                {visitedSections.length > 0 && (
                  <p className="text-xs text-cyan-400 mt-1">
                    {visitedSections.length} {visitedSections.length === 1 ? "sección" : "secciones"} ·{" "}
                    {Math.floor(timeOnSite / 60)}min en sitio
                  </p>
                )}
              </div>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsMinimized(true)}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-slate-700"
                >
                  <span className="text-lg">−</span>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-slate-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4">
            {showProactiveMessages && !contactFormSubmitted && (
              <div className="space-y-4">
                {getProactiveMessages()
                  .slice(0, proactiveMessageIndex)
                  .map((msg, idx) => (
                    <div key={idx} className="flex gap-2 justify-start animate-fade-in">
                      <div className="w-7 h-7 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                      <div className="max-w-[75%] rounded-lg p-3 text-sm bg-slate-700 text-slate-200 border border-cyan-500/30">
                        <p className="whitespace-pre-line leading-relaxed">{msg}</p>
                      </div>
                    </div>
                  ))}

                {proactiveMessageIndex > 0 && (
                  <div className="flex justify-center mt-4">
                    <Button
                      onClick={handleStartConversation}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Comenzar conversación con Andrea
                    </Button>
                  </div>
                )}

                <p className="text-xs text-gray-500 text-center mt-3">
                  Andrea sigue rastreando tu navegación para ayudarte mejor
                </p>
                <div ref={messagesEndRef} />
              </div>
            )}

            {showContactForm && !contactFormSubmitted && (
              <>
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-200 leading-relaxed">
                    Perfecto! Para poder ayudarte mejor y comenzar nuestra conversación, necesito algunos datos básicos:
                  </p>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 text-sm"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Apellido"
                    value={contactLastName}
                    onChange={(e) => setContactLastName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 text-sm"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Compañía"
                    value={contactCompany}
                    onChange={(e) => setContactCompany(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 text-sm"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Celular"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 text-sm"
                    required
                  />
                  <input
                    type="text"
                    placeholder="País"
                    value={contactCountry}
                    onChange={(e) => setContactCountry(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 text-sm"
                    required
                  />
                  <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar y comenzar chat
                  </Button>
                </form>
              </>
            )}

            {contactFormSubmitted && (
              <>
                <div className="space-y-3">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.role === "assistant" && (
                        <div className="w-7 h-7 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] rounded-lg p-3 text-sm ${
                          msg.role === "user"
                            ? "bg-cyan-500 text-white"
                            : "bg-slate-700 text-slate-200 border border-cyan-500/30"
                        }`}
                      >
                        <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {isAnalyzing && (
                    <div className="flex gap-2 justify-start">
                      <div className="w-7 h-7 rounded-full bg-cyan-500 flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-white animate-spin" />
                      </div>
                      <div className="bg-slate-700 border border-cyan-500/30 rounded-lg p-3">
                        <p className="text-slate-400 text-sm">Andrea está analizando...</p>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </>
            )}
          </div>

          {contactFormSubmitted && (
            <div className="p-4 border-t border-slate-700 flex-shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder={isAuthenticated ? "Escribe tu mensaje..." : "Pregúntame lo que necesites..."}
                  className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 text-sm"
                  disabled={isAnalyzing}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!userInput.trim() || isAnalyzing}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-4"
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {isQualifiedLead && (
                <div className="mt-3 p-3 bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-xs text-gray-300 mb-2">
                    Veo que estás muy interesado. ¿Quieres un contacto más directo?
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() =>
                        window.open(
                          `https://api.whatsapp.com/send?phone=573023229535&text=${encodeURIComponent(`Hola, soy ${contactName} de ${contactCompany}. Estoy muy interesado en sus servicios cloud.`)}`,
                          "_blank",
                        )
                      }
                      size="sm"
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs"
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      WhatsApp
                    </Button>
                    <Button
                      onClick={() => {
                        const contactSection = document.getElementById("contact")
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: "smooth" })
                        }
                      }}
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                    >
                      Formulario
                    </Button>
                  </div>
                </div>
              )}

              {isAuthenticated && (
                <p className="text-xs text-center text-green-400 mt-2">Usuario VIP · Acceso completo a Andrea</p>
              )}
            </div>
          )}
        </Card>
      )}
    </>
  )
}
