# Configurar API de OpenAI

## Pasos para configurar la API key de OpenAI:

### 1. En tu servidor local o de desarrollo:

Crea o edita el archivo `.env.local` en la raíz del proyecto y agrega:

\`\`\`env
OPENAI_API_KEY=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
\`\`\`

Reinicia el servidor:
\`\`\`bash
npm run dev
\`\`\`

### 2. En tu servidor de producción (cPanel, VPS, etc.):

**Opción A: Panel de Control de Hosting**
1. Ve a la sección de "Variables de Entorno" o "Environment Variables"
2. Agrega una nueva variable:
   - Nombre: `OPENAI_API_KEY`
   - Valor: `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`
3. Reinicia la aplicación

**Opción B: Archivo .env en el servidor**
1. Conéctate por SSH al servidor
2. Ve al directorio de tu aplicación
3. Crea o edita el archivo `.env.local`:
   \`\`\`bash
   cd /home/saturnoocloud/nodeapp
   nano .env.local
   \`\`\`
4. Agrega la línea:
   \`\`\`
   OPENAI_API_KEY=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
   \`\`\`
5. Guarda y reinicia la aplicación:
   \`\`\`bash
   pm2 restart nodeapp
   \`\`\`

### 3. Verificar que funciona:

1. Ve al chat de Loise en tu aplicación
2. Envía un mensaje de prueba
3. Deberías recibir respuestas del chatbot usando tu API key de OpenAI

## Notas de Seguridad:

- NUNCA subas el archivo `.env.local` a Git
- Asegúrate de que `.env.local` esté en tu `.gitignore`
- No compartas tu API key públicamente
- Revisa regularmente el uso de tu API en OpenAI Dashboard: https://platform.openai.com/usage

## Modelos disponibles:

El chatbot usa `gpt-4o` por defecto. Otros modelos disponibles:
- `gpt-4o` - Más inteligente y capaz (recomendado)
- `gpt-4o-mini` - Más rápido y económico
- `gpt-4-turbo` - Versión anterior de GPT-4

Para cambiar el modelo, edita el archivo `app/api/loise/chat/route.ts` línea donde dice `model: openai("gpt-4o")`.
