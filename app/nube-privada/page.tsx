"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Server, Database, Shield, Clock, Award, Zap } from "lucide-react"

export default function NubePrivadaPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#0f1419] to-[#0a0e1a]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6 text-balance">Nube Privada Alojada</h1>
            <p className="text-xl text-slate-300 mb-8 text-pretty max-w-3xl mx-auto">
              Infraestructura dedicada con control total, seguridad empresarial y soporte experto. Potencia tu negocio
              con soluciones de nube privada diseñadas para cargas de trabajo críticas.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                onClick={() => router.push("/contacto")}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Solicitar Consultoría Gratuita
              </Button>
              <Button
                onClick={() => router.push("/dashboard/setup")}
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Ver Calculadora de Precios
              </Button>
            </div>
          </div>

          {/* Soluciones principales */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div
              className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-8 hover:border-cyan-500 transition-all cursor-pointer"
              onClick={() => router.push("/nube-privada/nutanix")}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg">
                  <Server className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-2">Nutanix Cloud Platform</h3>
                  <p className="text-slate-300">
                    Infraestructura hiperconvergente con gestión simplificada y alto rendimiento
                  </p>
                </div>
              </div>
              <ul className="text-slate-400 space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <span>Clústeres Nutanix AHV completamente gestionados</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <span>Almacenamiento hiperconvergente con deduplicación</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <span>Disaster Recovery y replicación multi-sitio</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <span>Migración asistida desde VMware</span>
                </li>
              </ul>
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors w-full">
                Explorar Nutanix
              </button>
            </div>

            <div
              className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-8 hover:border-cyan-500 transition-all cursor-pointer"
              onClick={() => router.push("/nube-privada/sap-hana")}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg">
                  <Database className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-2">SAP HANA on Cloud</h3>
                  <p className="text-slate-300">Ejecute SAP HANA con certificación oficial y rendimiento optimizado</p>
                </div>
              </div>
              <ul className="text-slate-400 space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <span>Certificado SAP HANA TDI y Tailored Datacenter Integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <span>Hasta 12 TB de memoria RAM por servidor</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <span>Almacenamiento NVMe de ultra-baja latencia</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <span>Soporte experto en SAP disponible 24/7</span>
                </li>
              </ul>
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors w-full">
                Explorar SAP HANA
              </button>
            </div>
          </div>

          {/* Beneficios */}
          <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Award className="w-6 h-6 text-cyan-400" />
              Beneficios de la Nube Privada
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Shield className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h4 className="text-cyan-400 font-semibold mb-2">Control Total</h4>
                  <p className="text-slate-400 text-sm">Hardware dedicado sin compartir recursos con otros clientes</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Award className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h4 className="text-cyan-400 font-semibold mb-2">Cumplimiento Regulatorio</h4>
                  <p className="text-slate-400 text-sm">
                    Cumple con ISO 27001, SOC 2, GDPR, HIPAA y otras certificaciones
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Zap className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h4 className="text-cyan-400 font-semibold mb-2">Rendimiento Predecible</h4>
                  <p className="text-slate-400 text-sm">Sin variación de rendimiento, recursos garantizados</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Server className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h4 className="text-cyan-400 font-semibold mb-2">Redes Personalizadas</h4>
                  <p className="text-slate-400 text-sm">VLANs privadas, VPN dedicadas y conectividad directa</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Clock className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h4 className="text-cyan-400 font-semibold mb-2">Soporte Dedicado</h4>
                  <p className="text-slate-400 text-sm">Ingeniero de cuenta asignado y soporte prioritario</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Award className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h4 className="text-cyan-400 font-semibold mb-2">SLA 99.99%</h4>
                  <p className="text-slate-400 text-sm">Alta disponibilidad con infraestructura redundante</p>
                </div>
              </div>
            </div>
          </div>

          {/* Almacenamiento Enterprise */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Almacenamiento Enterprise</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div
                className="bg-[#1a1f2e] border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all cursor-pointer"
                onClick={() => router.push("/nube-privada/almacenamiento?vendor=netapp")}
              >
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">NetApp Storage</h3>
                <p className="text-slate-300 mb-4">Soluciones de almacenamiento empresarial con ONTAP</p>
                <ul className="text-slate-400 text-sm space-y-2">
                  <li>• Deduplicación y compresión inline</li>
                  <li>• Replicación síncrona y asíncrona</li>
                  <li>• Snapshots ilimitados</li>
                  <li>• Multi-protocolo (NFS, CIFS, iSCSI, FC)</li>
                </ul>
              </div>
              <div
                className="bg-[#1a1f2e] border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all cursor-pointer"
                onClick={() => router.push("/nube-privada/almacenamiento?vendor=pure")}
              >
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Pure Storage</h3>
                <p className="text-slate-300 mb-4">All-Flash arrays para máximo rendimiento</p>
                <ul className="text-slate-400 text-sm space-y-2">
                  <li>• Latencia sub-milisegundo consistente</li>
                  <li>• Reducción de datos garantizada 5:1</li>
                  <li>• Evergreen Storage (sin obsolescencia)</li>
                  <li>• ActiveCluster para HA activo-activo</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-500 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Consultoría Gratuita para su Proyecto</h2>
            <p className="text-slate-300 mb-6">
              Nuestros arquitectos cloud le ayudarán a diseñar la solución perfecta para sus necesidades específicas
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => router.push("/contacto")}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Contactar con un Experto
              </button>
              <button
                onClick={() => router.push("/dashboard/setup")}
                className="bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Calcular Costos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
