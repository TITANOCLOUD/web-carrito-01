import Link from "next/link"
import { Logo } from "@/components/logo"
import { Server, Cloud, Globe, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Logo variant="minimal" className="h-16 mb-4" />
            <p className="text-slate-400 text-sm mb-4">
              Infraestructura cloud de nueva generación para empresas que buscan escalabilidad y rendimiento.
            </p>
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Global Data Centers</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>+1 (555) 123-4567</span>
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
              Products
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
                <Link href="/public-cloud" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Public Cloud
                </Link>
              </li>
              <li>
                <Link href="/private-cloud" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Private Cloud
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Cloud className="w-4 h-4 text-cyan-400" />
              Solutions
            </h3>
            <ul className="space-y-2 text-sm">
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
              <li>
                <Link href="/solutions/gaming" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Gaming Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/solutions/sap" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  SAP HANA
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/ecosystem" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Ecosystem
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Careers
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

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm text-center md:text-left">
            © 2025 Titano Cloud Corporate. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-slate-400 hover:text-cyan-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-cyan-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-slate-400 hover:text-cyan-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
