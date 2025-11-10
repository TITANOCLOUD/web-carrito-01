import * as cheerio from "cheerio"
import { writeFileSync, readFileSync, existsSync } from "fs"
import fetch from "node-fetch"

interface CloudProvider {
  name: string
  officialStatusUrl: string
  downdetectorUrls: { region: string; url: string }[]
  logo: string
}

interface ScraperResult {
  provider: string
  status: "operational" | "degraded" | "down"
  reportCount: number
  regions: { name: string; status: string; reports: number }[]
  incidents: Array<{
    title: string
    status: string
    affectedServices: string[]
    regions: string[]
    timestamp: string
    description: string
    source: string
  }>
  lastUpdate: string
  source: "official" | "downdetector" | "cached"
  cacheAge?: number
}

const PROVIDERS: CloudProvider[] = [
  {
    name: "AWS",
    officialStatusUrl: "https://health.aws.amazon.com/health/status",
    downdetectorUrls: [
      { region: "global", url: "https://downdetector.com/status/aws-amazon-web-services/" },
      { region: "colombia", url: "https://downdetector.com.co/status/aws-amazon-web-services/" },
      { region: "mexico", url: "https://downdetector.mx/status/aws-amazon-web-services/" },
      { region: "argentina", url: "https://downdetector.com.ar/status/aws-amazon-web-services/" },
    ],
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
  },
  {
    name: "Azure",
    officialStatusUrl: "https://azure.status.microsoft/en-us/status",
    downdetectorUrls: [
      { region: "global", url: "https://downdetector.com/status/windows-azure/" },
      { region: "colombia", url: "https://downdetector.com.co/status/windows-azure/" },
    ],
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg",
  },
  {
    name: "Google Cloud",
    officialStatusUrl: "https://status.cloud.google.com/",
    downdetectorUrls: [{ region: "global", url: "https://downdetector.com/status/google-cloud/" }],
    logo: "https://lh3.googleusercontent.com/lW72XHwB75IIlAW39Bd6sKqcwT9xEMIPAD_bZ1h5C6rIpQsN7LoFLfP2XSl3LOlHXgQ",
  },
  {
    name: "OVH",
    officialStatusUrl: "https://www.status-ovhcloud.com/",
    downdetectorUrls: [{ region: "global", url: "https://downdetector.com/status/ovh/" }],
    logo: "https://www.ovhcloud.com/sites/default/files/styles/text_media_horizontal/public/2021-09/OVHcloud-logo.png",
  },
  {
    name: "Oracle Cloud",
    officialStatusUrl: "https://ocloudinfra.statuspage.io/",
    downdetectorUrls: [{ region: "global", url: "https://downdetector.com/status/oracle-cloud/" }],
    logo: "https://www.oracle.com/a/ocom/img/cloud-icon.svg",
  },
  {
    name: "Alibaba Cloud",
    officialStatusUrl: "https://status.alibabacloud.com/",
    downdetectorUrls: [{ region: "global", url: "https://downdetector.com/status/alibaba-cloud/" }],
    logo: "https://www.alibabacloud.com/favicon.ico",
  },
  {
    name: "IONOS",
    officialStatusUrl: "https://statusfield.com/status/ionos-cloud",
    downdetectorUrls: [{ region: "global", url: "https://downdetector.com/status/ionos/" }],
    logo: "https://www.ionos.com/favicon.ico",
  },
  {
    name: "Linode",
    officialStatusUrl: "https://status.linode.com/",
    downdetectorUrls: [{ region: "global", url: "https://downdetector.com/status/linode/" }],
    logo: "https://www.linode.com/favicon.ico",
  },
]

const CACHE_FILE = "data/cloud-status-cache.json"
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutos

// Headers realistas para evitar detección
const REALISTIC_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
  "Accept-Encoding": "gzip, deflate, br",
  DNT: "1",
  Connection: "keep-alive",
  "Upgrade-Insecure-Requests": "1",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Cache-Control": "max-age=0",
}

// Función para detectar CAPTCHA de Cloudflare
function hasCloudflareCaptcha(html: string): boolean {
  return (
    html.includes("Verifica que eres un ser humano") ||
    html.includes("Unusual traffic patterns detected") ||
    html.includes("cf-challenge") ||
    html.includes("challenge-form")
  )
}

// Delay aleatorio para parecer humano
function randomDelay(min = 2000, max = 5000): Promise<void> {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min
  return new Promise((resolve) => setTimeout(resolve, delay))
}

