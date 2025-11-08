import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), "data", "cloud-status.json")

    if (!fs.existsSync(dataPath)) {
      console.log("[v0] cloud-status.json no existe, usando datos mock")
      return NextResponse.json({
        updatedAt: Date.now(),
        services: generateMockData(),
      })
    }

    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"))
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error reading cloud status:", error)
    return NextResponse.json({
      updatedAt: Date.now(),
      services: generateMockData(),
    })
  }
}

function generateMockData() {
  const providers = [
    { slug: "aws", name: "Amazon Web Services", domain: "downdetector.com" },
    { slug: "azure", name: "Microsoft Azure", domain: "downdetector.com" },
    { slug: "google-cloud", name: "Google Cloud", domain: "downdetector.com" },
    { slug: "oracle-cloud", name: "Oracle Cloud", domain: "downdetector.com" },
    { slug: "huawei-cloud", name: "Huawei Cloud", domain: "downdetector.com" },
    { slug: "alibaba-cloud", name: "Alibaba Cloud", domain: "downdetector.com" },
    { slug: "ovhcloud", name: "OVHcloud", domain: "downdetector.com" },
    { slug: "vultr", name: "Vultr", domain: "downdetector.com" },
    { slug: "linode", name: "Linode", domain: "downdetector.com" },
  ]

  return providers.map((p) => ({
    domain: p.domain,
    service: p.name,
    slug: p.slug,
    reports: Math.floor(Math.random() * 100),
    status: Math.random() > 0.7 ? "Degradado" : "Operacional",
    lastChecked: new Date().toISOString(),
  }))
}
