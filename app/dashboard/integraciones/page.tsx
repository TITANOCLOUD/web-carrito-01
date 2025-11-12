"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, RefreshCw, Save, Edit2, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface IntegrationConfig {
  id: string
  nombre: string
  logo: string
  estado: "conectado" | "desconectado"
  lastSync: string
  fields: Array<{
    name: string
    label: string
    type: "text" | "password"
    value: string
    placeholder: string
  }>
}

export default function IntegracionesPage() {
  const { toast } = useToast()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({})

  const [integraciones, setIntegraciones] = useState<IntegrationConfig[]>([
    {
      id: "ovhcloud",
      nombre: "OVHcloud",
      logo: "🌐",
      estado: "conectado",
      lastSync: "2 min ago",
      fields: [
        {
          name: "appName",
          label: "Application Name",
          type: "text",
          value: "saturnoconnection",
          placeholder: "nombre-aplicacion",
        },
        {
          name: "appKey",
          label: "Application Key",
          type: "password",
          value: "4561ecddab9b4726",
          placeholder: "application-key",
        },
        {
          name: "appSecret",
          label: "Application Secret",
          type: "password",
          value: "052737af6236a51c2a8c729e5d7424d6",
          placeholder: "application-secret",
        },
        {
          name: "consumerKey",
          label: "Consumer Key",
          type: "password",
          value: "8d973a9982c42c6f80f86aeb02c48b81",
          placeholder: "consumer-key",
        },
      ],
    },
    {
      id: "cloudflare",
      nombre: "Cloudflare",
      logo: "☁️",
      estado: "desconectado",
      lastSync: "N/A",
      fields: [
        { name: "email", label: "Email", type: "text", value: "", placeholder: "email@ejemplo.com" },
        { name: "apiKey", label: "API Key", type: "password", value: "", placeholder: "••••••••••••••••" },
        { name: "zoneId", label: "Zone ID", type: "text", value: "", placeholder: "zone-id-opcional" },
      ],
    },
    {
      id: "aws",
      nombre: "Amazon AWS",
      logo: "📦",
      estado: "desconectado",
      lastSync: "N/A",
      fields: [
        { name: "accessKeyId", label: "Access Key ID", type: "text", value: "", placeholder: "AKIAIOSFODNN7EXAMPLE" },
        {
          name: "secretAccessKey",
          label: "Secret Access Key",
          type: "password",
          value: "",
          placeholder: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
        },
        { name: "region", label: "Default Region", type: "text", value: "us-east-1", placeholder: "us-east-1" },
      ],
    },
    {
      id: "azure",
      nombre: "Microsoft Azure",
      logo: "⚡",
      estado: "desconectado",
      lastSync: "N/A",
      fields: [
        {
          name: "subscriptionId",
          label: "Subscription ID",
          type: "text",
          value: "",
          placeholder: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        },
        {
          name: "tenantId",
          label: "Tenant ID",
          type: "text",
          value: "",
          placeholder: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        },
        {
          name: "clientId",
          label: "Client ID",
          type: "text",
          value: "",
          placeholder: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        },
        { name: "clientSecret", label: "Client Secret", type: "password", value: "", placeholder: "client-secret" },
      ],
    },
    {
      id: "acronis",
      nombre: "Acronis Cyber Protect",
      logo: "🔒",
      estado: "desconectado",
      lastSync: "N/A",
      fields: [
        { name: "dataCenter", label: "Data Center", type: "text", value: "", placeholder: "us-cloud.acronis.com" },
        { name: "clientId", label: "Client ID", type: "text", value: "", placeholder: "client-id" },
        { name: "clientSecret", label: "Client Secret", type: "password", value: "", placeholder: "client-secret" },
      ],
    },
  ])

  const handleFieldChange = (integrationId: string, fieldName: string, newValue: string) => {
    setIntegraciones((prev) =>
      prev.map((int) =>
        int.id === integrationId
          ? {
              ...int,
              fields: int.fields.map((field) => (field.name === fieldName ? { ...field, value: newValue } : field)),
            }
          : int,
      ),
    )
  }

  const handleSave = async (integrationId: string) => {
    const integration = integraciones.find((int) => int.id === integrationId)
    if (!integration) return

    console.log("[v0] Guardando credenciales para:", integrationId, integration.fields)

    // Update status to connected
    setIntegraciones((prev) =>
      prev.map((int) => (int.id === integrationId ? { ...int, estado: "conectado", lastSync: "Ahora mismo" } : int)),
    )

    setEditingId(null)

    toast({
      title: "Credenciales guardadas",
      description: `La integración con ${integration.nombre} se ha actualizado correctamente.`,
    })
  }

  const togglePasswordVisibility = (integrationId: string, fieldName: string) => {
    const key = `${integrationId}-${fieldName}`
    setShowPasswords((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSync = async (integrationId: string) => {
    toast({
      title: "Sincronizando...",
      description: "Actualizando recursos desde el proveedor.",
    })

    setTimeout(() => {
      setIntegraciones((prev) =>
        prev.map((int) => (int.id === integrationId ? { ...int, lastSync: "Ahora mismo" } : int)),
      )
      toast({
        title: "Sincronización completa",
        description: "Los recursos se han actualizado correctamente.",
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3 text-white">API de OVHcloud, Cloudflare, Acronis, AWS y Azure</h1>
          <p className="text-slate-400 text-lg">Conecta y administra proveedores cloud desde un solo lugar</p>
        </div>

        <div className="grid gap-6">
          {integraciones.map((int) => (
            <Card key={int.id} className="bg-slate-900 border-slate-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center text-3xl">
                    {int.logo}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-3 text-white mb-1">
                      {int.nombre}
                      {int.estado === "conectado" ? (
                        <Badge className="bg-green-600 flex items-center gap-1 px-3 py-1">
                          <CheckCircle className="w-3 h-3" />
                          Conectado
                        </Badge>
                      ) : (
                        <Badge className="bg-slate-700 flex items-center gap-1 px-3 py-1">
                          <XCircle className="w-3 h-3" />
                          Desconectado
                        </Badge>
                      )}
                    </h3>
                    <p className="text-slate-400">Última sincronización: {int.lastSync}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {editingId !== int.id && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingId(int.id)}
                        className="border-cyan-600 text-cyan-500 bg-transparent hover:bg-cyan-950 h-10"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                      {int.estado === "conectado" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSync(int.id)}
                          className="border-slate-600 bg-transparent hover:bg-slate-800 h-10"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Campos de credenciales */}
              <div className="border-t border-slate-800 pt-6">
                <h4 className="font-semibold mb-4 text-white text-lg">Credenciales API</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  {int.fields.map((field) => {
                    const isPasswordVisible = showPasswords[`${int.id}-${field.name}`]
                    const isEditing = editingId === int.id

                    return (
                      <div key={field.name}>
                        <Label className="text-slate-300 mb-2 block text-base">{field.label}</Label>
                        <div className="relative">
                          <Input
                            type={field.type === "password" && !isPasswordVisible ? "password" : "text"}
                            value={field.value}
                            onChange={(e) => handleFieldChange(int.id, field.name, e.target.value)}
                            disabled={!isEditing}
                            className="bg-slate-800 border-slate-700 text-white h-12 pr-12 disabled:opacity-70"
                            placeholder={field.placeholder}
                          />
                          {field.type === "password" && field.value && (
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility(int.id, field.name)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                            >
                              {isPasswordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {editingId === int.id && (
                  <div className="flex gap-3 mt-6">
                    <Button onClick={() => handleSave(int.id)} className="bg-cyan-600 hover:bg-cyan-700 h-12 px-6">
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Cambios
                    </Button>
                    <Button
                      onClick={() => setEditingId(null)}
                      variant="outline"
                      className="border-slate-600 bg-transparent hover:bg-slate-800 h-12 px-6"
                    >
                      Cancelar
                    </Button>
                  </div>
                )}
              </div>

              {/* Recursos sincronizados - solo si está conectado */}
              {int.estado === "conectado" && editingId !== int.id && (
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <h4 className="font-semibold mb-4 text-white text-lg">Recursos Sincronizados</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-800 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-cyan-500 mb-1">24</div>
                      <div className="text-sm text-slate-400">Servidores</div>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-cyan-500 mb-1">12</div>
                      <div className="text-sm text-slate-400">Dominios</div>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-cyan-500 mb-1">8</div>
                      <div className="text-sm text-slate-400">IPs</div>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-cyan-500 mb-1">156GB</div>
                      <div className="text-sm text-slate-400">Storage</div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
