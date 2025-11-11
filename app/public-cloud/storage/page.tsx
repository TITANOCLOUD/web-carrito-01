export default function StoragePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#0f1419] to-[#0a0e1a]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6 text-balance">Cloud Storage</h1>
          <p className="text-xl text-slate-300 mb-12 text-pretty">
            Almacenamiento escalable, seguro y de alto rendimiento para todas sus necesidades
          </p>

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
