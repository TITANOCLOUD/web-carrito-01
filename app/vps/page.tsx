"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Server, Check, Cpu, HardDrive, Shield, Zap, ChevronDown, Globe, X, Wifi, Activity } from "lucide-react"
import { useState } from "react"

export default function VPSPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [configCpu, setConfigCpu] = useState(4)
  const [configRam, setConfigRam] = useState(8)
  const [configStorage, setConfigStorage] = useState(100)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [isTestingSpeed, setIsTestingSpeed] = useState(false)
  const [speedResults, setSpeedResults] = useState<any>(null)
  const [hoveredDatacenter, setHoveredDatacenter] = useState<string | null>(null)

  const vpsPlans = [
    {
      id: "atlas",
      name: "Atlas",
      subtitle: "El Fundamento",
      cpu: 4,
      ram: 8,
      storage: 100,
      bandwidth: "400 Mbit/s",
      price: 4.2,
      setupFee: "Gratis",
      maxCpu: 8,
      maxRam: 16,
      maxStorage: 200,
    },
    {
      id: "prometeo",
      name: "Prometeo",
      subtitle: "El Visionario",
      cpu: 6,
      ram: 12,
      storage: 150,
      bandwidth: "1 Gb/s",
      price: 6.75,
      setupFee: "Gratis",
      maxCpu: 12,
      maxRam: 24,
      maxStorage: 300,
    },
    {
      id: "cronos",
      name: "Cronos",
      subtitle: "El Líder",
      cpu: 8,
      ram: 24,
      storage: 200,
      bandwidth: "1.5 Gb/s",
      price: 12.75,
      setupFee: "Gratis",
      recommended: true,
      maxCpu: 16,
      maxRam: 48,
      maxStorage: 500,
    },
    {
      id: "hiperion",
      name: "Hiperión",
      subtitle: "La Luz",
      cpu: 12,
      ram: 48,
      storage: 300,
      bandwidth: "2 Gb/s",
      price: 22.08,
      setupFee: "Gratis",
      maxCpu: 20,
      maxRam: 64,
      maxStorage: 700,
    },
    {
      id: "oceano",
      name: "Océano",
      subtitle: "El Vasto",
      cpu: 16,
      ram: 64,
      storage: 350,
      bandwidth: "2.5 Gb/s",
      price: 34.34,
      setupFee: "Gratis",
      maxCpu: 24,
      maxRam: 96,
      maxStorage: 900,
    },
    {
      id: "titan",
      name: "Titán",
      subtitle: "El Supremo",
      cpu: 24,
      ram: 96,
      storage: 400,
      bandwidth: "3 Gb/s",
      price: 45.39,
      setupFee: "Gratis",
      maxCpu: 32,
      maxRam: 128,
      maxStorage: 1000,
    },
  ]

  const datacenters = [
    { id: "ny", name: "Nueva York", x: 25, y: 35, type: "primary" },
    { id: "london", name: "Londres", x: 50, y: 30, type: "primary" },
    { id: "tokyo", name: "Tokio", x: 85, y: 35, type: "primary" },
    { id: "sydney", name: "Sídney", x: 88, y: 75, type: "vps" },
    { id: "saopaulo", name: "São Paulo", x: 35, y: 70, type: "vps" },
    { id: "frankfurt", name: "Frankfurt", x: 52, y: 28, type: "vps" },
    { id: "singapore", name: "Singapur", x: 78, y: 55, type: "vps" },
    { id: "toronto", name: "Toronto", x: 23, y: 32, type: "local" },
    { id: "mumbai", name: "Mumbai", x: 70, y: 45, type: "local" },
    { id: "paris", name: "París", x: 51, y: 30, type: "coming" },
    { id: "dubai", name: "Dubái", x: 62, y: 42, type: "vps" },
    { id: "chicago", name: "Chicago", x: 22, y: 33, type: "local" },
  ]

  const serverLocations = [
    {
      id: "ny",
      name: "Nueva York",
      country: "Estados Unidos",
      region: "América del Norte",
      lat: 40.7128,
      lng: -74.006,
    },
    { id: "london", name: "Londres", country: "Reino Unido", region: "Europa", lat: 51.5074, lng: -0.1278 },
    { id: "tokyo", name: "Tokio", country: "Japón", region: "Asia", lat: 35.6762, lng: 139.6503 },
    { id: "sydney", name: "Sídney", country: "Australia", region: "Oceanía", lat: -33.8688, lng: 151.2093 },
    { id: "saopaulo", name: "São Paulo", country: "Brasil", region: "América del Sur", lat: -23.5505, lng: -46.6333 },
    { id: "frankfurt", name: "Frankfurt", country: "Alemania", region: "Europa", lat: 50.1109, lng: 8.6821 },
    { id: "singapore", name: "Singapur", country: "Singapur", region: "Asia", lat: 1.3521, lng: 103.8198 },
    { id: "toronto", name: "Toronto", country: "Canadá", region: "América del Norte", lat: 43.6532, lng: -79.3832 },
    { id: "mumbai", name: "Mumbai", country: "India", region: "Asia", lat: 19.076, lng: 72.8777 },
    { id: "paris", name: "París", country: "Francia", region: "Europa", lat: 48.8566, lng: 2.3522 },
  ]

  const faqs = [
    {
      question: "¿Qué es un VPS?",
      answer:
        "Un VPS (Virtual Private Server) es un servidor virtual que funciona como un servidor dedicado dentro de un servidor físico más grande. Ofrece recursos garantizados, control total del sistema operativo y aislamiento de otros usuarios.",
    },
    {
      question: "¿Cuánto cuesta un servidor VPS?",
      answer:
        "El precio de un VPS depende de varios factores: cantidad de CPU, memoria RAM, almacenamiento y ancho de banda. Nuestros planes comienzan desde $4.20/mes para proyectos pequeños hasta $45.39/mes para aplicaciones de alto rendimiento. Los factores que influyen en el precio incluyen el tipo de almacenamiento (SSD NVMe es más rápido), la cantidad de RAM necesaria para tus aplicaciones, y el ancho de banda requerido.",
    },
    {
      question: "¿Qué sistemas operativos están disponibles?",
      answer:
        "Ofrecemos una amplia selección de sistemas operativos gratuitos y de pago. Entre los gratuitos incluimos distribuciones Linux como Ubuntu, CentOS, Fedora y Debian. También disponemos de licencias para Windows Server con costos adicionales según la versión requerida.",
    },
    {
      question: "¿Puedo escalar mi VPS?",
      answer:
        "Sí, todos nuestros planes VPS son escalables. Puedes aumentar CPU, RAM y almacenamiento en cualquier momento sin tiempo de inactividad significativo. El proceso es simple desde tu panel de control.",
    },
    {
      question: "¿Qué tipo de almacenamiento utilizan?",
      answer:
        "Todos nuestros VPS utilizan almacenamiento SSD NVMe de última generación, que ofrece velocidades de lectura/escritura hasta 6 veces más rápidas que los SSD SATA tradicionales. Esto se traduce en mejor rendimiento para bases de datos y aplicaciones.",
    },
  ]

  const calculateCustomPrice = () => {
    const baseCpuPrice = 1.5
    const baseRamPrice = 2
    const baseStoragePrice = 0.15
    return (configCpu * baseCpuPrice + configRam * baseRamPrice + configStorage * baseStoragePrice).toFixed(2)
  }

  const getSelectedPlanLimits = () => {
    const plan = vpsPlans.find((p) => p.id === selectedPlan)
    return plan || vpsPlans[2] // Default to Cronos
  }

  const runSpeedTest = async (locationId: string) => {
    setIsTestingSpeed(true)
    setSelectedLocation(locationId)
    setSpeedResults(null)

    // Simulate speed test with realistic delays
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate realistic speed test results
    const location = serverLocations.find((l) => l.id === locationId)
    const baseLatency = Math.random() * 50 + 10
    const downloadSpeed = Math.random() * 500 + 500
    const uploadSpeed = downloadSpeed * 0.8

    setSpeedResults({
      location: location?.name,
      latency: baseLatency.toFixed(1),
      download: downloadSpeed.toFixed(2),
      upload: uploadSpeed.toFixed(2),
      jitter: (Math.random() * 5 + 1).toFixed(1),
      packetLoss: (Math.random() * 0.5).toFixed(2),
    })

    setIsTestingSpeed(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-6">
          <Server className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold">VPS Serie Titán</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Servidores VPS de Alto Rendimiento
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Elija la configuración que mejor se adapta a sus necesidades: web hosting, gaming, VPN, desarrollo y mucho
          más. Cada plan lleva el nombre de un Titán, simbolizando poder y confiabilidad.
        </p>
      </section>

      <section className="container mx-auto px-4 py-20 bg-slate-950/50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Sus datos, alojados donde más los necesite</h2>
          <p className="text-slate-400 max-w-3xl mx-auto">
            Nuestros VPS están disponibles en numerosas localizaciones estratégicas a nivel mundial para garantizar una
            baja latencia en sus proyectos.
          </p>
        </div>
        <div className="max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 overflow-hidden">
          {/* Stylized World Map */}
          <div className="relative w-full aspect-[2/1] mb-8 bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgb(6 182 212)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Simplified Continent Shapes */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              {/* North America */}
              <path
                d="M 15 25 Q 18 20 22 22 L 28 18 Q 32 20 30 28 L 28 35 Q 25 40 20 38 L 18 42 Q 15 40 16 35 Z"
                fill="rgb(30 41 59)"
                stroke="rgb(51 65 85)"
                strokeWidth="0.3"
                opacity="0.6"
              />
              {/* South America */}
              <path
                d="M 28 50 Q 30 48 32 52 L 35 65 Q 33 72 30 70 L 28 68 Q 26 65 27 58 Z"
                fill="rgb(30 41 59)"
                stroke="rgb(51 65 85)"
                strokeWidth="0.3"
                opacity="0.6"
              />
              {/* Europe */}
              <path
                d="M 48 22 Q 52 20 55 24 L 56 30 Q 54 32 50 30 L 48 28 Z"
                fill="rgb(30 41 59)"
                stroke="rgb(51 65 85)"
                strokeWidth="0.3"
                opacity="0.6"
              />
              {/* Africa */}
              <path
                d="M 48 35 Q 52 33 56 38 L 58 50 Q 56 58 52 56 L 48 52 Q 46 45 48 40 Z"
                fill="rgb(30 41 59)"
                stroke="rgb(51 65 85)"
                strokeWidth="0.3"
                opacity="0.6"
              />
              {/* Asia */}
              <path
                d="M 60 20 Q 68 18 75 22 L 82 28 Q 85 35 80 38 L 75 40 Q 70 42 65 38 L 60 32 Z"
                fill="rgb(30 41 59)"
                stroke="rgb(51 65 85)"
                strokeWidth="0.3"
                opacity="0.6"
              />
              {/* Australia */}
              <path
                d="M 82 68 Q 88 66 92 70 L 90 76 Q 86 78 82 75 Z"
                fill="rgb(30 41 59)"
                stroke="rgb(51 65 85)"
                strokeWidth="0.3"
                opacity="0.6"
              />

              {/* Connection Lines between datacenters */}
              <g opacity="0.3">
                <line x1="25" y1="35" x2="50" y2="30" stroke="rgb(6 182 212)" strokeWidth="0.2" strokeDasharray="2,2">
                  <animate attributeName="stroke-dashoffset" from="0" to="4" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="50" y1="30" x2="85" y2="35" stroke="rgb(6 182 212)" strokeWidth="0.2" strokeDasharray="2,2">
                  <animate attributeName="stroke-dashoffset" from="0" to="4" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="85" y1="35" x2="88" y2="75" stroke="rgb(6 182 212)" strokeWidth="0.2" strokeDasharray="2,2">
                  <animate attributeName="stroke-dashoffset" from="0" to="4" dur="2s" repeatCount="indefinite" />
                </line>
              </g>

              {/* Datacenter Markers */}
              {datacenters.map((dc) => (
                <g
                  key={dc.id}
                  onMouseEnter={() => setHoveredDatacenter(dc.id)}
                  onMouseLeave={() => setHoveredDatacenter(null)}
                  className="cursor-pointer"
                >
                  {/* Pulse Effect */}
                  <circle
                    cx={dc.x}
                    cy={dc.y}
                    r="2"
                    fill="none"
                    stroke={
                      dc.type === "primary"
                        ? "rgb(6 182 212)"
                        : dc.type === "vps"
                          ? "rgb(249 115 22)"
                          : dc.type === "local"
                            ? "rgb(100 116 139)"
                            : "rgb(71 85 105)"
                    }
                    strokeWidth="0.3"
                    opacity="0.6"
                  >
                    <animate attributeName="r" from="2" to="4" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>
                  {/* Main Marker */}
                  <circle
                    cx={dc.x}
                    cy={dc.y}
                    r={hoveredDatacenter === dc.id ? "1.5" : "1"}
                    fill={
                      dc.type === "primary"
                        ? "rgb(6 182 212)"
                        : dc.type === "vps"
                          ? "rgb(249 115 22)"
                          : dc.type === "local"
                            ? "rgb(100 116 139)"
                            : "rgb(71 85 105)"
                    }
                    className="transition-all duration-300"
                  >
                    <animate attributeName="opacity" values="1;0.6;1" dur="3s" repeatCount="indefinite" />
                  </circle>
                  {/* Glow Effect */}
                  <circle
                    cx={dc.x}
                    cy={dc.y}
                    r="1.5"
                    fill={
                      dc.type === "primary"
                        ? "rgb(6 182 212)"
                        : dc.type === "vps"
                          ? "rgb(249 115 22)"
                          : dc.type === "local"
                            ? "rgb(100 116 139)"
                            : "rgb(71 85 105)"
                    }
                    opacity="0.3"
                    filter="blur(1px)"
                  />

                  {/* Label on hover */}
                  {hoveredDatacenter === dc.id && (
                    <g>
                      <rect
                        x={dc.x - 6}
                        y={dc.y - 5}
                        width="12"
                        height="3"
                        fill="rgb(15 23 42)"
                        stroke="rgb(6 182 212)"
                        strokeWidth="0.2"
                        rx="0.5"
                      />
                      <text x={dc.x} y={dc.y - 3} textAnchor="middle" fill="white" fontSize="1.5" fontWeight="600">
                        {dc.name}
                      </text>
                    </g>
                  )}
                </g>
              ))}
            </svg>
          </div>

          {/* Legend */}
          <div className="grid md:grid-cols-4 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 rounded-full bg-cyan-500 mt-1 flex-shrink-0 relative">
                <div className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-75" />
              </div>
              <div>
                <p className="text-white font-semibold mb-1">TITANO CLOUD Datacenters</p>
                <p className="text-slate-400">Centros de datos principales</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 rounded-full bg-orange-500 mt-1 flex-shrink-0 relative">
                <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-75" />
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Local Zones con VPS</p>
                <p className="text-slate-400">Zonas locales con VPS disponibles</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 rounded-full bg-slate-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-semibold mb-1">Local Zones</p>
                <p className="text-slate-400">Zonas locales en expansión</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 rounded border-2 border-slate-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-semibold mb-1">Próximamente</p>
                <p className="text-slate-400">Nuevas localizaciones</p>
              </div>
            </div>
          </div>
          <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-slate-300 text-sm">
              <span className="font-semibold text-white">Características no disponibles en Local Zone:</span>{" "}
              Aplicaciones preinstaladas, Windows, almacenamiento adicional, monitorización, IP adicionales, Load
              Balancer, bases de datos administradas.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Planes VPS Serie Titán</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Del más pequeño al más poderoso, cada plan lleva el nombre de un Titán de la mitología
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {vpsPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`bg-slate-900 ${plan.recommended ? "border-2 border-cyan-500 relative" : "border-slate-800"} hover:border-cyan-500/50 transition-all duration-300`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                  Recomendado
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                <p className="text-cyan-400 text-sm font-semibold">{plan.subtitle}</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-sm text-slate-400">Desde</span>
                  <span className="text-3xl font-bold text-white">${plan.price.toFixed(2)}</span>
                  <span className="text-slate-400">/mes</span>
                </div>
                <p className="text-sm text-slate-500">Gastos de instalación: {plan.setupFee}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>{plan.cpu} vCores</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>{plan.ram} GB RAM</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>{plan.storage} GB SSD NVMe</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Backup automatizado 1 día</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Tráfico ilimitado</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>{plan.bandwidth} de ancho de banda</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.recommended ? "bg-cyan-500 hover:bg-cyan-600" : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  Configurar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {selectedPlan && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-slate-900 border-slate-800 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-white">
                    Configurar {vpsPlans.find((p) => p.id === selectedPlan)?.name}
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    {vpsPlans.find((p) => p.id === selectedPlan)?.subtitle}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedPlan(null)
                    const plan = getSelectedPlanLimits()
                    setConfigCpu(plan.cpu)
                    setConfigRam(plan.ram)
                    setConfigStorage(plan.storage)
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              {/* CPU Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white font-semibold flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    CPU (vCores)
                  </label>
                  <span className="text-cyan-400 font-bold text-lg">{configCpu} vCores</span>
                </div>
                <input
                  type="range"
                  min={getSelectedPlanLimits().cpu}
                  max={getSelectedPlanLimits().maxCpu}
                  step="2"
                  value={configCpu}
                  onChange={(e) => setConfigCpu(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>{getSelectedPlanLimits().cpu}</span>
                  <span>{getSelectedPlanLimits().maxCpu}</span>
                </div>
              </div>

              {/* RAM Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white font-semibold flex items-center gap-2">
                    <Server className="w-5 h-5 text-cyan-400" />
                    RAM (GB)
                  </label>
                  <span className="text-cyan-400 font-bold text-lg">{configRam} GB</span>
                </div>
                <input
                  type="range"
                  min={getSelectedPlanLimits().ram}
                  max={getSelectedPlanLimits().maxRam}
                  step="4"
                  value={configRam}
                  onChange={(e) => setConfigRam(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>{getSelectedPlanLimits().ram} GB</span>
                  <span>{getSelectedPlanLimits().maxRam} GB</span>
                </div>
              </div>

              {/* Storage Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white font-semibold flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-cyan-400" />
                    Almacenamiento SSD NVMe (GB)
                  </label>
                  <span className="text-cyan-400 font-bold text-lg">{configStorage} GB</span>
                </div>
                <input
                  type="range"
                  min={getSelectedPlanLimits().storage}
                  max={getSelectedPlanLimits().maxStorage}
                  step="50"
                  value={configStorage}
                  onChange={(e) => setConfigStorage(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>{getSelectedPlanLimits().storage} GB</span>
                  <span>{getSelectedPlanLimits().maxStorage} GB</span>
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-300 text-lg">Precio estimado:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">${calculateCustomPrice()}</span>
                    <span className="text-slate-400">/mes</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-slate-400 mb-6">
                  <div className="flex justify-between">
                    <span>CPU ({configCpu} vCores)</span>
                    <span>${(configCpu * 1.5).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RAM ({configRam} GB)</span>
                    <span>${(configRam * 2).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Almacenamiento ({configStorage} GB)</span>
                    <span>${(configStorage * 0.15).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-700 pt-2 mt-2">
                    <div className="flex justify-between text-cyan-400 font-semibold">
                      <span>Total mensual</span>
                      <span>${calculateCustomPrice()}</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">Contratar Configuración</Button>
              </div>

              {/* Included Features */}
              <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-slate-800">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-sm">Tráfico ilimitado</p>
                    <p className="text-slate-400 text-xs">Sin límites de transferencia</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-sm">Backup automatizado</p>
                    <p className="text-slate-400 text-xs">Respaldo diario incluido</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-sm">Protección DDoS</p>
                    <p className="text-slate-400 text-xs">Seguridad avanzada incluida</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-sm">Soporte 24/7</p>
                    <p className="text-slate-400 text-xs">Asistencia técnica siempre disponible</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <section className="container mx-auto px-4 py-20 bg-slate-950/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-6">
              <Wifi className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-semibold">Test de Velocidad</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-white">Prueba la Velocidad de Nuestros Servidores</h2>
            <p className="text-slate-400 max-w-3xl mx-auto">
              Selecciona una ubicación y realiza un test de velocidad para ver el rendimiento de nuestra red global
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Server Locations */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  Selecciona una Ubicación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                  {serverLocations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => runSpeedTest(location.id)}
                      disabled={isTestingSpeed}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                        selectedLocation === location.id
                          ? "bg-cyan-500/20 border-cyan-500"
                          : "bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800"
                      } ${isTestingSpeed ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-semibold">{location.name}</p>
                          <p className="text-slate-400 text-sm">
                            {location.country} • {location.region}
                          </p>
                        </div>
                        {selectedLocation === location.id && isTestingSpeed && (
                          <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Speed Test Results */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  Resultados del Test
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!speedResults && !isTestingSpeed && (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center">
                    <Wifi className="w-16 h-16 text-slate-700 mb-4" />
                    <p className="text-slate-400">Selecciona una ubicación para comenzar el test de velocidad</p>
                  </div>
                )}

                {isTestingSpeed && (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center">
                    <Activity className="w-16 h-16 text-cyan-400 animate-pulse mb-4" />
                    <p className="text-white font-semibold mb-2">Realizando test de velocidad...</p>
                    <p className="text-slate-400 text-sm">Esto puede tomar unos segundos</p>
                  </div>
                )}

                {speedResults && !isTestingSpeed && (
                  <div className="space-y-6">
                    <div className="text-center pb-6 border-b border-slate-800">
                      <p className="text-slate-400 text-sm mb-2">Servidor testeado</p>
                      <p className="text-white text-xl font-bold">{speedResults.location}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-xl p-4">
                        <p className="text-slate-400 text-sm mb-1">Latencia</p>
                        <p className="text-3xl font-bold text-white">{speedResults.latency}</p>
                        <p className="text-cyan-400 text-sm">ms</p>
                      </div>

                      <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-xl p-4">
                        <p className="text-slate-400 text-sm mb-1">Jitter</p>
                        <p className="text-3xl font-bold text-white">{speedResults.jitter}</p>
                        <p className="text-green-400 text-sm">ms</p>
                      </div>

                      <div className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-blue-500/30 rounded-xl p-4">
                        <p className="text-slate-400 text-sm mb-1">Descarga</p>
                        <p className="text-3xl font-bold text-white">{speedResults.download}</p>
                        <p className="text-blue-400 text-sm">Mbps</p>
                      </div>

                      <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-xl p-4">
                        <p className="text-slate-400 text-sm mb-1">Subida</p>
                        <p className="text-3xl font-bold text-white">{speedResults.upload}</p>
                        <p className="text-purple-400 text-sm">Mbps</p>
                      </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400 text-sm">Pérdida de Paquetes</span>
                        <span className="text-white font-semibold">{speedResults.packetLoss}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${100 - Number.parseFloat(speedResults.packetLoss) * 20}%` }}
                        />
                      </div>
                    </div>

                    <Button
                      onClick={() => runSpeedTest(selectedLocation!)}
                      className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                      Realizar Nuevo Test
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Características Incluidas</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Todo lo que necesitas en un VPS</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-slate-900 border-slate-800 hover:border-cyan-500/50 transition-all duration-300">
            <CardHeader>
              <Zap className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">SSD NVMe Ultra Rápido</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">
                Almacenamiento de última generación con velocidades de hasta 3500 MB/s para máximo rendimiento
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800 hover:border-cyan-500/50 transition-all duration-300">
            <CardHeader>
              <Shield className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Protección DDoS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">
                Protección automática contra ataques DDoS incluida en todos los planes sin costo adicional
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800 hover:border-cyan-500/50 transition-all duration-300">
            <CardHeader>
              <Globe className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Ubicaciones Globales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">
                Despliega tu VPS en múltiples ubicaciones estratégicas alrededor del mundo para baja latencia
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20 bg-slate-950/50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Preguntas Frecuentes</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Todo lo que necesitas saber sobre nuestros VPS</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="bg-slate-900 border-slate-800 hover:border-cyan-500/50 transition-all duration-300"
            >
              <CardHeader
                className="cursor-pointer hover:bg-slate-800/50 transition-colors"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white">{faq.question}</CardTitle>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                  />
                </div>
              </CardHeader>
              {openFaq === index && (
                <CardContent>
                  <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-4 text-white">¿Listo para comenzar?</h2>
          <p className="text-slate-300 mb-8 text-lg">
            Despliega tu VPS en menos de 60 segundos. Sin compromisos a largo plazo.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8">
              Comenzar Ahora
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent px-8"
            >
              Hablar con Ventas
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
