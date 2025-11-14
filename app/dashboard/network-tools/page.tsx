"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Activity, Globe, TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

export default function NetworkToolsPage() {
  const [target, setTarget] = useState("")
  const [pingResults, setPingResults] = useState<any>(null)
  const [traceResults, setTraceResults] = useState<any>(null)
  const [loading, setLoading] = useState({ ping: false, trace: false })

  const runPing = async () => {
    if (!target) return
    setLoading({ ...loading, ping: true })
    try {
      const response = await fetch('/api/network/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ host: target })
      })
      const data = await response.json()
      setPingResults(data)
    } catch (error) {
      console.error('[v0] Ping error:', error)
      setPingResults({ error: 'Error al ejecutar ping' })
    } finally {
      setLoading({ ...loading, ping: false })
    }
  }

  const runTraceroute = async () => {
    if (!target) return
    setLoading({ ...loading, trace: true })
    try {
      const response = await fetch('/api/network/traceroute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ host: target })
      })
      const data = await response.json()
      setTraceResults(data)
    } catch (error) {
      console.error('[v0] Traceroute error:', error)
      setTraceResults({ error: 'Error al ejecutar traceroute' })
    } finally {
      setLoading({ ...loading, trace: false })
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Herramientas de Red - DATOS REALES</h1>
        <p className="text-slate-400">Ping y Traceroute ejecutados directamente desde el servidor</p>
      </div>

      <Card className="bg-slate-950 border-slate-800 mb-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            Configuración
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-slate-400 text-sm mb-2 block">Host o IP de destino</label>
            <Input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="ej: google.com, 8.8.8.8, 1.1.1.1"
              className="bg-slate-900 border-slate-700 text-white"
              onKeyDown={(e) => e.key === 'Enter' && runPing()}
            />
          </div>
          <div className="flex gap-4">
            <Button
              onClick={runPing}
              disabled={!target || loading.ping}
              className="bg-cyan-500 hover:bg-cyan-600"
            >
              {loading.ping ? 'Ejecutando Ping...' : 'Ejecutar Ping Real'}
            </Button>
            <Button
              onClick={runTraceroute}
              disabled={!target || loading.trace}
              className="bg-purple-500 hover:bg-purple-600"
            >
              {loading.trace ? 'Ejecutando Traceroute...' : 'Ejecutar Traceroute Real'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Resultados de Ping REALES */}
        <Card className="bg-slate-950 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              Resultados de Ping (DATOS REALES)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!pingResults ? (
              <div className="text-center py-8">
                <p className="text-slate-400 mb-2">No hay resultados todavía</p>
                <p className="text-slate-500 text-sm">Los resultados serán ejecutados directamente desde el servidor</p>
              </div>
            ) : pingResults.error ? (
              <div className="text-red-400 flex items-center gap-2 p-4 bg-red-950/20 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <div>
                  <p className="font-bold">Error al ejecutar ping</p>
                  <p className="text-sm">{pingResults.error}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Estado del host */}
                <div className={`p-4 rounded-lg ${pingResults.alive ? 'bg-green-950/20 border border-green-800' : 'bg-red-950/20 border border-red-800'}`}>
                  <div className="flex items-center gap-3">
                    {pingResults.alive ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400" />
                    )}
                    <div>
                      <p className={`font-bold ${pingResults.alive ? 'text-green-400' : 'text-red-400'}`}>
                        {pingResults.alive ? 'Host ONLINE' : 'Host OFFLINE'}
                      </p>
                      <p className="text-slate-400 text-sm">{pingResults.host}</p>
                    </div>
                  </div>
                </div>

                {/* Métricas */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900 p-4 rounded-lg">
                    <p className="text-slate-400 text-sm">Latencia Promedio</p>
                    <p className="text-white text-2xl font-bold">{pingResults.time.toFixed(2)} ms</p>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-lg">
                    <p className="text-slate-400 text-sm">Pérdida de Paquetes</p>
                    <p className="text-white text-2xl font-bold">{pingResults.packetsLost}%</p>
                  </div>
                  {pingResults.minTime > 0 && (
                    <>
                      <div className="bg-slate-900 p-4 rounded-lg">
                        <p className="text-slate-400 text-sm">Mínimo</p>
                        <p className="text-white text-2xl font-bold">{pingResults.minTime.toFixed(2)} ms</p>
                      </div>
                      <div className="bg-slate-900 p-4 rounded-lg">
                        <p className="text-slate-400 text-sm">Máximo</p>
                        <p className="text-white text-2xl font-bold">{pingResults.maxTime.toFixed(2)} ms</p>
                      </div>
                    </>
                  )}
                  <div className="bg-slate-900 p-4 rounded-lg col-span-2">
                    <p className="text-slate-400 text-sm">TTL (Time To Live)</p>
                    <p className="text-white text-2xl font-bold">{pingResults.ttl}</p>
                  </div>
                </div>

                {/* Output crudo */}
                {pingResults.rawOutput && (
                  <details className="bg-slate-900 p-4 rounded-lg">
                    <summary className="text-slate-400 cursor-pointer hover:text-white">
                      Ver output completo del comando
                    </summary>
                    <pre className="text-xs text-slate-300 mt-2 overflow-x-auto">{pingResults.rawOutput}</pre>
                  </details>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resultados de Traceroute REALES */}
        <Card className="bg-slate-950 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Resultados de Traceroute (DATOS REALES)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!traceResults ? (
              <div className="text-center py-8">
                <p className="text-slate-400 mb-2">No hay resultados todavía</p>
                <p className="text-slate-500 text-sm">La traza se ejecutará directamente desde el servidor</p>
              </div>
            ) : traceResults.error ? (
              <div className="text-red-400 flex items-center gap-2 p-4 bg-red-950/20 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <div>
                  <p className="font-bold">Error al ejecutar traceroute</p>
                  <p className="text-sm">{traceResults.error}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="bg-slate-900 p-3 rounded-lg mb-4">
                  <p className="text-slate-400 text-sm">Destino</p>
                  <p className="text-white font-bold">{traceResults.host}</p>
                  <p className="text-slate-400 text-sm mt-2">Total de saltos: {traceResults.hops.length}</p>
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {traceResults.hops.length === 0 ? (
                    <div className="text-center py-8 text-slate-400">
                      No se pudieron obtener saltos de red
                    </div>
                  ) : (
                    traceResults.hops.map((hop: any) => (
                      <div key={hop.hop} className="bg-slate-900 p-3 rounded-lg border border-slate-800 hover:border-cyan-500/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-cyan-400 font-bold text-lg">Salto {hop.hop}</span>
                          {hop.rtt && hop.rtt.length > 0 && hop.rtt[0] > 0 && (
                            <span className="text-white font-mono text-sm bg-slate-800 px-2 py-1 rounded">
                              {(hop.rtt.reduce((a: number, b: number) => a + b, 0) / hop.rtt.length).toFixed(2)} ms
                            </span>
                          )}
                        </div>
                        <p className="text-white font-medium font-mono">{hop.ip}</p>
                        {hop.hostname && hop.hostname !== hop.ip && (
                          <p className="text-slate-400 text-xs">{hop.hostname}</p>
                        )}
                        <div className="flex gap-2 mt-2">
                          {hop.rtt && hop.rtt.map((time: number, i: number) => (
                            <span key={i} className="text-slate-400 text-xs bg-slate-800 px-2 py-1 rounded">
                              {time > 0 ? `${time.toFixed(2)}ms` : '*'}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Output crudo */}
                {traceResults.rawOutput && (
                  <details className="bg-slate-900 p-4 rounded-lg mt-4">
                    <summary className="text-slate-400 cursor-pointer hover:text-white">
                      Ver output completo del comando
                    </summary>
                    <pre className="text-xs text-slate-300 mt-2 overflow-x-auto">{traceResults.rawOutput}</pre>
                  </details>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
