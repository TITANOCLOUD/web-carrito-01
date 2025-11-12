import { NextResponse } from "next/server"
import { getOVHLogs } from "@/lib/ovh-client"

export async function GET() {
  try {
    const logs = getOVHLogs(100)
    return NextResponse.json({ success: true, logs })
  } catch (error: any) {
    console.error("[v0] Error fetching OVH logs:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
