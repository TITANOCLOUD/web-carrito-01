export default function VPSPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">VPS - Servidores Virtuales Privados</h1>
        <p className="text-slate-400">Servidores virtuales con recursos dedicados y control total</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-500 transition-colors">
          <h3 className="text-xl font-semibold text-white mb-2">VPS Starter</h3>
          <p className="text-3xl font-bold text-cyan-400 mb-4">
            $19.99<span className="text-sm text-slate-400">/mes</span>
          </p>
          <ul className="space-y-2 text-slate-300 mb-6">
            <li>✓ 2 vCPU</li>
            <li>✓ 4 GB RAM</li>
            <li>✓ 80 GB SSD</li>
            <li>✓ 2 TB Transferencia</li>
          </ul>
          <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition-colors">
            Contratar
          </button>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border-2 border-cyan-500">
          <div className="bg-cyan-600 text-white text-xs font-semibold px-2 py-1 rounded inline-block mb-2">
            POPULAR
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">VPS Business</h3>
          <p className="text-3xl font-bold text-cyan-400 mb-4">
            $39.99<span className="text-sm text-slate-400">/mes</span>
          </p>
          <ul className="space-y-2 text-slate-300 mb-6">
            <li>✓ 4 vCPU</li>
            <li>✓ 8 GB RAM</li>
            <li>✓ 160 GB SSD</li>
            <li>✓ 4 TB Transferencia</li>
          </ul>
          <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition-colors">
            Contratar
          </button>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-500 transition-colors">
          <h3 className="text-xl font-semibold text-white mb-2">VPS Enterprise</h3>
          <p className="text-3xl font-bold text-cyan-400 mb-4">
            $79.99<span className="text-sm text-slate-400">/mes</span>
          </p>
          <ul className="space-y-2 text-slate-300 mb-6">
            <li>✓ 8 vCPU</li>
            <li>✓ 16 GB RAM</li>
            <li>✓ 320 GB SSD</li>
            <li>✓ 8 TB Transferencia</li>
          </ul>
          <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition-colors">
            Contratar
          </button>
        </div>
      </div>
    </div>
  )
}
