export default function TroncalesSIPPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">Troncales SIP</h1>
          <p className="text-xl text-slate-300 mb-12">
            Conectividad de voz empresarial con calidad garantizada y escalabilidad ilimitada
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Basic</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cyan-400">$29</span>
                <span className="text-slate-400">/mes</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>10 canales concurrentes</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>1000 minutos incluidos</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Soporte 24/7</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Panel de administración</span>
                </li>
              </ul>
              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-colors">
                Contratar
              </button>
            </div>

            <div className="bg-[#0f1419] border-2 border-cyan-500 rounded-lg p-6 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-4 py-1 rounded-full text-sm">
                Más popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Professional</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cyan-400">$79</span>
                <span className="text-slate-400">/mes</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>50 canales concurrentes</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>5000 minutos incluidos</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>SLA 99.9%</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Números locales incluidos</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Reportes avanzados</span>
                </li>
              </ul>
              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-colors">
                Contratar
              </button>
            </div>

            <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cyan-400">$199</span>
                <span className="text-slate-400">/mes</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Canales ilimitados</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Minutos ilimitados</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>SLA 99.99%</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Números globales</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Integración API completa</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Soporte dedicado</span>
                </li>
              </ul>
              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-colors">
                Contratar
              </button>
            </div>
          </div>

          <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Características incluidas</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Calidad de servicio</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• Codec G.711, G.729 y Opus</li>
                  <li>• QoS prioritario</li>
                  <li>• Redundancia geográfica</li>
                  <li>• Failover automático</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Funcionalidades</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• Transferencia de llamadas</li>
                  <li>• Conferencias multipartitas</li>
                  <li>• Grabación de llamadas</li>
                  <li>• IVR personalizable</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Seguridad</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• Encriptación TLS/SRTP</li>
                  <li>• Autenticación por IP</li>
                  <li>• Firewall SIP integrado</li>
                  <li>• Detección de fraude</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Integraciones</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• API REST completa</li>
                  <li>• Webhooks en tiempo real</li>
                  <li>• Integración con CRM</li>
                  <li>• SDK para desarrolladores</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
