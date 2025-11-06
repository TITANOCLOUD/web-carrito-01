# Guía de Navegación Compartida

## Estructura

El sistema de navegación está centralizado en dos componentes:

1. **`components/navigation.tsx`** - El menú de navegación principal
2. **`components/page-layout.tsx`** - Layout wrapper que incluye la navegación

## Uso en Páginas

### Opción 1: Usar PageLayout (Recomendado)

\`\`\`tsx
// app/vps/page.tsx
import { PageLayout } from '@/components/page-layout'

export default function VPSPage() {
  return (
    <PageLayout>
      <h1>VPS</h1>
      {/* Tu contenido aquí */}
    </PageLayout>
  )
}
\`\`\`

### Opción 2: Usar Navigation directamente

\`\`\`tsx
// app/page.tsx
import { Navigation } from '@/components/navigation'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Tu contenido aquí */}
      </main>
    </>
  )
}
\`\`\`

## Actualizar el Menú

Para agregar, editar o eliminar items del menú, edita el array `navItems` en `components/navigation.tsx`:

\`\`\`tsx
const navItems = [
  { href: '/vps', label: 'VPS' },
  { href: '/bare-metal', label: 'Bare Metal' },
  { href: '/clusters', label: 'Clusters' },
  { href: '/dominios', label: 'Dominios' },
  { href: '/iac', label: 'IAC' },
  // Agregar nuevos items aquí
]
\`\`\`

**Los cambios se reflejarán automáticamente en todas las páginas que usen el componente.**

## Ventajas

- **Un solo lugar para editar**: Todos los cambios al menú se hacen en un solo archivo
- **Consistencia garantizada**: Todas las páginas usan el mismo componente
- **Fácil mantenimiento**: No necesitas actualizar múltiples archivos
- **Responsive**: El menú se adapta automáticamente a móvil y desktop

## Personalización

### Cambiar estilos del menú

Edita las clases de Tailwind en `components/navigation.tsx`:

\`\`\`tsx
<nav className="border-b bg-background/95 backdrop-blur">
  {/* Cambia estas clases según tu diseño */}
</nav>
\`\`\`

### Agregar logo

\`\`\`tsx
<Link href="/" className="flex items-center gap-2">
  <Image src="/logo.png" alt="Logo" width={32} height={32} />
  <span className="text-xl font-bold">TITANO CLOUD</span>
</Link>
\`\`\`

### Agregar menú móvil

Usa el componente `Sheet` de shadcn/ui para crear un menú hamburguesa en móvil.
