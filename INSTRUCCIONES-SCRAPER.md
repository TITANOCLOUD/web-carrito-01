# 🕷️ Scraper de DownDetector - Instrucciones de Uso

## ¿Qué hace este scraper?

Este script scrapea **datos reales en tiempo real** desde múltiples dominios regionales de DownDetector:
- downdetector.com (Global)
- downdetector.ca (Canadá)
- downdetector.mx (México)
- downdetector.pe (Perú)
- downdetector.com.co (Colombia)

Monitorea los **10 grandes proveedores Cloud**:
- AWS, Azure, Google Cloud, Oracle Cloud, Huawei Cloud
- Alibaba Cloud, OVHcloud, Vultr, Linode, Unihost

## 📦 Instalación de Dependencias

\`\`\`bash
npm install axios cheerio
# o
pnpm add axios cheerio
\`\`\`

## ▶️ Cómo Ejecutar el Scraper

### Opción 1: Ejecución Manual (una vez)

\`\`\`bash
npx tsx scripts/cloud-status-scraper.ts
\`\`\`

Esto scrapeará todos los proveedores en todas las regiones y guardará:
- `data/cloud-status.json` - Estado actual
- `data/cloud-history.json` - Histórico para gráficas

### Opción 2: Ejecución Automática con Cron (cada 5 minutos)

**Linux/Mac:**

Edita tu crontab:
\`\`\`bash
crontab -e
\`\`\`

Agrega esta línea:
\`\`\`bash
*/5 * * * * cd /ruta/a/tu/proyecto && npx tsx scripts/cloud-status-scraper.ts >> /tmp/scraper.log 2>&1
\`\`\`

**Windows (Task Scheduler):**

1. Abre Task Scheduler
2. Crear tarea básica
3. Trigger: Repetir cada 5 minutos
4. Acción: `npx tsx scripts/cloud-status-scraper.ts`

### Opción 3: En Producción con Vercel Cron Jobs

Crea un endpoint API que ejecute el scraper:

**app/api/cron/scrape/route.ts:**

\`\`\`ts
import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function GET(request: Request) {
  // Verificar authorization header (Vercel Cron secret)
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await execAsync('npx tsx scripts/cloud-status-scraper.ts')
    return NextResponse.json({ success: true, timestamp: new Date().toISOString() })
  } catch (error) {
    return NextResponse.json({ error: 'Scrape failed' }, { status: 500 })
  }
}
\`\`\`

**vercel.json:**

\`\`\`json
{
  "crons": [{
    "path": "/api/cron/scrape",
    "schedule": "*/5 * * * *"
  }]
}
\`\`\`

## 📊 Verificar que Funciona

1. **Ejecuta el scraper manualmente:**
   \`\`\`bash
   npx tsx scripts/cloud-status-scraper.ts
   \`\`\`

2. **Verifica los archivos creados:**
   \`\`\`bash
   cat data/cloud-status.json
   cat data/cloud-history.json
   \`\`\`

3. **Abre tu dashboard:**
   \`\`\`bash
   npm run dev
   \`\`\`
   
   Visita: http://localhost:3000/detector-caidas

4. **Deberías ver:**
   - ✅ Logos reales de cada proveedor (Clearbit)
   - ✅ Datos reales de reportes por región
   - ✅ Gráficas con histórico multi-región
   - ✅ Estados actualizados (Operacional/Degradado/Caído)

## 🔍 Debugging

Si el scraper falla:

1. **Verifica que axios y cheerio estén instalados:**
   \`\`\`bash
   npm list axios cheerio
   \`\`\`

2. **Ejecuta con logs detallados:**
   \`\`\`bash
   NODE_DEBUG=* npx tsx scripts/cloud-status-scraper.ts
   \`\`\`

3. **Revisa si DownDetector cambió sus selectores CSS:**
   - Visita manualmente: https://downdetector.com/status/aws/
   - Inspecciona el HTML y ajusta los selectores en el scraper si es necesario

## ⚡ Rendimiento

- Cada ejecución completa toma ~2-3 minutos (50 requests con delays)
- Rate limit: 1 segundo entre requests para respetar el servidor
- Datos históricos: Se mantienen las últimas 288 muestras (24 horas)

## 🚨 Importante

- Este scraper es para **uso educativo/personal**
- Respeta los términos de servicio de DownDetector
- No ejecutes con frecuencia mayor a cada 5 minutos
- Para uso comercial, considera contactar a DownDetector para acceso API oficial

## 📈 Próximos Pasos

Una vez que el scraper esté corriendo:
1. Los datos se actualizan automáticamente en `/detector-caidas`
2. Las gráficas se refrescan cada minuto en el frontend
3. El resumen de fallas se actualiza en tiempo real
4. Puedes integrar alertas cuando `status === "Caído"`
