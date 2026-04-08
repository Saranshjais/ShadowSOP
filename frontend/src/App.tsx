import React, { useState } from 'react';
import Forge from './components/Forge';
import Vault from './components/Vault';

export const Toaster = ({ message, visible, type = "success" }: { message: string, visible: boolean, type?: "success" | "error" }) => {
  if (!visible) return null;
  const isError = type === "error";
  return (
    <div className={`fixed bottom-4 right-4 text-white px-6 py-3 rounded-xl shadow-2xl font-bold z-50 animate-in slide-in-from-bottom flex items-center gap-2 ${isError ? 'bg-red-600' : 'bg-emerald-600'}`}>
      {isError ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" x2="9" y1="9" y2="15"/><line x1="9" x2="15" y1="9" y2="15"/></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      )}
      {message}
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<"forge" | "vault">("forge");
  const [toastMsg, setToastMsg] = useState({ text: "", type: "success" as "success" | "error" });

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToastMsg({ text: msg, type });
    setTimeout(() => setToastMsg({ text: "", type: "success" }), 4000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <div className="border-b border-zinc-800 bg-zinc-900 px-6 py-3 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight">
            Shadow<span className="text-emerald-500">SOP</span>
          </h1>
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab("forge")}
              className={`px-4 py-1.5 font-mono text-sm rounded ${activeTab === 'forge' ? 'bg-zinc-800 text-emerald-400 border border-zinc-700' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              The Forge
            </button>
            <button 
              onClick={() => setActiveTab("vault")}
              className={`px-4 py-1.5 font-mono text-sm rounded ${activeTab === 'vault' ? 'bg-zinc-800 text-emerald-400 border border-zinc-700' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              The Vault
            </button>
          </div>
        </div>
      </div>

      <main className="p-8 animate-in fade-in duration-300">
        {activeTab === "forge" ? (
          <Forge onSave={() => { showToast("SOP Vaulted Successfully!"); setActiveTab("vault"); }} onError={(msg) => showToast(msg, "error")} />
        ) : (
          <Vault />
        )}
      </main>

      <Toaster message={toastMsg.text} type={toastMsg.type} visible={!!toastMsg.text} />
    </div>
  );
}
