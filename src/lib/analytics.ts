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

/** Mensagem direta predefinida para falar com o dono */
export const DEFAULT_WHATSAPP_MESSAGE =
  'Olá! Vi o terreno no Troviscal de 1.474 m² e gostaria de falar com o dono para obter mais informações e agendar uma visita. Obrigado!';

/**
 * Mensagens pré-preparadas mantidas para retrocompatibilidade
 */
export const WHATSAPP_OBJECTIVES: Record<
  string,
  { label: string; shortTitle: string; icon: string; text: string }
> = {
  geral: {
    label: 'Falar com o Dono',
    shortTitle: 'Falar com o Dono',
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

// In-memory debounce timestamp to prevent rapid double-clicks
let lastWhatsAppClickTime = 0;

/**
 * Disparado ao clicar em qualquer botão do WhatsApp (Flutuante, Barra ou Inline).
 * REGISTA O EVENTO "LEAD" NO META PIXEL COM VALOR DE 50.000 € E DEDUPLICAÇÃO
 * PERFEITA VIA EVENTID COM A CONVERSIONS API (CAPI) VIA /api/lead KEEPALIVE.
 */
export function trackWhatsAppContact(
  source = 'whatsapp_flutuante',
  extra: Record<string, unknown> = {}
) {
  if (typeof window === 'undefined') return;

  const now = Date.now();
  if (now - lastWhatsAppClickTime < 2000) {
    return;
  }
  lastWhatsAppClickTime = now;

  const eventId =
    (extra.eventId as string) || generateEventId('wa_lead');
  const sourceUrl =
    typeof window !== 'undefined' ? window.location.href : undefined;
  const fbp = getCookie('_fbp') || undefined;
  const fbc = getCookie('_fbc') || undefined;
  const objetivo = (extra.objetivo as string) || 'geral';

  // 1. DISPARAR LEAD NO META PIXEL (50.000 €) com eventID para deduplicação
  safeFbq(
    'track',
    'Lead',
    {
      content_name: 'Lead WhatsApp - Terreno Troviscal 50.000€',
      content_category: 'Imobiliário',
      value: 50000,
      currency: 'EUR',
      lead_source: `WhatsApp (${source})`,
      objetivo,
      status: 'Lead WhatsApp Iniciada',
    },
    { eventID: eventId }
  );

  // 2. DISPARAR CONTACT NO META PIXEL (para compatibilidade com conjuntos que otimizam por Contact)
  safeFbq(
    'track',
    'Contact',
    {
      content_name: 'Clique WhatsApp',
      origem: source,
      objetivo,
    },
    { eventID: eventId }
  );

  // 3. ENVIAR PARA /api/lead VIA FETCH KEEPALIVE (Meta CAPI Server-side + Neon DB)
  try {
    fetch('/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isWhatsAppLead: true,
        nome: (extra.nome as string) || 'Interessado WhatsApp',
        telefone: (extra.telefone as string) || '+351 920 601 070',
        tipo_interesse: `WhatsApp (${objetivo})`,
        origem: `WhatsApp - ${source}`,
        eventId,
        fbp,
        fbc,
        sourceUrl,
        objetivo,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {}
}

/** Contact: clique em qualquer botão de WhatsApp (ou telefone). Mantido para retrocompatibilidade. */
export function trackContactClick(
  method: 'whatsapp' | 'phone',
  origem?: string
) {
  if (method === 'whatsapp') {
    trackWhatsAppContact(origem || 'whatsapp_link');
  } else {
    safeFbq('track', 'Contact', {
      content_name: 'Clique Telefone',
      origem: origem || 'desconhecida',
    });
  }
}

// Listener global para captar qualquer link wa.me ou whatsapp.com
if (typeof window !== 'undefined') {
  window.addEventListener(
    'click',
    (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href') || '';
      if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        const source =
          target.id || target.getAttribute('data-source') || 'wa_link_global';
        trackWhatsAppContact(source);
      }
    },
    { capture: true }
  );
}
