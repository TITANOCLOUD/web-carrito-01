import { NextResponse } from "next/server"

export const runtime = "edge"

// Configuración de sitios web a monitorear
const websiteConfigs: Record<string, string> = {
  "web-titanocloud": "https://Titanocloud.com",
  "web-vimaferltda": "https://Vimaferltda.com",
  "web-controlonline": "https://controlonlineinternational.com",
  "web-gamechagers": "https://gamechagers.com.co",
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const websiteUrl = websiteConfigs[id]

  if (!websiteUrl) {
    return NextResponse.json({ error: "Website not found" }, { status: 404 })
  }

  try {
    const startTime = Date.now()
    const response = await fetch(websiteUrl, {
      method: "HEAD",
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Cache-Control": "max-age=0",
      },
    })
    const loadTime = Date.now() - startTime

    // Extraer información de certificado SSL (si está disponible)
    const url = new URL(websiteUrl)
    const hostname = url.hostname

    // Simular información de IP (en producción usarías DNS lookup)
    const ipAddress = await getIPAddress(hostname)

    // Información del certificado SSL
    const sslInfo = await getSSLInfo(websiteUrl)

    // Información del dominio
    const domainInfo = await getDomainInfo(hostname)

    // Verificar listas negras
    const blacklistStatus = await checkBlacklists(ipAddress, hostname)

    return NextResponse.json({
      id,
      name: hostname,
      url: websiteUrl,
      ip: ipAddress,
      status: response.ok ? "online" : "warning",
      statusCode: response.status,
      loadTime,
      ssl: sslInfo,
      domain: domainInfo,
      blacklist: blacklistStatus,
      lastCheck: new Date().toISOString(),
      uptime: "99.9%", // Esto debería calcularse basado en histórico
    })
  } catch (error) {
    return NextResponse.json({
      id,
      name: websiteUrl,
      url: websiteUrl,
      ip: "N/A",
      status: "offline",
      statusCode: 0,
      loadTime: 0,
      error: error instanceof Error ? error.message : "Unknown error",
      lastCheck: new Date().toISOString(),
    })
  }
}

// Función para obtener IP del dominio
async function getIPAddress(hostname: string): Promise<string> {
  try {
    // En edge runtime no podemos usar dns.lookup, así que usamos una API externa
    const response = await fetch(`https://dns.google/resolve?name=${hostname}&type=A`)
    const data = await response.json()

    if (data.Answer && data.Answer.length > 0) {
      return data.Answer[0].data
    }
    return "N/A"
  } catch {
    return "N/A"
  }
}

// Función para obtener información SSL
async function getSSLInfo(url: string) {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    })

    // Extraer información de certificado de los headers
    const date = response.headers.get("date")
    const server = response.headers.get("server")

    // En producción, necesitarías usar una librería para extraer info real del certificado
    // Por ahora simulamos algunos datos
    const issueDate = new Date()
    const expiryDate = new Date()
    expiryDate.setMonth(expiryDate.getMonth() + 3) // 3 meses

    const daysUntilExpiry = Math.floor((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

    return {
      valid: true,
      issuer: "Let's Encrypt Authority X3",
      subject: new URL(url).hostname,
      issueDate: issueDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
      daysUntilExpiry,
      protocol: "TLS 1.3",
      cipher: "TLS_AES_256_GCM_SHA384",
    }
  } catch {
    return {
      valid: false,
      error: "No se pudo obtener información SSL",
    }
  }
}

// Función para obtener información del dominio
async function getDomainInfo(hostname: string) {
  try {
    // Simular información de WHOIS
    // En producción, usarías una API de WHOIS real
    const expiryDate = new Date()
    expiryDate.setFullYear(expiryDate.getFullYear() + 1) // 1 año

    const daysUntilExpiry = Math.floor((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

    return {
      registrar: "GoDaddy.com, LLC",
      registrationDate: "2020-01-15",
      expiryDate: expiryDate.toISOString().split("T")[0],
      daysUntilExpiry,
      nameservers: ["ns1.example.com", "ns2.example.com"],
    }
  } catch {
    return {
      error: "No se pudo obtener información del dominio",
    }
  }
}

// Función para verificar listas negras usando múltiples RBLs y APIs públicas
async function checkBlacklists(ip: string, hostname: string) {
  if (ip === "N/A") {
    return {
      listed: false,
      error: "IP no disponible para verificación",
      lastCheck: new Date().toISOString(),
    }
  }

  try {
    const results = {
      listed: false,
      lists: [] as string[],
      checks: [] as any[],
      lastCheck: new Date().toISOString(),
    }

    // Lista de RBLs más comunes para verificar
    const rblServices = [
      "zen.spamhaus.org",
      "bl.spamcop.net",
      "b.barracudacentral.org",
      "dnsbl.sorbs.net",
      "cbl.abuseat.org",
      "pbl.spamhaus.org",
      "sbl.spamhaus.org",
    ]

    // Verificar IP en múltiples RBLs usando DNS lookup reverso
    const reversedIP = ip.split(".").reverse().join(".")

    for (const rbl of rblServices) {
      try {
        const query = `${reversedIP}.${rbl}`
        // Usar Google DNS API para verificar si la IP está listada
        const response = await fetch(`https://dns.google/resolve?name=${query}&type=A`, {
          headers: {
            Accept: "application/dns-json",
          },
        })
        const data = await response.json()

        const isListed = data.Answer && data.Answer.length > 0

        results.checks.push({
          service: rbl,
          listed: isListed,
          result: isListed ? data.Answer[0].data : "clean",
        })

        if (isListed) {
          results.listed = true
          results.lists.push(rbl)
        }
      } catch (error) {
        // Silenciar errores individuales de RBL, continuar con otros
        results.checks.push({
          service: rbl,
          listed: false,
          error: "Unable to query",
        })
      }
    }

    // Verificar dominio en Google Safe Browsing (alternativa)
    try {
      // Nota: En producción deberías usar la API oficial de Google Safe Browsing
      // Por ahora hacemos una verificación básica
      const domainCheck = await checkDomainReputation(hostname)
      if (domainCheck.suspicious) {
        results.listed = true
        results.lists.push("Domain Reputation Check")
        results.checks.push({
          service: "Domain Reputation",
          listed: true,
          reason: domainCheck.reason,
        })
      }
    } catch {
      // Ignorar si falla
    }

    return results
  } catch (error) {
    return {
      listed: false,
      error: error instanceof Error ? error.message : "Error al verificar listas negras",
      lastCheck: new Date().toISOString(),
    }
  }
}

// Función para verificar reputación del dominio
async function checkDomainReputation(hostname: string) {
  try {
    // Verificar si el dominio tiene patrones sospechosos
    const suspiciousPatterns = [
      /\d{1,3}-\d{1,3}-\d{1,3}-\d{1,3}/i, // IPs en el nombre
      /temp|temporary|test|fake/i, // Palabras sospechosas
      /\.(tk|ml|ga|cf|gq)$/i, // TLDs comúnmente usados para spam
    ]

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(hostname)) {
        return {
          suspicious: true,
          reason: "Patrón de dominio sospechoso detectado",
        }
      }
    }

    return {
      suspicious: false,
    }
  } catch {
    return {
      suspicious: false,
    }
  }
}
