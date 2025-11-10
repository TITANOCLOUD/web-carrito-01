"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Mail, Shield, Server, Globe } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Host {
  id: string
  name: string
  ip: string
  status: "online" | "warning" | "offline"
  reactor: number
  uptime?: string
  lastCheck?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [hosts, setHosts] = useState<Host[]>([
    { id: "1", name: "Cluster IBG", ip: "192.168.1.10", status: "online", reactor: 1, uptime: "99.9%" },
    { id: "2", name: "Cluster INTEGRA", ip: "192.168.1.11", status: "online", reactor: 1, uptime: "99.8%" },
    { id: "3", name: "Cluster KATIA RIVERO", ip: "192.168.1.12", status: "warning", reactor: 1, uptime: "95.2%" },
    { id: "4", name: "Servidor Principal", ip: "192.168.1.13", status: "online", reactor: 1, uptime: "99.7%" },
    { id: "5", name: "Mail Server 1", ip: "192.168.2.10", status: "online", reactor: 2, uptime: "99.9%" },
    { id: "6", name: "Mail Server 2", ip: "192.168.2.11", status: "online", reactor: 2, uptime: "99.8%" },
    { id: "7", name: "Zimbra Server", ip: "192.168.2.12", status: "offline", reactor: 2, uptime: "0%" },
    { id: "8", name: "Exchange Server", ip: "192.168.2.13", status: "online", reactor: 2, uptime: "98.5%" },
    { id: "9", name: "Spam Gateway 1", ip: "192.168.3.10", status: "online", reactor: 3, uptime: "99.9%" },
    { id: "10", name: "Spam Gateway 2", ip: "192.168.3.11", status: "online", reactor: 3, uptime: "99.7%" },
    { id: "11", name: "Anti-Spam Filter", ip: "192.168.3.12", status: "online", reactor: 3, uptime: "99.5%" },
    { id: "12", name: "VPS-001", ip: "192.168.4.10", status: "online", reactor: 4, uptime: "99.9%" },
    { id: "13", name: "VPS-002", ip: "192.168.4.11", status: "warning", reactor: 4, uptime: "92.3%" },
    { id: "14", name: "Proxmox Node", ip: "192.168.4.12", status: "online", reactor: 4, uptime: "99.8%" },
    { id: "15", name: "pfSense Gateway", ip: "192.168.4.13", status: "online", reactor: 4, uptime: "100%" },
    { id: "16", name: "Web Server 1", ip: "192.168.5.10", status: "online", reactor: 5, uptime: "99.9%" },
    { id: "17", name: "Web Server 2", ip: "192.168.5.11", status: "online", reactor: 5, uptime: "99.7%" },
    { id: "18", name: "cPanel Server", ip: "192.168.5.12", status: "online", reactor: 5, uptime: "99.8%" },
  ])

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    if (auth !== "true") {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }

    const interval = setInterval(() => {
      setHosts((prev) =>
        prev.map((host) => ({
          ...host,
          status: Math.random() > 0.1 ? "online" : Math.random() > 0.5 ? "warning" : "offline",
          lastCheck: new Date().toLocaleTimeString(),
        })),
      )
    }, 30000)

    return () => clearInterval(interval)
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  const getStatusColor = (status: Host["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "offline":
        return "bg-red-500"
    }
  }

  const getReactorHosts = (reactor: number) => hosts.filter((h) => h.reactor === reactor)

  const ReactorCore = ({ reactorNumber }: { reactorNumber: number }) => {
    const reactorHosts = getReactorHosts(reactorNumber)
    const maxSlots = 37 // Número total de slots en el reactor (círculos concéntricos)

    // Posiciones en coordenadas polares para simular un reactor circular
    const positions = [
      // Centro (1 slot)
      { ring: 0, angle: 0, distance: 0 },
      // Anillo 1 (6 slots)
      ...Array.from({ length: 6 }, (_, i) => ({
        ring: 1,
        angle: (i * 60 * Math.PI) / 180,
        distance: 50,
      })),
      // Anillo 2 (12 slots)
      ...Array.from({ length: 12 }, (_, i) => ({
        ring: 2,
        angle: (i * 30 * Math.PI) / 180,
        distance: 100,
      })),
      // Anillo 3 (18 slots)
      ...Array.from({ length: 18 }, (_, i) => ({
        ring: 3,
        angle: (i * 20 * Math.PI) / 180,
        distance: 150,
      })),
    ]

    return (
      <div className="relative w-full aspect-square max-w-2xl mx-auto">
        {/* Círculos de fondo del reactor */}
        <div className="absolute inset-0 rounded-full border-4 border-purple-900/30 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-[10%] rounded-full border-4 border-green-900/20 bg-slate-800/50" />
        <div className="absolute inset-[25%] rounded-full border-4 border-blue-900/20 bg-slate-800/50" />
        <div className="absolute inset-[45%] rounded-full border-2 border-slate-700/30 bg-slate-800/50" />

        {/* Slots del reactor */}
        <TooltipProvider>
          {positions.map((pos, index) => {
            const host = reactorHosts[index]
            const x = 50 + (pos.distance / 200) * 40 * Math.cos(pos.angle)
            const y = 50 + (pos.distance / 200) * 40 * Math.sin(pos.angle)

            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div
                    className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 transition-all duration-300 cursor-pointer hover:scale-125"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      backgroundColor: host
                        ? host.status === "online"
                          ? "#22c55e"
                          : host.status === "warning"
                            ? "#eab308"
                            : "#ef4444"
                        : "#1e293b",
                      borderColor: host
                        ? host.status === "online"
                          ? "#16a34a"
                          : host.status === "warning"
                            ? "#ca8a04"
                            : "#dc2626"
                        : "#334155",
                      boxShadow: host
                        ? `0 0 10px ${
                            host.status === "online" ? "#22c55e" : host.status === "warning" ? "#eab308" : "#ef4444"
                          }`
                        : "none",
                    }}
                  />
                </TooltipTrigger>
                {host && (
                  <TooltipContent className="bg-slate-900 border-slate-700">
                    <div className="text-sm">
                      <p className="font-semibold text-white">{host.name}</p>
                      <p className="text-slate-400">IP: {host.ip}</p>
                      <p className="text-slate-400">Uptime: {host.uptime}</p>
                      <p
                        className={`font-semibold ${
                          host.status === "online"
                            ? "text-green-500"
                            : host.status === "warning"
                              ? "text-yellow-500"
                              : "text-red-500"
                        }`}
                      >
                        {host.status === "online"
                          ? "En Línea"
                          : host.status === "warning"
                            ? "Advertencia"
                            : "Fuera de Línea"}
                      </p>
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            )
          })}
        </TooltipProvider>

        {/* Etiquetas del reactor */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm text-slate-400 font-semibold">
          REACTOR {reactorNumber}
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-slate-500">
          {reactorHosts.length} / {maxSlots} slots activos
        </div>
      </div>
    )
  }

  const getReactorDescription = (reactor: number) => {
    switch (reactor) {
      case 1:
        return "El Reactor 1 muestra los clusteres de bases de datos y almacenamiento distribuido"
      case 2:
        return "El Reactor 2 (SOD) muestra los servidores de correo electrónico y sistemas de mensajería"
      case 3:
        return "El Reactor 3 muestra los servidores de spam y gateways de seguridad anti-spam"
      case 4:
        return "El Reactor 4 muestra los servidores virtuales, VPS y sistemas de virtualización"
      case 5:
        return "El Reactor 5 muestra las páginas web, servidores de hosting y sistemas cPanel"
      default:
        return ""
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Bienvenido al Reactor</h1>
        <p className="text-slate-400">
          Sistema de monitoreo en tiempo real de infraestructura - Visualización tipo núcleo de reactor nuclear
        </p>
      </div>

      <Tabs defaultValue="reactor1" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800 mb-8">
          <TabsTrigger value="reactor1" className="data-[state=active]:bg-slate-700">
            <Database className="w-4 h-4 mr-2" />
            Reactor 1
          </TabsTrigger>
          <TabsTrigger value="reactor2" className="data-[state=active]:bg-slate-700">
            <Mail className="w-4 h-4 mr-2" />
            Reactor 2 (SOD)
          </TabsTrigger>
          <TabsTrigger value="reactor3" className="data-[state=active]:bg-slate-700">
            <Shield className="w-4 h-4 mr-2" />
            Reactor 3
          </TabsTrigger>
          <TabsTrigger value="reactor4" className="data-[state=active]:bg-slate-700">
            <Server className="w-4 h-4 mr-2" />
            Reactor 4
          </TabsTrigger>
          <TabsTrigger value="reactor5" className="data-[state=active]:bg-slate-700">
            <Globe className="w-4 h-4 mr-2" />
            Reactor 5
          </TabsTrigger>
        </TabsList>

        {[1, 2, 3, 4, 5].map((reactorNum) => (
          <TabsContent key={reactorNum} value={`reactor${reactorNum}`} className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-center">
                  Reactor {reactorNum}
                  {reactorNum === 2 && " (SOD)"} - Núcleo de Monitoreo
                </CardTitle>
                <CardDescription className="text-slate-400 text-center">
                  {getReactorDescription(reactorNum)}
                </CardDescription>
              </CardHeader>
              <CardContent className="py-12">
                <ReactorCore reactorNumber={reactorNum} />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
