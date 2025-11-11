export default function KnowledgeBasePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Base de Conocimientos</h1>
          <p className="text-slate-400 mt-1">Documentación y soluciones comunes</p>
        </div>
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors">
          + Nuevo Artículo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-cyan-400 text-sm font-medium">Total Artículos</div>
          <div className="text-3xl font-bold text-white mt-2">387</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-cyan-400 text-sm font-medium">Más Vistos</div>
          <div className="text-3xl font-bold text-white mt-2">45</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-cyan-400 text-sm font-medium">Útiles</div>
          <div className="text-3xl font-bold text-white mt-2">92%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { categoria: "Networking", articulos: 45, color: "cyan" },
          { categoria: "Servidores", articulos: 67, color: "blue" },
          { categoria: "Cloud", articulos: 89, color: "purple" },
          { categoria: "Seguridad", articulos: 54, color: "red" },
          { categoria: "Aplicaciones", articulos: 78, color: "green" },
          { categoria: "Hardware", articulos: 54, color: "orange" },
        ].map((cat, idx) => (
          <div
            key={idx}
            className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-500/50 transition-colors cursor-pointer"
          >
            <h3 className="text-xl font-bold text-white mb-2">{cat.categoria}</h3>
            <p className="text-slate-400 text-sm">{cat.articulos} artículos disponibles</p>
            <div className="mt-4 text-cyan-400 text-sm font-medium">Ver artículos →</div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Artículos Más Populares</h2>
        <div className="space-y-3">
          {[
            { titulo: "Cómo configurar firewall en servidores cloud", vistas: 1234, utilidad: 98 },
            { titulo: "Solución a errores comunes de conectividad VPN", vistas: 987, utilidad: 95 },
            { titulo: "Guía completa de migración a la nube", vistas: 856, utilidad: 92 },
          ].map((art, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer"
            >
              <div className="flex-1">
                <h4 className="text-white font-medium">{art.titulo}</h4>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-slate-400 text-sm">{art.vistas} vistas</span>
                  <span className="text-green-400 text-sm">{art.utilidad}% útil</span>
                </div>
              </div>
              <button className="text-cyan-400 hover:text-cyan-300">Ver →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
