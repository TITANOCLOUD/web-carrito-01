import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle, Building2, Globe, Lock, FileCheck, Award, Phone } from "lucide-react"
import Link from "next/link"

export default function ConformidadCertificacionesPage() {
  const certificaciones = [
    {
      id: "iso-27001",
      title: "ISO 27001, 27017 y 27018",
      description:
        "Certificación y SGSI relativos a la gestión de la seguridad de la información para los servicios cloud según la Norma ISO/IEC 27001:2013",
      icon: "ISO_IEC_27001",
      category: "global",
    },
    {
      id: "iso-27701",
      title: "ISO 27701",
      description:
        "Certificación y SGIP relativos a la gestión de la seguridad del tratamiento de datos personales según la Norma ISO/IEC 27701:2019",
      icon: "iec 27701",
      category: "global",
    },
    {
      id: "gdpr",
      title: "RGPD",
      description: "Cumplimiento del Reglamento de la UE 2016/679 relativo a la Protección General de Datos (RGPD)",
      icon: "GDPR",
      category: "regional",
    },
    {
      id: "soc",
      title: "SOC 1, 2 y 3",
      description: "Certificación AICPA relativa al control de los informes financieros SSAE 16/ISAE 3402 de Tipo 2",
      icon: "SOC_2",
      category: "global",
    },
    {
      id: "csa-star",
      title: "CSA STAR",
      description: "Auto-evaluación de las buenas prácticas de la Cloud Security Alliance (CSA) nivel 1",
      icon: "CSA_Star",
      category: "global",
    },
    {
      id: "cispe",
      title: "CISPE",
      description:
        "Miembro fundador de CISPE (Proveedores de Servicios De Infraestructura Cloud en Europa) y signatario de su código de conducta",
      icon: "CISPE",
      category: "regional",
    },
    {
      id: "secnumcloud",
      title: "ANSSI SecNumCloud",
      description: "Certificación de la ANSSI francesa para los proveedores de servicios de cloud de confianza",
      icon: "ANSSI_SecNumCloud",
      category: "regional",
    },
    {
      id: "g-cloud",
      title: "G-Cloud UK",
      description:
        "Mercado digital del programa G-Cloud para la prestación de servicios cloud al sector público en el Reino Unido",
      icon: "G-cloud_UK",
      category: "regional",
    },
    {
      id: "hds",
      title: "Conformidad para el alojamiento de datos de salud",
      description:
        "Certificación de la Agencia Digital de Salud (ANS) francesa para el alojamiento de datos de carácter sanitario",
      icon: "HDS_FR",
      category: "salud",
    },
    {
      id: "healthdata-eu",
      title: "Datos de carácter sanitario en Europa",
      description:
        "Conformidad para el alojamiento de datos de carácter sanitario de ciudadanos franceses, británicos, italianos, alemanes y polacos",
      icon: "HealthData_EU",
      category: "salud",
    },
    {
      id: "hipaa",
      title: "HIPAA e HITECH",
      description:
        "Conformidad con la ley estadounidense 'Health Insurance Portability and Accountability Act' en nuestros centros de datos de Estados Unidos",
      icon: "HIPAA",
      category: "salud",
    },
    {
      id: "pci-dss",
      title: "PCI-DSS",
      description:
        "Certificación para la protección de los datos relativos a las tarjetas de pago PCI DSS 3.2 PSP nivel 1",
      icon: "PCI_DSS",
      category: "finanzas",
    },
    {
      id: "eba",
      title: "EBA",
      description:
        "Conformidad con las Directrices de Externalización de la Autoridad Bancaria Europea (EBA) para los operadores de servicios financieros en Europa",
      icon: "EBA",
      category: "finanzas",
    },
    {
      id: "acpr",
      title: "ACPR PSEE",
      description:
        "Conformidad para la prestación de servicios esenciales externalizados de la Autoridad de Supervisión Prudencial y de Resolución (ACPR) de Francia",
      icon: "ACPR_FR",
      category: "finanzas",
    },
    {
      id: "swipo",
      title: "SWIPO",
      description: "Firmante del Código de Conducta SWIPO IaaS sobre la portabilidad de servicios cloud",
      icon: "SWIPO",
      category: "global",
    },
    {
      id: "c5",
      title: "C5",
      description: "Cloud Computing Compliance Criteria Catalogue",
      icon: "BSI_C5",
      category: "regional",
    },
    {
      id: "acn",
      title: "ACN",
      description: "Certificación para la prestación de servicios cloud al sector público en Italia",
      icon: "acn",
      category: "publico",
    },
    {
      id: "ens",
      title: "ENS",
      description:
        "Conformidad con la certificación de alto nivel Esquema Nacional de Seguridad (ENS) que establece las normas de seguridad para las agencias gubernamentales y las organizaciones públicas en España",
      icon: "ENS certification",
      category: "publico",
    },
    {
      id: "iso-14001",
      title: "ISO 14001",
      description: "Sistema de gestión ambiental",
      icon: "Security blue iso iec 14001",
      category: "global",
    },
    {
      id: "iso-50001",
      title: "ISO 50001",
      description: "La norma ISO 50001 especifica los principales ejes de los sistemas de gestión de la energía",
      icon: "Certification ISO 50001 logo",
      category: "global",
    },
    {
      id: "kritis",
      title: "Infraestructuras críticas del BSI",
      description:
        "Saturno Cloud está registrado oficialmente en la Oficina Federal de Seguridad de la Información (BSI) como operador de Infraestructuras Críticas (KRITIS) en Alemania",
      icon: "kritis_betreiber",
      category: "publico",
    },
  ]

  const sectores = [
    {
      title: "Soluciones para el sector de la salud",
      description: "Conformidad HDS y alojamiento seguro de datos sanitarios",
      icon: Shield,
      link: "/soluciones/salud",
    },
    {
      title: "Alojamiento de datos financieros con la certificación PCI DSS",
      description: "Servicios certificados para el sector financiero",
      icon: Building2,
      link: "/soluciones/finanzas",
    },
    {
      title: "La soberanía en el alojamiento de datos de las administraciones públicas",
      description: "Soluciones de confianza para el sector público",
      icon: Globe,
      link: "/soluciones/sector-publico",
    },
    {
      title: "Soluciones para los datos sensibles industriales",
      description: "Protección avanzada para datos industriales críticos",
      icon: Lock,
      link: "/soluciones/industria",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">Seguridad y Conformidad</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Conformidad y certificaciones
            </h1>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              La confianza de nuestros clientes es nuestra principal preocupación. La experiencia técnica y la
              profesionalidad de nuestros equipos conforman la base de una seguridad pragmática y eficaz, que permite a
              nuestros usuarios entender nuestro enfoque y mantener el control.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg">
                  <Shield className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Gestión global de la seguridad</h3>
                  <p className="text-slate-400 text-sm">
                    Los auditores independientes controlan y evalúan periódicamente el nivel de seguridad,
                    confidencialidad y conformidad de las soluciones que ofrecemos.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg">
                  <Globe className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Normas y reglamentación local y regional</h3>
                  <p className="text-slate-400 text-sm">
                    Nos comprometemos contractualmente a respetar la legislación vigente en los territorios en los que
                    operamos, siempre de conformidad con el RGPD.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg">
                  <Building2 className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Conformidades por sectores</h3>
                  <p className="text-slate-400 text-sm">
                    Nos encontramos en un proceso específico de conformidad para satisfacer necesidades en salud,
                    finanzas, industria y sector público.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Certificaciones Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Nuestras Certificaciones</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificaciones.map((cert) => (
              <Card
                key={cert.id}
                className="bg-slate-900/50 border-slate-800 hover:border-cyan-500/50 transition-all p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-cyan-500/10 rounded-lg">
                    <Award className="w-6 h-6 text-cyan-400" />
                  </div>
                  <Badge className="bg-slate-800 text-slate-300 text-xs">
                    {cert.category === "global" && "Global"}
                    {cert.category === "regional" && "Regional"}
                    {cert.category === "salud" && "Salud"}
                    {cert.category === "finanzas" && "Finanzas"}
                    {cert.category === "publico" && "Sector Público"}
                  </Badge>
                </div>
                <h3 className="text-white font-semibold mb-2">{cert.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{cert.description}</p>
                <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 p-0 h-auto">
                  Más información →
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Política de Seguridad */}
      <section className="py-16 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-slate-900/50 border-slate-800 p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-cyan-500/10 rounded-lg">
                <FileCheck className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Política de seguridad de los sistemas de información
                </h2>
                <p className="text-slate-300">
                  La política de seguridad de los sistemas de información (PSSI) funciona como marco de referencia en
                  materia de ciberseguridad para Saturno Cloud.
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                <p className="text-slate-300 text-sm">
                  El contexto de las operaciones de Saturno Cloud con el fin de entender nuestros principales riesgos
                  para la seguridad
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                <p className="text-slate-300 text-sm">
                  Los compromisos contraídos con las partes interesadas, así como los principios de aplicación y
                  mantenimiento de los sistemas de información en condiciones de seguridad
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                <p className="text-slate-300 text-sm">La materialización de estos principios en Saturno Cloud</p>
              </div>
            </div>

            <Button className="bg-cyan-600 hover:bg-cyan-700">Política de seguridad de Saturno Cloud</Button>
          </Card>
        </div>
      </section>

      {/* Soluciones por Sectores */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Nuestras soluciones para los sectores regulados
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {sectores.map((sector, index) => (
              <Card
                key={index}
                className="bg-slate-900/50 border-slate-800 hover:border-cyan-500/50 transition-all p-6 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                    <sector.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-2">{sector.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">{sector.description}</p>
                    <Link href={sector.link}>
                      <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 p-0 h-auto">
                        Más información →
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios Adicionales */}
      <section className="py-16 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Servicios adicionales</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <h3 className="text-white font-semibold mb-3">Comprobación de certificados e informes</h3>
              <p className="text-slate-400 text-sm mb-4">
                Nuestros clientes pueden acceder, previa petición, a nuestros informes y certificados. En algunos casos,
                también pueden obtener documentación específica relativa a estos certificados.
              </p>
              <Button
                variant="outline"
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
              >
                Solicitar acceso
              </Button>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <h3 className="text-white font-semibold mb-3">Auditorías «in situ»</h3>
              <p className="text-slate-400 text-sm mb-4">
                Autorizamos exclusivamente las auditorías realizadas por terceros con fines de certificación o de
                comprobación del conjunto de partes interesadas.
              </p>
              <Button
                variant="outline"
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
              >
                Contactar ventas
              </Button>
            </Card>
          </div>

          {/* CTA Final */}
          <Card className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border-cyan-500/20 p-8 text-center">
            <Phone className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">¿Necesita ayuda o información?</h3>
            <p className="text-slate-300 mb-6">
              Si lo desea, uno de nuestros asesores puede llamarle de forma gratuita
            </p>
            <Button className="bg-cyan-600 hover:bg-cyan-700">Solicitar llamada</Button>
          </Card>
        </div>
      </section>
    </div>
  )
}
