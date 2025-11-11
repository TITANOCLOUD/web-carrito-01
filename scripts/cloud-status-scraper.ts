import axios from "axios"
import * as cheerio from "cheerio"
import fs from "fs"
import path from "path"

const DATA_DIR = path.resolve(process.cwd(), "data")
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Dominios regionales de DownDetector
const DOWNDETECTOR_DOMAINS = [
  { domain: "downdetector.com", locale: "global", lang: "en-US" },
  { domain: "downdetector.ca", locale: "ca", lang: "en-CA" },
  { domain: "downdetector.mx", locale: "mx", lang: "es-MX" },
  { domain: "downdetector.pe", locale: "pe", lang: "es-PE" },
  { domain: "downdetector.com.co", locale: "co", lang: "es-CO" },
]

// Grandes proveedores Cloud
const CLOUD_PROVIDERS = [
  { slug: "aws", name: "Amazon Web Services", clearbit: "aws.amazon.com", outageReportSlug: "aws" },
  { slug: "azure", name: "Microsoft Azure", clearbit: "azure.microsoft.com", outageReportSlug: "azure" },
  { slug: "google-cloud", name: "Google Cloud", clearbit: "cloud.google.com", outageReportSlug: "google-cloud" },
  { slug: "oracle-cloud", name: "Oracle Cloud", clearbit: "oracle.com", outageReportSlug: "oracle-cloud" },
  { slug: "huawei-cloud", name: "Huawei Cloud", clearbit: "huawei.com", outageReportSlug: "huawei-cloud" },
  { slug: "alibaba-cloud", name: "Alibaba Cloud", clearbit: "alibabacloud.com", outageReportSlug: "alibaba-cloud" },
  { slug: "ovhcloud", name: "OVHcloud", clearbit: "ovhcloud.com", outageReportSlug: "ovh" },
  { slug: "vultr", name: "Vultr", clearbit: "vultr.com", outageReportSlug: "vultr" },
  { slug: "linode", name: "Linode", clearbit: "linode.com", outageReportSlug: "linode" },
  { slug: "unihost", name: "Unihost", clearbit: "unihost.com", outageReportSlug: "unihost" },
]

interface ScrapeResult {
  domain: string
  service: string
  slug: string
  reports: number
  status: "Operacional" | "Degradado" | "Caído" | "Error"
  lastChecked: string
  locale: string
  sources: {
    downdetector?: { reports: number; status: string }
    outageReport?: { reports: number; status: string }
    socialMedia?: { mentions: number; sentiment: string }
  }
}

async function scrapeOutageReport(provider: (typeof CLOUD_PROVIDERS)[0]): Promise<{
  reports: number
  status: string
  socialMedia?: { mentions: number; sentiment: string }
}> {
  const url = `https://outage.report/${provider.outageReportSlug}`

  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
      timeout: 15000,
    })

    const $ = cheerio.load(data)

    // Obtener número de reportes del contenido principal
    let reports = 0
    const reportText = $(".text-center, .report-count, .stats-number").text()
    const reportMatch = reportText.match(/(\d+)\s*(reports?|reportes?|problemas?)/i)
    if (reportMatch) {
      reports = Number.parseInt(reportMatch[1])
    }

    // Buscar indicadores de estado en el título y contenido
    const pageText = $("body").text().toLowerCase()
    let status = "Operacional"

    if (
      pageText.includes("major outage") ||
      pageText.includes("outage") ||
      pageText.includes("down") ||
      pageText.includes("not working")
    ) {
      status = "Caído"
    } else if (pageText.includes("problems") || pageText.includes("issues") || pageText.includes("degraded")) {
      status = "Degradado"
    }

    let socialMedia = undefined
    const twitterText = $(".twitter, .social-media, [class*='social']").text()
    const mentionsMatch = twitterText.match(/(\d+)\s*(tweets?|posts?|mentions?)/i)
    if (mentionsMatch) {
      const mentions = Number.parseInt(mentionsMatch[1])
      const sentiment = pageText.includes("angry") || pageText.includes("frustrated") ? "negative" : "neutral"
      socialMedia = { mentions, sentiment }
    }

    console.log(`  [Outage.Report] ${provider.name}: ${status} (${reports} reportes)`)
    return { reports, status, socialMedia }
  } catch (error) {
    console.error(`  [Outage.Report] Error scraping ${provider.name}:`, error instanceof Error ? error.message : "")
    return { reports: 0, status: "Error" }
  }
}

