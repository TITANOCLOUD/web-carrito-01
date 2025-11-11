export default function NutanixPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-4">Nutanix en Saturno Cloud</h1>
        <p className="text-slate-300 text-lg mb-8">
          Infraestructura hiperconvergente enterprise con gestión simplificada
        </p>

        {/* Beneficios */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-cyan-400 mb-3">Hiperconvergencia</h3>
            <p className="text-slate-300">Compute, storage y networking unificados en una sola plataforma</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-cyan-400 mb-3">Gestión Simple</h3>
            <p className="text-slate-300">Prism Central para administración centralizada con un solo clic</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-cyan-400 mb-3">Escalable</h3>
            <p className="text-slate-300">Escale de 3 a 1000+ nodos sin interrupciones</p>
          </div>
        </div>

        {/* Características */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Características Incluidas</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-cyan-400 mb-2">AHV Hypervisor</h4>
              <p className="text-slate-300 text-sm">Hipervisor nativo sin costos de licenciamiento</p>
            </div>
            <div>
              <h4 className="font-bold text-cyan-400 mb-2">Prism Pro</h4>
              <p className="text-slate-300 text-sm">Analytics avanzado y automatización inteligente</p>
            </div>
            <div>
              <h4 className="font-bold text-cyan-400 mb-2">Flow Network Security</h4>
              <p className="text-slate-300 text-sm">Microsegmentación y políticas de seguridad</p>
            </div>
            <div>
              <h4 className="font-bold text-cyan-400 mb-2">Disaster Recovery</h4>
              <p className="text-slate-300 text-sm">Replicación y recuperación automatizada</p>
            </div>
          </div>
        </div>

        {/* Casos de Uso */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Casos de Uso</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">VDI (Virtual Desktop Infrastructure)</h3>
              <p className="text-slate-300 text-sm">
                Entrega masiva de escritorios virtuales con rendimiento consistente
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Consolidación de Datacenters</h3>
              <p className="text-slate-300 text-sm">
                Reduzca costos consolidando múltiples sitios en infraestructura unificada
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Aplicaciones Críticas</h3>
              <p className="text-slate-300 text-sm">SAP, Oracle, SQL Server con alta disponibilidad garantizada</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Dev/Test Environments</h3>
              <p className="text-slate-300 text-sm">Provisión rápida de entornos con clonación instantánea</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-white mb-4">¿Listo para Nutanix?</h2>
          <p className="text-white/90 mb-6">Contacte a nuestro equipo para una demo personalizada</p>
          <button className="bg-white text-cyan-600 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition">
            Solicitar Demo
          </button>
        </div>
      </div>
    </div>
  )
}
