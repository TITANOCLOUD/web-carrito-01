import { NextResponse } from "next/server"

export const runtime = "edge"
export const revalidate = 300

interface SocialActivity {
  platform: string
  hasNewContent: boolean
  lastActivity?: string
  contentCount?: number
  contentId?: string
}

// En lugar de hacer fetch, retornamos configuración mock hasta que se implemente base de datos
async function getConfig() {
  try {
    // TODO: Implementar lectura desde base de datos (Supabase/KV)
    // Por ahora retornamos null para usar datos simulados
    return null
  } catch (error) {
    console.error("[v0] Error getting config:", error)
    return null
  }
}

function generateContentId(platform: string, timestamp: string): string {
  return `${platform}-${new Date(timestamp).getTime()}`
}

async function checkFacebookActivity(config: any): Promise<SocialActivity> {
  if (!config || !config.facebook?.enabled || !config.facebook?.accessToken) {
    const mockDate = new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString()
    return {
      platform: "facebook",
      hasNewContent: Math.random() > 0.5,
      lastActivity: mockDate,
      contentId: generateContentId("facebook", mockDate),
    }
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${config.facebook.pageId}/posts?fields=created_time&limit=1&access_token=${config.facebook.accessToken}`,
    )
    const data = await response.json()

    if (data.data && data.data.length > 0) {
      const lastPost = data.data[0]
      const postTime = new Date(lastPost.created_time)
      const now = new Date()
      const hoursDiff = (now.getTime() - postTime.getTime()) / (1000 * 60 * 60)

      return {
        platform: "facebook",
        hasNewContent: hoursDiff < 48,
        lastActivity: lastPost.created_time,
        contentId: generateContentId("facebook", lastPost.created_time),
      }
    }
  } catch (error) {
    console.error("[v0] Error checking Facebook:", error)
  }

  return { platform: "facebook", hasNewContent: false }
}

async function checkInstagramActivity(config: any): Promise<SocialActivity> {
  if (!config || !config.instagram?.enabled || !config.instagram?.accessToken) {
    const mockDate = new Date(Date.now() - Math.random() * 36 * 60 * 60 * 1000).toISOString()
    return {
      platform: "instagram",
      hasNewContent: Math.random() > 0.6,
      lastActivity: mockDate,
      contentId: generateContentId("instagram", mockDate),
    }
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/${config.instagram.userId}/media?fields=timestamp&limit=1&access_token=${config.instagram.accessToken}`,
    )
    const data = await response.json()

    if (data.data && data.data.length > 0) {
      const lastPost = data.data[0]
      const postTime = new Date(lastPost.timestamp)
      const now = new Date()
      const hoursDiff = (now.getTime() - postTime.getTime()) / (1000 * 60 * 60)

      return {
        platform: "instagram",
        hasNewContent: hoursDiff < 48,
        lastActivity: lastPost.timestamp,
        contentId: generateContentId("instagram", lastPost.timestamp),
      }
    }
  } catch (error) {
    console.error("[v0] Error checking Instagram:", error)
  }

  return { platform: "instagram", hasNewContent: false }
}

async function checkLinkedInActivity(config: any): Promise<SocialActivity> {
  const mockDate = new Date(Date.now() - Math.random() * 48 * 60 * 60 * 1000).toISOString()
  return {
    platform: "linkedin",
    hasNewContent: Math.random() > 0.7,
    lastActivity: mockDate,
    contentId: generateContentId("linkedin", mockDate),
  }
}

async function checkTikTokActivity(config: any): Promise<SocialActivity> {
  const mockDate = new Date(Date.now() - Math.random() * 12 * 60 * 60 * 1000).toISOString()
  return {
    platform: "tiktok",
    hasNewContent: Math.random() > 0.8,
    lastActivity: mockDate,
    contentId: generateContentId("tiktok", mockDate),
  }
}

export async function GET() {
  try {
    const config = await getConfig()

    const activities: SocialActivity[] = await Promise.all([
      checkFacebookActivity(config),
      checkInstagramActivity(config),
      checkLinkedInActivity(config),
      checkTikTokActivity(config),
    ])

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
