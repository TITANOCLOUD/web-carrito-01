export default function PBXManagementPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestión de PBX Virtual</h1>
          <p className="text-slate-400 mt-1">Administra tu central telefónica en la nube</p>
        </div>
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors">
          + Nueva Extensión
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-cyan-400 text-sm font-medium">Extensiones Totales</div>
          <div className="text-3xl font-bold text-white mt-2">147</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-cyan-400 text-sm font-medium">Activas Ahora</div>
          <div className="text-3xl font-bold text-white mt-2">89</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-cyan-400 text-sm font-medium">Llamadas Hoy</div>
          <div className="text-3xl font-bold text-white mt-2">1,234</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-cyan-400 text-sm font-medium">Tiempo Promedio</div>
          <div className="text-3xl font-bold text-white mt-2">4:32</div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg border border-slate-700">
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Extensiones Configuradas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Extensión</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Usuario</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Departamento</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Estado</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Llamadas Hoy</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {[
                { ext: "100", usuario: "Juan Pérez", dept: "Soporte", estado: "Disponible", llamadas: 23 },
                { ext: "101", usuario: "María García", dept: "Ventas", estado: "En llamada", llamadas: 34 },
                { ext: "102", usuario: "Carlos López", dept: "Soporte", estado: "No disponible", llamadas: 12 },
              ].map((ext, idx) => (
                <tr key={idx} className="hover:bg-slate-700/50">
                  <td className="px-4 py-3 text-sm text-white font-medium">{ext.ext}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{ext.usuario}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{ext.dept}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        ext.estado === "Disponible"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : ext.estado === "En llamada"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}
                    >
                      {ext.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-300">{ext.llamadas}</td>
                  <td className="px-4 py-3">
                    <button className="text-cyan-400 hover:text-cyan-300 text-sm">Editar</button>
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
