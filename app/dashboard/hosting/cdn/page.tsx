"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Zap, Shield, TrendingUp, Check } from "lucide-react"
import { useState } from "react"

export default function CDNPage() {
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "security" | "advanced" | null>(null)

  const plans = [
    {
      name: "CDN Basic",
      price: 2.79,
      description: "Disfruta de una potente CDN en solo un clic",
      badge: "",
      features: [
        "Gratis con planes Performance",
        "Activable desde área de cliente",
        "Cobertura mundial",
        "Protección anti-DDoS",
        "Certificado SSL",
      ],
    },
    {
      name: "CDN Security",
      price: 6.59,
      description: "Protege tus sitios web con configuración personalizable",
      badge: "RECOMENDADO",
      features: [
        "CDN Basic incluida",
        "Firewall de aplicaciones web (WAF)",
        "Cross-Origin Resource Sharing (CORS)",
        "HTTP Strict Transport Security (HSTS)",
        "HTTPS-Redirect",
      ],
    },
    {
      name: "CDN Advanced",
      price: 13.19,
      description: "Optimiza tu configuración para adaptarla a tus necesidades",
      badge: "",
      features: [
        "CDN Basic y Security incluidas",
        "Hasta 100 reglas de caché",
        "Redirección sitio móvil",
        "Query string management",
        "Internacionalización avanzada",
      ],
    },
  ]

  const benefits = [
    {
      icon: Zap,
      title: "Velocidad mejorada",
      description: "Reduce el tiempo de carga hasta en un 70%",
    },
    {
      icon: Globe,
      title: "Alcance global",
      description: "Contenido servido desde el servidor más cercano",
    },
    {
      icon: Shield,
      title: "Seguridad reforzada",
      description: "Protección contra ataques DDoS y bots",
    },
    {
      icon: TrendingUp,
      title: "Mejor SEO",
      description: "Google premia los sitios rápidos en rankings",
    },
  ]

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">CDN - Content Delivery Network</h1>
          <p className="text-slate-400">
            Optimiza el tráfico de tu sitio web con nuestra CDN para una experiencia de usuario inmejorable.
          </p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-cyan-400 mb-3">Shared CDN</h2>
          <p className="text-slate-300 leading-relaxed">
            Optimiza el tráfico de tu sitio web con la opción Shared CDN para una experiencia de usuario inmejorable. El
            servicio Content Delivery Network (CDN) reduce el tiempo de carga de tus páginas para ofrecer una navegación
            más fluida a los visitantes de tu sitio web.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`bg-slate-800 border rounded-lg p-6 hover:border-cyan-500 transition-colors relative ${
                plan.badge ? "border-2 border-cyan-500" : "border-slate-700"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-cyan-400">${plan.price}</span>
                  <span className="text-slate-400">/mes</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Suscripción anual</p>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => setSelectedPlan(idx === 0 ? "basic" : idx === 1 ? "security" : "advanced")}
                className="w-full bg-cyan-600 hover:bg-cyan-700"
              >
                Elegir plan
              </Button>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-8 overflow-x-auto">
          <h3 className="text-2xl font-bold text-white mb-6">Tabla comparativa</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Funcionalidad</th>
                <th className="text-center py-3 px-4 text-cyan-400 font-bold">
                  <div>BASIC</div>
                  <div className="text-2xl mt-1">$2.79/mes</div>
                </th>
                <th className="text-center py-3 px-4 text-cyan-400 font-bold">
                  <div>SECURITY</div>
                  <div className="text-2xl mt-1">$6.59/mes</div>
                </th>
                <th className="text-center py-3 px-4 text-cyan-400 font-bold">
                  <div>ADVANCED</div>
                  <div className="text-2xl mt-1">$13.19/mes</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Always online", basic: true, security: true, advanced: true },
                { name: "Protección anti-DDoS", basic: true, security: true, advanced: true },
                { name: "Analytics", basic: true, security: true, advanced: true },
                { name: "Logs HTTP", basic: true, security: true, advanced: true },
                { name: "HTTP/2", basic: true, security: true, advanced: true },
                { name: "Compresión Gzip", basic: true, security: true, advanced: true },
                { name: "Compresión Brotli", basic: true, security: true, advanced: true },
                { name: "Limpieza de caché", basic: true, security: true, advanced: "enhanced" },
                { name: "Reglas de caché", basic: true, security: true, advanced: "enhanced" },
                { name: "Certificado SSL", basic: true, security: true, advanced: true },
                { name: "Devmode/Bypass", basic: true, security: true, advanced: true },
                { name: "Redirección HTTPS automática", basic: false, security: true, advanced: true },
                { name: "Contenido mixto", basic: false, security: true, advanced: true },
                { name: "HTTP Strict Transport Security (HSTS)", basic: false, security: true, advanced: true },
                { name: "Cross-Origin Resource Sharing (CORS)", basic: false, security: true, advanced: true },
                { name: "Firewall de aplicaciones web (WAF)", basic: false, security: true, advanced: true },
                { name: "Redirección hacia un sitio web móvil", basic: false, security: false, advanced: true },
                { name: "Contenido precargado", basic: false, security: false, advanced: true },
                { name: "Gestión de las query strings", basic: false, security: false, advanced: true },
                { name: "Internacionalización avanzada", basic: false, security: false, advanced: true },
              ].map((feature, idx) => (
                <tr key={idx} className="border-b border-slate-700/50">
                  <td className="py-3 px-4 text-slate-300">{feature.name}</td>
                  <td className="text-center py-3 px-4">
                    {feature.basic === true && <Check className="w-5 h-5 text-green-400 mx-auto" />}
                    {feature.basic === "enhanced" && <span className="text-cyan-400 font-bold">➕</span>}
                    {feature.basic === false && <span className="text-slate-600">—</span>}
                  </td>
                  <td className="text-center py-3 px-4">
                    {feature.security === true && <Check className="w-5 h-5 text-green-400 mx-auto" />}
                    {feature.security === "enhanced" && <span className="text-cyan-400 font-bold">➕</span>}
                    {feature.security === false && <span className="text-slate-600">—</span>}
                  </td>
                  <td className="text-center py-3 px-4">
                    {feature.advanced === true && <Check className="w-5 h-5 text-green-400 mx-auto" />}
                    {feature.advanced === "enhanced" && <span className="text-cyan-400 font-bold">➕</span>}
                    {feature.advanced === false && <span className="text-slate-600">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-slate-500 mt-4">
            Leyenda: ✓ = funcionalidad incluida en la oferta; ➕ = funcionalidad incluida y mejorada.
          </p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Incluido por defecto en los tres planes</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Cobertura mundial",
                description:
                  "Nuestro servicio, disponible a ambos lados del Atlántico, ofrece una carga eficiente de tus sitios web, tanto en Europa como en Estados Unidos.",
              },
              {
                title: "Protección anti-DDoS",
                description:
                  "Protégete frente a los ataques de denegación de servicio distribuidos con nuestra exclusiva protección anti-DDoS incluida por defecto.",
              },
              {
                title: "Puesta en caché optimizada",
                description:
                  "Nuestra CDN analiza permanentemente el contenido de tu sitio web para garantizar que la caché disponible es siempre la más reciente.",
              },
              {
                title: "Enrutamiento Anycast",
                description:
                  "El tráfico de tu sitio web se redirige hacia la infraestructura más cercana geográficamente o aquella que ofrece una respuesta más rápida.",
              },
              {
                title: "Certificado SSL Let's Encrypt",
                description:
                  "Refuerza la seguridad de tu sitio web con un certificado SSL gratuito. Actívalo en pocos clics directamente desde tu área de cliente.",
              },
              {
                title: "Compresión de datos",
                description:
                  "Reduce el tamaño de los datos transferidos y acelera la carga de tu sitio web con los algoritmos Gzip y Brotli.",
              },
              {
                title: "CDN Analytics",
                description: "Optimiza tu sitio web gracias a las métricas detalladas del estado del tráfico.",
              },
              {
                title: "Activación en 1 clic",
                description: "Activa o pasa a un plan CDN superior en solo un clic desde tu área de cliente.",
              },
            ].map((feature, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-lg font-semibold text-cyan-400">{feature.title}</h4>
                <p className="text-slate-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Beneficios originales */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
