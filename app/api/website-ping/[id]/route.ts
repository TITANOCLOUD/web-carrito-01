import { NextResponse } from "next/server"

export const runtime = "edge"

const websiteConfigs: Record<string, string> = {
  "web-titanocloud": "https://Titanocloud.com",
  "web-vimaferltda": "https://Vimaferltda.com",
  "web-controlonline": "https://controlonlineinternational.com",
  "web-gamechagers": "https://gamechagers.com.co",
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const websiteUrl = websiteConfigs[id]

  if (!websiteUrl) {
    return NextResponse.json({ error: "Website not found" }, { status: 404 })
  }

  try {
    const startTime = Date.now()
    const response = await fetch(websiteUrl, {
      method: "HEAD",
      redirect: "follow",
    })
    const responseTime = Date.now() - startTime

    return NextResponse.json({
      id,
      url: websiteUrl,
      responseTime,
      status: response.ok ? "online" : "warning",
      statusCode: response.status,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({
      id,
      url: websiteUrl,
      responseTime: 0,
      status: "offline",
      statusCode: 0,
      error: error instanceof Error ? error.message : "Connection failed",
      timestamp: new Date().toISOString(),
    })
  }
}
