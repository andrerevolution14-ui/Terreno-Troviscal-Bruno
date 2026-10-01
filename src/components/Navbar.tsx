import React from 'react';

export default function Navbar() {
  return (
    <header className="relative w-full bg-[#0d382c] border-b border-[#dfb15b]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#10b981] to-[#0f4c3a] border border-[#dfb15b]/40 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            T
          </div>
          <div>
            <span className="text-sm sm:text-base font-bold tracking-tight text-white block leading-none">
              Terreno Troviscal
            </span>
            <span className="text-[10px] tracking-wider uppercase text-[#dfb15b] font-bold block mt-0.5">
              Oliveira do Bairro • 50.000 € Negociável
            </span>
          </div>
        </div>

        {/* Informação Rápida à Direita (Sem botão, sem menu pendente) */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-emerald-200/90">
          <span>1.474,50 m²</span>
          <span className="text-[#dfb15b]">•</span>
          <span>38m Frente</span>
          <span className="text-[#dfb15b]">•</span>
          <span>Venda Direta</span>
        </div>

      </div>
    </header>
  );
}
