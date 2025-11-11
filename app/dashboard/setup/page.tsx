"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Building2, ImageIcon, Github, Cloud, CheckCircle2, Settings } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

const steps = [
  { id: 1, name: "Información Básica", icon: Building2 },
  { id: 2, name: "Branding", icon: ImageIcon },
  { id: 3, name: "Marcas y Partners", icon: Building2 },
  { id: 4, name: "Clientes", icon: Building2 },
  { id: 5, name: "Casos de Éxito", icon: CheckCircle2 },
  { id: 6, name: "Módulos y Páginas", icon: Settings },
  { id: 7, name: "Integración Vercel", icon: Cloud },
  { id: 8, name: "Integración GitHub", icon: Github },
]

const modules = [
  { id: "monitoring", name: "Monitoreo NOC", description: "Sistema de monitoreo de reactores y servidores" },
  { id: "baremetal", name: "Bare Metal & VPS", description: "Gestión de servidores dedicados y VPS" },
  { id: "domains", name: "Dominios y Hosting", description: "Gestión de dominios, hosting y email" },
  { id: "publiccloud", name: "Nube Pública", description: "Servicios de cloud computing público" },
  { id: "privatecloud", name: "Nube Privada", description: "Soluciones de nube privada alojada" },
  { id: "security", name: "Seguridad", description: "Herramientas y servicios de seguridad" },
  { id: "support", name: "Soporte", description: "Sistema de tickets y soporte" },
]

