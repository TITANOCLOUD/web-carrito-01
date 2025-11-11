export default function AIMLPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#0f1419] to-[#0a0e1a]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6 text-balance">AI & Machine Learning</h1>
          <p className="text-xl text-slate-300 mb-12 text-pretty">
            Acelere el desarrollo de aplicaciones de IA con infraestructura escalable, GPUs potentes y servicios
            gestionados
          </p>

          {/* Servicios principales */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500 transition-all">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">AI Training</h3>
              <p className="text-slate-300 mb-4">
                Entrene modelos de ML con GPUs de última generación (NVIDIA A100, H100)
              </p>
              <ul className="text-slate-400 space-y-2 text-sm">
                <li>• GPUs NVIDIA A100 40GB/80GB</li>
                <li>• NVIDIA H100 para cargas extremas</li>
                <li>• Clusters escalables automáticamente</li>
                <li>• Almacenamiento NVMe de alta velocidad</li>
              </ul>
            </div>

            <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500 transition-all">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">AI Inference</h3>
              <p className="text-slate-300 mb-4">
                Despliegue modelos en producción con baja latencia y alto rendimiento
              </p>
              <ul className="text-slate-400 space-y-2 text-sm">
                <li>• API REST y gRPC endpoints</li>
                <li>• Auto-scaling basado en demanda</li>
                <li>• Latencia ultra-baja (&lt;10ms)</li>
                <li>• Soporte para ONNX, TensorRT</li>
              </ul>
            </div>

            <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500 transition-all">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">MLOps Platform</h3>
              <p className="text-slate-300 mb-4">Gestione el ciclo completo de vida de modelos de ML</p>
              <ul className="text-slate-400 space-y-2 text-sm">
                <li>• Model registry y versionado</li>
                <li>• CI/CD para modelos ML</li>
                <li>• Monitoreo y drift detection</li>
                <li>• Experimentos y tracking</li>
              </ul>
            </div>
          </div>

          {/* Frameworks soportados */}
          <div className="bg-[#1a1f2e] border border-cyan-500/30 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Frameworks y Herramientas Soportados</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">Deep Learning</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• TensorFlow</li>
                  <li>• PyTorch</li>
                  <li>• Keras</li>
                  <li>• JAX</li>
                </ul>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">LLMs</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• LLaMA 2/3</li>
                  <li>• Mistral</li>
                  <li>• GPT-J</li>
                  <li>• Falcon</li>
                </ul>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">MLOps</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• MLflow</li>
                  <li>• Kubeflow</li>
                  <li>• Weights & Biases</li>
                  <li>• Ray</li>
                </ul>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">Data Science</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• Jupyter</li>
                  <li>• scikit-learn</li>
                  <li>• Pandas</li>
                  <li>• Dask</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Casos de uso */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Casos de Uso</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Procesamiento de Lenguaje Natural",
                  desc: "Chatbots, análisis de sentimientos, traducción automática",
                },
                {
                  title: "Computer Vision",
                  desc: "Detección de objetos, reconocimiento facial, análisis de imágenes médicas",
                },
                { title: "Modelos Generativos", desc: "Generación de texto, imágenes, código y contenido multimedia" },
                {
                  title: "Análisis Predictivo",
                  desc: "Predicción de demanda, detección de fraude, mantenimiento predictivo",
                },
              ].map((useCase, i) => (
                <div key={i} className="bg-[#1a1f2e] border border-slate-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{useCase.title}</h3>
                  <p className="text-slate-400">{useCase.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-500 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Precios Competitivos para GPU Computing</h2>
            <p className="text-slate-300 mb-6">
              Pague solo por el tiempo de GPU que utiliza, sin compromisos a largo plazo
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-[#0a0e1a] rounded-lg p-4 min-w-[200px]">
                <p className="text-slate-400 text-sm">NVIDIA A100 40GB</p>
                <p className="text-3xl font-bold text-cyan-400">
                  $2.50<span className="text-lg text-slate-400">/hora</span>
                </p>
              </div>
              <div className="bg-[#0a0e1a] rounded-lg p-4 min-w-[200px]">
                <p className="text-slate-400 text-sm">NVIDIA H100 80GB</p>
                <p className="text-3xl font-bold text-cyan-400">
                  $4.80<span className="text-lg text-slate-400">/hora</span>
                </p>
              </div>
            </div>
            <button className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Comenzar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
