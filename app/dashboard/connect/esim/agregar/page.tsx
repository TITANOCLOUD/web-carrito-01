"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

const COUNTRIES = [
  { name: "Nueva Caledonia", code: "nc" },
  { name: "Myanmar", code: "mm" },
  { name: "Micronesia", code: "fm" },
  { name: "Islas Marshall", code: "mh" },
  { name: "Mali", code: "ml" },
  { name: "Libia", code: "ly" },
  { name: "Lesoto", code: "ls" },
  { name: "Líbano", code: "lb" },
  { name: "Corea del Norte", code: "kp" },
  { name: "Irán", code: "ir" },
  { name: "Zimbabue", code: "zw" },
  { name: "Ciudad del Vaticano", code: "va" },
  { name: "Sáhara Occidental", code: "eh" },
  { name: "Islas Heard y McDonald", code: "hm" },
  { name: "Wallis y Futuna", code: "wf" },
  { name: "Territorios Australes Franceses", code: "tf" },
  { name: "Islas Menores de Estados Unidos", code: "um" },
  { name: "Tuvalu", code: "tv" },
  { name: "Islas Malvinas", code: "fk" },
  { name: "Turkmenistán", code: "tm" },
  { name: "Eritrea", code: "er" },
  { name: "Tokelau", code: "tk" },
  { name: "Guinea Ecuatorial", code: "gq" },
  { name: "Togo", code: "tg" },
  { name: "Yibuti", code: "dj" },
  { name: "Svalbard y Jan Mayen", code: "sj" },
  { name: "Islas Cook", code: "ck" },
  { name: "Sudán del Sur", code: "ss" },
  { name: "Comoras", code: "km" },
  { name: "Islas Cocos", code: "cc" },
  { name: "Somalia", code: "so" },
  { name: "República Centroafricana", code: "cf" },
  { name: "Islas Salomón", code: "sb" },
  { name: "Territorio Británico del Océano Índico", code: "io" },
  { name: "Sierra Leona", code: "sl" },
  { name: "Isla Bouvet", code: "bv" },
  { name: "Bielorrusia", code: "by" },
  { name: "San Pedro y Miquelón", code: "pm" },
  { name: "Santa Elena", code: "sh" },
  { name: "Antártida", code: "aq" },
  { name: "Islas Pitcairn", code: "pn" },
  { name: "Angola", code: "ao" },
  { name: "Samoa Americana", code: "as" },
  { name: "Palaos", code: "pw" },
  { name: "Isla Norfolk", code: "nf" },
  { name: "Niue", code: "nu" },
]

const REGIONS = [
  { name: "Asia", icon: "🌏" },
  { name: "Balcanes", icon: "🏔️" },
  { name: "Caribe", icon: "🏝️" },
  { name: "Cáucaso y Asia Central", icon: "⛰️" },
  { name: "Europa", icon: "🇪🇺" },
  { name: "Global", icon: "🌍" },
  { name: "Latinoamérica", icon: "🌎" },
  { name: "Oriente Medio", icon: "🕌" },
]

export default function AgregarESimPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("paises")
  const [currentPage, setCurrentPage] = useState(10)

  const filteredCountries = COUNTRIES.filter((country) => country.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredRegions = REGIONS.filter((region) => region.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            ¿Desde donde necesitas <span className="text-blue-600">Conectarte?</span>
          </h1>
          <p className="text-gray-600 text-lg">Te ayudamos a conectarte desde cualquier parte del mundo.</p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar país o región..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-white border-gray-300 h-12 text-base"
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-white border-b border-gray-200 h-12 rounded-none">
            <TabsTrigger
              value="paises"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none text-gray-600 font-medium"
            >
              Países
            </TabsTrigger>
            <TabsTrigger
              value="regiones"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none text-gray-600 font-medium"
            >
              Regiones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="paises" className="mt-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCountries.map((country) => (
                <Card
                  key={country.code}
                  className="border border-gray-200 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all bg-white"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://flagcdn.com/w40/${country.code}.png`}
                        alt={country.name}
                        className="w-10 h-7 object-cover rounded shadow-sm"
                      />
                      <CardTitle className="text-sm font-medium text-gray-800">{country.name}</CardTitle>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex justify-center gap-2">
              <Button variant="outline" size="sm" className="h-9 px-4 bg-transparent">
                Ant
              </Button>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? "default" : "outline"}
                  size="sm"
                  className={`h-9 w-9 ${page === 1 ? "bg-gray-100 text-gray-800" : ""}`}
                >
                  {page}
                </Button>
              ))}
              <Button variant="default" size="sm" className="h-9 w-9 bg-blue-600 hover:bg-blue-700">
                10
              </Button>
            </div>

            {filteredCountries.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No se encontraron países que coincidan con tu búsqueda</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="regiones" className="mt-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredRegions.map((region) => (
                <Card
                  key={region.name}
                  className="border border-gray-200 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all bg-white"
                >
                  <CardHeader>
                    <div className="text-center">
                      <div className="text-5xl mb-3">{region.icon}</div>
                      <CardTitle className="text-base font-medium text-gray-800">{region.name}</CardTitle>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {filteredRegions.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No se encontraron regiones que coincidan con tu búsqueda</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
