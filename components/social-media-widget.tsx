"use client"

import { Facebook, Instagram, Linkedin } from "lucide-react"

export function SocialMediaWidget() {
  const socials = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/titanocloud",
      icon: Facebook,
      color: "hover:bg-blue-600",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/titano-cloud",
      icon: Linkedin,
      color: "hover:bg-blue-700",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/titanocloudlatam/",
      icon: Instagram,
      color: "hover:bg-pink-600",
      badge: "LATAM",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/titanocloud/",
      icon: Instagram,
      color: "hover:bg-pink-600",
      badge: "Global",
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@titanocloud",
      icon: null,
      iconUrl: "/tiktok-icon.svg",
      color: "hover:bg-black",
    },
  ]

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center transition-all duration-300 shadow-lg ${social.color} hover:scale-110 hover:border-cyan-400 group relative`}
          aria-label={`${social.name} ${social.badge || ""}`}
        >
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
          <span className="absolute left-full ml-3 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {social.name} {social.badge && `(${social.badge})`}
          </span>
        </a>
      ))}
    </div>
  )
}
