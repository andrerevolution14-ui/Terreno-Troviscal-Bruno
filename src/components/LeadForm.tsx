'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

export default function LeadForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataVisita, setDataVisita] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          email,
          telefone,
          data_visita: dataVisita,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao submeter os dados.');
      }

      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Ocorreu um erro ao processar o seu pedido.');
    }
  };

  return (
    <section id="formulario" className="py-12 sm:py-16 bg-[#f8faf8] text-[#0d382c] border-b border-[#e2ece6]">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-[11px] uppercase tracking-wider text-[#0f4c3a] font-bold block mb-1">
            Contacto Direto
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d382c] tracking-tight">
            Quero ser contactado
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#0d382c]/80">
            Deixe os seus dados para receber todas as informações e agendar a visita.
          </p>
        </div>

        {/* Minimalist Card */}
        <div className="bg-white p-5 sm:p-8 rounded-2xl border border-[#0d382c]/15 shadow-sm">
          
          {status === 'success' ? (
            <div className="py-6 text-center animate-in fade-in duration-300">
              <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0d382c] mb-1">
                Pedido Registado com Sucesso!
              </h3>
              <p className="text-xs sm:text-sm text-[#0d382c]/80 mb-6">
                Obrigado, <strong>{nome}</strong>. Entraremos em contacto muito brevemente.
              </p>

              <button
                onClick={() => {
                  setStatus('idle');
                  setNome('');
                  setEmail('');
                  setTelefone('');
                  setDataVisita('');
                }}
                className="text-xs font-bold uppercase tracking-wider text-[#0f4c3a] hover:underline cursor-pointer"
              >
                Submeter outro contacto
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
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

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-[#0d382c] mb-1">
                  E-mail *
                </label>
                <input
                  type="email"
                  required
                  placeholder="exemplo@email.pt"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f8faf8] border border-[#0d382c]/20 text-[#0d382c] text-xs sm:text-sm focus:outline-none focus:border-[#0f4c3a] focus:ring-1 focus:ring-[#0f4c3a] transition-colors"
                />
              </div>

              {/* Telefone */}
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f8faf8] border border-[#0d382c]/20 text-[#0d382c] text-xs sm:text-sm focus:outline-none focus:border-[#0f4c3a] focus:ring-1 focus:ring-[#0f4c3a] transition-colors"
                />
              </div>

              {/* Data Preferencial */}
              <div>
                <label className="block text-xs font-bold text-[#0d382c] mb-1">
                  Dia ou Horário de Preferência (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Sábado de manhã ou dia de semana às 18h"
                  value={dataVisita}
                  onChange={(e) => setDataVisita(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f8faf8] border border-[#0d382c]/20 text-[#0d382c] text-xs sm:text-sm focus:outline-none focus:border-[#0f4c3a] focus:ring-1 focus:ring-[#0f4c3a] transition-colors"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider gold-btn shadow-md transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>A submeter...</span>
                    </span>
                  ) : (
                    <>
                      <span>Quero ser contactado</span>
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
