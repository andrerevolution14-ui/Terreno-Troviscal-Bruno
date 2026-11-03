'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLeadModal } from '@/components/LeadModal';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  highlight?: string;
}

const faqs: FAQItem[] = [
  {
    id: "01",
    category: "Viabilidade Urbanística & PDM",
    question: "O terreno permite construir? Como funciona a aprovação?",
    answer: "Sim, o terreno está integrado em solo urbano com 38 metros de frente para estrada pública pavimentada e infraestruturada. Permite uma generosa implantação para moradia térrea ou de dois pisos, com piscina, anexos e amplo jardim. Para a sua total tranquilidade e comodidade, ajudamos a submeter o Pedido de Informação Prévia (PIP) junto da Câmara Municipal de Oliveira do Bairro.",
    highlight: "Apoio incluído no pedido de informação prévia à Câmara."
  },
  {
    id: "02",
    category: "Infraestruturas",
    question: "Existem redes de água, eletricidade e saneamento?",
    answer: "Sim. Todas as redes públicas fundamentais (eletricidade, água da rede e saneamento) encontram-se instaladas na rua confinante com a frente de 38 metros, permitindo a ligação simples e económica de ramais à sua futura moradia.",
    highlight: "Redes públicas à porta do terreno."
  },
  {
    id: "03",
    category: "Prazos & Simplex",
    question: "Quanto tempo demoram os licenciamentos camarários?",
    answer: "Com as recentes medidas de simplificação administrativa (Simplex Urbanístico) e o apoio técnico na correta instrução das peças, os processos ganharam grande previsibilidade e celeridade, estimando-se habitualmente entre 3 a 6 meses para obtenção das licenças.",
    highlight: "Processo simplificado e ágil."
  },
  {
    id: "04",
    category: "Localização & Dia a Dia",
    question: "Quais são as acessibilidades e serviços próximos?",
    answer: "O terreno situa-se numa zona residencial tranquila no Troviscal, a apenas 2 minutos do centro de Oliveira do Bairro (escolas, hipermercados, serviços de saúde e estação ferroviária). A cidade de Aveiro fica a cerca de 15 a 20 minutos com acessos rápidos pela EN235 e autoestrada.",
    highlight: "A 2 minutos do centro e escolas de Oliveira do Bairro."
  },
  {
    id: "05",
    category: "Condições & Negociação",
    question: "O valor de 50.000 € é negociável?",
    answer: "Sim, o valor de 50.000 € é negociável para venda direta com o proprietário, sem qualquer comissão de intermediação de agências imobiliárias. A documentação matricial e registral está regularizada para celebração segura de CPCV e escritura imediata.",
    highlight: "Venda direta sem intermediários ou comissões adicionais."
  },
  {
    id: "06",
    category: "Benefício Fiscal",
    question: "Como posso usufruir da taxa reduzida de IVA a 6%?",
    answer: "Na construção de moradia para habitação própria e permanente, a legislação portuguesa prevê a aplicação de IVA reduzido a 6% nos contratos de empreitada, o que representa uma poupança financeira substancial para a sua família.",
    highlight: "Poupança direta na fatura de construção."
  }
];

export default function ObjectionsSection() {
  const { openLeadModal } = useLeadModal();

  return (
    <section id="viabilidade" className="py-12 sm:py-16 bg-[#0f4c3a] text-white border-b border-emerald-400/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] uppercase tracking-wider text-[#dfb15b] font-bold block mb-1">
            Transparência & Confiança
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Perguntas Frequentes & Apoio Técnico
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-emerald-100">
            Tudo o que precisa de saber para construir com segurança e tranquilidade.
          </p>
        </div>

        {/* Lista de perguntas com respostas claras */}
        <div className="space-y-3.5">
          {faqs.map((faq) => (
            <article
              key={faq.id}
              className="rounded-2xl border border-emerald-500/30 bg-[#0d382c]/90 p-5 sm:p-6 shadow-sm hover:border-[#dfb15b]/60 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-[#dfb15b] shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#dfb15b]">
                  {faq.category}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2.5">
                {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-3">
                {faq.answer}
              </p>
              {faq.highlight && (
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#a7f3d0] bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-400/30">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#dfb15b]" />
                  <span>{faq.highlight}</span>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* CTA Direto com Abertura de Modal Rápido */}
        <div className="mt-10 text-center flex flex-col items-center gap-2.5">
          <span className="text-[11px] sm:text-xs text-emerald-200 font-medium">
            Tem alguma pergunta específica sobre a sua moradia de sonho?
          </span>
          <button
            onClick={() => openLeadModal('Falar com o Proprietário · Esclarecer Dúvidas')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider gold-btn shadow-lg transition-all cursor-pointer hover:scale-105"
          >
            <span>Falar diretamente com o proprietário</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
