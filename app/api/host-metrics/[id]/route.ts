import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const searchParams = request.nextUrl.searchParams
  const range = searchParams.get("range") || "24h"

  const dataPoints =
    range === "1h"
      ? 60
      : range === "12h"
        ? 144
        : range === "24h"
          ? 288
          : range === "week"
            ? 168
            : range === "month"
              ? 720
              : 365

  const generateMetricData = () => {
    return Array.from({ length: dataPoints }, () => Math.random() * 100)
  }

  const metrics = {
    cpu: generateMetricData(),
    memory: generateMetricData(),
    disk: generateMetricData(),
    network: generateMetricData(),
    timestamps: Array.from({ length: dataPoints }, (_, i) => {
      const now = new Date()
      const minutes =
        range === "1h"
          ? i
          : range === "12h"
            ? i * 5
            : range === "24h"
              ? i * 5
              : range === "week"
                ? i * 60
                : range === "month"
                  ? i * 60
                  : i * 1440
      now.setMinutes(now.getMinutes() - (dataPoints - i) * minutes)
      return now.toISOString()
    }),
  }

  return NextResponse.json(metrics)
}
