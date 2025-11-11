"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Eye, EyeOff, Save, CheckCircle, XCircle, Loader2 } from "lucide-react"

interface SocialConfig {
  facebook: {
    enabled: boolean
    appId: string
    appSecret: string
    accessToken: string
    pageId: string
  }
  instagram: {
    enabled: boolean
    username: string
    accessToken: string
    userId: string
  }
  linkedin: {
    enabled: boolean
    clientId: string
    clientSecret: string
    accessToken: string
    organizationId: string
  }
  tiktok: {
    enabled: boolean
    clientKey: string
    clientSecret: string
    accessToken: string
  }
  youtube: {
    enabled: boolean
    apiKey: string
    channelId: string
  }
}

export default function SocialConfigPage() {
  const [config, setConfig] = useState<SocialConfig>({
    facebook: { enabled: false, appId: "", appSecret: "", accessToken: "", pageId: "" },
    instagram: { enabled: false, username: "", accessToken: "", userId: "" },
    linkedin: { enabled: false, clientId: "", clientSecret: "", accessToken: "", organizationId: "" },
    tiktok: { enabled: false, clientKey: "", clientSecret: "", accessToken: "" },
    youtube: { enabled: false, apiKey: "", channelId: "" },
  })

  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({})
  const [saving, setSaving] = useState(false)
  const [testingConnection, setTestingConnection] = useState<string | null>(null)
  const [connectionResults, setConnectionResults] = useState<Record<string, boolean>>({})
  const [saveMessage, setSaveMessage] = useState("")

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    try {
      const response = await fetch("/api/social-config")
      if (response.ok) {
        const data = await response.json()
        setConfig(data.config)
      }
    } catch (error) {
      console.error("[v0] Error fetching config:", error)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setSaveMessage("")
    try {
      const response = await fetch("/api/social-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      })

      if (response.ok) {
        setSaveMessage("Configuración guardada exitosamente")
        setTimeout(() => setSaveMessage(""), 3000)
      } else {
        setSaveMessage("Error al guardar la configuración")
      }
    } catch (error) {
      console.error("[v0] Error saving config:", error)
      setSaveMessage("Error al guardar la configuración")
    } finally {
      setSaving(false)
    }
  }

  const testConnection = async (platform: string) => {
    setTestingConnection(platform)
    try {
      const response = await fetch(`/api/social-test?platform=${platform}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config[platform as keyof SocialConfig]),
      })

      const result = await response.json()
      setConnectionResults((prev) => ({ ...prev, [platform]: result.success }))
    } catch (error) {
      console.error("[v0] Error testing connection:", error)
      setConnectionResults((prev) => ({ ...prev, [platform]: false }))
    } finally {
      setTestingConnection(null)
    }
  }

  const toggleSecret = (field: string) => {
    setShowSecrets((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Configuración de Redes Sociales</h1>
          <p className="text-slate-400">
            Configura las credenciales de API para detectar automáticamente contenido nuevo en tus redes sociales
          </p>
        </div>

        {saveMessage && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              saveMessage.includes("exitosamente") ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
            }`}
          >
            {saveMessage}
          </div>
        )}

        <div className="space-y-6">
          {/* Facebook Configuration */}
          <Card className="p-6 bg-slate-800 border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">Facebook</h3>
                  <p className="text-sm text-slate-400">Graph API v18.0</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {connectionResults.facebook !== undefined && (
                  <div className="flex items-center gap-2">
                    {connectionResults.facebook ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className={connectionResults.facebook ? "text-green-400" : "text-red-400"}>
                      {connectionResults.facebook ? "Conectado" : "Error"}
                    </span>
                  </div>
                )}
                <Switch
                  checked={config.facebook.enabled}
                  onCheckedChange={(checked) =>
                    setConfig({ ...config, facebook: { ...config.facebook, enabled: checked } })
                  }
                />
              </div>
            </div>

            {config.facebook.enabled && (
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">App ID</Label>
                    <Input
                      value={config.facebook.appId}
                      onChange={(e) =>
                        setConfig({ ...config, facebook: { ...config.facebook, appId: e.target.value } })
                      }
                      placeholder="123456789012345"
                      className="bg-slate-900 border-slate-600 text-slate-100"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Page ID</Label>
                    <Input
                      value={config.facebook.pageId}
                      onChange={(e) =>
                        setConfig({ ...config, facebook: { ...config.facebook, pageId: e.target.value } })
                      }
                      placeholder="987654321098765"
                      className="bg-slate-900 border-slate-600 text-slate-100"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-slate-300">App Secret</Label>
                  <div className="relative">
                    <Input
                      type={showSecrets.fbSecret ? "text" : "password"}
                      value={config.facebook.appSecret}
                      onChange={(e) =>
                        setConfig({ ...config, facebook: { ...config.facebook, appSecret: e.target.value } })
                      }
                      placeholder="abcdef1234567890abcdef1234567890"
                      className="bg-slate-900 border-slate-600 text-slate-100 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => toggleSecret("fbSecret")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                      {showSecrets.fbSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <Label className="text-slate-300">Access Token (Long-lived)</Label>
                  <div className="relative">
                    <Input
                      type={showSecrets.fbToken ? "text" : "password"}
                      value={config.facebook.accessToken}
                      onChange={(e) =>
                        setConfig({ ...config, facebook: { ...config.facebook, accessToken: e.target.value } })
                      }
                      placeholder="EAAxxxxxxxxxxxxxxxxxxxxx"
                      className="bg-slate-900 border-slate-600 text-slate-100 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => toggleSecret("fbToken")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                      {showSecrets.fbToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button
                  onClick={() => testConnection("facebook")}
                  disabled={testingConnection === "facebook"}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {testingConnection === "facebook" ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Probando...
                    </>
                  ) : (
                    "Probar Conexión"
                  )}
                </Button>
              </div>
            )}
          </Card>

          {/* Instagram Configuration */}
          <Card className="p-6 bg-slate-800 border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">Instagram</h3>
                  <p className="text-sm text-slate-400">Basic Display API / Graph API</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {connectionResults.instagram !== undefined && (
                  <div className="flex items-center gap-2">
                    {connectionResults.instagram ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className={connectionResults.instagram ? "text-green-400" : "text-red-400"}>
                      {connectionResults.instagram ? "Conectado" : "Error"}
                    </span>
                  </div>
                )}
                <Switch
                  checked={config.instagram.enabled}
                  onCheckedChange={(checked) =>
                    setConfig({ ...config, instagram: { ...config.instagram, enabled: checked } })
                  }
                />
              </div>
            </div>

            {config.instagram.enabled && (
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">Username</Label>
                    <Input
                      value={config.instagram.username}
                      onChange={(e) =>
                        setConfig({ ...config, instagram: { ...config.instagram, username: e.target.value } })
                      }
                      placeholder="titanocloudlatam"
                      className="bg-slate-900 border-slate-600 text-slate-100"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">User ID</Label>
                    <Input
                      value={config.instagram.userId}
                      onChange={(e) =>
                        setConfig({ ...config, instagram: { ...config.instagram, userId: e.target.value } })
                      }
                      placeholder="17841400008460056"
                      className="bg-slate-900 border-slate-600 text-slate-100"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-slate-300">Access Token</Label>
                  <div className="relative">
                    <Input
                      type={showSecrets.igToken ? "text" : "password"}
                      value={config.instagram.accessToken}
                      onChange={(e) =>
                        setConfig({ ...config, instagram: { ...config.instagram, accessToken: e.target.value } })
                      }
                      placeholder="IGQVJxxxxxxxxxxxxxxxx"
                      className="bg-slate-900 border-slate-600 text-slate-100 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => toggleSecret("igToken")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                      {showSecrets.igToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button
                  onClick={() => testConnection("instagram")}
                  disabled={testingConnection === "instagram"}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {testingConnection === "instagram" ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Probando...
                    </>
                  ) : (
                    "Probar Conexión"
                  )}
                </Button>
              </div>
            )}
          </Card>

          {/* LinkedIn, TikTok, YouTube - Similar structure */}
          {/* ... more social platforms ... */}
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <Button variant="outline" onClick={fetchConfig} className="border-slate-600 text-slate-300 bg-transparent">
            Descartar Cambios
          </Button>
          <Button onClick={handleSave} disabled={saving} className="bg-cyan-600 hover:bg-cyan-700">
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Guardar Configuración
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
