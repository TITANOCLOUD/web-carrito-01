import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AssistantWidget } from "@/components/assistant-widget"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tienda Virtual de Titanocloud | Infraestructura Cloud de Alto Rendimiento",
  description:
    "Desarrollamos una infraestructura cloud de alto rendimiento que combina potencia, estabilidad y flexibilidad para entornos empresariales modernos. VPS, Bare Metal, Kubernetes y más.",
  generator: "Titanocloud",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  keywords: [
    "cloud",
    "VPS",
    "bare metal",
    "kubernetes",
    "infraestructura",
    "hosting",
    "servidores dedicados",
    "titanocloud",
  ],
  authors: [{ name: "Titanocloud" }],
  openGraph: {
    title: "Tienda Virtual de Titanocloud",
    description: "Infraestructura cloud de alto rendimiento para entornos empresariales modernos",
    type: "website",
    locale: "es_MX",
    siteName: "Titanocloud",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tienda Virtual de Titanocloud",
    description: "Infraestructura cloud de alto rendimiento para entornos empresariales modernos",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        <Header />
        {children}
        <Footer />
        <AssistantWidget />
        <Analytics />
      </body>
    </html>
  )
}
