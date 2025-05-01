import React from 'react';
import { ChefHat, ClipboardList, LayoutGrid, Menu, PlusCircle } from 'lucide-react';

function Dashboard() {
  return (
    <div className="flex h-screen bg-[url('https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=3540')] bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-black/60 before:to-black/40 relative">
      {/* Main  */}
      <div className="flex-1 p-8 relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/20">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            Sushify
            <span className="block text-sm font-normal text-white/80 mt-1">
              La tua gestione, Semplice e Gustosa!
            </span>
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/15 transition-all border border-white/10 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Ordini Attivi</h3>
              <span className="text-2xl font-bold text-red-400">12</span>
            </div>
            <p className="text-white/70">Ordini in preparazione</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/15 transition-all border border-white/10 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Tavoli Occupati</h3>
              <span className="text-2xl font-bold text-red-400">8/20</span>
            </div>
            <p className="text-white/70">Stato dei tavoli</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/15 transition-all border border-white/10 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Dispositivi</h3>
              <span className="text-2xl font-bold text-red-400">8</span>
            </div>
            <p className="text-white/70">Tablet attivi</p>
          </div>
        </div>

        {/* ORDINI */}
        <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-red-400" />
            Ultimi Ordini
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/70 font-medium">Tavolo</th>
                  <th className="text-left py-3 px-4 text-white/70 font-medium">Ordine</th>
                  <th className="text-left py-3 px-4 text-white/70 font-medium">Stato</th>
                  <th className="text-left py-3 px-4 text-white/70 font-medium">Orario</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-4 text-white">Tavolo 5</td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-white">8 prodotti</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-green-400/10 text-green-400 rounded-full text-sm font-medium">
                      Completato
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white/70">19:30</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-4 text-white">Tavolo 3</td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-white">6 prodotti</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-amber-400/10 text-amber-400 rounded-full text-sm font-medium">
                      In preparazione
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white/70">19:25</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Navbar destra */}
      <nav className="w-72 bg-black/40 backdrop-blur-xl border-l border-white/10 p-6 flex flex-col relative z-10">
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-white rounded-xl hover:bg-white/5 transition-colors">
            <Menu className="w-5 h-5 text-red-400" />
            <span>Modifica Menu</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-white rounded-xl hover:bg-white/5 transition-colors">
            <PlusCircle className="w-5 h-5 text-red-400" />
            <span>Aggiungi Dispositivo</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-white rounded-xl hover:bg-white/5 transition-colors">
            <LayoutGrid className="w-5 h-5 text-red-400" />
            <span>Gestisci Tavoli</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-white rounded-xl hover:bg-white/5 transition-colors">
            <ClipboardList className="w-5 h-5 text-red-400" />
            <span>Ordini</span>
          </button>
        </div>

        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="flex items-center px-4 py-3 bg-white/5 rounded-xl">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-400/20">
              <ChefHat className="w-5 h-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Kamiyama</p>
              <p className="text-xs text-white/60">Online</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Dashboard;