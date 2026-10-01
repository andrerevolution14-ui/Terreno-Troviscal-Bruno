'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import DualAudienceSection from '@/components/DualAudienceSection';
import BenefitsSection from '@/components/BenefitsSection';
import ImageLibrarySection from '@/components/ImageLibrarySection';
import LocationSection from '@/components/LocationSection';
import CalculatorSection from '@/components/CalculatorSection';
import ObjectionsSection from '@/components/ObjectionsSection';
import LeadForm from '@/components/LeadForm';
import FloatingCTA from '@/components/FloatingCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0d382c] text-[#f8fafc]">
      {/* 1. Header Minimalista Direto com Botão Compacto */}
      <Navbar />

      {/* 2. Hero com Primeira Foto (tras.png), Cartões em Branco e sem Botão a Tapar */}
      <HeroSection />

      {/* 3. Oportunidade Dual (Família vs Investidor) sem Imagens Repetidas */}
      <DualAudienceSection />

      {/* 4. Vantagens Construtivas & Fiscais (IVA a 6%) */}
      <BenefitsSection />

      {/* 5. Livraria Central de Imagens com Ecrã Inteiro, Zoom e Passagem Lateral */}
      <ImageLibrarySection />

      {/* 6. Localização & Distâncias aos Pontos Principais (Sem Coordenadas) */}
      <LocationSection />

      {/* 7. Simulador com Valores Baixos Otimizados */}
      <CalculatorSection />

      {/* 8. Objeções & Prazos Camarários (3 a 6 meses) */}
      <ObjectionsSection />

      {/* 9. Formulário Direto "Quero ser contactado" (Integrado com Neon Postgres) */}
      <LeadForm />

      {/* 10. Pílula Flutuante Otimizada com Acabamento Glassmorphism */}
      <FloatingCTA />

      {/* 11. Rodapé */}
      <Footer />
    </main>
  );
}
