"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Settings,
  Shield,
  Users,
  Link2,
  Wrench,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
} from "lucide-react"

export default function AdminPage() {
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({})

  const toggleSecret = (field: string) => {
    setShowSecrets((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">Panel Interno de Administración</h1>
          <p className="text-lg text-slate-400">
            Gestiona configuraciones del portal, integraciones y seguridad desde un solo lugar
          </p>
        </div>

        <Tabs defaultValue="redes" className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700 p-1.5 h-auto flex flex-wrap gap-2">
            <TabsTrigger
              value="redes"
              className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white px-6 py-3 text-base"
            >
              <Facebook className="w-5 h-5 mr-2" />
              Redes Sociales
            </TabsTrigger>
            <TabsTrigger
              value="herramientas"
              className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white px-6 py-3 text-base"
            >
              <Wrench className="w-5 h-5 mr-2" />
              Herramientas
            </TabsTrigger>
            <TabsTrigger
              value="integraciones"
              className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white px-6 py-3 text-base"
            >
              <Link2 className="w-5 h-5 mr-2" />
              Integraciones
            </TabsTrigger>
            <TabsTrigger
              value="seguridad"
              className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white px-6 py-3 text-base"
            >
              <Shield className="w-5 h-5 mr-2" />
              Seguridad
            </TabsTrigger>
            <TabsTrigger
              value="usuarios"
              className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white px-6 py-3 text-base"
            >
              <Users className="w-5 h-5 mr-2" />
              Usuarios
            </TabsTrigger>
          </TabsList>

          {/* REDES SOCIALES */}
          <TabsContent value="redes" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Facebook className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">Facebook</h3>
                  <p className="text-sm text-slate-400">Configura la integración con Facebook Graph API</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Conectado</span>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-base text-slate-200">App ID</Label>
                    <Input
                      placeholder="123456789012345"
                      className="bg-slate-900 border-slate-600 text-white h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base text-slate-200">Page ID</Label>
                    <Input
                      placeholder="987654321098765"
                      className="bg-slate-900 border-slate-600 text-white h-12 text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-base text-slate-200">App Secret</Label>
                  <div className="relative">
                    <Input
                      type={showSecrets.fbSecret ? "text" : "password"}
                      placeholder="abcdef1234567890abcdef1234567890"
                      className="bg-slate-900 border-slate-600 text-white h-12 text-base pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => toggleSecret("fbSecret")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showSecrets.fbSecret ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-base text-slate-200">Access Token (Long-lived)</Label>
                  <div className="relative">
                    <Input
                      type={showSecrets.fbToken ? "text" : "password"}
                      placeholder="EAAxxxxxxxxxxxxxxxxxxxxx"
                      className="bg-slate-900 border-slate-600 text-white h-12 text-base pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => toggleSecret("fbToken")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showSecrets.fbToken ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-slate-700">
                <Button className="bg-blue-600 hover:bg-blue-700 h-11 px-6 text-base">Probar Conexión</Button>
                <Button variant="outline" className="border-slate-600 text-white h-11 px-6 text-base bg-transparent">
                  Desconectar
                </Button>
              </div>
            </Card>

            {/* Instagram */}
            <Card className="bg-slate-800 border-slate-700 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 rounded-lg flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">Instagram</h3>
                  <p className="text-sm text-slate-400">Integración con Instagram Basic Display API</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <XCircle className="w-5 h-5" />
                    <span className="font-medium">Desconectado</span>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-base text-slate-200">Username</Label>
                    <Input
                      placeholder="titanocloudlatam"
                      className="bg-slate-900 border-slate-600 text-white h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base text-slate-200">User ID</Label>
                    <Input
                      placeholder="17841400008460056"
                      className="bg-slate-900 border-slate-600 text-white h-12 text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-base text-slate-200">Access Token</Label>
                  <div className="relative">
                    <Input
                      type={showSecrets.igToken ? "text" : "password"}
                      placeholder="IGQVJxxxxxxxxxxxxxxxx"
                      className="bg-slate-900 border-slate-600 text-white h-12 text-base pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => toggleSecret("igToken")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showSecrets.igToken ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-slate-700">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-11 px-6 text-base">
                  Conectar Instagram
                </Button>
              </div>
            </Card>

            {/* LinkedIn, Twitter, YouTube - Similar cards */}
            <Card className="bg-slate-800 border-slate-700 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center">
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">LinkedIn</h3>
                  <p className="text-sm text-slate-400">API de LinkedIn para publicaciones empresariales</p>
                </div>
                <Switch />
              </div>
            </Card>

            <Card className="bg-slate-800 border-slate-700 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center">
                  <Twitter className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">Twitter / X</h3>
                  <p className="text-sm text-slate-400">Integración con Twitter API v2</p>
                </div>
                <Switch />
              </div>
            </Card>

            <Card className="bg-slate-800 border-slate-700 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <Youtube className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">YouTube</h3>
                  <p className="text-sm text-slate-400">YouTube Data API v3</p>
                </div>
                <Switch />
              </div>
            </Card>

            <div className="flex justify-end gap-4 pt-6">
              <Button variant="outline" className="border-slate-600 text-white h-12 px-8 text-base bg-transparent">
                Cancelar
              </Button>
              <Button className="bg-cyan-600 hover:bg-cyan-700 h-12 px-8 text-base">
                <Save className="w-5 h-5 mr-2" />
                Guardar Configuración
              </Button>
            </div>
          </TabsContent>

          {/* HERRAMIENTAS */}
          <TabsContent value="herramientas" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700 p-8 hover:border-cyan-500/50 transition-colors cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Sistema de Cotizaciones</h3>
                    <p className="text-slate-400 mb-4 leading-relaxed">
                      Genera cotizaciones personalizadas para clientes con listas de precios y plantillas customizables
                    </p>
                    <Button className="bg-cyan-600 hover:bg-cyan-700 h-10">Configurar</Button>
                  </div>
                </div>
              </Card>

              <Card className="bg-slate-800 border-slate-700 p-8 hover:border-cyan-500/50 transition-colors cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Gestión de Productos</h3>
                    <p className="text-slate-400 mb-4 leading-relaxed">
                      Administra catálogo de productos y servicios con precios, descripciones e imágenes
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-700 h-10">Configurar</Button>
                  </div>
                </div>
              </Card>

              <Card className="bg-slate-800 border-slate-700 p-8 hover:border-cyan-500/50 transition-colors cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Centro Financiero</h3>
                    <p className="text-slate-400 mb-4 leading-relaxed">
                      Control de facturación, pagos, reportes financieros y estados de cuenta
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700 h-10">Configurar</Button>
                  </div>
                </div>
              </Card>

              <Card className="bg-slate-800 border-slate-700 p-8 hover:border-cyan-500/50 transition-colors cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Generador de Plantillas</h3>
                    <p className="text-slate-400 mb-4 leading-relaxed">
                      Crea plantillas personalizadas para cotizaciones, facturas y documentos
                    </p>
                    <Button className="bg-orange-600 hover:bg-orange-700 h-10">Configurar</Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* INTEGRACIONES */}
          <TabsContent value="integraciones" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center text-3xl">☁️</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Cloudflare</h3>
                    <p className="text-slate-400">Gestión de DNS, CDN y seguridad</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-semibold text-lg">Conectado</span>
                  </div>
                  <Button variant="outline" className="border-slate-600 text-white h-11 px-6 bg-transparent">
                    Configurar
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 pt-6 border-t border-slate-700">
                <div className="bg-slate-900 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-1">24</div>
                  <div className="text-sm text-slate-400">Zonas DNS</div>
                </div>
                <div className="bg-slate-900 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-1">156</div>
                  <div className="text-sm text-slate-400">Registros</div>
                </div>
                <div className="bg-slate-900 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-1">12</div>
                  <div className="text-sm text-slate-400">Reglas Firewall</div>
                </div>
                <div className="bg-slate-900 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-1">98.7%</div>
                  <div className="text-sm text-slate-400">Cache Hit Rate</div>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-800 border-slate-700 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-3xl">⚡</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Microsoft Azure</h3>
                    <p className="text-slate-400">Servicios cloud de Microsoft</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-semibold text-lg">Conectado</span>
                  </div>
                  <Button variant="outline" className="border-slate-600 text-white h-11 px-6 bg-transparent">
                    Configurar
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-800 border-slate-700 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-yellow-600 rounded-lg flex items-center justify-center text-3xl">📦</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Amazon AWS</h3>
                    <p className="text-slate-400">Amazon Web Services</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <XCircle className="w-6 h-6" />
                    <span className="font-semibold text-lg">Desconectado</span>
                  </div>
                  <Button className="bg-cyan-600 hover:bg-cyan-700 h-11 px-6">Conectar</Button>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-700">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-base text-slate-200">Access Key ID</Label>
                    <Input
                      placeholder="AKIAIOSFODNN7EXAMPLE"
                      className="bg-slate-900 border-slate-600 text-white h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base text-slate-200">Region</Label>
                    <Input
                      placeholder="us-east-1"
                      className="bg-slate-900 border-slate-600 text-white h-12 text-base"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-slate-200">Secret Access Key</Label>
                  <Input
                    type="password"
                    placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
                    className="bg-slate-900 border-slate-600 text-white h-12 text-base"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* SEGURIDAD */}
          <TabsContent value="seguridad" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Configuración de Seguridad</h3>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-5 bg-slate-900 rounded-lg">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Autenticación de Dos Factores (2FA)</h4>
                    <p className="text-slate-400">Requiere verificación adicional para iniciar sesión</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-5 bg-slate-900 rounded-lg">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Forzar HTTPS</h4>
                    <p className="text-slate-400">Redirigir automáticamente HTTP a HTTPS</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-5 bg-slate-900 rounded-lg">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Auditoría de Acceso</h4>
                    <p className="text-slate-400">Registrar todos los inicios de sesión y acciones críticas</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-5 bg-slate-900 rounded-lg">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Restricción por IP</h4>
                    <p className="text-slate-400">Permitir acceso solo desde IPs autorizadas</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-5 bg-slate-900 rounded-lg">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Detección de Intrusiones</h4>
                    <p className="text-slate-400">Sistema IDS/IPS activo para monitorear amenazas</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="pt-6 border-t border-slate-700 space-y-4">
                  <h4 className="text-xl font-semibold text-white">Políticas de Contraseña</h4>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-base text-slate-200">Longitud Mínima</Label>
                      <Input
                        type="number"
                        defaultValue="12"
                        className="bg-slate-900 border-slate-600 text-white h-12 text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base text-slate-200">Caducidad (días)</Label>
                      <Input
                        type="number"
                        defaultValue="90"
                        className="bg-slate-900 border-slate-600 text-white h-12 text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline" className="border-slate-600 text-white h-12 px-8 text-base bg-transparent">
                Cancelar
              </Button>
              <Button className="bg-cyan-600 hover:bg-cyan-700 h-12 px-8 text-base">
                <Save className="w-5 h-5 mr-2" />
                Guardar Configuración
              </Button>
            </div>
          </TabsContent>

          {/* USUARIOS */}
          <TabsContent value="usuarios" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Gestión de Usuarios</h3>
                <Button className="bg-cyan-600 hover:bg-cyan-700 h-11 px-6">
                  <Users className="w-5 h-5 mr-2" />
                  Nuevo Usuario
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Juan Camilo", email: "juan.chaves@titanocloud.com", role: "Administrador", active: true },
                  { name: "María González", email: "maria.g@titanocloud.com", role: "Editor", active: true },
                  { name: "Carlos Ruiz", email: "carlos.r@titanocloud.com", role: "Soporte", active: true },
                  { name: "Ana Martínez", email: "ana.m@titanocloud.com", role: "Ventas", active: false },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-slate-900 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{user.name}</h4>
                        <p className="text-sm text-slate-400">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm font-medium text-cyan-400">{user.role}</div>
                        <div className="text-xs text-slate-500">{user.active ? "Activo" : "Inactivo"}</div>
                      </div>
                      <Button variant="outline" className="border-slate-600 text-white h-10 px-5 bg-transparent">
                        Editar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-slate-800 border-slate-700 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Roles y Permisos</h3>

              <div className="grid md:grid-cols-3 gap-6">
                {["Administrador", "Editor", "Soporte", "Ventas", "Auditor", "Cliente"].map((role) => (
                  <Card
                    key={role}
                    className="bg-slate-900 border-slate-700 p-6 hover:border-cyan-500/50 transition-colors"
                  >
                    <h4 className="text-lg font-bold text-white mb-3">{role}</h4>
                    <p className="text-slate-400 text-sm mb-4">Control total sobre la plataforma y configuraciones</p>
                    <Button variant="outline" className="border-slate-600 text-white w-full h-10 bg-transparent">
                      Configurar Permisos
                    </Button>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
