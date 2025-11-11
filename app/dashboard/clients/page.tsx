"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Building2, Plus, Search, ChevronDown, ChevronRight, Edit, Trash2, Users } from "lucide-react"

type Client = {
  id: string
  tenantId: string
  name: string
  contact: string
  email: string
  phone: string
  level: "client" | "subclient" // Nivel en la jerarquía
  parentId: string | null
  customization: {
    logo: string | null
    primaryColor: string
    secondaryColor: string
    siteName: string
    hasOwnSite: boolean
  }
  services: {
    vps: number
    domains: number
    backups: number
  }
  apis: {
    gpt: { configured: boolean; key: string | null }
    epayco: { configured: boolean; publicKey: string | null; privateKey: string | null }
    stripe: { configured: boolean; publicKey: string | null; secretKey: string | null }
    paypal: { configured: boolean; clientId: string | null; clientSecret: string | null }
  }
  billing: {
    currency: string
    taxId: string
    invoicePrefix: string
  }
  status: "active" | "inactive" | "suspended"
  subClients: Client[]
  createdAt: string
}

const MOCK_CLIENTS: Client[] = [
  {
    id: "1",
    tenantId: "tenant_premium_001",
    name: "Cliente Premium SAS",
    contact: "Carlos Rodríguez",
    email: "carlos@clientepremium.com",
    phone: "+57 300 1234567",
    level: "client",
    parentId: null,
    customization: {
      logo: null,
      primaryColor: "#8B5CF6",
      secondaryColor: "#EC4899",
      siteName: "Premium Cloud Solutions",
      hasOwnSite: true,
    },
    services: {
      vps: 5,
      domains: 10,
      backups: 5,
    },
    apis: {
      gpt: { configured: true, key: "sk-proj-..." },
      epayco: { configured: true, publicKey: "pub_...", privateKey: "priv_..." },
      stripe: { configured: false, publicKey: null, secretKey: null },
      paypal: { configured: false, clientId: null, clientSecret: null },
    },
    billing: {
      currency: "COP",
      taxId: "900123456-1",
      invoicePrefix: "PREM",
    },
    status: "active",
    createdAt: "2024-01-15",
    subClients: [
      {
        id: "1-1",
        tenantId: "tenant_premium_001_sub_norte",
        name: "Sucursal Norte",
        contact: "Ana Pérez",
        email: "ana@sucursalnorte.com",
        phone: "+57 310 9876543",
        level: "subclient",
        parentId: "1",
        customization: {
          logo: null,
          primaryColor: "#06B6D4",
          secondaryColor: "#3B82F6",
          siteName: "Sucursal Norte Cloud",
          hasOwnSite: false,
        },
        services: {
          vps: 2,
          domains: 3,
          backups: 2,
        },
        apis: {
          gpt: { configured: true, key: "sk-proj-sub..." },
          epayco: { configured: false, publicKey: null, privateKey: null },
          stripe: { configured: false, publicKey: null, secretKey: null },
          paypal: { configured: false, clientId: null, clientSecret: null },
        },
        billing: {
          currency: "COP",
          taxId: "900654321-2",
          invoicePrefix: "NORTE",
        },
        status: "active",
        createdAt: "2024-03-01",
        subClients: [],
      },
    ],
  },
]

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS)
  const [expandedClients, setExpandedClients] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showCustomizationModal, setShowCustomizationModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  const toggleClient = (clientId: string) => {
    const newExpanded = new Set(expandedClients)
    if (newExpanded.has(clientId)) {
      newExpanded.delete(clientId)
    } else {
      newExpanded.add(clientId)
    }
    setExpandedClients(newExpanded)
  }

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gestión de Clientes Multi-Tenant</h1>
            <p className="text-slate-400">Sistema jerárquico con aislamiento y personalización total</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="bg-cyan-600 hover:bg-cyan-700">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Cliente
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 p-4">
            <h3 className="text-slate-400 text-sm mb-1">Clientes Activos</h3>
            <p className="text-3xl font-bold text-purple-400">{clients.filter((c) => c.level === "client").length}</p>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30 p-4">
            <h3 className="text-slate-400 text-sm mb-1">Subclientes Totales</h3>
            <p className="text-3xl font-bold text-blue-400">
              {clients.reduce((acc, c) => acc + c.subClients.length, 0)}
            </p>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30 p-4">
            <h3 className="text-slate-400 text-sm mb-1">Servicios VPS</h3>
            <p className="text-3xl font-bold text-green-400">
              {clients.reduce(
                (acc, c) => acc + c.services.vps + c.subClients.reduce((a, s) => a + s.services.vps, 0),
                0,
              )}
            </p>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30 p-4">
            <h3 className="text-slate-400 text-sm mb-1">APIs Configuradas</h3>
            <p className="text-3xl font-bold text-orange-400">
              {clients.reduce((acc, c) => acc + Object.values(c.apis).filter((api) => api.configured).length, 0)}
            </p>
          </Card>
        </div>

        <Card className="bg-slate-800/50 border-slate-700 p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-900 border-slate-700 text-white"
            />
          </div>
        </Card>

        <div className="grid gap-4">
          {filteredClients.map((client) => (
            <div key={client.id}>
              <Card className="bg-slate-800/50 border-slate-700 p-6 hover:border-cyan-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={() => toggleClient(client.id)}
                      className="text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      {expandedClients.has(client.id) ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>

                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-semibold text-lg">{client.name}</h3>
                        {client.customization.hasOwnSite && (
                          <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded border border-cyan-500/30">
                            🌐 Sitio Propio
                          </span>
                        )}
                        <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded font-mono">
                          {client.tenantId}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                        <span>Contacto: {client.contact}</span>
                        <span>•</span>
                        <span>{client.email}</span>
                        <span>•</span>
                        <span>{client.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-slate-500 text-xs">APIs:</span>
                        {Object.entries(client.apis).map(([key, api]) => (
                          <span
                            key={key}
                            className={`px-2 py-0.5 rounded text-xs ${
                              api.configured
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-slate-700/50 text-slate-500"
                            }`}
                          >
                            {key.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-white font-semibold">
                        {client.services.vps} VPS • {client.services.domains} Dominios
                      </p>
                      <p className="text-slate-400 text-sm">
                        {client.subClients.length} subcliente{client.subClients.length !== 1 ? "s" : ""}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 hover:border-purple-500 text-purple-400 bg-transparent"
                        onClick={() => {
                          setSelectedClient(client)
                          setShowCustomizationModal(true)
                        }}
                      >
                        🎨 Personalizar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 hover:border-cyan-500 bg-transparent"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 hover:border-red-500 text-red-400 bg-transparent"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {expandedClients.has(client.id) && client.subClients.length > 0 && (
                <div className="ml-16 mt-2 space-y-2">
                  <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 mb-2">
                    <p className="text-blue-400 text-sm font-medium">
                      🔒 Aislamiento Total: Los subclientes NO ven datos del cliente padre
                    </p>
                  </div>
                  {client.subClients.map((subClient) => (
                    <Card key={subClient.id} className="bg-slate-800/30 border-slate-700/50 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center">
                            <Users className="w-4 h-4 text-cyan-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-white font-medium">{subClient.name}</h4>
                              {!subClient.customization.hasOwnSite && (
                                <span className="px-2 py-0.5 bg-slate-700 text-slate-400 text-xs rounded">
                                  Solo Plataforma
                                </span>
                              )}
                            </div>
                            <p className="text-slate-400 text-sm">
                              {subClient.contact} • {subClient.email}
                            </p>
                            <p className="text-slate-500 text-xs mt-1 font-mono">{subClient.tenantId}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-slate-300 text-sm">{subClient.services.vps} VPS</p>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-slate-600 hover:border-cyan-500 bg-transparent"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-slate-600 hover:border-red-500 text-red-400 bg-transparent"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-slate-700 border-dashed hover:border-cyan-500 text-slate-400 hover:text-cyan-400 bg-transparent"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Subcliente
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
