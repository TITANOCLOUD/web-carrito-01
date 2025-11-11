export default function SMSManagementPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">SMS & WhatsApp API</h1>
          <p className="text-slate-400 mt-1">Envía mensajes masivos y automatiza comunicaciones</p>
        </div>
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors">
          + Nueva Campaña
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-cyan-400 text-sm font-medium">SMS Enviados Hoy</div>
          <div className="text-3xl font-bold text-white mt-2">3,456</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-cyan-400 text-sm font-medium">Tasa de Entrega</div>
          <div className="text-3xl font-bold text-white mt-2">98.7%</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-cyan-400 text-sm font-medium">WhatsApp Activos</div>
          <div className="text-3xl font-bold text-white mt-2">2,134</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-cyan-400 text-sm font-medium">Créditos Restantes</div>
          <div className="text-3xl font-bold text-white mt-2">45,678</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Envío Rápido SMS</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Números Destino</label>
              <textarea
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white h-24"
                placeholder="+584241234567, +584129876543, ..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Mensaje</label>
              <textarea
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white h-32"
                placeholder="Escribe tu mensaje aquí..."
              />
              <div className="text-slate-400 text-xs mt-1">160 caracteres disponibles</div>
            </div>
            <button className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors">
              Enviar SMS
            </button>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">WhatsApp Business API</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400 font-bold">W</span>
                </div>
                <div>
                  <div className="text-white font-medium">+58 424 123 4567</div>
                  <div className="text-slate-400 text-sm">Cuenta principal</div>
                </div>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                Verificada
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-300">Plantillas Aprobadas</div>
              {[
                { nombre: "Bienvenida Cliente", status: "Aprobada" },
                { nombre: "Recordatorio Pago", status: "Aprobada" },
                { nombre: "Confirmación Servicio", status: "Pendiente" },
              ].map((tmpl, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-slate-900/50 rounded text-sm">
                  <span className="text-slate-300">{tmpl.nombre}</span>
                  <span
                    className={`px-2 py-0.5 text-xs rounded ${
                      tmpl.status === "Aprobada" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {tmpl.status}
                  </span>
                </div>
              ))}
            </div>

            <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              Enviar por WhatsApp
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg border border-slate-700">
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Campañas Recientes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Campaña</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Tipo</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Enviados</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Entregados</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Fecha</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {[
                {
                  nombre: "Promoción Navidad",
                  tipo: "SMS",
                  enviados: 5000,
                  entregados: 4935,
                  fecha: "2024-12-15",
                  estado: "Completada",
                },
                {
                  nombre: "Recordatorio Mantenimiento",
                  tipo: "WhatsApp",
                  enviados: 1200,
                  entregados: 1180,
                  fecha: "2024-12-14",
                  estado: "Completada",
                },
                {
                  nombre: "Nueva Función",
                  tipo: "SMS",
                  enviados: 3000,
                  entregados: 2856,
                  fecha: "2024-12-13",
                  estado: "En progreso",
                },
              ].map((camp, idx) => (
                <tr key={idx} className="hover:bg-slate-700/50">
                  <td className="px-4 py-3 text-sm text-white font-medium">{camp.nombre}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{camp.tipo}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{camp.enviados.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{camp.entregados.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{camp.fecha}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        camp.estado === "Completada"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      }`}
                    >
                      {camp.estado}
                    </span>
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
