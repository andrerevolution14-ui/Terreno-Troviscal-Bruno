'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MoradiaExterior360 from '@/components/MoradiaExterior360';
import DualAudienceSection from '@/components/DualAudienceSection';
import BenefitsSection from '@/components/BenefitsSection';
import ImageLibrarySection from '@/components/ImageLibrarySection';
import LocationSection from '@/components/LocationSection';
import CalculatorSection from '@/components/CalculatorSection';
import ObjectionsSection from '@/components/ObjectionsSection';
import LeadForm from '@/components/LeadForm';
import FloatingCTA from '@/components/FloatingCTA';
import Footer from '@/components/Footer';
import { LeadModalProvider } from '@/components/LeadModal';

export default function Home() {
  return (
    <LeadModalProvider>
      <main className="min-h-screen flex flex-col bg-[#0d382c] text-[#f8fafc]">
        {/* 1. Header Minimalista Direto */}
        <Navbar />

        {/* 2. Hero — Focado na Família, Terreno Plano e 50.000€ */}
        <HeroSection />

        {/* 3. Modelo 360° da Moradia de Sonho ("Assim pode ficar a sua casa aqui") */}
        <MoradiaExterior360 />

        {/* 4. Oportunidade Familiar Prioritária (e Investidor Secundário) */}
        <DualAudienceSection />

        {/* 5. Vantagens Construtivas & Fiscais (IVA a 6%) */}
        <BenefitsSection />

        {/* 6. Livraria Central de Imagens */}
        <ImageLibrarySection />

        {/* 7. Localização & Distâncias aos Pontos Principais */}
        <LocationSection />

        {/* 8. Simulador com Valores Baixos Otimizados */}
        <CalculatorSection />

        {/* 9. Perguntas Frequentes & Apoio PIP Camarário */}
        <ObjectionsSection />

        {/* 10. Formulário Direto na Página */}
        <LeadForm />

        {/* 11. Pílula Flutuante com Abertura Rápida de Modal */}
        <FloatingCTA />

        {/* 12. Rodapé com Nota Legal Consolidada */}
        <Footer />
      </main>
    </LeadModalProvider>
  );
}
