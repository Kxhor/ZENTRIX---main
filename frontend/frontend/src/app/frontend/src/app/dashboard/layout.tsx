export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Top Navbar */}
      <nav className="h-16 border-b border-white/5 bg-[#111827]/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded shrink-0 bg-blue-600 flex items-center justify-center font-bold shadow-[0_0_15px_rgba(37,99,235,0.5)] cursor-default">
            Re
          </div>
          <span className="font-semibold tracking-wide text-lg text-slate-100">
            ReDi <span className="text-blue-400 font-normal opacity-80">2.0</span>
          </span>
          <span className="ml-4 px-2 py-0.5 text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded ml-2">LIVE</span>
        </div>
        <div className="flex items-center space-x-6 text-sm">
          <div className="text-slate-400 flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span>System: <span className="text-blue-200">OPTIMAL</span></span>
          </div>
          <div className="w-px h-6 bg-white/10"></div>
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors">
              <span className="text-xs font-semibold text-white">AD</span>
            </div>
            <span className="text-slate-300 group-hover:text-white transition-colors">Admin Payload</span>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="p-6 max-w-[1600px] mx-auto">
        {children}
      </main>
    </div>
  );
}
