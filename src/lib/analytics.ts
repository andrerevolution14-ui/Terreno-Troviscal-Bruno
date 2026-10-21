/**
 * Telemetria e rastreio de conversões com o Meta Pixel & Conversions API
 * Meta Pixel ID: NEXT_PUBLIC_META_PIXEL_ID (com fallback para o ID público atual)
 */

export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || '979841341182458';

/** Número de WhatsApp em formato internacional, só dígitos (ex: 351912345678). */
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, '');

export const WHATSAPP_MESSAGE =
  'Olá, tenho interesse no terreno do Troviscal (Oliveira do Bairro). Gostaria de mais informações.';

export function getWhatsAppUrl(): string | null {
  if (!WHATSAPP_NUMBER) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

const CONTENT_NAME = 'Terreno Urbano no Troviscal - 1.474,50 m²';

/**
 * Utilitário para ler cookie no browser (ex: _fbp, _fbc)
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return match ? decodeURIComponent(match[3]) : null;
}

/**
 * Gera um ID de evento único para deduplicação entre Pixel (Browser) e CAPI (Servidor)
 */
export function generateEventId(prefix = 'lead'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function safeFbq(...args: unknown[]) {
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq(...args);
    }
  } catch {
    // O tracking nunca deve impedir o funcionamento do site.
  }
}

/** ViewContent: a secção do simulador entra no ecrã. */
export function trackViewContent() {
  safeFbq('track', 'ViewContent', {
    content_name: 'Simulador de Viabilidade',
    content_category: 'Simulador',
  });
}

export interface LeadTrackingParams {
  eventId: string;
  perfil?: string;
  financiamento?: string;
  prazo?: string;
}

/**
 * Evento Lead: só deve ser chamado após envio com sucesso do formulário.
 * O eventID é partilhado com a Conversions API para deduplicação.
 */
export function trackFormSubmissionLead({ eventId, perfil, financiamento, prazo }: LeadTrackingParams) {
  safeFbq(
    'track',
    'Lead',
    {
      content_name: CONTENT_NAME,
      content_category: 'Imobiliário',
      perfil: perfil || 'nao_indicado',
      financiamento: financiamento || 'nao_indicado',
      prazo: prazo || 'nao_indicado',
      value: 50000,
      currency: 'EUR',
    },
    { eventID: eventId }
  );
}

/** Contact: clique em qualquer botão de WhatsApp (ou telefone). */
export function trackContactClick(method: 'whatsapp' | 'phone', origem?: string) {
  safeFbq('track', 'Contact', {
    content_name: method === 'whatsapp' ? 'Clique WhatsApp' : 'Clique Telefone',
    origem: origem || 'desconhecida',
  });
}
