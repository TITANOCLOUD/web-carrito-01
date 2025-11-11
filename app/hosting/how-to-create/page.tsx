"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Globe } from "lucide-react"

export default function HowToCreatePage() {
  const steps = [
    {
      title: "1. Elige un Dominio",
      description: "Registra un dominio memorable que represente tu marca o proyecto",
    },
    {
      title: "2. Contrata Hosting",
      description: "Selecciona un plan de hosting adecuado para tus necesidades",
    },
    {
      title: "3. Instala tu CMS",
      description: "WordPress, Joomla, Drupal o desarrolla desde cero",
    },
    {
      title: "4. Diseña tu Sitio",
      description: "Usa plantillas o contrata un diseñador profesional",
    },
    {
      title: "5. Publica Contenido",
      description: "Agrega páginas, blog posts, imágenes y multimedia",
    },
    {
      title: "6. Optimiza SEO",
      description: "Mejora tu posicionamiento en buscadores",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-6">
          <Globe className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold">Guía de Creación</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          ¿Cómo Crear un Sitio Web?
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Guía paso a paso para crear tu presencia online profesional
        </p>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto space-y-6">
          {steps.map((step, index) => (
            <Card key={index} className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">{step.description}</CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
