'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl, trackContactClick } from '@/lib/analytics';

/**
 * Botão de WhatsApp com evento Contact no clique.
 * Não é apresentado enquanto NEXT_PUBLIC_WHATSAPP_NUMBER não estiver definido.
 */
export default function WhatsAppButton({
  origem,
  className = '',
}: {
  origem: string;
  className?: string;
}) {
  const url = getWhatsAppUrl();
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackContactClick('whatsapp', origem)}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#1f9d55] hover:bg-[#188046] text-white transition-colors ${className}`}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      <span>Falar com o Dono</span>
    </a>
  );
}
