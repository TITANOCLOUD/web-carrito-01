"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Edit, Server, Globe, Cpu, LayoutGrid, FileCode, Download } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ServiceType = "proxmox" | "cluster" | "vps" | "website" | "cpanel" | "email"

interface BaseService {
  id: string
  name: string
  type: ServiceType
  reactor: number
  group: string
  status: "online" | "offline" | "warning"
}

interface ProxmoxService extends BaseService {
  type: "proxmox" | "cluster"
  ip: string
  snmpCommunity: string
  cpuCores: number
  ramGB: number
  storageGB: number
}

interface VPSService extends BaseService {
  type: "vps"
  ip: string
  cpuCores: number
  ramGB: number
  storageGB: number
  os: string
}

interface WebsiteService extends BaseService {
  type: "website"
  url: string
  domain: string
  sslExpiry: string
  domainExpiry: string
}

interface CpanelService extends BaseService {
  type: "cpanel"
  url: string
  username: string
  accounts: number
  storageGB: number
}

interface EmailService extends BaseService {
  type: "email"
  domain: string
  ip: string
  mailServer: string
  accounts: number
}

type Service = ProxmoxService | VPSService | WebsiteService | CpanelService | EmailService

export default function HostsManagementPage() {
  const [services, setServices] = useState<Service[]>([
    // Clusters/Proxmox
    {
      id: "483431",
      name: "483431-ibg-sca3-g2-ceph-bay-01",
      ip: "72.251.3.93",
      type: "cluster",
      reactor: 1,
      group: "IBG.COM.CO",
      status: "online",
      snmpCommunity: "public",
      cpuCores: 64,
      ramGB: 256,
      storageGB: 10000,
    } as ProxmoxService,
    // Páginas Web
    {
      id: "web-1",
      name: "Titanocloud.com",
      url: "https://titanocloud.com",
      domain: "titanocloud.com",
      type: "website",
      reactor: 5,
      group: "TITANO",
      status: "online",
      sslExpiry: "2025-12-31",
      domainExpiry: "2026-01-15",
    } as WebsiteService,
    // VPS
    {
      id: "vps-1",
      name: "VPS-Web-01",
      ip: "192.99.33.217",
      type: "vps",
      reactor: 4,
      group: "HOSTING",
      status: "online",
      cpuCores: 4,
      ramGB: 8,
      storageGB: 100,
      os: "Ubuntu 22.04",
    } as VPSService,
  ])

  const [activeTab, setActiveTab] = useState<ServiceType>("proxmox")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedReactor, setSelectedReactor] = useState<string>("all")

  const [newService, setNewService] = useState({
    name: "",
    type: "proxmox" as ServiceType,
    ip: "",
    url: "",
    domain: "",
    reactor: 1,
    group: "",
    snmpCommunity: "public",
    cpuCores: 0,
    ramGB: 0,
    storageGB: 0,
    os: "",
    username: "",
    accounts: 0,
    mailServer: "",
    sslExpiry: "",
    domainExpiry: "",
  })

  const handleAddService = () => {
    if (newService.name) {
      const baseService = {
        id: Date.now().toString(),
        name: newService.name,
        type: newService.type,
        reactor: newService.reactor,
        group: newService.group,
        status: "online" as const,
      }

      let service: Service

      switch (newService.type) {
        case "proxmox":
        case "cluster":
          service = {
            ...baseService,
            ip: newService.ip,
            snmpCommunity: newService.snmpCommunity,
            cpuCores: newService.cpuCores,
            ramGB: newService.ramGB,
            storageGB: newService.storageGB,
          } as ProxmoxService
          break
        case "vps":
          service = {
            ...baseService,
            ip: newService.ip,
            cpuCores: newService.cpuCores,
            ramGB: newService.ramGB,
            storageGB: newService.storageGB,
            os: newService.os,
          } as VPSService
          break
        case "website":
          service = {
            ...baseService,
            url: newService.url,
            domain: newService.domain,
            sslExpiry: newService.sslExpiry,
            domainExpiry: newService.domainExpiry,
          } as WebsiteService
          break
        case "cpanel":
          service = {
            ...baseService,
            url: newService.url,
            username: newService.username,
            accounts: newService.accounts,
            storageGB: newService.storageGB,
          } as CpanelService
          break
        case "email":
          service = {
            ...baseService,
            domain: newService.domain,
            ip: newService.ip,
            mailServer: newService.mailServer,
            accounts: newService.accounts,
          } as EmailService
          break
      }

      setServices([...services, service])
      setIsAddDialogOpen(false)
      resetForm()
    }
  }

  const resetForm = () => {
    setNewService({
      name: "",
      type: "proxmox",
      ip: "",
      url: "",
      domain: "",
      reactor: 1,
      group: "",
      snmpCommunity: "public",
      cpuCores: 0,
      ramGB: 0,
      storageGB: 0,
      os: "",
      username: "",
      accounts: 0,
      mailServer: "",
      sslExpiry: "",
      domainExpiry: "",
    })
  }

  const handleDeleteService = (id: string) => {
    setServices(services.filter((s) => s.id !== id))
  }

  const handleExportReport = (type: ServiceType) => {
    const filtered = services.filter((s) =>
      type === "proxmox" ? s.type === "proxmox" || s.type === "cluster" : s.type === type,
    )

    const csv = filtered
      .map((s) => {
        if (s.type === "website") {
          const ws = s as WebsiteService
          return `${ws.name},${ws.url},${ws.domain},${ws.sslExpiry},${ws.domainExpiry},${ws.status}`
        }
        // Agregar otros tipos según necesites
        return `${s.name},${s.type},${s.group},${s.status}`
      })
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `reporte-${type}-${Date.now()}.csv`
    a.click()
  }

  const filteredServices = services.filter((s) => {
    const typeMatch = activeTab === "proxmox" ? s.type === "proxmox" || s.type === "cluster" : s.type === activeTab
    const reactorMatch = selectedReactor === "all" || s.reactor.toString() === selectedReactor
    const searchMatch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.group.toLowerCase().includes(searchTerm.toLowerCase())
    return typeMatch && reactorMatch && searchMatch
  })

  const renderServiceCard = (service: Service) => {
    return (
      <div
        key={service.id}
        className="flex items-center justify-between p-4 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-white font-medium">{service.name}</h3>
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium ${
                service.status === "online"
                  ? "bg-green-500/20 text-green-400"
                  : service.status === "warning"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
              }`}
            >
              {service.status === "online"
                ? "En línea"
                : service.status === "warning"
                  ? "Advertencia"
                  : "Fuera de línea"}
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {(service.type === "proxmox" || service.type === "cluster") && (
              <>
                <div className="text-slate-400">
                  IP: <span className="text-slate-300">{(service as ProxmoxService).ip}</span>
                </div>
                <div className="text-slate-400">
                  CPU: <span className="text-slate-300">{(service as ProxmoxService).cpuCores} cores</span>
                </div>
                <div className="text-slate-400">
                  RAM: <span className="text-slate-300">{(service as ProxmoxService).ramGB} GB</span>
                </div>
                <div className="text-slate-400">
                  Storage: <span className="text-slate-300">{(service as ProxmoxService).storageGB} GB</span>
                </div>
              </>
            )}

            {service.type === "vps" && (
              <>
                <div className="text-slate-400">
                  IP: <span className="text-slate-300">{(service as VPSService).ip}</span>
                </div>
                <div className="text-slate-400">
                  CPU: <span className="text-slate-300">{(service as VPSService).cpuCores} cores</span>
                </div>
                <div className="text-slate-400">
                  RAM: <span className="text-slate-300">{(service as VPSService).ramGB} GB</span>
                </div>
                <div className="text-slate-400">
                  OS: <span className="text-slate-300">{(service as VPSService).os}</span>
                </div>
              </>
            )}

            {service.type === "website" && (
              <>
                <div className="text-slate-400">
                  URL: <span className="text-slate-300">{(service as WebsiteService).url}</span>
                </div>
                <div className="text-slate-400">
                  Dominio: <span className="text-slate-300">{(service as WebsiteService).domain}</span>
                </div>
                <div className="text-slate-400">
                  SSL Expira: <span className="text-slate-300">{(service as WebsiteService).sslExpiry}</span>
                </div>
                <div className="text-slate-400">
                  Dominio Expira: <span className="text-slate-300">{(service as WebsiteService).domainExpiry}</span>
                </div>
              </>
            )}

            {service.type === "cpanel" && (
              <>
                <div className="text-slate-400">
                  URL: <span className="text-slate-300">{(service as CpanelService).url}</span>
                </div>
                <div className="text-slate-400">
                  Usuario: <span className="text-slate-300">{(service as CpanelService).username}</span>
                </div>
                <div className="text-slate-400">
                  Cuentas: <span className="text-slate-300">{(service as CpanelService).accounts}</span>
                </div>
                <div className="text-slate-400">
                  Storage: <span className="text-slate-300">{(service as CpanelService).storageGB} GB</span>
                </div>
              </>
            )}

            {service.type === "email" && (
              <>
                <div className="text-slate-400">
                  Dominio: <span className="text-slate-300">{(service as EmailService).domain}</span>
                </div>
                <div className="text-slate-400">
                  IP: <span className="text-slate-300">{(service as EmailService).ip}</span>
                </div>
                <div className="text-slate-400">
                  Servidor: <span className="text-slate-300">{(service as EmailService).mailServer}</span>
                </div>
                <div className="text-slate-400">
                  Cuentas: <span className="text-slate-300">{(service as EmailService).accounts}</span>
                </div>
              </>
            )}

            <div className="text-slate-400">
              Reactor: <span className="text-slate-300">{service.reactor}</span>
            </div>
            <div className="text-slate-400">
              Grupo: <span className="text-slate-300">{service.group}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-400 hover:text-red-300"
            onClick={() => handleDeleteService(service.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestión de Servicios de Monitoreo</h1>
          <p className="text-slate-400">Administra todos los servicios monitoreados por reactor y categoría</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Servicio
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-950 border-slate-800 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Agregar Nuevo Servicio</DialogTitle>
              <DialogDescription className="text-slate-400">
                Selecciona el tipo de servicio y completa los campos correspondientes
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label className="text-slate-300">Tipo de Servicio</Label>
                <Select
                  value={newService.type}
                  onValueChange={(v) => setNewService({ ...newService, type: v as ServiceType })}
                >
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    <SelectItem value="proxmox">Proxmox/Cluster</SelectItem>
                    <SelectItem value="vps">VPS</SelectItem>
                    <SelectItem value="website">Página Web</SelectItem>
                    <SelectItem value="cpanel">cPanel</SelectItem>
                    <SelectItem value="email">Servidor de Correo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Campos comunes */}
              <div>
                <Label className="text-slate-300">Nombre del Servicio</Label>
                <Input
                  placeholder="ej: 483431-IBG-SCA3-G2-CEPH-BAY-01"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Reactor</Label>
                  <Select
                    value={newService.reactor.toString()}
                    onValueChange={(v) => setNewService({ ...newService, reactor: Number.parseInt(v) })}
                  >
                    <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700">
                      <SelectItem value="1">Reactor 1 - Clusters</SelectItem>
                      <SelectItem value="2">Reactor 2 - Correo</SelectItem>
                      <SelectItem value="3">Reactor 3 - Spam</SelectItem>
                      <SelectItem value="4">Reactor 4 - VPS</SelectItem>
                      <SelectItem value="5">Reactor 5 - Páginas Web</SelectItem>
                      <SelectItem value="6">Reactor 6 - Hosting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-slate-300">Grupo/Cliente</Label>
                  <Input
                    placeholder="ej: IBG.COM.CO"
                    value={newService.group}
                    onChange={(e) => setNewService({ ...newService, group: e.target.value })}
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
              </div>

              {(newService.type === "proxmox" || newService.type === "cluster" || newService.type === "vps") && (
                <>
                  <div>
                    <Label className="text-slate-300">Dirección IP</Label>
                    <Input
                      placeholder="ej: 72.251.3.93"
                      value={newService.ip}
                      onChange={(e) => setNewService({ ...newService, ip: e.target.value })}
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-slate-300">CPU Cores</Label>
                      <Input
                        type="number"
                        value={newService.cpuCores}
                        onChange={(e) => setNewService({ ...newService, cpuCores: Number.parseInt(e.target.value) })}
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">RAM (GB)</Label>
                      <Input
                        type="number"
                        value={newService.ramGB}
                        onChange={(e) => setNewService({ ...newService, ramGB: Number.parseInt(e.target.value) })}
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Storage (GB)</Label>
                      <Input
                        type="number"
                        value={newService.storageGB}
                        onChange={(e) => setNewService({ ...newService, storageGB: Number.parseInt(e.target.value) })}
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                  </div>
                </>
              )}

              {(newService.type === "proxmox" || newService.type === "cluster") && (
                <div>
                  <Label className="text-slate-300">SNMP Community</Label>
                  <Input
                    value={newService.snmpCommunity}
                    onChange={(e) => setNewService({ ...newService, snmpCommunity: e.target.value })}
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
              )}

              {newService.type === "vps" && (
                <div>
                  <Label className="text-slate-300">Sistema Operativo</Label>
                  <Input
                    placeholder="ej: Ubuntu 22.04"
                    value={newService.os}
                    onChange={(e) => setNewService({ ...newService, os: e.target.value })}
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
              )}

              {newService.type === "website" && (
                <>
                  <div>
                    <Label className="text-slate-300">URL del Sitio</Label>
                    <Input
                      placeholder="https://ejemplo.com"
                      value={newService.url}
                      onChange={(e) => setNewService({ ...newService, url: e.target.value })}
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Dominio</Label>
                    <Input
                      placeholder="ejemplo.com"
                      value={newService.domain}
                      onChange={(e) => setNewService({ ...newService, domain: e.target.value })}
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Vencimiento SSL</Label>
                      <Input
                        type="date"
                        value={newService.sslExpiry}
                        onChange={(e) => setNewService({ ...newService, sslExpiry: e.target.value })}
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Vencimiento Dominio</Label>
                      <Input
                        type="date"
                        value={newService.domainExpiry}
                        onChange={(e) => setNewService({ ...newService, domainExpiry: e.target.value })}
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                  </div>
                </>
              )}

              {newService.type === "cpanel" && (
                <>
                  <div>
                    <Label className="text-slate-300">URL cPanel</Label>
                    <Input
                      placeholder="https://cpanel.ejemplo.com:2083"
                      value={newService.url}
                      onChange={(e) => setNewService({ ...newService, url: e.target.value })}
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-slate-300">Usuario</Label>
                      <Input
                        value={newService.username}
                        onChange={(e) => setNewService({ ...newService, username: e.target.value })}
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Cuentas</Label>
                      <Input
                        type="number"
                        value={newService.accounts}
                        onChange={(e) => setNewService({ ...newService, accounts: Number.parseInt(e.target.value) })}
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Storage (GB)</Label>
                      <Input
                        type="number"
                        value={newService.storageGB}
                        onChange={(e) => setNewService({ ...newService, storageGB: Number.parseInt(e.target.value) })}
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                  </div>
                </>
              )}

              {newService.type === "email" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Dominio</Label>
                      <Input
                        placeholder="mail.ejemplo.com"
                        value={newService.domain}
                        onChange={(e) => setNewService({ ...newService, domain: e.target.value })}
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">IP</Label>
                      <Input
                        placeholder="192.168.1.1"
                        value={newService.ip}
                        onChange={(e) => setNewService({ ...newService, ip: e.target.value })}
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Servidor de Correo</Label>
                      <Input
                        placeholder="Zimbra, Exchange, etc"
                        value={newService.mailServer}
                        onChange={(e) => setNewService({ ...newService, mailServer: e.target.value })}
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Cuentas</Label>
                      <Input
                        type="number"
                        value={newService.accounts}
                        onChange={(e) => setNewService({ ...newService, accounts: Number.parseInt(e.target.value) })}
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                  </div>
                </>
              )}

              <Button onClick={handleAddService} className="w-full bg-cyan-600 hover:bg-cyan-700">
                Agregar Servicio
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ServiceType)} className="w-full">
        <TabsList className="bg-slate-950 border border-slate-800 mb-6">
          <TabsTrigger value="proxmox" className="data-[state=active]:bg-cyan-600">
            <Server className="w-4 h-4 mr-2" />
            Proxmox/Clusters
          </TabsTrigger>
          <TabsTrigger value="vps" className="data-[state=active]:bg-cyan-600">
            <Cpu className="w-4 h-4 mr-2" />
            VPS
          </TabsTrigger>
          <TabsTrigger value="website" className="data-[state=active]:bg-cyan-600">
            <Globe className="w-4 h-4 mr-2" />
            Páginas Web
          </TabsTrigger>
          <TabsTrigger value="cpanel" className="data-[state=active]:bg-cyan-600">
            <LayoutGrid className="w-4 h-4 mr-2" />
            cPanel
          </TabsTrigger>
          <TabsTrigger value="email" className="data-[state=active]:bg-cyan-600">
            <FileCode className="w-4 h-4 mr-2" />
            Correo
          </TabsTrigger>
        </TabsList>

        {/* Filtros */}
        <Card className="bg-slate-950 border-slate-800 mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <Input
                placeholder="Buscar por nombre o grupo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-slate-900 border-slate-700 text-white"
              />
              <Select value={selectedReactor} onValueChange={setSelectedReactor}>
                <SelectTrigger className="w-48 bg-slate-900 border-slate-700 text-white">
                  <SelectValue placeholder="Filtrar por reactor" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="all">Todos los reactores</SelectItem>
                  <SelectItem value="1">Reactor 1 - Clusters</SelectItem>
                  <SelectItem value="2">Reactor 2 - Correo</SelectItem>
                  <SelectItem value="3">Reactor 3 - Spam</SelectItem>
                  <SelectItem value="4">Reactor 4 - VPS</SelectItem>
                  <SelectItem value="5">Reactor 5 - Páginas Web</SelectItem>
                  <SelectItem value="6">Reactor 6 - Hosting</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="bg-slate-900 border-slate-700"
                onClick={() => handleExportReport(activeTab)}
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content for each tab */}
        <TabsContent value={activeTab}>
          <Card className="bg-slate-950 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">{filteredServices.length} servicios encontrados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">{filteredServices.map(renderServiceCard)}</div>

              {filteredServices.length === 0 && (
                <div className="p-12 text-center">
                  <Server className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No se encontraron servicios</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
