"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Server,
  Cloud,
  Globe,
  RefreshCw,
  Activity,
  Settings,
  Shield,
  Play,
  Square,
  RotateCcw,
  ScrollText,
  Key,
  Lock,
  AlertTriangle,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function OVHCloudIntegrationPage() {
  const [loading, setLoading] = useState(false)
  const [vpsData, setVpsData] = useState<any>(null)
  const [serversData, setServersData] = useState<any>(null)
  const [cloudData, setCloudData] = useState<any>(null)
  const [logs, setLogs] = useState<any[]>([])
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    autoBackup: true,
    apiRateLimit: true,
    ipWhitelist: "",
    allowedActions: {
      restart: true,
      stop: true,
      delete: false,
    },
  })

  const fetchVPS = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/ovh/vps")
      const data = await response.json()
      setVpsData(data)
    } catch (error) {
      console.error("[v0] Error fetching VPS:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchServers = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/ovh/servers")
      const data = await response.json()
      setServersData(data)
    } catch (error) {
      console.error("[v0] Error fetching servers:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCloud = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/ovh/cloud")
      const data = await response.json()
      setCloudData(data)
    } catch (error) {
      console.error("[v0] Error fetching cloud:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchLogs = async () => {
    try {
      const response = await fetch("/api/ovh/logs")
      const data = await response.json()
      setLogs(data.logs || [])
    } catch (error) {
      console.error("[v0] Error fetching logs:", error)
    }
  }

  const handleAction = async (action: string, resourceType: string, resourceName: string) => {
    if (!securitySettings.allowedActions[action as keyof typeof securitySettings.allowedActions]) {
      alert("Esta acción está deshabilitada en la configuración de seguridad")
      return
    }

    setLoading(true)
    try {
      await fetch("/api/ovh/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, resourceType, resourceName }),
      })
      alert(`Acción ${action} ejecutada en ${resourceName}`)
      fetchLogs()
    } catch (error) {
      console.error("[v0] Error executing action:", error)
      alert("Error al ejecutar la acción")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVPS()
    fetchServers()
    fetchCloud()
    fetchLogs()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Globe className="w-8 h-8 text-cyan-500" />
              Integración OVHcloud
            </h1>
            <p className="text-slate-400">Gestiona y controla tus recursos de OVHcloud desde Titano Cloud</p>
          </div>
          <Badge className="bg-green-600 flex items-center gap-2 px-4 py-2">
            <Activity className="w-4 h-4" />
            Conectado - saturnoconnection
          </Badge>
        </div>

        <Tabs defaultValue="vps" className="space-y-6">
          <TabsList className="bg-slate-900 border border-slate-800">
            <TabsTrigger value="vps" className="data-[state=active]:bg-cyan-600">
              <Server className="w-4 h-4 mr-2" />
              VPS
            </TabsTrigger>
            <TabsTrigger value="servers" className="data-[state=active]:bg-cyan-600">
              <Server className="w-4 h-4 mr-2" />
              Servidores Dedicados
            </TabsTrigger>
            <TabsTrigger value="cloud" className="data-[state=active]:bg-cyan-600">
              <Cloud className="w-4 h-4 mr-2" />
              Public Cloud
            </TabsTrigger>
            <TabsTrigger value="control" className="data-[state=active]:bg-cyan-600">
              <Settings className="w-4 h-4 mr-2" />
              Control
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-cyan-600">
              <Shield className="w-4 h-4 mr-2" />
              Seguridad
            </TabsTrigger>
            <TabsTrigger value="logs" className="data-[state=active]:bg-cyan-600">
              <ScrollText className="w-4 h-4 mr-2" />
              Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vps" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">VPS de OVHcloud</h2>
              <Button onClick={fetchVPS} disabled={loading} size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Actualizar
              </Button>
            </div>

            {vpsData?.success && vpsData.vps?.length > 0 ? (
              <div className="grid gap-4">
                {vpsData.vps.map((vps: any, index: number) => (
                  <Card key={index} className="bg-slate-900 border-slate-800 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-cyan-500">{vps.name}</h3>
                        <p className="text-slate-400 text-sm mt-1">Estado: {vps.state || "Desconocido"}</p>
                        {vps.model && <p className="text-slate-500 text-xs">Modelo: {vps.model}</p>}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-green-600/20 border-green-600 hover:bg-green-600"
                          onClick={() => handleAction("start", "vps", vps.name)}
                          disabled={loading}
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-yellow-600/20 border-yellow-600 hover:bg-yellow-600"
                          onClick={() => handleAction("restart", "vps", vps.name)}
                          disabled={loading}
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-red-600/20 border-red-600 hover:bg-red-600"
                          onClick={() => handleAction("stop", "vps", vps.name)}
                          disabled={loading}
                        >
                          <Square className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-slate-900 border-slate-800 p-8 text-center">
                <p className="text-slate-400">
                  {loading ? "Cargando VPS..." : "No se encontraron VPS o error al cargar"}
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="servers" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Servidores Dedicados</h2>
              <Button onClick={fetchServers} disabled={loading} size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Actualizar
              </Button>
            </div>

            {serversData?.success && serversData.servers?.length > 0 ? (
              <div className="grid gap-4">
                {serversData.servers.map((server: any, index: number) => (
                  <Card key={index} className="bg-slate-900 border-slate-800 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-cyan-500">{server.name}</h3>
                        <p className="text-slate-400 text-sm mt-1">Estado: {server.state || "Desconocido"}</p>
                        {server.datacenter && <p className="text-slate-500 text-xs">Datacenter: {server.datacenter}</p>}
                      </div>
                      <Badge className="bg-slate-800">Dedicado</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-slate-900 border-slate-800 p-8 text-center">
                <p className="text-slate-400">
                  {loading ? "Cargando servidores..." : "No se encontraron servidores o error al cargar"}
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cloud" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Proyectos Public Cloud</h2>
              <Button onClick={fetchCloud} disabled={loading} size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Actualizar
              </Button>
            </div>

            {cloudData?.success && cloudData.projects?.length > 0 ? (
              <div className="grid gap-4">
                {cloudData.projects.map((project: any, index: number) => (
                  <Card key={index} className="bg-slate-900 border-slate-800 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-cyan-500">{project.description || project.id}</h3>
                        <p className="text-slate-400 text-sm mt-1">ID: {project.id}</p>
                        {project.status && <p className="text-slate-500 text-xs">Estado: {project.status}</p>}
                      </div>
                      <Badge className="bg-slate-800">Cloud</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-slate-900 border-slate-800 p-8 text-center">
                <p className="text-slate-400">
                  {loading ? "Cargando proyectos..." : "No se encontraron proyectos o error al cargar"}
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="control" className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Panel de Control</h2>

            <Card className="bg-slate-900 border-slate-800 p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Key className="w-5 h-5 text-cyan-500" />
                Credenciales API
              </h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-slate-300">Application Name</Label>
                  <Input value="saturnoconnection" readOnly className="bg-slate-800 border-slate-700 mt-2 h-12" />
                </div>
                <div>
                  <Label className="text-slate-300">Application Key</Label>
                  <Input
                    value="052737af6236a51c2a8c729e5d7424d6"
                    readOnly
                    className="bg-slate-800 border-slate-700 mt-2 h-12 font-mono"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Consumer Key</Label>
                  <Input
                    value="4561ecddab9b4726"
                    readOnly
                    className="bg-slate-800 border-slate-700 mt-2 h-12 font-mono"
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-6">
              <h3 className="text-xl font-bold mb-4">Acciones Permitidas</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300">Permitir Reiniciar</Label>
                  <Switch
                    checked={securitySettings.allowedActions.restart}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({
                        ...securitySettings,
                        allowedActions: { ...securitySettings.allowedActions, restart: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300">Permitir Detener</Label>
                  <Switch
                    checked={securitySettings.allowedActions.stop}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({
                        ...securitySettings,
                        allowedActions: { ...securitySettings.allowedActions, stop: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300 flex items-center gap-2">
                    Permitir Eliminar
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  </Label>
                  <Switch
                    checked={securitySettings.allowedActions.delete}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({
                        ...securitySettings,
                        allowedActions: { ...securitySettings.allowedActions, delete: checked },
                      })
                    }
                    disabled
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Configuración de Seguridad</h2>

            <Card className="bg-slate-900 border-slate-800 p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-cyan-500" />
                Seguridad de Acceso
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300">Autenticación de Dos Factores</Label>
                    <p className="text-slate-500 text-sm">Requiere 2FA para acciones críticas</p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorEnabled}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, twoFactorEnabled: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300">Backup Automático</Label>
                    <p className="text-slate-500 text-sm">Crear snapshot antes de cambios</p>
                  </div>
                  <Switch
                    checked={securitySettings.autoBackup}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, autoBackup: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300">Límite de Peticiones API</Label>
                    <p className="text-slate-500 text-sm">Protección contra uso excesivo</p>
                  </div>
                  <Switch
                    checked={securitySettings.apiRateLimit}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, apiRateLimit: checked })}
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-6">
              <h3 className="text-xl font-bold mb-4">Lista Blanca de IPs</h3>
              <Label className="text-slate-300 mb-2 block">IPs permitidas (separadas por coma)</Label>
              <Input
                value={securitySettings.ipWhitelist}
                onChange={(e) => setSecuritySettings({ ...securitySettings, ipWhitelist: e.target.value })}
                placeholder="192.168.1.1, 10.0.0.1"
                className="bg-slate-800 border-slate-700 h-12"
              />
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Registro de Actividad</h2>
              <Button onClick={fetchLogs} size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualizar
              </Button>
            </div>

            <Card className="bg-slate-900 border-slate-800 p-6">
              <div className="space-y-3">
                {logs.length > 0 ? (
                  logs.map((log: any) => (
                    <div
                      key={log.id}
                      className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex items-start gap-4"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          log.status === "success" ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-sm text-cyan-500">{log.action}</span>
                          <span className="text-xs text-slate-500">{new Date(log.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-slate-400 text-sm">
                          {log.method} {log.endpoint}
                        </p>
                        {log.user && <p className="text-slate-500 text-xs mt-1">Usuario: {log.user}</p>}
                        {log.error && <p className="text-red-400 text-xs mt-1">Error: {log.error}</p>}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-center py-8">No hay logs disponibles</p>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
