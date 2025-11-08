import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { events } = await req.json()

    if (!Array.isArray(events)) {
      return NextResponse.json({ error: "events must be an array" }, { status: 400 })
    }

    // Log events (in production, store in Redis/DB)
    console.log("[Tracking] Received", events.length, "events")

    // TODO: Store in Redis or database
    // await redis.rpush(`events:${sessionId}`, JSON.stringify(event))

    return NextResponse.json({ ok: true, received: events.length })
  } catch (error) {
    console.error("[Tracking] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
