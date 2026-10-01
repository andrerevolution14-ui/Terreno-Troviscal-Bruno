'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function CalculatorSection() {
  const [profile, setProfile] = useState<'familia' | 'investidor'>('familia');
  
  // Investor state
  const [units, setUnits] = useState<number>(3);
  const salePricePerHouse = 210000;

  // Family state
  const [houseArea, setHouseArea] = useState<number>(140);
  const costPerM2 = 950; // Baixo fixo desde o início

  const landCost = 50000;
  
  // Investor calculations
  const landPerUnit = Math.round(landCost / units);
  const frontagePerUnit = (38 / units).toFixed(1);
  const areaPerUnit = (1474.5 / units).toFixed(0);
  const totalRevenue = units * salePricePerHouse;

  // Family calculations
  const constructionTotal = houseArea * costPerM2;
  const totalFamilyInvestment = landCost + constructionTotal;
  const gardenRemaining = (1474.5 - houseArea).toFixed(0);

  const scrollToForm = () => {
    const el = document.getElementById('formulario');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="calculadora" className="py-12 sm:py-16 bg-[#f8faf8] text-[#0d382c] border-b border-[#e2ece6]">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[11px] uppercase tracking-wider text-[#0f4c3a] font-bold block mb-1">
            Simulador de Viabilidade
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d382c] tracking-tight">
            Simulação com Valores Otimizados
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#0d382c]/80">
            Estimativa com base no terreno a 50.000€ e custos de obra económicos (~{costPerM2}€/m²).
          </p>
        </div>

        {/* Switcher */}
        <div className="flex justify-center mb-8">
          <div className="p-1 rounded-full bg-[#e2ece6] border border-[#0d382c]/15 flex gap-1">
            <button
              onClick={() => setProfile('familia')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                profile === 'familia'
                  ? 'bg-[#0f4c3a] text-white shadow-sm'
                  : 'text-[#0d382c]/75 hover:text-[#0d382c]'
              }`}
            >
              Moradia Familiar
            </button>
            <button
              onClick={() => setProfile('investidor')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                profile === 'investidor'
                  ? 'bg-[#0f4c3a] text-white shadow-sm'
                  : 'text-[#0d382c]/75 hover:text-[#0d382c]'
              }`}
            >
              Investidor (3-4 Moradias)
            </button>
          </div>
        </div>

        {profile === 'familia' ? (
          /* FAMÍLIA */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Input */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#0d382c]/10 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#0d382c] mb-4">
                  Área da Sua Moradia
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span>Área de Construção:</span>
                      <span className="text-[#0f4c3a] text-sm">{houseArea} m²</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="240"
                      step="10"
                      value={houseArea}
                      onChange={(e) => setHouseArea(Number(e.target.value))}
                      className="w-full accent-[#0f4c3a] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#0d382c]/60 mt-1">
                      <span>100 m² (Económica)</span>
                      <span>160 m² (T3/T4)</span>
                      <span>240 m² (Ampla)</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#f8faf8] border border-[#0d382c]/10 text-xs text-[#0d382c]/85 space-y-1">
                    <div>• Custo de construção base: <strong>{costPerM2} €/m²</strong> (otimizado)</div>
                    <div>• Terreno livre para jardim e piscina: <strong>~{gardenRemaining} m²</strong></div>
                    <div>• Benefício fiscal: <strong>IVA a 6%</strong> na habitação própria</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#0d382c]/10 text-xs text-[#0d382c]/70">
                Terreno: <strong>50.000€ (Negociável)</strong>
              </div>
            </div>

            {/* Resultado */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#0f4c3a] to-[#125843] text-white border border-emerald-400/30 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#dfb15b] font-bold">
                  Investimento Global Estimado
                </span>
                <div className="text-2xl sm:text-3xl font-black text-[#edd085] mt-1">
                  {totalFamilyInvestment.toLocaleString('pt-PT')} €
                </div>
                <p className="text-xs text-slate-200 mt-1">
                  Inclui terreno de 1.474,50 m² + moradia nova de {houseArea} m².
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#0b3327]/80 border border-emerald-400/20">
                    <span className="text-[10px] text-emerald-200 block">Terreno</span>
                    <strong className="text-white text-sm">50.000 €</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0b3327]/80 border border-emerald-400/20">
                    <span className="text-[10px] text-emerald-200 block">Obra Estimada</span>
                    <strong className="text-white text-sm">{constructionTotal.toLocaleString('pt-PT')} €</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={scrollToForm}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider gold-btn shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Quero ser contactado</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* INVESTIDOR */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Input */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#0d382c]/10 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#0d382c] mb-4">
                  Número de Moradias
                </h3>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setUnits(3)}
                    className={`p-3 rounded-xl text-center border text-xs font-bold transition-all cursor-pointer ${
                      units === 3
                        ? 'bg-[#0f4c3a] text-white border-[#0f4c3a]'
                        : 'bg-[#f8faf8] text-[#0d382c] border-[#0d382c]/15'
                    }`}
                  >
                    3 Moradias
                    <span className="block text-[10px] font-normal opacity-85">12,6m frente cada</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUnits(4)}
                    className={`p-3 rounded-xl text-center border text-xs font-bold transition-all cursor-pointer ${
                      units === 4
                        ? 'bg-[#0f4c3a] text-white border-[#0f4c3a]'
                        : 'bg-[#f8faf8] text-[#0d382c] border-[#0d382c]/15'
                    }`}
                  >
                    4 Moradias
                    <span className="block text-[10px] font-normal opacity-85">9,5m frente cada</span>
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-[#f8faf8] border border-[#0d382c]/10 text-xs text-[#0d382c]/85 space-y-1">
                  <div>• Custo de solo por moradia: <strong>{landPerUnit.toLocaleString('pt-PT')} €</strong></div>
                  <div>• Frente autónoma por casa: <strong>{frontagePerUnit} m</strong></div>
                  <div>• Terreno por habitação: <strong>{areaPerUnit} m²</strong></div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#0d382c]/10 text-xs text-[#0d382c]/70">
                Terreno Total: <strong>50.000€ (Negociável)</strong>
              </div>
            </div>

            {/* Resultado */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#0f4c3a] to-[#125843] text-white border border-emerald-400/30 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#dfb15b] font-bold">
                  Faturação Projetada ({units} Moradias)
                </span>
                <div className="text-2xl sm:text-3xl font-black text-[#edd085] mt-1">
                  {totalRevenue.toLocaleString('pt-PT')} €
                </div>
                <p className="text-xs text-slate-200 mt-1">
                  Estimativa de venda a partir de {salePricePerHouse.toLocaleString('pt-PT')}€ por moradia nova.
                </p>

                <div className="mt-4 p-3 rounded-lg bg-[#0b3327]/80 border border-emerald-400/20 text-xs text-emerald-100">
                  Alta liquidez na região devido à escassez de moradias novas e proximidade ao novo nó da A1.
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={scrollToForm}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider gold-btn shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Quero ser contactado</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
