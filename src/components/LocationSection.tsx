'use client';

import React from 'react';
import { MapPin, ExternalLink, Clock, ArrowRight } from 'lucide-react';

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
            Localização & Acessos Diretos
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d382c] tracking-tight">
            Morada Exata & Centralidade no Troviscal
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#0d382c]/80 max-w-xl mx-auto">
            Tranquilidade com proximidade imediata a todos os serviços essenciais e vias rápidas.
          </p>
        </div>

        {/* Coordenadas & Distâncias Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Distances */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Exact GPS Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#0d382c]/15 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-9 w-9 rounded-full bg-emerald-100 text-[#0d382c] flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-[#0f4c3a]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#0f4c3a] tracking-wider block">
                    Coordenadas GPS Oficiais
                  </span>
                  <strong className="text-sm sm:text-base text-[#0d382c]">
                    40.4858420, -8.5488579
                  </strong>
                </div>
              </div>

              <p className="text-xs text-[#0d382c]/75 mb-3">
                Troviscal, Oliveira do Bairro (Distrito de Aveiro). Arruamento pavimentado com água, luz e fibra óptica na via.
              </p>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#0f4c3a] hover:bg-[#135d46] transition-all shadow-sm"
              >
                <span>Abrir no Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Distances Cards in 2 columns */}
            <div className="grid grid-cols-2 gap-2.5">
              {distances.map((d, i) => (
                <div key={i} className="p-3 rounded-xl bg-white border border-[#0d382c]/10 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs font-black text-[#0f4c3a]">
                    <Clock className="h-3.5 w-3.5 text-[#dfb15b]" />
                    <span>{d.time}</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#0d382c] mt-1 leading-snug">
                    {d.label}
                  </h4>
                  <p className="text-[10px] text-[#0d382c]/65 mt-0.5 line-clamp-1">
                    {d.note}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Google Maps Interactive Embed */}
          <div className="lg:col-span-7">
            <div className="w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border border-[#0d382c]/15 shadow-md relative">
              <iframe
                title="Localização do Terreno no Google Maps"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://maps.google.com/maps?q=40.485842,-8.548858&t=&z=15&ie=UTF8&iwloc=&output=embed"
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
