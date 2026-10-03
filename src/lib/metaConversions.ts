import crypto from 'node:crypto';

export const META_PIXEL_ID =
  process.env.META_PIXEL_ID ||
  process.env.NEXT_PUBLIC_META_PIXEL_ID ||
  '979841341182458';

export const META_CAPI_ACCESS_TOKEN =
  process.env.META_ACCESS_TOKEN ||
  process.env.META_CAPI_ACCESS_TOKEN ||
  'EAAT9k03bEqsBSgjVoa82Fet3Yiurus5KtnXVbjnPh6eVD42uNpHjz4uJsZAgZCRYrg4jcPZBZCIXZBPbNrCdrMzKryYhF0c07LSM2qmkIBvJ2OpsgIigbbcBVLFByCi6d8ZALAg87QREmel4XtaTh75xWR60eKdNYeYjvkTdCZAp4jZCk0dGoJiFVJAxneHXYAZDZD';

function sha256(value: string): string {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

/**
 * Normaliza número de telemóvel para formato internacional E.164 (sem '+')
 * Exemplo PT: "912 345 678" -> "351912345678"
 */
function normalizePhone(phone: string): string {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('00351')) {
    digits = digits.slice(2);
  } else if (!digits.startsWith('351') && digits.length === 9) {
    digits = `351${digits}`;
  }
  return digits;
}

export interface MetaLeadPayload {
  eventId: string;
  nome: string;
  telefone: string;
  email?: string | null;
  sourceUrl?: string;
  clientIp?: string | null;
  clientUserAgent?: string | null;
  fbp?: string | null;
  fbc?: string | null;
}

/**
 * Envia evento LEAD para a Meta Conversions API (CAPI) via Server-Side.
 * Garante deduplicação perfeita com o Meta Pixel do browser através do mesmo `eventId`.
 * Valor registado: 50.000€ (Objetivo de Valor Mais Alto - Preço do Terreno no Troviscal).
 */
export async function sendMetaLeadConversion(data: MetaLeadPayload) {
  try {
    const { eventId, nome, telefone, email, sourceUrl, clientIp, clientUserAgent, fbp, fbc } = data;

    const normalizedPhone = normalizePhone(telefone);
    const firstName = nome.trim().split(' ')[0] || nome.trim();

    const userData: Record<string, unknown> = {
      ph: [sha256(normalizedPhone)],
      fn: [sha256(firstName)],
    };

    if (email && email.trim().length > 3) {
      userData.em = [sha256(email)];
    }

    if (clientIp) {
      userData.client_ip_address = clientIp;
    }
    if (clientUserAgent) {
      userData.client_user_agent = clientUserAgent;
    }
    if (fbp) {
      userData.fbp = fbp;
    }
    if (fbc) {
      userData.fbc = fbc;
    }

    const payload = {
      data: [
        {
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          event_source_url: sourceUrl || 'https://terreno-troviscal.pt/#formulario',
          action_source: 'website',
          user_data: userData,
          custom_data: {
            currency: 'EUR',
            value: 50000,
            content_name: 'Terreno Urbano no Troviscal - 1.474,50 m²',
            content_category: 'Imobiliário',
          },
        },
      ],
    };

    const url = `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${META_CAPI_ACCESS_TOKEN}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const resJson = await response.json();

    if (!response.ok) {
      console.warn('⚠️ [Meta CAPI] Resposta não-OK da Meta:', JSON.stringify(resJson));
      return { success: false, error: resJson };
    }

    console.log('✅ [Meta CAPI] Evento Lead enviado com sucesso:', {
      eventId,
      events_received: resJson.events_received,
      fbtrace_id: resJson.fbtrace_id,
    });

    return { success: true, response: resJson };
  } catch (error: any) {
    console.error('❌ [Meta CAPI] Erro ao disparar evento Lead:', error.message);
    return { success: false, error: error.message };
  }
}
