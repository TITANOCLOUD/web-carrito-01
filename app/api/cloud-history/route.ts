import { NextResponse } from "next/server"

export const runtime = "edge"
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")

    const history = generateRealisticHistory(slug)

    return NextResponse.json(history)
  } catch (error) {
    console.error("[v0] Error in cloud-history API:", error)
    return NextResponse.json({ error: "Error fetching cloud history" }, { status: 500 })
  }
}

function generateRealisticHistory(slug: string | null) {
  const providers = slug
    ? [slug]
    : [
        "aws",
        "azure",
        "google-cloud",
        "oracle-cloud",
        "huawei-cloud",
        "alibaba-cloud",
        "ovhcloud",
        "vultr",
        "linode",
        "unihost",
      ]

  const domains = ["downdetector.com", "downdetector.mx", "downdetector.pe", "downdetector.ca", "downdetector.com.co"]

  const history: Record<string, any[]> = {}
  const now = Date.now()

  // Generar 48 puntos (últimas 4 horas, cada 5 minutos)
  const points = 48

  providers.forEach((p) => {
    domains.forEach((domain) => {
      const key = `${p}_${domain}`
      history[key] = []

      // Baseline de reportes para este proveedor
      const baseline = Math.floor(Math.random() * 30) + 10

      for (let i = points; i >= 0; i--) {
        const ts = now - i * 5 * 60 * 1000

        // Simular variabilidad natural con picos ocasionales
        let reports = baseline + Math.floor(Math.random() * 40)

        // 10% de probabilidad de pico
        if (Math.random() > 0.9) {
          reports += Math.floor(Math.random() * 200)
        }

        // Simular tendencia (subidas/bajadas)
        if (i < points / 2) {
          reports = Math.floor(reports * 0.7) // Tendencia a la baja
        }

        let status = "Operacional"
        if (reports >= 300) status = "Caído"
        else if (reports >= 100) status = "Degradado"

        history[key].push({
          ts,
          reports,
          status,
        })
      }
    })
  })

  return history
}
