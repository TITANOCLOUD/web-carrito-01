"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Search,
  Filter,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  User,
  Calendar,
  MessageSquare,
  Paperclip,
  Send,
} from "lucide-react"

export default function TicketsPage() {
  const [showNewTicket, setShowNewTicket] = useState(false)

  const tickets = [
    {
      id: "TKT-2024-001",
      title: "Error en servidor VPS-001",
      status: "open",
      priority: "high",
      assignedTo: "Juan Pérez",
      createdAt: "2024-01-15 10:30",
      lastUpdate: "Hace 2 horas",
      category: "Infraestructura",
    },
    {
      id: "TKT-2024-002",
      title: "Solicitud de backup adicional",
      status: "in_progress",
      priority: "medium",
      assignedTo: "María García",
      createdAt: "2024-01-15 09:15",
      lastUpdate: "Hace 30 minutos",
      category: "Almacenamiento",
    },
    {
      id: "TKT-2024-003",
      title: "Renovación de dominio .com",
      status: "resolved",
      priority: "low",
      assignedTo: "Carlos López",
      createdAt: "2024-01-14 16:45",
      lastUpdate: "Hace 1 día",
      category: "Dominios",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <Badge className="bg-blue-500">
            <AlertCircle className="w-3 h-3 mr-1" />
            Abierto
          </Badge>
        )
      case "in_progress":
        return (
          <Badge className="bg-yellow-500">
            <Clock className="w-3 h-3 mr-1" />
            En Progreso
          </Badge>
        )
      case "resolved":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            Resuelto
          </Badge>
        )
      case "closed":
        return (
          <Badge className="bg-gray-500">
            <XCircle className="w-3 h-3 mr-1" />
            Cerrado
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Alta</Badge>
      case "medium":
        return <Badge className="bg-orange-500">Media</Badge>
      case "low":
        return <Badge className="bg-blue-500">Baja</Badge>
      default:
        return <Badge>{priority}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Sistema de Tickets</h1>
          <p className="text-slate-400 mt-2">Gestión completa de incidencias y solicitudes con IA integrada</p>
        </div>
        <Button onClick={() => setShowNewTicket(!showNewTicket)} className="bg-cyan-600 hover:bg-cyan-700">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Ticket
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Tickets Abiertos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">24</div>
            <p className="text-xs text-green-400">+3 desde ayer</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">En Progreso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12</div>
            <p className="text-xs text-yellow-400">5 asignados a ti</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Resueltos Hoy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">8</div>
            <p className="text-xs text-cyan-400">Tiempo promedio: 2.5h</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-400">Satisfacción</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">98%</div>
            <p className="text-xs text-green-400">+2% este mes</p>
          </CardContent>
        </Card>
      </div>

      {/* Nuevo Ticket Form */}
      {showNewTicket && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Crear Nuevo Ticket</CardTitle>
            <CardDescription>La IA analizará automáticamente tu solicitud y sugerirá soluciones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Título del Ticket</label>
                <Input placeholder="Describe brevemente el problema" className="bg-slate-900 border-slate-700" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Categoría</label>
                <Select>
                  <SelectTrigger className="bg-slate-900 border-slate-700">
                    <SelectValue placeholder="Selecciona categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="infrastructure">Infraestructura</SelectItem>
                    <SelectItem value="domain">Dominios</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="storage">Almacenamiento</SelectItem>
                    <SelectItem value="network">Red</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Prioridad</label>
                <Select>
                  <SelectTrigger className="bg-slate-900 border-slate-700">
                    <SelectValue placeholder="Selecciona prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="critical">Crítica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Asignar a</label>
                <Select>
                  <SelectTrigger className="bg-slate-900 border-slate-700">
                    <SelectValue placeholder="Selecciona técnico" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">IA - Asignación Automática</SelectItem>
                    <SelectItem value="user1">Juan Pérez</SelectItem>
                    <SelectItem value="user2">María García</SelectItem>
                    <SelectItem value="user3">Carlos López</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400">Descripción Detallada</label>
              <Textarea
                placeholder="Describe el problema con el mayor detalle posible. La IA analizará tu descripción..."
                className="bg-slate-900 border-slate-700 min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400">Adjuntar Archivos</label>
              <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:border-cyan-600 transition-colors cursor-pointer">
                <Paperclip className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                <p className="text-sm text-slate-400">Arrastra archivos aquí o haz clic para seleccionar</p>
                <p className="text-xs text-slate-500 mt-1">Máximo 10MB por archivo</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="bg-cyan-600 hover:bg-cyan-700 flex-1">
                <Send className="w-4 h-4 mr-2" />
                Crear Ticket
              </Button>
              <Button variant="outline" onClick={() => setShowNewTicket(false)} className="border-slate-700">
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filtros y Búsqueda */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por ID, título, cliente..."
                className="bg-slate-900 border-slate-700"
                icon={<Search className="w-4 h-4" />}
              />
            </div>
            <Select>
              <SelectTrigger className="w-40 bg-slate-900 border-slate-700">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="open">Abiertos</SelectItem>
                <SelectItem value="in_progress">En Progreso</SelectItem>
                <SelectItem value="resolved">Resueltos</SelectItem>
                <SelectItem value="closed">Cerrados</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40 bg-slate-900 border-slate-700">
                <SelectValue placeholder="Prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="critical">Crítica</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="medium">Media</SelectItem>
                <SelectItem value="low">Baja</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-slate-700 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Más Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Tickets */}
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <Card
            key={ticket.id}
            className="bg-slate-800 border-slate-700 hover:border-cyan-600 transition-colors cursor-pointer"
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-mono text-cyan-400">{ticket.id}</span>
                    {getStatusBadge(ticket.status)}
                    {getPriorityBadge(ticket.priority)}
                    <Badge variant="outline" className="border-slate-600">
                      {ticket.category}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{ticket.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{ticket.assignedTo}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{ticket.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{ticket.lastUpdate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-slate-700 bg-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Comentar
                  </Button>
                  <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
