'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSimulateAccess = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0b0f19] to-[#0b0f19] z-0 pointer-events-none" />
      <div className="absolute w-full h-[1px] bg-blue-500/10 top-1/4 left-0 z-0"></div>
      <div className="absolute w-[1px] h-full bg-blue-500/10 left-1/4 top-0 z-0"></div>

      <div className="max-w-md w-full relative z-10 bg-[#111827]/80 backdrop-blur-xl border border-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.1)] rounded-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300 tracking-tight">ReDi 2.0</h1>
          <p className="text-slate-400 text-sm mt-2 text-center">AI-Agentic Regulatory Integrity Platform</p>
          <div className="mt-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium rounded-full tracking-wider">
            RESTRICTED ACCESS
          </div>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1.5 shadow-sm">Corporate Email</label>
            <input 
              type="text" 
              defaultValue="admin@paypal.com"
              readOnly
              className="w-full bg-[#0b0f19] border border-blue-500/30 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1.5 shadow-sm">Security Token (RSA)</label>
            <input 
              type="password" 
              defaultValue="************"
              readOnly
              className="w-full bg-[#0b0f19] border border-blue-500/30 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all tracking-widest"
            />
          </div>

          <button 
            type="button" 
            onClick={handleSimulateAccess}
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 px-4 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center space-x-2"
          >
             {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
             ) : (
                <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Authenticate SSO</span>
                </>
             )}
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#111827] px-2 text-slate-500 uppercase tracking-widest">or</span>
            </div>
          </div>

          <button 
            type="button" 
            onClick={handleSimulateAccess}
            disabled={loading}
            className="w-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 text-slate-200 font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2"
          >
             {loading ? (
                <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
             ) : (
                <>
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <span>Simulate Company Access</span>
                </>
             )}
          </button>
        </form>

      </div>
    </div>
  );
}
