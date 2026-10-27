'use client';

import React, { useState, useEffect } from 'react';
import { CalendarCheck, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/analytics';

/**
 * Barra fixa no fundo, visível depois de passar o hero: [Visitar terreno] [WhatsApp].
 */
export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const whatsappUrl = getWhatsAppUrl();

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero');
      const threshold = hero ? hero.getBoundingClientRect().bottom : 600 - window.scrollY;
      setIsVisible(threshold < 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <nav
      aria-label="Ações rápidas"
      className="fixed inset-x-0 bottom-0 z-40 px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-[#062319]/95 backdrop-blur border-t border-[#dfb15b]/30 animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      <div className="max-w-xl mx-auto flex items-center gap-2.5">
        <button
          type="button"
          onClick={scrollToForm}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider gold-btn cursor-pointer whitespace-nowrap"
        >
          <CalendarCheck className="h-4 w-4" aria-hidden="true" />
          <span>Falar com o promotor</span>
        </button>

        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider bg-[#1f9d55] hover:bg-[#188046] text-white transition-colors whitespace-nowrap"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>Falar por WhatsApp</span>
          </a>
        )}
      </div>
    </nav>
  );
}
