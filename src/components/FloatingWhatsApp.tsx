'use client';

import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import {
  getWhatsAppUrl,
  trackWhatsAppContact,
  WHATSAPP_OBJECTIVES,
  WHATSAPP_NUMBER,
} from '@/lib/analytics';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [selectedObjective, setSelectedObjective] = useState<string>('geral');

  useEffect(() => {
    try {
      if (sessionStorage.getItem('t_wa_bubble_dismissed') === '1') {
        setIsDismissed(true);
        return;
      }
    } catch {}

    // Exibir o balão interativo após 2.4s de permanência na página
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTooltip(false);
    setIsDismissed(true);
    try {
      sessionStorage.setItem('t_wa_bubble_dismissed', '1');
    } catch {}
  };

  const handleOpenObjective = (objectiveKey: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const url = getWhatsAppUrl(objectiveKey);
    trackWhatsAppContact(`flutuante_${objectiveKey}`, {
      channel: 'whatsapp_floating_corner',
      phone: `+${WHATSAPP_NUMBER}`,
      objetivo: objectiveKey,
      property: 'Terreno Troviscal 1.474 m² (50.000 €)',
    });

    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleMainButtonClick = (e: React.MouseEvent) => {
    // Se o balão já estiver aberto, abrir diretamente o WhatsApp com o objetivo atual
    // Se estiver fechado em desktop, pode abrir o WhatsApp direto
    e.preventDefault();
    handleOpenObjective(selectedObjective);
  };

  const mainUrl = getWhatsAppUrl(selectedObjective);

  return (
    <div
      className="fixed right-4 sm:right-6 bottom-20 sm:bottom-6 z-50 flex flex-col items-end select-none pointer-events-auto"
      role="complementary"
      aria-label="Contacto direto via WhatsApp"
    >
      {/* 1. Balão Interativo Aesthetic com os Objetivos da Landing Page */}
      {showTooltip && !isDismissed && (
        <aside
          role="dialog"
          aria-label="Conversar com Bruno sobre o Terreno no Troviscal"
          className="mb-3 w-[calc(100vw-2rem)] max-w-[340px] bg-[#062319]/95 backdrop-blur-xl border border-[#dfb15b]/35 rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.6)] text-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-300 transition-all"
        >
          {/* Header do Balão com Identidade Bruno & Online Status */}
          <div className="bg-gradient-to-r from-[#0d382c] via-[#124b3b] to-[#1f9d55]/30 px-3.5 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#1f9d55] to-[#25D366] flex items-center justify-center font-bold text-white shadow-md text-sm">
                  B
                </div>
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#062319] rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-white">
                  <span>Bruno</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-[#dfb15b]/20 text-[#dfb15b] rounded font-semibold border border-[#dfb15b]/30">
                    Proprietário
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • Responde em minutos</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Fechar balão"
              className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Corpo do Balão com Mensagem de Boas-Vindas */}
          <div className="p-3.5 space-y-3">
            <div className="bg-white/5 rounded-xl p-2.5 text-xs text-slate-200 leading-relaxed border border-white/5">
              <p>
                👋 Olá! Tem interesse no terreno de <strong className="text-[#dfb15b]">1.474 m²</strong> no Troviscal (Oliveira do Bairro)?
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                Escolha o seu objetivo para abrir o WhatsApp com a mensagem ideal:
              </p>
            </div>

            {/* Chips Rápidos de Acordo com os Objetivos da Landing Page */}
            <div className="grid grid-cols-2 gap-1.5">
              {Object.entries(WHATSAPP_OBJECTIVES).map(([key, item]) => {
                const isSelected = selectedObjective === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSelectedObjective(key);
                      handleOpenObjective(key);
                    }}
                    className={`flex items-center gap-1.5 p-2 rounded-lg text-left text-xs font-semibold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#1f9d55] text-white border-[#25D366] shadow-sm'
                        : 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10 hover:border-emerald-500/40'
                    }`}
                  >
                    <span className="text-sm shrink-0" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="truncate text-[11px]">{item.shortTitle}</span>
                  </button>
                );
              })}
            </div>

            {/* Botão de Envio Principal com a Mensagem Geral / Aberta */}
            <a
              href={mainUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleOpenObjective(selectedObjective, e)}
              className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#1f9d55] to-[#25D366] hover:from-[#188046] hover:to-[#1f9d55] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Abrir Conversa no WhatsApp</span>
            </a>

            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Contacto direto: +351 920 601 070</span>
            </div>
          </div>
        </aside>
      )}

      {/* 2. Botão de Ação Flutuante (FAB) Principal */}
      <div className="relative flex items-center group">
        {/* Radar Ring Pulsante */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] wa-radar-ring pointer-events-none"
          aria-hidden="true"
        />

        <a
          href={mainUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleMainButtonClick}
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
              Falar no WhatsApp
            </span>
            <span className="text-[10px] text-emerald-100 flex items-center gap-1 font-semibold opacity-90">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
              <span>Online • Resposta Rápida</span>
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
