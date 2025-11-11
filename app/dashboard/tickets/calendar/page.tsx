"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

export default function TicketsCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const events = [
    { id: 1, title: "Mantenimiento Servidor VPS-001", date: "2024-01-20", time: "10:00", type: "maintenance" },
    { id: 2, title: "Reunión Cliente - Proyecto Cloud", date: "2024-01-22", time: "15:00", type: "meeting" },
    { id: 3, title: "Vencimiento SSL Certificado", date: "2024-01-25", time: "09:00", type: "deadline" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Calendario de Eventos</h1>
          <p className="text-slate-400 mt-2">Gestiona mantenimientos, reuniones y seguimientos</p>
        </div>
        <Button className="bg-cyan-600 hover:bg-cyan-700">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Evento
        </Button>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Enero 2024</CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-slate-700 bg-transparent">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-slate-700 bg-transparent">
                Hoy
              </Button>
              <Button size="sm" variant="outline" className="border-slate-700 bg-transparent">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
              <div key={day} className="text-center text-sm font-semibold text-slate-400 py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => (
              <div
                key={i}
                className="aspect-square border border-slate-700 rounded-lg p-2 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <div className="text-sm text-slate-400">{(i % 31) + 1}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Próximos Eventos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
              <div>
                <h4 className="text-white font-medium">{event.title}</h4>
                <p className="text-sm text-slate-400">
                  {event.date} - {event.time}
                </p>
              </div>
              <Badge className="bg-cyan-600">{event.type}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
