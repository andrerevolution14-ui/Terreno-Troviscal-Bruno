'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById('formulario');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:right-6 z-40 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-300">
      
      {/* Floating CTA Pill — Otimizado Visualmente com Acabamento Premium */}
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full glass-cta transition-all">
        <div className="hidden sm:flex items-center gap-1.5 pl-1 pr-1 border-r border-[#dfb15b]/25">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-bold text-white tracking-tight">Troviscal • 1.474 m²</span>
        </div>

        <button
          onClick={scrollToForm}
          className="px-3.5 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider gold-btn cursor-pointer whitespace-nowrap"
        >
          Quero ser contactado
        </button>

        <button
          onClick={scrollToTop}
          className="h-6 w-6 rounded-full text-emerald-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          title="Voltar ao Topo"
        >
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>

    </div>
  );
}
