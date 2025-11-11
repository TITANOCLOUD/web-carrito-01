"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Send, Sparkles, AlertTriangle, CheckCircle2, Bell, XCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import Image from "next/image"

type Alert = {
  id: string
  severity: "red" | "yellow" | "green"
  host: string
  message: string
  timestamp: Date
  reactor: string
  metric: string
  value: string
  threshold: string
}

type Task = {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  status: "pending" | "completed"
  createdAt: Date
  relatedHost?: string
}

export function CasandraWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [activeTab, setActiveTab] = useState<"chat" | "alerts" | "tasks">("alerts")
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])
  const [userInput, setUserInput] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [unreadAlerts, setUnreadAlerts] = useState(0)
  const [unreadTasks, setUnreadTasks] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    console.log("[v0] Casandra: Componente montado")
    console.log("[v0] Casandra: Pathname actual:", pathname)
    console.log("[v0] Casandra: ¿Está en dashboard?", pathname?.startsWith("/dashboard"))
  }, [pathname])

  useEffect(() => {
    if (!pathname?.startsWith("/dashboard")) {
      console.log("[v0] Casandra: No está en dashboard, no se renderiza")
      return
    }

    console.log("[v0] Casandra: Iniciando carga de alertas y tareas")

    // Cargar alertas y tareas al iniciar
    loadAlerts()
    loadTasks()

    // Verificar alertas cada 30 segundos
    const interval = setInterval(() => {
      loadAlerts()
    }, 30000)

    return () => clearInterval(interval)
  }, [pathname])

  const loadAlerts = async () => {
    try {
      console.log("[v0] Casandra: Cargando alertas...")
      const response = await fetch("/api/casandra/alerts")
      const data = await response.json()

      if (data.alerts) {
        const newAlerts = data.alerts.filter((alert: Alert) => alert.severity === "red" || alert.severity === "yellow")
        setAlerts(newAlerts)
        console.log("[v0] Casandra: Alertas cargadas:", newAlerts.length)

        // Contar alertas no leídas (últimas 5 minutos)
        const recentAlerts = newAlerts.filter(
          (alert: Alert) => new Date().getTime() - new Date(alert.timestamp).getTime() < 300000,
        )
        setUnreadAlerts(recentAlerts.length)
        console.log("[v0] Casandra: Alertas no leídas:", recentAlerts.length)
      }
    } catch (error) {
      console.error("[v0] Casandra: Error cargando alertas", error)
    }
  }

  const loadTasks = async () => {
    try {
      console.log("[v0] Casandra: Cargando tareas...")
      const response = await fetch("/api/casandra/tasks")
      const data = await response.json()

      if (data.tasks) {
        setTasks(data.tasks)
        const pendingTasks = data.tasks.filter((task: Task) => task.status === "pending")
        setUnreadTasks(pendingTasks.length)
        console.log("[v0] Casandra: Tareas cargadas:", data.tasks.length, "pendientes:", pendingTasks.length)
      }
    } catch (error) {
      console.error("[v0] Casandra: Error cargando tareas", error)
    }
  }

  const handleSendMessage = async () => {
    if (!userInput.trim() || isAnalyzing) return

    const newMessages = [...messages, { role: "user" as const, content: userInput }]
    setMessages(newMessages)
    setUserInput("")
    setIsAnalyzing(true)

    try {
      const response = await fetch("/api/casandra/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          context: {
            alerts: alerts.length,
            tasks: tasks.filter((t) => t.status === "pending").length,
            currentPath: pathname,
          },
        }),
      })

      const data = await response.json()
      if (data.message) {
        setMessages([...newMessages, { role: "assistant", content: data.message }])
      }
    } catch (error) {
      console.error("[v0] Casandra: Error en chat", error)
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Disculpa, tuve un problema técnico. Por favor intenta nuevamente.",
        },
      ])
    } finally {
      setIsAnalyzing(false)
    }
  }

  const markTaskComplete = async (taskId: string) => {
    try {
      await fetch(`/api/casandra/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed" }),
      })
      loadTasks()
    } catch (error) {
      console.error("[v0] Casandra: Error marcando tarea", error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // No mostrar fuera del dashboard
  if (!pathname?.startsWith("/dashboard")) {
    console.log("[v0] Casandra: Retornando null - fuera del dashboard")
    return null
  }

  console.log("[v0] Casandra: Renderizando widget - isMinimized:", isMinimized, "isOpen:", isOpen)

  if (isMinimized) {
    return (
      <button
        onClick={() => {
          console.log("[v0] Casandra: Expandiendo widget")
          setIsMinimized(false)
        }}
        className="fixed bottom-6 right-6 z-[9999] group animate-bounce"
        aria-label="Abrir asistente Casandra"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-purple-500 blur-2xl opacity-70 animate-pulse" />
          <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-2xl border-4 border-purple-400 group-hover:border-purple-300 transition-all">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-InJrdBlpyEUwUkEO6nBr8JzNEeDmXm.png"
              alt="Casandra Nova"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse shadow-lg" />
          {(unreadAlerts > 0 || unreadTasks > 0) && (
            <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-lg animate-bounce font-bold">
              {unreadAlerts + unreadTasks}
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
          onClick={() => {
            console.log("[v0] Casandra: Abriendo widget")
            setIsOpen(true)
          }}
          className="fixed bottom-6 right-6 z-[9999] group"
          aria-label="Abrir asistente Casandra"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-purple-500 blur-2xl opacity-60 group-hover:opacity-80 transition-opacity animate-pulse" />
            <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-2xl border-4 border-purple-400 group-hover:scale-110 group-hover:border-purple-300 transition-all">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-InJrdBlpyEUwUkEO6nBr8JzNEeDmXm.png"
                alt="Casandra Nova"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse shadow-lg" />
            {(unreadAlerts > 0 || unreadTasks > 0) && (
              <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-lg font-bold animate-pulse">
                {unreadAlerts + unreadTasks}
              </div>
            )}
          </div>
        </button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-[9999] w-[480px] shadow-2xl border-purple-400/50 bg-gradient-to-br from-slate-900 to-slate-800 max-h-[650px] flex flex-col">
          <div className="p-4 flex-shrink-0 border-b border-slate-700">
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg border-2 border-purple-400">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-InJrdBlpyEUwUkEO6nBr8JzNEeDmXm.png"
                    alt="Casandra Nova"
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                </div>
                {/* Pacific Rim style robot badge */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg border-2 border-slate-900">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold">Casandra Nova</h3>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                <p className="text-xs text-gray-400">Arquitecta Nivel 4 · NOC/SOC Specialist</p>
                <p className="text-xs text-purple-400 mt-1">Saturno Cloud Panel · Monitoreo Activo</p>
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

            {/* Tabs */}
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => setActiveTab("alerts")}
                className={`flex-1 ${
                  activeTab === "alerts"
                    ? "bg-red-500/20 text-red-400 border-red-500/50"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
                variant="outline"
              >
                <Bell className="w-4 h-4 mr-2" />
                Alertas
                {unreadAlerts > 0 && <Badge className="ml-2 bg-red-500 text-white">{unreadAlerts}</Badge>}
              </Button>
              <Button
                size="sm"
                onClick={() => setActiveTab("tasks")}
                className={`flex-1 ${
                  activeTab === "tasks"
                    ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
                variant="outline"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Tareas
                {unreadTasks > 0 && <Badge className="ml-2 bg-yellow-500 text-white">{unreadTasks}</Badge>}
              </Button>
              <Button
                size="sm"
                onClick={() => setActiveTab("chat")}
                className={`flex-1 ${
                  activeTab === "chat"
                    ? "bg-purple-500/20 text-purple-400 border-purple-500/50"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
                variant="outline"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Chat
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {/* Alertas Tab */}
            {activeTab === "alerts" && (
              <div className="space-y-3">
                {alerts.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p className="text-slate-300 font-semibold mb-2">Todo está funcionando correctamente</p>
                    <p className="text-slate-500 text-sm">No hay alertas críticas o de advertencia en este momento</p>
                  </div>
                ) : (
                  alerts.map((alert) => (
                    <Card
                      key={alert.id}
                      className={`p-4 border-l-4 ${
                        alert.severity === "red" ? "border-red-500 bg-red-500/10" : "border-yellow-500 bg-yellow-500/10"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {alert.severity === "red" ? (
                          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-white font-semibold text-sm">{alert.host}</h4>
                            <Badge
                              className={
                                alert.severity === "red" ? "bg-red-500 text-white" : "bg-yellow-500 text-white"
                              }
                            >
                              {alert.severity === "red" ? "Crítico" : "Advertencia"}
                            </Badge>
                          </div>
                          <p className="text-slate-300 text-sm mb-2">{alert.message}</p>
                          <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                            <div>
                              <span className="text-slate-500">Reactor:</span> {alert.reactor}
                            </div>
                            <div>
                              <span className="text-slate-500">Métrica:</span> {alert.metric}
                            </div>
                            <div>
                              <span className="text-slate-500">Valor:</span> {alert.value}
                            </div>
                            <div>
                              <span className="text-slate-500">Umbral:</span> {alert.threshold}
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 mt-2">{new Date(alert.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}

            {/* Tareas Tab */}
            {activeTab === "tasks" && (
              <div className="space-y-3">
                {tasks.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p className="text-slate-300 font-semibold mb-2">No hay tareas pendientes</p>
                    <p className="text-slate-500 text-sm">Todas las tareas han sido completadas</p>
                  </div>
                ) : (
                  tasks.map((task) => (
                    <Card
                      key={task.id}
                      className={`p-4 ${
                        task.status === "completed"
                          ? "bg-green-500/10 border-green-500/30"
                          : "bg-slate-800 border-slate-700"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={task.status === "completed"}
                          onChange={() => markTaskComplete(task.id)}
                          className="mt-1 w-4 h-4 rounded border-slate-600 text-purple-600 focus:ring-purple-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h4
                              className={`font-semibold text-sm ${
                                task.status === "completed" ? "text-slate-400 line-through" : "text-white"
                              }`}
                            >
                              {task.title}
                            </h4>
                            <Badge
                              className={
                                task.priority === "high"
                                  ? "bg-red-500 text-white"
                                  : task.priority === "medium"
                                    ? "bg-yellow-500 text-white"
                                    : "bg-blue-500 text-white"
                              }
                            >
                              {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Media" : "Baja"}
                            </Badge>
                          </div>
                          <p className="text-slate-400 text-sm mb-2">{task.description}</p>
                          {task.relatedHost && (
                            <p className="text-xs text-purple-400">Relacionado: {task.relatedHost}</p>
                          )}
                          <p className="text-xs text-slate-500 mt-2">{new Date(task.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}

            {/* Chat Tab */}
            {activeTab === "chat" && (
              <>
                <div className="space-y-3 mb-4">
                  {messages.length === 0 && (
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
                      <p className="text-sm text-gray-200 leading-relaxed">
                        Hola, soy Casandra Nova, tu Arquitecta Nivel 4 especializada en NOC/SOC. Estoy monitoreando
                        constantemente tus reactores y el comportamiento de tus máquinas. ¿En qué puedo ayudarte?
                      </p>
                    </div>
                  )}

                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] rounded-lg p-3 text-sm ${
                          msg.role === "user"
                            ? "bg-purple-600 text-white"
                            : "bg-slate-700 text-slate-200 border border-purple-500/30"
                        }`}
                      >
                        <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ))}

                  {isAnalyzing && (
                    <div className="flex gap-2 justify-start">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white animate-spin" />
                      </div>
                      <div className="bg-slate-700 border border-purple-500/30 rounded-lg p-3">
                        <p className="text-slate-400 text-sm">Casandra está analizando...</p>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input para chat */}
          {activeTab === "chat" && (
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
                  placeholder="Pregúntame sobre el estado de tus sistemas..."
                  className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 text-sm"
                  disabled={isAnalyzing}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!userInput.trim() || isAnalyzing}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4"
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}
    </>
  )
}
