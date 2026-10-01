'use client';

import React from 'react';
import Image from 'next/image';
import { Flame, Percent, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const scrollToForm = () => {
    const el = document.getElementById('formulario');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center justify-center text-white py-12 sm:py-16 overflow-hidden">
      
      {/* Imagem de Fundo com Fotografia Real (tras.png) */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/frente.png"
          alt="Vista frontal do terreno no Troviscal com 38 metros de frente urbana"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Gradientes e Sombras Cinematográficas para Legibilidade Perfeita */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d382c]/90 via-[#0a2e24]/70 to-[#0d382c]/95" />
        <div className="absolute inset-0 bg-radial-[at_center] from-transparent via-[#0d382c]/40 to-[#0d382c]/85" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-8 text-center w-full">
        
        {/* Badges de Destaque */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-[#dfb15b] text-[#072218] shadow-md">
            50.000 € • NEGOCIÁVEL
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#dfb15b]/25 text-[#edd085] border border-[#dfb15b]/40 backdrop-blur-md shadow-sm">
            <Flame className="h-3.5 w-3.5 text-[#dfb15b]" />
            7 visitas realizadas este mês
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500/25 text-emerald-200 border border-emerald-400/40 backdrop-blur-md">
            <Percent className="h-3.5 w-3.5 text-emerald-300" />
            IVA a 6% para habitação própria
          </span>
        </div>

        {/* Headline Principal com Sombra Suave para Máxima Nitidez */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
          1.474,50 m² com 38 Metros de Frente no Troviscal
        </h1>
        
        <div className="mt-3 flex flex-wrap items-center justify-center gap-y-1.5 gap-x-3 text-xs sm:text-sm font-semibold text-[#a7f3d0] drop-shadow-sm">
          <span>2 min do centro de Oliveira do Bairro</span>
          <span className="text-[#dfb15b]">•</span>
          <span>Infraestruturas Prontas</span>
          <span className="text-[#dfb15b]">•</span>
          <span>Venda Direta</span>
        </div>

        <p className="mt-2.5 text-xs sm:text-sm text-slate-100 max-w-2xl mx-auto font-normal drop-shadow-sm">
          Terreno 100% plano em área urbana consolidada. Ideal para a sua moradia familiar com piscina ou empreendimento de 3 a 4 moradias.
        </p>

        {/* 4 Cartões Pré-Scroll em Branco Puro com Alto Contraste */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md text-[#0d382c] border border-white text-center shadow-xl transform hover:-translate-y-0.5 transition-transform duration-200">
            <div className="text-[10px] uppercase tracking-wider text-[#0f4c3a] font-bold">Área Total</div>
            <div className="text-lg sm:text-2xl font-black text-[#0d382c] mt-0.5">1.474,50 m²</div>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">Espaço Amplo</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md text-[#0d382c] border border-white text-center shadow-xl transform hover:-translate-y-0.5 transition-transform duration-200">
            <div className="text-[10px] uppercase tracking-wider text-[#0f4c3a] font-bold">Frente Urbana</div>
            <div className="text-lg sm:text-2xl font-black text-[#0d382c] mt-0.5">38 Metros</div>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">Acesso Independente</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md text-[#0d382c] border border-white text-center shadow-xl transform hover:-translate-y-0.5 transition-transform duration-200">
            <div className="text-[10px] uppercase tracking-wider text-[#0f4c3a] font-bold">Topografia</div>
            <div className="text-lg sm:text-2xl font-black text-[#0d382c] mt-0.5">100% Plano</div>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">Zero Muros de Suporte</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md text-[#0d382c] border-2 border-[#dfb15b] text-center shadow-xl transform hover:-translate-y-0.5 transition-transform duration-200 ring-2 ring-[#dfb15b]/25">
            <div className="text-[10px] uppercase tracking-wider text-[#072218] font-extrabold bg-[#dfb15b]/30 rounded-md py-0.5 inline-block px-2">
              Preço de Venda
            </div>
            <div className="text-xl sm:text-3xl font-black text-[#072218] mt-1 tracking-tight">
              50.000 €
            </div>
            <span className="text-[11px] text-[#0f4c3a] font-black uppercase tracking-wider block mt-0.5">
              Negociável
            </span>
          </div>
        </div>

        {/* Botão de Ação Imediato */}
        <div className="mt-8">
          <button
            onClick={scrollToForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider gold-btn shadow-xl transition-all duration-200 cursor-pointer"
          >
            <span>Quero ser contactado</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
