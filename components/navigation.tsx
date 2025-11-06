"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const navItems = [
    { href: "/vps", label: "VPS" },
    { href: "/bare-metal", label: "Bare Metal" },
    { href: "/clusters", label: "Clusters" },
    { href: "/dominios", label: "Dominios" },
    { href: "/iac", label: "IAC" },
  ]

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">TITANO CLOUD</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <Button asChild>
          <Link href="/login">INGRESAR</Link>
        </Button>
      </div>
    </nav>
  )
}
