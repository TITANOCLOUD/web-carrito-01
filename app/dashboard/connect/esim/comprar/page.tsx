"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, X, Trash2 } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

export default function ComprarESimPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedDays, setSelectedDays] = useState(5)
  const [selectedData, setSelectedData] = useState(3)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [activeTab, setActiveTab] = useState("paises")

  const countries = [
    { name: "Afganistán", code: "AF", flag: "🇦🇫", price: 79.0 },
    { name: "México", code: "MX", flag: "🇲🇽", price: 17.0 },
    { name: "Colombia", code: "CO", flag: "🇨🇴", price: 15.0 },
    { name: "Argentina", code: "AR", flag: "🇦🇷", price: 18.0 },
    { name: "España", code: "ES", flag: "🇪🇸", price: 12.0 },
  ]

  const regions = [
    { name: "Asia", icon: "🌏", countries: 45, price: 25.0 },
    { name: "Europa", icon: "🇪🇺", countries: 38, price: 15.0 },
    { name: "Latinoamérica", icon: "🌎", countries: 24, price: 18.0 },
    { name: "Global", icon: "🌍", countries: 150, price: 35.0 },
  ]

  const daysOptions = [5, 10, 15, 30]
  const dataOptions = [3, 5, 10, 20]

  const calculatePrice = () => {
    const country = countries.find((c) => c.name === selectedCountry)
    if (!country) return 0
    const basePrice = country.price
    const dayMultiplier = selectedDays / 5
    const dataMultiplier = selectedData / 3
    return (basePrice * dayMultiplier * dataMultiplier).toFixed(2)
  }

  const handleComprar = () => {
    setShowConfirmation(true)
  }

  const handlePagarConStripe = async () => {
    // Redirect to Stripe checkout
    const stripe = await stripePromise
    if (!stripe) return

    // Here you would create a checkout session on your backend
    // and redirect to Stripe
    const totalPrice = calculatePrice()
    console.log(`[v0] Procesando pago de $${totalPrice} USD para ${selectedCountry}`)

    // Simulate Stripe redirect
    alert(`Redirigiendo a Stripe para pagar $${totalPrice} USD...`)
    setShowConfirmation(false)

    // After payment, the eSIM would be registered in the plans
  }

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-white">
            ¿Desde donde necesitas <span className="text-cyan-400">Conectarte?</span>
          </h1>
          <p className="text-xl text-gray-300">Te ayudamos a conectarte desde cualquier parte del mundo.</p>

          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar país o región..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 bg-white text-gray-900 border-0 rounded-xl text-lg placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-transparent border-b-2 border-gray-700 rounded-none h-auto p-0">
              <TabsTrigger
                value="paises"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-500 data-[state=active]:bg-transparent bg-transparent px-8 py-4 text-lg"
              >
                Países
              </TabsTrigger>
              <TabsTrigger
                value="regiones"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-500 data-[state=active]:bg-transparent bg-transparent px-8 py-4 text-lg"
              >
                Regiones
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="paises" className="space-y-8">
            {/* Countries Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCountries.map((country) => (
                <Card
                  key={country.code}
                  onClick={() => setSelectedCountry(country.name)}
                  className={`p-6 cursor-pointer transition-all ${
                    selectedCountry === country.name
                      ? "bg-cyan-500/20 border-cyan-500"
                      : "bg-gray-900 border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <span className="text-5xl">{country.flag}</span>
                    <p className="font-semibold text-white text-lg">{country.name}</p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="regiones" className="space-y-8">
            {/* Regions Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {regions.map((region) => (
                <Card
                  key={region.name}
                  onClick={() => setSelectedCountry(region.name)}
                  className={`p-6 cursor-pointer transition-all ${
                    selectedCountry === region.name
                      ? "bg-cyan-500/20 border-cyan-500"
                      : "bg-gray-900 border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <span className="text-5xl">{region.icon}</span>
                    <p className="font-semibold text-white text-lg">{region.name}</p>
                    <p className="text-sm text-gray-400">{region.countries} países</p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Selection Options */}
        {selectedCountry && (
          <div className="space-y-8 mt-12">
            {/* Duration */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">DURACIÓN (DÍAS)</h3>
              <div className="flex gap-4">
                {daysOptions.map((days) => (
                  <Button
                    key={days}
                    onClick={() => setSelectedDays(days)}
                    variant="outline"
                    className={`px-8 py-6 text-lg rounded-full ${
                      selectedDays === days
                        ? "bg-transparent border-cyan-500 text-cyan-400 border-2"
                        : "bg-transparent border-gray-700 text-gray-300 hover:border-gray-600"
                    }`}
                  >
                    {days === 30 ? "+30" : days}
                  </Button>
                ))}
              </div>
            </div>

            {/* Data */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">DATOS (GB)</h3>
              <div className="flex gap-4">
                {dataOptions.map((data) => (
                  <Button
                    key={data}
                    onClick={() => setSelectedData(data)}
                    variant="outline"
                    className={`px-8 py-6 text-lg rounded-full ${
                      selectedData === data
                        ? "bg-transparent border-cyan-500 text-cyan-400 border-2"
                        : "bg-transparent border-gray-700 text-gray-300 hover:border-gray-600"
                    }`}
                  >
                    {data === 20 ? "+20" : data}
                  </Button>
                ))}
              </div>
            </div>

            {/* Selected Plan Card */}
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{countries.find((c) => c.name === selectedCountry)?.flag || "🌍"}</span>
                  <div>
                    <p className="text-xl font-semibold text-white">
                      {selectedCountry} <span className="text-cyan-400">4G</span>
                    </p>
                    <p className="text-gray-400">
                      {selectedData} GB | {selectedDays} días
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <p className="text-3xl font-bold text-cyan-400">${calculatePrice()} USD</p>
                  <Button
                    onClick={handleComprar}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 text-lg rounded-full"
                  >
                    Comprar
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="bg-white text-gray-900 max-w-md">
          <button
            onClick={() => setShowConfirmation(false)}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>

          <DialogHeader className="text-center space-y-4 pt-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                1
              </div>
              <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-semibold">
                2
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold text-cyan-500">Confirmar Orden</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-6">
            {/* Order Details */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Plan:</p>
                  <p className="font-semibold text-gray-900">{selectedCountry}</p>
                  <p className="text-sm text-gray-500">Cantidad:</p>
                  <p className="font-semibold text-gray-900">1</p>
                  <p className="text-sm text-gray-500">Datos:</p>
                  <p className="font-semibold text-gray-900">{selectedData} GB</p>
                  <p className="text-sm text-gray-500">Vigencia:</p>
                  <p className="font-semibold text-gray-900">{selectedDays} días</p>
                  <p className="text-sm text-gray-500 mt-3">Costo total:</p>
                  <p className="text-xl font-bold text-gray-900">USD {calculatePrice()}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-cyan-500 hover:text-cyan-600">
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Payment Button */}
            <Button
              onClick={handlePagarConStripe}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-6 text-lg rounded-lg flex items-center justify-center gap-2"
            >
              Pagar con <span className="bg-white text-cyan-600 px-3 py-1 rounded font-bold">stripe</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
