"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from '@/components/ui/slider'
import { Server, Zap, Shield, Globe, ArrowRight, Cpu, HardDrive, Database, Images, Leaf, Lock, RefreshCw, Settings, Network, Check, X, AlertTriangle, ShoppingCart, CheckCircle2, XCircle, Info, MessageSquare, Mail, Phone } from 'lucide-react'
import { useRouter } from 'next/navigation'

const instancesData = {
  generalPurpose: [
    { id: 'gp1', name: 'b3-8', vcpu: 2, ram: '8 GB', storage: '50 GB NVMe', bandwidth: '500 Mbit/s', hourly: 0.0508, monthly: 28.21, useCases: ['Aplicaciones web', 'Servidores de desarrollo', 'APIs REST'], notFor: ['Machine Learning intensivo', 'Procesamiento de video en tiempo real'], recommendations: ['Ideal para la mayoría de aplicaciones web estándar'] },
    { id: 'gp2', name: 'b3-16', vcpu: 4, ram: '16 GB', storage: '100 GB NVMe', bandwidth: '1 Gb/s', hourly: 0.1016, monthly: 56.41, useCases: ['Servidores de aplicaciones', 'Bases de datos pequeñas y medianas', 'Entornos de staging'], notFor: ['Cargas de trabajo de Big Data', 'Renderizado 3D'], recommendations: ['Buen punto de partida para proyectos nuevos'] },
    { id: 'gp3', name: 'b3-32', vcpu: 8, ram: '32 GB', storage: '200 GB NVMe', bandwidth: '2 Gb/s', hourly: 0.2033, monthly: 112.82, useCases: ['Aplicaciones empresariales', 'Servidores web con alto tráfico', 'Contenedores'], notFor: ['Procesamiento intensivo de GPU', 'Big Data'], recommendations: ['Escalable según necesidades'] },
    { id: 'gp4', name: 'b3-64', vcpu: 16, ram: '64 GB', storage: '400 GB NVMe', bandwidth: '4 Gb/s', hourly: 0.4065, monthly: 225.63, useCases: ['Migraciones de centros de datos', 'Entornos de desarrollo y pruebas a gran escala'], notFor: ['Machine Learning'], recommendations: ['Alto rendimiento para aplicaciones generales'] },
    { id: 'gp5', name: 'b3-128', vcpu: 32, ram: '128 GB', storage: '400 GB NVMe', bandwidth: '8 Gb/s', hourly: 0.8131, monthly: 451.25, useCases: ['Aplicaciones que requieren más recursos', 'Entornos de producción exigentes'], notFor: ['Tareas de baja utilización de CPU'], recommendations: ['Máximo rendimiento para aplicaciones de propósito general'] },
    { id: 'gp6', name: 'b3-256', vcpu: 64, ram: '256 GB', storage: '400 GB NVMe', bandwidth: '16 Gb/s', hourly: 1.6262, monthly: 902.50, useCases: ['Aplicaciones a gran escala', 'Big Data y Analítica'], notFor: ['Cargas de trabajo de baja latencia'], recommendations: ['Alta capacidad para cargas de trabajo empresariales'] },
  ],
  computeOptimized: [
    { id: 'co1', name: 'c3-4', vcpu: 2, ram: '4 GB', storage: '50 GB NVMe', bandwidth: '250 Mbit/s', hourly: 0.0453, monthly: 25.17, useCases: ['Procesamiento intensivo de CPU', 'Computación científica'], notFor: ['Aplicaciones con alta demanda de RAM'], recommendations: ['Excelente para cargas computacionales intensivas'] },
    { id: 'co2', name: 'c3-8', vcpu: 4, ram: '8 GB', storage: '100 GB NVMe', bandwidth: '500 Mbit/s', hourly: 0.0907, monthly: 50.33, useCases: ['Cómputo paralelo', 'Compilación de código'], notFor: ['Bases de datos en memoria'], recommendations: ['Ideal para pipelines CI/CD'] },
    { id: 'co3', name: 'c3-16', vcpu: 8, ram: '16 GB', storage: '200 GB NVMe', bandwidth: '1 Gb/s', hourly: 0.1813, monthly: 100.65, useCases: ['Análisis de datos', 'Servidores de juegos'], notFor: ['Almacenamiento masivo de datos'], recommendations: ['Recomendado para procesamiento batch'] },
    { id: 'co4', name: 'c3-32', vcpu: 16, ram: '32 GB', storage: '400 GB NVMe', bandwidth: '2 Gb/s', hourly: 0.3627, monthly: 201.30, useCases: ['Entornos de renderizado', 'Computación de alto rendimiento'], notFor: ['Aplicaciones ligeras'], recommendations: ['Alto rendimiento de CPU para tareas intensivas'] },
    { id: 'co5', name: 'c3-64', vcpu: 32, ram: '64 GB', storage: '400 GB NVMe', bandwidth: '4 Gb/s', hourly: 0.7254, monthly: 402.59, useCases: ['Simulaciones complejas', 'Computación científica avanzada'], notFor: ['Bases de datos simples'], recommendations: ['Máximo rendimiento para computación intensiva'] },
  ],
  memoryOptimized: [
    { id: 'mo1', name: 'r3-16', vcpu: 2, ram: '16 GB', storage: '50 GB NVMe', bandwidth: '500 Mbit/s', hourly: 0.0658, monthly: 36.50, useCases: ['Bases de datos en memoria', 'Análisis de Big Data'], notFor: ['Aplicaciones web básicas'], recommendations: ['Perfecto para Redis, Memcached'] },
    { id: 'mo2', name: 'r3-32', vcpu: 4, ram: '32 GB', storage: '100 GB NVMe', bandwidth: '1 Gb/s', hourly: 0.1315, monthly: 73, useCases: ['Data science', 'Cache distribuido'], notFor: ['Sitios web estáticos'], recommendations: ['Ideal para análisis de grandes datasets'] },
    { id: 'mo3', name: 'r3-64', vcpu: 8, ram: '64 GB', storage: '200 GB NVMe', bandwidth: '2 Gb/s', hourly: 0.2631, monthly: 146, useCases: ['Procesamiento de grandes volúmenes de datos', 'Machine learning'], notFor: ['Microservicios simples'], recommendations: ['Excelente para machine learning'] },
    { id: 'mo4', name: 'r3-128', vcpu: 16, ram: '128 GB', storage: '400 GB NVMe', bandwidth: '4 Gb/s', hourly: 0.5261, monthly: 291.99, useCases: ['Bases de datos de alto rendimiento', 'Análisis en tiempo real'], notFor: ['Tareas de bajo uso de memoria'], recommendations: ['Alto rendimiento para aplicaciones con uso intensivo de memoria'] },
  ],
  storageOptimized: [
    { id: 'so1', name: 'i1-45', vcpu: 8, ram: '45 GB', storage: '50 GB SSD + 1.9 TB NVMe', bandwidth: '1 Gb/s', hourly: 0.488, monthly: 245, useCases: ['Bases de datos NoSQL', 'Data warehousing'], notFor: ['Aplicaciones web básicas'], recommendations: ['Máximo rendimiento de I/O'] },
    { id: 'so2', name: 'i1-90', vcpu: 16, ram: '90 GB', storage: '50 GB SSD + 2x1.9 TB NVMe', bandwidth: '2 Gb/s', hourly: 0.978, monthly: 490, useCases: ['Elasticsearch', 'Big data processing'], notFor: ['Almacenamiento de archivos estáticos'], recommendations: ['Ideal para MongoDB, Cassandra'] },
  ],
  discovery: [
    { id: 'd1', name: 'd2-2', vcpu: 1, ram: '2 GB', storage: '25 GB', bandwidth: '100 Mbit/s', hourly: 0.0119, monthly: 6.57, useCases: ['Desarrollo y pruebas', 'Entornos sandbox'], notFor: ['Producción crítica'], recommendations: ['Perfecto para empezar'] },
    { id: 'd2', name: 'd2-4', vcpu: 2, ram: '4 GB', storage: '50 GB', bandwidth: '250 Mbit/s', hourly: 0.0237, monthly: 13.20, useCases: ['Proyectos personales', 'Aprendizaje'], notFor: ['Cargas de trabajo intensivas'], recommendations: ['Excelente relación calidad-precio'] },
    { id: 'd3', name: 'd2-8', vcpu: 4, ram: '8 GB', storage: '50 GB', bandwidth: '500 Mbit/s', hourly: 0.0427, monthly: 23.70, useCases: ['Prototipos', 'MVPs'], notFor: ['Aplicaciones de alto tráfico'], recommendations: ['Ideal para MVPs y prototipos'] },
  ],
  gpu: [
    { id: 'gpu1', name: 'NVIDIA H100', vcpu: 4, ram: '80 GB', storage: '400 GB NVMe', bandwidth: '10 Gb/s', hourly: 3.00, monthly: 1800, useCases: ['IA y Deep Learning', 'Inferencia LLM'], notFor: ['Tareas de computación general'], recommendations: ['Para IA y deep learning más exigentes'] },
    { id: 'gpu2', name: 'NVIDIA L40S', vcpu: 8, ram: '48 GB', storage: '400 GB NVMe', bandwidth: '10 Gb/s', hourly: 2.00, monthly: 1200, useCases: ['IA Generativa', 'Gráficos 3D'], notFor: ['Cargas de trabajo muy intensivas en CPU'], recommendations: ['Combinan rendimiento IA y aceleración gráfica'] },
    { id: 'gpu3', name: 'NVIDIA A10', vcpu: 6, ram: '24 GB', storage: '400 GB NVMe', bandwidth: '8 Gb/s', hourly: 1.50, monthly: 900, useCases: ['Inferencia de IA', 'Virtualización de escritorios gráficos'], notFor: ['Machine learning pesado'], recommendations: ['Perfectas para inferencia de IA y virtualización'] },
  ],
  metal: [
    { id: 'm1', name: 'Small', vcpu: 8, ram: '64 GB', storage: '2x1 TB SSD', bandwidth: '10 Gb/s', hourly: 0.545, monthly: 320, useCases: ['Alta frecuencia de cálculo', 'Aislamiento total'], notFor: ['Necesidades de escalado rápido'], recommendations: ['Aislamiento total a precio asequible'] },
    { id: 'm2', name: 'Medium', vcpu: 16, ram: '128 GB', storage: '2x2 TB SSD', bandwidth: '10 Gb/s', hourly: 0.927, monthly: 500, useCases: ['Aplicaciones distribuidas', 'Balance perfecto'], notFor: ['Procesamiento de Big Data'], recommendations: ['Best-seller para aplicaciones distribuidas'] },
    { id: 'm3', name: 'Large', vcpu: 32, ram: '256 GB', storage: '4x2 TB SSD', bandwidth: '10 Gb/s', hourly: 1.58, monthly: 800, useCases: ['Usos intensivos', 'Máxima eficiencia'], notFor: ['Entornos de desarrollo pequeños'], recommendations: ['Mejor relación prestaciones-precio'] },
  ]
}

