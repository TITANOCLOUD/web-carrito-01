export default function eSIMPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">Plataforma eSIM</h1>
          <p className="text-xl text-slate-300 mb-12">
            Gestiona y provisiona eSIMs globales desde tu propia plataforma white-label
          </p>

          <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">¿Qué es nuestra plataforma eSIM?</h2>
            <p className="text-slate-300 mb-4">
              Ofrecemos una plataforma completa white-label para que puedas vender eSIMs bajo tu propia marca. Incluye
              API robusta, panel de administración, y conectividad con más de 190 países.
            </p>
            <p className="text-slate-300">
              Ideal para MVNOs, operadores, agencias de viajes, empresas de logística y cualquier negocio que quiera
              ofrecer conectividad móvil a sus clientes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Plataforma White-Label</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cyan-400">$499</span>
                <span className="text-slate-400">/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Panel de administración completo</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>API REST para integración</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Hasta 1000 eSIMs activas</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Cobertura en 190+ países</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Personalización de marca</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Reportes y analytics</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Soporte técnico incluido</span>
                </li>
              </ul>
              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-colors">
                Comenzar
              </button>
            </div>

            <div className="bg-[#0f1419] border-2 border-cyan-500 rounded-lg p-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-4 py-1 rounded-full text-sm">
                Enterprise
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Solución Empresarial</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cyan-400">Personalizado</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Todo lo de White-Label +</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>eSIMs ilimitadas</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Infraestructura dedicada</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>SLA 99.99%</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Desarrollo de funcionalidades custom</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Acuerdos directos con operadores</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Account manager dedicado</span>
                </li>
              </ul>
              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-colors">
                Contactar ventas
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">API Completa</h3>
              <p className="text-slate-300">
                Provisiona, activa, suspende y gestiona eSIMs mediante nuestra API RESTful con documentación completa y
                SDKs disponibles.
              </p>
            </div>
            <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Múltiples Perfiles</h3>
              <p className="text-slate-300">
                Soporta múltiples perfiles de operador en una sola eSIM, permitiendo a usuarios cambiar de red sin
                cambiar de SIM.
              </p>
            </div>
            <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Gestión de Planes</h3>
              <p className="text-slate-300">
                Crea y gestiona planes de datos personalizados por región, con recarga automática y control de consumo
                en tiempo real.
              </p>
            </div>
          </div>

          <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Casos de uso</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">MVNOs y Operadores</h3>
                <p className="text-slate-300">
                  Lanza tu propio servicio de telefonía móvil sin invertir en infraestructura física. Gestiona miles de
                  clientes desde un solo panel.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">IoT y M2M</h3>
                <p className="text-slate-300">
                  Conecta dispositivos IoT a nivel global con conectividad confiable y gestión centralizada de todos tus
                  endpoints.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Viajeros Frecuentes</h3>
                <p className="text-slate-300">
                  Ofrece a viajeros conectividad instantánea en múltiples países sin necesidad de SIMs físicas ni
                  roaming costoso.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Empresas Multinacionales</h3>
                <p className="text-slate-300">
                  Gestiona la conectividad de empleados globales con una sola plataforma, reduciendo costos y
                  complejidad administrativa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
