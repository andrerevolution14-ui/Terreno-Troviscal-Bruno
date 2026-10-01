import { neon } from '@neondatabase/serverless';

export interface LeadData {
  nome: string;
  email: string;
  telefone: string;
  data_visita?: string;
  tipo_interesse?: string;
  mensagem?: string;
  origem?: string;
}

export async function saveLeadToNeon(lead: LeadData) {
  const connectionString = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;

  if (!connectionString) {
    console.warn('⚠️ [NEON DB] DATABASE_URL não definida em .env.local.');
    return {
      success: true,
      savedToNeon: false,
      message: 'Modo simulação.',
      data: lead
    };
  }

  const sql = neon(connectionString);

  // Criar tabela se não existir
  await sql`
    CREATE TABLE IF NOT EXISTS leads_terreno_troviscal (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      telefone VARCHAR(100) NOT NULL,
      data_visita VARCHAR(255) DEFAULT '',
      tipo_interesse VARCHAR(100) DEFAULT 'Interesse Geral',
      origem VARCHAR(100) DEFAULT 'Landing Page Troviscal',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Adicionar coluna data_visita se já existia a tabela anterior sem ela
  try {
    await sql`ALTER TABLE leads_terreno_troviscal ADD COLUMN IF NOT EXISTS data_visita VARCHAR(255) DEFAULT '';`;
  } catch (e) {
    // Ignorar se já existe
  }

  // Inserir novo registo com parâmetros seguros
  const result = await sql`
    INSERT INTO leads_terreno_troviscal (nome, email, telefone, data_visita, tipo_interesse, origem)
    VALUES (
      ${lead.nome}, 
      ${lead.email}, 
      ${lead.telefone}, 
      ${lead.data_visita || ''}, 
      ${lead.tipo_interesse || 'Interesse Geral'}, 
      ${lead.origem || 'Landing Page Troviscal'}
    )
    RETURNING id, created_at;
  `;

  return {
    success: true,
    savedToNeon: true,
    id: result[0]?.id,
    created_at: result[0]?.created_at
  };
}
