export default function LogsPlatformPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-4">Logs Data Platform</h1>
        <p className="text-slate-300 text-lg mb-8">
          Plataforma completa para recopilar, almacenar y visualizar sus logs
        </p>

        {/* Características Principales */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-cyan-400 mb-3">Recopilación Centralizada</h3>
            <p className="text-slate-300 text-sm mb-4">
              Agregue logs de cualquier fuente: aplicaciones, servidores, contenedores, cloud
            </p>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li>• Syslog, Fluentd, Logstash</li>
              <li>• API REST</li>
              <li>• Agentes nativos</li>
            </ul>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-cyan-400 mb-3">Búsqueda en Tiempo Real</h3>
            <p className="text-slate-300 text-sm mb-4">
              Consultas rápidas con Lucene Query Language y filtros avanzados
            </p>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li>• Búsqueda full-text</li>
              <li>• Regex patterns</li>
              <li>• Time-series analysis</li>
            </ul>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-cyan-400 mb-3">Visualización Avanzada</h3>
            <p className="text-slate-300 text-sm mb-4">Dashboards personalizados con gráficos interactivos y alertas</p>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li>• Gráficos en tiempo real</li>
              <li>• Alertas configurables</li>
              <li>• Exportación de reportes</li>
            </ul>
          </div>
        </div>

        {/* Stack Tecnológico */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Stack Tecnológico</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-cyan-400 mb-3">Elasticsearch</h4>
              <p className="text-slate-300 text-sm mb-3">Motor de búsqueda y analytics distribuido</p>
              <ul className="space-y-1 text-slate-400 text-xs">
                <li>• Indexación rápida</li>
                <li>• Búsqueda full-text</li>
                <li>• Aggregations</li>
                <li>• Machine Learning</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-cyan-400 mb-3">Logstash / Fluentd</h4>
              <p className="text-slate-300 text-sm mb-3">Pipeline de procesamiento de datos</p>
              <ul className="space-y-1 text-slate-400 text-xs">
                <li>• Parsing de logs</li>
                <li>• Enriquecimiento de datos</li>
                <li>• Transformaciones</li>
                <li>• Multiple outputs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-cyan-400 mb-3">Kibana / Grafana</h4>
              <p className="text-slate-300 text-sm mb-3">Visualización y exploración de datos</p>
              <ul className="space-y-1 text-slate-400 text-xs">
                <li>• Dashboards interactivos</li>
                <li>• Discover logs</li>
                <li>• Alerting</li>
                <li>• Canvas & Maps</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Casos de Uso */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Casos de Uso</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Monitoreo de Aplicaciones (APM)</h3>
              <p className="text-slate-300 text-sm">
                Trace errores, mida performance y detecte anomalías en sus aplicaciones
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Seguridad y Compliance (SIEM)</h3>
              <p className="text-slate-300 text-sm">Detecte amenazas, investigue incidentes y cumpla regulaciones</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Business Intelligence</h3>
              <p className="text-slate-300 text-sm">Analice comportamiento de usuarios y métricas de negocio</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Troubleshooting</h3>
              <p className="text-slate-300 text-sm">Resuelva problemas rápidamente con logs correlacionados</p>
            </div>
          </div>
        </div>

        {/* Planes */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Planes de Logs Platform</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Basic</h3>
              <p className="text-3xl font-bold text-cyan-400 mb-4">
                $49<span className="text-sm text-slate-400">/mes</span>
              </p>
              <ul className="space-y-2 text-slate-300 text-sm mb-4">
                <li>• 10 GB logs/día</li>
                <li>• 7 días retención</li>
                <li>• 3 usuarios</li>
                <li>• Dashboards básicos</li>
              </ul>
            </div>
            <div className="bg-slate-900 border border-cyan-600 border-2 p-6 rounded-lg">
              <div className="bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                Recomendado
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Professional</h3>
              <p className="text-3xl font-bold text-cyan-400 mb-4">
                $199<span className="text-sm text-slate-400">/mes</span>
              </p>
              <ul className="space-y-2 text-slate-300 text-sm mb-4">
                <li>• 100 GB logs/día</li>
                <li>• 30 días retención</li>
                <li>• 10 usuarios</li>
                <li>• Machine Learning</li>
                <li>• Alertas avanzadas</li>
              </ul>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Enterprise</h3>
              <p className="text-3xl font-bold text-cyan-400 mb-4">Custom</p>
              <ul className="space-y-2 text-slate-300 text-sm mb-4">
                <li>• Logs ilimitados</li>
                <li>• Retención custom</li>
                <li>• Usuarios ilimitados</li>
                <li>• Hot-Warm-Cold architecture</li>
                <li>• SLA 99.99%</li>
                <li>• Soporte 24/7</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Comience a analizar sus logs</h2>
          <p className="text-white/90 mb-6">Prueba gratuita de 14 días sin tarjeta de crédito</p>
          <button className="bg-white text-cyan-600 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition">
            Comenzar Ahora
          </button>
        </div>
      </div>
    </div>
  )
}
