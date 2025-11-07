"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

const sanitizeInput = (input: string): string => {
  // Remove SQL injection patterns
  const sqlPatterns =
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT|JAVASCRIPT)\b|--|;|'|"|<|>|\/\*|\*\/)/gi
  return input.replace(sqlPatterns, "").trim()
}

const validatePassword = (password: string): { valid: boolean; message: string } => {
  if (password.length < 8) {
    return { valid: false, message: "La contraseña debe tener al menos 8 caracteres" }
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "La contraseña debe contener al menos una mayúscula" }
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "La contraseña debe contener al menos una minúscula" }
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "La contraseña debe contener al menos un número" }
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { valid: false, message: "La contraseña debe contener al menos un carácter especial" }
  }
  return { valid: true, message: "" }
}

const detectMaliciousInput = (input: string): boolean => {
  const maliciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i,
    /eval\(/i,
    /expression\(/i,
    /vbscript:/i,
    /\.\.\/|\.\.\\/, // Path traversal
    /\bor\b.*=.*\bor\b/i, // SQL injection
    /\bunion\b.*\bselect\b/i, // SQL injection
  ]

  return maliciousPatterns.some((pattern) => pattern.test(input))
}

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [returnTo, setReturnTo] = useState("/")
  const [attempts, setAttempts] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)

  useEffect(() => {
    const returnUrl = searchParams.get("returnTo")
    if (returnUrl) {
      setReturnTo(returnUrl)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isBlocked) {
      setError("Demasiados intentos fallidos. Por favor, espere 5 minutos.")
      return
    }

    if (detectMaliciousInput(username) || detectMaliciousInput(password)) {
      setError("Entrada inválida detectada. Por favor, use solo caracteres alfanuméricos.")
      setAttempts((prev) => prev + 1)
      if (attempts >= 4) {
        setIsBlocked(true)
        setTimeout(() => setIsBlocked(false), 300000) // 5 minutes
      }
      return
    }

    const cleanUsername = sanitizeInput(username)
    const cleanPassword = sanitizeInput(password)

    if (cleanUsername.length < 3) {
      setError("El nombre de usuario debe tener al menos 3 caracteres")
      return
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: cleanUsername,
          password: cleanPassword,
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
        setError(data.message || "Usuario o contraseña incorrectos")
        setAttempts((prev) => prev + 1)

        if (attempts >= 4) {
          setIsBlocked(true)
          setTimeout(() => {
            setIsBlocked(false)
            setAttempts(0)
          }, 300000) // 5 minutes
        }
      }
    } catch (err) {
      setError("Error al conectar con el servidor. Intente nuevamente.")
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero */}
      <div className="hidden lg:flex lg:w-3/5 relative bg-slate-950 items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10" />
        <Image
          src="/futuristic-cyborg-robot-standing-in-server-room-wi.jpg"
          alt="Futuristic Background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl font-bold mb-6 text-white">
            AI <span className="text-cyan-400">+</span> Innovation <span className="text-cyan-400">+</span> Development{" "}
            <span className="text-cyan-400">=</span>
          </h1>
          <h2 className="text-6xl font-bold text-cyan-400 mb-8">Building the Next Era of Cloud Technology</h2>
          <div className="flex items-center gap-3 mt-12">
            <span className="text-slate-400">Powered by</span>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/light-logoWHI-U4g3b0uwpZ2MefpUxtA4JDuq0yC2Fh.png"
              alt="Titano Cloud Developer"
              width={200}
              height={60}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Bienvenido a Titanocloud</h2>
            <p className="mt-2 text-gray-600">
              Inicia sesión para acceder a Loise AI y recibir recomendaciones personalizadas.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">
                Usuario
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Ingrese el usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
                required
                disabled={isBlocked}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Ingrese la contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
                disabled={isBlocked}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-6 text-lg font-semibold"
              disabled={isBlocked}
            >
              {isBlocked ? "Bloqueado temporalmente" : "Iniciar Sesión"}
            </Button>

            <div className="text-center space-y-2">
              <a href="#" className="text-sm text-cyan-600 hover:underline block">
                ¿Olvidó la contraseña?
              </a>
              <p className="text-sm text-gray-600">
                ¿No tienes cuenta?{" "}
                <a href="/contacto" className="text-cyan-600 hover:underline font-semibold">
                  Regístrate aquí
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
