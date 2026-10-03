/**
 * Telemetria e rastreio de conversões com o Meta Pixel & Conversions API
 * Meta Pixel ID: 979841341182458
 */

export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || '979841341182458';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

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

/**
 * DISPARO DO OBJETIVO MAIS ALTO: Formulário Preenchido como LEAD no Meta Pixel.
 * Regista o evento padrão "Lead" com valor de 50.000€ (Preço do Terreno) e deduplicação CAPI através de eventID.
 */
export function trackFormSubmissionLead(leadData: {
  nome?: string;
  telefone?: string;
  eventId: string;
}) {
  if (typeof window === 'undefined') return;

  const eventId = leadData.eventId;

  try {
    if (typeof window.fbq === 'function') {
      // Objetivo mais alto no Meta Ads: LEAD (50.000€)
      window.fbq(
        'track',
        'Lead',
        {
          content_name: 'Terreno Urbano no Troviscal - 1.474,50 m²',
          content_category: 'Imobiliário',
          value: 50000,
          currency: 'EUR',
        },
        { eventID: eventId }
      );

      console.log('🎯 [Meta Pixel] Evento Lead disparado no browser com eventID:', eventId);
    } else {
      console.warn('⚠️ [Meta Pixel] fbq ainda não disponível');
    }
  } catch (err) {
    console.warn('⚠️ [Meta Pixel] Erro ao disparar fbq track Lead:', err);
  }
}

/**
 * Disparo para cliques em contacto (ex: WhatsApp ou Ligação direta)
 */
export function trackContactClick(method: 'whatsapp' | 'phone') {
  if (typeof window === 'undefined') return;

  try {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Contact', {
        content_name: method === 'whatsapp' ? 'Clique WhatsApp' : 'Clique Telefone',
      });
    }
  } catch (err) {
    console.warn('⚠️ [Meta Pixel] Erro ao disparar Contact:', err);
  }
}
