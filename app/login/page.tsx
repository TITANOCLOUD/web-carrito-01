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
      {/* Left Side - Hero with Video Background */}
      <div className="hidden lg:flex lg:w-3/5 relative bg-slate-950 items-center justify-center p-12 overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-50">
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0f39b7b7-2666-4ec8-a0bc-ad51b86ada0a-uOBsg3eV3kClunb3FBVE1TjSJZ0JIq.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/60 to-blue-950/60" />

        <div className="relative z-10 max-w-2xl text-center lg:text-left">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            AI <span className="text-cyan-400">+</span> Innovation <span className="text-cyan-400">+</span> Development{" "}
            <span className="text-cyan-400">=</span>
          </h1>
          <h2 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="text-cyan-400">Building</span> the Next Era of{" "}
            <span className="text-white">Cloud Technology</span>
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
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2 border-cyan-500" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-4 bg-cyan-500 rounded" />
              <div className="absolute -top-1 -right-1 w-8 h-8 border-2 border-cyan-400 rounded-full opacity-60" />
            </div>
            <span className="text-3xl font-bold text-slate-900 tracking-wide">SATURNO</span>
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
                disabled={isBlocked}
              />
            </div>

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
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-6 text-lg font-semibold rounded-lg"
              disabled={isBlocked}
            >
              {isBlocked ? "Bloqueado temporalmente" : "Iniciar sesión"}
            </Button>

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
