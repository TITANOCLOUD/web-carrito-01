# Cómo Ejecutar el Scraper de Cloud Status

Para que el detector de caídas muestre datos reales, necesitas ejecutar el scraper que recopila información desde DownDetector.

## Opción 1: Ejecutar Manualmente (Desarrollo)

\`\`\`bash
# Ejecutar el scraper una vez
npm run scraper
# o
node --loader ts-node/esm scripts/cloud-status-scraper.ts
\`\`\`

Esto creará los archivos:
- `data/cloud-status.json` - Estado actual de todos los proveedores
- `data/cloud-history.json` - Histórico de reportes para gráficas

## Opción 2: Ejecutar Automáticamente con Cron (Producción)

### En Vercel (Recomendado)

Crea un Vercel Cron Job que ejecute el scraper cada 5 minutos:

1. Crea `app/api/scraper/route.ts`:

\`\`\`typescript
import { NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

export async function GET(request: Request) {
  // Verificar que la petición viene de Vercel Cron
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Ejecutar el scraper
    await execAsync("node --loader ts-node/esm scripts/cloud-status-scraper.ts")
    return NextResponse.json({ success: true, timestamp: new Date().toISOString() })
  } catch (error) {
    console.error("Error running scraper:", error)
    return NextResponse.json({ error: "Scraper failed" }, { status: 500 })
  }
}
\`\`\`

2. Agrega en `vercel.json`:

\`\`\`json
{
  "crons": [
    {
      "path": "/api/scraper",
      "schedule": "*/5 * * * *"
    }
  ]
}
\`\`\`

3. Agrega `CRON_SECRET` a tus variables de entorno en Vercel.

### En Servidor Propio con PM2

\`\`\`bash
# Instalar PM2
npm install -g pm2

# Crear archivo de configuración pm2-scraper.json:
{
  "apps": [{
    "name": "cloud-scraper",
    "script": "scripts/cloud-status-scraper.ts",
    "interpreter": "node",
    "interpreter_args": "--loader ts-node/esm",
    "cron_restart": "*/5 * * * *",
    "autorestart": false
  }]
}

# Iniciar con PM2
pm2 start pm2-scraper.json
pm2 save
pm2 startup
\`\`\`

## Verificar que Funciona

1. Ejecuta el scraper manualmente
2. Verifica que se crearon los archivos en `data/`
3. Visita `https://tu-sitio.com/detector-caidas`
4. Deberías ver datos reales en lugar de "Cargando..."

## Notas Importantes

- El scraper tarda aproximadamente 2-3 minutos en completarse (scrapea 50 URLs)
- Respeta los límites de rate de DownDetector (1 segundo entre requests)
- Los datos se guardan en el filesystem, asegúrate de tener permisos de escritura en `/data`
- En Vercel, considera usar una base de datos o KV storage para persistencia
