"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AssistantWidget } from "@/components/assistant-widget"
import { SocialMediaWidget } from "@/components/social-media-widget"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith("/dashboard")

  if (isDashboard) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
      <AssistantWidget />
      <SocialMediaWidget />
    </>
  )
}
