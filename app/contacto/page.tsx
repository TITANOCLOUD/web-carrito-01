"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Mail, Phone, MapPin, Send } from "lucide-react"
import Image from "next/image"

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    usuario: "",
    nit: "",
    telefono: "",
    correoAlternativo: "",
    pais: "",
    ciudad: "",
    direccion: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({
          nombre: "",
          usuario: "",
          nit: "",
          telefono: "",
          correoAlternativo: "",
          pais: "",
          ciudad: "",
          direccion: "",
        })
      }
    } catch (error) {
      console.error("[v0] Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <Image
            src="/futuristic-cyborg-robot-standing-in-server-room-wi.jpg"
            alt="Contacto Background"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            ¿Estás interesado en que <span className="text-cyan-400">te contactemos?</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Completa el formulario y nuestro equipo se pondrá en contacto contigo para ayudarte a encontrar la mejor
            solución cloud para tu negocio
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="container mx-auto px-4 py-12 -mt-10 relative z-20">
        <div className="max-w-4xl mx-auto">
          {isSuccess ? (
            <Card className="bg-gradient-to-br from-green-900/50 to-slate-900 border-green-500/50">
              <CardContent className="p-12 text-center">
                <CheckCircle2 className="w-20 h-20 text-green-400 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">¡Solicitud Enviada Exitosamente!</h2>
                <p className="text-slate-300 text-lg mb-8">
                  Hemos recibido tu información. Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas.
                </p>
                <Button
                  onClick={() => setIsSuccess(false)}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 text-lg"
                >
                  Enviar otra solicitud
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-cyan-500/30">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold text-white mb-3">Formulario de Contacto</CardTitle>
                <CardDescription className="text-slate-300 text-lg">
                  Proporciona tus datos para que podamos contactarte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Nombre */}
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="text-slate-200 text-base">
                        Nombre Completo *
                      </Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        type="text"
                        placeholder="Juan Pérez"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 py-6 text-base"
                      />
                    </div>

                    {/* Usuario */}
                    <div className="space-y-2">
                      <Label htmlFor="usuario" className="text-slate-200 text-base">
                        Usuario *
                      </Label>
                      <Input
                        id="usuario"
                        name="usuario"
                        type="text"
                        placeholder="juanperez"
                        value={formData.usuario}
                        onChange={handleChange}
                        required
                        className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 py-6 text-base"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* NIT / Registro Tributario */}
                    <div className="space-y-2">
                      <Label htmlFor="nit" className="text-slate-200 text-base">
                        NIT / Registro Tributario *
                      </Label>
                      <Input
                        id="nit"
                        name="nit"
                        type="text"
                        placeholder="123456789-0"
                        value={formData.nit}
                        onChange={handleChange}
                        required
                        className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 py-6 text-base"
                      />
                    </div>

                    {/* Número de Contacto */}
                    <div className="space-y-2">
                      <Label htmlFor="telefono" className="text-slate-200 text-base">
                        Número de Contacto *
                      </Label>
                      <Input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        placeholder="+52 1 234 567 890"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 py-6 text-base"
                      />
                    </div>
                  </div>

                  {/* Correo Alternativo */}
                  <div className="space-y-2">
                    <Label htmlFor="correoAlternativo" className="text-slate-200 text-base">
                      Correo Electrónico Alternativo
                    </Label>
                    <Input
                      id="correoAlternativo"
                      name="correoAlternativo"
                      type="email"
                      placeholder="contacto@empresa.com"
                      value={formData.correoAlternativo}
                      onChange={handleChange}
                      className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 py-6 text-base"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* País */}
                    <div className="space-y-2">
                      <Label htmlFor="pais" className="text-slate-200 text-base">
                        País *
                      </Label>
                      <Input
                        id="pais"
                        name="pais"
                        type="text"
                        placeholder="México"
                        value={formData.pais}
                        onChange={handleChange}
                        required
                        className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 py-6 text-base"
                      />
                    </div>

                    {/* Ciudad */}
                    <div className="space-y-2">
                      <Label htmlFor="ciudad" className="text-slate-200 text-base">
                        Ciudad *
                      </Label>
                      <Input
                        id="ciudad"
                        name="ciudad"
                        type="text"
                        placeholder="Ciudad de México"
                        value={formData.ciudad}
                        onChange={handleChange}
                        required
                        className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 py-6 text-base"
                      />
                    </div>
                  </div>

                  {/* Dirección */}
                  <div className="space-y-2">
                    <Label htmlFor="direccion" className="text-slate-200 text-base">
                      Dirección *
                    </Label>
                    <Input
                      id="direccion"
                      name="direccion"
                      type="text"
                      placeholder="Calle Principal #123, Colonia Centro"
                      value={formData.direccion}
                      onChange={handleChange}
                      required
                      className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 py-6 text-base"
                    />
                  </div>

                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-7 text-lg disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Send className="w-5 h-5 mr-2 animate-pulse" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Enviar Solicitud
                        </>
                      )}
                    </Button>
                  </div>

                  <p className="text-sm text-slate-400 text-center">
                    Al enviar este formulario, aceptas que Titanocloud se ponga en contacto contigo.
                  </p>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-slate-900 border-slate-800 text-center">
              <CardContent className="p-6">
                <Phone className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-white font-bold mb-2">Teléfono</h3>
                <p className="text-slate-300 text-sm">+52 442 900 0182 (México)</p>
                <p className="text-slate-300 text-sm">+1 786 822 5999 (Miami)</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800 text-center">
              <CardContent className="p-6">
                <Mail className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-white font-bold mb-2">Email</h3>
                <p className="text-slate-300 text-sm">datacenter@titanocloud.com</p>
                <p className="text-slate-300 text-sm">support@titanocloud.com</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800 text-center">
              <CardContent className="p-6">
                <MapPin className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-white font-bold mb-2">Global</h3>
                <p className="text-slate-300 text-sm">Centros de Datos</p>
                <p className="text-slate-300 text-sm">en 3 continentes</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
