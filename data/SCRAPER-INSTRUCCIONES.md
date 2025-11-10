# Instrucciones del Scraper Multi-Fuente

## ¿Qué hace este scraper?

Este scraper obtiene **datos REALES** de múltiples fuentes para monitorear el estado de los principales proveedores Cloud:

### Fuentes de Datos

1. **DownDetector** (5 regiones)
   - downdetector.com (Global)
   - downdetector.mx (México)
   - downdetector.pe (Perú)
   - downdetector.ca (Canadá)
   - downdetector.com.co (Colombia)

2. **Outage.Report** (Global)
   - Datos consolidados globales
   - Estado actualizado en tiempo real
   - Análisis de redes sociales (menciones de Twitter/X)

### Proveedores Monitoreados

- Amazon Web Services (AWS)
- Microsoft Azure
- Google Cloud Platform
- Oracle Cloud
- Huawei Cloud
- Alibaba Cloud
- OVHcloud
- Vultr
- Linode
- Unihost

## Cómo Ejecutar el Scraper

### Manualmente (Desarrollo)

\`\`\`bash
# Instalar dependencias
npm install axios cheerio

# Ejecutar scraper
npx tsx scripts/cloud-status-scraper.ts
\`\`\`

### Automáticamente (Producción)

#### Opción 1: Cron Job

\`\`\`bash
# Editar crontab
crontab -e

# Agregar línea (ejecuta cada 5 minutos)
*/5 * * * * cd /ruta/proyecto && npx tsx scripts/cloud-status-scraper.ts >> logs/scraper.log 2>&1
\`\`\`

#### Opción 2: PM2 (Recomendado)

\`\`\`bash
# Instalar PM2
npm install -g pm2

# Crear archivo ecosystem
pm2 ecosystem
\`\`\`

Editar `ecosystem.config.js`:

\`\`\`js
module.exports = {
  apps: [{
    name: 'cloud-scraper',
    script: 'npx',
    args: 'tsx scripts/cloud-status-scraper.ts',
    cron_restart: '*/5 * * * *', // cada 5 minutos
    autorestart: false
  }]
}

# Iniciar
pm2 start ecosystem.config.js
pm2 save
pm2 startup
\`\`\`

#### Opción 3: Vercel Cron Jobs

Crear archivo `vercel.json`:

\`\`\`json
{
  "crons": [{
    "path": "/api/trigger-scrape",
    "schedule": "*/5 * * * *"
  }]
}
\`\`\`

Crear endpoint `app/api/trigger-scrape/route.ts`:

\`\`\`ts
import { exec } from 'child_process'
import { NextResponse } from 'next/server'

export async function GET() {
  return new Promise((resolve) => {
    exec('npx tsx scripts/cloud-status-scraper.ts', (error, stdout) => {
      if (error) {
        resolve(NextResponse.json({ error: error.message }, { status: 500 }))
      } else {
        resolve(NextResponse.json({ success: true, output: stdout }))
      }
    })
  })
}
\`\`\`

## Archivos Generados

### `data/cloud-status.json`
Estado actual de todos los servicios:

\`\`\`json
{
  "updatedAt": 1699456789000,
  "services": [
    {
      "domain": "downdetector.com",
      "service": "Amazon Web Services",
      "slug": "aws",
      "reports": 45,
      "status": "Operacional",
      "lastChecked": "2024-11-08T12:30:00.000Z",
      "locale": "global",
      "sources": {
        "downdetector": { "reports": 45, "status": "Operacional" },
        "outageReport": { "reports": 38, "status": "Operacional" },
        "socialMedia": { "mentions": 120, "sentiment": "neutral" }
      }
    }
  ]
}
\`\`\`

### `data/cloud-history.json`
Histórico de reportes (últimas 24 horas):

\`\`\`json
{
  "aws_downdetector.com": [
    { "ts": 1699456789000, "reports": 45, "status": "Operacional" },
    { "ts": 1699457089000, "reports": 52, "status": "Operacional" }
  ]
}
\`\`\`

## Interpretación de Estados

| Estado | Significado | Criterio |
|--------|-------------|----------|
| **Operacional** | Funcionando correctamente | < 100 reportes, sin problemas detectados |
| **Degradado** | Problemas parciales | 100-299 reportes o problemas detectados |
| **Caído** | Caída total del servicio | ≥ 300 reportes o falla crítica detectada |
| **Error** | No se pudo obtener información | Falla en scraping |

## Consideraciones

### Rate Limiting
- Delay de 2 segundos entre requests
- User-Agent configurado
- Headers de idioma por región

### Manejo de Errores
- Timeout de 15 segundos por request
- Fallback a estado "Error" si falla
- Logs detallados de errores

### Almacenamiento
- Máximo 288 puntos por servicio (24h)
- Actualización cada 5 minutos
- Archivos JSON en carpeta `data/`

## Troubleshooting

### El scraper no guarda datos
\`\`\`bash
# Verificar permisos
chmod +w data/

# Crear carpeta si no existe
mkdir -p data
\`\`\`

### Errores de timeout
- Aumentar timeout en scraper (línea con `timeout: 15000`)
- Verificar conexión a Internet

### Datos no aparecen en UI
- Verificar que las APIs lean de `data/cloud-status.json`
- Comprobar que el scraper se ejecutó correctamente
- Ver logs: `tail -f logs/scraper.log`

## Próximos Pasos

1. Ejecutar scraper manualmente para probar
2. Verificar que genera `data/cloud-status.json` y `data/cloud-history.json`
3. Configurar ejecución automática (PM2 o Cron)
4. Monitorear logs para detectar errores
5. La UI automáticamente mostrará los datos reales
