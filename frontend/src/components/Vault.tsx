import React, { useEffect, useState } from "react";

export default function Vault() {
  const [sops, setSops] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/sops", {
      headers: { "x-api-key": "dev-test-key-123" }
    })
      .then(r => r.json())
      .then(data => {
        setSops(data);
        setIsLoading(false);
      })
      .catch(console.error);
  }, []);

  if (isLoading) {
    return <div className="text-center font-mono text-zinc-500 mt-20 animate-pulse">Decrypting secure vault...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h2 className="text-2xl font-mono text-zinc-100 mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="9" x2="15" y1="9" y2="9"/><line x1="9" x2="15" y1="15" y2="15"/></svg>
        SOP Library
      </h2>
      
      {sops.length === 0 && (
        <div className="text-center p-12 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/50">
          <p className="text-zinc-500 font-mono">The vault is completely empty.</p>
          <p className="text-zinc-600 text-sm mt-2">Head over to The Forge to compress some chaos.</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sops.map((sop: any) => (
          <div key={sop.id} className="group border border-zinc-800 bg-zinc-900 rounded-xl p-6 shadow-sm hover:border-emerald-500/50 hover:bg-zinc-900/80 transition-all cursor-pointer relative overflow-hidden flex flex-col h-[200px]">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors"></div>
            <h3 className="font-bold text-lg text-emerald-400 mb-2 truncate pr-6">{sop.title}</h3>
            <p className="text-sm text-zinc-400 line-clamp-3 mb-4 flex-1">{sop.description}</p>
            <div className="text-[10px] font-mono text-zinc-600 truncate mt-auto pt-4 border-t border-zinc-800/50 flex justify-between items-center">
              <span>SYS_ID: {sop.id.split('-')[0]}</span>
              <span className="text-emerald-500/50 group-hover:text-emerald-500 flex items-center gap-1">
                Remix <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
