export default function IVRPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">Sistema IVR Inteligente</h1>
          <p className="text-xl text-slate-300 mb-12">
            Automatiza la atención al cliente con respuestas de voz interactivas y enrutamiento inteligente
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-6">IVR Básico</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cyan-400">$49</span>
                <span className="text-slate-400">/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Hasta 3 niveles de menú</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>10 opciones configurables</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Voces pregrabadas en español</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Horarios de atención</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Estadísticas básicas</span>
                </li>
              </ul>
              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-colors">
                Contratar
              </button>
            </div>

            <div className="bg-[#0f1419] border-2 border-cyan-500 rounded-lg p-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-4 py-1 rounded-full text-sm">
                Recomendado
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">IVR Avanzado con IA</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cyan-400">$149</span>
                <span className="text-slate-400">/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Niveles ilimitados</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Reconocimiento de voz natural (NLP)</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Text-to-Speech con voces IA</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Enrutamiento inteligente por CRM</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Análisis de sentimiento</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Integración con chatbots</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Reportes avanzados en tiempo real</span>
                </li>
              </ul>
              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-colors">
                Contratar
              </button>
            </div>
          </div>

          <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Casos de uso</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Atención al cliente</h3>
                <p className="text-slate-300">
                  Responde preguntas frecuentes, direcciona a departamentos y reduce tiempo de espera
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Encuestas automáticas</h3>
                <p className="text-slate-300">
                  Recopila feedback de clientes post-llamada con análisis automático de resultados
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Cobranza inteligente</h3>
                <p className="text-slate-300">Automatiza recordatorios de pago con opciones de pago por teléfono</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
