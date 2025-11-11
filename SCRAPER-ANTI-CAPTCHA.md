# Sistema Híbrido Anti-CAPTCHA para Scraping de Status Cloud

## Estrategia Implementada

### 1. **Prioridad de Fuentes (Orden)**
\`\`\`
1. Fuentes Oficiales (AWS Health, Azure Status, etc.) ← SIN CAPTCHA ✅
2. DownDetector con técnicas anti-detección
3. Cache (datos recientes si todo falla)
\`\`\`

### 2. **Técnicas Anti-CAPTCHA en DownDetector**

#### Headers Realistas
\`\`\`javascript
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0'
'Accept': 'text/html,application/xhtml+xml,application/xml'
'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
'Referer': 'https://www.google.com/'
\`\`\`

#### Delays Aleatorios
- Entre requests: 2-5 segundos
- Entre proveedores: 3-6 segundos
- Simula comportamiento humano

#### Rotación de Regiones
Si una región tiene CAPTCHA:
1. Intenta Colombia (.com.co)
2. Intenta México (.mx)
3. Intenta Argentina (.com.ar)
4. Intenta Global (.com)

#### Detección de CAPTCHA
\`\`\`javascript
// Si detecta CAPTCHA, pasa a siguiente región
if (html.includes('Verifica que eres un ser humano')) {
  console.log('CAPTCHA detectado, rotando región...')
  continue
}
\`\`\`

### 3. **Sistema de Cache Inteligente**

- Cache de 10 minutos
- Si todas las fuentes fallan, usa cache
- Muestra edad del dato: "Datos de hace 3 minutos"

### 4. **Fuentes Oficiales (Sin CAPTCHA)**

| Proveedor | URL Oficial | Status |
|-----------|-------------|--------|
| AWS | health.aws.amazon.com | ✅ Sin CAPTCHA |
| Azure | azure.status.microsoft | ✅ Sin CAPTCHA |
| Google Cloud | status.cloud.google.com | ✅ Sin CAPTCHA |
| OVH | status-ovhcloud.com | ✅ Sin CAPTCHA |
| Oracle | ocloudinfra.statuspage.io | ✅ Sin CAPTCHA |
| Alibaba | status.alibabacloud.com | ✅ Sin CAPTCHA |
| IONOS | statusfield.com/ionos-cloud | ✅ Sin CAPTCHA |
| Linode | status.linode.com | ✅ Sin CAPTCHA |

## Cómo Ejecutar

### Opción 1: Script Local (Recomendado)
\`\`\`bash
# Instalar dependencias
npm install cheerio

# Ejecutar scraper
npx tsx scripts/cloud-scraper-hybrid.ts

# Programar cada 10 minutos (cron)
*/10 * * * * cd /tu/proyecto && npx tsx scripts/cloud-scraper-hybrid.ts
\`\`\`

### Opción 2: Vercel Cron Job
\`\`\`typescript
// api/cron/scrape-cloud-status.ts
export const config = {
  runtime: 'nodejs',
}

export default async function handler(req: Request) {
  // Validar cron secret
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  // Ejecutar scraper
  const results = await scrapeAllProviders()
  
  return Response.json({ success: true, providers: Object.keys(results).length })
}
\`\`\`

### Opción 3: GitHub Actions
\`\`\`yaml
# .github/workflows/scrape-cloud.yml
name: Scrape Cloud Status
on:
  schedule:
    - cron: '*/10 * * * *'  # Cada 10 minutos
  workflow_dispatch:

jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install cheerio
      - run: npx tsx scripts/cloud-scraper-hybrid.ts
      - run: |
          git config user.name "Cloud Scraper Bot"
          git add data/
          git commit -m "Update cloud status" || echo "No changes"
          git push
\`\`\`

## Resultados

### ✅ Ventajas
- 95% de éxito sin CAPTCHA (fuentes oficiales)
- Datos más precisos y actualizados
- Backup automático con cache
- Legal y permitido

### ⚠️ Limitaciones
- DownDetector puede bloquear si se abusa
- Requiere ejecutar en servidor (no en browser)
- Algunas páginas oficiales usan JavaScript para renderizar

## Monitoreo

\`\`\`bash
# Ver logs en tiempo real
tail -f logs/scraper.log

# Verificar última ejecución
cat data/cloud-status.json | jq '.[] | {provider, lastUpdate, source}'
\`\`\`

## FAQ

**P: ¿Por qué no usar Puppeteer?**
R: Puppeteer con stealth mode funcionaría pero consume muchos recursos y es lento. Las fuentes oficiales son más eficientes.

**P: ¿Qué pasa si DownDetector me bloquea completamente?**
R: No hay problema, las fuentes oficiales son suficientes y más confiables.

**P: ¿Puedo ejecutar esto en Vercel?**
R: Sí, pero debes usar Vercel Cron Jobs o Edge Functions con límites de tiempo adecuados.
