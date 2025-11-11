import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Autenticación - Titano Cloud",
  description: "Acceso al panel de administración",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">{children}</div>
}
