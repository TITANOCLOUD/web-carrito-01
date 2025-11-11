export default function AlmacenamientoPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-4">Almacenamiento y Backup Enterprise</h1>
        <p className="text-slate-300 text-lg mb-8">
          Soluciones de almacenamiento de alto rendimiento con NetApp, Pure Storage y Dell EMC
        </p>

        {/* Soluciones */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">NetApp</h3>
            <p className="text-slate-300 text-sm mb-4">
              Almacenamiento unificado con deduplicación y compresión avanzada
            </p>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• ONTAP para gestión unificada</li>
              <li>• SnapMirror para replicación</li>
              <li>• FlexClone para clonación instantánea</li>
              <li>• Cloud Backup integrado</li>
            </ul>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Pure Storage</h3>
            <p className="text-slate-300 text-sm mb-4">All-flash arrays con garantía de rendimiento y disponibilidad</p>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• FlashArray//X para misión crítica</li>
              <li>• ActiveCluster para HA</li>
              <li>• SafeMode para ransomware</li>
              <li>• Cloud Block Store</li>
            </ul>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Dell EMC</h3>
            <p className="text-slate-300 text-sm mb-4">PowerStore y Unity para workloads enterprise modernos</p>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• PowerStore con NVMe</li>
              <li>• Unity XT para consolidación</li>
              <li>• VPLEX para movilidad</li>
              <li>• Data Domain para backup</li>
            </ul>
          </div>
        </div>

        {/* Servicios de Backup */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Soluciones de Backup</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Veeam Backup & Replication</h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>✓ Backup incremental forever</li>
                <li>✓ Instant VM Recovery</li>
                <li>✓ Replicación para DR</li>
                <li>✓ Cloud Connect integrado</li>
                <li>✓ Backup para Microsoft 365</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Commvault Complete Backup</h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>✓ Protección unificada</li>
                <li>✓ Deduplicación global</li>
                <li>✓ Metallic SaaS backup</li>
                <li>✓ Disaster Recovery Orchestration</li>
                <li>✓ Compliance y eDiscovery</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Planes */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Planes de Almacenamiento</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Performance</h3>
              <p className="text-3xl font-bold text-cyan-400 mb-4">
                $0.25<span className="text-sm text-slate-400">/GB/mes</span>
              </p>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• All-Flash NVMe</li>
                <li>• 99.999% uptime SLA</li>
                <li>• {"<1ms"} latencia</li>
                <li>• Snapshots ilimitados</li>
              </ul>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Balanced</h3>
              <p className="text-3xl font-bold text-cyan-400 mb-4">
                $0.15<span className="text-sm text-slate-400">/GB/mes</span>
              </p>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• Hybrid Flash</li>
                <li>• 99.99% uptime SLA</li>
                <li>• {"<5ms"} latencia</li>
                <li>• Tiering automático</li>
              </ul>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Archive</h3>
              <p className="text-3xl font-bold text-cyan-400 mb-4">
                $0.05<span className="text-sm text-slate-400">/GB/mes</span>
              </p>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• Object Storage</li>
                <li>• 99.9% uptime SLA</li>
                <li>• Compliance garantizado</li>
                <li>• Retención ilimitada</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Proteja sus datos críticos</h2>
          <p className="text-white/90 mb-6">Consulte con nuestros especialistas en almacenamiento</p>
          <button className="bg-white text-cyan-600 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition">
            Solicitar Cotización
          </button>
        </div>
      </div>
    </div>
  )
}
