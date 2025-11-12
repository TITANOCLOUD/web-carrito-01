import { type NextRequest, NextResponse } from "next/server"
import ovh from "ovh"

const client = ovh({
  endpoint: "ovh-eu",
  appKey: "4561ecddab9b4726",
  appSecret: "052737af6236a51c2a8c729e5d7424d6",
  consumerKey: "8d973a9982c42c6f80f86aeb02c48b81",
})

export async function POST(request: NextRequest) {
  try {
    const { serviceName, type, ipToAllow, ttl } = await request.json()

    const task = await client.request("POST", `/dedicated/server/${serviceName}/features/ipmi/access`, {
      type: type || "kvmipHtml5URL",
      ipToAllow: ipToAllow || null,
      ttl: ttl || 60,
    })

    console.log("[v0] IPMI access requested:", { serviceName, type, taskId: task.taskId })

    return NextResponse.json({ success: true, task })
  } catch (error: any) {
    console.error("[v0] Error requesting IPMI access:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const serviceName = searchParams.get("serviceName")
    const type = searchParams.get("type") || "kvmipHtml5URL"

    if (!serviceName) {
      return NextResponse.json({ error: "serviceName required" }, { status: 400 })
    }

    const access = await client.request("GET", `/dedicated/server/${serviceName}/features/ipmi/access`, {
      type,
    })

    console.log("[v0] IPMI access retrieved:", { serviceName, type })

    return NextResponse.json({ success: true, access })
  } catch (error: any) {
    console.error("[v0] Error getting IPMI access:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}
