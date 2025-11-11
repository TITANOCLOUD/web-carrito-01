import Link from "next/link"
import { Logo } from "@/components/logo"
import { Server, Globe, Mail, Phone, MapPin, Activity } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#0a0e1a] py-12">
      <div className="container mx-auto px-4">
        {/* Company Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Company Info - Left Side */}
          <div>
            <Logo variant="minimal" className="h-16 mb-4" />
            <p className="text-slate-400 text-sm mb-4 leading-relaxed max-w-2xl">
              Desarrollamos una infraestructura cloud de alto rendimiento
              <br />
              que combina potencia, estabilidad y flexibilidad
              <br />
              para entornos empresariales modernos.
            </p>
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Global Data Centers</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400" />
                <div className="flex flex-col">
                  <a href="tel:+5244429000182" className="hover:text-cyan-400 transition-colors">
                    +52 442 900 0182 <span className="text-xs text-slate-500">(México)</span>
                  </a>
                  <a href="tel:+17868225999" className="hover:text-cyan-400 transition-colors">
                    +1 786 822 5999 <span className="text-xs text-slate-500">(Miami)</span>
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>support@titanocloud.com</span>
              </div>
            </div>
          </div>

          {/* Navigation Menus - Right Side: 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Products */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Server className="w-4 h-4 text-cyan-400" />
                Productos
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/bare-metal" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Bare Metal Servers
                  </Link>
                </li>
                <li>
                  <Link href="/vps" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Virtual Private Servers
                  </Link>
                </li>
                <li>
                  <Link href="/clusters" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Kubernetes Clusters
                  </Link>
                </li>
                <li>
                  <Link href="/nube-publica" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Nube Pública
                  </Link>
                </li>
                <li>
                  <Link href="/nube-privada" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Nube Privada Alojada
                  </Link>
                </li>
              </ul>
            </div>

            {/* Herramientas */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Herramientas
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/detector-caidas"
                    className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
                  >
                    <Activity className="w-3 h-3" />
                    Detector de Caídas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/speedtest"
                    className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
                  >
                    <Activity className="w-3 h-3" />
                    Medidor de Velocidad
                  </Link>
                </li>
              </ul>
            </div>

            {/* Empresa */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                Empresa
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/acerca-de" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Acerca de
                  </Link>
                </li>
                <li>
                  <Link href="/ecosistema" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Ecosistema
                  </Link>
                </li>
                <li>
                  <Link
                    href="/conformidad-certificaciones"
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    Conformidad y certificaciones
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Carreras
                  </Link>
                </li>
                <li>
                  <Link href="/legal" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Legal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm text-center md:text-left">
            © 2025 Titano Cloud Corporate. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-slate-400 hover:text-cyan-400 transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-cyan-400 transition-colors">
              Términos de Servicio
            </Link>
            <Link href="/cookies" className="text-slate-400 hover:text-cyan-400 transition-colors">
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
