import { NextResponse } from "next/server"
import * as cheerio from "cheerio"

const DOMAINS = [
  { domain: "downdetector.com", locale: "global" },
  { domain: "downdetector.ca", locale: "ca" },
  { domain: "downdetector.mx", locale: "mx" },
  { domain: "downdetector.pe", locale: "pe" },
  { domain: "downdetector.com.co", locale: "co" },
]

const CLOUD_SERVICES = [
  { slug: "aws", name: "Amazon Web Services" },
  { slug: "azure", name: "Microsoft Azure" },
  { slug: "google-cloud", name: "Google Cloud" },
  { slug: "oracle-cloud", name: "Oracle Cloud" },
  { slug: "huawei-cloud", name: "Huawei Cloud" },
  { slug: "alibaba-cloud", name: "Alibaba Cloud" },
  { slug: "ovhcloud", name: "OVHcloud" },
  { slug: "vultr", name: "Vultr" },
  { slug: "linode", name: "Linode" },
  { slug: "unihost", name: "Unihost" },
]

async function scrapeService(domain: string, locale: string, service: { slug: string; name: string }) {
  const url = `https://${domain}/status/${service.slug}/`

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language":
          locale === "mx"
            ? "es-MX"
            : locale === "pe"
              ? "es-PE"
              : locale === "co"
                ? "es-CO"
                : locale === "ca"
                  ? "en-CA"
                  : "en-US",
      },
      next: { revalidate: 0 }, // No cache
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Extract title/status text
    const titleText = $(".entry-title").first().text().trim() || $("h1").first().text().trim() || service.name

    // Check for outage indicators
    const bodyText = $("body").text().toLowerCase()
    const isDown =
      /outage|problems|issues|degraded|major|down/.test(titleText.toLowerCase()) ||
      /user reports indicate|problems at|is down/.test(bodyText)

    // Extract report counts from graph bars
    const bars: number[] = []
    $(".reports-graph__bar").each((_, el) => {
      const count = Number.parseInt($(el).attr("data-count") || "0")
      if (count > 0) bars.push(count)
    })

    // Get latest report count
    const reports = bars.length > 0 ? bars[bars.length - 1] : 0

    // Determine status
    let status = "Operacional"
    if (isDown || reports >= 200) {
      status = "Caído"
    } else if (reports >= 60) {
      status = "Degradado"
    }

    console.log(`[v0] Scrape ${domain}/${service.slug}: ${status} (${reports} reports)`)

    return {
      domain,
      service: service.name,
      slug: service.slug,
      reports,
      status,
      lastChecked: new Date().toISOString(),
      locale,
    }
  } catch (error: any) {
    console.error(`[v0] Error scraping ${domain}/${service.slug}:`, error.message)
    return {
      domain,
      service: service.name,
      slug: service.slug,
      reports: 0,
      status: "Error",
      lastChecked: new Date().toISOString(),
      locale,
    }
  }
}

export async function GET() {
  const results = []

  // Scrape all domains and services
  for (const { domain, locale } of DOMAINS) {
    for (const service of CLOUD_SERVICES) {
      const result = await scrapeService(domain, locale, service)
      results.push(result)
      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
  }

  return NextResponse.json({
    success: true,
    services: results,
    timestamp: new Date().toISOString(),
    totalScraped: results.length,
  })
}
