export default function AIConfigPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Configuración de IA</h1>
          <p className="text-slate-400 mt-1">Ajusta el comportamiento del asistente inteligente</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-cyan-400 text-sm font-medium">Tickets Analizados</div>
          <div className="text-3xl font-bold text-white mt-2">2,456</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-cyan-400 text-sm font-medium">Sugerencias Útiles</div>
          <div className="text-3xl font-bold text-white mt-2">87%</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-cyan-400 text-sm font-medium">Tiempo Ahorrado</div>
          <div className="text-3xl font-bold text-white mt-2">124h</div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Modelo de IA</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Seleccionar Modelo</label>
            <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white">
              <option>GPT-4 Turbo (Recomendado)</option>
              <option>GPT-4</option>
              <option>Claude 3 Opus</option>
              <option>Llama 3 70B</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Temperatura (Creatividad)</label>
            <input type="range" min="0" max="100" defaultValue="70" className="w-full" />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Preciso</span>
              <span>Creativo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Funcionalidades de IA</h2>
        <div className="space-y-3">
          {[
            { nombre: "Análisis automático de tickets", desc: "Analiza y categoriza tickets nuevos", activo: true },
            {
              nombre: "Sugerencias de solución",
              desc: "Busca en la base de conocimientos y sugiere artículos",
              activo: true,
            },
            { nombre: "Asignación inteligente", desc: "Asigna tickets al técnico más adecuado", activo: true },
            { nombre: "Detección de duplicados", desc: "Identifica tickets similares o duplicados", activo: false },
            { nombre: "Predicción de tiempo", desc: "Estima tiempo de resolución basado en histórico", activo: true },
            { nombre: "Respuestas automáticas", desc: "Genera borradores de respuesta", activo: false },
          ].map((func, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
              <div className="flex-1">
                <div className="text-white font-medium">{func.nombre}</div>
                <div className="text-slate-400 text-sm">{func.desc}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={func.activo} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Entrenamiento Personalizado</h2>
        <p className="text-slate-400 text-sm mb-4">
          Sube documentos para entrenar la IA con información específica de tu empresa
        </p>
        <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-cyan-500/50 transition-colors cursor-pointer">
          <div className="text-slate-400 mb-2">Arrastra archivos aquí o haz clic para seleccionar</div>
          <div className="text-slate-500 text-sm">PDF, DOCX, TXT (Máx. 10MB)</div>
        </div>
      </div>
    </div>
  )
}
