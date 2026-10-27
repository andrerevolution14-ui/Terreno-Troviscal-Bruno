/**
 * Telemetria e rastreio de conversões com o Meta Pixel & Conversions API (CAPI)
 * Meta Pixel ID: NEXT_PUBLIC_META_PIXEL_ID (com fallback para o ID oficial)
 */

export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || '979841341182458';

/** Número de WhatsApp em formato internacional, só dígitos (ex: 351920601070). */
export const WHATSAPP_NUMBER = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '351920601070'
).replace(/\D/g, '');

/** Mensagem direta predefinida para falar com o promotor */
export const DEFAULT_WHATSAPP_MESSAGE =
  'Olá! Vi o terreno no Troviscal de 1.474 m² e gostaria de falar com o promotor para obter mais informações e agendar uma visita. Obrigado!';

/**
 * Mensagens pré-preparadas mantidas para retrocompatibilidade
 */
export const WHATSAPP_OBJECTIVES: Record<
  string,
  { label: string; shortTitle: string; icon: string; text: string }
> = {
  geral: {
    label: 'Falar por WhatsApp',
    shortTitle: 'Falar por WhatsApp',
    icon: '💬',
    text: DEFAULT_WHATSAPP_MESSAGE,
  },
};

export const WHATSAPP_MESSAGE = DEFAULT_WHATSAPP_MESSAGE;

export function getWhatsAppUrl(_objectiveKey?: string): string {
  const phone = WHATSAPP_NUMBER || '351920601070';
  return `https://wa.me/${phone}?text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}`;
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
  const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
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
 * Evento Lead: chamado após envio com sucesso do formulário.
 * O eventID é partilhado com a Conversions API para deduplicação perfeita 1:1.
 */
export function trackFormSubmissionLead({
  eventId,
  perfil,
  financiamento,
  prazo,
}: LeadTrackingParams) {
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

/**
 * Cliques ou mensagens por WhatsApp não são guardados na base de dados
 * nem considerados Lead ou Contacto (sem tracking por solicitação explícita).
 */
export function trackWhatsAppContact(
  _source = 'whatsapp_flutuante',
  _extra: Record<string, unknown> = {}
) {
  // Sem gravação na base de dados, sem Meta Pixel, sem CAPI, sem tracking.
}

/** Contact: clique em qualquer botão de telefone. WhatsApp não é rastreado. */
export function trackContactClick(
  method: 'whatsapp' | 'phone',
  origem?: string
) {
  if (method === 'whatsapp') {
    // Sem tracking para WhatsApp
    return;
  }
  safeFbq('track', 'Contact', {
    content_name: 'Clique Telefone',
    origem: origem || 'desconhecida',
  });
}

