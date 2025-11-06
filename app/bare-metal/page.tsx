import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const riseServers = [
  {
    name: "RISE-S-1",
    cpu: "AMD Ryzen 7 9700X - 8 c / 16 t - 3.8 GHz / 5.5 GHz",
    ram: "64 GB",
    storage: "2 x 512 GB",
    bandwidth: "Public 1 Gbps guaranteed",
    price: "$81.99",
    isNew: false,
    available: true,
  },
  {
    name: "RISE-1",
    cpu: "Intel Xeon-E 2386G - 6 c / 12 t - 3.5 GHz / 4.7 GHz",
    ram: "From 32 GB to 128 GB",
    storage: "From 2 x 512 GB to 2 x 512 GB + 2 x 6 TB",
    bandwidth: "Public 1 Gbps\nPrivate 1 Gbps guaranteed",
    price: "$84.99",
    isNew: false,
    available: true,
  },
  {
    name: "RISE-2",
    cpu: "Intel Xeon-E 2388G - 8 c / 16 t - 3.2 GHz / 4.6 GHz",
    ram: "From 32 GB to 128 GB",
    storage: "From 2 x 512 GB to 2 x 512 GB + 2 x 6 TB",
    bandwidth: "Public From 1 Gbps to 3 Gbps guaranteed\nPrivate From 1 Gbps to 2 Gbps guaranteed",
    price: "$96.99",
    isNew: false,
    available: true,
  },
  {
    name: "RISE-Game-1",
    cpu: "AMD Ryzen 5 5600X - 6 c / 12 t - 3.7 GHz / 4.6 GHz",
    ram: "From 32 GB to 64 GB",
    storage: "2 x 512 GB",
    bandwidth: "Public From 250 Mbps (burst 1 Gbps) to 1 Gbps guaranteed",
    price: "$96.99",
    isNew: false,
    available: true,
  },
  {
    name: "RISE-S-2",
    cpu: "AMD Ryzen 7 9700X - 8 c / 16 t - 3.8 GHz / 5.5 GHz",
    ram: "64 GB",
    storage: "2 x 512 GB",
    bandwidth: "Public 1 Gbps guaranteed\nPrivate 1 Gbps guaranteed",
    price: "$96.99",
    isNew: false,
    available: true,
  },
  {
    name: "Rise-Game-2",
    cpu: "AMD Ryzen 7 5800X - 8 c / 16 t - 3.8 GHz / 4.7 GHz",
    ram: "From 64 GB to 128 GB",
    storage: "2 x 960 GB",
    bandwidth: "Public From 250 Mbps (burst 1 Gbps) to 1 Gbps guaranteed",
    price: "$133.99",
    isNew: false,
    available: true,
  },
  {
    name: "RISE-3",
    cpu: "AMD Ryzen 9 5900X - 12 c / 24 t - 3.7 GHz / 4.8 GHz",
    ram: "From 32 GB to 128 GB",
    storage: "From 2 x 512 GB to 2 x 512 GB + 2 x 6 TB",
    bandwidth: "Public From 1 Gbps to 3 Gbps guaranteed\nPrivate From 1 Gbps to 2 Gbps guaranteed",
    price: "$136.99",
    isNew: false,
    available: true,
  },
  {
    name: "RISE-M",
    cpu: "AMD RYZEN 9 9900X - 12 c / 24 t - 4.4 GHz / 5.6 GHz",
    ram: "64 GB",
    storage: "2 x 512 GB",
    bandwidth: "Public 1 Gbps guaranteed\nPrivate 1 Gbps guaranteed",
    price: "$140.99",
    isNew: true,
    available: true,
  },
  {
    name: "RISE-L",
    cpu: "AMD RYZEN 9 9950X - 16 c / 32 t - 4.3 GHz / 5.7 GHz",
    ram: "128 GB",
    storage: "2 x 960 GB",
    bandwidth: "Public 1 Gbps guaranteed\nPrivate 1 Gbps guaranteed",
    price: "$199.99",
    isNew: true,
    available: true,
  },
  {
    name: "RISE-4",
    cpu: "AMD Epyc 7313 - 16 c / 32 t - 3 GHz / 3.7 GHz",
    ram: "From 64 GB to 1 TB",
    storage: "From 2 x 960 GB to 2 x 960 GB + 2 x 6 TB",
    bandwidth: "Public From 1 Gbps to 3 Gbps guaranteed\nPrivate From 1 Gbps to 2 Gbps guaranteed",
    price: "$236.99",
    isNew: false,
    available: true,
  },
  {
    name: "RISE-STOR",
    cpu: "AMD Ryzen 7 Pro 3700 - 8 c / 16 t - 3.6 GHz / 4.4 GHz",
    ram: "From 32 GB to 128 GB",
    storage: "From 4 x 14 TB to 6 x 14 TB",
    bandwidth: "Public From 1 Gbps to 3 Gbps guaranteed\nPrivate From 1 Gbps to 2 Gbps guaranteed",
    price: "$244.99",
    isNew: false,
    available: true,
  },
  {
    name: "RISE-7",
    cpu: "AMD Epyc 7402 - 24 c / 48 t - 2.8 GHz / 3.35 GHz",
    ram: "From 128 GB to 1 TB",
    storage: "From 2 x 1.92 TB to 4 x 3.84 TB",
    bandwidth: "Public From 1 Gbps to 3 Gbps guaranteed\nPrivate From 1 Gbps to 2 Gbps guaranteed",
    price: "$251.99",
    isNew: false,
    available: false,
  },
  {
    name: "RISE-5",
    cpu: "AMD Epyc 7413 - 24 c / 48 t - 2.65 GHz / 3.6 GHz",
    ram: "From 128 GB to 1 TB",
    storage: "From 2 x 960 GB to 2 x 960 GB + 2 x 6 TB",
    bandwidth: "Public From 1 Gbps to 3 Gbps guaranteed\nPrivate From 1 Gbps to 2 Gbps guaranteed",
    price: "$266.99",
    isNew: false,
    available: true,
  },
  {
    name: "RISE-8",
    cpu: "AMD Epyc 7532 - 32 c / 64 t - 2.4 GHz / 3.3 GHz",
    ram: "From 256 GB to 1 TB",
    storage: "From 2 x 1.92 TB to 4 x 3.84 TB",
    bandwidth: "Public From 1 Gbps to 3 Gbps guaranteed\nPrivate From 1 Gbps to 2 Gbps guaranteed",
    price: "$281.99",
    isNew: false,
    available: true,
  },
  {
    name: "RISE-6",
    cpu: "Intel Xeon Gold 6312U - 24 c / 48 t - 2.4 GHz / 3.6 GHz",
    ram: "From 128 GB to 1 TB",
    storage: "From 2 x 960 GB to 2 x 960 GB + 2 x 6 TB",
    bandwidth: "Public From 1 Gbps to 3 Gbps guaranteed\nPrivate From 1 Gbps to 2 Gbps guaranteed",
    price: "$310.99",
    isNew: false,
    available: true,
  },
  {
    name: "RISE-9",
    cpu: "AMD Epyc 7642 - 48 c / 96 t - 2.3 GHz / 3.6 GHz",
    ram: "From 256 GB to 1 TB",
    storage: "From 2 x 1.92 TB to 4 x 3.84 TB",
    bandwidth: "Public From 1 Gbps to 3 Gbps guaranteed\nPrivate From 1 Gbps to 2 Gbps guaranteed",
    price: "$340.99",
    isNew: true,
    available: false,
  },
  {
    name: "RISE-XL",
    cpu: "AMD EPYC TURIN 9455 - 48 c / 96 t - 3.15 GHz / 4.4 GHz",
    ram: "128 GB",
    storage: "2 x 1.92 TB",
    bandwidth: "Public From 1 Gbps to 3 Gbps guaranteed\nPrivate From 1 Gbps to 2 Gbps guaranteed",
    price: "$399.99",
    isNew: true,
    available: false,
  },
]

