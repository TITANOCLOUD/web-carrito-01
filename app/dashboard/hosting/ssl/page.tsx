"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Shield, Lock, TrendingUp, DollarSign, HeadphonesIcon, Award } from "lucide-react"

const sslPackages = [
  {
    name: "SSL DV Sectigo",
    type: "Dominio verificado",
    price: 61.59,
    description: "Dominio verificado y garantía incluida",
    validation: "Validación del dominio únicamente",
    guarantee: "Hasta 500,000 $",
    issueTime: "1 hora",
    features: [
      "Validación del dominio",
      "Emisor: Sectigo",
      "Confianza reforzada, candado HTTPS",
      "Longitud de la clave: 2048 bits",
      "Atención al cliente 24/7",
      "Multidominio",
      "www.example.com + example.com incluido",
      "99.9% compatibilidad con navegadores",
    ],
  },
  {
    name: "SSL EV Sectigo",
    type: "Empresa verificada",
    price: 124.29,
    description: "Dominio y empresa verificados, garantía incluida",
    validation: "Validación del dominio y de la empresa",
    guarantee: "Hasta 1,750,000 $",
    issueTime: "15 días",
    features: [
      "Validación del dominio y empresa",
      "Emisor: Sectigo",
      "Máxima confianza",
      "Nombre mostrado en barra de direcciones",
      "Barra de direcciones verde",
      "Longitud de la clave: 2048 bits",
      "Atención al cliente 24/7",
      "Multidominio",
      "www.example.com + example.com incluido",
      "99.9% compatibilidad con navegadores",
      "Reservado a empresas",
    ],
  },
]

const benefits = [
  {
    icon: Shield,
    title: "Refuerza la seguridad",
    description: "Tecnologías de cifrado de última generación para proteger datos sensibles",
  },
  {
    icon: TrendingUp,
    title: "Aumenta tus ventas",
    description: "Refuerza la confianza y mejora las tasas de conversión",
  },
  {
    icon: Lock,
    title: "Mejora tu SEO",
    description: "Mejor visibilidad en motores de búsqueda y más tráfico orgánico",
  },
  {
    icon: DollarSign,
    title: "Protección financiera",
    description: "Garantías que cubren pérdidas potenciales",
  },
  {
    icon: HeadphonesIcon,
    title: "Soporte dedicado",
    description: "Soporte premium para resolver problemas rápidamente",
  },
  {
    icon: Award,
    title: "Proveedor reconocido",
    description: "Sectigo, líder mundial en seguridad digital",
  },
]

export default function SSLPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Certificados SSL</h1>
        <p className="text-slate-400">Protege eficazmente tu sitio web con certificados SSL premium</p>
      </div>

      <Card className="bg-gradient-to-br from-cyan-900/20 to-slate-800/50 border-cyan-500/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-500/20 rounded-lg">
              <Lock className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Certificado SSL Let's Encrypt gratuito incluido</h3>
              <p className="text-slate-300">
                Todos los planes de hosting incluyen un certificado SSL DV Let's Encrypt gratuito que se renueva
                automáticamente cada 90 días. ¡Sin configuración técnica necesaria!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Certificados SSL Premium</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {sslPackages.map((pkg, idx) => (
            <Card key={idx} className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-cyan-400">{pkg.name}</CardTitle>
                  <Shield className="w-6 h-6 text-cyan-400" />
                </div>
                <CardDescription className="text-slate-400">{pkg.description}</CardDescription>
                <div className="pt-4">
                  <div className="text-4xl font-bold text-white">${pkg.price}</div>
                  <div className="text-slate-400">/año</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Contratar</Button>

                <div className="space-y-3 pt-4 border-t border-slate-700">
                  <div>
                    <div className="text-sm text-slate-400">Nivel de validación</div>
                    <div className="text-white font-medium">{pkg.validation}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Garantía</div>
                    <div className="text-white font-medium">{pkg.guarantee}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Plazo de emisión</div>
                    <div className="text-white font-medium">{pkg.issueTime}</div>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  {pkg.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">¿Por qué elegir un certificado SSL de pago?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <Card key={idx} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="p-3 bg-cyan-500/20 rounded-lg w-fit mb-2">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <CardTitle className="text-white text-lg">{benefit.title}</CardTitle>
                  <CardDescription className="text-slate-400">{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
