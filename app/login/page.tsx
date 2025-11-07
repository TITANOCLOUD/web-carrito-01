"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [returnTo, setReturnTo] = useState("/")
  const [showTempCode, setShowTempCode] = useState(false)
  const [tempCode, setTempCode] = useState("")
  const [generatedCode, setGeneratedCode] = useState("")
  const [codeExpiry, setCodeExpiry] = useState("")

  useEffect(() => {
    const returnUrl = searchParams.get("returnTo")
    if (returnUrl) {
      setReturnTo(returnUrl)
    }
  }, [searchParams])

  const handleGenerateCode = async () => {
    if (!username) {
      setError("Ingrese su nombre de usuario primero")
      return
    }

    try {
      const response = await fetch("/api/auth/generate-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setGeneratedCode(data.code)
        setCodeExpiry(data.expiresIn)
        setError("")
      } else {
        setError(data.message || "Error al generar código")
      }
    } catch (err) {
      setError("Error al conectar con el servidor")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || (!password && !tempCode)) {
      setError("Por favor complete todos los campos")
      return
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password: showTempCode ? undefined : password,
          tempCode: showTempCode ? tempCode : undefined,
        }),
      })

      const data = await response.json()

      if (response.ok && data.authenticated) {
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("userToken", data.token)
        router.push(returnTo)
        setTimeout(() => {
          window.location.href = returnTo
        }, 100)
      } else {
        setError(data.message || "Credenciales incorrectas")
      }
    } catch (err) {
      setError("Error al conectar con el servidor. Intente nuevamente.")
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero with Background Image */}
      <div className="hidden lg:flex lg:w-3/5 relative bg-slate-950 items-center justify-center p-12 overflow-hidden">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uqzWRkXZqo1Emsmbx3RUfYg3REOYkP.png"
          alt="Login Background"
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/40 to-blue-950/40" />

        <div className="relative z-10 max-w-2xl text-center lg:text-left">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">AI</span> <span className="text-cyan-400">+</span>{" "}
            <span className="text-white">Innovation</span> <span className="text-cyan-400">+</span>{" "}
            <span className="text-white">Development</span> <span className="text-cyan-400">=</span>
          </h1>
          <h2 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="text-cyan-400">Building</span>{" "}
            <span className="text-white">the Next Era of Cloud Technology</span>
          </h2>

          <div className="flex items-center gap-3 mt-16 justify-center lg:justify-start">
            <span className="text-slate-300 text-lg">Powered By</span>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/light-logoWHI-U4g3b0uwpZ2MefpUxtA4JDuq0yC2Fh.png"
              alt="Titano Cloud Developer"
              width={220}
              height={70}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-2/5 flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md mb-12">
          <div className="flex items-center justify-center mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen14-iOqrZUcVQtbyBOYH9Ywjt9HAsmSKXd.png"
              alt="SATURNO"
              width={200}
              height={50}
              className="object-contain"
            />
          </div>
        </div>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Bienvenido</h2>
            <p className="text-gray-600">Por favor Inicia sesión para continuar.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 font-medium">
                Usuario
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Ingrese el usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-12 bg-slate-50 border-slate-300"
                required
              />
            </div>

            {!showTempCode ? (
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingrese la contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 bg-slate-50 border-slate-300"
                  required
                />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="tempCode" className="text-gray-700 font-medium">
                    Código Temporal
                  </Label>
                  <Input
                    id="tempCode"
                    type="text"
                    placeholder="Ingrese el código de 6 dígitos"
                    value={tempCode}
                    onChange={(e) => setTempCode(e.target.value)}
                    className="w-full h-12 bg-slate-50 border-slate-300"
                    maxLength={6}
                    required
                  />
                </div>

                {generatedCode && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-800 mb-2">Código temporal generado:</p>
                    <p className="text-3xl font-mono font-bold text-green-700 text-center tracking-widest">
                      {generatedCode}
                    </p>
                    <p className="text-xs text-green-600 text-center mt-2">Válido hasta: {codeExpiry}</p>
                  </div>
                )}

                <Button
                  type="button"
                  onClick={handleGenerateCode}
                  variant="outline"
                  className="w-full border-cyan-300 text-cyan-600 hover:bg-cyan-50 bg-transparent"
                >
                  Generar Nuevo Código
                </Button>
              </>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-6 text-lg font-semibold rounded-lg"
            >
              Iniciar sesión
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowTempCode(!showTempCode)}
                className="text-sm text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
              >
                {showTempCode ? "Usar contraseña normal" : "Usar código temporal"}
              </button>
            </div>

            <div className="text-center">
              <a href="#" className="text-sm text-slate-600 hover:text-cyan-600 transition-colors">
                ¿Olvidó la contraseña?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
