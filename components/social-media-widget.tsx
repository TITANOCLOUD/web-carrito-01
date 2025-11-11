"use client"

import { Facebook, Instagram, Linkedin } from "lucide-react"
import { useEffect, useState } from "react"

interface SocialActivity {
  platform: string
  hasNewContent: boolean
  lastActivity?: string
}

export function SocialMediaWidget() {
  const [isHovered, setIsHovered] = useState(false)
  const [hasActivity, setHasActivity] = useState(false)
  const [activeNetworks, setActiveNetworks] = useState<string[]>([])

  useEffect(() => {
    const checkSocialActivity = async () => {
      try {
        const response = await fetch("/api/social-activity")
        const data = await response.json()

        if (data.success && data.hasActivity) {
          setHasActivity(true)
          const active = data.activities
            .filter((activity: SocialActivity) => activity.hasNewContent)
            .map((activity: SocialActivity) => activity.platform)
          setActiveNetworks(active)
        } else {
          setHasActivity(false)
        }
      } catch (error) {
        console.error("Error fetching social activity:", error)
        setHasActivity(false)
      }
    }

    checkSocialActivity()
    const interval = setInterval(checkSocialActivity, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const isVisible = hasActivity || isHovered

  const socials = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/titanocloud",
      icon: Facebook,
      color: "hover:bg-blue-600",
      platform: "facebook",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/titano-cloud",
      icon: Linkedin,
      color: "hover:bg-blue-700",
      platform: "linkedin",
    },
    {
      name: "Instagram LATAM",
      url: "https://www.instagram.com/titanocloudlatam/",
      icon: Instagram,
      color: "hover:bg-pink-600",
      badge: "LATAM",
      platform: "instagram-latam",
    },
    {
      name: "Instagram Global",
      url: "https://www.instagram.com/titanocloud/",
      icon: Instagram,
      color: "hover:bg-pink-600",
      badge: "Global",
      platform: "instagram-global",
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@titanocloud",
      icon: null,
      color: "hover:bg-black",
      platform: "tiktok",
    },
  ]

  const displaySocials = isHovered ? socials : socials.filter((social) => activeNetworks.includes(social.platform))

  return (
    <>
      <div
        className="fixed left-0 bottom-20 w-20 h-64 z-40"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Widget visible */}
        <div
          className={`absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"
          }`}
        >
          {displaySocials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 rounded-full bg-slate-800/90 backdrop-blur-sm border-2 border-slate-700 flex items-center justify-center transition-all duration-300 shadow-lg ${social.color} hover:scale-110 hover:border-cyan-400 group relative`}
              aria-label={social.name}
            >
              {hasActivity && activeNetworks.includes(social.platform) && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-slate-900" />
              )}

              {social.icon ? (
                <social.icon className="w-5 h-5 text-white" />
              ) : (
                <div className="w-5 h-5 text-white">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </div>
              )}
              {social.badge && (
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-[8px] font-bold px-1 rounded-full">
                  {social.badge}
                </span>
              )}
              <span className="absolute left-full ml-3 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {social.name}
                {hasActivity && activeNetworks.includes(social.platform) && " - ¡Nuevo contenido!"}
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
