"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Rocket, Zap, Shield, Gauge, Check } from "lucide-react"

export default function WordPressPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Aloje su sitio web WordPress</h1>
        <p className="text-slate-400">WordPress instalado automáticamente y optimizado para el mejor rendimiento</p>
      </div>

      <Card className="bg-gradient-to-br from-cyan-900/20 to-slate-800/50 border-cyan-500/30">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">WordPress en un solo clic</h2>
              <p className="text-slate-300 mb-6">
                Instala WordPress automáticamente desde tu área de cliente. Sin configuración técnica, sin FTP, sin
                bases de datos manuales. Solo elige tu plan y comienza a crear.
              </p>
              <Button className="bg-cyan-600 hover:bg-cyan-700" size="lg">
                <Rocket className="w-5 h-5 mr-2" />
                Comenzar ahora
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-cyan-500/20 rounded">
                  <Zap className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Instalación instantánea</h4>
                  <p className="text-sm text-slate-400">WordPress listo en menos de 1 minuto</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-cyan-500/20 rounded">
                  <Gauge className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Optimizado para velocidad</h4>
                  <p className="text-sm text-slate-400">Cache y CDN incluidos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-cyan-500/20 rounded">
                  <Shield className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Seguridad incluida</h4>
                  <p className="text-sm text-slate-400">SSL gratis y actualizaciones automáticas</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Características de WordPress Hosting</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Instalación con un clic",
            "Actualizaciones automáticas",
            "Temas premium incluidos",
            "Plugins preinstalados",
            "WP-CLI disponible",
            "Staging environment",
            "Backups diarios automáticos",
            "SSL gratis",
            "CDN incluido",
            "Cache optimizado",
            "PHP 8.x",
            "Soporte WordPress 24/7",
          ].map((feature, idx) => (
            <Card key={idx} className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4 flex items-center gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-slate-300">{feature}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
