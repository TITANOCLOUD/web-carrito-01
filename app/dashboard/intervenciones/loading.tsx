export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 p-8 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
        <p className="text-slate-400 text-lg">Cargando intervenciones...</p>
      </div>
    </div>
  )
}
