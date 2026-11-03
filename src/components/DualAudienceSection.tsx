'use client';

import React from 'react';
import { Home, Building2, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLeadModal } from '@/components/LeadModal';

export default function DualAudienceSection() {
  const { openLeadModal } = useLeadModal();

  return (
    <section id="oportunidade" className="py-12 sm:py-16 bg-[#f8faf8] text-[#0d382c] border-b border-[#e2ece6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header Focado na Família */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] uppercase tracking-wider text-[#0f4c3a] font-bold block mb-1">
            Espaço, Liberdade e Tranquilidade
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d382c] tracking-tight">
            O Local Ideal Para a Sua Casa Familiar
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#0d382c]/80 max-w-xl mx-auto">
            1.474,50 m² planos e 38 metros de frente urbana conferem total liberdade arquitetónica para a sua moradia, com apoio técnico garantido em todo o processo camarário.
          </p>
        </div>

        {/* Cards Grid com Foco Principal na Família */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          
          {/* CARD PRINCIPAL (2 COLUNAS): FAMÍLIA & AUTOCONSTRUÇÃO */}
          <div className="lg:col-span-2 bg-white rounded-2xl border-2 border-[#0f4c3a] p-6 sm:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#0f4c3a] text-white px-4 py-1 rounded-bl-xl text-[10px] font-black uppercase tracking-wider">
              ⭐ Escolha Principal
            </div>

            <div>
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#0d382c]/10">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-emerald-50 border border-emerald-300 text-[#0f4c3a] flex items-center justify-center">
                    <Home className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#0f4c3a] tracking-wider block">
                      Habitação Própria Familiar
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#0d382c]">
                      Moradia Térrea, Jardim & Piscina
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-300/80 mr-2 sm:mr-0">
                  IVA a 6%
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#0d382c]/85 mb-6 leading-relaxed">
                Construa a moradia térrea ou de dois pisos que a sua família sempre desejou. Com 38 metros de frente e topografia perfeitamente plana, tem privacidade total, orientação solar aberta e espaço generoso para piscina, alpendre e jardim.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/70">
                  <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="text-xs text-[#0d382c]">
                    <strong>38 m de frente:</strong> entrada imponente, portão duplo e garagem independente
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/70">
                  <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="text-xs text-[#0d382c]">
                    <strong>Terreno 100% Plano:</strong> poupança imediata em escavações e muros de suporte
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/70">
                  <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="text-xs text-[#0d382c]">
                    <strong>Infraestruturas à porta:</strong> água, eletricidade e saneamento na rua adjacente
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/70">
                  <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="text-xs text-[#0d382c]">
                    <strong>Benefício Fiscal:</strong> IVA reduzido a 6% na construção da habitação própria
                  </span>
                </div>
              </div>

              {/* Box de Apoio Técnico */}
              <div className="p-3.5 rounded-xl bg-[#0f4c3a]/5 border border-[#0f4c3a]/20 flex items-center gap-3 mb-6">
                <ShieldCheck className="h-5 w-5 text-[#0f4c3a] shrink-0" />
                <span className="text-xs text-[#0d382c] font-medium">
                  <strong>Serviço incluído:</strong> Ajudamos na instrução do Pedido de Informação Prévia (PIP) junto da Câmara Municipal para que avance com 100% de segurança.
                </span>
              </div>
            </div>

            <button
              onClick={() => openLeadModal('Verificar disponibilidade · Moradia Familiar')}
              className="w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider gold-btn shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Verificar disponibilidade para moradia familiar</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* CARD SECUNDÁRIO (1 COLUNA): INVESTIDOR / PROMOÇÃO */}
          <div className="bg-white rounded-2xl border border-[#0d382c]/15 p-5 sm:p-6 shadow-sm flex flex-col justify-between hover:border-[#dfb15b] transition-all">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#0d382c]/10">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-200 text-[#b8860b] flex items-center justify-center">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#b8860b] tracking-wider block">
                      Opção Investidor
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#0d382c]">
                      Projeto 3 a 4 Moradias
                    </h3>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-[#b8860b] bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                  Promoção
                </span>
              </div>

              <p className="text-xs text-[#0d382c]/80 mb-4 leading-relaxed">
                Excelente rácio de solo para construtores ou promotores que pretendam desenvolver 3 a 4 moradias no eixo Aveiro - Oliveira do Bairro.
              </p>

              <ul className="space-y-2.5 text-xs text-[#0d382c]/90 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Frente urbana de 38 m:</strong> subdivisão equilibrada para moradias</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Custo de solo:</strong> apenas ~12.500€ a 16.600€ por fogo</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Elevada procura:</strong> escassez de moradias novas a preços acessíveis</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Preço global:</strong> 50.000 € negociável</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => openLeadModal('Informações para Investidor / Construtor')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#0f4c3a] bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Consultar detalhes de promoção</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
