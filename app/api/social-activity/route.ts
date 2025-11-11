import { NextResponse } from "next/server"

export const runtime = "edge"
export const revalidate = 300 // Revalidar cada 5 minutos

interface SocialActivity {
  platform: string
  hasNewContent: boolean
  lastActivity?: string
  contentCount?: number
}

async function checkInstagramActivity(username: string): Promise<boolean> {
  try {
    // Instagram no tiene API pública gratuita, pero podemos usar web scraping básico
    // o servicios de terceros. Por ahora simulamos la lógica
    const response = await fetch(`https://www.instagram.com/${username}/?__a=1`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    })

    if (response.ok) {
      // Si podemos acceder, asumimos que hay contenido reciente
      return true
    }
  } catch (error) {
    console.log("[v0] Error checking Instagram:", error)
  }
  return false
}

async function checkFacebookActivity(pageId: string): Promise<boolean> {
  try {
    // Facebook Graph API requiere token, por ahora usamos RSS si está disponible
    // o lógica alternativa
    return true // Placeholder
  } catch (error) {
    console.log("[v0] Error checking Facebook:", error)
  }
  return false
}

async function checkLinkedInActivity(companyName: string): Promise<boolean> {
  try {
    // LinkedIn no tiene API pública gratuita
    // Usaremos RSS feeds si están disponibles
    return true // Placeholder
  } catch (error) {
    console.log("[v0] Error checking LinkedIn:", error)
  }
  return false
}

async function checkTikTokActivity(username: string): Promise<boolean> {
  try {
    // TikTok tiene APIs limitadas
    return true // Placeholder
  } catch (error) {
    console.log("[v0] Error checking TikTok:", error)
  }
  return false
}

export async function GET() {
  try {
    const activities: SocialActivity[] = await Promise.all([
      checkFacebookActivity("titanocloud").then((hasNew) => ({
        platform: "facebook",
        hasNewContent: hasNew,
        lastActivity: hasNew ? new Date().toISOString() : undefined,
      })),
      checkLinkedInActivity("titano-cloud").then((hasNew) => ({
        platform: "linkedin",
        hasNewContent: hasNew,
        lastActivity: hasNew ? new Date().toISOString() : undefined,
      })),
      checkInstagramActivity("titanocloudlatam").then((hasNew) => ({
        platform: "instagram-latam",
        hasNewContent: hasNew,
        lastActivity: hasNew ? new Date().toISOString() : undefined,
      })),
      checkInstagramActivity("titanocloud").then((hasNew) => ({
        platform: "instagram-global",
        hasNewContent: hasNew,
        lastActivity: hasNew ? new Date().toISOString() : undefined,
      })),
      checkTikTokActivity("titanocloud").then((hasNew) => ({
        platform: "tiktok",
        hasNewContent: hasNew,
        lastActivity: hasNew ? new Date().toISOString() : undefined,
      })),
    ])

    // Verificar si hay alguna actividad reciente
    const hasAnyActivity = activities.some((activity) => activity.hasNewContent)

    return NextResponse.json({
      success: true,
      hasActivity: hasAnyActivity,
      activities,
      checkedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Error checking social activity:", error)
    return NextResponse.json({ success: false, error: "Failed to check social activity" }, { status: 500 })
  }
}
