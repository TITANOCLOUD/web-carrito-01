import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ClientLayout } from "./client-layout"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Titano Cloud | Cloud Hosting con IA - Infraestructura Inteligente Global",
  description:
    "Cloud inteligente con IA integrada. Titano Cloud ofrece hosting NVMe, bare metal, VPS y soluciones cloud optimizadas por inteligencia artificial. Soporte 24/7 en español para LATAM y global.",
  generator: "Titano Cloud",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  keywords: [
    // AI & Machine Learning Keywords
    "AI hosting",
    "alojamiento con inteligencia artificial",
    "AI-powered hosting",
    "machine learning hosting",
    "IA cloud computing",
    "infraestructura cloud IA",
    "hosting con análisis predictivo",
    "AI optimization cloud",
    "alojamiento automatizado con IA",
    "hosting para modelos de IA",
    "GPU hosting",
    "servidores IA GPU",
    "IA empresarial en la nube",
    "machine learning servers",
    "AI DevOps hosting",
    "cloud inteligente México",
    "IA en cloud LATAM",
    "AI powered backup",
    "AI monitoring cloud",
    "AI automation hosting",

    // Core Hosting Keywords
    "web hosting",
    "alojamiento web",
    "hosting empresarial",
    "enterprise web hosting",
    "cloud hosting",
    "alojamiento en la nube",
    "VPS hosting",
    "alojamiento VPS",
    "servidor dedicado",
    "dedicated server hosting",
    "bare metal hosting",
    "alojamiento bare metal",
    "cluster hosting",
    "hosting gestionado",
    "managed hosting",
    "hosting WordPress",
    "hosting cPanel",
    "hosting SSD",
    "NVMe hosting",
    "alojamiento con NVMe",
    "hosting para ecommerce",
    "hosting profesional",

    // Advanced Infrastructure
    "bare metal servers",
    "servidores bare metal",
    "Ceph cluster hosting",
    "Proxmox hosting",
    "Kubernetes hosting",
    "container hosting",
    "docker hosting",
    "high performance hosting",
    "alojamiento de alto rendimiento",
    "HPC hosting",
    "big data hosting",
    "edge hosting",
    "hybrid cloud hosting",
    "nube híbrida",
    "multi-cloud hosting",
    "cloud native hosting",
    "hosting con balanceo de carga",

    // Competitor Comparisons
    "AWS hosting",
    "Azure hosting",
    "Oracle Cloud hosting",
    "OVHcloud hosting",
    "Alibaba Cloud hosting",
    "Huawei Cloud hosting",
    "AWS vs Azure",
    "AWS vs OVHcloud",
    "Azure vs Oracle Cloud",

    // Security & Compliance
    "hosting seguro",
    "secure web hosting",
    "DDoS protected hosting",
    "hosting con firewall avanzado",
    "backup hosting",
    "disaster recovery hosting",
    "hosting con SLA garantizado",
    "hosting ISO 27001 compliant",
    "GDPR compliant hosting",

    // Regional Keywords
    "cloud hosting México",
    "hosting LATAM",
    "alojamiento Latinoamérica",
    "data center México",
    "VPS cloud México",
    "bare metal México",
    "hosting con soporte en español",
    "cloud provider LATAM",

    // Long-tail Keywords
    "mejores proveedores de cloud hosting en Latinoamérica",
    "hosting con servidores NVMe dedicados",
    "alternativas a AWS y Azure en México",
    "cloud local con soporte 24/7 en español",
    "servidores bare metal con SLA garantizado",
    "servidores GPU cloud para IA",
    "hosting con firewall, backup y monitoreo",
    "hosting multinube para PyMES",
    "servidores dedicados en México y LATAM",
    "Ceph storage",
    "AI NVMe hosting",
    "Titano Cloud",
  ],
  authors: [{ name: "Titano Cloud" }],
  openGraph: {
    title: "Titano Cloud | Cloud Hosting con IA - Infraestructura Inteligente Global",
    description:
      "Soluciones cloud con inteligencia artificial. Hosting NVMe, bare metal, VPS y Ceph optimizado por IA con soporte 24/7 en español.",
    type: "website",
    locale: "es_MX",
    siteName: "Titano Cloud",
    images: [
      {
        url: "/datacenter-professional.png",
        width: 1200,
        height: 630,
        alt: "Infraestructura cloud con IA de Titano Cloud",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Titano Cloud | Cloud Hosting con IA - Infraestructura Inteligente",
    description:
      "Hosting optimizado con IA: servidores NVMe, bare metal, GPU y Ceph con soporte 24/7. Rendimiento y automatización inteligente.",
    images: ["/datacenter-professional.png"],
  },
  alternates: {
    canonical: "https://titanocloud.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Titano Cloud",
              url: "https://titanocloud.com",
              logo: "https://titanocloud.com/logo-minimal.png",
              description:
                "Cloud hosting con inteligencia artificial y servidores NVMe globales. Soporte 24/7 en español.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+52-55-XXXX-XXXX",
                contactType: "Soporte Técnico",
                availableLanguage: ["Spanish", "English"],
                areaServed: ["MX", "LATAM", "Global"],
              },
              sameAs: ["https://www.linkedin.com/company/titanocloud", "https://twitter.com/titanocloud"],
              department: {
                "@type": "Organization",
                name: "Titano Cloud AI Division",
                description: "Soluciones de IA aplicadas a infraestructura cloud y optimización de servidores.",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "AI Cloud Solutions",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI Cloud Hosting",
                      description: "Hosting inteligente con IA predictiva y automatización completa.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Bare Metal Servers",
                      description: "Servidores dedicados de alto rendimiento con tecnología NVMe.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "VPS Cloud",
                      description: "Servidores virtuales escalables con rendimiento garantizado.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI Backup & Recovery",
                      description: "Respaldo automatizado con inteligencia artificial y detección proactiva de fallos.",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  )
}
