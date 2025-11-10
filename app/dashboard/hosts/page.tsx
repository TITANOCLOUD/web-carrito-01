"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Edit, Server } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface Host {
  id: string
  name: string
  ip: string
  type: string
  group: string
}

export default function HostsManagementPage() {
  const [hosts, setHosts] = useState<Host[]>([
    { id: "1", name: "483431-IBG-SCA3-G2-CEPH-BAY-01", ip: "72.251.3.93", type: "Ceph Storage", group: "IBG.COM.CO" },
    {
      id: "2",
      name: "501691-IBG-SCA3-G2-CEPH-BAY-02",
      ip: "72.251.3.238",
      type: "Ceph Storage",
      group: "IBG.COM.CO",
    },
    {
      id: "3",
      name: "493196-IBG-SCA3-G2-CEPH-BAY-03",
      ip: "72.251.3.212",
      type: "Ceph Storage",
      group: "IBG.COM.CO",
    },
    {
      id: "4",
      name: "506748-IBG-ADVSTO-G2-PBS-01",
      ip: "148.113.216.7",
      type: "Proxmox Backup",
      group: "IBG.COM.CO",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newHost, setNewHost] = useState({ name: "", ip: "", type: "", group: "" })
  const [searchTerm, setSearchTerm] = useState("")

  const handleAddHost = () => {
    if (newHost.name && newHost.ip) {
      setHosts([...hosts, { ...newHost, id: Date.now().toString() }])
      setNewHost({ name: "", ip: "", type: "", group: "" })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteHost = (id: string) => {
    setHosts(hosts.filter((host) => host.id !== id))
  }

  const filteredHosts = hosts.filter(
    (host) =>
      host.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      host.ip.includes(searchTerm) ||
      host.group.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const groupedHosts = filteredHosts.reduce(
    (acc, host) => {
      if (!acc[host.group]) {
        acc[host.group] = []
      }
      acc[host.group].push(host)
      return acc
    },
    {} as Record<string, Host[]>,
  )

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestión de Hosts y Servidores</h1>
          <p className="text-slate-400">Administra los hosts que serán monitoreados por el sistema NOC</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Host
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-950 border-slate-800">
            <DialogHeader>
              <DialogTitle className="text-white">Agregar Nuevo Host</DialogTitle>
              <DialogDescription className="text-slate-400">
                Ingresa los detalles del host que deseas monitorear
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="name" className="text-slate-300">
                  Nombre del Host
                </Label>
                <Input
                  id="name"
                  placeholder="ej: 483431-IBG-SCA3-G2-CEPH-BAY-01"
                  value={newHost.name}
                  onChange={(e) => setNewHost({ ...newHost, name: e.target.value })}
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="ip" className="text-slate-300">
                  Dirección IP
                </Label>
                <Input
                  id="ip"
                  placeholder="ej: 72.251.3.93"
                  value={newHost.ip}
                  onChange={(e) => setNewHost({ ...newHost, ip: e.target.value })}
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="type" className="text-slate-300">
                  Tipo de Servidor
                </Label>
                <Input
                  id="type"
                  placeholder="ej: Ceph Storage, Proxmox, pfSense"
                  value={newHost.type}
                  onChange={(e) => setNewHost({ ...newHost, type: e.target.value })}
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="group" className="text-slate-300">
                  Grupo/Cliente
                </Label>
                <Input
                  id="group"
                  placeholder="ej: IBG.COM.CO"
                  value={newHost.group}
                  onChange={(e) => setNewHost({ ...newHost, group: e.target.value })}
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>
              <Button onClick={handleAddHost} className="w-full bg-cyan-600 hover:bg-cyan-700">
                Agregar Host
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="bg-slate-950 border-slate-800 mb-6">
        <CardContent className="p-4">
          <Input
            placeholder="Buscar por nombre, IP o grupo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-900 border-slate-700 text-white"
          />
        </CardContent>
      </Card>

      {/* Hosts by Group */}
      <div className="space-y-6">
        {Object.entries(groupedHosts).map(([group, groupHosts]) => (
          <Card key={group} className="bg-slate-950 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Server className="w-5 h-5 text-cyan-400" />
                {group} ({groupHosts.length} hosts)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {groupHosts.map((host) => (
                  <div
                    key={host.id}
                    className="flex items-center justify-between p-4 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-sm">{host.name}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-slate-400 text-xs">IP: {host.ip}</span>
                        <span className="text-slate-400 text-xs">•</span>
                        <span className="text-slate-400 text-xs">Tipo: {host.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleDeleteHost(host.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHosts.length === 0 && (
        <Card className="bg-slate-950 border-slate-800">
          <CardContent className="p-12 text-center">
            <Server className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No se encontraron hosts con los criterios de búsqueda</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
