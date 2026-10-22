import { NextResponse } from 'next/server';
import { saveLeadToNeon, LeadData } from '@/lib/db';
import { sendMetaLeadConversion } from '@/lib/metaConversions';

function parseCookie(cookieHeader: string, name: string): string | null {
  const match = cookieHeader.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[2]) : null;
}

const PERFIS = ['familia', 'investidor'];
const FINANCIAMENTOS = ['sim', 'nao', 'a_avaliar'];
const PRAZOS = ['imediato', 'ate_3_meses', '3_a_6_meses', 'mais_6_meses'];

function pick(value: unknown, allowed: string[]): string {
  return typeof value === 'string' && allowed.includes(value) ? value : '';
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      nome: rawNome, 
      telefone: rawTelefone, 
      horario_contacto, 
      data_visita, 
      email, 
      eventId: clientEventId, 
      sourceUrl: clientSourceUrl, 
      fbp: clientFbp, 
      fbc: clientFbc,
      perfil: rawPerfil,
      financiamento: rawFinanciamento,
      prazo: rawPrazo,
      isWhatsAppLead,
      origem: rawOrigem,
      tipo_interesse: rawTipoInteresse,
      objetivo,
    } = body;

    const perfil = pick(rawPerfil, PERFIS);
    const financiamento = pick(rawFinanciamento, FINANCIAMENTOS);
    const prazo = pick(rawPrazo, PRAZOS);

    let nome = typeof rawNome === 'string' ? rawNome.trim() : '';
    let telefone = typeof rawTelefone === 'string' ? rawTelefone.trim() : '';

    if (isWhatsAppLead) {
      if (!nome || nome.length < 2) {
        nome = 'Interessado WhatsApp';
      }
      if (!telefone || telefone.length < 8) {
        telefone = '+351 920 601 070';
      }
    } else {
      if (!nome || nome.length < 2) {
        return NextResponse.json(
          { error: 'Por favor, indique o seu nome.' },
          { status: 400 }
        );
      }

      if (!telefone) {
        return NextResponse.json(
          { error: 'Por favor, insira o seu contacto telefónico.' },
          { status: 400 }
        );
      }

      // Validação estrita: exatamente 9 ou 12 dígitos
      let digits = telefone.replace(/\D/g, '');
      if (digits.startsWith('00351')) {
        digits = digits.slice(2);
      }

      if (digits.length !== 9 && digits.length !== 12) {
        return NextResponse.json(
          { 
            error: `O número inserido tem ${digits.length} dígitos. O contacto telefónico tem de ter obrigatoriamente 9 dígitos (ex: 912 345 678) ou 12 dígitos com indicativo (ex: +351 912 345 678).` 
          },
          { status: 400 }
        );
      }
    }

    const leadData: LeadData = {
      nome,
      email: email ? String(email).trim().toLowerCase() : '',
      telefone,
      horario_contacto: horario_contacto ? String(horario_contacto).trim() : '',
      data_visita: data_visita ? String(data_visita).trim() : '',
      tipo_interesse: rawTipoInteresse || (isWhatsAppLead ? (objetivo ? `WhatsApp (${objetivo})` : 'Contacto WhatsApp') : 'Quero ser contactado'),
      origem: rawOrigem || (isWhatsAppLead ? 'WhatsApp Flutuante' : 'Landing Page Terreno Troviscal'),
      perfil,
      financiamento,
      prazo,
    };

    // 1. Gravar na base de dados Neon
    const result = await saveLeadToNeon(leadData);

    if (!result.savedToNeon) {
      return NextResponse.json(
        { error: 'Não foi possível gravar o contacto na base de dados Neon. Por favor tente novamente.' },
        { status: 500 }
      );
    }

    // 2. Deduplicação Event ID partilhado com o Meta Pixel do browser
    const eventId = clientEventId || `lead_srv_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    // Headers & cookies para enriquecimento de Event Match Quality (EMQ) na Meta
    const cookieHeader = request.headers.get('cookie') || '';
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || request.headers.get('x-real-ip') || undefined;
    const clientUserAgent = request.headers.get('user-agent') || undefined;
    const fbp = clientFbp || parseCookie(cookieHeader, '_fbp') || undefined;
    const fbc = clientFbc || parseCookie(cookieHeader, '_fbc') || undefined;
    const sourceUrl = clientSourceUrl || request.headers.get('referer') || 'https://terreno-troviscal.pt/#formulario';

    // 3. Disparo Server-Side via Meta Conversions API (CAPI)
    try {
      await sendMetaLeadConversion({
        eventId,
        nome: leadData.nome,
        telefone: leadData.telefone,
        email: leadData.email,
        perfil,
        financiamento,
        prazo,
        sourceUrl,
        clientIp,
        clientUserAgent,
        fbp,
        fbc,
      });
    } catch (metaError) {
      console.error('⚠️ [CAPI] Falha no disparo assíncrono para a Meta:', metaError);
    }

    return NextResponse.json({
      success: true,
      message: 'Contacto registado com sucesso.',
      savedToNeon: true,
      id: result.id,
      eventId,
    });
  } catch (error: any) {
    console.error('Erro ao processar lead no Neon:', error);
    return NextResponse.json(
      { error: error?.message || 'Ocorreu um erro ao submeter. Por favor, tente novamente.' },
      { status: 500 }
    );
  }
}



