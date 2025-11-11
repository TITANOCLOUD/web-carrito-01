"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ExternalLink, GitBranch, Rocket, CheckCircle2, XCircle, RefreshCw } from "lucide-react"

type Deployment = {
  id: string
  projectName: string
  url: string
  status: "success" | "building" | "error"
  branch: string
  deployedAt: string
}

export default function VercelDeployPage() {
  const [vercelToken, setVercelToken] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [deployments, setDeployments] = useState<Deployment[]>([
    {
      id: "1",
      projectName: "titano-cloud-website",
      url: "https://titano-cloud.vercel.app",
      status: "success",
      branch: "main",
      deployedAt: "Hace 2 horas",
    },
    {
      id: "2",
      projectName: "client-dashboard",
      url: "https://client-dashboard-abc.vercel.app",
      status: "building",
      branch: "development",
      deployedAt: "Hace 5 minutos",
    },
  ])

  const handleConnect = () => {
    if (vercelToken.length > 10) {
      setIsConnected(true)
    }
  }

  const statusConfig = {
    success: { color: "text-green-400", bg: "bg-green-500/20", icon: CheckCircle2, label: "Exitoso" },
    building: { color: "text-blue-400", bg: "bg-blue-500/20", icon: RefreshCw, label: "Construyendo" },
    error: { color: "text-red-400", bg: "bg-red-500/20", icon: XCircle, label: "Error" },
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Despliegue con Vercel</h1>
          <p className="text-slate-400">Despliega y administra sitios web directamente desde el panel</p>
        </div>

        <Card className="bg-slate-800/50 border-slate-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white" viewBox="0 0 76 65" fill="currentColor">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Vercel</h2>
                <div className="flex items-center gap-2">
                  {isConnected ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm">Conectado</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400 text-sm">No conectado</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {!isConnected && (
              <Button onClick={handleConnect} className="bg-cyan-600 hover:bg-cyan-700">
                Conectar
              </Button>
            )}
          </div>

          {!isConnected && (
            <div className="border-t border-slate-700 pt-6">
              <h3 className="text-white font-semibold mb-4">Configurar Token de Vercel</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-slate-300 text-sm mb-2 block">
                    Token de API
                    <a
                      href="https://vercel.com/account/tokens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 ml-2"
                    >
                      (Obtener token)
                      <ExternalLink className="w-3 h-3 inline ml-1" />
                    </a>
                  </label>
                  <Input
                    type="password"
                    placeholder="vercel_xxxxx"
                    value={vercelToken}
                    onChange={(e) => setVercelToken(e.target.value)}
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
                <p className="text-slate-400 text-sm">
                  Este token permite desplegar y gestionar proyectos en tu cuenta de Vercel de forma segura.
                </p>
              </div>
            </div>
          )}
        </Card>

        {isConnected && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Proyectos Desplegados</h2>
              <Button className="bg-cyan-600 hover:bg-cyan-700">
                <Rocket className="w-4 h-4 mr-2" />
                Nuevo Despliegue
              </Button>
            </div>

            <div className="grid gap-4">
              {deployments.map((deployment) => {
                const status = statusConfig[deployment.status]
                const StatusIcon = status.icon

                return (
                  <Card
                    key={deployment.id}
                    className="bg-slate-800/50 border-slate-700 p-6 hover:border-cyan-500/50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-white font-semibold text-lg">{deployment.projectName}</h3>
                          <span
                            className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs ${status.bg} ${status.color}`}
                          >
                            <StatusIcon
                              className={`w-3 h-3 ${deployment.status === "building" ? "animate-spin" : ""}`}
                            />
                            {status.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <a
                            href={deployment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                          >
                            {deployment.url}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <span className="flex items-center gap-1">
                            <GitBranch className="w-3 h-3" />
                            {deployment.branch}
                          </span>
                          <span>{deployment.deployedAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600 hover:border-cyan-500 bg-transparent"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600 hover:border-cyan-500 bg-transparent"
                        >
                          Ver Logs
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
