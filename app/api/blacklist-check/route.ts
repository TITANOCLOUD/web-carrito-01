import { NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(request: Request) {
  try {
    const { ip, domain } = await request.json()

    if (!ip && !domain) {
      return NextResponse.json({ error: "IP o dominio requerido" }, { status: 400 })
    }

    const results = {
      ip: ip || "N/A",
      domain: domain || "N/A",
      timestamp: new Date().toISOString(),
      blacklisted: false,
      details: [] as any[],
    }

    // Verificar IP si está disponible
    if (ip && ip !== "N/A") {
      const ipResults = await checkIPBlacklists(ip)
      results.blacklisted = results.blacklisted || ipResults.listed
      results.details.push({
        type: "IP Blacklist Check",
        results: ipResults,
      })
    }

    // Verificar dominio si está disponible
    if (domain && domain !== "N/A") {
      const domainResults = await checkDomainBlacklists(domain)
      results.blacklisted = results.blacklisted || domainResults.listed
      results.details.push({
        type: "Domain Blacklist Check",
        results: domainResults,
      })
    }

    return NextResponse.json(results)
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Error al verificar listas negras",
      },
      { status: 500 },
    )
  }
}

async function checkIPBlacklists(ip: string) {
  const results = {
    listed: false,
    lists: [] as string[],
    checks: [] as any[],
  }

  const rblServices = [
    { name: "Spamhaus ZEN", host: "zen.spamhaus.org" },
    { name: "SpamCop", host: "bl.spamcop.net" },
    { name: "Barracuda", host: "b.barracudacentral.org" },
    { name: "SORBS", host: "dnsbl.sorbs.net" },
    { name: "CBL Abuseat", host: "cbl.abuseat.org" },
    { name: "Spamhaus PBL", host: "pbl.spamhaus.org" },
    { name: "Spamhaus SBL", host: "sbl.spamhaus.org" },
    { name: "UCEPROTECT", host: "dnsbl-1.uceprotect.net" },
  ]

  const reversedIP = ip.split(".").reverse().join(".")

  await Promise.allSettled(
    rblServices.map(async (rbl) => {
      try {
        const query = `${reversedIP}.${rbl.host}`
        const response = await fetch(`https://dns.google/resolve?name=${query}&type=A`, {
          headers: { Accept: "application/dns-json" },
        })
        const data = await response.json()

        const isListed = data.Answer && data.Answer.length > 0

        results.checks.push({
          service: rbl.name,
          host: rbl.host,
          listed: isListed,
          response: isListed ? data.Answer[0].data : "Not listed",
        })

        if (isListed) {
          results.listed = true
          results.lists.push(rbl.name)
        }
      } catch (error) {
        results.checks.push({
          service: rbl.name,
          host: rbl.host,
          listed: false,
          error: "Query failed",
        })
      }
    }),
  )

  return results
}

async function checkDomainBlacklists(domain: string) {
  const results = {
    listed: false,
    lists: [] as string[],
    checks: [] as any[],
  }

  // Verificar patrones sospechosos en el dominio
  const suspiciousPatterns = [
    { pattern: /\d{1,3}-\d{1,3}-\d{1,3}-\d{1,3}/i, reason: "IP address in domain name" },
    { pattern: /temp|temporary|test|fake|spam/i, reason: "Suspicious keywords" },
    { pattern: /\.(tk|ml|ga|cf|gq)$/i, reason: "High-risk TLD" },
  ]

  for (const { pattern, reason } of suspiciousPatterns) {
    if (pattern.test(domain)) {
      results.listed = true
      results.lists.push("Pattern Detection")
      results.checks.push({
        service: "Pattern Detection",
        listed: true,
        reason,
      })
    }
  }

  // Verificar dominio en SURBL (Spam URI Realtime Blocklists)
  const surblServices = ["multi.surbl.org", "dbl.spamhaus.org"]

  await Promise.allSettled(
    surblServices.map(async (surbl) => {
      try {
        const query = `${domain}.${surbl}`
        const response = await fetch(`https://dns.google/resolve?name=${query}&type=A`, {
          headers: { Accept: "application/dns-json" },
        })
        const data = await response.json()

        const isListed = data.Answer && data.Answer.length > 0

        results.checks.push({
          service: surbl,
          listed: isListed,
          response: isListed ? "Listed" : "Clean",
        })

        if (isListed) {
          results.listed = true
          results.lists.push(surbl)
        }
      } catch (error) {
        results.checks.push({
          service: surbl,
          listed: false,
          error: "Query failed",
        })
      }
    }),
  )

  return results
}
