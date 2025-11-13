"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "es" | "en" | "fr"

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es")

  useEffect(() => {
    // Load language from localStorage
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && ["es", "en", "fr"].includes(savedLang)) {
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === "object") {
        value = value[k]
      } else {
        return key
      }
    }

    return typeof value === "string" ? value : key
  }

  return <I18nContext.Provider value={{ language, setLanguage, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider")
  }
  return context
}

// Translations dictionary
const translations = {
  es: {
    header: {
      bareMetal: "Bare Metal & VPS",
      vps: "VPS",
      vpsDesc: "Servidores virtuales flexibles",
      bareMetal: "Bare Metal",
      bareMetalDesc: "Servidores físicos dedicados",
      dedicated: "Servidores Dedicados",
      dedicatedDesc: "Máxima potencia y control",
      clusters: "Clusters de Servidores",
      clustersDesc: "Alta disponibilidad garantizada",
      gpuServers: "Servidores GPU",
      gpuServersDesc: "Potencia para AI y rendering",
      storageServers: "Servidores de Almacenamiento",
      storageServersDesc: "Capacidad masiva de datos",
      calculator: "Calculadora de Configuración",
      calculatorDesc: "Estima costos y especificaciones",
      comparator: "Comparador de Servidores",
      comparatorDesc: "Encuentra tu mejor opción",
      publicCloud: "Nube Pública",
      firstSteps: "Primeros Pasos Nube Pública",
      firstStepsDesc: "Comienza tu viaje en la nube",
      compute: "Compute",
      computeDesc: "Instancias y procesamiento",
      storage: "Storage",
      storageDesc: "Almacenamiento escalable",
      network: "Network",
      networkDesc: "Redes privadas y balanceo",
      containers: "Containers",
      containersDesc: "Kubernetes y Docker",
      databases: "Databases",
      databasesDesc: "Bases de datos gestionadas",
      aiMl: "AI & Machine Learning",
      aiMlDesc: "Entrenamiento de modelos IA",
      analytics: "Analytics",
      analyticsDesc: "Big Data y análisis",
      security: "Security",
      securityDesc: "Protección y cumplimiento",
      login: "INGRESAR",
    },
    publicCloud: {
      heroTitle: "Nube Pública de Titano Cloud",
      heroSubtitle: "Infraestructura escalable y segura para tu negocio",
      tabs: {
        services: "Gamas",
        advantages: "Ventajas",
        successCases: "Casos de éxito",
        firstSteps: "Primeros Pasos",
      },
    },
  },
  en: {
    header: {
      bareMetal: "Bare Metal & VPS",
      vps: "VPS",
      vpsDesc: "Flexible virtual servers",
      bareMetal: "Bare Metal",
      bareMetalDesc: "Dedicated physical servers",
      dedicated: "Dedicated Servers",
      dedicatedDesc: "Maximum power and control",
      clusters: "Server Clusters",
      clustersDesc: "Guaranteed high availability",
      gpuServers: "GPU Servers",
      gpuServersDesc: "Power for AI and rendering",
      storageServers: "Storage Servers",
      storageServersDesc: "Massive data capacity",
      calculator: "Configuration Calculator",
      calculatorDesc: "Estimate costs and specifications",
      comparator: "Server Comparator",
      comparatorDesc: "Find your best option",
      publicCloud: "Public Cloud",
      firstSteps: "Public Cloud First Steps",
      firstStepsDesc: "Start your cloud journey",
      compute: "Compute",
      computeDesc: "Instances and processing",
      storage: "Storage",
      storageDesc: "Scalable storage",
      network: "Network",
      networkDesc: "Private networks and balancing",
      containers: "Containers",
      containersDesc: "Kubernetes and Docker",
      databases: "Databases",
      databasesDesc: "Managed databases",
      aiMl: "AI & Machine Learning",
      aiMlDesc: "AI model training",
      analytics: "Analytics",
      analyticsDesc: "Big Data and analytics",
      security: "Security",
      securityDesc: "Protection and compliance",
      login: "LOGIN",
    },
    publicCloud: {
      heroTitle: "Titano Cloud Public Cloud",
      heroSubtitle: "Scalable and secure infrastructure for your business",
      tabs: {
        services: "Services",
        advantages: "Advantages",
        successCases: "Success Cases",
        firstSteps: "First Steps",
      },
    },
  },
  fr: {
    header: {
      bareMetal: "Bare Metal & VPS",
      vps: "VPS",
      vpsDesc: "Serveurs virtuels flexibles",
      bareMetal: "Bare Metal",
      bareMetalDesc: "Serveurs physiques dédiés",
      dedicated: "Serveurs Dédiés",
      dedicatedDesc: "Puissance et contrôle maximum",
      clusters: "Clusters de Serveurs",
      clustersDesc: "Haute disponibilité garantie",
      gpuServers: "Serveurs GPU",
      gpuServersDesc: "Puissance pour l'IA et le rendu",
      storageServers: "Serveurs de Stockage",
      storageServersDesc: "Capacité de données massive",
      calculator: "Calculateur de Configuration",
      calculatorDesc: "Estimez les coûts et spécifications",
      comparator: "Comparateur de Serveurs",
      comparatorDesc: "Trouvez votre meilleure option",
      publicCloud: "Cloud Public",
      firstSteps: "Premiers Pas Cloud Public",
      firstStepsDesc: "Commencez votre parcours cloud",
      compute: "Compute",
      computeDesc: "Instances et traitement",
      storage: "Storage",
      storageDesc: "Stockage évolutif",
      network: "Network",
      networkDesc: "Réseaux privés et équilibrage",
      containers: "Containers",
      containersDesc: "Kubernetes et Docker",
      databases: "Databases",
      databasesDesc: "Bases de données gérées",
      aiMl: "IA & Machine Learning",
      aiMlDesc: "Entraînement de modèles IA",
      analytics: "Analytics",
      analyticsDesc: "Big Data et analytique",
      security: "Security",
      securityDesc: "Protection et conformité",
      login: "CONNEXION",
    },
    publicCloud: {
      heroTitle: "Cloud Public Titano Cloud",
      heroSubtitle: "Infrastructure évolutive et sécurisée pour votre entreprise",
      tabs: {
        services: "Gammes",
        advantages: "Avantages",
        successCases: "Cas de succès",
        firstSteps: "Premiers Pas",
      },
    },
  },
}
