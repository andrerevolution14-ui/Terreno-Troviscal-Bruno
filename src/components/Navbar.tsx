'use client';

import React from 'react';

export default function Navbar() {
  const scrollToForm = () => {
    const el = document.getElementById('formulario');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0d382c]/95 backdrop-blur-md border-b border-[#dfb15b]/20 shadow-md">
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
            <span className="text-[9px] tracking-wider uppercase text-[#dfb15b] font-medium block mt-0.5">
              Oliveira do Bairro
            </span>
          </div>
        </div>

        {/* CTA "Quero ser contactado" — Tamanho reduzido conforme solicitado */}
        <div>
          <button
            onClick={scrollToForm}
            className="px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider gold-btn transition-all duration-200 cursor-pointer"
          >
            Quero ser contactado
          </button>
        </div>

      </div>
    </header>
  );
}
