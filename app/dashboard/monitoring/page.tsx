"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, AlertCircle, Database, Disc, Globe, HardDrive, Shield, TrendingDown, TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export default function MonitoringPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    if (auth !== "true") {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  // Mock data para gráficas
  const diskIOData = [
    { time: "00:00", read: 45, write: 32 },
    { time: "04:00", read: 52, write: 38 },
    { time: "08:00", read: 89, write: 67 },
    { time: "12:00", read: 112, write: 95 },
    { time: "16:00", read: 98, write: 82 },
    { time: "20:00", read: 67, write: 54 },
  ]

  const dbQueriesData = [
    { time: "00:00", queries: 120 },
    { time: "04:00", queries: 85 },
    { time: "08:00", queries: 245 },
    { time: "12:00", queries: 389 },
    { time: "16:00", queries: 312 },
    { time: "20:00", queries: 198 },
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Monitoreo Detallado</h1>
          <p className="text-slate-400">Monitoreo en tiempo real de todos los componentes del sistema</p>
        </div>

        <Tabs defaultValue="disks" className="space-y-6">
          <TabsList className="bg-slate-950 border border-slate-800">
            <TabsTrigger value="disks" className="data-[state=active]:bg-cyan-500">
              <Disc className="w-4 h-4 mr-2" />
              Discos
            </TabsTrigger>
            <TabsTrigger value="database" className="data-[state=active]:bg-cyan-500">
              <Database className="w-4 h-4 mr-2" />
              Bases de Datos
            </TabsTrigger>
            <TabsTrigger value="websites" className="data-[state=active]:bg-cyan-500">
              <Globe className="w-4 h-4 mr-2" />
              Sitios Web
            </TabsTrigger>
            <TabsTrigger value="ips" className="data-[state=active]:bg-cyan-500">
              <Shield className="w-4 h-4 mr-2" />
              IPs Bloqueadas
            </TabsTrigger>
            <TabsTrigger value="outages" className="data-[state=active]:bg-cyan-500">
              <AlertCircle className="w-4 h-4 mr-2" />
              Caídas
            </TabsTrigger>
          </TabsList>

          {/* Monitoreo de Discos */}
          <TabsContent value="disks" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Disco 1 */}
              <Card className="bg-slate-950 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-cyan-400" />
                    /dev/sda1 - Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-400">Espacio Usado</span>
                        <span className="text-white font-bold">450 GB / 500 GB (90%)</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-3">
                        <div className="bg-yellow-500 h-3 rounded-full" style={{ width: "90%" }} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                      <div>
                        <p className="text-slate-400 text-sm">Lectura</p>
                        <p className="text-white text-xl font-bold flex items-center gap-2">
                          112 MB/s
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Escritura</p>
                        <p className="text-white text-xl font-bold flex items-center gap-2">
                          95 MB/s
                          <TrendingDown className="w-4 h-4 text-red-400" />
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Disco 2 */}
              <Card className="bg-slate-950 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-cyan-400" />
                    /dev/sdb1 - Datos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-400">Espacio Usado</span>
                        <span className="text-white font-bold">1.2 TB / 2 TB (60%)</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-3">
                        <div className="bg-green-500 h-3 rounded-full" style={{ width: "60%" }} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                      <div>
                        <p className="text-slate-400 text-sm">Lectura</p>
                        <p className="text-white text-xl font-bold flex items-center gap-2">
                          89 MB/s
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Escritura</p>
                        <p className="text-white text-xl font-bold flex items-center gap-2">
                          67 MB/s
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráfica de I/O */}
            <Card className="bg-slate-950 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">I/O Discos - Últimas 24 horas</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={diskIOData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="time" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "8px" }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="read" stroke="#22d3ee" name="Lectura (MB/s)" strokeWidth={2} />
                    <Line type="monotone" dataKey="write" stroke="#f59e0b" name="Escritura (MB/s)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Monitoreo de Bases de Datos */}
          <TabsContent value="database" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-950 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Database className="w-5 h-5 text-cyan-400" />
                    MySQL Principal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Estado</span>
                      <span className="text-green-400 font-bold flex items-center gap-1">
                        <Activity className="w-4 h-4" />
                        Online
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Queries/s</span>
                      <span className="text-white font-bold">389</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Conexiones</span>
                      <span className="text-white font-bold">24 / 150</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Latencia</span>
                      <span className="text-white font-bold">12ms</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-950 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Database className="w-5 h-5 text-cyan-400" />
                    PostgreSQL
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Estado</span>
                      <span className="text-green-400 font-bold flex items-center gap-1">
                        <Activity className="w-4 h-4" />
                        Online
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Queries/s</span>
                      <span className="text-white font-bold">142</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Conexiones</span>
                      <span className="text-white font-bold">18 / 100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Latencia</span>
                      <span className="text-white font-bold">8ms</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-950 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Database className="w-5 h-5 text-cyan-400" />
                    MongoDB
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Estado</span>
                      <span className="text-green-400 font-bold flex items-center gap-1">
                        <Activity className="w-4 h-4" />
                        Online
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Queries/s</span>
                      <span className="text-white font-bold">98</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Conexiones</span>
                      <span className="text-white font-bold">12 / 80</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Latencia</span>
                      <span className="text-white font-bold">15ms</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-950 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Queries por Segundo - Últimas 24 horas</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dbQueriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="time" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "8px" }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="queries" stroke="#22d3ee" name="Queries/s" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Monitoreo de Sitios Web */}
          <TabsContent value="websites" className="space-y-6">
            <Card className="bg-slate-950 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Estado de Sitios Web</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { url: "https://ejemplo.com", status: "online", uptime: "99.99%", latency: "145ms" },
                    { url: "https://app.ejemplo.com", status: "down", uptime: "98.50%", latency: "timeout" },
                    { url: "https://api.ejemplo.com", status: "online", uptime: "99.95%", latency: "89ms" },
                    { url: "https://blog.ejemplo.com", status: "online", uptime: "100%", latency: "112ms" },
                  ].map((site) => (
                    <div key={site.url} className="flex items-center justify-between p-4 bg-slate-900 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-3 h-3 rounded-full ${site.status === "online" ? "bg-green-400" : "bg-red-400"}`}
                        />
                        <div>
                          <p className="text-white font-medium">{site.url}</p>
                          <p className="text-slate-400 text-sm">Uptime: {site.uptime}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{site.latency}</p>
                        <p className="text-slate-400 text-sm">Latencia</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Monitoreo de IPs Bloqueadas */}
          <TabsContent value="ips" className="space-y-6">
            <Card className="bg-slate-950 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">IPs Bloqueadas por WAF</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { ip: "192.168.1.100", reason: "Brute Force Attack", country: "China", attempts: 245 },
                    { ip: "45.123.45.67", reason: "SQL Injection", country: "Rusia", attempts: 89 },
                    { ip: "203.45.67.89", reason: "Port Scanning", country: "Vietnam", attempts: 1024 },
                    { ip: "78.90.12.34", reason: "DDoS Attempt", country: "Brasil", attempts: 5678 },
                  ].map((entry) => (
                    <div key={entry.ip} className="flex items-center justify-between p-4 bg-slate-900 rounded-lg">
                      <div>
                        <p className="text-white font-mono font-bold">{entry.ip}</p>
                        <p className="text-slate-400 text-sm">{entry.reason}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-red-400 font-bold">{entry.attempts} intentos</p>
                        <p className="text-slate-400 text-sm">{entry.country}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Monitoreo de Caídas */}
          <TabsContent value="outages" className="space-y-6">
            <Card className="bg-slate-950 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Historial de Caídas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      service: "API Gateway",
                      date: "2025-01-09 14:32",
                      duration: "5 minutos",
                      severity: "crítico",
                    },
                    {
                      service: "Base de Datos Principal",
                      date: "2025-01-08 09:15",
                      duration: "15 minutos",
                      severity: "crítico",
                    },
                    {
                      service: "CDN",
                      date: "2025-01-07 16:45",
                      duration: "2 minutos",
                      severity: "menor",
                    },
                  ].map((outage, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-900 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{outage.service}</p>
                        <p className="text-slate-400 text-sm">{outage.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{outage.duration}</p>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            outage.severity === "crítico"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {outage.severity.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
