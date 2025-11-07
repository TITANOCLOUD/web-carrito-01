"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, MessageCircle, Phone } from "lucide-react"
import Image from "next/image"

export function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShownWelcome, setHasShownWelcome] = useState(false)
  const [currentPage, setCurrentPage] = useState("")
  const [timeOnPage, setTimeOnPage] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user")
      setIsAuthenticated(!!user)
    }
    checkAuth()
    // Listen for storage changes
    window.addEventListener("storage", checkAuth)
    return () => window.removeEventListener("storage", checkAuth)
  }, [])

  // Detect page and show contextual help
  useEffect(() => {
    setCurrentPage(window.location.pathname)

    if (window.location.pathname.includes("/dashboard") || window.location.pathname.includes("/login")) {
      return
    }

    // Show welcome message after 5 seconds on first visit
    const welcomeTimer = setTimeout(() => {
      if (!hasShownWelcome) {
        setIsOpen(true)
        setHasShownWelcome(true)
      }
    }, 5000)

    // Track time on page
    const timeInterval = setInterval(() => {
      setTimeOnPage((prev) => prev + 1)
    }, 1000)

    return () => {
      clearTimeout(welcomeTimer)
      clearInterval(timeInterval)
    }
  }, [hasShownWelcome])

  // Show help if user has been on page for 30 seconds
  useEffect(() => {
    if (timeOnPage === 30 && !isOpen) {
      setIsOpen(true)
    }
  }, [timeOnPage, isOpen])

  const getContextualMessage = () => {
    const greeting = isAuthenticated ? "¡Hola de nuevo!" : "¡Hola!"

    if (currentPage === "/") {
      return `${greeting} Soy Andrea, tu asistente personal. ¿Necesitas ayuda para elegir el mejor plan para tu empresa?`
    }
    if (currentPage.includes("bare-metal")) {
      return "Estoy aquí para ayudarte con cualquier pregunta sobre nuestros servidores Bare Metal. ¿Qué necesitas saber?"
    }
    if (currentPage.includes("vps")) {
      return "¿Tienes dudas sobre nuestros VPS? Estoy lista para ayudarte a encontrar la mejor solución."
    }
    if (currentPage.includes("clusters")) {
      return "Los Clusters pueden ser complejos. Déjame ayudarte a configurar el mejor para ti."
    }
    if (currentPage.includes("calculadora")) {
      return "Veo que estás calculando precios. Si tienes preguntas, estoy aquí para ayudarte."
    }
    return `${greeting} Soy Andrea, estoy aquí para ayudarte con lo que necesites.`
  }

  const handleContact = () => {
    window.location.href = "/contacto"
  }

  const handleCall = () => {
    window.location.href = "tel:+573001234567" // Replace with actual phone
  }

  const handleMinimize = () => {
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all hover:scale-110"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-[340px] shadow-2xl border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="flex items-center justify-between p-4 border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-cyan-500/50">
              <Image src="/professional-latina-business-woman-with-headset-cu.jpg" alt="Andrea - Asistente Virtual" fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Andrea</h3>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-cyan-400">Asistente Virtual</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMinimize}
            className="text-gray-400 hover:text-white hover:bg-slate-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-800/50 rounded-lg p-4 border border-cyan-500/20">
            <p className="text-sm text-gray-200 leading-relaxed">{getContextualMessage()}</p>
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleContact}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Enviar Mensaje
            </Button>

            <Button
              onClick={handleCall}
              variant="outline"
              className="w-full border-cyan-500/30 hover:bg-cyan-500/10 bg-transparent text-cyan-400 hover:text-cyan-300"
            >
              <Phone className="mr-2 h-4 w-4" />
              Llamar Ahora
            </Button>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">Estoy aquí para ayudarte • Respuesta rápida garantizada</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
