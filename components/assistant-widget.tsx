"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Send, Sparkles, Phone } from "lucide-react"
import { usePathname } from "next/navigation"
import { tracker } from "@/lib/tracking-client"

export function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [contactName, setContactName] = useState("")
  const [contactLastName, setContactLastName] = useState("")
  const [contactCompany, setContactCompany] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [contactCountry, setContactCountry] = useState("")
  const [canChat, setCanChat] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])
  const [userInput, setUserInput] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (tracker) {
      tracker.track("page_view", {
        page: pathname,
        url: window.location.href,
        title: document.title,
      })
    }

    const timer = setTimeout(() => {
      const hasSeenWidget = sessionStorage.getItem("hasSeenAndrea")
      if (!hasSeenWidget) {
        setIsOpen(true)
        sessionStorage.setItem("hasSeenAndrea", "true")
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [pathname])

  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/login")) {
    return null
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
      if (tracker) {
        tracker.track("support_request", {
          channel: "chat",
          reason: "Contact info provided",
          name: `${contactName} ${contactLastName}`,
          company: contactCompany,
          phone: contactPhone,
          country: contactCountry,
        })
      }

      setCanChat(true)
      setMessages([
        {
          role: "assistant",
          content: `Hola ${contactName}, gracias por tu información. ¿En qué te puedo ayudar? ¿Qué necesitas?`,
        },
      ])
    }
  }

  const handleSendMessage = async () => {
    if (!userInput.trim() || isAnalyzing) return

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
          isAuthenticated: true,
          contactInfo: {
            name: `${contactName} ${contactLastName}`,
            company: contactCompany,
            phone: contactPhone,
            country: contactCountry,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.message) {
        setMessages([...newMessages, { role: "assistant", content: data.message }])

        if (data.actions) {
          const whatsappAction = data.actions.find((a: any) => a.type === "redirect_whatsapp")
          if (whatsappAction) {
            window.open(
              `https://api.whatsapp.com/send?phone=573023229535&text=Hola%20estoy%20interesado%20en%20tener%20un%20contacto%20cercano%20para%20venta%20de%20servicio%20o%20producto`,
              "_blank",
            )
          }
        }
      }
    } catch (error) {
      console.error("[Andrea Widget] Error:", error)
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Disculpa, tuve un problema. ¿Podrías intentar de nuevo?",
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
                  <h3 className="text-white font-semibold">Andrea</h3>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                <p className="text-xs text-gray-400">Asesora Cloud · En línea</p>
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
            {!canChat ? (
              <>
                <div className="bg-slate-700/50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-200 leading-relaxed">
                    Hola, antes de que conversemos, necesito validar algunos datos. Déjame tu información y empezamos.
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
                    Comenzar conversación con Andrea
                  </Button>
                </form>

                <p className="text-xs text-gray-500 text-center mt-3">Tu información está segura</p>
              </>
            ) : (
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
                        <p className="text-slate-400 text-sm">Andrea está escribiendo...</p>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </>
            )}
          </div>

          {canChat && (
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
                  placeholder="Escribe tu mensaje..."
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
              <div className="mt-2 flex gap-2">
                <Button
                  onClick={() =>
                    window.open(
                      `https://api.whatsapp.com/send?phone=573023229535&text=Hola%20estoy%20interesado%20en%20tener%20un%20contacto%20cercano%20para%20venta%20de%20servicio%20o%20producto`,
                      "_blank",
                    )
                  }
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs border-green-500 text-green-400 hover:bg-green-500/10"
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
        </Card>
      )}
    </>
  )
}
