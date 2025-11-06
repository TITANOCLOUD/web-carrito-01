import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 space-y-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Infraestructura Cloud Sin Límites</h1>
            <p className="text-xl text-muted-foreground">
              Despliega servidores VPS, Bare Metal y Clusters en segundos con TITANO CLOUD
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link href="/vps">Explorar VPS</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Comenzar Gratis</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">VPS Rápidos</h3>
              <p className="text-muted-foreground">Servidores virtuales listos en 60 segundos</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Bare Metal</h3>
              <p className="text-muted-foreground">Servidores dedicados de alto rendimiento</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Clusters</h3>
              <p className="text-muted-foreground">Infraestructura escalable y distribuida</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
