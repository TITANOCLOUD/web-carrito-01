# Estructura del Proyecto Titanocloud

## Organización de Rutas

Este proyecto utiliza **Route Groups** de Next.js para separar páginas públicas de páginas privadas.

### Páginas Públicas (con Header y Footer)
- Ubicación: `app/(public)/`
- Layout: `app/(public)/layout.tsx` (incluye Header y Footer)
- Páginas:
  - `/` - Homepage
  - `/bare-metal` - Servidores Bare Metal
  - `/clusters` - Kubernetes Clusters
  - `/vps` - Servidores VPS
  - `/contacto` - Formulario de contacto

### Páginas Privadas (SIN Header ni Footer)
- Ubicación: `app/login/`
- Layout: Ninguno (usa solo el layout raíz)
- Páginas:
  - `/login` - Página de inicio de sesión

### Layout Raíz
- Ubicación: `app/layout.tsx`
- Contenido: Solo estructura HTML básica, NO incluye Header ni Footer
- Se aplica a TODAS las páginas del proyecto

## Importante

La página de login (`/login`) NO debe mostrar Header ni Footer. Si los ves:
1. Limpia el caché del navegador (Ctrl+Shift+R o Cmd+Shift+R)
2. Reinicia el servidor de desarrollo
3. Verifica que no haya archivos de caché en `.next/`
