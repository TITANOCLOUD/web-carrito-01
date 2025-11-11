"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Shield, Smartphone, Key, CheckCircle2, XCircle } from "lucide-react"

export default function TwoFactorAuthPage() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [showQRCode, setShowQRCode] = useState(false)

  const handleEnable2FA = () => {
    setShowQRCode(true)
  }

  const handleVerify = () => {
    if (verificationCode === "123456") {
      setIs2FAEnabled(true)
      setShowQRCode(false)
      setVerificationCode("")
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Autenticación de Dos Factores (2FA)</h1>
          <p className="text-slate-400">Protege tu cuenta con una capa adicional de seguridad</p>
        </div>

        <div className="grid gap-6">
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    is2FAEnabled ? "bg-green-500/20" : "bg-slate-700"
                  }`}
                >
                  <Shield className={`w-8 h-8 ${is2FAEnabled ? "text-green-400" : "text-slate-400"}`} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Estado de 2FA</h2>
                  <div className="flex items-center gap-2">
                    {is2FAEnabled ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-medium">Activado</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-400" />
                        <span className="text-red-400 font-medium">Desactivado</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {!is2FAEnabled && (
                <Button onClick={handleEnable2FA} className="bg-cyan-600 hover:bg-cyan-700">
                  Activar 2FA
                </Button>
              )}
              {is2FAEnabled && (
                <Button
                  onClick={() => setIs2FAEnabled(false)}
                  variant="outline"
                  className="border-red-500 text-red-400"
                >
                  Desactivar 2FA
                </Button>
              )}
            </div>

            {showQRCode && (
              <div className="border-t border-slate-700 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Escanea el código QR</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-64 h-64 bg-white rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <div className="w-48 h-48 bg-slate-900 rounded" />
                        <p className="text-slate-900 text-sm mt-2">Código QR</p>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm text-center">
                      Escanea este código con tu aplicación de autenticación
                    </p>
                  </div>

                  <div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">1. Descarga una app de autenticación</h4>
                        <p className="text-slate-400 text-sm">Google Authenticator, Authy, o similar</p>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">2. Escanea el código QR</h4>
                        <p className="text-slate-400 text-sm">Abre la app y escanea el código mostrado</p>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">3. Ingresa el código de verificación</h4>
                        <Input
                          placeholder="000000"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          className="bg-slate-900 border-slate-700 text-white text-center text-2xl tracking-widest"
                          maxLength={6}
                        />
                      </div>

                      <Button onClick={handleVerify} className="w-full bg-cyan-600 hover:bg-cyan-700">
                        Verificar y Activar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Key className="w-5 h-5 text-cyan-400" />
              Códigos de Respaldo
            </h3>
            <p className="text-slate-400 mb-4">
              Guarda estos códigos en un lugar seguro. Puedes usarlos para acceder si pierdes tu dispositivo de
              autenticación.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {[
                "ABCD-1234",
                "EFGH-5678",
                "IJKL-9012",
                "MNOP-3456",
                "QRST-7890",
                "UVWX-1234",
                "YZAB-5678",
                "CDEF-9012",
              ].map((code, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-700 p-3 rounded text-center">
                  <code className="text-cyan-400 font-mono">{code}</code>
                </div>
              ))}
            </div>
            <Button variant="outline" className="border-slate-600 bg-transparent">
              Descargar Códigos
            </Button>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-cyan-400" />
              Dispositivos Autorizados
            </h3>
            <div className="space-y-3">
              {[
                { device: "iPhone 13 Pro", location: "Bogotá, Colombia", lastUsed: "Hace 2 horas" },
                { device: "MacBook Pro", location: "Bogotá, Colombia", lastUsed: "Hace 1 día" },
              ].map((device, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{device.device}</p>
                    <p className="text-slate-400 text-sm">
                      {device.location} • {device.lastUsed}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="border-red-500 text-red-400 bg-transparent">
                    Revocar
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
