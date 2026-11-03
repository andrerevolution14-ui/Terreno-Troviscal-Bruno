'use client';

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ArrowRight, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Edit3, 
  Check
} from 'lucide-react';
import { trackFormSubmissionLead, generateEventId, getCookie } from '@/lib/analytics';

const PRESET_HORARIOS = [
  'Qualquer hora',
  'Manhã (09h - 12h)',
  'Tarde (14h - 18h)',
  'Fim do dia (18h - 20h)',
];

function getCleanDigits(phone: string): string {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('00351')) {
    digits = digits.slice(5);
  } else if (digits.startsWith('351') && digits.length > 9) {
    digits = digits.slice(3);
  }
  return digits;
}

export default function LeadForm() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [horarioContacto, setHorarioContacto] = useState('');
  
  // Estados de submissão
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const phoneDigits = getCleanDigits(telefone);
  const isPhoneValid =
    (phoneDigits.length === 9 && /^[29]\d{8}$/.test(phoneDigits)) ||
    (phoneDigits.length >= 9 && phoneDigits.length <= 15);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!nome.trim() || nome.trim().length < 2) {
      setErrorMessage('Por favor, indique o seu nome.');
      setStatus('error');
      return;
    }

    if (!telefone.trim()) {
      setErrorMessage('Por favor, insira o seu contacto telefónico.');
      setStatus('error');
      return;
    }

    if (!isPhoneValid) {
      setErrorMessage(
        'Por favor, insira um contacto telefónico válido (9 dígitos nacional ou indicativo internacional).'
      );
      setStatus('error');
      return;
    }

    setStatus('loading');

    const eventId = generateEventId('lead');
    const fbp = getCookie('_fbp');
    const fbc = getCookie('_fbc');
    const sourceUrl = typeof window !== 'undefined' ? window.location.href : undefined;

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome.trim(),
          telefone: telefone.trim(),
          horario_contacto: horarioContacto.trim(),
          eventId,
          fbp,
          fbc,
          sourceUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Erro ao submeter os dados para a base de dados.');
      }

      // Evento Lead: apenas após envio com sucesso (eventId partilhado com a CAPI)
      trackFormSubmissionLead({
        eventId: data.eventId || eventId,
      });

      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Ocorreu um erro ao processar o seu pedido. Por favor tente novamente.');
    }
  };

  const handleEditPhone = () => {
    setStatus('idle');
  };

  return (
    <section id="formulario" className="py-12 sm:py-16 bg-[#f8faf8] text-[#0d382c] border-b border-[#e2ece6]">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        
        {/* Header com Destaque de Preço 50.000€ */}
        <div className="text-center mb-8">
          <span className="text-[11px] uppercase tracking-wider text-[#0f4c3a] font-bold block mb-1">
            Sem compromisso, resposta rápida • 50.000 € (Negociável)
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d382c] tracking-tight">
            Verificar disponibilidade
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#0d382c]/80">
            Deixe o seu contacto para confirmar a disponibilidade do terreno e receber informações, sem compromisso.
          </p>
        </div>

        {/* Minimalist Card */}
        <div className="bg-white p-5 sm:p-8 rounded-2xl border border-[#0d382c]/15 shadow-sm">
          
          {/* ECRÃ DE SUCESSO PÓS-SUBMISSÃO COM CONFIRMAÇÃO DO NÚMERO */}
          {status === 'success' ? (
            <div className="py-4 text-center animate-in fade-in duration-300">
              <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-700" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0d382c] mb-1">
                Contacto Registado com Sucesso!
              </h3>
              <p className="text-xs sm:text-sm text-[#0d382c]/80 mb-5">
                Obrigado, <strong>{nome}</strong>. O seu pedido foi gravado e entraremos em contacto muito brevemente.
              </p>

              {/* Aviso e Verificação do Número Pós-Formulário */}
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-300/80 text-left mb-6 shadow-xs">
                <div className="flex items-start gap-2.5">
                  <Phone className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 block">
                      Aviso de Confirmação do Contacto
                    </span>
                    <p className="text-xs sm:text-sm text-[#0d382c] mt-0.5">
                      Iremos ligar para: <strong className="text-base text-[#072218] font-mono tracking-wide">{telefone}</strong>{' '}
                      <span className="text-[11px] text-emerald-800 font-semibold">({phoneDigits.length} dígitos)</span>
                    </p>
                    {horarioContacto && (
                      <p className="text-xs text-amber-900/90 mt-1 flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Horário preferencial: <strong>{horarioContacto}</strong></span>
                      </p>
                    )}
                    <p className="text-[11px] text-amber-800/80 mt-2 italic">
                      Por favor certifique-se de que o número está correto para garantir a receção do contacto.
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-amber-200/80 flex items-center justify-end">
                  <button
                    onClick={() => {
                      setStatus('idle');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-950 underline decoration-amber-400 hover:decoration-amber-700 cursor-pointer"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    <span>Enganou-se no número? Corrigir número</span>
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setStatus('idle');
                  setNome('');
                  setTelefone('');
                  setHorarioContacto('');
                }}
                className="text-xs font-bold uppercase tracking-wider text-[#0f4c3a] hover:underline cursor-pointer"
              >
                Submeter outro contacto
              </button>
            </div>
          ) : (
            /* FORMULÁRIO PRINCIPAL DIRECIONADO */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {status === 'error' && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Nome */}
              <div>
                <label htmlFor="lead-nome" className="block text-xs font-bold text-[#0d382c] mb-1">
                  Nome completo *
                </label>
                <input
                  id="lead-nome"
                  name="nome"
                  autoComplete="name"
                  type="text"
                  required
                  placeholder="O seu nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f8faf8] border border-[#0d382c]/20 text-[#0d382c] text-xs sm:text-sm focus:outline-none focus:border-[#0f4c3a] focus:ring-1 focus:ring-[#0f4c3a] transition-colors"
                />
              </div>

              {/* Contacto Telefónico */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="lead-telefone" className="block text-xs font-bold text-[#0d382c]">
                    Contacto Telefónico *
                  </label>
                  <span className="text-[11px] text-[#0d382c]/60">
                    Nacional ou Internacional
                  </span>
                </div>

                <input
                  id="lead-telefone"
                  name="telefone"
                  autoComplete="tel"
                  type="tel"
                  inputMode="tel"
                  required
                  placeholder="Ex: 912 345 678 ou +351 ..."
                  value={telefone}
                  onChange={(e) => {
                    let val = e.target.value;
                    let d = val.replace(/\D/g, '');
                    if (d.startsWith('00351')) d = d.slice(5);
                    else if (d.startsWith('351') && d.length > 9) d = d.slice(3);
                    if (!val.trim().startsWith('+') && d.length <= 9) {
                      setTelefone(d);
                    } else {
                      setTelefone(val);
                    }
                    if (errorMessage) setErrorMessage('');
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#f8faf8] border text-[#0d382c] text-xs sm:text-sm focus:outline-none focus:ring-1 transition-colors font-mono ${
                    telefone.length > 0 && !isPhoneValid
                      ? 'border-amber-400 focus:border-amber-500 focus:ring-amber-500'
                      : 'border-[#0d382c]/20 focus:border-[#0f4c3a] focus:ring-[#0f4c3a]'
                  }`}
                />
              </div>

              {/* Campo Opcional: Melhor Hora para Contacto */}
              <div>
                <label className="block text-xs font-bold text-[#0d382c] mb-1.5">
                  Melhor hora para contacto <span className="font-normal text-[#0d382c]/60">(Opcional)</span>
                </label>

                {/* Botões Rápidos de Seleção */}
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_HORARIOS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setHorarioContacto(horarioContacto === preset ? '' : preset)}
                      className={`text-[11px] px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        horarioContacto === preset
                          ? 'bg-[#0f4c3a] text-white border-[#0f4c3a] font-bold shadow-xs'
                          : 'bg-[#f8faf8] text-[#0d382c]/80 border-[#0d382c]/20 hover:border-[#0f4c3a]/50'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 text-center">
                <span className="text-[11px] text-[#0f4c3a] font-semibold block mb-1.5">
                  Sem compromisso, resposta rápida.
                </span>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider gold-btn shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>A processar...</span>
                    </span>
                  ) : (
                    <>
                      <span>Verificar disponibilidade</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}


