export default function CasosExitoPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Casos de Éxito</h1>
      <div className="space-y-6">
        {/* Success case cards will be dynamically generated */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Título del Caso</h3>
              <p className="text-slate-400 text-sm">Cliente: Nombre del Cliente</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-white font-medium mb-2">Descripción</h4>
              <p className="text-slate-400">Descripción detallada del proyecto implementado...</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">Resultados</h4>
              <p className="text-slate-400">Resultados obtenidos y métricas de éxito...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
