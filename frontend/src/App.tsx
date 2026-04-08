import React, { useState } from 'react';
import Forge from './components/Forge';
import Vault from './components/Vault';

export const Toaster = ({ message, visible }: { message: string, visible: boolean }) => {
  if (!visible) return null;
  return (
    <div className="fixed bottom-4 right-4 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl font-bold z-50 animate-in slide-in-from-bottom">
      {message}
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<"forge" | "vault">("forge");
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
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
          <Forge onSave={() => { showToast("SOP Vaulted Successfully!"); setActiveTab("vault"); }} />
        ) : (
          <Vault />
        )}
      </main>

      <Toaster message={toastMsg} visible={!!toastMsg} />
    </div>
  );
}
