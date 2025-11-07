"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simple authentication without database
    if (username === "admin" && password === "Admin*2020") {
      // Save session
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("username", username)

      // Redirect to dashboard
      router.push("/dashboard")
    } else {
      setError("Usuario o contraseña incorrectos")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Background with Text */}
      <div
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-esnn5hS5fwdEtUmpGE9qS6QjYKZ4JH.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Top Section - Hero Text */}
          <div className="flex-1 flex flex-col justify-center space-y-6 max-w-2xl">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="text-white">AI</span>
              <span className="text-cyan-400"> + </span>
              <span className="text-white">Innovation</span>
              <span className="text-cyan-400"> + </span>
              <span className="text-white">Development</span>
              <span className="text-cyan-400"> = </span>
            </h1>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              <span className="text-cyan-400">Building </span>
              <span className="text-white">the Next Era of Cloud Technology</span>
            </h2>
          </div>

          {/* Bottom Section - Powered By */}
          <div className="flex items-center gap-3">
            <span className="text-white text-xl">Powered By</span>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-eiGyduSVZuYMm7sNTKMuHviRoHYRut.png"
                  alt="Titano Cloud"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-white text-2xl font-bold">
                <span>TITANO</span>
                <br />
                <span className="text-base">CLOUD</span>
                <span className="text-cyan-400">developer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#0a1628] p-8">
        <div className="w-full max-w-md space-y-8">
          {/* SATURNO Logo */}
          <div className="flex justify-center mb-12">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen14-iOqrZUcVQtbyBOYH9Ywjt9HAsmSKXd.png"
              alt="SATURNO"
              width={250}
              height={60}
              className="object-contain"
            />
          </div>

          {/* Welcome Text */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Bienvenido</h1>
            <p className="text-gray-400">Por favor Inicia sesión para continuar.</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">
                Usuario
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Ingrese el usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-[#0d1b2e] border-gray-700 text-white placeholder:text-gray-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Ingrese la contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#0d1b2e] border-gray-700 text-white placeholder:text-gray-500"
                required
              />
            </div>

            {error && <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">{error}</div>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-6 text-lg"
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>

          {/* Forgot Password Link */}
          <div className="text-center">
            <a href="/recuperar-password" className="text-cyan-400 hover:text-cyan-300 text-sm">
              ¿Olvidó la contraseña?
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
