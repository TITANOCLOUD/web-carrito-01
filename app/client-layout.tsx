"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AssistantWidget } from "@/components/assistant-widget"
import { SocialMediaWidget } from "@/components/social-media-widget"

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const hideHeaderFooter = pathname?.startsWith("/dashboard") || pathname?.startsWith("/login")

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
      <AssistantWidget />
      <SocialMediaWidget />
    </>
  )
}

export default ClientLayout
