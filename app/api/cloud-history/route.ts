import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")

    const historyPath = path.join(process.cwd(), "data", "cloud-history.json")

    if (!fs.existsSync(historyPath)) {
      return NextResponse.json({})
    }

    const history = JSON.parse(fs.readFileSync(historyPath, "utf-8"))

    // Si se solicita un slug específico, devolver solo ese
    if (slug) {
      const filtered: Record<string, any> = {}
      Object.keys(history).forEach((key) => {
        if (key.startsWith(`${slug}_`)) {
          filtered[key] = history[key]
        }
      })
      return NextResponse.json(filtered)
    }

    return NextResponse.json(history)
  } catch (error) {
    console.error("Error reading cloud history:", error)
    return NextResponse.json({ error: "Error al obtener el histórico" }, { status: 500 })
  }
}
