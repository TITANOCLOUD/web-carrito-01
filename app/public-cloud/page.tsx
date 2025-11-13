"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Cloud,
  Database,
  Network,
  Cpu,
  HardDrive,
  Check,
  Globe,
  DollarSign,
  Container,
  Brain,
  BarChart3,
  Layers,
  Lock,
  Zap,
  Users,
  TrendingUp,
  Shield,
  Server,
  FileCode,
  Monitor,
} from "lucide-react"
import Link from "next/link"

export default function PublicCloudPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-6">
          <Cloud className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold">Public Cloud by Titano Cloud</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Automatice su infraestructura, acelere su actividad
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Elija entre más de 50 servicios de infraestructuras y plataformas administradas por Titano Cloud para todos
          sus proyectos de modernización de aplicaciones y despliegues «cloud native», y saque el máximo partido a sus
          datos y a la inteligencia artificial.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8">
            Empezar gratis
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent px-8"
          >
            <Link href="/public-cloud/compute">Ver precios</Link>
          </Button>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="primeros-pasos" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12 bg-slate-900 border border-slate-800">
            <TabsTrigger
              value="primeros-pasos"
              className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
            >
              Primeros Pasos
            </TabsTrigger>
            <TabsTrigger value="gamas" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              Gamas
            </TabsTrigger>
            <TabsTrigger value="ventajas" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              Ventajas
            </TabsTrigger>
            <TabsTrigger value="casos" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              Casos de éxito
            </TabsTrigger>
          </TabsList>

          <TabsContent value="primeros-pasos" className="space-y-16">
            {/* ¿Qué es el cloud computing? */}
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-4">
                  <Cloud className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-400 font-semibold">Centro de aprendizaje</span>
                </div>
                <h2 className="text-4xl font-bold mb-6 text-white">¿Qué es el cloud computing?</h2>
                <p className="text-lg text-slate-300 leading-relaxed">
                  El cloud computing o computación en la nube hace referencia a aquella tecnología que utiliza internet
                  para entregar recursos como el almacenamiento de datos, las bases de datos, las redes, el software,
                  las aplicaciones o el análisis de datos.
                </p>
              </div>

              <Card className="bg-slate-900/70 border-slate-800 p-8 mb-8">
                <p className="text-slate-300 leading-relaxed mb-6">
                  Las empresas que ofrecen estos servicios de computación en la nube reciben el nombre de proveedores de
                  servicios cloud. El cloud computing ofrece una alternativa escalable, accesible y rentable al hardware
                  y los servidores físicos «on-premises» o locales al incluir espacio de almacenamiento ilimitado y un
                  modelo de pago por uso, así como una administración simplificada a través de una interfaz
                  centralizada.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  En pocas palabras, el cloud computing es la práctica de prestar servicios informáticos bajo demanda de
                  forma remota mediante una red de Internet y el alojamiento en uno o más centros de datos externos.
                  Desde sus inicios, el cloud computing ha ayudado a millones de organizaciones a adoptar nuevas
                  tecnologías, impulsar la eficiencia, reducir el tiempo de salida al mercado y ampliar sus operaciones,
                  a la vez que reduce los costes de infraestructura de TI.
                </p>
              </Card>

              {/* ¿Por qué es importante? */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-white mb-4">¿Por qué es importante el cloud computing?</h3>
                <p className="text-slate-300 leading-relaxed">
                  En los últimos veinte años, la tecnología de computación en la nube ha evolucionado considerablemente;
                  de hecho, a día de hoy, las infraestructuras cloud representan más de un tercio del gasto anual en
                  servicios informáticos de las empresas a escala mundial. La razón por la que el cloud computing es tan
                  popular es quizá obvia: su diseño rentable y escalable es perfecto para crear aplicaciones modernas,
                  ofrecer servicios de calidad y transformar las operaciones empresariales.
                </p>
              </div>

              {/* Funcionalidades */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-white mb-6">
                  ¿Cuáles son las funcionalidades del cloud computing?
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-slate-900/70 border-slate-800 p-6">
                    <h4 className="text-lg font-semibold text-cyan-400 mb-2">Autoservicio</h4>
                    <p className="text-slate-400 text-sm">
                      Los usuarios pueden administrar sus recursos en la nube según sus necesidades sin que el proveedor
                      de servicios cloud tenga que intervenir.
                    </p>
                  </Card>

                  <Card className="bg-slate-900/70 border-slate-800 p-6">
                    <h4 className="text-lg font-semibold text-cyan-400 mb-2">Elasticidad</h4>
                    <p className="text-slate-400 text-sm">
                      Es posible añadir y eliminar fácilmente recursos bajo demanda, por lo que los usuarios pueden
                      administrar sus cargas de trabajo de manera eficiente.
                    </p>
                  </Card>

                  <Card className="bg-slate-900/70 border-slate-800 p-6">
                    <h4 className="text-lg font-semibold text-cyan-400 mb-2">Servicio medido</h4>
                    <p className="text-slate-400 text-sm">
                      Los servicios de cloud se facturan mediante un modelo de pago por consumo en función del uso que
                      el cliente hace de los recursos cloud.
                    </p>
                  </Card>

                  <Card className="bg-slate-900/70 border-slate-800 p-6">
                    <h4 className="text-lg font-semibold text-cyan-400 mb-2">Pool de recursos</h4>
                    <p className="text-slate-400 text-sm">
                      Los recursos pueden agruparse y compartirse entre usuarios. El proveedor asigna estos recursos
                      dinámicamente según sea necesario.
                    </p>
                  </Card>

                  <Card className="bg-slate-900/70 border-slate-800 p-6">
                    <h4 className="text-lg font-semibold text-cyan-400 mb-2">Mayor acceso a la red</h4>
                    <p className="text-slate-400 text-sm">
                      Los servicios, aplicaciones y datos de la computación en la nube son accesibles desde múltiples
                      dispositivos, incluyendo portátiles y teléfonos móviles.
                    </p>
                  </Card>
                </div>
              </div>

              {/* Ventajas */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-white mb-6">¿Qué ventajas tiene el cloud computing?</h3>
                <div className="space-y-6">
                  <Card className="bg-slate-900/70 border-slate-800 p-6">
                    <div className="flex items-start gap-4">
                      <TrendingUp className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Flexibilidad y agilidad</h4>
                        <p className="text-slate-400 text-sm">
                          Los servicios de cloud computing se alquilan a un proveedor de cloud utilizando un modelo
                          «pay-as-you-go», para ofrecer una respuesta ágil a las exigencias de los usuarios. Es posible
                          eliminar recursos y adquirir otros nuevos sin grandes inversiones ni sobreasignación.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-slate-900/70 border-slate-800 p-6">
                    <div className="flex items-start gap-4">
                      <Zap className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Velocidad de despliegue</h4>
                        <p className="text-slate-400 text-sm">
                          Esta tecnología permite desplegar nuevos recursos en solo unos clic. La escalabilidad que
                          ofrece el cloud computing permite a las empresas ampliar la infraestructura, adaptarse a los
                          picos de tráfico y reducir el tiempo total de salida al mercado.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-slate-900/70 border-slate-800 p-6">
                    <div className="flex items-start gap-4">
                      <DollarSign className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Control del gasto</h4>
                        <p className="text-slate-400 text-sm">
                          Al utilizar un proveedor de servicios en la nube, los clientes solo pagan por los recursos en
                          la nube que utilizan. No es necesario anticipar las cargas de trabajo ni invertir en costosos
                          recursos que solo se utilizarán en un par de ocasiones.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-slate-900/70 border-slate-800 p-6">
                    <div className="flex items-start gap-4">
                      <Shield className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Seguridad reforzada</h4>
                        <p className="text-slate-400 text-sm">
                          Los proveedores de cloud ahora ofrecen una variedad de soluciones de seguridad cloud. El cloud
                          computing permite a las empresas aprovechar conexiones privadas seguras, protección anti-DDoS
                          y backups automatizados.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Modelos de cloud computing */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-white mb-6">Tipos de modelos de cloud computing</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="bg-slate-900/70 border-slate-800 p-6">
                    <Server className="w-12 h-12 text-cyan-400 mb-4" />
                    <h4 className="text-xl font-semibold text-white mb-3">Infrastructure-as-a-Service (IaaS)</h4>
                    <p className="text-slate-400 text-sm">
                      Permite a los usuarios acceder a recursos de computación virtual a través de Internet, sin la
                      necesidad de hardware físico local. Con IaaS, las empresas contratan una infraestructura en la
                      nube pero siguen supervisando la gestión de sus aplicaciones.
                    </p>
                  </Card>

                  <Card className="bg-slate-900/70 border-slate-800 p-6">
                    <FileCode className="w-12 h-12 text-cyan-400 mb-4" />
                    <h4 className="text-xl font-semibold text-white mb-3">Platform-as-a-Service (PaaS)</h4>
                    <p className="text-slate-400 text-sm">
                      Los equipos pueden gestionar, construir, testear y desplegar sus propias aplicaciones en una
                      plataforma cloud especialmente diseñada. La infraestructura informática subyacente es gestionada
                      por el proveedor de cloud.
                    </p>
                  </Card>

                  <Card className="bg-slate-900/70 border-slate-800 p-6">
                    <Monitor className="w-12 h-12 text-cyan-400 mb-4" />
                    <h4 className="text-xl font-semibold text-white mb-3">Software-as-a-Service (SaaS)</h4>
                    <p className="text-slate-400 text-sm">
                      Las plataformas de software se alojan externamente, en el cloud. Los usuarios pueden acceder al
                      software a través de Internet mediante un modelo de suscripción, sin necesidad de comprar,
                      instalar y actualizar plataformas de software.
                    </p>
                  </Card>
                </div>
              </div>

              {/* ¿Por qué elegir Titano Cloud? */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-12">
                <h3 className="text-3xl font-bold text-white mb-8 text-center">
                  ¿Por qué elegir el Public Cloud de Titano Cloud?
                </h3>
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div>
                    <h4 className="text-xl font-semibold text-cyan-400 mb-4">Simple</h4>
                    <p className="text-slate-300">Nuestras soluciones cloud son fáciles de usar desde el principio.</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-cyan-400 mb-4">Multilocal</h4>
                    <p className="text-slate-300">
                      Desplegamos nuestra propia red y nuestros propios datacenters para estar cerca de todas las
                      personas en todo el mundo.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-cyan-400 mb-4">Accesible</h4>
                    <p className="text-slate-300">
                      Nuestros precios son los mejores del mercado. Además, son previsibles y no tienen costes ocultos.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-cyan-400 mb-4">Reversible</h4>
                    <p className="text-slate-300">
                      Utilizamos tecnologías estándar en el mercado para ser abiertos e interoperables.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-cyan-400 mb-4">Transparente</h4>
                    <p className="text-slate-300">
                      Nos comprometemos con la claridad de nuestra comunicación y favorecemos una tarificación
                      predecible.
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8">
                    Empezar ahora
                  </Button>
                </div>
              </div>

              {/* FAQ mejorado */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Preguntas frecuentes</h3>
                <div className="space-y-4">
                  <Card className="bg-slate-900/70 border-slate-800 p-6">
                    <h4 className="text-lg font-semibold text-white mb-2">¿Cómo funciona Public Cloud?</h4>
                    <p className="text-slate-400 text-sm">
                      El cloud público es un modo de despliegue de servicios cloud computing donde los recursos como la
                      potencia de cálculo y el almacenamiento son compartidos entre usuarios, optimizando costes y
                      escalabilidad.
                    </p>
                  </Card>

                  <Card className="bg-slate-900/70 border-slate-800 p-6">
                    <h4 className="text-lg font-semibold text-white mb-2">¿Quién utiliza el cloud computing?</h4>
                    <p className="text-slate-400 text-sm">
                      El cloud computing es utilizado por organizaciones grandes y pequeñas que operan en todas las
                      industrias. Los servicios cloud son esenciales para el almacenamiento de datos, backup, desarrollo
                      de software, análisis de datos y aplicaciones.
                    </p>
                  </Card>

                  <Card className="bg-slate-900/70 border-slate-800 p-6">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      ¿Cuál es la diferencia entre el alojamiento tradicional y el cloud computing?
                    </h4>
                    <p className="text-slate-400 text-sm">
                      El alojamiento tradicional requiere una importante inversión inicial en hardware. El cloud
                      computing proporciona infraestructuras virtuales, reduciendo la necesidad de servidores físicos y
                      permitiendo escalar recursos en función de la demanda en tiempo real.
                    </p>
                  </Card>

                  <Card className="bg-slate-900/70 border-slate-800 p-6">
                    <h4 className="text-lg font-semibold text-white mb-2">¿Dónde se despliega el Public Cloud?</h4>
                    <p className="text-slate-400 text-sm">
                      Contamos con más de 30 ubicaciones a nivel mundial, incluyendo regiones 3-AZ en Europa, América,
                      Asia y Oceanía. Consulte nuestra página de ubicaciones para más detalles.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Gamas Tab */}
          <TabsContent value="gamas" className="space-y-20">
            {/* Main Services Grid */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">Descubra las soluciones Public Cloud</h2>
              <p className="text-slate-400 max-w-3xl mx-auto">
                Más de 50 servicios de infraestructuras y plataformas para impulsar su transformación digital
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Compute */}
              <Link href="/public-cloud/compute">
                <Card className="bg-slate-900/70 border-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer h-full group">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Cpu className="w-9 h-9 text-white" />
                    </div>
                    <CardTitle className="text-white text-2xl">Compute</CardTitle>
                    <CardDescription className="text-slate-400">
                      La potencia de las máquinas virtuales para todos sus usos. ¡Disfrute de la fiabilidad, la
                      flexibilidad y la reversibilidad del cloud!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" className="text-cyan-400 hover:text-cyan-300 p-0">
                      Descubrir Compute →
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              {/* Storage */}
              <Link href="/public-cloud/storage">
                <Card className="bg-slate-900/70 border-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer h-full group">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <HardDrive className="w-9 h-9 text-white" />
                    </div>
                    <CardTitle className="text-white text-2xl">Storage</CardTitle>
                    <CardDescription className="text-slate-400">
                      Una completa gama de soluciones para almacenar sus datos con total seguridad. Garantice una
                      protección óptima de sus datos sin comprometer su rendimiento.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" className="text-cyan-400 hover:text-cyan-300 p-0">
                      Descubrir Storage →
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              {/* Network */}
              <Link href="/public-cloud/network">
                <Card className="bg-slate-900/70 border-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer h-full group">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Network className="w-9 h-9 text-white" />
                    </div>
                    <CardTitle className="text-white text-2xl">Network</CardTitle>
                    <CardDescription className="text-slate-400">
                      La eficacia de 20 años de experiencia en redes, impulsada por herramientas de última generación
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" className="text-cyan-400 hover:text-cyan-300 p-0">
                      Descubrir Network →
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              {/* Containers & Orchestration */}
              <Link href="/public-cloud/containers">
                <Card className="bg-slate-900/70 border-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer h-full group">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Container className="w-9 h-9 text-white" />
                    </div>
                    <CardTitle className="text-white text-2xl">Containers & Orchestration</CardTitle>
                    <CardDescription className="text-slate-400">
                      Optimice la gestión del ciclo de vida de sus aplicaciones contenerizadas con soluciones 100% open
                      source.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" className="text-cyan-400 hover:text-cyan-300 p-0">
                      Descubrir Containers →
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              {/* AI & Machine Learning */}
              <Link href="/public-cloud/ai-ml">
                <Card className="bg-slate-900/70 border-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer h-full group">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Brain className="w-9 h-9 text-white" />
                    </div>
                    <CardTitle className="text-white text-2xl">AI & Machine Learning</CardTitle>
                    <CardDescription className="text-slate-400">
                      La potencia de la inteligencia artificial al alcance de todos: herramientas para afrontar con
                      éxito los nuevos desafíos de negocio.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" className="text-cyan-400 hover:text-cyan-300 p-0">
                      Descubrir AI & ML →
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              {/* Databases */}
              <Link href="/public-cloud/databases">
                <Card className="bg-slate-900/70 border-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer h-full group">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Database className="w-9 h-9 text-white" />
                    </div>
                    <CardTitle className="text-white text-2xl">Bases de datos</CardTitle>
                    <CardDescription className="text-slate-400">
                      Elija entre una amplia selección de motores de bases de datos y disfrute de una gestión experta de
                      su infraestructura.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" className="text-cyan-400 hover:text-cyan-300 p-0">
                      Descubrir Cloud Databases →
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              {/* Analytics */}
              <Link href="/public-cloud/analytics">
                <Card className="bg-slate-900/70 border-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer h-full group">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <BarChart3 className="w-9 h-9 text-white" />
                    </div>
                    <CardTitle className="text-white text-2xl">Analytics</CardTitle>
                    <CardDescription className="text-slate-400">
                      Saque partido a sus datos y despliegue su Data Stack y sus aplicaciones en una infraestructura
                      administrada y open source.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" className="text-cyan-400 hover:text-cyan-300 p-0">
                      Descubrir Cloud Analytics →
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              {/* Data Platform */}
              <Link href="/public-cloud/data-platform">
                <Card className="bg-slate-900/70 border-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer h-full group">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Layers className="w-9 h-9 text-white" />
                    </div>
                    <CardTitle className="text-white text-2xl">Data Platform</CardTitle>
                    <CardDescription className="text-slate-400">
                      Cree y despliegue sus proyectos Data & Analytics en tiempo récord con una solución completa,
                      unificada, colaborativa y accesible a todos los usuarios.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" className="text-cyan-400 hover:text-cyan-300 p-0">
                      Descubrir Data Platform →
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              {/* Quantum Computing */}
              <Link href="/public-cloud/quantum">
                <Card className="bg-slate-900/70 border-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer h-full group">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Zap className="w-9 h-9 text-white" />
                    </div>
                    <CardTitle className="text-white text-2xl">Computación cuántica</CardTitle>
                    <CardDescription className="text-slate-400">
                      Explore la informática cuántica con una plataforma unificada: simula, prueba y ejecuta tus
                      algoritmos en emuladores y QPU fácilmente.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" className="text-cyan-400 hover:text-cyan-300 p-0">
                      Descubrir Quantum as a Service →
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              {/* Identity Security & Operations */}
              <Link href="/public-cloud/security">
                <Card className="bg-slate-900/70 border-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer h-full group">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Lock className="w-9 h-9 text-white" />
                    </div>
                    <CardTitle className="text-white text-2xl">Identidad, seguridad y operaciones</CardTitle>
                    <CardDescription className="text-slate-400">
                      Proteja, gestione y monitorice sus servicios cloud en Titano Cloud
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" className="text-cyan-400 hover:text-cyan-300 p-0">
                      Descubrir Soluciones →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Additional Info Sections */}
            <div className="bg-slate-900/50 rounded-2xl p-12 max-w-6xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-6">¡Adéntrese en el universo Public Cloud!</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-cyan-400 mb-3">Infraestructura gestionada</h4>
                  <p className="text-slate-400">
                    Lance su proyecto con recursos de cálculo, almacenamiento, bases de datos y una red segura en
                    regiones 1-AZ o 3-AZ. Disfrute de una facturación por horas, mensual o un compromiso a largo plazo.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-cyan-400 mb-3">Aplicaciones a escala</h4>
                  <p className="text-slate-400">
                    Con nuestras soluciones de gestión de contenedores y clústeres Kubernetes administrados, aproveche
                    al máximo la portabilidad, flexibilidad y escalabilidad.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-cyan-400 mb-3">Datos e IA</h4>
                  <p className="text-slate-400">
                    Centralice su recopilación de datos, automatice su tratamiento y aproveche nuestros modelos de IA
                    para enriquecer sus aplicaciones.
                  </p>
                </div>
              </div>
            </div>

            {/* Special Offer */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-8 max-w-4xl mx-auto text-center">
              <HardDrive className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Object Storage Standard 3-AZ: 3 TB gratis*</h3>
              <p className="text-slate-300 mb-4">
                Disfruta de alta disponibilidad y durabilidad mejorada para tus datos
              </p>
              <div className="flex gap-4 justify-center text-sm text-slate-400 mb-6">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-cyan-400" />
                  <span>SLA del 99,99%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-cyan-400" />
                  <span>Datos inmutables y cifrados</span>
                </div>
              </div>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">Aprovechar oferta</Button>
              <p className="text-xs text-slate-500 mt-4">* Oferta válida hasta el 31 de enero de 2026</p>
            </div>
          </TabsContent>

          {/* Ventajas Tab */}
          <TabsContent value="ventajas" className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">Ventajas</h2>
              <p className="text-slate-400 max-w-3xl mx-auto">
                Descubra por qué miles de empresas confían en Titano Cloud para su infraestructura
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card className="bg-slate-900/70 border-slate-800 p-8">
                <TrendingUp className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Flexibilidad y escalabilidad</h3>
                <p className="text-slate-400">
                  Automatice su infraestructura con nuestros servicios de contenedores y orquestación administrados.
                  También puede añadir y eliminar recursos directamente desde su área de cliente o por API.
                </p>
              </Card>

              <Card className="bg-slate-900/70 border-slate-800 p-8">
                <DollarSign className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Costes predecibles y facturación transparente</h3>
                <p className="text-slate-400">
                  Pague solo por lo que consuma. Las llamadas API y el tráfico de red están incluidos. ¿Prefiere una
                  suscripción a largo plazo? ¡Nuestros Savings Plans le ayudarán a ahorrar!
                </p>
              </Card>

              <Card className="bg-slate-900/70 border-slate-800 p-8">
                <Globe className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Interoperabilidad y estandarización</h3>
                <p className="text-slate-400">
                  Disfrute de la libertad de combinar distintas tecnologías cloud. Nuestro cloud está basado en
                  estándares open source como OpenStack, Kubernetes o PostgreSQL.
                </p>
              </Card>

              <Card className="bg-slate-900/70 border-slate-800 p-8">
                <Shield className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Resiliencia para sus aplicaciones críticas</h3>
                <p className="text-slate-400">
                  Trabajamos todos los días para ofrecerle los mejores estándares de disponibilidad y durabilidad en
                  nuestras soluciones desplegadas en regiones 1-AZ o 3-AZ.
                </p>
              </Card>

              <Card className="bg-slate-900/70 border-slate-800 p-8">
                <Users className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Localización de sus datos</h3>
                <p className="text-slate-400">
                  Localice sus datos más cerca de sus usuarios con nuestros despliegues en Local Zones. Ya contamos con
                  16 Local Zones. Nuestro proyecto: 150 Local Zones.
                </p>
              </Card>

              <Card className="bg-slate-900/70 border-slate-800 p-8">
                <Lock className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Soberanía y seguridad de los datos</h3>
                <p className="text-slate-400">
                  Sus datos seguirán siendo solo suyos. Certificados ISO/IEC 27001, 27017, 27018, 27701, SOC 2 tipo II,
                  CSA tipo II y C5 tipo II.
                </p>
              </Card>
            </div>
          </TabsContent>

          {/* Casos de éxito Tab */}
          <TabsContent value="casos" className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">Ya confían en nosotros</h2>
              <p className="text-slate-400 max-w-3xl mx-auto">
                Descubra cómo nuestros clientes han transformado sus negocios con Titano Cloud
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card className="bg-slate-900/70 border-slate-800 p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Kuano - Empresa de biotecnología</h3>
                <p className="text-slate-400 mb-6">
                  Consigue importantes ahorros y mejora de la eficiencia tras migrar a Public Cloud de Titano Cloud
                </p>
                <Button variant="link" className="text-cyan-400 hover:text-cyan-300 p-0">
                  Leer el caso de éxito →
                </Button>
              </Card>

              <Card className="bg-slate-900/70 border-slate-800 p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Lota.cloud - FinOps</h3>
                <p className="text-slate-400 mb-6">
                  Tiene la ambición de convertirse en un actor líder de FinOps, basándose en los servicios administrados
                  por Titano Cloud
                </p>
                <Button variant="link" className="text-cyan-400 hover:text-cyan-300 p-0">
                  Leer el caso de éxito →
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
