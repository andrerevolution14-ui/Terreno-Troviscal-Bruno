'use client';

import React from 'react';
import {
  getWhatsAppUrl,
  trackWhatsAppContact,
  WHATSAPP_NUMBER,
} from '@/lib/analytics';

export default function FloatingWhatsApp() {
  const whatsappUrl = getWhatsAppUrl();

  const handleClick = () => {
    trackWhatsAppContact('whatsapp_flutuante', {
      channel: 'whatsapp_floating_corner',
      phone: `+${WHATSAPP_NUMBER}`,
      property: 'Terreno Troviscal 1.474 m² (50.000 €)',
    });
  };

  return (
    <div
      className="fixed right-4 sm:right-6 bottom-20 sm:bottom-6 z-50 flex items-center select-none pointer-events-auto"
      role="complementary"
      aria-label="Contacto direto via WhatsApp com o dono"
    >
      <div className="relative flex items-center group">
        {/* Radar Ring Pulsante */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] wa-radar-ring pointer-events-none"
          aria-hidden="true"
        />

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          aria-label="Falar com o dono no WhatsApp"
          className="relative inline-flex items-center gap-2.5 pl-3.5 pr-4 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#1f9d55] via-[#25D366] to-[#128C7E] hover:from-[#188046] hover:via-[#20ba5a] hover:to-[#0f7568] text-white font-bold shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.6)] border border-white/25 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          {/* Ícone Oficial WhatsApp Vetorial SVG */}
          <span className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8">
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 0 1-1.26-4.37c.01-4.54 3.7-8.24 8.25-8.24m-2.83 3.37c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.26s.97 2.62 1.11 2.8c.13.19 1.9 2.9 4.61 4.07.65.28 1.15.45 1.54.57.66.21 1.26.18 1.74.11.53-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33-.28-.14-1.63-.81-1.88-.9-.25-.09-.43-.14-.61.14-.18.27-.7 1.09-.86 1.27-.15.19-.31.21-.58.07-.28-.14-1.16-.43-2.21-1.36-.81-.73-1.36-1.63-1.51-1.9-.16-.28-.02-.43.12-.57.13-.13.29-.34.43-.5.14-.16.18-.27.28-.46.1-.19.05-.35-.02-.49-.07-.14-.62-1.49-.85-2.04-.22-.54-.45-.46-.61-.47h-.57z" />
            </svg>
            <span
              className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full border border-[#062319] animate-pulse"
              aria-hidden="true"
            />
          </span>

          {/* Rótulo de Texto com Design Elegante */}
          <div className="flex flex-col text-left leading-tight">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider drop-shadow-sm">
              Falar com o Dono
            </span>
            <span className="text-[10px] text-emerald-100 flex items-center gap-1 font-semibold opacity-90">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
              <span>WhatsApp • Resposta Rápida</span>
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
