'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Server, Cpu, Database, HardDrive, Shield, ArrowRight, CheckCircle2, Cloud, Zap, Lock } from 'lucide-react'

export default function ComputePage() {
  const [activeTab, setActiveTab] = useState('instances')
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1e] via-[#0f1729] to-[#0a0f1e]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-cyan-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Cómputo en Nube Pública y Dedicado
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              VPS, Máquinas Virtuales y Servidores Bare Metal escalables
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setActiveTab('instances')}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                <Cloud className="w-5 h-5 mr-2" />
                Ver Instancias
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push('/contacto')}
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
              >
                Solicitar Asesoría
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Button
            variant={activeTab === 'instances' ? 'default' : 'outline'}
            onClick={() => setActiveTab('instances')}
            className={activeTab === 'instances' ? 'bg-cyan-500 hover:bg-cyan-600' : 'border-cyan-500/30 text-cyan-400'}
          >
            <Server className="w-4 h-4 mr-2" />
            Instancias Virtuales
          </Button>
          <Button
            variant={activeTab === 'metal' ? 'default' : 'outline'}
            onClick={() => setActiveTab('metal')}
            className={activeTab === 'metal' ? 'bg-cyan-500 hover:bg-cyan-600' : 'border-cyan-500/30 text-cyan-400'}
          >
            <HardDrive className="w-4 h-4 mr-2" />
            Metal Instances
          </Button>
          <Button
            variant={activeTab === 'gpu' ? 'default' : 'outline'}
            onClick={() => setActiveTab('gpu')}
            className={activeTab === 'gpu' ? 'bg-cyan-500 hover:bg-cyan-600' : 'border-cyan-500/30 text-cyan-400'}
          >
            <Zap className="w-4 h-4 mr-2" />
            Cloud GPU
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {activeTab === 'instances' && (
            <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Instancias Virtuales</h2>
              <p className="text-slate-300 mb-8 text-lg">
                Instancias de cómputo optimizadas para diferentes cargas de trabajo. Seleccione su configuración ideal y solicite acceso a través de nuestra plataforma.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#0f1420] border border-cyan-500/20 rounded-lg p-6">
                  <Cpu className="w-10 h-10 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">General Purpose</h3>
                  <p className="text-slate-400">Equilibradas y polivalentes para la mayoría de aplicaciones</p>
                </div>
                <div className="bg-[#0f1420] border border-cyan-500/20 rounded-lg p-6">
                  <Zap className="w-10 h-10 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Compute Optimized</h3>
                  <p className="text-slate-400">Optimizadas para CPU intensivo y procesamiento paralelo</p>
                </div>
                <div className="bg-[#0f1420] border border-cyan-500/20 rounded-lg p-6">
                  <Database className="w-10 h-10 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Memory Optimized</h3>
                  <p className="text-slate-400">Gran capacidad de RAM para bases de datos en memoria</p>
                </div>
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  onClick={() => router.push('/dashboard')}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Acceder a la Plataforma para Configurar
                </Button>
                <p className="text-slate-400 mt-4 text-sm">
                  Requiere inicio de sesión o registro en la plataforma
                </p>
              </div>
            </div>
          )}

          {activeTab === 'metal' && (
            <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Metal Instances</h2>
              <p className="text-slate-300 mb-8 text-lg">
                Servidores físicos dedicados con acceso directo al hardware para máximo rendimiento.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#0f1420] border border-cyan-500/20 rounded-lg p-6">
                  <Shield className="w-10 h-10 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Alto Rendimiento</h3>
                  <p className="text-slate-400 mb-4">
                    Procesadores Intel Xeon y AMD EPYC de última generación
                  </p>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mr-2" />
                      Acceso root completo
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mr-2" />
                      Sin virtualización
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mr-2" />
                      Rendimiento predecible
                    </li>
                  </ul>
                </div>
                <div className="bg-[#0f1420] border border-cyan-500/20 rounded-lg p-6">
                  <HardDrive className="w-10 h-10 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Almacenamiento Dedicado</h3>
                  <p className="text-slate-400 mb-4">
                    NVMe, SSD y HDD de alta capacidad
                  </p>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mr-2" />
                      RAID configurables
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mr-2" />
                      Backups incluidos
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mr-2" />
                      Alta disponibilidad
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  onClick={() => router.push('/dashboard')}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Acceder a la Plataforma para Configurar
                </Button>
                <p className="text-slate-400 mt-4 text-sm">
                  Requiere inicio de sesión o registro en la plataforma
                </p>
              </div>
            </div>
          )}

          {activeTab === 'gpu' && (
            <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Cloud GPU</h2>
              <p className="text-slate-300 mb-8 text-lg">
                Instancias con GPUs NVIDIA para IA, machine learning y computación de alto rendimiento.
              </p>
              
              <div className="bg-[#0f1420] border border-cyan-500/20 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Casos de Uso</h3>
                <div className="grid md:grid-cols-2 gap-4 text-slate-300">
                  <div>
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 inline mr-2" />
                    Entrenamiento de modelos de IA
                  </div>
                  <div>
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 inline mr-2" />
                    Procesamiento de video
                  </div>
                  <div>
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 inline mr-2" />
                    Renderizado 3D
                  </div>
                  <div>
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 inline mr-2" />
                    Simulaciones científicas
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  onClick={() => router.push('/dashboard')}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Acceder a la Plataforma para Configurar
                </Button>
                <p className="text-slate-400 mt-4 text-sm">
                  Requiere inicio de sesión o registro en la plataforma
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
