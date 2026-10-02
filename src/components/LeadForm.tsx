'use client';

import React, { useState } from 'react';
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

const PRESET_HORARIOS = [
  'Qualquer hora',
  'Manhã (09h - 12h)',
  'Tarde (14h - 18h)',
  'Fim do dia (18h - 20h)',
];

export default function LeadForm() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [horarioContacto, setHorarioContacto] = useState('');
  
  // Estados de submissão e confirmação
  const [isConfirmingPhone, setIsConfirmingPhone] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Ao carregar no botão do formulário, abre o aviso de confirmação do número
  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!nome.trim() || nome.trim().length < 2) {
      setErrorMessage('Por favor, indique o seu nome.');
      setStatus('error');
      return;
    }

    if (!telefone.trim() || telefone.trim().length < 6) {
      setErrorMessage('Por favor, insira um número de telefone válido.');
      setStatus('error');
      return;
    }

    // Abre o aviso interativo de confirmação do número
    setIsConfirmingPhone(true);
  };

  // Submissão definitiva após confirmação de que o número está correto
  const handleConfirmAndSend = async () => {
    setStatus('loading');
    setErrorMessage('');

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
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao submeter os dados.');
      }

      setIsConfirmingPhone(false);
      setStatus('success');
    } catch (err: any) {
      setIsConfirmingPhone(false);
      setStatus('error');
      setErrorMessage(err.message || 'Ocorreu um erro ao processar o seu pedido.');
    }
  };

  const handleEditPhone = () => {
    setIsConfirmingPhone(false);
  };

  return (
    <section id="formulario" className="py-12 sm:py-16 bg-[#f8faf8] text-[#0d382c] border-b border-[#e2ece6]">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        
        {/* Header com Destaque de Preço 50.000€ */}
        <div className="text-center mb-8">
          <span className="text-[11px] uppercase tracking-wider text-[#0f4c3a] font-bold block mb-1">
            Contacto Direto • 50.000 € (Negociável)
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d382c] tracking-tight">
            Quero ser contactado
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#0d382c]/80">
            Deixe os seus dados para receber todos os detalhes do terreno de 1.474,50 m² e agendar visita.
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
                Pedido Registado com Sucesso!
              </h3>
              <p className="text-xs sm:text-sm text-[#0d382c]/80 mb-5">
                Obrigado, <strong>{nome}</strong>. Entraremos em contacto muito brevemente.
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
                      Iremos ligar para: <strong className="text-base text-[#072218] font-mono tracking-wide">{telefone}</strong>
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
                      setIsConfirmingPhone(false);
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
                  setIsConfirmingPhone(false);
                  setNome('');
                  setTelefone('');
                  setHorarioContacto('');
                }}
                className="text-xs font-bold uppercase tracking-wider text-[#0f4c3a] hover:underline cursor-pointer"
              >
                Submeter outro contacto
              </button>
            </div>
          ) : isConfirmingPhone ? (
            /* PASSO DE CONFIRMAÇÃO DO NÚMERO (AVISO ANTES DO DISPATCH DEFINITIVO) */
            <div className="py-2 text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="h-12 w-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#0d382c] mb-1">
                Confirmar Número de Contacto
              </h3>
              <p className="text-xs sm:text-sm text-[#0d382c]/80 mb-5">
                Por favor confirme que o seu número está correto para podermos contactá-lo:
              </p>

              {/* Caixa em Destaque do Número */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border-2 border-[#0f4c3a] text-center mb-5 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-[#0f4c3a] tracking-wider block mb-1">
                  Número indicado por {nome}
                </span>
                <div className="text-xl sm:text-2xl font-black font-mono text-[#072218] tracking-wider flex items-center justify-center gap-2">
                  <Phone className="h-5 w-5 text-[#0f4c3a]" />
                  <span>{telefone}</span>
                </div>
                {horarioContacto && (
                  <div className="mt-2 text-xs font-medium text-emerald-900 inline-flex items-center gap-1.5 bg-emerald-100/70 px-3 py-1 rounded-full">
                    <Clock className="h-3 w-3 text-emerald-800" />
                    <span>Melhor hora: {horarioContacto}</span>
                  </div>
                )}
              </div>

              {/* Botões de Ação para Confirmação */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={handleConfirmAndSend}
                  disabled={status === 'loading'}
                  className="w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider gold-btn shadow-md transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>A submeter pedido...</span>
                    </span>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Sim, o número está correto</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleEditPhone}
                  disabled={status === 'loading'}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#0d382c]/80 hover:text-[#0d382c] hover:bg-[#f8faf8] border border-[#0d382c]/15 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>Corrigir / Alterar número</span>
                </button>
              </div>
            </div>
          ) : (
            /* FORMULÁRIO PRINCIPAL (SEM CAMPO DE EMAIL) */
            <form onSubmit={handlePreSubmit} className="space-y-4">
              
              {status === 'error' && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Nome */}
              <div>
                <label className="block text-xs font-bold text-[#0d382c] mb-1">
                  Nome *
                </label>
                <input
                  type="text"
                  required
                  placeholder="O seu nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f8faf8] border border-[#0d382c]/20 text-[#0d382c] text-xs sm:text-sm focus:outline-none focus:border-[#0f4c3a] focus:ring-1 focus:ring-[#0f4c3a] transition-colors"
                />
              </div>

              {/* Contacto Telefónico (Email removido conforme solicitado) */}
              <div>
                <label className="block text-xs font-bold text-[#0d382c] mb-1">
                  Contacto Telefónico *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+351 912 345 678"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f8faf8] border border-[#0d382c]/20 text-[#0d382c] text-xs sm:text-sm focus:outline-none focus:border-[#0f4c3a] focus:ring-1 focus:ring-[#0f4c3a] transition-colors font-mono"
                />
                <span className="text-[11px] text-[#0d382c]/60 mt-1 block">
                  Iremos ligar para este número para responder às suas dúvidas e agendar visita.
                </span>
              </div>

              {/* Campo Opcional: Melhor Hora para Contacto */}
              <div>
                <label className="block text-xs font-bold text-[#0d382c] mb-1">
                  Melhor hora para contacto <span className="font-normal text-[#0d382c]/60">(Opcional)</span>
                </label>

                {/* Botões Rápidos de Seleção */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {PRESET_HORARIOS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setHorarioContacto(preset)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        horarioContacto === preset
                          ? 'bg-[#0f4c3a] text-white border-[#0f4c3a] font-bold shadow-xs'
                          : 'bg-[#f8faf8] text-[#0d382c]/80 border-[#0d382c]/20 hover:border-[#0f4c3a]/50'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                {/* Input com texto livre para máxima flexibilidade */}
                <input
                  type="text"
                  placeholder="Ex: Tarde a partir das 16h, Sábado de manhã..."
                  value={horarioContacto}
                  onChange={(e) => setHorarioContacto(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#f8faf8] border border-[#0d382c]/20 text-[#0d382c] text-xs sm:text-sm focus:outline-none focus:border-[#0f4c3a] focus:ring-1 focus:ring-[#0f4c3a] transition-colors"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider gold-btn shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Quero ser contactado</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}

