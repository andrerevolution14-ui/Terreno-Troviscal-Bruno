'use client';

import React from 'react';
import { Ruler, Maximize2, Layers, Building2, Navigation, Coins, Percent, ArrowRight } from 'lucide-react';

export default function BenefitsSection() {
  const scrollToForm = () => {
    const el = document.getElementById('formulario');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefits = [
    {
      icon: Percent,
      tag: "Fiscalidade",
      title: "IVA a 6% Habitação",
      desc: "Taxa reduzida de IVA para construção de habitação própria, poupando milhares de euros."
    },
    {
      icon: Ruler,
      tag: "Frente 38m",
      title: "Liberdade de Entradas",
      desc: "Portão nobre, garagens sem servidões ou 3-4 acessos autónomos para moradias."
    },
    {
      icon: Maximize2,
      tag: "1.474,50 m²",
      title: "Área Ampla",
      desc: "Espaço generoso para moradia com piscina ou projeto de loteamento."
    },
    {
      icon: Layers,
      tag: "100% Plano",
      title: "Obra mais Económica",
      desc: "Zero custos com muros de suporte ou terraplanagens pesadas."
    },
    {
      icon: Building2,
      tag: "Multi-Habitação",
      title: "3 a 4 Moradias",
      desc: "Solo reduzido a ~12.500€ a 16.600€ por fração habitacional."
    },
    {
      icon: Navigation,
      tag: "Localização",
      title: "2 min do Centro",
      desc: "Oliveira do Bairro a 2 min, nó da A1 a 4 min e Aveiro a 15-20 min."
    }
  ];

  return (
    <section id="vantagens" className="py-12 sm:py-16 bg-[#eef6f2] text-[#0d382c] border-b border-[#d8ebe1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] uppercase tracking-wider text-[#0f4c3a] font-bold block mb-1">
            Vantagens Construtivas & Fiscais
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d382c] tracking-tight">
            Poupança Real em Custos de Obra
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#0d382c]/80 max-w-xl mx-auto">
            Sem custos escondidos: cota plana, redes na estrada e IVA a 6% para habitação própria.
          </p>
        </div>

        {/* Grid de 2 no mobile! 3 no desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-3.5 sm:p-6 rounded-xl border border-[#0d382c]/10 shadow-xs flex flex-col justify-between hover:border-emerald-500/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#0f4c3a] font-bold">
                      {b.tag}
                    </span>
                    <Icon className="h-4 w-4 text-emerald-600" />
                  </div>

                  <h3 className="text-xs sm:text-base font-bold text-[#0d382c] mb-1">
                    {b.title}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-[#0d382c]/75 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <button
            onClick={scrollToForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider gold-btn shadow-md transition-all cursor-pointer"
          >
            <span>Quero ser contactado</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
