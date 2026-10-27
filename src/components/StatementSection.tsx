'use client';

import React from 'react';
import Image from 'next/image';

export default function StatementSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-28 lg:py-36 bg-[#062319] text-[#fcf9f2] overflow-hidden border-b border-[#c5a869]/20">
      
      {/* Background with soft atmospheric photo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/tras-direita.png"
          alt="Envolvente natural e arvoredo do terreno no Troviscal"
          fill
          className="object-cover object-center filter brightness-[0.25] saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#062319]/90 via-[#062319]/80 to-[#062319]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
        
        <span className="text-xs uppercase tracking-[0.3em] text-[#c5a869] font-medium block mb-6">
          Oliveira do Bairro • Onde o Futuro se Constrói
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#fcf9f2] leading-[1.2] tracking-tight">
          Onde o Seu Projeto Pode Ganhar Forma <br className="hidden sm:inline" />
          <span className="italic text-[#dfc282]">no Troviscal.</span>
        </h2>

        <div className="editorial-divider" />

        <p className="mt-6 text-sm sm:text-base text-[#d1e0d7] font-light leading-relaxed max-w-2xl mx-auto">
          Um terreno com espaço para viver, crescer ou desenvolver um projeto de moradias, sujeito a validação urbanística.
        </p>

        <div className="mt-10">
          <button
            onClick={() => scrollTo('formulario')}
            className="px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.16em] font-semibold text-[#062319] bg-[#c5a869] hover:bg-[#dfc282] shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            Falar com o promotor
          </button>
        </div>

      </div>
    </section>
  );
}
