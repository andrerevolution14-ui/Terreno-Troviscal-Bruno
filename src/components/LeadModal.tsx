'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Loader2, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { trackFormSubmissionLead, generateEventId, getCookie } from '@/lib/analytics';

interface LeadModalContextType {
  isOpen: boolean;
  openLeadModal: (title?: string) => void;
  closeLeadModal: () => void;
}

const LeadModalContext = createContext<LeadModalContextType>({
  isOpen: false,
  openLeadModal: () => {},
  closeLeadModal: () => {},
});

export const useLeadModal = () => useContext(LeadModalContext);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Verificar Disponibilidade · Terreno Troviscal');

  const openLeadModal = (title?: string) => {
    if (title) setModalTitle(title);
    setIsOpen(true);
  };

  const closeLeadModal = () => {
    setIsOpen(false);
  };

  return (
    <LeadModalContext.Provider value={{ isOpen, openLeadModal, closeLeadModal }}>
      {children}
      {isOpen && <LeadModalPopup onClose={closeLeadModal} title={modalTitle} />}
    </LeadModalContext.Provider>
  );
}

function getCleanDigits(phone: string): string {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('00351')) {
    digits = digits.slice(5);
  } else if (digits.startsWith('351') && digits.length > 9) {
    digits = digits.slice(3);
  }
  return digits;
}

function LeadModalPopup({ onClose, title }: { onClose: () => void; title: string }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
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

    if (!isPhoneValid) {
      setErrorMessage('Por favor, insira um número válido (9 dígitos nacional ou indicativo internacional).');
      setStatus('error');
      return;
    }

    setStatus('loading');

    const eventId = generateEventId('lead_modal');
    const fbp = getCookie('_fbp');
    const fbc = getCookie('_fbc');
    const sourceUrl = typeof window !== 'undefined' ? window.location.href : undefined;

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(),
          telefone: telefone.trim(),
          origem: 'Modal Rápido · Troviscal',
          eventId,
          fbp,
          fbc,
          sourceUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Erro ao gravar os dados.');
      }

      trackFormSubmissionLead({
        eventId: data.eventId || eventId,
      });

      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Erro ao submeter. Tente novamente.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-[#0a2319] border border-[#dfb15b]/40 rounded-2xl p-6 sm:p-7 shadow-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        {status === 'success' ? (
          <div className="py-6 text-center">
            <div className="h-14 w-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Contacto Recebido!</h3>
            <p className="text-sm text-slate-200 mb-6">
              Obrigado, <strong>{nome}</strong>. O seu pedido foi registado e entraremos em contacto muito brevemente.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#dfb15b] text-[#072218] font-bold text-xs uppercase tracking-wider hover:bg-[#c59c47] transition-colors"
            >
              Fechar Janela
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#dfb15b]/20 text-[#dfb15b] border border-[#dfb15b]/40 mb-2">
                Venda Direta · 50.000 €
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">{title}</h3>
              <p className="text-xs text-slate-300 mt-1">
                Indique o seu nome e contacto. Respondemos rapidamente e sem compromisso.
              </p>
            </div>

            {status === 'error' && (
              <div className="mb-3 p-2.5 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 text-xs">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Nome completo *
                </label>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: João Silva"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#dfb15b] transition-colors"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-200">
                    Número de Telemóvel *
                  </label>
                  <span className="text-[10px] text-slate-400">Nacional ou Internacional</span>
                </div>
                <input
                  type="tel"
                  required
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
                  placeholder="Ex: 912 345 678 ou +351 ..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#dfb15b] transition-colors font-mono"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider gold-btn shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>A registar...</span>
                    </span>
                  ) : (
                    <>
                      <span>Verificar disponibilidade</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400 pt-1">
                🔒 Os seus dados são confidenciais e nunca serão partilhados.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

