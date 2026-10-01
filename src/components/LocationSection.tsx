'use client';

import React from 'react';
import { ExternalLink, Clock, ArrowRight, MapPin } from 'lucide-react';

export default function LocationSection() {
  const googleMapsUrl = "https://www.google.com/maps?q=40.4858420,-8.5488579";

  const scrollToForm = () => {
    const el = document.getElementById('formulario');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const distances = [
    { label: "Centro de Oliveira do Bairro", time: "2 min", note: "Bancos, Serviços, Câmara e Comércio" },
    { label: "Escolas, Farmácia e Saúde", time: "2 min", note: "Tudo à porta para a sua família" },
    { label: "Novo Nó da Autoestrada A1", time: "4 min", note: "Ligação rápida ao eixo nacional" },
    { label: "Aveiro", time: "15-20 min", note: "Universidade, Hospital e Litoral" },
    { label: "Águeda e Zonas Industriais", time: "12 min", note: "Forte polo empresarial e de emprego" },
    { label: "Coimbra", time: "25-30 min", note: "Acesso direto por autoestrada" },
  ];

  return (
    <section id="localizacao" className="py-12 sm:py-16 bg-[#f8faf8] text-[#0d382c] border-b border-[#e2ece6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] uppercase tracking-wider text-[#0f4c3a] font-bold block mb-1">
            Localização & Acessos Diretos • 50.000 € (Negociável)
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d382c] tracking-tight">
            Centralidade e Tranquilidade no Troviscal
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#0d382c]/80 max-w-xl mx-auto">
            A tranquilidade do campo com proximidade imediata a todos os serviços essenciais e vias rápidas.
          </p>
        </div>

        {/* Distâncias e Mapa Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Distances & Quick Google Maps Button */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Quick Location & Direct Link to Maps */}
            <div className="p-4 rounded-2xl bg-white border border-[#0d382c]/15 shadow-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-emerald-100 text-[#0f4c3a] flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0d382c] leading-tight">
                    Troviscal, Oliveira do Bairro
                  </h4>
                  <span className="text-[10px] text-emerald-700 font-semibold block">
                    Distrito de Aveiro • Venda Direta
                  </span>
                </div>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 py-2 px-3 rounded-xl text-[11px] font-bold uppercase tracking-wider text-white bg-[#0f4c3a] hover:bg-[#135d46] transition-all shadow-xs"
              >
                <span>Google Maps</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Distances Cards in 2 columns */}
            <div className="grid grid-cols-2 gap-2.5 flex-1">
              {distances.map((d, i) => (
                <div key={i} className="p-3 rounded-xl bg-white border border-[#0d382c]/10 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-black text-[#0f4c3a]">
                      <Clock className="h-3.5 w-3.5 text-[#dfb15b]" />
                      <span>{d.time}</span>
                    </div>
                    <h4 className="text-xs font-bold text-[#0d382c] mt-1 leading-snug">
                      {d.label}
                    </h4>
                  </div>
                  <p className="text-[10px] text-[#0d382c]/65 mt-1 line-clamp-1">
                    {d.note}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Google Maps Interactive Embed */}
          <div className="lg:col-span-7">
            <div className="w-full h-[320px] sm:h-full min-h-[340px] rounded-2xl overflow-hidden border border-[#0d382c]/15 shadow-md relative">
              <iframe
                title="Localização do Terreno no Google Maps"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://maps.google.com/maps?q=40.485842,-8.5488578&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full filter saturate-[1.1]"
              />
            </div>
          </div>

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
