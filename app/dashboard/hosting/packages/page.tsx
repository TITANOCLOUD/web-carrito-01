"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star } from "lucide-react"

const packages = [
  {
    name: "Starter",
    description: "Para iniciarte con éxito en el desarrollo de sitios web.",
    price: 1.04,
    popular: false,
    features: [
      "1 único sitio",
      "Potencia estándar",
      "1 dominio gratis el primer año",
      "1 GB de almacenamiento SSD",
      "2 direcciones de correo (5 GB)",
      "CMS en un solo clic (WordPress, Joomla!, Drupal, PrestaShop)",
      "1 base de datos de 250 MB",
      "SSL gratis ilimitado",
      "Protección anti-DDoS",
      "Antivirus y antispam",
      "Backups diarios",
      "99,9% de disponibilidad observada",
      "Tráfico ilimitado",
      "Git (limitado a 1 repositorio)",
      "Soporte a través de tíquets",
      "CDN Basic",
    ],
  },
  {
    name: "Personal",
    description: "Para crear un sitio web corporativo o un blog personal",
    price: 4.39,
    popular: true,
    features: [
      "Sitios web ilimitados",
      "Potencia estándar",
      "1 dominio gratis el primer año",
      "100 GB de almacenamiento SSD",
      "10 direcciones de correo (5GB)",
      "CMS en un solo clic",
      "1 base de datos de 500 MB",
      "Web Cloud Databases",
      "SSL gratis ilimitado",
      "Protección anti-DDoS",
      "Backups diarios",
      "99,9% de disponibilidad observada",
      "Tráfico ilimitado",
      "Git (limitado a 1 repositorio)",
      "Soporte estándar",
      "Acceso SSH",
      "CDN Basic",
    ],
  },
  {
    name: "Pro",
    description: "Para desarrollar sitios web profesionales",
    price: 7.69,
    popular: false,
    features: [
      "Sitios web ilimitados",
      "Potencia superior",
      "1 dominio gratis el primer año",
      "250 GB de almacenamiento SSD",
      "100 direcciones de correo (5 GB)",
      "CMS en un solo clic",
      "4 bases de datos de 1 GB",
      "Web Cloud Databases",
      "SSL gratis ilimitado",
      "Protección anti-DDoS",
      "Backups diarios",
      "99,9% de disponibilidad observada",
      "Tráfico ilimitado",
      "Git",
      "Soporte estándar",
      "Acceso SSH",
      "CDN Basic",
    ],
  },
  {
    name: "Performance",
    description: "Para tiendas online y proyectos exigentes",
    price: 13.19,
    popular: false,
    features: [
      "Sitios web ilimitados",
      "Potencia de alto nivel",
      "1 dominio gratis el primer año",
      "500 GB de almacenamiento SSD",
      "1000 direcciones de correo",
      "CMS en un solo clic",
      "4 bases de datos de 1 GB",
      "Web Cloud Databases 8 GB",
      "SSL gratis ilimitado",
      "Protección anti-DDoS",
      "Backups diarios",
      "99,9% de disponibilidad observada",
      "Recursos garantizados",
      "Tráfico ilimitado",
      "Opción Boost",
      "Git",
      "Soporte estándar",
      "Acceso SSH",
      "CDN Basic",
    ],
  },
]

export default function HostingPackagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Web Hosting</h1>
        <p className="text-slate-400">Packs completos, adaptados a todos sus proyectos web</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg, idx) => (
          <Card
            key={idx}
            className={`bg-slate-800/50 border-slate-700 relative ${pkg.popular ? "ring-2 ring-cyan-500" : ""}`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="bg-cyan-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  Best seller
                </div>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-cyan-400">{pkg.name}</CardTitle>
              <CardDescription className="text-slate-400">{pkg.description}</CardDescription>
              <div className="pt-4">
                <div className="text-sm text-slate-400">Desde</div>
                <div className="text-4xl font-bold text-white">${pkg.price}</div>
                <div className="text-slate-400">/mes</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Contratar</Button>
              <div className="space-y-2">
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
  )
}
