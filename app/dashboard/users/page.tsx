"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Search, Edit, Trash2, Users } from "lucide-react"

type User = {
  id: string
  name: string
  email: string
  role: "master" | "client" | "subclient" | "operator" | "viewer"
  parentId: string | null // ID del padre en la jerarquía
  tenantId: string // ID del tenant al que pertenece
  status: "active" | "inactive"
  createdAt: string
  lastLogin: string
  permissions: {
    canCustomizeBranding: boolean // Logo, colores, SEO
    canManagePricing: boolean // Precios de servicios
    canConfigureGPT: boolean // API de GPT y agentes IA
    canManageInvoicing: boolean // Facturación
    canResell: boolean // Puede crear subclientes
    canAccessReports: boolean // Informes y analytics
    canManageVPS: boolean // Gestión de VPS
    canManageContacts: boolean // Correos, teléfonos, contactos
    canAccessDNS: boolean // Gestión de DNS
    canAccessBackup: boolean // Acceso a backups
  }
}

const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Master Admin",
    email: "master@titanocloud.com",
    role: "master",
    parentId: null,
    tenantId: "root",
    status: "active",
    createdAt: "2024-01-01",
    lastLogin: "Hace 1 hora",
    permissions: {
      canCustomizeBranding: true,
      canManagePricing: true,
      canConfigureGPT: true,
      canManageInvoicing: true,
      canResell: true,
      canAccessReports: true,
      canManageVPS: true,
      canManageContacts: true,
      canAccessDNS: true,
      canAccessBackup: true,
    },
  },
  {
    id: "2",
    name: "Cliente Premium SAS",
    email: "admin@clientepremium.com",
    role: "client",
    parentId: "1",
    tenantId: "tenant_premium_001",
    status: "active",
    createdAt: "2024-02-15",
    lastLogin: "Hace 3 horas",
    permissions: {
      canCustomizeBranding: true,
      canManagePricing: true,
      canConfigureGPT: true,
      canManageInvoicing: true,
      canResell: true,
      canAccessReports: true,
      canManageVPS: true,
      canManageContacts: true,
      canAccessDNS: false,
      canAccessBackup: false,
    },
  },
  {
    id: "3",
    name: "Subcliente Norte",
    email: "admin@subclientenorte.com",
    role: "subclient",
    parentId: "2",
    tenantId: "tenant_premium_001_sub_001",
    status: "active",
    createdAt: "2024-03-01",
    lastLogin: "Hace 2 días",
    permissions: {
      canCustomizeBranding: true,
      canManagePricing: false,
      canConfigureGPT: true,
      canManageInvoicing: false,
      canResell: false,
      canAccessReports: true,
      canManageVPS: true,
      canManageContacts: true,
      canAccessDNS: false,
      canAccessBackup: false,
    },
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPermissionsModal, setShowPermissionsModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer" as User["role"],
    parentId: null as string | null,
    tenantId: "",
    permissions: {
      canCustomizeBranding: false,
      canManagePricing: false,
      canConfigureGPT: false,
      canManageInvoicing: false,
      canResell: false,
      canAccessReports: false,
      canManageVPS: false,
      canManageContacts: false,
      canAccessDNS: false,
      canAccessBackup: false,
    },
  })

  const roleColors = {
    master: "bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-400 border-red-500/30",
    client: "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30",
    subclient: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30",
    operator: "bg-slate-500/20 text-slate-400 border-slate-500/30",
    viewer: "bg-slate-600/20 text-slate-500 border-slate-600/30",
  }

  const roleLabels = {
    master: "🔴 MASTER (Control Total)",
    client: "🟣 CLIENTE (SaaS User)",
    subclient: "🔵 SUBCLIENTE (Revendido)",
    operator: "⚙️ Operador",
    viewer: "👁️ Visualizador",
  }

  const handleAddUser = () => {
    const newUser: User = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      parentId: formData.parentId,
      tenantId: formData.tenantId,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
      lastLogin: "Nunca",
      permissions: formData.permissions,
    }
    setUsers([...users, newUser])
    setShowAddModal(false)
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "viewer",
      parentId: null,
      tenantId: "",
      permissions: {
        canCustomizeBranding: false,
        canManagePricing: false,
        canConfigureGPT: false,
        canManageInvoicing: false,
        canResell: false,
        canAccessReports: false,
        canManageVPS: false,
        canManageContacts: false,
        canAccessDNS: false,
        canAccessBackup: false,
      },
    })
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gestión de Usuarios Multi-Tenant</h1>
            <p className="text-slate-400">Sistema jerárquico con aislamiento total entre niveles</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="bg-cyan-600 hover:bg-cyan-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Nuevo Usuario
          </Button>
        </div>

        <Card className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-slate-700 p-6 mb-6">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            Estructura de Jerarquía Multi-Tenant
          </h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-400 font-semibold mb-1">🔴 MASTER</p>
              <p className="text-slate-400 text-xs">Control total, ve todo, gestión centralizada crítica</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
              <p className="text-purple-400 font-semibold mb-1">🟣 CLIENTE (SaaS)</p>
              <p className="text-slate-400 text-xs">Personaliza su instancia, puede revender, ve solo lo que compró</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <p className="text-blue-400 font-semibold mb-1">🔵 SUBCLIENTE</p>
              <p className="text-slate-400 text-xs">Aislamiento total, NO ve nada del padre, uso limitado</p>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-900 border-slate-700 text-white"
            />
          </div>
        </Card>

        <div className="grid gap-4">
          {filteredUsers.map((user) => (
            <Card
              key={user.id}
              className="bg-slate-800/50 border-slate-700 p-6 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full ${
                      user.role === "master"
                        ? "bg-gradient-to-br from-red-500 to-orange-600"
                        : user.role === "client"
                          ? "bg-gradient-to-br from-purple-500 to-pink-600"
                          : "bg-gradient-to-br from-cyan-500 to-blue-600"
                    } flex items-center justify-center text-white font-bold`}
                  >
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{user.name}</h3>
                    <p className="text-slate-400 text-sm">{user.email}</p>
                    <p className="text-slate-500 text-xs mt-1">Tenant ID: {user.tenantId}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${roleColors[user.role]}`}
                    >
                      {roleLabels[user.role]}
                    </span>
                    <p className="text-slate-400 text-xs mt-1">Último acceso: {user.lastLogin}</p>
                    <p className="text-cyan-400 text-xs mt-1">
                      {Object.values(user.permissions).filter(Boolean).length}/{Object.keys(user.permissions).length}{" "}
                      permisos
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600 hover:border-purple-500 text-purple-400 bg-transparent"
                      onClick={() => {
                        setSelectedUser(user)
                        setShowPermissionsModal(true)
                      }}
                    >
                      <Users className="w-4 h-4 mr-1" />
                      Permisos
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600 hover:border-cyan-500 bg-transparent"
                      onClick={() => {
                        setSelectedUser(user)
                        setShowEditModal(true)
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600 hover:border-red-500 text-red-400 bg-transparent"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="flex flex-wrap gap-2">
                  {user.permissions.canResell && (
                    <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded border border-cyan-500/30">
                      ✓ Puede Revender
                    </span>
                  )}
                  {user.permissions.canCustomizeBranding && (
                    <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded border border-purple-500/30">
                      ✓ Personalización
                    </span>
                  )}
                  {user.permissions.canManagePricing && (
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded border border-green-500/30">
                      ✓ Gestión Precios
                    </span>
                  )}
                  {user.permissions.canConfigureGPT && (
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded border border-blue-500/30">
                      ✓ Config GPT
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {showPermissionsModal && selectedUser && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <Card className="bg-slate-900 border-slate-700 p-6 max-w-2xl w-full my-8">
              <h2 className="text-2xl font-bold text-white mb-2">Configurar Permisos - {selectedUser.name}</h2>
              <p className="text-slate-400 text-sm mb-6">{roleLabels[selectedUser.role]}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">🎨 Personalización de Marca</h3>
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-slate-300 text-sm">Logo y Colores</span>
                    <input
                      type="checkbox"
                      checked={selectedUser.permissions.canCustomizeBranding}
                      className="w-4 h-4"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm">SEO y Metadatos</span>
                    <input
                      type="checkbox"
                      checked={selectedUser.permissions.canCustomizeBranding}
                      className="w-4 h-4"
                    />
                  </label>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">💰 Gestión Financiera</h3>
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-slate-300 text-sm">Configurar Precios</span>
                    <input type="checkbox" checked={selectedUser.permissions.canManagePricing} className="w-4 h-4" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm">Formato Facturación</span>
                    <input type="checkbox" checked={selectedUser.permissions.canManageInvoicing} className="w-4 h-4" />
                  </label>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">🤖 Inteligencia Artificial</h3>
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-slate-300 text-sm">API de GPT</span>
                    <input type="checkbox" checked={selectedUser.permissions.canConfigureGPT} className="w-4 h-4" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm">Agentes IA (Fotos/Nombres)</span>
                    <input type="checkbox" checked={selectedUser.permissions.canConfigureGPT} className="w-4 h-4" />
                  </label>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">🌐 Servicios VPS</h3>
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-slate-300 text-sm">Gestionar VPS</span>
                    <input type="checkbox" checked={selectedUser.permissions.canManageVPS} className="w-4 h-4" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm">Nombres Personalizados</span>
                    <input type="checkbox" checked={selectedUser.permissions.canManageVPS} className="w-4 h-4" />
                  </label>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">📊 Informes y Analytics</h3>
                  <label className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm">Acceso a Informes</span>
                    <input type="checkbox" checked={selectedUser.permissions.canAccessReports} className="w-4 h-4" />
                  </label>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">🔄 Reventa (Multi-tenant)</h3>
                  <label className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm">Puede Crear Subclientes</span>
                    <input type="checkbox" checked={selectedUser.permissions.canResell} className="w-4 h-4" />
                  </label>
                </Card>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-cyan-600 hover:bg-cyan-700">Guardar Permisos</Button>
                <Button
                  onClick={() => setShowPermissionsModal(false)}
                  variant="outline"
                  className="flex-1 border-slate-600"
                >
                  Cancelar
                </Button>
              </div>
            </Card>
          </div>
        )}

        {showAddModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <Card className="bg-slate-900 border-slate-700 p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold text-white mb-6">Agregar Nuevo Usuario</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-slate-300 text-sm mb-2 block">Nombre completo</label>
                  <Input
                    placeholder="Nombre del usuario"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-sm mb-2 block">Email</label>
                  <Input
                    type="email"
                    placeholder="usuario@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-sm mb-2 block">Contraseña</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-sm mb-2 block">Rol</label>
                  <Select
                    value={formData.role}
                    onValueChange={(value: User["role"]) => setFormData({ ...formData, role: value })}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">Visualizador</SelectItem>
                      <SelectItem value="operator">Operador</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="superadmin">Super Admin</SelectItem>
                      <SelectItem value="master">MASTER</SelectItem>
                      <SelectItem value="client">CLIENTE</SelectItem>
                      <SelectItem value="subclient">SUBCLIENTE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-slate-300 text-sm mb-2 block">Tenant ID</label>
                  <Input
                    placeholder="ID del tenant"
                    value={formData.tenantId}
                    onChange={(e) => setFormData({ ...formData, tenantId: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-sm mb-2 block">Parent ID</label>
                  <Input
                    placeholder="ID del padre"
                    value={formData.parentId}
                    onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button onClick={handleAddUser} className="flex-1 bg-cyan-600 hover:bg-cyan-700">
                  Crear Usuario
                </Button>
                <Button onClick={() => setShowAddModal(false)} variant="outline" className="flex-1 border-slate-600">
                  Cancelar
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
