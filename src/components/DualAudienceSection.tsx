'use client';

import React from 'react';
import { Home, Building2, Check, ArrowRight, Sparkles } from 'lucide-react';

export default function DualAudienceSection() {
  const scrollToForm = () => {
    const el = document.getElementById('formulario');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="oportunidade" className="py-12 sm:py-16 bg-[#f8faf8] text-[#0d382c] border-b border-[#e2ece6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] uppercase tracking-wider text-[#0f4c3a] font-bold block mb-1">
            Dois Destinos Possíveis
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d382c] tracking-tight">
            Moradia Familiar de Sonho ou 3 a 4 Moradias
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#0d382c]/80 max-w-xl mx-auto">
            A frente contínua de 38m e os 1.474,50 m² planos adaptam-se com precisão a ambos os perfis.
          </p>
        </div>

        {/* Dual Cards Grid — Mobile Grid 2 Colunas! */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          
          {/* CARD 1: FAMÍLIA */}
          <div className="bg-white rounded-2xl border border-[#0d382c]/10 p-5 sm:p-8 shadow-sm flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#0d382c]/10">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-200 text-[#0f4c3a] flex items-center justify-center">
                    <Home className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#0f4c3a] tracking-wider block">
                      Autoconstrução Familiar
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0d382c]">
                      Moradia Própria & Jardim
                    </h3>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                  IVA a 6%
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#0d382c]/80 mb-5 leading-relaxed">
                Construa a sua moradia térrea ou de 2 pisos com piscina virada a sul e mais de 1.000 m² de quintal privativo sem abrir mão da proximidade a escolas e comércio.
              </p>

              <ul className="space-y-2.5 text-xs text-[#0d382c]/90 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>38m de frente linear:</strong> portão duplo, entrada pedonal e total privacidade</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>100% plano:</strong> poupança comprovada em muros de contenção</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Benefício fiscal direto:</strong> taxa de IVA reduzida a 6% para habitação própria</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Preço de entrada:</strong> 50.000€ (negociável) com escritura imediata</span>
                </li>
              </ul>
            </div>

            <button
              onClick={scrollToForm}
              className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider gold-btn transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Quero ser contactado</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* CARD 2: INVESTIDOR */}
          <div className="bg-white rounded-2xl border border-[#0d382c]/10 p-5 sm:p-8 shadow-sm flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#0d382c]/10">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-200 text-[#0f4c3a] flex items-center justify-center">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#0f4c3a] tracking-wider block">
                      Promoção Imobiliária
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0d382c]">
                      Empreendimento 3 a 4 Moradias
                    </h3>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-[#b8860b] bg-[#dfb15b]/20 px-2.5 py-1 rounded-full">
                  Alto ROI
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#0d382c]/80 mb-5 leading-relaxed">
                Fracionamento em banda ou geminadas com frentes autónomas de 9,5m a 12,6m por habitação, com infraestruturas existentes e excelente ritmo de vendas.
              </p>

              <ul className="space-y-2.5 text-xs text-[#0d382c]/90 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Custo residual do solo:</strong> apenas ~12.500€ a 16.600€ por fração</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Infraestruturas à porta:</strong> água, luz e saneamento na rua adjacente</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Aprovações municipais céleres:</strong> 3 a 6 meses em Oliveira do Bairro</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Escassez no mercado:</strong> forte procura de famílias que trabalham no eixo Aveiro</span>
                </li>
              </ul>
            </div>

            <button
              onClick={scrollToForm}
              className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider gold-btn transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Quero ser contactado</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
