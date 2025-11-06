import Link from "next/link"
import { Logo } from "@/components/logo"
import { Server, Cloud, Globe, Mail, Phone, MapPin, Activity } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-[#1a1f2e] bg-[#0a0e1a] py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <Logo variant="minimal" className="h-16 mb-4" />
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Diseñada para empresas que exigen escalabilidad, rendimiento y control total. En Titanocloud desarrollamos
              una infraestructura cloud de alto rendimiento que combina potencia, estabilidad y flexibilidad para
              entornos empresariales modernos. Nuestra plataforma está optimizada para cargas críticas, escalamiento
              dinámico y una gestión eficiente de recursos, ofreciendo una base tecnológica sólida que impulsa la
              innovación y la continuidad operativa. Titanocloud no solo aloja tus sistemas: los acelera, los protege y
              los hace evolucionar con tecnología de nueva generación.
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
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Soluciones */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Cloud className="w-4 h-4 text-cyan-400" />
              Soluciones
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/soluciones" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Todas las Soluciones
                </Link>
              </li>
              <li>
                <Link href="/solutions/kubernetes" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Kubernetes
                </Link>
              </li>
              <li>
                <Link href="/solutions/ai-ml" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/solutions/big-data" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Big Data & Analytics
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

        <div className="border-t border-[#1a1f2e] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
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
