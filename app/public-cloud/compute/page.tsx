export default function ComputePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#0f1419] to-[#0a0e1a]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6 text-balance">Public Cloud Compute</h1>
          <p className="text-xl text-slate-300 mb-12 text-pretty">
            Instancias virtuales escalables con rendimiento predecible y facturación por minuto
          </p>

          {/* Tipos de instancias */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500 transition-all">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">General Purpose</h3>
              <p className="text-slate-300 mb-4">
                Balance equilibrado de CPU, memoria y red para cargas de trabajo versátiles
              </p>
              <ul className="text-slate-400 space-y-2 text-sm">
                <li>• 1-96 vCPUs</li>
                <li>• 1-384 GB RAM</li>
                <li>• Hasta 25 Gbps red</li>
                <li>• Desde $0.04/hora</li>
              </ul>
            </div>

            <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500 transition-all">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Compute Optimized</h3>
              <p className="text-slate-300 mb-4">
                Procesadores de alto rendimiento para aplicaciones intensivas en CPU
              </p>
              <ul className="text-slate-400 space-y-2 text-sm">
                <li>• Intel Xeon Platinum</li>
                <li>• AMD EPYC</li>
                <li>• Frecuencias turbo hasta 4.0 GHz</li>
                <li>• Desde $0.06/hora</li>
              </ul>
            </div>

            <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500 transition-all">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Memory Optimized</h3>
              <p className="text-slate-300 mb-4">Alta memoria RAM para bases de datos y análisis en memoria</p>
              <ul className="text-slate-400 space-y-2 text-sm">
                <li>• Ratio 1:8 CPU:RAM</li>
                <li>• Hasta 768 GB RAM</li>
                <li>• Ideal para SAP HANA, Redis</li>
                <li>• Desde $0.08/hora</li>
              </ul>
            </div>
          </div>

          {/* Características */}
          <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Características Incluidas</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="text-white font-semibold">Facturación por Minuto</h4>
                    <p className="text-slate-400 text-sm">
                      Pague solo por el tiempo exacto de uso, sin mínimos mensuales
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="text-white font-semibold">Auto-Scaling</h4>
                    <p className="text-slate-400 text-sm">
                      Escale automáticamente según la demanda de sus aplicaciones
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="text-white font-semibold">Snapshots Automatizados</h4>
                    <p className="text-slate-400 text-sm">Backups automáticos con retención configurable</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="text-white font-semibold">Anti-DDoS Incluido</h4>
                    <p className="text-slate-400 text-sm">Protección contra ataques DDoS sin costo adicional</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="text-white font-semibold">99.99% SLA</h4>
                    <p className="text-slate-400 text-sm">
                      Garantía de disponibilidad respaldada por acuerdo de nivel de servicio
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="text-white font-semibold">API Completa</h4>
                    <p className="text-slate-400 text-sm">Gestione toda su infraestructura mediante API REST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-500 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Comience con $300 en Créditos Gratis</h2>
            <p className="text-slate-300 mb-6">Pruebe cualquier servicio de Public Cloud sin costo durante 60 días</p>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Activar Prueba Gratuita
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
