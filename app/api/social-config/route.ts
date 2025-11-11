import { type NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

// En producción, esto debería estar en una base de datos encriptada o variables de entorno
let socialConfig = {
  facebook: { enabled: false, appId: "", appSecret: "", accessToken: "", pageId: "" },
  instagram: { enabled: false, username: "", accessToken: "", userId: "" },
  linkedin: { enabled: false, clientId: "", clientSecret: "", accessToken: "", organizationId: "" },
  tiktok: { enabled: false, clientKey: "", clientSecret: "", accessToken: "" },
  youtube: { enabled: false, apiKey: "", channelId: "" },
}

export async function GET() {
  return NextResponse.json({ success: true, config: socialConfig })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    socialConfig = body

    console.log("[v0] Social config saved successfully")

    return NextResponse.json({ success: true, message: "Configuración guardada exitosamente" })
  } catch (error) {
    console.error("[v0] Error saving social config:", error)
    return NextResponse.json({ success: false, error: "Error al guardar configuración" }, { status: 500 })
  }
}
