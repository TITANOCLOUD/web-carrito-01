import { NextResponse } from "next/server"
import { getOVHVPS, ovhClient } from "@/lib/ovh-client"

export async function GET() {
  try {
    const vpsList = await getOVHVPS()

    // Get details for each VPS
    const vpsDetails = await Promise.all(
      vpsList.map(async (vpsName: string) => {
        try {
          const details = await ovhClient.requestPromised("GET", `/vps/${vpsName}`)
          return { name: vpsName, ...details }
        } catch (error) {
          console.error(`[v0] Error fetching details for ${vpsName}:`, error)
          return { name: vpsName, error: "Failed to fetch details" }
        }
      }),
    )

    return NextResponse.json({ success: true, vps: vpsDetails })
  } catch (error: any) {
    console.error("[v0] OVH VPS API Error:", error)
    return NextResponse.json({ success: false, error: error.message || "Failed to fetch VPS list" }, { status: 500 })
  }
}
