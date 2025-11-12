import { NextResponse } from "next/server"
import { restartVPS, stopVPS, startVPS, restartServer } from "@/lib/ovh-client"

export async function POST(request: Request) {
  try {
    const { action, resourceType, resourceName } = await request.json()

    let result
    if (resourceType === "vps") {
      if (action === "restart") result = await restartVPS(resourceName, "admin")
      else if (action === "stop") result = await stopVPS(resourceName, "admin")
      else if (action === "start") result = await startVPS(resourceName, "admin")
    } else if (resourceType === "server") {
      if (action === "restart") result = await restartServer(resourceName, "admin")
    }

    return NextResponse.json({ success: true, result })
  } catch (error: any) {
    console.error("[v0] Error executing OVH action:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
