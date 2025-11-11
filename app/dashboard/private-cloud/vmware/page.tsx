export default function VMwarePage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">VMware on SATURNO Cloud</h1>
        <p className="text-slate-400">Infraestructura VMware gestionada en la nube</p>
      </div>

      <div className="grid gap-6">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4">Características Principales</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-cyan-400 font-semibold mb-2">vSphere</h4>
              <p className="text-slate-300">Virtualización de servidores de nivel empresarial</p>
            </div>
            <div>
              <h4 className="text-cyan-400 font-semibold mb-2">vCenter</h4>
              <p className="text-slate-300">Gestión centralizada de infraestructura</p>
            </div>
            <div>
              <h4 className="text-cyan-400 font-semibold mb-2">NSX</h4>
              <p className="text-slate-300">Virtualización de red y seguridad</p>
            </div>
            <div>
              <h4 className="text-cyan-400 font-semibold mb-2">vSAN</h4>
              <p className="text-slate-300">Almacenamiento hiperconvergente</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4">Configuraciones Disponibles</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">Starter Pack</p>
                <p className="text-sm text-slate-400">3 Hosts ESXi + vCenter</p>
              </div>
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition-colors">
                Consultar Precio
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">Business Pack</p>
                <p className="text-sm text-slate-400">6 Hosts ESXi + vCenter + NSX</p>
              </div>
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition-colors">
                Consultar Precio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
