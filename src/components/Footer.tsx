import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#03150e] text-[#d1e0d7] border-t border-[#c5a869]/20 py-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs mb-6">
          
          <div>
            <span className="font-bold text-white text-sm block">
              Terreno Urbano no Troviscal, Oliveira do Bairro
            </span>
            <span className="text-[#a4c5b5] text-[11px] block mt-0.5">
              1.474,50 m² • 38 Metros de Frente • 50.000 € (Negociável)
            </span>
          </div>

          <div className="text-[11px] text-[#a4c5b5]">
            © {new Date().getFullYear()} Terreno Troviscal. Todos os direitos reservados.
          </div>

        </div>

        {/* Nota Legal & Urbanística Consolidada num Único Local */}
        <div className="pt-6 border-t border-white/5 text-[11px] text-[#a4c5b5]/70 leading-relaxed text-center sm:text-left">
          <p>
            <strong>Enquadramento Urbanístico:</strong> Terreno plano integrado em solo urbano segundo o PDM de Oliveira do Bairro, com 38 metros de frente para via pública dotada de infraestruturas. As áreas de implantação e especificações arquitetónicas definitivas estão sujeitas à aprovação do projeto pela Câmara Municipal ou via Pedido de Informação Prévia (PIP), no qual asseguramos total apoio de instrução e acompanhamento técnico ao comprador.
          </p>
        </div>

      </div>
    </footer>
  );
}
