"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Pencil, Mail, Phone } from "lucide-react"

export default function PerfilPage() {
  const userInfo = {
    name: "Juan Camilo Chavez",
    email: "juan.chaves@titanocloud.com",
    phone: "3164869746",
    birthDate: "",
    gender: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "Colombia",
    },
    password: "Nunca se ha cambiado",
    twoFactorEnabled: false,
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Avatar */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative mb-4">
            <Avatar className="w-32 h-32 border-4 border-emerald-500">
              <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Juan Camilo" />
              <AvatarFallback className="bg-slate-700 text-white text-4xl">JC</AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Juan Camilo</h1>
          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{userInfo.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{userInfo.phone}</span>
              <button className="text-cyan-400 hover:text-cyan-300">
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Información Personal */}
          <Card className="bg-slate-800 border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Información Personal</h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between group">
                <div className="flex-1">
                  <Label className="text-slate-400 text-sm">Nombre</Label>
                  <p className="text-white font-medium mt-1">{userInfo.name}</p>
                </div>
                <button className="text-cyan-400 hover:text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Pencil className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between group">
                <div className="flex-1">
                  <Label className="text-slate-400 text-sm">Fecha de Nacimiento</Label>
                  <p className="text-white font-medium mt-1">-</p>
                </div>
                <button className="text-cyan-400 hover:text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Pencil className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between group">
                <div className="flex-1">
                  <Label className="text-slate-400 text-sm">Género</Label>
                  <p className="text-white font-medium mt-1">-</p>
                </div>
                <button className="text-cyan-400 hover:text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Pencil className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between group">
                <div className="flex-1">
                  <Label className="text-slate-400 text-sm">Dirección</Label>
                  <p className="text-white font-medium mt-1">
                    {userInfo.address.street || "-"}, {userInfo.address.city || "-"}, {userInfo.address.state || "-"},{" "}
                    {userInfo.address.country}
                  </p>
                </div>
                <button className="text-cyan-400 hover:text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>

          {/* Configuración de la Cuenta */}
          <Card className="bg-slate-800 border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Configuración de la Cuenta</h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between group">
                <div className="flex-1">
                  <Label className="text-slate-400 text-sm">Contraseña</Label>
                  <p className="text-white font-medium mt-1">{userInfo.password}</p>
                </div>
                <button className="text-cyan-400 hover:text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Pencil className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label className="text-slate-400 text-sm">2FA</Label>
                  <p className="text-white font-medium mt-1">No activos</p>
                </div>
                <Button variant="link" className="text-cyan-400 hover:text-cyan-300 p-0 h-auto font-normal">
                  Activar
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label className="text-slate-400 text-sm">Usuarios</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar className="w-8 h-8 border-2 border-emerald-500">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-slate-700 text-white text-xs">JC</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-8 h-8 border-2 border-pink-500">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-pink-600 text-white text-xs">MG</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-8 h-8 border-2 border-blue-500">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-blue-600 text-white text-xs">AR</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <span className="text-xs bg-cyan-600 px-3 py-1 rounded text-white font-medium">Pronto!</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
