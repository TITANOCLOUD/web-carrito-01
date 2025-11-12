"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { User, Users, Globe, DollarSign, Moon, LogOut } from "lucide-react"
import Image from "next/image"

export function UserMenu() {
  const router = useRouter()
  const [darkMode, setDarkMode] = useState(true)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="w-10 h-10 border-2 border-emerald-500 cursor-pointer">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Juan Camilo" />
          <AvatarFallback className="bg-slate-700 text-white">JC</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72 bg-slate-900 border-slate-700 text-white p-4" align="end">
        <div className="flex flex-col items-center mb-4">
          <Avatar className="w-16 h-16 mb-3 border-2 border-emerald-500">
            <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Juan Camilo" />
            <AvatarFallback className="bg-slate-700 text-white text-xl">JC</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-lg">Juan Camilo</h3>
          <p className="text-sm text-slate-400">juan.chaves@titanocloud.com</p>
        </div>

        <DropdownMenuSeparator className="bg-slate-700 my-3" />

        <DropdownMenuItem
          className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-slate-800 rounded-lg"
          onClick={() => router.push("/dashboard/perfil")}
        >
          <User className="w-5 h-5 text-slate-400" />
          <span>Perfil</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-not-allowed opacity-60 rounded-lg">
          <Users className="w-5 h-5 text-slate-400" />
          <span>Usuarios</span>
          <span className="ml-auto text-xs bg-cyan-600 px-2 py-1 rounded">Pronto!</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center justify-between px-3 py-2.5 cursor-pointer hover:bg-slate-800 rounded-lg">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-slate-400" />
            <span>Idioma</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded">
            <span className="text-sm">Español</span>
            <Image src="/placeholder.svg?height=16&width=24" alt="ES" width={24} height={16} className="rounded" />
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center justify-between px-3 py-2.5 cursor-pointer hover:bg-slate-800 rounded-lg">
          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-slate-400" />
            <span>Divisa</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded">
            <span className="text-sm">USD</span>
            <Image src="/placeholder.svg?height=16&width=24" alt="USD" width={24} height={16} className="rounded" />
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center justify-between px-3 py-2.5 rounded-lg">
          <div className="flex items-center gap-3">
            <Moon className="w-5 h-5 text-slate-400" />
            <span>Modo Oscuro</span>
          </div>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} className="data-[state=checked]:bg-cyan-600" />
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-slate-700 my-3" />

        <DropdownMenuItem
          className="flex items-center justify-center px-3 py-2.5 cursor-pointer hover:bg-slate-800 rounded-lg border border-slate-700"
          onClick={() => {
            localStorage.removeItem("isAuthenticated")
            router.push("/login")
          }}
        >
          <LogOut className="w-5 h-5 mr-2 text-slate-400" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