export default function SetupWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: "",
    companySlogan: "",
    logo: null as File | null,
    favicon: null as File | null,
    brands: [] as Array<{ name: string; logo: File | null }>,
    clients: [] as Array<{ name: string; logo: File | null; testimonial: string }>,
    successCases: [] as Array<{ title: string; description: string; results: string; client: string }>,
    enabledModules: ["monitoring", "baremetal", "domains"],
    vercelToken: "",
    vercelProject: "",
    githubToken: "",
    githubRepo: "",
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "logo" | "favicon") => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, [field]: file })
    }
  }

  const toggleModule = (moduleId: string) => {
    const enabled = formData.enabledModules.includes(moduleId)
    setFormData({
      ...formData,
      enabledModules: enabled
        ? formData.enabledModules.filter((id) => id !== moduleId)
        : [...formData.enabledModules, moduleId],
    })
  }

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleFinish = async () => {
    // Aquí se procesaría la configuración
    console.log("Configuración completa:", formData)
    alert("¡Configuración completada! Tu plataforma está lista.")
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Configuración Inicial</h1>
          <p className="text-slate-400">Configura tu plataforma en 8 sencillos pasos</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`
                      w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors
                      ${isCompleted ? "bg-cyan-500 text-white" : isActive ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-400"}
                    `}
                    >
                      {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                    </div>
                    <span
                      className={`text-xs text-center ${isActive ? "text-cyan-400 font-medium" : "text-slate-400"}`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-0.5 flex-1 -mt-8 ${currentStep > step.id ? "bg-cyan-500" : "bg-slate-800"}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white text-2xl">{steps[currentStep - 1].name}</CardTitle>
            <CardDescription className="text-slate-400">
              {currentStep === 1 && "Información básica de tu empresa"}
              {currentStep === 2 && "Carga tu logo y favicon"}
              {currentStep === 3 && "Agrega las marcas y partners con los que trabajas"}
              {currentStep === 4 && "Agrega tus clientes y testimonios"}
              {currentStep === 5 && "Agrega casos de éxito de tus proyectos"}
              {currentStep === 6 && "Selecciona los módulos que deseas activar"}
              {currentStep === 7 && "Conecta con tu cuenta de Vercel"}
              {currentStep === 8 && "Conecta con tu repositorio de GitHub"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Company Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName" className="text-slate-300">
                    Nombre de la Compañía *
                  </Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Ej: Saturno Cloud"
                    className="bg-slate-800 border-slate-700 text-white mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="companySlogan" className="text-slate-300">
                    Eslogan / Tagline
                  </Label>
                  <Input
                    id="companySlogan"
                    value={formData.companySlogan}
                    onChange={(e) => setFormData({ ...formData, companySlogan: e.target.value })}
                    placeholder="Ej: Soluciones Cloud de Próxima Generación"
                    className="bg-slate-800 border-slate-700 text-white mt-2"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Branding */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-slate-300">Logo de la Empresa *</Label>
                  <div className="mt-2 border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-cyan-500 transition-colors">
                    <Upload className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "logo")}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label htmlFor="logo-upload" className="cursor-pointer">
                      <Button
                        type="button"
                        variant="outline"
                        className="bg-slate-800 border-slate-700 text-slate-300"
                        asChild
                      >
                        <span>Seleccionar Logo</span>
                      </Button>
                    </label>
                    {formData.logo && <p className="text-cyan-400 mt-2 text-sm">{formData.logo.name}</p>}
                    <p className="text-slate-500 text-xs mt-2">PNG, JPG o SVG (recomendado: 200x60px)</p>
                  </div>
                </div>

                <div>
                  <Label className="text-slate-300">Favicon *</Label>
                  <div className="mt-2 border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-cyan-500 transition-colors">
                    <ImageIcon className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "favicon")}
                      className="hidden"
                      id="favicon-upload"
                    />
                    <label htmlFor="favicon-upload" className="cursor-pointer">
                      <Button
                        type="button"
                        variant="outline"
                        className="bg-slate-800 border-slate-700 text-slate-300"
                        asChild
                      >
                        <span>Seleccionar Favicon</span>
                      </Button>
                    </label>
                    {formData.favicon && <p className="text-cyan-400 mt-2 text-sm">{formData.favicon.name}</p>}
                    <p className="text-slate-500 text-xs mt-2">PNG o ICO (recomendado: 32x32px)</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Brands and Partners */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <p className="text-slate-400 text-sm mb-4">Agrega las marcas y partners con los que trabajas</p>
                <Button
                  onClick={() =>
                    setFormData({
                      ...formData,
                      brands: [...formData.brands, { name: "", logo: null }],
                    })
                  }
                  className="bg-cyan-600 hover:bg-cyan-700"
                >
                  Agregar Marca / Partner
                </Button>
                {formData.brands.map((brand, index) => (
                  <div key={index} className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg space-y-3">
                    <Input
                      placeholder="Nombre de la marca"
                      value={brand.name}
                      onChange={(e) => {
                        const newBrands = [...formData.brands]
                        newBrands[index].name = e.target.value
                        setFormData({ ...formData, brands: newBrands })
                      }}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const newBrands = [...formData.brands]
                          newBrands[index].logo = file
                          setFormData({ ...formData, brands: newBrands })
                        }
                      }}
                      className="text-slate-400 text-sm"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Step 4: Clients */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <p className="text-slate-400 text-sm mb-4">Agrega tus clientes y testimonios</p>
                <Button
                  onClick={() =>
                    setFormData({
                      ...formData,
                      clients: [...formData.clients, { name: "", logo: null, testimonial: "" }],
                    })
                  }
                  className="bg-cyan-600 hover:bg-cyan-700"
                >
                  Agregar Cliente
                </Button>
                {formData.clients.map((client, index) => (
                  <div key={index} className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg space-y-3">
                    <Input
                      placeholder="Nombre del cliente"
                      value={client.name}
                      onChange={(e) => {
                        const newClients = [...formData.clients]
                        newClients[index].name = e.target.value
                        setFormData({ ...formData, clients: newClients })
                      }}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                    <textarea
                      placeholder="Testimonio del cliente"
                      value={client.testimonial}
                      onChange={(e) => {
                        const newClients = [...formData.clients]
                        newClients[index].testimonial = e.target.value
                        setFormData({ ...formData, clients: newClients })
                      }}
                      className="w-full bg-slate-800 border-slate-700 text-white rounded-md p-2 min-h-[100px]"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const newClients = [...formData.clients]
                          newClients[index].logo = file
                          setFormData({ ...formData, clients: newClients })
                        }
                      }}
                      className="text-slate-400 text-sm"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Step 5: Success Cases */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <p className="text-slate-400 text-sm mb-4">Agrega casos de éxito de tus proyectos</p>
                <Button
                  onClick={() =>
                    setFormData({
                      ...formData,
                      successCases: [...formData.successCases, { title: "", description: "", results: "", client: "" }],
                    })
                  }
                  className="bg-cyan-600 hover:bg-cyan-700"
                >
                  Agregar Caso de Éxito
                </Button>
                {formData.successCases.map((successCase, index) => (
                  <div key={index} className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg space-y-3">
                    <Input
                      placeholder="Título del caso"
                      value={successCase.title}
                      onChange={(e) => {
                        const newCases = [...formData.successCases]
                        newCases[index].title = e.target.value
                        setFormData({ ...formData, successCases: newCases })
                      }}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                    <Input
                      placeholder="Cliente"
                      value={successCase.client}
                      onChange={(e) => {
                        const newCases = [...formData.successCases]
                        newCases[index].client = e.target.value
                        setFormData({ ...formData, successCases: newCases })
                      }}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                    <textarea
                      placeholder="Descripción del proyecto"
                      value={successCase.description}
                      onChange={(e) => {
                        const newCases = [...formData.successCases]
                        newCases[index].description = e.target.value
                        setFormData({ ...formData, successCases: newCases })
                      }}
                      className="w-full bg-slate-800 border-slate-700 text-white rounded-md p-2 min-h-[80px]"
                    />
                    <textarea
                      placeholder="Resultados obtenidos"
                      value={successCase.results}
                      onChange={(e) => {
                        const newCases = [...formData.successCases]
                        newCases[index].results = e.target.value
                        setFormData({ ...formData, successCases: newCases })
                      }}
                      className="w-full bg-slate-800 border-slate-700 text-white rounded-md p-2 min-h-[80px]"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Step 6: Modules */}
            {currentStep === 6 && (
              <div className="space-y-4">
                <p className="text-slate-400 text-sm mb-4">
                  Selecciona los módulos que deseas activar en tu plataforma
                </p>
                {modules.map((module) => (
                  <div
                    key={module.id}
                    className="flex items-start space-x-3 p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition-colors"
                  >
                    <Checkbox
                      id={module.id}
                      checked={formData.enabledModules.includes(module.id)}
                      onCheckedChange={() => toggleModule(module.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label htmlFor={module.id} className="text-white font-medium cursor-pointer">
                        {module.name}
                      </label>
                      <p className="text-slate-400 text-sm mt-1">{module.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 7: Vercel */}
            {currentStep === 7 && (
              <div className="space-y-4">
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 mb-6">
                  <p className="text-cyan-400 text-sm">
                    Conecta con Vercel para desplegar automáticamente tu plataforma
                  </p>
                </div>
                <div>
                  <Label htmlFor="vercelToken" className="text-slate-300">
                    Token de Vercel
                  </Label>
                  <Input
                    id="vercelToken"
                    type="password"
                    value={formData.vercelToken}
                    onChange={(e) => setFormData({ ...formData, vercelToken: e.target.value })}
                    placeholder="vercel_token_xxxxxxxxxxxxx"
                    className="bg-slate-800 border-slate-700 text-white mt-2"
                  />
                  <p className="text-slate-500 text-xs mt-1">Obtén tu token en: Settings → Tokens</p>
                </div>
                <div>
                  <Label htmlFor="vercelProject" className="text-slate-300">
                    Nombre del Proyecto
                  </Label>
                  <Input
                    id="vercelProject"
                    value={formData.vercelProject}
                    onChange={(e) => setFormData({ ...formData, vercelProject: e.target.value })}
                    placeholder="mi-plataforma-cloud"
                    className="bg-slate-800 border-slate-700 text-white mt-2"
                  />
                </div>
              </div>
            )}

            {/* Step 8: GitHub */}
            {currentStep === 8 && (
              <div className="space-y-4">
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 mb-6">
                  <p className="text-cyan-400 text-sm">
                    Conecta con GitHub para versionar y hacer backup de tu configuración
                  </p>
                </div>
                <div>
                  <Label htmlFor="githubToken" className="text-slate-300">
                    Token de GitHub
                  </Label>
                  <Input
                    id="githubToken"
                    type="password"
                    value={formData.githubToken}
                    onChange={(e) => setFormData({ ...formData, githubToken: e.target.value })}
                    placeholder="ghp_xxxxxxxxxxxxx"
                    className="bg-slate-800 border-slate-700 text-white mt-2"
                  />
                  <p className="text-slate-500 text-xs mt-1">
                    Obtén tu token en: Settings → Developer settings → Personal access tokens
                  </p>
                </div>
                <div>
                  <Label htmlFor="githubRepo" className="text-slate-300">
                    Repositorio
                  </Label>
                  <Input
                    id="githubRepo"
                    value={formData.githubRepo}
                    onChange={(e) => setFormData({ ...formData, githubRepo: e.target.value })}
                    placeholder="usuario/mi-plataforma-cloud"
                    className="bg-slate-800 border-slate-700 text-white mt-2"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-slate-800">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="bg-slate-800 border-slate-700 text-slate-300 disabled:opacity-50"
              >
                Anterior
              </Button>

              {currentStep < steps.length ? (
                <Button onClick={nextStep} className="bg-cyan-600 hover:bg-cyan-700 text-white">
                  Siguiente
                </Button>
              ) : (
                <Button onClick={handleFinish} className="bg-cyan-600 hover:bg-cyan-700 text-white">
                  Finalizar Configuración
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
