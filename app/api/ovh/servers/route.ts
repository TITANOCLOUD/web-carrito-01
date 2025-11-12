import { NextResponse } from "next/server"
import { getOVHDedicatedServers, ovhClient } from "@/lib/ovh-client"

export async function GET() {
  try {
    const serversList = await getOVHDedicatedServers()

    // Get details for each server
    const serverDetails = await Promise.all(
      serversList.map(async (serverName: string) => {
        try {
          const details = await ovhClient.requestPromised("GET", `/dedicated/server/${serverName}`)
          return { name: serverName, ...details }
        } catch (error) {
          console.error(`[v0] Error fetching details for ${serverName}:`, error)
          return { name: serverName, error: "Failed to fetch details" }
        }
      }),
    )

    return NextResponse.json({ success: true, servers: serverDetails })
  } catch (error: any) {
    console.error("[v0] OVH Servers API Error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch servers list" },
      { status: 500 },
    )
  }
}
