export default function SMSAPIPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">SMS & WhatsApp API</h1>
          <p className="text-xl text-slate-300 mb-12">
            Envía mensajes masivos SMS y WhatsApp con nuestra API enterprise-grade
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cyan-400">$49</span>
                <span className="text-slate-400">/mes</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>10,000 SMS incluidos</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>API REST HTTP/S</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Reportes de entrega</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Envío programado</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Sender ID personalizado</span>
                </li>
              </ul>
              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-colors">
                Contratar
              </button>
            </div>

            <div className="bg-[#0f1419] border-2 border-cyan-500 rounded-lg p-6 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-4 py-1 rounded-full text-sm">
                Más vendido
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Professional</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cyan-400">$199</span>
                <span className="text-slate-400">/mes</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>50,000 SMS incluidos</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>WhatsApp Business API</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Webhooks en tiempo real</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Plantillas de mensajes</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Link shortener incluido</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Segmentación de audiencias</span>
                </li>
              </ul>
              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-colors">
                Contratar
              </button>
            </div>

            <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cyan-400">$599</span>
                <span className="text-slate-400">/mes</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>200,000 SMS incluidos</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Todo lo de Professional +</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Rutas premium de operadores</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Verificación OTP incluida</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Números dedicados</span>
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>SLA 99.95%</span>
                </li>
              </ul>
              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-colors">
                Contactar
              </button>
            </div>
          </div>

          <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Características de WhatsApp Business API</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Mensajes de plantilla</h3>
                <p className="text-slate-300">
                  Envía notificaciones, alertas y confirmaciones con plantillas pre-aprobadas por Meta para cumplir con
                  políticas.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Mensajes interactivos</h3>
                <p className="text-slate-300">
                  Botones, listas de opciones y respuestas rápidas para mejorar la experiencia del usuario y tasas de
                  conversión.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Media enriquecido</h3>
                <p className="text-slate-300">
                  Envía imágenes, videos, documentos PDF y ubicaciones para comunicaciones más efectivas.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Chatbots integrados</h3>
                <p className="text-slate-300">
                  Conecta con plataformas de chatbot para automatizar respuestas y atención 24/7 con IA.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Marketing</h3>
              <p className="text-slate-300">
                Campañas promocionales, lanzamientos de productos y ofertas especiales con altas tasas de apertura
                (98%).
              </p>
            </div>
            <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Transaccional</h3>
              <p className="text-slate-300">
                Confirmaciones de pedidos, actualizaciones de envío, recordatorios de citas y códigos de verificación
                OTP.
              </p>
            </div>
            <div className="bg-[#0f1419] border border-[#1a1f2e] rounded-lg p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Soporte al cliente</h3>
              <p className="text-slate-300">
                Atención bidireccional, resolución de consultas y seguimiento de tickets desde WhatsApp o SMS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
