export default function SAPHanaPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-4">SAP HANA en Saturno Cloud</h1>
        <p className="text-slate-300 text-lg mb-8">
          Infraestructura certificada para SAP HANA con rendimiento in-memory
        </p>

        {/* Configuraciones */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Small</h3>
            <ul className="space-y-2 text-slate-300 text-sm mb-6">
              <li>• 256 GB RAM</li>
              <li>• 32 vCPUs</li>
              <li>• 2 TB SSD Storage</li>
              <li>• SAP S/4HANA</li>
            </ul>
            <p className="text-2xl font-bold text-white">$3,499/mes</p>
          </div>
          <div className="bg-slate-900 border border-cyan-600 border-2 p-6 rounded-lg">
            <div className="bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
              Recomendado
            </div>
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Medium</h3>
            <ul className="space-y-2 text-slate-300 text-sm mb-6">
              <li>• 512 GB RAM</li>
              <li>• 64 vCPUs</li>
              <li>• 4 TB SSD Storage</li>
              <li>• SAP BW/4HANA</li>
            </ul>
            <p className="text-2xl font-bold text-white">$6,999/mes</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Large</h3>
            <ul className="space-y-2 text-slate-300 text-sm mb-6">
              <li>• 1 TB RAM</li>
              <li>• 128 vCPUs</li>
              <li>• 8 TB SSD Storage</li>
              <li>• Enterprise Scale</li>
            </ul>
            <p className="text-2xl font-bold text-white">$12,999/mes</p>
          </div>
        </div>

        {/* Certificaciones */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Certificaciones SAP</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">✓</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">SAP HANA Tailored Datacenter Integration (TDI)</h4>
                <p className="text-slate-300 text-sm">Certificado para producción SAP HANA</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">✓</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">SAP Cloud Platform</h4>
                <p className="text-slate-300 text-sm">Integración completa con SAP Cloud</p>
              </div>
            </div>
          </div>
        </div>

        {/* Servicios Incluidos */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Servicios Incluidos</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              "Instalación SAP HANA",
              "Backups automatizados",
              "Monitoring 24/7",
              "Parches y actualizaciones",
              "High Availability (HA)",
              "Disaster Recovery (DR)",
              "Soporte SAP BASIS",
              "Migración asistida",
              "Optimización de performance",
            ].map((service) => (
              <div key={service} className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                <p className="text-slate-300 text-sm">✓ {service}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Migre su SAP a la nube</h2>
          <p className="text-white/90 mb-6">Hable con nuestros especialistas certificados SAP</p>
          <button className="bg-white text-cyan-600 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition">
            Contactar Especialista
          </button>
        </div>
      </div>
    </div>
  )
}
