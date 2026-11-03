'use client';

import React from 'react';
import { Sparkles, Compass, Eye, ArrowRight } from 'lucide-react';
import { useLeadModal } from '@/components/LeadModal';

export default function MoradiaExterior360() {
  const { openLeadModal } = useLeadModal();

  return (
    <section id="moradia-360" className="py-12 sm:py-16 bg-[#092c20] text-white border-b border-[#dfb15b]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Cabeçalho de Enquadramento Emocional */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#dfb15b]/20 text-[#dfb15b] border border-[#dfb15b]/40 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Assim pode ficar a sua casa aqui</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Moradia Térrea c/ Jardim & Piscina Privativa
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl mx-auto">
            1.474,50 m² planos e 38 metros de frente dão-lhe espaço total para criar o seu refúgio familiar com privacidade e sol o dia inteiro. Explore o modelo exterior 360° interativo:
          </p>
        </div>

        {/* Card Interativo com o Iframe */}
        <div className="bg-[#051c14] border-2 border-[#dfb15b]/50 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Barra de Controlo Superior */}
          <div className="p-3.5 sm:p-4 bg-[#0a2f23] border-b border-[#dfb15b]/30 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs text-[#a7f3d0] font-semibold">
              <Compass className="h-4 w-4 text-[#dfb15b] animate-spin" style={{ animationDuration: '8s' }} />
              <span>Visita 360° Interativa · Arraste para rodar ou ampliar</span>
            </div>
            
            <button
              onClick={() => openLeadModal('Verificar disponibilidade · Terreno Troviscal')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider gold-btn shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <span>Verificar disponibilidade</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Iframe 360 */}
          <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[600px] bg-black">
            <iframe
              src="https://troviscal-moradia-exterior-360.hugofmarques.chatgpt.site/moradia-l/?panorama=1#principal-esquerda"
              title="Moradia Exterior 360 - Troviscal"
              className="w-full h-full border-none"
              loading="lazy"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Rodapé Informativo do Card */}
          <div className="p-4 bg-[#07241b] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300 text-center sm:text-left">
            <span>
              💡 <strong>Inspiração Arquitetónica:</strong> Sugestão de moradia em L térrea com piscina, perfeitamente implantável nos 1.474,50 m² de terreno plano.
            </span>
            <span className="text-[#a7f3d0] font-semibold shrink-0">
              Apoio técnico no PIP incluído
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}

