"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe } from "lucide-react"

export default function DomainPricingPage() {
  const tlds = [
    { extension: ".com", register: "$12.99", renew: "$14.99", transfer: "$12.99" },
    { extension: ".net", register: "$13.99", renew: "$15.99", transfer: "$13.99" },
    { extension: ".org", register: "$13.99", renew: "$15.99", transfer: "$13.99" },
    { extension: ".io", register: "$39.99", renew: "$49.99", transfer: "$39.99" },
    { extension: ".app", register: "$18.99", renew: "$20.99", transfer: "$18.99" },
    { extension: ".dev", register: "$15.99", renew: "$17.99", transfer: "$15.99" },
    { extension: ".cloud", register: "$19.99", renew: "$24.99", transfer: "$19.99" },
    { extension: ".tech", register: "$49.99", renew: "$59.99", transfer: "$49.99" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-6">
          <Globe className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold">Precios de Dominios</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Precios Transparentes
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Consulta los precios de registro, renovación y transferencia de dominios
        </p>
      </section>

      <section className="container mx-auto px-4 py-20">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Lista de Precios por TLD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left p-4 text-slate-400">Extensión</th>
                    <th className="text-center p-4 text-slate-400">Registro</th>
                    <th className="text-center p-4 text-slate-400">Renovación</th>
                    <th className="text-center p-4 text-slate-400">Transferencia</th>
                  </tr>
                </thead>
                <tbody>
                  {tlds.map((tld) => (
                    <tr key={tld.extension} className="border-b border-slate-800">
                      <td className="p-4 text-white font-semibold">{tld.extension}</td>
                      <td className="p-4 text-center text-cyan-400">{tld.register}</td>
                      <td className="p-4 text-center text-slate-300">{tld.renew}</td>
                      <td className="p-4 text-center text-slate-300">{tld.transfer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
