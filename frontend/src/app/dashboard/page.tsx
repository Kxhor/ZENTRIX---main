'use client';
import { useEffect, useState, useRef } from 'react';

export default function Dashboard() {
  const [score, setScore] = useState(100);
  const [detections, setDetections] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [approvedReports, setApprovedReports] = useState<Set<string>>(new Set());

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws');
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'score_update') setScore(data.score);
      if (data.type === 'clear_detections') {
          setDetections([]);
          setReports([]);
          setScore(100);
      }
      if (data.type === 'new_detection') setDetections(prev => [data.data, ...prev]);
      if (data.type === 'new_report') setReports(prev => [data, ...prev]);
    };

    socket.onerror = () => {
      console.warn("WS disconnected.");
    };

    wsRef.current = socket;
    return () => socket.close();
  }, []);

  const triggerSimulation = async () => {
    setIsAuditing(true);
    try {
      await fetch('http://localhost:8000/simulate_drift', { method: 'POST' });
    } catch {
      console.error("Backend unreachable");
    } finally {
      setTimeout(() => setIsAuditing(false), 2000);
    }
  };

  const handleApprove = (id: string) => {
    setApprovedReports(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  // Keep gauge logic bright
  const gaugeColor = score > 90 ? '#10b981' : score > 75 ? '#f59e0b' : '#ef4444';
  const circleCircumference = 2 * Math.PI * 130; 
  const strokeDashoffset = circleCircumference - (Math.max(0, score) / 100) * circleCircumference;

  return (
    <div className="grid grid-cols-12 gap-8 relative mt-4">
      <div className="col-span-12 lg:col-span-8 space-y-8">
        
        {/* Top KPI Widget Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-1 bg-gradient-to-b from-[#1e293b]/90 to-[#0f172a]/90 border border-slate-600/50 rounded-2xl p-6 relative overflow-hidden backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center min-h-[320px]">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none"></div>
             <h2 className="text-slate-300 font-bold text-base absolute top-6 left-6 uppercase tracking-widest shadow-sm">Integrity Pulse</h2>
             
             <div className="relative w-72 h-72 flex items-center justify-center mt-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="144" cy="144" r="130" stroke="rgba(255,255,255,0.05)" strokeWidth="16" fill="none" />
                  <circle 
                    cx="144" cy="144" r="130" 
                    stroke={gaugeColor} 
                    strokeWidth="16" 
                    fill="none" 
                    strokeDasharray={circleCircumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000 ease-out"
                    style={{ filter: `drop-shadow(0 0 20px ${gaugeColor}80)` }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[5.5rem] leading-none font-black tabular-nums tracking-tighter" style={{ color: gaugeColor, textShadow: `0 0 30px ${gaugeColor}60` }}>
                     {Math.max(0, score)}<span className="text-4xl font-bold opacity-60">%</span>
                  </span>
                  <span className="text-sm font-bold text-slate-400 tracking-widest mt-3 uppercase">Global Score</span>
                </div>
             </div>
          </div>

          <div className="col-span-1 md:col-span-2 grid grid-rows-2 gap-6">
            <div className="bg-gradient-to-r from-red-950/60 to-[#1e293b]/80 border-2 border-red-500/40 rounded-2xl p-6 relative flex items-center shadow-[0_10px_30px_rgba(239,68,68,0.15)] group">
              <div>
                <div className="flex items-center space-x-3 text-red-400 mb-3 font-bold uppercase tracking-wider text-sm">
                  <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444] animate-ping"></div>
                  <span>Critical Setup Mandate</span>
                </div>
                <h3 className="text-3xl font-black text-white mb-2 tracking-tight">March 31st Net Worth Target</h3>
                <p className="text-slate-300 text-base leading-relaxed">72 Hours remaining to meet the strict ₹25 Crore base limits set by the RBI. License revocation impending if deficit not cleared.</p>
              </div>
              <div className="ml-auto text-right pl-6">
                 <div className="text-5xl font-black text-red-500 animate-pulse bg-red-500/10 px-6 py-4 rounded-xl border border-red-500/30 font-mono tracking-widest" style={{ textShadow: "0 0 20px rgba(239,68,68,0.5)"}}>
                    72:14:59
                 </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/40 to-[#1e293b]/60 border border-blue-500/30 rounded-2xl p-6 relative flex items-center shadow-lg transition-transform hover:scale-[1.02]">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-6 shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-blue-400/50">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-100 mb-1">April 1st 2FA Enforcement</h3>
                <p className="text-slate-300 text-base">Enabling predictive detection of strict 2-factor authentication vectors for Txns scheduled past deadline.</p>
              </div>
              <div className="ml-auto flex items-center pl-6">
                 <span className="px-5 py-2 bg-blue-500/20 text-blue-300 text-sm font-bold uppercase tracking-widest rounded-lg border border-blue-500/40">Pending Override</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real Time Drift Feed */}
        <div className="bg-[#1e293b]/80 border border-slate-600/60 rounded-2xl p-8 backdrop-blur-xl min-h-[600px] flex flex-col shadow-2xl">
           <div className="flex justify-between items-end mb-8 border-b-2 border-white/10 pb-6">
              <div>
                <h2 className="text-3xl font-black text-white flex items-center">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 mr-4 shadow-[0_0_15px_#10b981] animate-pulse"></span> 
                  Real-Time Drift Feed
                </h2>
                <p className="text-base text-slate-400 mt-2 font-medium">Scanning live database schemas mapped against the comprehensive RBI 207-rule Rulebook.</p>
              </div>
              <button 
                onClick={triggerSimulation} 
                disabled={isAuditing}
                className="text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 border border-blue-400/50 px-8 py-4 rounded-xl text-white font-bold shadow-[0_0_20px_rgba(37,99,235,0.6)] transition-all flex items-center space-x-3 transform hover:-translate-y-1"
              >
                 {isAuditing ? (
                   <>
                     <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                     <span>Syncing Supabase Engine...</span>
                   </>
                 ) : (
                   <>
                     <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                     <span>Run Live DB Audit</span>
                   </>
                 )}
              </button>
           </div>
           
           <div className="flex-1 space-y-6 overflow-y-auto pr-4 custom-scrollbar">
              {detections.length === 0 && !isAuditing ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-500 pt-20">
                   <svg className="w-24 h-24 text-slate-700 mb-6 drop-shadow-xl" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                   <span className="text-2xl font-bold text-slate-400">System State is Optimal</span>
                   <p className="text-lg mt-3 text-slate-500">Press the <span className="text-blue-400 font-semibold px-1">Run Live DB Audit</span> button to cross-check constraints across Merchants, Escrow, and Transactions.</p>
                </div>
              ) : (
                detections.map((d, i) => (
                  <div key={i} className="bg-[#0b0f19] border-2 border-slate-700/80 p-6 rounded-2xl shadow-[0_5px_20px_rgba(0,0,0,0.5)] relative flex flex-col gap-4 group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-red-600 to-amber-500 rounded-l-xl"></div>
                    
                    <div className="flex justify-between items-start pl-3">
                      <div className="flex items-center space-x-4">
                        <span className="px-4 py-1.5 bg-red-500/20 text-red-400 font-mono font-black text-lg rounded-md border border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                          {d.rule_code}
                        </span>
                        <span className="text-sm text-slate-300 font-semibold px-3 py-1 bg-slate-800 rounded-md border border-slate-600">
                          {d.source_document || 'Compliance Mandate'}
                        </span>
                      </div>
                      <div className="text-right px-4 py-2 bg-red-950/40 rounded-lg border border-red-900/50">
                         <span className="text-xs text-red-300 font-bold uppercase tracking-widest block mb-1 opacity-80">Gauge Impact</span>
                         <span className="text-red-500 font-black text-2xl" style={{ textShadow: "0 0 15px rgba(239,68,68,0.6)"}}>-{d.severity}%</span>
                      </div>
                    </div>
                    
                    <div className="pl-3 mt-1">
                      <h4 className="text-white font-black text-2xl mb-2 flex items-center tracking-wide">
                        <svg className="w-6 h-6 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                        What Went Wrong?
                      </h4>
                      <p className="text-slate-200 text-lg leading-relaxed font-medium">{d.description}</p>
                    </div>

                    <div className="pl-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        <div className="bg-[#1e293b]/60 border border-slate-500 p-5 rounded-xl flex flex-col justify-center shadow-inner">
                          <span className="block text-sm text-slate-300 mb-2 uppercase font-black tracking-widest">Evidence Found</span>
                          <span className="font-mono text-lg text-white font-bold">{d.failed_value}</span>
                          <span className="block font-mono text-sm text-slate-400 mt-2 p-2 bg-black/50 rounded-md border border-white/10">{d.evidence}</span>
                        </div>
                        
                        <div className="bg-red-950/40 border-2 border-red-700/60 p-5 rounded-xl flex flex-col justify-center shadow-[0_0_15px_rgba(220,38,38,0.15)]">
                          <span className="block text-sm text-red-400 mb-2 uppercase font-black tracking-widest">Calculated Penalty Ratio</span>
                          <span className="text-lg text-red-100 font-black leading-snug tracking-wide">{d.company_penalty || "Severe Legal Breach Warning"}</span>
                        </div>

                        <div className="bg-blue-900/40 border-2 border-blue-500/60 p-5 rounded-xl flex flex-col justify-center shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                          <span className="block text-sm text-blue-300 mb-2 uppercase font-black tracking-widest">Mandatory Action</span>
                          <span className="font-mono text-xl font-black text-blue-200 tracking-wider" style={{ textShadow: "0 0 15px rgba(147,197,253,0.5)"}}>{d.action || 'ESCALATE_IMMEDIATELY'}</span>
                        </div>
                    </div>
                  </div>
                ))
              )}
           </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4 bg-[#111827]/90 border-l border-white/10 border-t border-r rounded-t-2xl lg:rounded-t-none lg:border-t-0 p-8 flex flex-col shadow-2xl">
          <div className="mb-8 border-b-2 border-white/10 pb-6">
            <h2 className="text-2xl font-black text-slate-100 flex items-center tracking-tight">
              <svg className="w-7 h-7 text-indigo-400 mr-3 drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Auto-Drafted Reports
            </h2>
            <p className="text-base text-slate-400 mt-2 font-medium">Action Agent formatting detections into strict RBI submission forms.</p>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto pr-4 custom-scrollbar">
            {reports.length === 0 ? (
               <div className="flex flex-col items-center text-center text-slate-500 mt-20">
                 <svg className="w-16 h-16 text-slate-700/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                 <span className="text-base font-medium">Vault is currently empty.</span>
                 <p className="text-sm mt-1">Incident logs will queue here automatically upon audit sweeps.</p>
               </div>
            ) : (
               reports.map((r, i) => {
                 const isApproved = approvedReports.has(r.report_id);
                 return (
                   <div key={i} className={`bg-[#0f172a] border-2 p-6 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 relative ${isApproved ? 'border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-indigo-500/40 hover:border-indigo-500/80 shadow-[0_0_20px_rgba(99,102,241,0.1)] hover:-translate-y-1'}`}>
                      
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-sm font-black text-indigo-400 tracking-widest uppercase">Official RBI Log</div>
                        <div className="bg-slate-800 border border-slate-600 text-slate-300 px-3 py-1 text-xs rounded-lg font-mono font-bold tracking-widest shadow-inner">{r.report_id}</div>
                      </div>

                      <div className="text-sm bg-black/60 text-slate-300 p-5 rounded-xl font-mono whitespace-pre-wrap leading-relaxed border border-slate-700/50 mb-6 max-h-[300px] overflow-y-auto shadow-inner custom-scrollbar">
                        {r.content}
                      </div>

                      <div className="mt-auto">
                         {isApproved ? (
                           <button disabled className="w-full py-4 bg-emerald-500/10 text-emerald-400 border-2 border-emerald-500/40 rounded-xl font-bold text-base tracking-wide flex justify-center items-center space-x-3 transition-all">
                             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                             <span>Approved & Sent to RBI</span>
                           </button>
                         ) : (
                           <button 
                             onClick={() => handleApprove(r.report_id)}
                             className="w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white border border-indigo-400 rounded-xl font-bold text-base tracking-wide transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] flex justify-center items-center space-x-3 group"
                           >
                             <svg className="w-6 h-6 text-indigo-200 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                             <span>Approve & Finalize Submission</span>
                           </button>
                         )}
                      </div>
                   </div>
                 );
               })
            )}
          </div>
      </div>
    </div>
  );
}
