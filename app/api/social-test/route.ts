import { type NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(request: NextRequest) {
  try {
    const platform = request.nextUrl.searchParams.get("platform")
    const config = await request.json()

    console.log(`[v0] Testing ${platform} connection...`)

    switch (platform) {
      case "facebook":
        return await testFacebook(config)
      case "instagram":
        return await testInstagram(config)
      case "linkedin":
        return await testLinkedIn(config)
      case "tiktok":
        return await testTikTok(config)
      case "youtube":
        return await testYouTube(config)
      default:
        return NextResponse.json({ success: false, error: "Platform no soportada" }, { status: 400 })
    }
  } catch (error) {
    console.error("[v0] Error testing connection:", error)
    return NextResponse.json({ success: false, error: "Error al probar conexión" }, { status: 500 })
  }
}

async function testFacebook(config: any) {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${config.pageId}?fields=name,posts.limit(1)&access_token=${config.accessToken}`,
    )
    const data = await response.json()

    if (data.error) {
      return NextResponse.json({ success: false, error: data.error.message })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error al conectar con Facebook" })
  }
}

async function testInstagram(config: any) {
  try {
    const response = await fetch(
      `https://graph.instagram.com/${config.userId}/media?fields=id,caption,timestamp&access_token=${config.accessToken}`,
    )
    const data = await response.json()

    if (data.error) {
      return NextResponse.json({ success: false, error: data.error.message })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error al conectar con Instagram" })
  }
}

async function testLinkedIn(config: any) {
  try {
    const response = await fetch(
      `https://api.linkedin.com/v2/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=${config.organizationId}`,
      {
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      },
    )
    const data = await response.json()

    if (data.status && data.status !== 200) {
      return NextResponse.json({ success: false, error: data.message })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error al conectar con LinkedIn" })
  }
}

async function testTikTok(config: any) {
  // TikTok API es más compleja y requiere OAuth 2.0
  return NextResponse.json({ success: true, message: "TikTok test - implementación pendiente" })
}

async function testYouTube(config: any) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${config.channelId}&key=${config.apiKey}`,
    )
    const data = await response.json()

    if (data.error) {
      return NextResponse.json({ success: false, error: data.error.message })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error al conectar con YouTube" })
  }
}
