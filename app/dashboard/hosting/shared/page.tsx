export default function SharedHostingPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Hosting Compartido</h1>
        <p className="text-slate-400">Planes de hosting optimizados para sitios web</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-500 transition-colors">
          <h3 className="text-xl font-semibold text-white mb-2">Plan Básico</h3>
          <p className="text-3xl font-bold text-cyan-400 mb-4">
            $4.99<span className="text-sm text-slate-400">/mes</span>
          </p>
          <ul className="space-y-2 text-slate-300 mb-6">
            <li>✓ 10 GB SSD Storage</li>
            <li>✓ 1 Sitio Web</li>
            <li>✓ SSL Gratis</li>
            <li>✓ Soporte 24/7</li>
          </ul>
          <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition-colors">
            Contratar
          </button>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border-2 border-cyan-500">
          <div className="bg-cyan-600 text-white text-xs font-semibold px-2 py-1 rounded inline-block mb-2">
            RECOMENDADO
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Plan Profesional</h3>
          <p className="text-3xl font-bold text-cyan-400 mb-4">
            $9.99<span className="text-sm text-slate-400">/mes</span>
          </p>
          <ul className="space-y-2 text-slate-300 mb-6">
            <li>✓ 50 GB SSD Storage</li>
            <li>✓ Sitios Ilimitados</li>
            <li>✓ SSL Gratis</li>
            <li>✓ Soporte Prioritario</li>
          </ul>
          <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition-colors">
            Contratar
          </button>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-500 transition-colors">
          <h3 className="text-xl font-semibold text-white mb-2">Plan Empresarial</h3>
          <p className="text-3xl font-bold text-cyan-400 mb-4">
            $19.99<span className="text-sm text-slate-400">/mes</span>
          </p>
          <ul className="space-y-2 text-slate-300 mb-6">
            <li>✓ 100 GB SSD Storage</li>
            <li>✓ Sitios Ilimitados</li>
            <li>✓ SSL Premium</li>
            <li>✓ Soporte Dedicado</li>
          </ul>
          <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition-colors">
            Contratar
          </button>
        </div>
      </div>
    </div>
  )
}
