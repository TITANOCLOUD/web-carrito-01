export default function ComputePage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Compute Services</h1>
        <p className="text-slate-400">Servicios de computación en la nube escalables y flexibles</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-500 transition-colors">
          <h3 className="text-xl font-semibold text-white mb-2">Virtual Machines</h3>
          <p className="text-slate-400 mb-4">Instancias de computación escalables</p>
          <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition-colors">
            Crear VM
          </button>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-500 transition-colors">
          <h3 className="text-xl font-semibold text-white mb-2">GPU Instances</h3>
          <p className="text-slate-400 mb-4">Instancias con aceleración GPU</p>
          <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition-colors">
            Ver Opciones
          </button>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-500 transition-colors">
          <h3 className="text-xl font-semibold text-white mb-2">Bare Metal</h3>
          <p className="text-slate-400 mb-4">Servidores dedicados de alto rendimiento</p>
          <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition-colors">
            Explorar
          </button>
        </div>
      </div>
    </div>
  )
}
