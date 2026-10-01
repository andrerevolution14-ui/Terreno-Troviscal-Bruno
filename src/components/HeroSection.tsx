'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Flame, Percent, Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react';

export default function HeroSection() {
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(1);

  const openModal = () => {
    setIsZoomed(true);
    setScale(1);
  };

  const closeModal = () => {
    setIsZoomed(false);
    setScale(1);
  };

  const zoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.min(prev + 0.3, 2.5));
  };

  const zoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.max(prev - 0.3, 1));
  };

  return (
    <section className="relative bg-gradient-to-b from-[#0d382c] via-[#104435] to-[#0f3d30] text-white pt-6 pb-10 sm:pt-8 sm:pb-14 overflow-hidden">
      
      {/* Light ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.25),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Scarcity & Tax Benefit Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#dfb15b]/20 text-[#edd085] border border-[#dfb15b]/40 shadow-sm">
            <Flame className="h-3.5 w-3.5 text-[#dfb15b]" />
            7 visitas realizadas este mês
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            <Percent className="h-3.5 w-3.5 text-emerald-300" />
            IVA a 6% para construção de habitação própria
          </span>
        </div>

        {/* Clean, Punchy Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            1.474,50 m² com 38 Metros de Frente no Troviscal
          </h1>
          
          <div className="mt-3 flex flex-wrap items-center justify-center gap-y-1.5 gap-x-3 text-xs sm:text-sm font-semibold text-[#a7f3d0]">
            <span>2 min do centro de Oliveira do Bairro</span>
            <span className="text-[#dfb15b]">•</span>
            <span>Infraestruturas Prontas</span>
            <span className="text-[#dfb15b]">•</span>
            <span>Venda Direta</span>
          </div>

          <p className="mt-2 text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto font-light">
            Terreno 100% plano em área urbana consolidada. Ideal para a sua moradia familiar com piscina ou empreendimento de 3 a 4 moradias.
          </p>
        </div>

        {/* Cartões do Pré-Scroll em Branco com Alto Contraste e Vida */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white text-[#0d382c] border border-white/90 text-center shadow-lg transform hover:-translate-y-0.5 transition-transform duration-200">
            <div className="text-[10px] uppercase tracking-wider text-[#0f4c3a] font-bold">Área Total</div>
            <div className="text-lg sm:text-2xl font-black text-[#0d382c] mt-0.5">1.474,50 m²</div>
            <span className="text-[10px] text-emerald-700 font-medium block mt-0.5">Espaço Amplo</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-white text-[#0d382c] border border-white/90 text-center shadow-lg transform hover:-translate-y-0.5 transition-transform duration-200">
            <div className="text-[10px] uppercase tracking-wider text-[#0f4c3a] font-bold">Frente Urbana</div>
            <div className="text-lg sm:text-2xl font-black text-[#0d382c] mt-0.5">38 Metros</div>
            <span className="text-[10px] text-emerald-700 font-medium block mt-0.5">Acesso Independente</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-white text-[#0d382c] border border-white/90 text-center shadow-lg transform hover:-translate-y-0.5 transition-transform duration-200">
            <div className="text-[10px] uppercase tracking-wider text-[#0f4c3a] font-bold">Topografia</div>
            <div className="text-lg sm:text-2xl font-black text-[#0d382c] mt-0.5">100% Plano</div>
            <span className="text-[10px] text-emerald-700 font-medium block mt-0.5">Zero Muros de Suporte</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-white text-[#0d382c] border border-emerald-400/40 text-center shadow-lg transform hover:-translate-y-0.5 transition-transform duration-200">
            <div className="text-[10px] uppercase tracking-wider text-[#0f4c3a] font-bold">Preço de Venda</div>
            <div className="text-lg sm:text-2xl font-black text-[#0d382c] mt-0.5">50.000 €</div>
            <span className="text-[10px] text-[#b8860b] font-bold uppercase tracking-wider block mt-0.5">Negociável</span>
          </div>
        </div>

        {/* Primeira Foto: Exatamente a foto ampla com relvado (tras.png) — SEM botão em cima */}
        <div 
          onClick={openModal}
          className="mt-8 relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/25 group cursor-pointer"
        >
          <Image
            src="/images/tras.png"
            alt="Vista ampla e soalheira do terreno no Troviscal com relvado verdejante e cota plana"
            fill
            priority
            className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-500 ease-out"
          />

          {/* Quick zoom badge on hover */}
          <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize2 className="h-3.5 w-3.5 text-[#dfb15b]" />
            <span>Clique para ampliar & zoom</span>
          </div>
        </div>

      </div>

      {/* Lightbox Modal com Zoom */}
      {isZoomed && (
        <div 
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full h-[90vh] flex flex-col bg-[#072218] rounded-2xl border border-[#dfb15b]/40 overflow-hidden shadow-2xl"
          >
            {/* Modal Controls */}
            <div className="p-3 sm:p-4 bg-[#0d382c] border-b border-[#dfb15b]/20 flex items-center justify-between z-10">
              <span className="text-xs sm:text-sm font-bold text-white">
                Vista Principal do Terreno • Troviscal
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={zoomIn}
                  className="h-8 px-2.5 rounded-lg bg-[#072218] border border-[#dfb15b]/30 text-white hover:bg-[#dfb15b] hover:text-[#072218] transition-colors flex items-center gap-1 text-xs cursor-pointer"
                  title="Aumentar zoom"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Zoom</span>
                </button>
                <button
                  onClick={zoomOut}
                  className="h-8 px-2.5 rounded-lg bg-[#072218] border border-[#dfb15b]/30 text-white hover:bg-[#dfb15b] hover:text-[#072218] transition-colors flex items-center gap-1 text-xs cursor-pointer"
                  title="Diminuir zoom"
                >
                  <ZoomOut className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={closeModal}
                  className="h-8 w-8 rounded-lg bg-[#072218] border border-[#dfb15b]/30 text-white hover:bg-red-600 transition-colors flex items-center justify-center cursor-pointer ml-2"
                  title="Fechar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Modal Image Display */}
            <div className="relative flex-1 w-full bg-black/60 flex items-center justify-center overflow-auto p-2">
              <div 
                className="relative w-full h-full min-h-[350px] transition-transform duration-200 ease-out flex items-center justify-center"
                style={{ transform: `scale(${scale})` }}
              >
                <Image
                  src="/images/tras.png"
                  alt="Vista ampliada com zoom"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
