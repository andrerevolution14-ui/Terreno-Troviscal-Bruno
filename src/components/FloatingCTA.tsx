'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLeadModal } from '@/components/LeadModal';

/**
 * Barra fixa no fundo, visível depois de passar o hero, com uma única CTA que abre o modal rápido.
 */
export default function FloatingCTA() {
  const { openLeadModal } = useLeadModal();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero');
      const form = document.getElementById('formulario');
      const pastHero = hero ? hero.getBoundingClientRect().bottom < 0 : window.scrollY > 600;
      const formInView = form
        ? form.getBoundingClientRect().top < window.innerHeight && form.getBoundingClientRect().bottom > 0
        : false;
      setIsVisible(pastHero && !formInView);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Verificar disponibilidade"
      className="fixed inset-x-0 bottom-0 z-40 px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-[#062319]/95 backdrop-blur border-t border-[#dfb15b]/30 animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      <div className="max-w-md mx-auto flex flex-col items-center gap-1">
        <span className="text-[10px] text-emerald-200/90 font-medium">
          Sem compromisso, resposta rápida.
        </span>
        <button
          type="button"
          onClick={() => openLeadModal('Verificar disponibilidade · Terreno Troviscal')}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider gold-btn cursor-pointer whitespace-nowrap shadow-xl"
        >
          <span>Verificar disponibilidade</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
