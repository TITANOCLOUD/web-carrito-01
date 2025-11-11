"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { CheckCircle2, XCircle, Eye, EyeOff } from "lucide-react"

type Gateway = {
  id: string
  name: string
  logo: string
  enabled: boolean
  config: {
    publicKey?: string
    secretKey?: string
    merchantId?: string
    clientId?: string
    clientSecret?: string
  }
}

export default function PaymentGatewaysPage() {
  const [gateways, setGateways] = useState<Gateway[]>([
    {
      id: "epayco",
      name: "ePayco",
      logo: "https://369969691f476073508a-60bf0867add971908d4f26a64519c2aa.ssl.cf5.rackcdn.com/btns/epayco/logo-epayco.png",
      enabled: false,
      config: { publicKey: "", privateKey: "", merchantId: "" },
    },
    {
      id: "stripe",
      name: "Stripe",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
      enabled: false,
      config: { publicKey: "", secretKey: "" },
    },
    {
      id: "paypal",
      name: "PayPal",
      logo: "https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg",
      enabled: false,
      config: { clientId: "", clientSecret: "" },
    },
  ])

  const [editingGateway, setEditingGateway] = useState<string | null>(null)
  const [showSecrets, setShowSecrets] = useState<{ [key: string]: boolean }>({})

  const toggleGateway = (id: string) => {
    setGateways(gateways.map((g) => (g.id === id ? { ...g, enabled: !g.enabled } : g)))
  }

  const toggleSecret = (key: string) => {
    setShowSecrets({ ...showSecrets, [key]: !showSecrets[key] })
  }

  const updateGatewayConfig = (id: string, field: string, value: string) => {
    setGateways(
      gateways.map((g) =>
        g.id === id
          ? {
              ...g,
              config: {
                ...g.config,
                [field]: value,
              },
            }
          : g,
      ),
    )
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Pasarelas de Pago</h1>
          <p className="text-slate-400">Configure las pasarelas de pago para procesar transacciones</p>
        </div>

        <div className="grid gap-6">
          {gateways.map((gateway) => (
            <Card key={gateway.id} className="bg-slate-800/50 border-slate-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2">
                    <img
                      src={gateway.logo || "/placeholder.svg"}
                      alt={gateway.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{gateway.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {gateway.enabled ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-sm">Activo</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-400 text-sm">Inactivo</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => setEditingGateway(editingGateway === gateway.id ? null : gateway.id)}
                    variant="outline"
                    className="border-slate-600"
                  >
                    {editingGateway === gateway.id ? "Cancelar" : "Configurar"}
                  </Button>
                  <Button
                    onClick={() => toggleGateway(gateway.id)}
                    className={gateway.enabled ? "bg-red-600 hover:bg-red-700" : "bg-cyan-600 hover:bg-cyan-700"}
                  >
                    {gateway.enabled ? "Desactivar" : "Activar"}
                  </Button>
                </div>
              </div>

              {editingGateway === gateway.id && (
                <div className="border-t border-slate-700 pt-6 space-y-4">
                  {gateway.id === "epayco" && (
                    <>
                      <div>
                        <label className="text-slate-300 text-sm mb-2 block">Public Key</label>
                        <Input
                          placeholder="pk_test_xxxxx"
                          className="bg-slate-900 border-slate-700 text-white"
                          value={gateway.config.publicKey || ""}
                          onChange={(e) => updateGatewayConfig(gateway.id, "publicKey", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-slate-300 text-sm mb-2 block">Private Key</label>
                        <div className="relative">
                          <Input
                            type={showSecrets["epayco-private"] ? "text" : "password"}
                            placeholder="sk_test_xxxxx"
                            className="bg-slate-900 border-slate-700 text-white pr-10"
                            value={gateway.config.secretKey || ""}
                            onChange={(e) => updateGatewayConfig(gateway.id, "secretKey", e.target.value)}
                          />
                          <button
                            onClick={() => toggleSecret("epayco-private")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                          >
                            {showSecrets["epayco-private"] ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="text-slate-300 text-sm mb-2 block">Merchant ID</label>
                        <Input
                          placeholder="12345"
                          className="bg-slate-900 border-slate-700 text-white"
                          value={gateway.config.merchantId || ""}
                          onChange={(e) => updateGatewayConfig(gateway.id, "merchantId", e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {gateway.id === "stripe" && (
                    <>
                      <div>
                        <label className="text-slate-300 text-sm mb-2 block">Publishable Key</label>
                        <Input
                          placeholder="pk_test_xxxxx"
                          className="bg-slate-900 border-slate-700 text-white"
                          value={gateway.config.publicKey || ""}
                          onChange={(e) => updateGatewayConfig(gateway.id, "publicKey", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-slate-300 text-sm mb-2 block">Secret Key</label>
                        <div className="relative">
                          <Input
                            type={showSecrets["stripe-secret"] ? "text" : "password"}
                            placeholder="sk_test_xxxxx"
                            className="bg-slate-900 border-slate-700 text-white pr-10"
                            value={gateway.config.secretKey || ""}
                            onChange={(e) => updateGatewayConfig(gateway.id, "secretKey", e.target.value)}
                          />
                          <button
                            onClick={() => toggleSecret("stripe-secret")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                          >
                            {showSecrets["stripe-secret"] ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {gateway.id === "paypal" && (
                    <>
                      <div>
                        <label className="text-slate-300 text-sm mb-2 block">Client ID</label>
                        <Input
                          placeholder="AYxxxxx"
                          className="bg-slate-900 border-slate-700 text-white"
                          value={gateway.config.clientId || ""}
                          onChange={(e) => updateGatewayConfig(gateway.id, "clientId", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-slate-300 text-sm mb-2 block">Client Secret</label>
                        <div className="relative">
                          <Input
                            type={showSecrets["paypal-secret"] ? "text" : "password"}
                            placeholder="ELxxxxx"
                            className="bg-slate-900 border-slate-700 text-white pr-10"
                            value={gateway.config.clientSecret || ""}
                            onChange={(e) => updateGatewayConfig(gateway.id, "clientSecret", e.target.value)}
                          />
                          <button
                            onClick={() => toggleSecret("paypal-secret")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                          >
                            {showSecrets["paypal-secret"] ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button className="bg-cyan-600 hover:bg-cyan-700">Guardar Configuración</Button>
                    <Button variant="outline" className="border-slate-600 bg-transparent">
                      Probar Conexión
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
