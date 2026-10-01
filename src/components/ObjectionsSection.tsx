'use client';

import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  note: string;
}

const faqs: FAQItem[] = [
  {
    id: "01",
    category: "Viabilidade Urbanística",
    question: "O terreno permite construir? Como funciona a aprovação?",
    answer: "Sim. O terreno está inserido em Área Edificada Consolidada de acordo com o PDM de Oliveira do Bairro. É necessário submeter projeto de arquitetura, mas existe total facilidade e rapidez de enquadramento devido à maturidade urbana da zona.",
    note: "Facilidade: Inserção consolidada com parâmetros já definidos para moradia isolada ou 3-4 moradias."
  },
  {
    id: "02",
    category: "Infraestruturas",
    question: "Existem redes de água, luz e saneamento?",
    answer: "Sim. Todas as infraestruturas essenciais passam diretamente na estrada confinante com os 38 metros de frente do terreno. A ligação de ramais é simples e rápida.",
    note: "Economia: Sem custos com extensão de postes ou tubagens longas."
  },
  {
    id: "03",
    category: "Prazos Camarários",
    question: "Quanto tempo demoram as aprovações na Câmara?",
    answer: "Os prazos habituais de apreciação e emissão de licença em Oliveira do Bairro situam-se entre 3 a 6 meses para projetos devidamente instruídos.",
    note: "Agilidade: Processo célere face aos grandes centros vizinhos."
  },
  {
    id: "04",
    category: "Localização",
    question: "Quais são as acessibilidades e serviços próximos?",
    answer: "O terreno combina a tranquilidade do Troviscal com a proximidade imediata ao novo nó da A1, escolas e supermercados (2 min do centro). Aveiro fica a 15-20 min e Coimbra a 25-30 min.",
    note: "Conectividade: Acesso rápido e zona em forte valorização."
  },
  {
    id: "05",
    category: "Preço & Condições",
    question: "O valor de 50.000€ é negociável?",
    answer: "Sim, o valor de 50.000€ é negociável para compradores com capacidade de fecho célere. Terreno livre de ónus e pronto para escritura imediata.",
    note: "Oportunidade: Cerca de 33,9€/m² para 1.474,50 m² com 38m de frente."
  }
];

export default function ObjectionsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => setOpenIndex(openIndex === idx ? null : idx);

  const scrollToForm = () => {
    const el = document.getElementById('formulario');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="viabilidade" className="py-12 sm:py-16 bg-[#0f4c3a] text-white border-b border-emerald-400/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] uppercase tracking-wider text-[#dfb15b] font-bold block mb-1">
            Respostas Técnicas
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-emerald-100">
            Esclarecimentos diretos sobre o PDM, infraestruturas e prazos de aprovação (3 a 6 meses).
          </p>
        </div>

        {/* Minimalist Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={faq.id}
                className="rounded-xl bg-[#0b3327]/80 border border-emerald-400/20 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 hover:bg-[#125843]/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#dfb15b]">
                      {faq.id}
                    </span>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#dfb15b] font-bold block">
                        {faq.category}
                      </span>
                      <h3 className="text-xs sm:text-base font-bold text-white mt-0.5">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div className={`h-7 w-7 rounded-full border border-emerald-400/30 flex items-center justify-center shrink-0 text-[#dfb15b] transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#dfb15b] text-[#0b3327]' : ''}`}>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 border-t border-emerald-400/15">
                    <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed">
                      {faq.answer}
                    </p>
                    <div className="mt-2 text-[11px] text-[#a7f3d0]">
                      ✓ {faq.note}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA: "Quero ser contactado" */}
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
