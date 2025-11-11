"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function WhoisPage() {
  const [domain, setDomain] = useState("")
  const [result, setResult] = useState<any>(null)

  const handleSearch = () => {
    setResult({
      domain: domain,
      registrar: "SATURNO CLOUD",
      created: "2020-01-15",
      expires: "2025-01-15",
      nameservers: ["ns1.saturncloud.com", "ns2.saturncloud.com"],
      status: "Active",
    })
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Whois Lookup</h1>
        <p className="text-slate-400">Consulta información de registro de dominios</p>
      </div>

      <div className="max-w-2xl">
        <div className="flex gap-2 mb-6">
          <Input
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Ingresa el dominio"
            className="bg-slate-800 border-slate-700 text-white"
          />
          <Button onClick={handleSearch} className="bg-cyan-600 hover:bg-cyan-700">
            <Search className="w-4 h-4 mr-2" />
            Consultar
          </Button>
        </div>

        {result && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-4">{result.domain}</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Registrar:</span>
                <span className="text-white">{result.registrar}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fecha de creación:</span>
                <span className="text-white">{result.created}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fecha de expiración:</span>
                <span className="text-white">{result.expires}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estado:</span>
                <span className="text-green-400">{result.status}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-2">Nameservers:</span>
                {result.nameservers.map((ns: string) => (
                  <div key={ns} className="text-white ml-4">
                    {ns}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
