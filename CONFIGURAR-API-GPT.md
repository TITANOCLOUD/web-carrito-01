# Configuración de API de GPT para el Chatbot Loise

## Ubicación del Chatbot

El chatbot Loise está configurado en: `app/api/loise/chat/route.ts`

## Opción 1: Usar Vercel AI Gateway (Recomendado - Sin configuración)

Por defecto, el chatbot usa el **Vercel AI Gateway** que ya incluye acceso a modelos de OpenAI sin necesidad de configurar API keys adicionales.

**No necesitas hacer nada**, el código actual ya está configurado para usar:
\`\`\`typescript
model: "openai/gpt-4o"
\`\`\`

## Opción 2: Usar tu propia API Key de OpenAI

Si prefieres usar tu propia API key de OpenAI:

### 1. Obtener tu API Key

1. Ve a https://platform.openai.com/api-keys
2. Inicia sesión con tu cuenta de OpenAI
3. Crea una nueva API key
4. Copia la key (empieza con `sk-...`)

### 2. Configurar la Variable de Entorno

Agrega la siguiente variable de entorno en tu servidor:

\`\`\`bash
OPENAI_API_KEY=sk-tu-api-key-aqui
\`\`\`

**En cPanel/Servidor:**
1. Ve al panel de configuración de tu aplicación Node.js
2. Busca la sección de "Variables de Entorno"
3. Agrega: `OPENAI_API_KEY` con el valor de tu key

**En desarrollo local:**
Crea un archivo `.env.local` en la raíz del proyecto:
\`\`\`
OPENAI_API_KEY=sk-tu-api-key-aqui
\`\`\`

### 3. Actualizar el código (si usas API key propia)

Si quieres usar la API key directamente con OpenAI SDK, modifica `app/api/loise/chat/route.ts`:

\`\`\`typescript
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)
\`\`\`

## Verificar que funciona

1. Accede al chat en tu aplicación
2. Envía un mensaje de prueba
3. Deberías recibir una respuesta de Loise

## Solución de Problemas

**Error: "Invalid API Key"**
- Verifica que la API key esté correctamente configurada en las variables de entorno
- Asegúrate de que la key no tenga espacios al inicio o final
- Reinicia la aplicación después de agregar la variable

**Error: "Rate limit exceeded"**
- Has excedido el límite de tu plan de OpenAI
- Espera unos minutos o actualiza tu plan en OpenAI

**Error: "Model not found"**
- Verifica que tienes acceso al modelo gpt-4o
- Puedes cambiar a gpt-3.5-turbo si no tienes acceso a GPT-4

## Costos

- **Vercel AI Gateway**: Gratis (límites según tu plan de Vercel)
- **OpenAI Directo**: Según uso
  - GPT-4o: ~$0.005 por 1K tokens input, ~$0.015 por 1K tokens output
  - GPT-3.5-turbo: ~$0.0005 por 1K tokens input, ~$0.0015 por 1K tokens output

## Credenciales de Acceso Actuales

**Usuario:** admin  
**Contraseña:** Admin*2020

Estas credenciales están hardcodeadas en `app/(auth)/login/page.tsx` líneas 25-26.
