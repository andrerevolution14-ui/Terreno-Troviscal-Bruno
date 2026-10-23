'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Conteúdo a fornecer pelo proprietário. Enquanto estiverem vazios, as frases correspondentes
 * não são apresentadas (não são inventadas informações).
 */
// Fonte da classificação urbanística, ex: 'PDM de Oliveira do Bairro, planta de ordenamento, art. X' ou 'PIP n.º X/2025'.
const FONTE_URBANISTICA = '';
// Estado atual do loteamento/destaque do terreno.
const ESTADO_LOTEAMENTO = '';

const fonte = FONTE_URBANISTICA ? ` (Fonte: ${FONTE_URBANISTICA}.)` : '';
const estadoLoteamento = ESTADO_LOTEAMENTO ? ` ${ESTADO_LOTEAMENTO}` : '';

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
    question: "O terreno permite construir? Qual a área de implantação estimada?",
    answer: `O terreno poderá permitir construção com uma estimativa efetuada para a área de implantação de cerca de 900 m², tendo que ser confirmada junto à Câmara Municipal de Oliveira do Bairro. Qualquer projeto carece de apreciação e licenciamento municipal, e a viabilidade final só fica confirmada pela autarquia.${fonte}`,
    note: "A estimativa efetuada de implantação de ~900 m² deve ser confirmada junto dos serviços municipais."
  },
  {
    id: "02",
    category: "Infraestruturas",
    question: "Existem redes de água, luz e saneamento?",
    answer: "As infraestruturas existentes na estrada confinante com a frente de 38 metros deverão permitir a ligação de ramais. A disponibilidade, as condições e os custos de ligação devem ser confirmados junto das entidades gestoras de cada rede.",
    note: "Os custos de ligação dependem das condições de cada entidade gestora."
  },
  {
    id: "03",
    category: "Prazos Camarários",
    question: "Quanto tempo demoram as aprovações na Câmara?",
    answer: "Os prazos variam consoante o tipo de projeto e a instrução do processo. Como referência indicativa, a apreciação e a emissão de licença podem situar-se entre 3 e 6 meses para projetos devidamente instruídos, sem garantia de prazo.",
    note: "Prazo indicativo, sujeito à análise dos serviços municipais."
  },
  {
    id: "04",
    category: "Localização",
    question: "Quais são as acessibilidades e serviços próximos?",
    answer: "O terreno fica no Troviscal, perto do centro de Oliveira do Bairro (cerca de 2 minutos), de escolas e de supermercados. Aveiro fica a 15-20 minutos e Coimbra a 25-30 minutos, em condições normais de trânsito.",
    note: "Tempos aproximados de deslocação de carro."
  },
  {
    id: "05",
    category: "Preço & Condições",
    question: "O valor de 50.000 € é negociável?",
    answer: "O preço pedido é de 50.000 € e é negociável, conforme as condições de compra e o prazo de fecho. A situação registral e a documentação do terreno podem ser analisadas em visita ou por contacto direto.",
    note: "Cerca de 33,9 €/m² para 1.474,50 m² com 38 m de frente."
  },
  {
    id: "06",
    category: "Divisão do Terreno",
    question: "Posso dividir o terreno em vários lotes?",
    answer: `Depende das regras do PDM e pode exigir operação de loteamento.${estadoLoteamento}`,
    note: "A divisão em lotes está sujeita a apreciação e aprovação municipal."
  }
];

export default function ObjectionsSection() {

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
            Esclarecimentos sobre o PDM, infraestruturas e prazos de aprovação.
          </p>
        </div>

        {/* Lista de perguntas com respostas sempre visíveis */}
        <div className="space-y-3">
          {faqs.map((faq) => (
            <article
              key={faq.id}
              className="rounded-xl bg-[#0b3327]/80 border border-emerald-400/20 overflow-hidden shadow-sm p-4 sm:p-5"
            >
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold text-[#dfb15b] mt-1">{faq.id}</span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#dfb15b] font-bold block">
                    {faq.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-emerald-50 leading-relaxed">
                    {faq.answer}
                  </p>
                  <p className="mt-2 text-[11px] text-[#a7f3d0]">
                    {faq.note}
                  </p>
                </div>
              </div>
            </article>
          ))}
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
