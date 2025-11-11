export default function CallCenterPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">Plataforma de Call Center</h1>
          <p className="text-xl text-slate-300 mb-12">
            Solución completa en la nube para gestionar operaciones de call center entrantes y salientes
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Startup</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cyan-400">$99</span>
                <span className="text-slate-400">/mes</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Hasta 10 agentes</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Cola de espera básica</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Distribución automática de llamadas</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Reportes básicos</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Softphone incluido</span>
                </li>
              </ul>
              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-colors">
                Contratar
              </button>
            </div>

            <div className="bg-[#0f1419] border-2 border-cyan-500 rounded-lg p-6 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-4 py-1 rounded-full text-sm">
                Más completo
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Business</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cyan-400">$299</span>
                <span className="text-slate-400">/mes</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Hasta 50 agentes</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Colas inteligentes con priorización</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Marcador predictivo</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Grabación de llamadas ilimitada</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Monitoreo en vivo de supervisores</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>CRM integrado</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Dashboards en tiempo real</span>
                </li>
              </ul>
              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-colors">
                Contratar
              </button>
            </div>

            <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cyan-400">$799</span>
                <span className="text-slate-400">/mes</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Agentes ilimitados</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Todo lo de Business +</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>IA para análisis de conversaciones</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Omnicanalidad (voz, chat, email, WhatsApp)</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>SLA 99.99%</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Soporte 24/7 dedicado</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>API personalizada</span>
                </li>
              </ul>
              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-colors">
                Contactar
              </button>
            </div>
          </div>

          <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Funcionalidades destacadas</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">ACD Inteligente</h3>
                <p className="text-slate-300 text-sm">
                  Distribución automática basada en habilidades, idioma y disponibilidad
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Whisper & Barge</h3>
                <p className="text-slate-300 text-sm">
                  Supervisores pueden escuchar o intervenir en llamadas en tiempo real
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Power Dialer</h3>
                <p className="text-slate-300 text-sm">Marcación automática masiva para campañas outbound</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Callback Inteligente</h3>
                <p className="text-slate-300 text-sm">
                  Permite a clientes solicitar devolución de llamada sin perder su lugar en la cola
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
