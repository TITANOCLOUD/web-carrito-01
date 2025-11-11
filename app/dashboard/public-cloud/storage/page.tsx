export default function StoragePage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Storage Services</h1>
        <p className="text-slate-400">Soluciones de almacenamiento escalables y seguras</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-500 transition-colors">
          <h3 className="text-xl font-semibold text-white mb-2">Object Storage</h3>
          <p className="text-slate-400 mb-4">Almacenamiento de objetos S3-compatible</p>
          <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition-colors">
            Crear Bucket
          </button>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-500 transition-colors">
          <h3 className="text-xl font-semibold text-white mb-2">Block Storage</h3>
          <p className="text-slate-400 mb-4">Volúmenes de almacenamiento en bloque</p>
          <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition-colors">
            Crear Volumen
          </button>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-500 transition-colors">
          <h3 className="text-xl font-semibold text-white mb-2">NAS Storage</h3>
          <p className="text-slate-400 mb-4">Almacenamiento compartido en red</p>
          <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition-colors">
            Configurar NAS
          </button>
        </div>
      </div>
    </div>
  )
}
