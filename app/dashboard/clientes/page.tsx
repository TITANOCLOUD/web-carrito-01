export default function ClientesPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Nuestros Clientes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Client cards will be dynamically generated */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="h-16 bg-slate-800 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-slate-500">Logo Cliente</span>
          </div>
          <h3 className="text-white font-medium mb-2">Cliente Name</h3>
          <p className="text-slate-400 text-sm italic">"Testimonio del cliente sobre nuestros servicios..."</p>
        </div>
      </div>
    </div>
  )
}
