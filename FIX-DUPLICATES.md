# Solución a Error de Rutas Duplicadas

## El Problema
Next.js detecta rutas duplicadas entre `/(public)/bare-metal` y `/bare-metal`

## Solución

### Opción 1: Ejecutar el script de limpieza
\`\`\`bash
chmod +x cleanup-routes.sh
./cleanup-routes.sh
npm run dev
\`\`\`

### Opción 2: Limpieza manual
\`\`\`bash
# 1. Eliminar carpetas duplicadas en la raíz de app/
rm -rf app/bare-metal
rm -rf app/clusters
rm -rf app/vps
rm -rf app/contacto

# 2. Limpiar caché de Next.js
rm -rf .next
rm -rf node_modules/.cache

# 3. Reiniciar servidor
npm run dev
\`\`\`

### Opción 3: Verificar sistema de archivos
\`\`\`bash
# Ver estructura de carpetas
ls -la app/

# Debe mostrar solo:
# - (public)/
# - api/
# - dashboard/
# - login/
# - layout.tsx
# - globals.css
\`\`\`

## Estructura Correcta

Las páginas públicas (con header/footer) están en:
- `app/(public)/page.tsx` → home
- `app/(public)/bare-metal/page.tsx`
- `app/(public)/clusters/page.tsx`
- `app/(public)/vps/page.tsx`
- `app/(public)/contacto/page.tsx`

Las páginas privadas (sin header/footer) están en:
- `app/login/page.tsx`
- `app/dashboard/page.tsx`