// Función para scrapear DownDetector
async function scrapeDownDetector(
  domainInfo: (typeof DOWNDETECTOR_DOMAINS)[0],
  provider: (typeof CLOUD_PROVIDERS)[0],
): Promise<{ reports: number; status: string }> {
  const url = `https://${domainInfo.domain}/status/${provider.slug}/`

  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "Accept-Language": domainInfo.lang,
      },
      timeout: 15000,
    })

    const $ = cheerio.load(data)

    // Obtener el título de estado
    const title = $(".entry-title").first().text().trim()

    // Detectar si hay problemas
    const isDown = /outage|problems|issues|down|degraded|major/i.test(title)

    // Obtener reportes de las barras del gráfico
    const bars: number[] = []
    $(".reports-graph__bar").each((_, el) => {
      const count = Number.parseInt($(el).attr("data-count") || "0")
      bars.push(count)
    })

    const reports = bars.length > 0 ? bars[bars.length - 1] : 0

    // Determinar estado
    let status = "Operacional"
    if (reports >= 300) {
      status = "Caído"
    } else if (reports >= 100 || isDown) {
      status = "Degradado"
    }

    return { reports, status }
  } catch (error) {
    console.error(`  [DownDetector] Error scraping ${provider.name}:`, error instanceof Error ? error.message : "")
    return { reports: 0, status: "Error" }
  }
}

async function scrapeServiceConsolidated(
  domainInfo: (typeof DOWNDETECTOR_DOMAINS)[0],
  provider: (typeof CLOUD_PROVIDERS)[0],
): Promise<ScrapeResult> {
  console.log(`  Scraping ${provider.name} en ${domainInfo.domain}...`)

  // Scrapear DownDetector
  const downdetectorData = await scrapeDownDetector(domainInfo, provider)

  // Solo en el dominio global, scrapear también Outage.Report
  let outageReportData = undefined
  let socialMedia = undefined
  if (domainInfo.locale === "global") {
    const outageData = await scrapeOutageReport(provider)
    outageReportData = { reports: outageData.reports, status: outageData.status }
    socialMedia = outageData.socialMedia
  }

  // Consolidar datos: priorizar la peor situación detectada
  const allReports = [downdetectorData.reports, outageReportData?.reports || 0]
  const maxReports = Math.max(...allReports)

  const statuses = [downdetectorData.status, outageReportData?.status || "Operacional"]
  let finalStatus: ScrapeResult["status"] = "Operacional"
  if (statuses.includes("Caído")) {
    finalStatus = "Caído"
  } else if (statuses.includes("Degradado")) {
    finalStatus = "Degradado"
  } else if (statuses.includes("Error")) {
    finalStatus = "Error"
  }

  return {
    domain: domainInfo.domain,
    service: provider.name,
    slug: provider.slug,
    reports: maxReports,
    status: finalStatus,
    lastChecked: new Date().toISOString(),
    locale: domainInfo.locale,
    sources: {
      downdetector: downdetectorData,
      outageReport: outageReportData,
      socialMedia,
    },
  }
}

// Guardar snapshot y actualizar histórico
function saveData(results: ScrapeResult[]) {
  const ts = Date.now()

  // Guardar status actual
  fs.writeFileSync(
    path.join(DATA_DIR, "cloud-status.json"),
    JSON.stringify({ updatedAt: ts, services: results }, null, 2),
  )

  // Actualizar histórico
  let history: Record<string, Array<{ ts: number; reports: number; status: string }>> = {}
  const historyPath = path.join(DATA_DIR, "cloud-history.json")

  if (fs.existsSync(historyPath)) {
    history = JSON.parse(fs.readFileSync(historyPath, "utf-8"))
  }

  results.forEach((result) => {
    const key = `${result.slug}_${result.domain}`
    if (!history[key]) {
      history[key] = []
    }

    history[key].push({
      ts,
      reports: result.reports,
      status: result.status,
    })

    // Mantener últimas 288 muestras (24 horas si se ejecuta cada 5 min)
    if (history[key].length > 288) {
      history[key] = history[key].slice(-288)
    }
  })

  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2))
}

// Ejecutar scraping completo
async function runScrape() {
  console.log(`\n[${new Date().toISOString()}] ========================================`)
  console.log("Iniciando scraping multi-fuente de cloud providers...")
  console.log("Fuentes: DownDetector (5 regiones) + Outage.Report + Redes Sociales")
  console.log("========================================\n")

  const allResults: ScrapeResult[] = []

  for (const domainInfo of DOWNDETECTOR_DOMAINS) {
    console.log(`\n📍 Scraping ${domainInfo.domain} (${domainInfo.locale})...`)

    for (const provider of CLOUD_PROVIDERS) {
      const result = await scrapeServiceConsolidated(domainInfo, provider)
      allResults.push(result)
      console.log(
        `  ✓ ${provider.name}: ${result.status} (${result.reports} reportes) [${Object.keys(result.sources).length} fuentes]`,
      )

      // Delay para no saturar
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
  }

  saveData(allResults)
  console.log(`\n[${new Date().toISOString()}] ========================================`)
  console.log(`✅ Scraping completado. ${allResults.length} resultados guardados.`)
  console.log(`📁 Datos guardados en: ${DATA_DIR}`)
  console.log("========================================\n")
}

// Ejecutar el scraper
runScrape().catch(console.error)