const advanceServers = [
  {
    name: "Advance-1 2024",
    cpu: "AMD EPYC 4244P - 6 c / 12 t - 3.8 GHz / 5.1 GHz",
    ram: "From 32 GB to 192 GB",
    storage: "From 2 x 960 GB to 4 x 7.68 TB",
    bandwidth: "Public From 1 Gbps to 5 Gbps guaranteed\nPrivate 25 Gbps unmetered",
    price: "$118.99",
    isNew: false,
    available: true,
  },
  {
    name: "Advance-1 2026",
    cpu: "AMD EPYC 4245P - 6 c / 12 t - 3.9 GHz / 5.4 GHz",
    ram: "From 32 GB to 256 GB",
    storage: "From 2 x 960 GB to 4 x 7.68 TB",
    bandwidth: "Public From 1 Gbps to 5 Gbps guaranteed\nPrivate 25 Gbps unmetered",
    price: "$159.99",
    isNew: false,
    available: true,
  },
  {
    name: "Advance-2 2024",
    cpu: "AMD EPYC 4344P - 8 c / 16 t - 3.8 GHz / 5.3 GHz",
    ram: "From 64 GB to 192 GB",
    storage: "From 2 x 960 GB to 4 x 7.68 TB",
    bandwidth: "Public From 1 Gbps to 5 Gbps guaranteed\nPrivate 25 Gbps unmetered",
    price: "$162.99",
    isNew: false,
    available: true,
  },
  {
    name: "Advance-2 2026",
    cpu: "AMD EPYC 4345P - 8 c / 16 t - 3.8 GHz / 5.5 GHz",
    ram: "From 64 GB to 256 GB",
    storage: "From 2 x 960 GB to 4 x 7.68 TB",
    bandwidth: "Public From 1 Gbps to 5 Gbps guaranteed\nPrivate 25 Gbps unmetered",
    price: "$191.99",
    isNew: false,
    available: true,
  },
  {
    name: "Advance-3 2024",
    cpu: "AMD EPYC 4464P - 12 c / 24 t - 3.7 GHz / 5.4 GHz",
    ram: "From 64 GB to 192 GB",
    storage: "From 2 x 960 GB to 4 x 7.68 TB",
    bandwidth: "Public From 1 Gbps to 5 Gbps guaranteed\nPrivate 25 Gbps unmetered",
    price: "$221.99",
    isNew: false,
    available: true,
  },
  {
    name: "Advance-3 2026",
    cpu: "AMD EPYC 4465P - 12 c / 24 t - 3.4 GHz / 5.4 GHz",
    ram: "From 64 GB to 256 GB",
    storage: "From 2 x 960 GB to 4 x 7.68 TB",
    bandwidth: "Public From 1 Gbps to 5 Gbps guaranteed\nPrivate 25 Gbps unmetered",
    price: "$255.99",
    isNew: false,
    available: true,
  },
  {
    name: "Advance-STOR 2024",
    cpu: "AMD EPYC 4344P - 8 c / 16 t - 3.8 GHz / 5.3 GHz",
    ram: "From 32 GB to 192 GB",
    storage: "From 2 x 22 TB to 8 x 22 TB",
    bandwidth: "Public From 1 Gbps to 5 Gbps guaranteed\nPrivate 25 Gbps unmetered",
    price: "$266.99",
    isNew: false,
    available: true,
  },
  {
    name: "Advance-4 2024",
    cpu: "AMD EPYC 4584PX - 16 c / 32 t - 4.2 GHz / 5.7 GHz",
    ram: "From 64 GB to 192 GB",
    storage: "From 2 x 960 GB to 4 x 7.68 TB",
    bandwidth: "Public From 1 Gbps to 5 Gbps guaranteed\nPrivate 25 Gbps unmetered",
    price: "$266.99",
    isNew: false,
    available: true,
  },
  {
    name: "Advance-5 2024",
    cpu: "AMD EPYC 8224P - 24 c / 48 t - 2.55 GHz / 3 GHz",
    ram: "From 96 GB to 576 GB",
    storage: "From 2 x 960 GB to 8 x 7.68 TB",
    bandwidth: "Public From 1 Gbps to 5 Gbps guaranteed\nPrivate 25 Gbps unmetered",
    price: "$295.99",
    isNew: false,
    available: true,
  },
  {
    name: "Advance-4 2026",
    cpu: "AMD EPYC 4585PX - 16 c / 32 t - 4.3 GHz / 5.7 GHz",
    ram: "From 64 GB to 256 GB",
    storage: "From 2 x 960 GB to 4 x 7.68 TB",
    bandwidth: "Public From 1 Gbps to 5 Gbps guaranteed\nPrivate 25 Gbps unmetered",
    price: "$319.99",
    isNew: false,
    available: true,
  },
  {
    name: "Advance-STOR 2026",
    cpu: "AMD EPYC 4345P - 8 c / 16 t - 3.8 GHz / 5.5 GHz",
    ram: "From 32 GB to 256 GB",
    storage: "From 2 x 24 TB to 8 x 24 TB",
    bandwidth: "Public From 1 Gbps to 5 Gbps guaranteed\nPrivate 25 Gbps unmetered",
    price: "$319.99",
    isNew: false,
    available: true,
  },
]