// Scraper de fuentes oficiales (SIN CAPTCHA)
async function scrapeOfficialStatus(provider: CloudProvider): Promise<Partial<ScraperResult>> {
  try {
    console.log(`[v0] Scrapeando fuente oficial: ${provider.name}`)

    const response = await fetch(provider.officialStatusUrl, {
      headers: REALISTIC_HEADERS,
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    const incidents: ScraperResult["incidents"] = []

    // Parsear según el proveedor
    switch (provider.name) {
      case "AWS":
        // AWS Health Dashboard
        $(".issue, .event").each((_, elem) => {
          const title = $(elem).find(".title, h3").text().trim()
          const description = $(elem).find(".description, .summary").first().text().trim()
          const status = $(elem).find(".status").text().trim() || "ongoing"
          const timestamp = $(elem).find(".timestamp, .date").text().trim()

          if (title) {
            incidents.push({
              title,
              description: description || "Incident details unavailable",
              status: status.toLowerCase().includes("resolved") ? "resolved" : "ongoing",
              affectedServices: [title.split(" ")[0] || "AWS"],
              regions: ["Global"],
              timestamp: timestamp || new Date().toISOString(),
              source: provider.officialStatusUrl,
            })
          }
        })
        break

      case "Azure":
        // Azure Status
        $(".service-issue, .status-item").each((_, elem) => {
          const title = $(elem).find(".title, h2, h3").text().trim()
          const description = $(elem).find(".description, .summary").text().trim()
          const timestamp = $(elem).find(".time, .timestamp").text().trim()

          if (title) {
            incidents.push({
              title,
              description: description || "Incident in progress",
              status: "ongoing",
              affectedServices: ["Azure"],
              regions: ["Global"],
              timestamp: timestamp || new Date().toISOString(),
              source: provider.officialStatusUrl,
            })
          }
        })
        break

      case "Google Cloud":
        // Google Cloud Status
        $(".incident, .service-incident").each((_, elem) => {
          const title = $(elem).find(".incident-title, h3").text().trim()
          const description = $(elem).find(".incident-description, p").text().trim()

          if (title) {
            incidents.push({
              title,
              description: description || "Incident details on status page",
              status: "ongoing",
              affectedServices: ["Google Cloud"],
              regions: ["Global"],
              timestamp: new Date().toISOString(),
              source: provider.officialStatusUrl,
            })
          }
        })
        break

      case "OVH":
        // OVH Status
        $(".incident-item, .status-event").each((_, elem) => {
          const title = $(elem).find(".title, h3").text().trim()
          const description = $(elem).find(".description").text().trim()

          if (title) {
            incidents.push({
              title,
              description,
              status: "ongoing",
              affectedServices: ["OVH"],
              regions: ["Global"],
              timestamp: new Date().toISOString(),
              source: provider.officialStatusUrl,
            })
          }
        })
        break
    }

    // Determinar status general basado en incidentes
    const hasActiveIncidents = incidents.some((i) => i.status === "ongoing")
    const status = hasActiveIncidents ? "degraded" : "operational"

    console.log(`[v0] ${provider.name}: ${incidents.length} incidentes encontrados (${status})`)

    return {
      status,
      incidents,
      source: "official" as const,
      lastUpdate: new Date().toISOString(),
    }
  } catch (error) {
    console.error(`[v0] Error scrapeando ${provider.name} oficial:`, error)
    return {}
  }
}

// Scraper de DownDetector (con anti-CAPTCHA)
async function scrapeDownDetector(provider: CloudProvider): Promise<Partial<ScraperResult>> {
  const regions: ScraperResult["regions"] = []
  let totalReports = 0
  let captchaDetected = false

  // Intentar diferentes regiones hasta encontrar una sin CAPTCHA
  for (const regionUrl of provider.downdetectorUrls) {
    try {
      console.log(`[v0] Intentando DownDetector ${regionUrl.region} para ${provider.name}`)

      // Delay aleatorio para parecer humano
      await randomDelay(2000, 4000)

      const response = await fetch(regionUrl.url, {
        headers: {
          ...REALISTIC_HEADERS,
          Referer: "https://www.google.com/",
        },
      })

      if (!response.ok) {
        console.log(`[v0] HTTP ${response.status} en ${regionUrl.region}`)
        continue
      }

      const html = await response.text()

      // Verificar CAPTCHA
      if (hasCloudflareCaptcha(html)) {
        console.log(`[v0] ⚠️ CAPTCHA detectado en ${regionUrl.region}`)
        captchaDetected = true
        continue // Intentar siguiente región
      }

      const $ = cheerio.load(html)

      // Extraer número de reportes
      const reportsText = $(".stats-number, .active-reports").first().text().trim()
      const reports = Number.parseInt(reportsText.replace(/[^0-9]/g, "")) || 0

      regions.push({
        name: regionUrl.region,
        status: reports > 1000 ? "down" : reports > 100 ? "degraded" : "operational",
        reports,
      })

      totalReports += reports

      console.log(`[v0] ✅ ${regionUrl.region}: ${reports} reportes`)
    } catch (error) {
      console.error(`[v0] Error en ${regionUrl.region}:`, error)
    }
  }

  if (regions.length === 0 && captchaDetected) {
    console.log(`[v0] ⚠️ CAPTCHA en todas las regiones de ${provider.name}`)
    return { source: "cached" as const }
  }

  const avgReports = regions.length > 0 ? totalReports / regions.length : 0
  const status = avgReports > 1000 ? "down" : avgReports > 100 ? "degraded" : "operational"

  return {
    reportCount: totalReports,
    regions,
    status,
    source: "downdetector" as const,
  }
}

// Cargar cache
function loadCache(): Record<string, ScraperResult> {
  try {
    if (existsSync(CACHE_FILE)) {
      return JSON.parse(readFileSync(CACHE_FILE, "utf-8"))
    }
  } catch (error) {
    console.error("[v0] Error cargando cache:", error)
  }
  return {}
}

// Guardar cache
function saveCache(data: Record<string, ScraperResult>): void {
  try {
    writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error("[v0] Error guardando cache:", error)
  }
}

// Función principal
async function scrapeAllProviders(): Promise<Record<string, ScraperResult>> {
  console.log("[v0] 🚀 Iniciando scraper híbrido multi-fuente")

  const cache = loadCache()
  const results: Record<string, ScraperResult> = {}

  for (const provider of PROVIDERS) {
    console.log(`\n[v0] === Procesando ${provider.name} ===`)

    // 1. Intentar fuente oficial primero (sin CAPTCHA)
    const officialData = await scrapeOfficialStatus(provider)

    // 2. Intentar DownDetector para métricas adicionales
    await randomDelay(3000, 6000) // Delay entre proveedores
    const downdetectorData = await scrapeDownDetector(provider)

    // 3. Combinar datos o usar cache si todo falla
    const now = Date.now()
    const cacheEntry = cache[provider.name]
    const cacheAge = cacheEntry ? now - new Date(cacheEntry.lastUpdate).getTime() : Number.POSITIVE_INFINITY

    if (officialData.incidents || downdetectorData.regions) {
      // Tenemos datos nuevos
      results[provider.name] = {
        provider: provider.name,
        status: officialData.status || downdetectorData.status || "operational",
        reportCount: downdetectorData.reportCount || 0,
        regions: downdetectorData.regions || [],
        incidents: officialData.incidents || [],
        lastUpdate: new Date().toISOString(),
        source: officialData.incidents ? "official" : "downdetector",
      }
    } else if (cacheEntry && cacheAge < CACHE_DURATION) {
      // Usar cache reciente
      console.log(`[v0] Usando cache para ${provider.name} (${Math.round(cacheAge / 1000)}s)`)
      results[provider.name] = {
        ...cacheEntry,
        source: "cached",
        cacheAge: Math.round(cacheAge / 1000),
      }
    } else {
      // Sin datos disponibles
      console.log(`[v0] ⚠️ Sin datos para ${provider.name}`)
      results[provider.name] = {
        provider: provider.name,
        status: "operational",
        reportCount: 0,
        regions: [],
        incidents: [],
        lastUpdate: new Date().toISOString(),
        source: "cached",
      }
    }
  }

  // Guardar resultados en cache
  saveCache(results)

  console.log("\n[v0] ✅ Scraping completado")
  return results
}

// Ejecutar
scrapeAllProviders()
  .then((results) => {
    console.log("[v0] Resultados guardados en cache")
    writeFileSync("data/cloud-status.json", JSON.stringify(results, null, 2))
  })
  .catch((error) => {
    console.error("[v0] Error fatal:", error)
    process.exit(1)
  })
