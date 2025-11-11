export default function EmailsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestión de Correos</h1>
          <p className="text-slate-400 mt-1">Integración de correos con tickets</p>
        </div>
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors">
          + Sincronizar Correos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-cyan-400 text-sm font-medium">Correos Hoy</div>
          <div className="text-3xl font-bold text-white mt-2">234</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-cyan-400 text-sm font-medium">Convertidos</div>
          <div className="text-3xl font-bold text-white mt-2">189</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-cyan-400 text-sm font-medium">Pendientes</div>
          <div className="text-3xl font-bold text-white mt-2">45</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-cyan-400 text-sm font-medium">Spam Filtrado</div>
          <div className="text-3xl font-bold text-white mt-2">67</div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg border border-slate-700">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Cuentas de Correo Configuradas</h2>
          <button className="px-3 py-1.5 bg-cyan-600/10 text-cyan-400 border border-cyan-500/20 rounded-lg text-sm hover:bg-cyan-600/20 transition-colors">
            + Agregar Cuenta
          </button>
        </div>
        <div className="p-6 space-y-4">
          {[
            { email: "soporte@saturnocloud.com", protocolo: "IMAP", estado: "Activa", ultSync: "Hace 2 min" },
            { email: "tickets@saturnocloud.com", protocolo: "POP3", estado: "Activa", ultSync: "Hace 5 min" },
            { email: "ventas@saturnocloud.com", protocolo: "IMAP", estado: "Activa", ultSync: "Hace 1 min" },
          ].map((acc, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-cyan-600/20 rounded-lg flex items-center justify-center">
                  <span className="text-cyan-400 font-bold text-lg">@</span>
                </div>
                <div>
                  <div className="text-white font-medium">{acc.email}</div>
                  <div className="text-slate-400 text-sm">
                    {acc.protocolo} • {acc.ultSync}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                  {acc.estado}
                </span>
                <button className="text-cyan-400 hover:text-cyan-300 text-sm">Configurar</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg border border-slate-700">
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Reglas de Conversión</h2>
        </div>
        <div className="p-6 space-y-3">
          {[
            { regla: 'Crear ticket automático para correos con asunto "URGENTE"', prioridad: "Alta" },
            { regla: 'Asignar a equipo técnico si contiene palabra "servidor"', prioridad: "Media" },
            { regla: "Clasificar como consulta si viene de ventas@", prioridad: "Baja" },
          ].map((rule, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
              <div className="flex-1">
                <div className="text-white text-sm">{rule.regla}</div>
                <div className="text-slate-400 text-xs mt-1">Prioridad: {rule.prioridad}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-cyan-400 hover:text-cyan-300 text-sm">Editar</button>
                <button className="text-red-400 hover:text-red-300 text-sm">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
