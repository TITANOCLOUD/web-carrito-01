export default function IAMPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-4">Identity and Access Management (IAM)</h1>
        <p className="text-slate-300 text-lg mb-8">
          Proteja la gestión de accesos y mejore su productividad con IAM enterprise
        </p>

        {/* Características Principales */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-2xl">🔐</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Single Sign-On (SSO)</h3>
            <p className="text-slate-300 text-sm">
              Acceso unificado a todas sus aplicaciones con una sola autenticación
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-2xl">🛡️</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Multi-Factor Authentication</h3>
            <p className="text-slate-300 text-sm">MFA con TOTP, SMS, biometría y llaves de seguridad hardware</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Provisión Automática</h3>
            <p className="text-slate-300 text-sm">Creación y revocación automática de cuentas con SCIM 2.0</p>
          </div>
        </div>

        {/* Capacidades */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Capacidades de IAM</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-cyan-400 mb-3">Gestión de Identidades</h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• Directory Federation (LDAP, AD)</li>
                <li>• User Lifecycle Management</li>
                <li>• Self-Service Password Reset</li>
                <li>• Account Linking</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-cyan-400 mb-3">Control de Acceso</h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• Role-Based Access Control (RBAC)</li>
                <li>• Attribute-Based Access Control (ABAC)</li>
                <li>• Conditional Access Policies</li>
                <li>• Just-in-Time Access</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-cyan-400 mb-3">Seguridad Avanzada</h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• Adaptive Authentication</li>
                <li>• Risk-Based Authentication</li>
                <li>• Threat Detection</li>
                <li>• Anomaly Detection</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-cyan-400 mb-3">Compliance y Auditoría</h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• Audit Logs completos</li>
                <li>• Compliance Reports</li>
                <li>• Access Certification</li>
                <li>• Segregation of Duties (SoD)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Integraciones */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Integraciones</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Microsoft 365",
              "Google Workspace",
              "Salesforce",
              "AWS",
              "Azure AD",
              "Okta",
              "SAML 2.0",
              "OpenID Connect",
            ].map((integration) => (
              <div key={integration} className="bg-slate-900 border border-slate-800 p-4 rounded-lg text-center">
                <p className="text-slate-300 text-sm font-medium">{integration}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Planes */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Planes IAM</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Essentials</h3>
              <p className="text-3xl font-bold text-cyan-400 mb-4">
                $3<span className="text-sm text-slate-400">/usuario/mes</span>
              </p>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>✓ SSO básico</li>
                <li>✓ MFA estándar</li>
                <li>✓ 5 aplicaciones</li>
                <li>✓ Directory sync</li>
              </ul>
            </div>
            <div className="bg-slate-900 border border-cyan-600 border-2 p-6 rounded-lg">
              <div className="bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                Popular
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Professional</h3>
              <p className="text-3xl font-bold text-cyan-400 mb-4">
                $8<span className="text-sm text-slate-400">/usuario/mes</span>
              </p>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>✓ SSO ilimitado</li>
                <li>✓ MFA avanzado</li>
                <li>✓ Apps ilimitadas</li>
                <li>✓ Adaptive auth</li>
                <li>✓ API access</li>
              </ul>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Enterprise</h3>
              <p className="text-3xl font-bold text-cyan-400 mb-4">
                $15<span className="text-sm text-slate-400">/usuario/mes</span>
              </p>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>✓ Todo en Professional</li>
                <li>✓ Advanced threat detection</li>
                <li>✓ Privileged access management</li>
                <li>✓ 99.99% SLA</li>
                <li>✓ Soporte 24/7</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Mejore su seguridad con IAM</h2>
          <p className="text-white/90 mb-6">Comience su prueba gratuita de 30 días hoy</p>
          <button className="bg-white text-cyan-600 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition">
            Iniciar Prueba Gratuita
          </button>
        </div>
      </div>
    </div>
  )
}
