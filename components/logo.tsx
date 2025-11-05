import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "default" | "minimal"
}

export function Logo({ className, variant = "default" }: LogoProps) {
  if (variant === "minimal") {
    return (
      <div className={cn("relative", className)}>
        <Image
          src="/logo-minimal.png"
          alt="SATURNO Logo"
          width={60}
          height={60}
          className="object-contain w-auto"
          priority
        />
      </div>
    )
  }

  return (
    <div className={cn("relative flex items-center gap-2", className)}>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/light-logoWHI-U4g3b0uwpZ2MefpUxtA4JDuq0yC2Fh.png"
        alt="SATURNO Logo"
        width={180}
        height={60}
        className="object-contain w-auto"
        priority
      />
    </div>
  )
}
