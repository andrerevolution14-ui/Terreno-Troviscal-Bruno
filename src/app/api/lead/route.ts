import { NextResponse } from 'next/server';
import { saveLeadToNeon, LeadData } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, telefone, horario_contacto, data_visita, email } = body;

    if (!nome || typeof nome !== 'string' || nome.trim().length < 2) {
      return NextResponse.json(
        { error: 'Por favor, indique o seu nome.' },
        { status: 400 }
      );
    }

    if (!telefone || typeof telefone !== 'string') {
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

    const leadData: LeadData = {
      nome: nome.trim(),
      email: email ? String(email).trim().toLowerCase() : '',
      telefone: telefone.trim(),
      horario_contacto: horario_contacto ? String(horario_contacto).trim() : '',
      data_visita: data_visita ? String(data_visita).trim() : '',
      tipo_interesse: 'Quero ser contactado',
      origem: 'Landing Page Terreno Troviscal'
    };

    const result = await saveLeadToNeon(leadData);

    if (!result.savedToNeon) {
      return NextResponse.json(
        { error: 'Não foi possível gravar o contacto na base de dados Neon. Por favor tente novamente.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Contacto registado com sucesso no Neon!',
      savedToNeon: true,
      id: result.id
    });
  } catch (error: any) {
    console.error('Erro ao processar lead no Neon:', error);
    return NextResponse.json(
      { error: error?.message || 'Ocorreu um erro ao submeter. Por favor, tente novamente.' },
      { status: 500 }
    );
  }
}


