import axios from "axios"
import * as cheerio from "cheerio"
import fs from "fs"
import path from "path"

const DATA_DIR = path.resolve(process.cwd(), "data")
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Dominios regionales de DownDetector
const DOMAINS = [
  { domain: "downdetector.com", locale: "global", lang: "en-US" },
  { domain: "downdetector.ca", locale: "ca", lang: "en-CA" },
  { domain: "downdetector.mx", locale: "mx", lang: "es-MX" },
  { domain: "downdetector.pe", locale: "pe", lang: "es-PE" },
  { domain: "downdetector.com.co", locale: "co", lang: "es-CO" },
]

// Grandes proveedores Cloud
const CLOUD_PROVIDERS = [
  { slug: "aws", name: "Amazon Web Services", clearbit: "aws.amazon.com" },
  { slug: "azure", name: "Microsoft Azure", clearbit: "azure.microsoft.com" },
  { slug: "google-cloud", name: "Google Cloud", clearbit: "cloud.google.com" },
  { slug: "oracle-cloud", name: "Oracle Cloud", clearbit: "oracle.com" },
  { slug: "huawei-cloud", name: "Huawei Cloud", clearbit: "huawei.com" },
  { slug: "alibaba-cloud", name: "Alibaba Cloud", clearbit: "alibabacloud.com" },
  { slug: "ovhcloud", name: "OVHcloud", clearbit: "ovhcloud.com" },
  { slug: "vultr", name: "Vultr", clearbit: "vultr.com" },
  { slug: "linode", name: "Linode", clearbit: "linode.com" },
  { slug: "unihost", name: "Unihost", clearbit: "unihost.com" },
]

interface ScrapeResult {
  domain: string
  service: string
  slug: string
  reports: number
  status: "Operacional" | "Degradado" | "Caído" | "Error"
  lastChecked: string
  locale: string
}

// Función para scrapear un servicio en un dominio
async function scrapeService(
  domainInfo: (typeof DOMAINS)[0],
  provider: (typeof CLOUD_PROVIDERS)[0],
): Promise<ScrapeResult> {
  const url = `https://${domainInfo.domain}/status/${provider.slug}/`

  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; TitanocloudMonitor/1.0)",
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
    let status: ScrapeResult["status"] = "Operacional"
    if (reports >= 300) {
      status = "Caído"
    } else if (reports >= 100 || isDown) {
      status = "Degradado"
    }

    return {
      domain: domainInfo.domain,
      service: provider.name,
      slug: provider.slug,
      reports,
      status,
      lastChecked: new Date().toISOString(),
      locale: domainInfo.locale,
    }
  } catch (error) {
    console.error(`Error scraping ${provider.name} on ${domainInfo.domain}:`, error)
    return {
      domain: domainInfo.domain,
      service: provider.name,
      slug: provider.slug,
      reports: 0,
      status: "Error",
      lastChecked: new Date().toISOString(),
      locale: domainInfo.locale,
    }
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
  console.log(`[${new Date().toISOString()}] Iniciando scraping de cloud providers...`)

  const allResults: ScrapeResult[] = []

  for (const domainInfo of DOMAINS) {
    console.log(`Scraping ${domainInfo.domain} (${domainInfo.locale})...`)

    for (const provider of CLOUD_PROVIDERS) {
      const result = await scrapeService(domainInfo, provider)
      allResults.push(result)
      console.log(`  ${provider.name}: ${result.status} (${result.reports} reportes)`)

      // Pequeño delay para no saturar
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  saveData(allResults)
  console.log(`[${new Date().toISOString()}] Scraping completado. ${allResults.length} resultados guardados.`)
}

// Ejecutar el scraper
runScrape().catch(console.error)
