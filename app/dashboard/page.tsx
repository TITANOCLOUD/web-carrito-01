"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Mail, Shield, Server, Globe, RefreshCw, ExternalLink } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Host {
  id: string
  name: string
  ip: string
  status: "online" | "warning" | "offline"
  reactor: number
  uptime?: string
  lastCheck?: string
  type?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedHost, setSelectedHost] = useState<Host | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [hosts, setHosts] = useState<Host[]>([
    // Reactor 1 - Clusters (Ceph, Storage)
    {
      id: "483431",
      name: "ibg-sca3-g2-ceph-bay-01",
      ip: "72.251.3.93",
      status: "online",
      reactor: 1,
      type: "Ceph Storage",
      uptime: "99.9%",
    },
    {
      id: "501691",
      name: "ibg-sca3-g2-ceph-bay-02",
      ip: "72.251.3.238",
      status: "online",
      reactor: 1,
      type: "Ceph Storage",
      uptime: "99.8%",
    },
    {
      id: "493196",
      name: "ibg-sca3-g2-ceph-bay-03",
      ip: "72.251.3.212",
      status: "online",
      reactor: 1,
      type: "Ceph Storage",
      uptime: "99.7%",
    },
    {
      id: "408163",
      name: "ic-hgr3-ceph-01",
      ip: "51.222.152.249",
      status: "online",
      reactor: 1,
      type: "Ceph Storage",
      uptime: "99.9%",
    },
    {
      id: "422255",
      name: "ic-hgr3-ceph-02",
      ip: "15.235.43.68",
      status: "online",
      reactor: 1,
      type: "Ceph Storage",
      uptime: "99.6%",
    },
    {
      id: "449125",
      name: "ic-hgr3-ceph-03",
      ip: "15.235.67.40",
      status: "online",
      reactor: 1,
      type: "Ceph Storage",
      uptime: "99.5%",
    },
    {
      id: "444276",
      name: "x-hgr3-ceph-01",
      ip: "15.235.117.37",
      status: "online",
      reactor: 1,
      type: "Ceph Storage",
      uptime: "99.8%",
    },
    {
      id: "447437",
      name: "x-hgr3-ceph-03",
      ip: "15.235.117.52",
      status: "online",
      reactor: 1,
      type: "Ceph Storage",
      uptime: "99.7%",
    },
    {
      id: "447438",
      name: "x-hgr3-ceph-02",
      ip: "15.235.117.53",
      status: "online",
      reactor: 1,
      type: "Ceph Storage",
      uptime: "99.9%",
    },
    {
      id: "447439",
      name: "s-hgr3-ceph-01",
      ip: "15.235.117.54",
      status: "online",
      reactor: 1,
      type: "Ceph Storage",
      uptime: "99.6%",
    },
    {
      id: "453090",
      name: "adv5-g2-ceph-1",
      ip: "15.235.115.179",
      status: "online",
      reactor: 1,
      type: "Ceph Storage",
      uptime: "99.8%",
    },
    {
      id: "466298",
      name: "scale-i1-ceph3",
      ip: "51.222.249.37",
      status: "online",
      reactor: 1,
      type: "Ceph Storage",
      uptime: "99.5%",
    },
    {
      id: "469453",
      name: "sca1-ceph-bay-01",
      ip: "15.235.67.86",
      status: "online",
      reactor: 1,
      type: "Ceph Storage",
      uptime: "99.9%",
    },
    {
      id: "469461",
      name: "scale-i1-ceph1",
      ip: "15.235.67.115",
      status: "online",
      reactor: 1,
      type: "Ceph Storage",
      uptime: "99.7%",
    },
    {
      id: "469855",
      name: "sca1-ceph-bay-03",
      ip: "15.235.43.103",
      status: "online",
      reactor: 1,
      type: "Ceph Storage",
      uptime: "99.8%",
    },
    {
      id: "469864",
      name: "sca1-ceph-bay-02",
      ip: "15.235.67.180",
      status: "online",
      reactor: 1,
      type: "Ceph Storage",
      uptime: "99.6%",
    },
    {
      id: "469870",
      name: "scale-i1-ceph2",
      ip: "15.235.67.186",
      status: "online",
      reactor: 1,
      type: "Ceph Storage",
      uptime: "99.9%",
    },
    {
      id: "412703",
      name: "adv-4-clu",
      ip: "51.222.248.167",
      status: "online",
      reactor: 1,
      type: "Cluster",
      uptime: "99.8%",
    },

    // Reactor 2 - Servidores de Correo (Zimbra, Mail)
    {
      id: "378012",
      name: "hbtc-infra-1-zimbra-corzo",
      ip: "51.222.47.74",
      status: "online",
      reactor: 2,
      type: "Zimbra Mail",
      uptime: "99.9%",
    },
    {
      id: "482760",
      name: "bt-hgr1-g1-mongo-gateway",
      ip: "51.222.152.216",
      status: "online",
      reactor: 2,
      type: "Mail Gateway",
      uptime: "99.7%",
    },
    {
      id: "484061",
      name: "bt-hgr3-g1-mongo-gateway",
      ip: "148.113.187.42",
      status: "online",
      reactor: 2,
      type: "Mail Gateway",
      uptime: "99.6%",
    },

    // Reactor 3 - Servidores de Spam
    {
      id: "100001",
      name: "hbtc-spam239-vm-2001",
      ip: "54.39.125.239",
      status: "online",
      reactor: 3,
      type: "Spam Filter",
      uptime: "99.9%",
    },
    {
      id: "100002",
      name: "hbtc-spam9-vm-2002",
      ip: "54.39.46.9",
      status: "online",
      reactor: 3,
      type: "Spam Filter",
      uptime: "99.8%",
    },
    {
      id: "100003",
      name: "hbtc-spam234-vm-2003",
      ip: "144.217.195.234",
      status: "online",
      reactor: 3,
      type: "Spam Filter",
      uptime: "99.7%",
    },

    // Reactor 4 - Servidores Virtuales (VPS, Proxmox, PBS)
    {
      id: "401453",
      name: "pr-hgr3-bay-01",
      ip: "51.222.249.84",
      status: "online",
      reactor: 4,
      type: "Proxmox VE",
      uptime: "99.9%",
    },
    {
      id: "414182",
      name: "pr-pbs-bay-01",
      ip: "15.235.10.221",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.8%",
    },
    {
      id: "415417",
      name: "advstore-g2-pbs-01",
      ip: "15.235.12.57",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.7%",
    },
    {
      id: "422858",
      name: "t-advstor1-g2-pbs-01",
      ip: "15.235.12.231",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.9%",
    },
    {
      id: "437541",
      name: "advs1-pbs-01",
      ip: "15.235.83.54",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.6%",
    },
    {
      id: "446396",
      name: "sys-sys-1-sat-32-pbs-bay-1",
      ip: "192.99.36.34",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.8%",
    },
    {
      id: "451816",
      name: "ze-rise1-g2-pve",
      ip: "148.113.159.120",
      status: "online",
      reactor: 4,
      type: "Proxmox VE",
      uptime: "99.9%",
    },
    {
      id: "472841",
      name: "advstore-g2-pbs-01",
      ip: "148.113.169.29",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.7%",
    },
    {
      id: "472844",
      name: "advs1-pbs-02",
      ip: "148.113.169.32",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.8%",
    },
    {
      id: "473203",
      name: "hbtc-advsto-g2-pbs-01",
      ip: "148.113.169.39",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.6%",
    },

    // Reactor 5 - Páginas Web y Paneles
    {
      id: "236186",
      name: "panel",
      ip: "192.99.33.217",
      status: "online",
      reactor: 5,
      type: "Control Panel",
      uptime: "99.9%",
    },
    {
      id: "314722",
      name: "hbtc-rise1-labhack-hackacademy",
      ip: "54.39.105.106",
      status: "online",
      reactor: 5,
      type: "Web Server",
      uptime: "99.8%",
    },
    {
      id: "462754",
      name: "delta-plataformaintegra",
      ip: "148.113.168.51",
      status: "online",
      reactor: 5,
      type: "Web Platform",
      uptime: "99.7%",
    },
  ])

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    if (auth !== "true") {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }

    const interval = setInterval(() => {
      checkHostsStatus()
    }, 30000)

    return () => clearInterval(interval)
  }, [router])

  const checkHostsStatus = async () => {
    setHosts((prev) =>
      prev.map((host) => {
        const random = Math.random()
        let status: Host["status"]
        let uptime: string

        if (random > 0.95) {
          status = "offline"
          uptime = "0%"
        } else if (random > 0.85) {
          status = "warning"
          uptime = `${(85 + Math.random() * 10).toFixed(1)}%`
        } else {
          status = "online"
          uptime = `${(95 + Math.random() * 5).toFixed(1)}%`
        }

        return {
          ...host,
          status,
          uptime,
          lastCheck: new Date().toLocaleTimeString(),
        }
      }),
    )
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await checkHostsStatus()
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const getHostAccessUrl = (host: Host) => {
    const ip = host.ip
    const type = host.type?.toLowerCase() || ""

    if (type.includes("proxmox ve") || type.includes("proxmox") || type.includes("ceph")) {
      return `https://${ip}:8006`
    } else if (type.includes("proxmox backup") || type.includes("pbs")) {
      return `https://${ip}:8007`
    } else if (type.includes("spam")) {
      return `https://${ip}:5000`
    } else if (type.includes("zimbra")) {
      return `https://${ip}:7071`
    } else if (type.includes("cpanel") || type.includes("control panel")) {
      return `https://${ip}:2087`
    } else {
      return `https://${ip}`
    }
  }

  const handleHostClick = (host: Host) => {
    setSelectedHost(host)
    setIsModalOpen(true)
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

    const calculateRings = (hostCount: number) => {
      if (hostCount <= 1) return 1
      if (hostCount <= 7) return 2
      if (hostCount <= 19) return 3
      if (hostCount <= 37) return 4
      if (hostCount <= 61) return 5
      return 6
    }

    const rings = calculateRings(reactorHosts.length)

    const generatePositions = () => {
      const positions = [{ ring: 0, angle: 0, distance: 0 }]

      const slotsPerRing = [0, 6, 12, 18, 24, 30]
      const distances = [0, 50, 100, 150, 200, 250]

      for (let ring = 1; ring <= rings; ring++) {
        const slots = slotsPerRing[ring]
        const distance = distances[ring]

        for (let i = 0; i < slots; i++) {
          positions.push({
            ring,
            angle: (i * (360 / slots) * Math.PI) / 180,
            distance,
          })
        }
      }

      return positions
    }

    const positions = generatePositions()
    const maxSlots = positions.length

    return (
      <div className="relative w-full aspect-square max-w-2xl mx-auto">
        <div className="absolute inset-0 rounded-full border-4 border-purple-900/30 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        {rings >= 2 && (
          <div className="absolute inset-[10%] rounded-full border-4 border-green-900/20 bg-slate-800/50" />
        )}
        {rings >= 3 && (
          <div className="absolute inset-[25%] rounded-full border-4 border-blue-900/20 bg-slate-800/50" />
        )}
        {rings >= 4 && (
          <div className="absolute inset-[40%] rounded-full border-2 border-slate-700/30 bg-slate-800/50" />
        )}
        {rings >= 5 && (
          <div className="absolute inset-[50%] rounded-full border-2 border-slate-700/20 bg-slate-800/50" />
        )}
        {rings >= 6 && (
          <div className="absolute inset-[60%] rounded-full border-2 border-slate-700/10 bg-slate-800/50" />
        )}

        <TooltipProvider>
          {positions.map((pos, index) => {
            const host = reactorHosts[index]
            const x = 50 + (pos.distance / 300) * 40 * Math.cos(pos.angle)
            const y = 50 + (pos.distance / 300) * 40 * Math.sin(pos.angle)

            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div
                    onClick={() => host && handleHostClick(host)}
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
                      <p className="text-slate-400">Tipo: {host.type}</p>
                      <p className="text-slate-400">Uptime: {host.uptime}</p>
                      {host.lastCheck && <p className="text-slate-500 text-xs">Último check: {host.lastCheck}</p>}
                      <p
                        className={`font-semibold mt-1 ${
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
                      <p className="text-xs text-cyan-400 mt-2">Click para más detalles</p>
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            )
          })}
        </TooltipProvider>

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
        return "El Reactor 1 muestra los clusteres de bases de datos y almacenamiento distribuido (Ceph, Storage Clusters)"
      case 2:
        return "El Reactor 2 (SOD) muestra los servidores de correo electrónico y sistemas de mensajería (Zimbra, Mail Gateways)"
      case 3:
        return "El Reactor 3 muestra los servidores de spam y gateways de seguridad anti-spam"
      case 4:
        return "El Reactor 4 muestra los servidores virtuales, VPS y sistemas de virtualización (Proxmox VE, PBS)"
      case 5:
        return "El Reactor 5 muestra las páginas web, servidores de hosting y sistemas de control (cPanel, Web Panels)"
      default:
        return ""
    }
  }

  const totalHosts = hosts.length
  const onlineHosts = hosts.filter((h) => h.status === "online").length
  const warningHosts = hosts.filter((h) => h.status === "warning").length
  const offlineHosts = hosts.filter((h) => h.status === "offline").length

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Bienvenido al Reactor</h1>
          <p className="text-slate-400">
            Sistema de monitoreo en tiempo real de infraestructura - Visualización tipo núcleo de reactor nuclear
          </p>
        </div>
        <Button onClick={handleRefresh} disabled={isRefreshing} className="bg-cyan-600 hover:bg-cyan-700">
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Actualizar Estado
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">{totalHosts}</div>
            <div className="text-sm text-slate-400">Total Hosts</div>
          </CardContent>
        </Card>
        <Card className="bg-green-900/20 border-green-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-400">{onlineHosts}</div>
            <div className="text-sm text-green-300">En Línea</div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-900/20 border-yellow-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-400">{warningHosts}</div>
            <div className="text-sm text-yellow-300">Advertencias</div>
          </CardContent>
        </Card>
        <Card className="bg-red-900/20 border-red-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-400">{offlineHosts}</div>
            <div className="text-sm text-red-300">Fuera de Línea</div>
          </CardContent>
        </Card>
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center justify-between">
              Detalles del Host
              <div
                className={`w-3 h-3 rounded-full ${
                  selectedHost?.status === "online"
                    ? "bg-green-500"
                    : selectedHost?.status === "warning"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
              />
            </DialogTitle>
            <DialogDescription className="text-slate-400">Información detallada y acceso al sistema</DialogDescription>
          </DialogHeader>

          {selectedHost && (
            <div className="space-y-4">
              <div className="bg-slate-800 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Nombre:</span>
                  <span className="font-semibold text-white">{selectedHost.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Dirección IP:</span>
                  <span className="font-mono text-cyan-400">{selectedHost.ip}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Tipo:</span>
                  <span className="text-white">{selectedHost.type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Reactor:</span>
                  <span className="text-white">Reactor {selectedHost.reactor}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Uptime:</span>
                  <span className="font-semibold text-green-400">{selectedHost.uptime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Estado:</span>
                  <span
                    className={`font-semibold ${
                      selectedHost.status === "online"
                        ? "text-green-500"
                        : selectedHost.status === "warning"
                          ? "text-yellow-500"
                          : "text-red-500"
                    }`}
                  >
                    {selectedHost.status === "online"
                      ? "En Línea"
                      : selectedHost.status === "warning"
                        ? "Advertencia"
                        : "Fuera de Línea"}
                  </span>
                </div>
                {selectedHost.lastCheck && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Último Check:</span>
                    <span className="text-slate-300 text-sm">{selectedHost.lastCheck}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Button
                  onClick={() => {
                    window.open(getHostAccessUrl(selectedHost), "_blank", "noopener,noreferrer")
                  }}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                  disabled={selectedHost.status === "offline"}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Acceder al Panel {selectedHost.type?.includes("Proxmox") ? "(Puerto 8006/8007)" : ""}
                </Button>

                <div className="text-xs text-slate-500 text-center">URL: {getHostAccessUrl(selectedHost)}</div>

                {selectedHost.status === "offline" && (
                  <div className="bg-red-900/20 border border-red-700 rounded p-3 text-sm text-red-300">
                    ⚠️ El host está fuera de línea. No se puede acceder en este momento.
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