function ServerCard({ server }: { server: (typeof riseServers)[0] }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl">{server.name}</CardTitle>
          {server.isNew && <Badge variant="secondary">New</Badge>}
        </div>
        <CardDescription className="text-2xl font-bold text-foreground">{server.price}/mo</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">CPU</p>
          <p className="text-sm">{server.cpu}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">RAM</p>
          <p className="text-sm">{server.ram}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Storage</p>
          <p className="text-sm">{server.storage}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Bandwidth</p>
          <p className="text-sm whitespace-pre-line">{server.bandwidth}</p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="flex-1" disabled={!server.available}>
          {server.available ? "Configure" : "Soon Available"}
        </Button>
        <Button variant="outline" size="icon">
          <span className="sr-only">Compare</span>☐
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function BareMetalPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-muted/40">
          <div className="container py-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Bare Metal Servers</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Servidores dedicados de alto rendimiento con hardware de última generación. Potencia sin límites para tus
              aplicaciones más exigentes.
            </p>
          </div>
        </section>

        {/* RISE Series */}
        <section className="container py-16 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">RISE Series</h2>
            <p className="text-muted-foreground">
              Servidores optimizados para gaming, desarrollo y cargas de trabajo generales
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {riseServers.map((server) => (
              <ServerCard key={server.name} server={server} />
            ))}
          </div>
        </section>

        {/* Advance Series */}
        <section className="container py-16 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Advance Series</h2>
            <p className="text-muted-foreground">
              Servidores de próxima generación con procesadores AMD EPYC y conectividad de alta velocidad
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {advanceServers.map((server) => (
              <ServerCard key={server.name} server={server} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
