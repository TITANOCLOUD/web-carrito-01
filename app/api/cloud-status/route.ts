import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), "data", "cloud-status.json")

    if (!fs.existsSync(dataPath)) {
      return NextResponse.json({
        updatedAt: Date.now(),
        services: [],
      })
    }

    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"))
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error reading cloud status:", error)
    return NextResponse.json({ error: "Error al obtener el estado de los servicios cloud" }, { status: 500 })
  }
}
