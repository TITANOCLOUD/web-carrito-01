export default function PBXVirtualPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">PBX Virtual en la Nube</h1>
          <p className="text-xl text-slate-300 mb-12">
            Centralita telefónica empresarial sin hardware, lista para usar en minutos
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Básico</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cyan-400">$15</span>
                <span className="text-slate-400">/usuario/mes</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Extensiones ilimitadas</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Transferencia de llamadas</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Buzón de voz</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Música en espera</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>App móvil incluida</span>
                </li>
              </ul>
              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-colors">
                Contratar
              </button>
            </div>

            <div className="bg-[#0f1419] border-2 border-cyan-500 rounded-lg p-6 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-4 py-1 rounded-full text-sm">
                Recomendado
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Professional</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cyan-400">$25</span>
                <span className="text-slate-400">/usuario/mes</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Todo lo de Básico +</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>IVR personalizable</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Grabación de llamadas</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Conferencias hasta 50 personas</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Integración con CRM</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Reportes detallados</span>
                </li>
              </ul>
              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-colors">
                Contratar
              </button>
            </div>

            <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cyan-400">$45</span>
                <span className="text-slate-400">/usuario/mes</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Todo lo de Professional +</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>SLA 99.99%</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Soporte dedicado 24/7</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Múltiples localizaciones</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Numeración DID global</span>
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
            <h2 className="text-3xl font-bold text-white mb-6">Beneficios de PBX en la Nube</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Cero inversión en hardware</h3>
                <p className="text-slate-300">
                  No necesitas servidores ni equipos costosos. Todo funciona desde la nube con alta disponibilidad.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Escalabilidad instantánea</h3>
                <p className="text-slate-300">
                  Agrega o reduce extensiones en segundos sin configuraciones complejas ni tiempo de espera.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Trabajo remoto</h3>
                <p className="text-slate-300">
                  Tus empleados pueden atender llamadas desde cualquier lugar con la app móvil o softphone.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Ahorro de costos</h3>
                <p className="text-slate-300">
                  Reduce hasta 60% en costos telefónicos con llamadas entre extensiones gratis y tarifas competitivas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
