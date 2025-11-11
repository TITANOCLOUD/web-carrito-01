export default function PartnersPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Marcas y Partners</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Partner cards will be dynamically generated */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 text-center">
          <div className="h-24 bg-slate-800 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-slate-500">Logo Partner</span>
          </div>
          <h3 className="text-white font-medium">Partner Name</h3>
        </div>
      </div>
    </div>
  )
}
