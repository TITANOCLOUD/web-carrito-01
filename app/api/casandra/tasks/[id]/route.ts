import { NextResponse } from "next/server"

export const runtime = "edge"

export async function PATCH() {
  return NextResponse.json({ success: true })
}
