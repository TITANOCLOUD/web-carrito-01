"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function DomainSearchPage() {
  const [domain, setDomain] = useState("")
  const [results, setResults] = useState<any[]>([])

  const handleSearch = () => {
    // Simulación de búsqueda
    setResults([
      { domain: `${domain}.com`, available: true, price: "$12.99/año" },
      { domain: `${domain}.net`, available: false, price: "-" },
      { domain: `${domain}.org`, available: true, price: "$14.99/año" },
      { domain: `${domain}.io`, available: true, price: "$39.99/año" },
    ])
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Buscar Dominio</h1>
        <p className="text-slate-400">Encuentra el dominio perfecto para tu proyecto</p>
      </div>

      <div className="max-w-2xl">
        <div className="flex gap-2 mb-6">
          <Input
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Ingresa el nombre de dominio"
            className="bg-slate-800 border-slate-700 text-white"
          />
          <Button onClick={handleSearch} className="bg-cyan-600 hover:bg-cyan-700">
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-3">
            {results.map((result) => (
              <div
                key={result.domain}
                className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex items-center justify-between"
              >
                <div>
                  <p className="text-white font-semibold">{result.domain}</p>
                  <p className="text-sm text-slate-400">{result.available ? "Disponible" : "No disponible"}</p>
                </div>
                <div className="text-right">
                  <p className="text-cyan-400 font-semibold">{result.price}</p>
                  {result.available && (
                    <Button size="sm" className="mt-2 bg-cyan-600 hover:bg-cyan-700">
                      Agregar al carrito
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
