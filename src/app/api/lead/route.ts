import { NextResponse } from 'next/server';
import { saveLeadToNeon, LeadData } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, telefone, data_visita } = body;

    if (!nome || typeof nome !== 'string' || nome.trim().length < 2) {
      return NextResponse.json(
        { error: 'Por favor, indique o seu nome.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Por favor, insira um e-mail válido.' },
        { status: 400 }
      );
    }

    if (!telefone || typeof telefone !== 'string' || telefone.trim().length < 6) {
      return NextResponse.json(
        { error: 'Por favor, insira o seu contacto telefónico.' },
        { status: 400 }
      );
    }

    const leadData: LeadData = {
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      telefone: telefone.trim(),
      data_visita: data_visita ? String(data_visita).trim() : '',
      tipo_interesse: 'Quero ser contactado',
      origem: 'Landing Page Terreno Troviscal'
    };

    const result = await saveLeadToNeon(leadData);

    return NextResponse.json({
      success: true,
      message: 'Contacto registado com sucesso!',
      savedToNeon: result.savedToNeon,
      id: result.id
    });
  } catch (error: any) {
    console.error('Erro ao processar lead no Neon:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao submeter. Por favor, tente novamente.' },
      { status: 500 }
    );
  }
}
