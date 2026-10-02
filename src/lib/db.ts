import { neon } from '@neondatabase/serverless';

export interface LeadData {
  nome: string;
  email?: string;
  telefone: string;
  horario_contacto?: string;
  data_visita?: string;
  tipo_interesse?: string;
  mensagem?: string;
  origem?: string;
}

// Fallback robusto garantido para quando a app está em produção (ex: Vercel)
// assegurando que grava sempre no Neon mesmo antes de configurar env vars no dashboard
const DEFAULT_NEON_URL = "postgresql://neondb_owner:npg_G4JpoiHBnbt9@ep-ancient-firefly-zawqikzw-pooler.c-2.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

function getConnectionString(): string {
  const raw = 
    process.env.DATABASE_URL || 
    process.env.NEON_DATABASE_URL || 
    process.env.POSTGRES_URL || 
    process.env.POSTGRES_PRISMA_URL || 
    process.env.POSTGRES_URL_NON_POOLING ||
    DEFAULT_NEON_URL;

  return raw ? raw.trim().replace(/^["']|["']$/g, '') : DEFAULT_NEON_URL;
}

export async function saveLeadToNeon(lead: LeadData) {
  const connectionString = getConnectionString();
  const sql = neon(connectionString);

  try {
    // 1. Inserção direta rápida (executa em ~200-300ms)
    const result = await sql`
      INSERT INTO leads_terreno_troviscal (nome, email, telefone, horario_contacto, data_visita, tipo_interesse, origem)
      VALUES (
        ${lead.nome}, 
        ${lead.email || ''}, 
        ${lead.telefone}, 
        ${lead.horario_contacto || ''},
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
  } catch (err: any) {
    console.warn('⚠️ [NEON DB] Inserção inicial falhou, a verificar/sincronizar schema:', err.message);

    // 2. Se a tabela ou colunas precisarem de ajuste automático
    await sql`
      CREATE TABLE IF NOT EXISTS leads_terreno_troviscal (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) DEFAULT '',
        telefone VARCHAR(100) NOT NULL,
        horario_contacto VARCHAR(255) DEFAULT '',
        data_visita VARCHAR(255) DEFAULT '',
        tipo_interesse VARCHAR(100) DEFAULT 'Interesse Geral',
        origem VARCHAR(100) DEFAULT 'Landing Page Troviscal',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    try {
      await sql`ALTER TABLE leads_terreno_troviscal ALTER COLUMN email DROP NOT NULL;`;
    } catch {}

    try {
      await sql`ALTER TABLE leads_terreno_troviscal ADD COLUMN IF NOT EXISTS horario_contacto VARCHAR(255) DEFAULT '';`;
    } catch {}

    try {
      await sql`ALTER TABLE leads_terreno_troviscal ADD COLUMN IF NOT EXISTS data_visita VARCHAR(255) DEFAULT '';`;
    } catch {}

    // Tentar inserção novamente após sincronização de schema
    const retryResult = await sql`
      INSERT INTO leads_terreno_troviscal (nome, email, telefone, horario_contacto, data_visita, tipo_interesse, origem)
      VALUES (
        ${lead.nome}, 
        ${lead.email || ''}, 
        ${lead.telefone}, 
        ${lead.horario_contacto || ''},
        ${lead.data_visita || ''}, 
        ${lead.tipo_interesse || 'Interesse Geral'}, 
        ${lead.origem || 'Landing Page Troviscal'}
      )
      RETURNING id, created_at;
    `;

    return {
      success: true,
      savedToNeon: true,
      id: retryResult[0]?.id,
      created_at: retryResult[0]?.created_at
    };
  }
}

