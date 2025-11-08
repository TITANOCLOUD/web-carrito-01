# Sistema de Monitoreo de Cloud Providers - Titanocloud

Este sistema monitorea en tiempo real el estado de los principales proveedores cloud a nivel global mediante scraping de DownDetector.

## 🎯 Proveedores Monitoreados

- **AWS** (Amazon Web Services)
- **Azure** (Microsoft Azure)
- **Google Cloud**
- **Oracle Cloud**
- **Huawei Cloud**
- **Alibaba Cloud**
- **OVHcloud**
- **Vultr**
- **Linode**
- **Unihost**

## 🌍 Regiones Monitoreadas

El sistema scrapea datos de múltiples regiones de DownDetector:
- Global (.com)
- Canadá (.ca)
- México (.mx)
- Perú (.pe)
- Colombia (.com.co)

## 📁 Estructura de Archivos

\`\`\`
/
├── scripts/
│   └── cloud-status-scraper.ts    # Script de scraping
├── app/
│   ├── api/
│   │   ├── cloud-status/          # API endpoint para status actual
│   │   └── cloud-history/         # API endpoint para histórico
│   └── monitor/
│       └── page.tsx               # Dashboard visual
├── components/
│   └── cloud-monitor-chart.tsx    # Componente de gráficas
└── data/
    ├── cloud-status.json          # Estado actual (generado)
    └── cloud-history.json         # Histórico (generado)
\`\`\`

## 🚀 Cómo Ejecutar

### 1. Ejecutar el Scraper Manualmente

Para ejecutar el scraper una vez y generar datos de prueba:

\`\`\`bash
npx tsx scripts/cloud-status-scraper.ts
\`\`\`

Esto creará/actualizará los archivos en `data/`:
- `cloud-status.json` - Estado actual de todos los servicios
- `cloud-history.json` - Histórico de reportes por servicio

### 2. Programar el Scraper Automático

**Opción A: Usar cron en el servidor**

Edita tu crontab:
\`\`\`bash
crontab -e
\`\`\`

Agrega esta línea para ejecutar cada 5 minutos:
\`\`\`
*/5 * * * * cd /ruta/a/tu/proyecto && npx tsx scripts/cloud-status-scraper.ts >> /var/log/cloud-scraper.log 2>&1
\`\`\`

**Opción B: Usar un proceso Node.js continuo**

Crea `scripts/scheduler.ts`:
\`\`\`typescript
import { spawn } from 'child_process'

async function runScraper() {
  console.log(`[${new Date().toISOString()}] Ejecutando scraper...`)
  
  const scraper = spawn('npx', ['tsx', 'scripts/cloud-status-scraper.ts'])
  
  scraper.stdout.on('data', (data) => {
    console.log(data.toString())
  })
  
  scraper.stderr.on('data', (data) => {
    console.error(data.toString())
  })
}

// Ejecutar inmediatamente
runScraper()

// Luego cada 5 minutos
setInterval(runScraper, 5 * 60 * 1000)
\`\`\`

Ejecuta con:
\`\`\`bash
npx tsx scripts/scheduler.ts
\`\`\`

**Opción C: Usar PM2 (recomendado para producción)**

Instala PM2:
\`\`\`bash
npm install -g pm2
\`\`\`

Crea `ecosystem.config.js`:
\`\`\`javascript
module.exports = {
  apps: [{
    name: 'cloud-scraper',
    script: 'npx',
    args: 'tsx scripts/scheduler.ts',
    cron_restart: '*/5 * * * *',
    autorestart: true,
    watch: false,
    max_memory_restart: '200M',
  }]
}
\`\`\`

Inicia:
\`\`\`bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Para iniciar con el sistema
\`\`\`

### 3. Ver el Dashboard

Accede a la página del monitor:
\`\`\`
http://localhost:3000/monitor
\`\`\`

O en producción:
\`\`\`
https://tu-dominio.com/monitor
\`\`\`

## 📊 Características del Dashboard

- **Gráficas en tiempo real** con Chart.js mostrando tendencias por región
- **Logos reales** de cada proveedor usando Clearbit Logo API
- **Estados colorizados**:
  - 🟢 Verde: Operacional (< 100 reportes)
  - 🟡 Amarillo: Degradado (100-299 reportes)
  - 🔴 Rojo: Caído (≥ 300 reportes)
- **Vista por región** para cada proveedor
- **Actualización automática** cada 60 segundos sin recargar

## 🔧 Configuración Avanzada

### Cambiar Frecuencia de Scraping

Edita `scripts/cloud-status-scraper.ts` y ajusta el delay entre requests:
\`\`\`typescript
await new Promise((resolve) => setTimeout(resolve, 1000)) // 1 segundo entre servicios
\`\`\`

### Cambiar Histórico Guardado

Por defecto guarda 288 puntos (24 horas si se ejecuta cada 5 min). Para cambiar:

En `cloud-status-scraper.ts`:
\`\`\`typescript
if (history[key].length > 288) {  // Cambia este número
  history[key] = history[key].slice(-288)
}
\`\`\`

### Añadir Más Proveedores

Edita el array `CLOUD_PROVIDERS` en `scripts/cloud-status-scraper.ts`:
\`\`\`typescript
const CLOUD_PROVIDERS = [
  // ... existentes ...
  { slug: "nuevo-servicio", name: "Nuevo Servicio", clearbit: "dominio.com" },
]
\`\`\`

**Nota:** Verifica que el slug coincida con la URL de DownDetector.

## 🛠️ Troubleshooting

### El scraper no genera datos

1. Verifica que el directorio `data/` existe
2. Revisa los logs para errores de red
3. Asegúrate de tener conexión a internet
4. Verifica que DownDetector no está bloqueando tu IP

### Las gráficas no se muestran

1. Verifica que `cloud-history.json` tiene datos
2. Abre la consola del navegador para ver errores
3. Asegúrate de que Chart.js está correctamente instalado:
   \`\`\`bash
   npm install chart.js react-chartjs-2
   \`\`\`

### Los logos no cargan

Los logos usan Clearbit Logo API. Si alguno falla:
1. Verifica la URL del dominio en el array `CLOUD_PROVIDERS`
2. Algunos servicios pueden no tener logo en Clearbit
3. Considera descargar logos localmente a `public/logos/`

## 📝 Notas Legales

- Este sistema scrapea datos de DownDetector para uso informativo
- Respeta `robots.txt` y no hagas requests excesivos
- Para uso comercial, considera contactar a DownDetector para acceso oficial a su API
- Los datos son estimaciones basadas en reportes de usuarios, no estados oficiales

## 🔒 Seguridad

- No expone credenciales (no se requieren)
- Rate limiting incorporado (1s entre requests)
- Maneja errores de red gracefully
- Los datos se almacenan localmente

## 📈 Próximas Mejoras

- [ ] Integración con Andrea IA para análisis automático
- [ ] Alertas por Webhook/Email cuando un servicio cae
- [ ] Exportar reportes PDF
- [ ] Comparativas históricas por semana/mes
- [ ] API pública para consultar datos
- [ ] Dashboard admin para configuración
