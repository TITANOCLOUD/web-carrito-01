import { type NextRequest, NextResponse } from "next/server"
import ovh from "ovh"

const client = ovh({
  endpoint: "ovh-eu",
  appKey: "4561ecddab9b4726",
  appSecret: "052737af6236a51c2a8c729e5d7424d6",
  consumerKey: "8d973a9982c42c6f80f86aeb02c48b81",
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const serviceName = searchParams.get("serviceName")

    if (!serviceName) {
      return NextResponse.json({ error: "serviceName required" }, { status: 400 })
    }

    const ipmiStatus = await client.request("GET", `/dedicated/server/${serviceName}/features/ipmi`)

    return NextResponse.json({ success: true, ipmi: ipmiStatus })
  } catch (error: any) {
    console.error("[v0] Error getting IPMI status:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { serviceName, action } = await request.json()

    if (action === "resetSessions") {
      const task = await client.request("POST", `/dedicated/server/${serviceName}/features/ipmi/resetSessions`)

      console.log("[v0] IPMI sessions reset:", { serviceName, taskId: task.taskId })

      return NextResponse.json({ success: true, task })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error: any) {
    console.error("[v0] Error resetting IPMI sessions:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}