const instanceCategories = [
  { id: 'generalPurpose', name: 'General Purpose', description: 'Equilibradas y polivalentes', icon: <Server className="w-12 h-12 text-cyan-400 mb-4" /> },
  { id: 'computeOptimized', name: 'Compute Optimized', description: 'Optimizadas para CPU', icon: <Cpu className="w-12 h-12 text-cyan-400 mb-4" /> },
  { id: 'memoryOptimized', name: 'Memory Optimized', description: 'Optimización de memoria', icon: <Database className="w-12 h-12 text-cyan-400 mb-4" /> },
  { id: 'storageOptimized', name: 'Storage Optimized', description: 'IOPS optimizadas', icon: <HardDrive className="w-12 h-12 text-cyan-400 mb-4" /> },
  { id: 'gpu', name: 'Cloud GPU', description: 'Potencia para IA y ML', icon: <Images className="w-12 h-12 text-cyan-400 mb-4" /> },
  { id: 'metal', name: 'Metal Instances', description: 'Servidores dedicados', icon: <Shield className="w-12 h-12 text-cyan-400 mb-4" /> },
]

export default function ComputePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("vmi")
  const [pricingTab, setPricingTab] = useState("linux-hourly")
  const [selectedCategory, setSelectedCategory] = useState<'generalPurpose' | 'computeOptimized' | 'memoryOptimized' | 'storageOptimized' | 'gpu' | 'metal'>('generalPurpose')
  const [selectedInstance, setSelectedInstance] = useState(instancesData.generalPurpose[0])
  const [billingMode, setBillingMode] = useState<'hourly' | 'monthly'>('monthly')
  const [showComparison, setShowComparison] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false)
  const [billingType, setBillingType] = useState<'hourly' | 'monthly'>('hourly');

  const handleRequestQuote = () => {
    const instanceInfo = `Solicitud de cotización para instancia:
- Categoría: ${categoryInfo.name || selectedCategory}
- Modelo: ${selectedInstance.name}
- vCPU: ${selectedInstance.vcpu}
- RAM: ${selectedInstance.ram}
- Almacenamiento: ${selectedInstance.storage}
- Red: ${selectedInstance.network}
- Facturación: ${billingMode === 'hourly' ? 'Por hora' : 'Mensual'}
${selectedInstance.gpu ? `- GPU: ${selectedInstance.gpu}` : ''}`

    // Guardar en localStorage para que Andrea lo capture
    localStorage.setItem('pendingQuote', instanceInfo)
    
    // Abrir el chat de Andrea
    const event = new CustomEvent('openAndreaChat', { detail: { message: instanceInfo } })
    window.dispatchEvent(event)
  }

  const instances = [
    // General Purpose
    { id: 'gp1', name: 'b3-8', category: 'generalPurpose', vcpu: 2, ram: '8 GB', storage: '50 GB NVMe', hourly: 0.0508, monthly: 37.08, network: '500 Mbit/s', awsEquivalent: 't3.small', awsPrice: 0.0208, azureEquivalent: 'B2s', azurePrice: 0.0416 },
    { id: 'gp2', name: 'b3-16', category: 'generalPurpose', vcpu: 4, ram: '16 GB', storage: '100 GB NVMe', hourly: 0.1016, monthly: 74.17, network: '1 Gb/s', awsEquivalent: 't3.medium', awsPrice: 0.0416, azureEquivalent: 'B2ms', azurePrice: 0.0832 },
    { id: 'gp3', name: 'b3-32', category: 'generalPurpose', vcpu: 8, ram: '32 GB', storage: '200 GB NVMe', hourly: 0.2033, monthly: 148.41, network: '2 Gb/s', awsEquivalent: 't3.large', awsPrice: 0.0832, azureEquivalent: 'D2s_v3', azurePrice: 0.096 },
    { id: 'gp4', name: 'b3-64', category: 'generalPurpose', vcpu: 16, ram: '64 GB', storage: '400 GB NVMe', hourly: 0.4065, monthly: 296.75, network: '4 Gb/s', awsEquivalent: 'm5.xlarge', awsPrice: 0.192, azureEquivalent: 'D4s_v3', azurePrice: 0.192 },
    { id: 'gp5', name: 'b3-128', category: 'generalPurpose', vcpu: 32, ram: '128 GB', storage: '400 GB NVMe', hourly: 0.8131, monthly: 593.56, network: '8 Gb/s', awsEquivalent: 'm5.2xlarge', awsPrice: 0.384, azureEquivalent: 'D8s_v3', azurePrice: 0.384 },
    
    // Compute Optimized
    { id: 'co1', name: 'c3-4', category: 'computeOptimized', vcpu: 2, ram: '4 GB', storage: '50 GB NVMe', hourly: 0.0453, monthly: 33.07, network: '250 Mbit/s', awsEquivalent: 'c5.large', awsPrice: 0.085, azureEquivalent: 'F2s_v2', azurePrice: 0.0847 },
    { id: 'co2', name: 'c3-8', category: 'computeOptimized', vcpu: 4, ram: '8 GB', storage: '100 GB NVMe', hourly: 0.0907, monthly: 66.21, network: '500 Mbit/s', awsEquivalent: 'c5.xlarge', awsPrice: 0.17, azureEquivalent: 'F4s_v2', azurePrice: 0.169 },
    { id: 'co3', name: 'c3-16', category: 'computeOptimized', vcpu: 8, ram: '16 GB', storage: '200 GB NVMe', hourly: 0.1813, monthly: 132.35, network: '1 Gb/s', awsEquivalent: 'c5.2xlarge', awsPrice: 0.34, azureEquivalent: 'F8s_v2', azurePrice: 0.338 },
    { id: 'co4', name: 'c3-32', category: 'computeOptimized', vcpu: 16, ram: '32 GB', storage: '400 GB NVMe', hourly: 0.3627, monthly: 264.77, network: '2 Gb/s', awsEquivalent: 'c5.4xlarge', awsPrice: 0.68, azureEquivalent: 'F16s_v2', azurePrice: 0.677 },
    
    // Memory Optimized
    { id: 'mo1', name: 'r3-16', category: 'memoryOptimized', vcpu: 2, ram: '16 GB', storage: '50 GB NVMe', hourly: 0.0658, monthly: 48.03, network: '500 Mbit/s', awsEquivalent: 'r5.large', awsPrice: 0.126, azureEquivalent: 'E2s_v3', azurePrice: 0.126 },
    { id: 'mo2', name: 'r3-32', category: 'memoryOptimized', vcpu: 4, ram: '32 GB', storage: '100 GB NVMe', hourly: 0.1315, monthly: 95.99, network: '1 Gb/s', awsEquivalent: 'r5.xlarge', awsPrice: 0.252, azureEquivalent: 'E4s_v3', azurePrice: 0.252 },
    { id: 'mo3', name: 'r3-64', category: 'memoryOptimized', vcpu: 8, ram: '64 GB', storage: '200 GB NVMe', hourly: 0.2631, monthly: 192.06, network: '2 Gb/s', awsEquivalent: 'r5.2xlarge', awsPrice: 0.504, azureEquivalent: 'E8s_v3', azurePrice: 0.504 },
    
    // Storage Optimized  
    { id: 'so1', name: 'i1-45', category: 'storageOptimized', vcpu: 8, ram: '45 GB', storage: '50 GB SSD + 1.9 TB NVMe', hourly: 0.488, monthly: 356.24, network: '1 Gb/s', awsEquivalent: 'i3.xlarge', awsPrice: 0.312, azureEquivalent: 'L8s_v2', azurePrice: 0.624 },
    { id: 'so2', name: 'i1-90', category: 'storageOptimized', vcpu: 16, ram: '90 GB', storage: '50 GB SSD + 2x1.9 TB NVMe', hourly: 0.978, monthly: 714.54, network: '2 Gb/s', awsEquivalent: 'i3.2xlarge', awsPrice: 0.624, azureEquivalent: 'L16s_v2', azurePrice: 1.248 },
    
    // Cloud GPU
    { id: 'gpu1', name: 'L40S-90', category: 'gpu', vcpu: 15, ram: '90 GB', storage: '400 GB NVMe', gpu: 'L40S 48 GB', hourly: 1.80, monthly: 1314, network: '8 Gb/s', awsEquivalent: 'p4d.24xlarge', awsPrice: 32.77, azureEquivalent: 'NC24ads_A100_v4', azurePrice: 3.673 },
    { id: 'gpu2', name: 'A100-180', category: 'gpu', vcpu: 15, ram: '180 GB', storage: '300 GB NVMe', gpu: 'A100 80 GB', hourly: 3.07, monthly: 2241.1, network: '8 Gb/s', awsEquivalent: 'p4d.24xlarge', awsPrice: 32.77, azureEquivalent: 'NC24ads_A100_v4', azurePrice: 3.673 },
    { id: 'gpu3', name: 'H100-380', category: 'gpu', vcpu: 30, ram: '380 GB', storage: '200 GB + 3.84 TB NVMe', gpu: 'H100 80 GB', hourly: 2.99, monthly: 2182.7, network: '8 Gb/s', awsEquivalent: 'p5.48xlarge', awsPrice: 98.32, azureEquivalent: 'ND96amsr_A100_v4', azurePrice: 27.20 },
    
    // Metal Instances  
    { id: 'm1', name: 'BM-S1', category: 'metal', vcpu: 4, ram: '32 GiB', storage: '2 x 960 GB SSD', hourly: 0.545, monthly: 397.85, network: '1 Gb/s garantizado', awsEquivalent: 'i3.metal', awsPrice: 4.992, azureEquivalent: 'Bare Metal', azurePrice: 5.50, dedicated: true },
    { id: 'm2', name: 'BM-M1', category: 'metal', vcpu: 8, ram: '64 GiB', storage: '2 x 960 GB SSD', hourly: 0.927, monthly: 676.71, network: '1 Gb/s garantizado', awsEquivalent: 'i3.metal', awsPrice: 4.992, azureEquivalent: 'Bare Metal', azurePrice: 5.50, dedicated: true },
    { id: 'm3', name: 'BM-L1', category: 'metal', vcpu: 16, ram: '128 GiB', storage: '2 x 960 GB SSD', hourly: 1.58, monthly: 1153.4, network: '1 Gb/s garantizado', awsEquivalent: 'i3.metal', awsPrice: 4.992, azureEquivalent: 'Bare Metal', azurePrice: 5.50, dedicated: true },
    
    // Discovery
    { id: 'd1', name: 'd2-2', category: 'discovery', vcpu: 1, ram: '2 GB', storage: '25 GB', hourly: 0.0119, monthly: 8.69, network: '100 Mbit/s', awsEquivalent: 't2.micro', awsPrice: 0.0116, azureEquivalent: 'B1s', azurePrice: 0.0104 },
    { id: 'd2', name: 'd2-4', category: 'discovery', vcpu: 2, ram: '4 GB', storage: '50 GB', hourly: 0.0237, monthly: 17.30, network: '250 Mbit/s', awsEquivalent: 't2.small', awsPrice: 0.023, azureEquivalent: 'B1ms', azurePrice: 0.0207 },
    { id: 'd3', name: 'd2-8', category: 'discovery', vcpu: 4, ram: '8 GB', storage: '50 GB', hourly: 0.0427, monthly: 31.17, network: '500 Mbit/s', awsEquivalent: 't2.medium', awsPrice: 0.0464, azureEquivalent: 'B2s', azurePrice: 0.0416 }
  ]

  const filteredInstances = selectedCategory
    ? instances.filter((i) => i.category === selectedCategory)
    : []

  const calculateSavings = (instance: any) => {
    const awsSavings = ((instance.awsPrice - instance.hourly) / instance.awsPrice * 100).toFixed(0)
    const azureSavings = ((instance.azurePrice - instance.hourly) / instance.azurePrice * 100).toFixed(0)
    return { aws: awsSavings, azure: azureSavings }
  }

  const categoryDetails: any = {
    generalPurpose: {
      name: 'General Purpose',
      useCases: [
        'Aplicaciones web y APIs REST',
        'Servidores de desarrollo y staging',
        'Bases de datos pequeñas a medianas',
        'Microservicios y contenedores',
        'CMS (WordPress, Drupal, etc.)'
      ],
      notRecommended: [ // Renamed from 'notFor' to 'notRecommended' for clarity
        'Procesamiento intensivo de CPU',
        'Aplicaciones que requieren +100GB RAM',
        'Machine Learning o entrenamiento de modelos',
        'Análisis de Big Data en tiempo real'
      ],
      recommendations: [
        'Empezar con b3-8 para aplicaciones básicas',
        'Escalar verticalmente según carga',
        'Usar balanceador de carga para alta disponibilidad',
        'Monitorear uso de CPU y memoria constantemente'
      ],
      terms: [
        'Recursos compartidos con otros usuarios',
        'Facturación por hora consumida',
        'SLA 99.9% de disponibilidad',
        'Backups automáticos opcionales ($0.000017/GB/hora)'
      ]
    },
    computeOptimized: {
      name: 'Compute Optimized',
      useCases: [
        'Procesamiento por lotes (batch processing)',
        'Servidores de videojuegos',
        'Análisis científicos y simulaciones',
        'Compilación de código y CI/CD',
        'Procesamiento de video y codificación'
      ],
      notRecommended: [
        'Aplicaciones que requieren mucha RAM',
        'Bases de datos muy grandes',
        'Almacenamiento masivo de archivos',
        'Tareas con poca carga de CPU'
      ],
      recommendations: [
        'Ideal para cargas de trabajo con alto uso de CPU',
        'Frecuencia de 2.3 GHz o más garantizada',
        'Combinar con almacenamiento externo si es necesario',
        'Usar instancias spot para cargas no críticas'
      ],
      terms: [
        'CPU dedicada con alta frecuencia',
        'Red privada hasta 20 Gb/s',
        'Compatible con Kubernetes',
        'IPv4 incluida, IPv6 opcional'
      ]
    },
    memoryOptimized: {
      name: 'Memory Optimized',
      useCases: [
        'Bases de datos en memoria (Redis, Memcached)',
        'Análisis de Big Data (Hadoop, Spark)',
        'Data warehousing',
        'Aplicaciones SAP HANA',
        'Procesamiento de logs en tiempo real'
      ],
      notRecommended: [
        'Aplicaciones con poca demanda de memoria',
        'Procesamiento intensivo de GPU',
        'Almacenamiento masivo',
        'Tareas de red intensivas'
      ],
      recommendations: [
        'Relación CPU-RAM optimizada 1:8',
        'IOPS elevadas para acceso rápido a datos',
        'Usar con SSD NVMe para máximo rendimiento',
        'Configurar swap solo para emergencias'
      ],
      terms: [
        'RAM ECC para máxima confiabilidad',
        'Ancho de banda garantizado',
        'Soporte para huge pages',
        'Backup de snapshots en caliente'
      ]
    },
    storageOptimized: {
      name: 'Storage Optimized',
      useCases: [
        'Bases de datos NoSQL (MongoDB, Cassandra)',
        'Data lakes y almacenamiento distribuido',
        'Elasticsearch y búsqueda de texto completo',
        'Procesamiento de logs masivos',
        'Blockchain y nodos de criptomonedas'
      ],
      notRecommended: [
        'Aplicaciones que no requieren alto IOPS',
        'Workloads ligeros de almacenamiento',
        'Procesamiento exclusivo de CPU',
        'Desarrollo y testing básico'
      ],
      recommendations: [
        'Discos NVMe con IOPS ultrarrápidas',
        'Hasta 7.6 TB de almacenamiento NVMe',
        'Ideal para bases de datos transaccionales',
        'Configurar RAID según necesidades'
      ],
      terms: [
        'NVMe en hardware dedicado',
        'Hasta 400,000 IOPS por disco',
        'Red privada de alta velocidad',
        'No compatible con Savings Plans en algunas regiones'
      ]
    },
    gpu: {
      name: 'Cloud GPU',
      useCases: [
        'Entrenamiento de modelos de IA/ML',
        'Inferencia de deep learning',
        'Renderización 3D y VFX',
        'Procesamiento de imágenes médicas',
        'Análisis de video en tiempo real'
      ],
      notRecommended: [
        'Aplicaciones web tradicionales',
        'Bases de datos relacionales',
        'Servidores de archivos',
        'Tareas que no usan GPU'
      ],
      recommendations: [
        'L40S para inferencia de IA',
        'A100 para entrenamiento profundo',
        'H100 para workloads más exigentes',
        'Usar contenedores Docker con NVIDIA NGC'
      ],
      terms: [
        'GPUs NVIDIA de última generación',
        'Hasta 1000x más rápido que CPU',
        'Drivers y CUDA preinstalados',
        'Facturación por minuto usado'
      ]
    },
    metal: {
      name: 'Metal Instances',
      useCases: [
        'Aplicaciones que requieren aislamiento total',
        'Compliance y regulaciones estrictas',
        'Bases de datos de alto rendimiento',
        'Virtualización anidada (VMware, Proxmox)',
        'Licencias que requieren bare metal'
      ],
      notRecommended: [
        'Pruebas y desarrollo',
        'Aplicaciones que pueden compartir recursos',
        'Workloads con demanda variable',
        'Presupuestos limitados'
      ],
      recommendations: [
        'Hardware 100% dedicado sin vecinos',
        'Acceso a nivel de hipervisor',
        'Combinar con Public Cloud para híbrido',
        'Planificar capacidad cuidadosamente'
      ],
      terms: [
        'Sin sobreventa (overcommit)',
        'Acceso root completo al hardware',
        'Red pública y privada dedicadas',
        'Contrato mínimo recomendado 1 mes'
      ]
    },
    discovery: {
      name: 'Discovery',
      useCases: [
        'Entornos de desarrollo',
        'Testing y QA',
        'Sandbox y experimentos',
        'Aplicaciones de prueba de concepto',
        'Aprendizaje y educación'
      ],
      notRecommended: [
        'Producción crítica',
        'Aplicaciones con alto tráfico',
        'Bases de datos importantes',
        'Servicios 24/7 mission-critical'
      ],
      recommendations: [
        'Recursos compartidos pero estables',
        'Precio muy accesible',
        'Perfecto para comenzar en cloud',
        'Escalar a otras categorías cuando sea necesario'
      ],
      terms: [
        'Recursos compartidos',
        'Sin SLA de producción',
        'Ideal para bajo presupuesto',
        'Upgrade disponible en cualquier momento'
      ]
    }
  }

  const categoryInfo = categoryDetails[selectedCategory] || {}

  const filteredInstancesCalculadora = selectedCategory
    ? instances.filter((i) => i.category === selectedCategory)
    : []


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6 text-balance">
            Cómputo en Nube Pública y Dedicado
          </h1>
          <p className="text-xl text-slate-300 mb-8 text-pretty">
            VPS, Máquinas Virtuales y Servidores Bare Metal escalables
          </p>
          <p className="text-base text-slate-400 max-w-3xl mx-auto text-pretty">
            Elija entre instancias virtuales flexibles para cargas de trabajo variables o servidores dedicados de alto rendimiento para aplicaciones críticas
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("vmi")}
            className={`pb-4 px-6 font-semibold transition-all ${
              activeTab === "vmi" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-slate-400 hover:text-white"
            }`}
          >
            Virtual Machine Instances
          </button>
          <button
            onClick={() => setActiveTab("gpu")}
            className={`pb-4 px-6 font-semibold transition-all ${
              activeTab === "gpu" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-slate-400 hover:text-white"
            }`}
          >
            Cloud GPU
          </button>
          <button
            onClick={() => setActiveTab("metal")}
            className={`pb-4 px-6 font-semibold transition-all ${
              activeTab === "metal" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-slate-400 hover:text-white"
            }`}
          >
            Metal Instances
          </button>
        </div>

        <div className="space-y-16">
          {activeTab === "vmi" && (
            <div>
              {/* Características VMI */}
              <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-4">Virtual Machine Instances</h2>
                    <p className="text-slate-300 mb-6 text-lg">
                      Disfrute de instancias polivalentes y adaptadas a todos sus usos.
                    </p>
                    <p className="text-slate-400 mb-6">
                      Lance sus proyectos cloud conservando todas sus posibilidades de evolución. Nuestras instancias
                      virtuales ofrecen diferentes capacidades en términos de memoria y vCPU para responder a un gran
                      número de casos de uso.
                    </p>
                    <Button
                      onClick={() => router.push("/public-cloud/compute/vmi/precios")}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                      Ver Precios
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <div className="relative h-64">
                    <img
                      src="/virtual-machine-instance-datacenter-servers.jpg"
                      alt="Virtual Machine Instances"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Modelos */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                <Card className="bg-[#1a1f2e] border-slate-800">
                  <CardContent className="p-6">
                    <Cpu className="w-12 h-12 text-cyan-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">General Purpose</h3>
                    <p className="text-slate-400 text-sm">Equilibradas y polivalentes para gestión de servidores</p>
                  </CardContent>
                </Card>
                <Card className="bg-[#1a1f2e] border-slate-800">
                  <CardContent className="p-6">
                    <Zap className="w-12 h-12 text-cyan-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Compute Optimized</h3>
                    <p className="text-slate-400 text-sm">Optimizadas para CPU y cálculos masivos</p>
                  </CardContent>
                </Card>
                <Card className="bg-[#1a1f2e] border-slate-800">
                  <CardContent className="p-6">
                    <Server className="w-12 h-12 text-cyan-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Memory Optimized</h3>
                    <p className="text-slate-400 text-sm">Diseñadas para tratamientos orientados a la memoria</p>
                  </CardContent>
                </Card>
                <Card className="bg-[#1a1f2e] border-slate-800">
                  <CardContent className="p-6">
                    <HardDrive className="w-12 h-12 text-cyan-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Storage Optimized</h3>
                    <p className="text-slate-400 text-sm">IOPS optimizadas con tarjetas NVMe</p>
                  </CardContent>
                </Card>
              </div>
              
              
              {/* Calculadora Interactiva */}
              <div className="mt-16">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">
                    Calculadora de Instancias
                  </h2>
                  <p className="text-xl text-cyan-400">
                    Configura tu instancia perfecta y solicita una cotización personalizada
                  </p>
                </div>

                {/* Calculadora */}
                <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 shadow-2xl">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Panel de selección */}
                    <div className="lg:col-span-2 space-y-8">
                      {/* Selector de Categorías */}
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-6">1. Selecciona tu categoría</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {/* Categoría General Purpose */}
                          <button
                            onClick={() => {
                              setSelectedCategory('generalPurpose')
                              setSelectedInstance(instances.find(i => i.category === 'generalPurpose') || instances[0])
                            }}
                            className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                              selectedCategory === 'generalPurpose'
                                ? 'border-cyan-500 bg-cyan-500/20 shadow-lg shadow-cyan-500/50'
                                : 'border-slate-700 bg-slate-800/50 hover:border-cyan-500/50'
                            }`}
                          >
                            <Server className={`w-10 h-10 mb-3 mx-auto ${selectedCategory === 'generalPurpose' ? 'text-cyan-400' : 'text-slate-400'}`} />
                            <div className="text-white font-bold mb-1">General Purpose</div>
                            <div className="text-sm text-slate-400">Equilibradas y polivalentes</div>
                          </button>

                          {/* Categoría Compute Optimized */}
                          <button
                            onClick={() => {
                              setSelectedCategory('computeOptimized')
                              setSelectedInstance(instances.find(i => i.category === 'computeOptimized') || instances[0])
                            }}
                            className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                              selectedCategory === 'computeOptimized'
                                ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/50'
                                : 'border-slate-700 bg-slate-800/50 hover:border-purple-500/50'
                            }`}
                          >
                            <Cpu className={`w-10 h-10 mb-3 mx-auto ${selectedCategory === 'computeOptimized' ? 'text-purple-400' : 'text-slate-400'}`} />
                            <div className="text-white font-bold mb-1">Compute Optimized</div>
                            <div className="text-sm text-slate-400">Optimizadas para CPU</div>
                          </button>

                          {/* Categoría Memory Optimized */}
                          <button
                            onClick={() => {
                              setSelectedCategory('memoryOptimized')
                              setSelectedInstance(instances.find(i => i.category === 'memoryOptimized') || instances[0])
                            }}
                            className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                              selectedCategory === 'memoryOptimized'
                                ? 'border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/50'
                                : 'border-slate-700 bg-slate-800/50 hover:border-blue-500/50'
                            }`}
                          >
                            <Database className={`w-10 h-10 mb-3 mx-auto ${selectedCategory === 'memoryOptimized' ? 'text-blue-400' : 'text-slate-400'}`} />
                            <div className="text-white font-bold mb-1">Memory Optimized</div>
                            <div className="text-sm text-slate-400">Optimización de memoria</div>
                          </button>

                          {/* Categoría Storage Optimized */}
                          <button
                            onClick={() => {
                              setSelectedCategory('storageOptimized')
                              setSelectedInstance(instances.find(i => i.category === 'storageOptimized') || instances[0])
                            }}
                            className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                              selectedCategory === 'storageOptimized'
                                ? 'border-amber-500 bg-amber-500/20 shadow-lg shadow-amber-500/50'
                                : 'border-slate-700 bg-slate-800/50 hover:border-amber-500/50'
                            }`}
                          >
                            <HardDrive className={`w-10 h-10 mb-3 mx-auto ${selectedCategory === 'storageOptimized' ? 'text-amber-400' : 'text-slate-400'}`} />
                            <div className="text-white font-bold mb-1">Storage Optimized</div>
                            <div className="text-sm text-slate-400">IOPS optimizadas</div>
                          </button>

                          {/* Categoría GPU */}
                          <button
                            onClick={() => {
                              setSelectedCategory('gpu')
                              setSelectedInstance(instances.find(i => i.category === 'gpu') || instances[0])
                            }}
                            className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                              selectedCategory === 'gpu'
                                ? 'border-green-500 bg-green-500/20 shadow-lg shadow-green-500/50'
                                : 'border-slate-700 bg-slate-800/50 hover:border-green-500/50'
                            }`}
                          >
                            <Zap className={`w-10 h-10 mb-3 mx-auto ${selectedCategory === 'gpu' ? 'text-green-400' : 'text-slate-400'}`} />
                            <div className="text-white font-bold mb-1">Cloud GPU</div>
                            <div className="text-sm text-slate-400">Potencia para IA y ML</div>
                          </button>

                          {/* Categoría Metal */}
                          <button
                            onClick={() => {
                              setSelectedCategory('metal')
                              setSelectedInstance(instances.find(i => i.category === 'metal') || instances[0])
                            }}
                            className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                              selectedCategory === 'metal'
                                ? 'border-red-500 bg-red-500/20 shadow-lg shadow-red-500/50'
                                : 'border-slate-700 bg-slate-800/50 hover:border-red-500/50'
                            }`}
                          >
                            <Shield className={`w-10 h-10 mb-3 mx-auto ${selectedCategory === 'metal' ? 'text-red-400' : 'text-slate-400'}`} />
                            <div className="text-white font-bold mb-1">Metal Instances</div>
                            <div className="text-sm text-slate-400">Servidores dedicados</div>
                          </button>
                        </div>
                      </div>

                      {/* Selector de Modelos */}
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-6">2. Elige tu modelo</h3>
                        <div className="grid gap-4">
                          {filteredInstancesCalculadora.map((instance) => (
                            <button
                              key={instance.id}
                              onClick={() => setSelectedInstance(instance)}
                              className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                                selectedInstance.id === instance.id
                                  ? 'border-cyan-500 bg-cyan-500/10 shadow-lg'
                                  : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                              }`}
                            >
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <div className="text-xl font-bold text-white mb-2">{instance.name}</div>
                                  <div className="flex gap-4 text-sm">
                                    <span className="text-cyan-400">{instance.vcpu} vCPU</span>
                                    <span className="text-cyan-400">{instance.ram}</span>
                                    <span className="text-cyan-400">{instance.storage}</span>
                                  </div>
                                </div>
                              </div>
                              {instance.gpu && (
                                <div className="text-sm text-green-400 flex items-center gap-2">
                                  <Zap className="w-4 h-4" />
                                  {instance.gpu}
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Panel de Resumen y Cotización */}
                    <div className="space-y-6">
                      <div className="bg-slate-900/80 rounded-xl p-6 border border-cyan-500/30 sticky top-24">
                        <h3 className="text-xl font-bold text-white mb-4">Configuración Seleccionada</h3>
                        
                        <div className="space-y-4 mb-6">
                          <div>
                            <div className="text-sm text-slate-400">Categoría</div>
                            <div className="text-white font-semibold">{categoryInfo.name || selectedCategory}</div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-400">Modelo</div>
                            <div className="text-white font-semibold">{selectedInstance.name}</div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-400">Especificaciones</div>
                            <div className="text-white text-sm space-y-1">
                              <div>{selectedInstance.vcpu} vCPU</div>
                              <div>{selectedInstance.ram} RAM</div>
                              <div>{selectedInstance.storage}</div>
                              <div>{selectedInstance.network}</div>
                              {selectedInstance.gpu && <div className="text-green-400">{selectedInstance.gpu}</div>}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Button
                            onClick={handleRequestQuote}
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-6 text-lg"
                          >
                            <MessageSquare className="w-5 h-5 mr-2" />
                            Solicitar Cotización
                          </Button>
                          
                          <div className="text-center text-sm text-slate-400">
                            Nuestro equipo te contactará por:
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => window.open('https://wa.me/1234567890', '_blank')}
                              className="flex items-center justify-center gap-2 py-2 px-3 bg-green-600/20 border border-green-600/50 rounded-lg hover:bg-green-600/30 transition-all text-green-400 text-sm"
                            >
                              <Phone className="w-4 h-4" />
                              WhatsApp
                            </button>
                            <button
                              onClick={() => router.push('/contacto')}
                              className="flex items-center justify-center gap-2 py-2 px-3 bg-cyan-600/20 border border-cyan-600/50 rounded-lg hover:bg-cyan-600/30 transition-all text-cyan-400 text-sm"
                            >
                              <Mail className="w-4 h-4" />
                              Email
                            </button>
                          </div>
                        </div>

                        {/* Casos de Uso */}
                        <div className="mt-6 pt-6 border-t border-slate-700">
                          <div className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            Ideal para:
                          </div>
                          <ul className="text-sm text-slate-300 space-y-2">
                            {categoryInfo.useCases?.map((useCase: string, i: number) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-cyan-400">•</span>
                                <span>{useCase}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* No recomendado para */}
                        <div className="mt-6 pt-6 border-t border-slate-700">
                          <div className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-400" />
                            No recomendado para:
                          </div>
                          <ul className="text-sm text-slate-300 space-y-2">
                            {categoryInfo.notRecommended?.map((item: string, i: number) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-red-400">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Recomendaciones */}
                        <div className="mt-6 pt-6 border-t border-slate-700">
                          <div className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                            Recomendaciones:
                          </div>
                          <ul className="text-sm text-slate-300 space-y-2">
                            {categoryInfo.recommendations?.map((rec: string, i: number) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-amber-400">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Términos */}
                        <div className="mt-6 pt-6 border-t border-slate-700">
                          <div className="text-xs text-slate-400 space-y-1">
                            <p>• Precios sujetos a disponibilidad</p>
                            <p>• Se requiere verificación de cuenta</p>
                            <p>• Soporte técnico 24/7 incluido</p>
                            <p>• SLA del 99.9% garantizado</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "gpu" && (
            <div className="space-y-12">
              <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-4">Cloud GPU</h2>
                    <p className="text-slate-300 mb-6 text-lg">
                      Descubra la velocidad de nuestras instancias Public Cloud más potentes: hasta mil veces más
                      rápidas que una CPU para el cálculo paralelo.
                    </p>
                    <p className="text-slate-400 mb-6">
                      Soluciones Cloud GPU a medida con nuestra amplia selección optimizada para IA, machine learning y
                      computación de alto rendimiento.
                    </p>
                    <Button
                      onClick={() => router.push("/public-cloud/compute/gpu/precios")}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                      Ver Precios
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <div className="relative h-64">
                    <img
                      src="/nvidia-gpu-server-ai-computing.jpg"
                      alt="Cloud GPU"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* GPU Models */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-[#1a1f2e] border-slate-800">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-cyan-400 mb-4">H100</div>
                    <h3 className="text-xl font-bold text-white mb-2">NVIDIA H100</h3>
                    <p className="text-slate-400 text-sm mb-4">80 GB HBM2e - PCIe 5.0</p>
                    <p className="text-slate-400 text-sm">
                      Para IA y deep learning más exigentes, inferencia LLM y redes neuronales complejas
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-[#1a1f2e] border-slate-800">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-cyan-400 mb-4">L40S</div>
                    <h3 className="text-xl font-bold text-white mb-2">NVIDIA L40S</h3>
                    <p className="text-slate-400 text-sm mb-4">48 GB GDDR6 - PCIe 4.0</p>
                    <p className="text-slate-400 text-sm">
                      Combinan rendimiento IA y aceleración gráfica para inferencia generativa y gráficos 3D
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-[#1a1f2e] border-slate-800">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-cyan-400 mb-4">A10</div>
                    <h3 className="text-xl font-bold text-white mb-2">NVIDIA A10</h3>
                    <p className="text-slate-400 text-sm mb-4">24 GB GDDR6 - PCIe 4.0</p>
                    <p className="text-slate-400 text-sm">
                      Perfectas para inferencia de IA y virtualización de escritorios gráficos
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "metal" && (
            <div className="space-y-12">
              <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-4">Metal Instances</h2>
                    <p className="text-slate-300 mb-6 text-lg">
                      Combine todas las ventajas de los servidores dedicados con la flexibilidad del cloud y la
                      automatización por API.
                    </p>
                    <p className="text-slate-400 mb-6">
                      Rendimiento y fiabilidad gracias al acceso directo a todos los recursos disponibles en el servidor
                      sin capa de virtualización.
                    </p>
                    <Button
                      onClick={() => router.push("/public-cloud/compute/metal/precios")}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                      Ver Precios
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <div className="relative h-64">
                    <img
                      src="/bare-metal-server-rack-datacenter.jpg"
                      alt="Metal Instances"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Metal Plans */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-[#1a1f2e] border-slate-800">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Small</h3>
                    <p className="text-slate-400 text-sm mb-4">
                      Aislamiento total a precio asequible para alta frecuencia de cálculo
                    </p>
                    <div className="text-3xl font-bold text-cyan-400 mb-2">$0.545</div>
                    <p className="text-slate-500 text-sm">/hora</p>
                  </CardContent>
                </Card>
                <Card className="bg-[#1a1f2e] border-slate-800">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Medium</h3>
                    <p className="text-slate-400 text-sm mb-4">
                      Best-seller para aplicaciones distribuidas con balance perfecto
                    </p>
                    <div className="text-3xl font-bold text-cyan-400 mb-2">$0.927</div>
                    <p className="text-slate-500 text-sm">/hora</p>
                  </CardContent>
                </Card>
                <Card className="bg-[#1a1f2e] border-slate-800">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Large</h3>
                    <p className="text-slate-400 text-sm mb-4">
                      Mejor relación prestaciones-precio para usos intensivos
                    </p>
                    <div className="text-3xl font-bold text-cyan-400 mb-2">$1.58</div>
                    <p className="text-slate-500 text-sm">/hora</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          <div className="mt-16 bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Precios de Virtual Machine Instances</h2>

            {/* Tabs de precios */}
            <div className="flex flex-wrap gap-4 mb-8 border-b border-slate-800">
              <button
                onClick={() => setPricingTab("linux-hourly")}
                className={`pb-4 px-6 font-semibold transition-all text-sm ${
                  pricingTab === "linux-hourly"
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Linux - Por Horas
              </button>
              <button
                onClick={() => setPricingTab("windows-hourly")}
                className={`pb-4 px-6 font-semibold transition-all text-sm ${
                  pricingTab === "windows-hourly"
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Windows - Por Horas
              </button>
              <button
                onClick={() => setPricingTab("linux-monthly")}
                className={`pb-4 px-6 font-semibold transition-all text-sm ${
                  pricingTab === "linux-monthly"
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Linux - Mensual
              </button>
              <button
                onClick={() => setPricingTab("windows-monthly")}
                className={`pb-4 px-6 font-semibold transition-all text-sm ${
                  pricingTab === "windows-monthly"
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Windows - Mensual
              </button>
            </div>

            {/*Tabla Linux Por Horas */}
            {pricingTab === "linux-hourly" && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Modelo</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">vCore</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Memoria</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Almacenamiento Local</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Ancho de banda</th>
                      <th className="text-right py-3 px-4 text-slate-300 font-semibold">Precio/hora</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* General Purpose */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={6} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">General Purpose</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-2</td>
                      <td className="py-3 px-4 text-slate-300">1</td>
                      <td className="py-3 px-4 text-slate-300">2 GB</td>
                      <td className="py-3 px-4 text-slate-300">10 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 Mbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.009</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-4</td>
                      <td className="py-3 px-4 text-slate-300">1</td>
                      <td className="py-3 px-4 text-slate-300">4 GB</td>
                      <td className="py-3 px-4 text-slate-300">10 GB</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.018</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-8</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">8 GB</td>
                      <td className="py-3 px-4 text-slate-300">20 GB</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.036</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-16</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">40 GB</td>
                      <td className="py-3 px-4 text-slate-300">1 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.073</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-32</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">80 GB</td>
                      <td className="py-3 px-4 text-slate-300">2 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.146</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-64</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">160 GB</td>
                      <td className="py-3 px-4 text-slate-300">4 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.291</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-128</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">320 GB</td>
                      <td className="py-3 px-4 text-slate-300">8 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.583</td>
                    </tr>

                    {/* Compute Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={6} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Compute Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-2</td>
                      <td className="py-3 px-4 text-slate-300">1</td>
                      <td className="py-3 px-4 text-slate-300">2 GB</td>
                      <td className="py-3 px-4 text-slate-300">25 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 Mbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.018</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-4</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">4 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.036</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-8</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">8 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 GB</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.073</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-16</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">200 GB</td>
                      <td className="py-3 px-4 text-slate-300">1 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.146</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-32</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB</td>
                      <td className="py-3 px-4 text-slate-300">2 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.291</td>
                    </tr>

                    {/* Memory Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={6} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Memory Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-16</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">25 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 Mbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.036</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-32</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.073</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-64</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 GB</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.146</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-128</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">200 GB</td>
                      <td className="py-3 px-4 text-slate-300">1 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.291</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Tabla Windows Por Horas */}
            {pricingTab === "windows-hourly" && (
              <div className="overflow-x-auto">
                <div className="mb-4 p-4 bg-blue-950/30 border border-blue-500/30 rounded-lg">
                  <p className="text-slate-300 text-sm">
                    * El precio mostrado incluye el costo de la licencia Windows ($0.039 /vCore/hora).
                  </p>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Nombre</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Memoria</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">vCore</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Almacenamiento</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Red pública</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Red privada</th>
                      <th className="text-right py-3 px-4 text-slate-300 font-semibold">Precio /hora</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* General Purpose */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">General Purpose</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-8</td>
                      <td className="py-3 px-4 text-slate-300">8 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.1288</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-16</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.2576</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-32</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.5153</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-64</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.0305</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-128</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.0611</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-256</td>
                      <td className="py-3 px-4 text-slate-300">256 GB</td>
                      <td className="py-3 px-4 text-slate-300">64</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">16 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">16 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$4.1222</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-512</td>
                      <td className="py-3 px-4 text-slate-300">512 GB</td>
                      <td className="py-3 px-4 text-slate-300">128</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$8.2831</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-640</td>
                      <td className="py-3 px-4 text-slate-300">640 GB</td>
                      <td className="py-3 px-4 text-slate-300">160</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$10.3538</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-7</td>
                      <td className="py-3 px-4 text-slate-300">7 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">300 Mbit/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.211</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-15</td>
                      <td className="py-3 px-4 text-slate-300">15 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.387</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-30</td>
                      <td className="py-3 px-4 text-slate-300">30 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.651</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-60</td>
                      <td className="py-3 px-4 text-slate-300">60 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.972</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-120</td>
                      <td className="py-3 px-4 text-slate-300">120 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.579</td>
                    </tr>

                    {/* Compute Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Compute Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-4</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">4 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.1233</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-8</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">8 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.2467</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-16</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">200 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s máx.</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.4933</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-32</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.9867</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-64</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.9734</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-128</td>
                      <td className="py-3 px-4 text-slate-300">64</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$3.9468</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-256</td>
                      <td className="py-3 px-4 text-slate-300">128</td>
                      <td className="py-3 px-4 text-slate-300">256 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$7.9282</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-320</td>
                      <td className="py-3 px-4 text-slate-300">160</td>
                      <td className="py-3 px-4 text-slate-300">320 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$9.9102</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-7</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">7 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.249</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-15</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">15 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.476</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-30</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">30 GB</td>
                      <td className="py-3 px-4 text-slate-300">200 GB SSD</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.952</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-60</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">60 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.451</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-120</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">120 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.443</td>
                    </tr>

                    {/* Memory Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Memory Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-16</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">25 GB</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.1438</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-32</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB</td>
                      <td className="py-3 px-4 text-slate-300">1 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.2875</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-64</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 GB</td>
                      <td className="py-3 px-4 text-slate-300">2 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.5751</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-128</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">200 GB</td>
                      <td className="py-3 px-4 text-slate-300">4 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.1501</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-256</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">256 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.3002</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-512</td>
                      <td className="py-3 px-4 text-slate-300">64</td>
                      <td className="py-3 px-4 text-slate-300">512 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$4.6005</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-1024</td>
                      <td className="py-3 px-4 text-slate-300">128</td>
                      <td className="py-3 px-4 text-slate-300">1.024 TB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$9.251</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-15</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">15 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.277</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-30</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">30 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.465</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-60</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">60 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.636</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-120</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">120 GB</td>
                      <td className="py-3 px-4 text-slate-300">200 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.927</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-240</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">240 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.579</td>
                    </tr>

                    {/* Storage Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Storage Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">i1-45</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">45 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD + 1.9 TB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.06</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">i1-90</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">90 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD + 2 x 1.9 TB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.576</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">i1-180</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">180 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD + 4 x 1.9 TB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.633</td>
                    </tr>

                    {/* Cloud GPU */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Cloud GPU</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">rtx5000-28</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">28 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.756</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">rtx5000-56</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">56 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.512</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">rtx5000-84</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">84 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.424</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t1-45</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">45 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.491</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t1-90</td>
                      <td className="py-3 px-4 text-slate-300">18</td>
                      <td className="py-3 px-4 text-slate-300">90 GB</td>
                      <td className="py-3 px-4 text-slate-300">800 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$4.415</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t1-180</td>
                      <td className="py-3 px-4 text-slate-300">36</td>
                      <td className="py-3 px-4 text-slate-300">180 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB + 2 x 2 TB NVMe Passthrough</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$8.342</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-4 p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
                  <p className="text-slate-400 text-sm">
                    Las instancias incluyen una dirección IPv4 por defecto, excepto en el caso de las instancias en
                    Local Zones, en las que las direcciones IP adicionales son de pago.
                  </p>
                </div>
              </div>
            )}

            {/* Tabla Linux Por Mes */}
            {pricingTab === "linux-monthly" && (
              <div className="overflow-x-auto">
                <div className="mb-4 p-4 bg-blue-950/30 border border-blue-500/30 rounded-lg">
                  <p className="text-slate-300 text-sm">
                    * Precio para un Savings Plan de un mes. Puede consultar los precios de los Savings Plans para 6,
                    12, 24 y 36 meses en nuestra página dedicada Savings Plans.
                  </p>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Nombre</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Memoria</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">vCore</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Almacenamiento</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Red pública</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Red privada</th>
                      <th className="text-right py-3 px-4 text-slate-300 font-semibold">Precio /mes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* General Purpose */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">General Purpose</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-8</td>
                      <td className="py-3 px-4 text-slate-300">8 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$28.21 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-16</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$56.41 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-32</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$112.82 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-64</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$225.63 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-128</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$451.25 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-256</td>
                      <td className="py-3 px-4 text-slate-300">256 GB</td>
                      <td className="py-3 px-4 text-slate-300">64</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">16 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$902.50 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-512</td>
                      <td className="py-3 px-4 text-slate-300">512 GB</td>
                      <td className="py-3 px-4 text-slate-300">128</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,805 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-640</td>
                      <td className="py-3 px-4 text-slate-300">640 GB</td>
                      <td className="py-3 px-4 text-slate-300">160</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2,256.24 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-7</td>
                      <td className="py-3 px-4 text-slate-300">7 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$29</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-15</td>
                      <td className="py-3 px-4 text-slate-300">15 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$55.40</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-30</td>
                      <td className="py-3 px-4 text-slate-300">30 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$112</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-60</td>
                      <td className="py-3 px-4 text-slate-300">60 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$218</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-120</td>
                      <td className="py-3 px-4 text-slate-300">120 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$429</td>
                    </tr>

                    {/* Compute Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Compute Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-4</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">4 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.1233</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-8</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">8 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.2467</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-16</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">200 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.4933</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-32</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.9867</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-64</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.9734</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-128</td>
                      <td className="py-3 px-4 text-slate-300">64</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.62725</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-256</td>
                      <td className="py-3 px-4 text-slate-300">128</td>
                      <td className="py-3 px-4 text-slate-300">256 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$5.25450</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-320</td>
                      <td className="py-3 px-4 text-slate-300">160</td>
                      <td className="py-3 px-4 text-slate-300">320 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$6.56812</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-7</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">7 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.249</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-15</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">15 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.476</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-30</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">30 GB</td>
                      <td className="py-3 px-4 text-slate-300">200 GB SSD</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.952</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-60</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">60 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.451</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-120</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">120 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.443</td>
                    </tr>

                    {/* Memory Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Memory Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-16</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">25 GB</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.1438</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-32</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB</td>
                      <td className="py-3 px-4 text-slate-300">1 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.2875</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-64</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 GB</td>
                      <td className="py-3 px-4 text-slate-300">2 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.5751</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-128</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">200 GB</td>
                      <td className="py-3 px-4 text-slate-300">4 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.1501</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-256</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">256 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.3002</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-512</td>
                      <td className="py-3 px-4 text-slate-300">64</td>
                      <td className="py-3 px-4 text-slate-300">512 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$4.6005</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-1024</td>
                      <td className="py-3 px-4 text-slate-300">128</td>
                      <td className="py-3 px-4 text-slate-300">1.024 TB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$9.251</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-15</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">15 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.277</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-30</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">30 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.465</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-60</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">60 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.636</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-120</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">120 GB</td>
                      <td className="py-3 px-4 text-slate-300">200 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.927</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-240</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">240 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.579</td>
                    </tr>

                    {/* Storage Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Storage Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">i1-45</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">45 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD + 1.9 TB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.06</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">i1-90</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">90 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD + 2 x 1.9 TB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.576</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">i1-180</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">180 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD + 4 x 1.9 TB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.633</td>
                    </tr>

                    {/* Cloud GPU */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Cloud GPU</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">rtx5000-28</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">28 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.756</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">rtx5000-56</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">56 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.512</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">rtx5000-84</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">84 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.424</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t1-45</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">45 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.491</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t1-90</td>
                      <td className="py-3 px-4 text-slate-300">18</td>
                      <td className="py-3 px-4 text-slate-300">90 GB</td>
                      <td className="py-3 px-4 text-slate-300">800 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$4.415</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t1-180</td>
                      <td className="py-3 px-4 text-slate-300">36</td>
                      <td className="py-3 px-4 text-slate-300">180 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB + 2 x 2 TB NVMe Passthrough</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$8.342</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-4 p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
                  <p className="text-slate-400 text-sm">
                    Las instancias incluyen una dirección IPv4 por defecto, excepto en el caso de las instancias en
                    Local Zones, en las que las direcciones IP adicionales son de pago.
                  </p>
                </div>
              </div>
            )}

            {pricingTab === "windows-monthly" && (
              <div className="overflow-x-auto">
                <div className="mb-4 p-4 bg-blue-950/30 border border-blue-500/30 rounded-lg">
                  <p className="text-slate-300 text-sm">
                    * Precio para un Savings Plan de un mes. En el caso de las instancias Windows, el precio mostrado
                    incluye el precio de la licencia ( $0.039 /vCore/hora ). Puede consultar los precios de los Savings
                    Plans para 6, 12, 24 y 36 meses en nuestra página dedicada Savings Plans.
                  </p>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Nombre</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Memoria</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">vCore</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Almacenamiento</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Red pública</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">Red privada</th>
                      <th className="text-right py-3 px-4 text-slate-300 font-semibold">Precio /mes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* General Purpose */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">General Purpose</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-8</td>
                      <td className="py-3 px-4 text-slate-300">8 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$85.15 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-16</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$170.29 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-32</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$340.58 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-64</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$681.15 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-128</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1,362.29 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-256</td>
                      <td className="py-3 px-4 text-slate-300">256 GB</td>
                      <td className="py-3 px-4 text-slate-300">64</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">16 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2,724.58 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-512</td>
                      <td className="py-3 px-4 text-slate-300">512 GB</td>
                      <td className="py-3 px-4 text-slate-300">128</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$5,449.16 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b3-640</td>
                      <td className="py-3 px-4 text-slate-300">640 GB</td>
                      <td className="py-3 px-4 text-slate-300">160</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$6,811.44 *</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-7</td>
                      <td className="py-3 px-4 text-slate-300">7 GB</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$76</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-15</td>
                      <td className="py-3 px-4 text-slate-300">15 GB</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">100 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$122</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-30</td>
                      <td className="py-3 px-4 text-slate-300">30 GB</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">200 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$194</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-60</td>
                      <td className="py-3 px-4 text-slate-300">60 GB</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$308</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">b2-120</td>
                      <td className="py-3 px-4 text-slate-300">120 GB</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$525</td>
                    </tr>

                    {/* Compute Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Compute Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-4</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">4 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.1233</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-8</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">8 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.2467</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-16</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">200 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.4933</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-32</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.9867</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-64</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.9734</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-128</td>
                      <td className="py-3 px-4 text-slate-300">64</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.62725</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-256</td>
                      <td className="py-3 px-4 text-slate-300">128</td>
                      <td className="py-3 px-4 text-slate-300">256 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$5.25450</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c3-320</td>
                      <td className="py-3 px-4 text-slate-300">160</td>
                      <td className="py-3 px-4 text-slate-300">320 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$6.56812</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-7</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">7 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.249</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-15</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">15 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.476</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-30</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">30 GB</td>
                      <td className="py-3 px-4 text-slate-300">200 GB SSD</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.952</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-60</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">60 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.451</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">c2-120</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">120 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.443</td>
                    </tr>

                    {/* Memory Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Memory Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-16</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">16 GB</td>
                      <td className="py-3 px-4 text-slate-300">25 GB</td>
                      <td className="py-3 px-4 text-slate-300">500 Mbit/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.1438</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-32</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">32 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB</td>
                      <td className="py-3 px-4 text-slate-300">1 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.2875</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-64</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">64 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 GB</td>
                      <td className="py-3 px-4 text-slate-300">2 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.5751</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-128</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">128 GB</td>
                      <td className="py-3 px-4 text-slate-300">200 GB</td>
                      <td className="py-3 px-4 text-slate-300">4 Gbps</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.1501</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-256</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">256 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.3002</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-512</td>
                      <td className="py-3 px-4 text-slate-300">64</td>
                      <td className="py-3 px-4 text-slate-300">512 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">20 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$4.6005</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r3-1024</td>
                      <td className="py-3 px-4 text-slate-300">128</td>
                      <td className="py-3 px-4 text-slate-300">1.024 TB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$9.251</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-15</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">15 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.277</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-30</td>
                      <td className="py-3 px-4 text-slate-300">2</td>
                      <td className="py-3 px-4 text-slate-300">30 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.465</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-60</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">60 GB</td>
                      <td className="py-3 px-4 text-slate-300">100 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">250 Mbit/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.636</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-120</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">120 GB</td>
                      <td className="py-3 px-4 text-slate-300">200 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.927</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">r2-240</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">240 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.579</td>
                    </tr>

                    {/* Storage Optimized */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Storage Optimized</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">i1-45</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">45 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD + 1.9 TB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">1 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.06</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">i1-90</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">90 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD + 2 x 1.9 TB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.576</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">i1-180</td>
                      <td className="py-3 px-4 text-slate-300">32</td>
                      <td className="py-3 px-4 text-slate-300">180 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB SSD + 4 x 1.9 TB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">8 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.633</td>
                    </tr>

                    {/* Cloud GPU */}
                    <tr className="border-b border-slate-800">
                      <td colSpan={7} className="py-4 px-4">
                        <div className="text-cyan-400 font-bold text-lg">Cloud GPU</div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">rtx5000-28</td>
                      <td className="py-3 px-4 text-slate-300">4</td>
                      <td className="py-3 px-4 text-slate-300">28 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$0.756</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">rtx5000-56</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">56 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$1.512</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">rtx5000-84</td>
                      <td className="py-3 px-4 text-slate-300">16</td>
                      <td className="py-3 px-4 text-slate-300">84 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB SSD</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.424</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t1-45</td>
                      <td className="py-3 px-4 text-slate-300">8</td>
                      <td className="py-3 px-4 text-slate-300">45 GB</td>
                      <td className="py-3 px-4 text-slate-300">400 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">2 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$2.491</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t1-90</td>
                      <td className="py-3 px-4 text-slate-300">18</td>
                      <td className="py-3 px-4 text-slate-300">90 GB</td>
                      <td className="py-3 px-4 text-slate-300">800 GB NVMe</td>
                      <td className="py-3 px-4 text-slate-300">4 Gb/s garantizado(s)</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$4.415</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-3 px-4 text-white">t1-180</td>
                      <td className="py-3 px-4 text-slate-300">36</td>
                      <td className="py-3 px-4 text-slate-300">180 GB</td>
                      <td className="py-3 px-4 text-slate-300">50 GB + 2 x 2 TB NVMe Passthrough</td>
                      <td className="py-3 px-4 text-slate-300">10 Gb/s</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">$8.342</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-4 p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
                  <p className="text-slate-400 text-sm">
                    Las instancias incluyen una dirección IPv4 por defecto, excepto en el caso de las instancias en
                    Local Zones, en las que las direcciones IP adicionales son de pago.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
