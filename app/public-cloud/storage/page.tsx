"use client"

import { useState } from "react"
import { Calculator, TrendingDown, CheckCircle } from "lucide-react"

export default function StoragePage() {
  const [storageGB, setStorageGB] = useState(1000)
  const [transferGB, setTransferGB] = useState(500)

  // Precios mensuales por GB
  const pricing = {
    titano: { storage: 0.02, transfer: 0.05, name: "Titano Cloud" },
    aws: { storage: 0.023, transfer: 0.09, name: "AWS S3" },
    azure: { storage: 0.0208, transfer: 0.087, name: "Azure Blob" },
    gcp: { storage: 0.02, transfer: 0.12, name: "Google Cloud" },
  }

  const calculateCost = (provider: keyof typeof pricing) => {
    const p = pricing[provider]
    return (storageGB * p.storage + transferGB * p.transfer).toFixed(2)
  }

  const titanoCost = Number.parseFloat(calculateCost("titano"))
  const savings = {
    aws: (
      ((Number.parseFloat(calculateCost("aws")) - titanoCost) / Number.parseFloat(calculateCost("aws"))) *
      100
    ).toFixed(0),
    azure: (
      ((Number.parseFloat(calculateCost("azure")) - titanoCost) / Number.parseFloat(calculateCost("azure"))) *
      100
    ).toFixed(0),
    gcp: (
      ((Number.parseFloat(calculateCost("gcp")) - titanoCost) / Number.parseFloat(calculateCost("gcp"))) *
      100
    ).toFixed(0),
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#0f1419] to-[#0a0e1a]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6 text-balance">Cloud Storage</h1>
          <p className="text-xl text-slate-300 mb-12 text-pretty">
            Almacenamiento escalable, seguro y de alto rendimiento para todas sus necesidades
          </p>

          {/* Calculadora de comparación de precios */}
          <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0f1419] border border-cyan-500/30 rounded-xl p-8 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-8 h-8 text-cyan-400" />
              <h2 className="text-3xl font-bold text-white">Calculadora de Comparación</h2>
            </div>

            <p className="text-slate-300 mb-8">
              Compare el costo de almacenamiento entre Titano Cloud y otros proveedores líderes
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-white font-semibold mb-3">Almacenamiento (GB)</label>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={storageGB}
                  onChange={(e) => setStorageGB(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-slate-400 text-sm">100 GB</span>
                  <span className="text-cyan-400 text-lg font-bold">{storageGB} GB</span>
                  <span className="text-slate-400 text-sm">10 TB</span>
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">Transferencia de Datos (GB/mes)</label>
                <input
                  type="range"
                  min="50"
                  max="5000"
                  step="50"
                  value={transferGB}
                  onChange={(e) => setTransferGB(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-slate-400 text-sm">50 GB</span>
                  <span className="text-cyan-400 text-lg font-bold">{transferGB} GB</span>
                  <span className="text-slate-400 text-sm">5 TB</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {/* Titano Cloud - Destacado */}
              <div className="bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg p-6 border-2 border-cyan-400 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  MEJOR PRECIO
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Titano Cloud</h3>
                <div className="text-4xl font-bold text-white mb-4">
                  ${calculateCost("titano")}
                  <span className="text-sm text-cyan-100">/mes</span>
                </div>
                <div className="space-y-2 text-white/90 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>${pricing.titano.storage}/GB almacenamiento</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>${pricing.titano.transfer}/GB transferencia</span>
                  </div>
                </div>
              </div>

              {/* AWS S3 */}
              <div className="bg-[#1a1f2e] border border-slate-700 rounded-lg p-6">
                <h3 className="text-slate-300 font-bold text-lg mb-2">AWS S3</h3>
                <div className="text-3xl font-bold text-slate-300 mb-4">
                  ${calculateCost("aws")}
                  <span className="text-sm text-slate-400">/mes</span>
                </div>
                <div className="flex items-center gap-2 text-red-400 text-sm font-semibold mb-3">
                  <TrendingDown className="w-4 h-4" />
                  <span>+{savings.aws}% más caro</span>
                </div>
                <div className="space-y-1 text-slate-400 text-sm">
                  <div>${pricing.aws.storage}/GB almacenamiento</div>
                  <div>${pricing.aws.transfer}/GB transferencia</div>
                </div>
              </div>

              {/* Azure Blob */}
              <div className="bg-[#1a1f2e] border border-slate-700 rounded-lg p-6">
                <h3 className="text-slate-300 font-bold text-lg mb-2">Azure Blob</h3>
                <div className="text-3xl font-bold text-slate-300 mb-4">
                  ${calculateCost("azure")}
                  <span className="text-sm text-slate-400">/mes</span>
                </div>
                <div className="flex items-center gap-2 text-red-400 text-sm font-semibold mb-3">
                  <TrendingDown className="w-4 h-4" />
                  <span>+{savings.azure}% más caro</span>
                </div>
                <div className="space-y-1 text-slate-400 text-sm">
                  <div>${pricing.azure.storage}/GB almacenamiento</div>
                  <div>${pricing.azure.transfer}/GB transferencia</div>
                </div>
              </div>

              {/* Google Cloud */}
              <div className="bg-[#1a1f2e] border border-slate-700 rounded-lg p-6">
                <h3 className="text-slate-300 font-bold text-lg mb-2">Google Cloud</h3>
                <div className="text-3xl font-bold text-slate-300 mb-4">
                  ${calculateCost("gcp")}
                  <span className="text-sm text-slate-400">/mes</span>
                </div>
                <div className="flex items-center gap-2 text-red-400 text-sm font-semibold mb-3">
                  <TrendingDown className="w-4 h-4" />
                  <span>+{savings.gcp}% más caro</span>
                </div>
                <div className="space-y-1 text-slate-400 text-sm">
                  <div>${pricing.gcp.storage}/GB almacenamiento</div>
                  <div>${pricing.gcp.transfer}/GB transferencia</div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-cyan-950/30 border border-cyan-500/30 rounded-lg p-4">
              <p className="text-cyan-400 font-semibold">
                💰 Ahorro estimado con Titano Cloud: hasta $
                {(Number.parseFloat(calculateCost("gcp")) - titanoCost).toFixed(2)}
                /mes vs el proveedor más caro
              </p>
            </div>
          </div>

          {/* Storage Types */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500 transition-all">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Object Storage</h3>
              <p className="text-slate-300 mb-4">Compatible S3, ideal para backups, archivos estáticos y data lakes</p>
              <ul className="text-slate-400 space-y-2 text-sm mb-4">
                <li>• API S3 compatible</li>
                <li>• 99.999999999% durabilidad</li>
                <li>• Versionado de objetos</li>
                <li>• Cifrado en reposo y tránsito</li>
              </ul>
              <p className="text-2xl font-bold text-cyan-400">
                $0.02<span className="text-sm text-slate-400">/GB/mes</span>
              </p>
            </div>

            <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500 transition-all">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Block Storage</h3>
              <p className="text-slate-300 mb-4">Volúmenes SSD de alto rendimiento para instancias cloud</p>
              <ul className="text-slate-400 space-y-2 text-sm mb-4">
                <li>• SSD NVMe</li>
                <li>• Hasta 100,000 IOPS</li>
                <li>• Snapshots incrementales</li>
                <li>• Redimensionable en caliente</li>
              </ul>
              <p className="text-2xl font-bold text-cyan-400">
                $0.10<span className="text-sm text-slate-400">/GB/mes</span>
              </p>
            </div>

            <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500 transition-all">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Archive Storage</h3>
              <p className="text-slate-300 mb-4">Almacenamiento de bajo costo para archivos a largo plazo</p>
              <ul className="text-slate-400 space-y-2 text-sm mb-4">
                <li>• Retención ilimitada</li>
                <li>• Recuperación en horas</li>
                <li>• Políticas de ciclo de vida</li>
                <li>• Cumplimiento regulatorio</li>
              </ul>
              <p className="text-2xl font-bold text-cyan-400">
                $0.005<span className="text-sm text-slate-400">/GB/mes</span>
              </p>
            </div>
          </div>

          {/* Casos de Uso */}
          <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Casos de Uso</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">Hosting de Sitios Web</h4>
                <p className="text-slate-400 text-sm">
                  Sirva contenido estático con baja latencia desde nuestro CDN global
                </p>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">Backups y Recuperación</h4>
                <p className="text-slate-400 text-sm">
                  Proteja sus datos críticos con backups automáticos y versioning
                </p>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">Big Data & Analytics</h4>
                <p className="text-slate-400 text-sm">
                  Almacene y analice petabytes de datos con herramientas integradas
                </p>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">Distribución de Contenido</h4>
                <p className="text-slate-400 text-sm">
                  Entregue archivos multimedia a usuarios globales con alta velocidad
                </p>
              </div>
            </div>
          </div>

          {/* Primeros 25 GB Gratis Cada Mes */}
          <div className="bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-500 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Primeros 25 GB Gratis Cada Mes</h2>
            <p className="text-slate-300 mb-6">
              Comience a usar Object Storage sin costo, incluido en todos los planes
            </p>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Crear Bucket Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
