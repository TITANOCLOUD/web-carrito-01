export default function AssetsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestión de Activos</h1>
          <p className="text-slate-400 mt-1">Inventario completo de equipos y recursos</p>
        </div>
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors">
          + Nuevo Activo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-cyan-400 text-sm font-medium">Total Activos</div>
          <div className="text-3xl font-bold text-white mt-2">1,247</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-cyan-400 text-sm font-medium">En Uso</div>
          <div className="text-3xl font-bold text-white mt-2">892</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-cyan-400 text-sm font-medium">En Stock</div>
          <div className="text-3xl font-bold text-white mt-2">245</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-cyan-400 text-sm font-medium">Mantenimiento</div>
          <div className="text-3xl font-bold text-white mt-2">110</div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg border border-slate-700">
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Listado de Activos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Tipo</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Nombre</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Modelo</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Serial</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Ubicación</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Estado</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {[
                {
                  tipo: "Servidor",
                  nombre: "SRV-WEB-01",
                  modelo: "Dell PowerEdge R740",
                  serial: "SN12345",
                  ubicacion: "Datacenter A",
                  estado: "En Uso",
                },
                {
                  tipo: "Switch",
                  nombre: "SW-CORE-01",
                  modelo: "Cisco Catalyst 9300",
                  serial: "SN67890",
                  ubicacion: "Rack 15",
                  estado: "En Uso",
                },
                {
                  tipo: "Firewall",
                  nombre: "FW-EDGE-01",
                  modelo: "Fortinet FortiGate 200F",
                  serial: "SN11223",
                  ubicacion: "Perimetro",
                  estado: "En Uso",
                },
              ].map((asset, idx) => (
                <tr key={idx} className="hover:bg-slate-700/50">
                  <td className="px-4 py-3 text-sm text-slate-300">{asset.tipo}</td>
                  <td className="px-4 py-3 text-sm text-white font-medium">{asset.nombre}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{asset.modelo}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{asset.serial}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{asset.ubicacion}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                      {asset.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-cyan-400 hover:text-cyan-300 text-sm">Ver detalles</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
