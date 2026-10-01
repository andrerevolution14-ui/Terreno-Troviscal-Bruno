'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X, ChevronLeft, ChevronRight, CalendarCheck } from 'lucide-react';

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  tag: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: '/images/frente.png',
    title: 'Frente Urbana (38m)',
    tag: 'Acesso Principal',
    description: 'Extensão linear ao longo da via asfaltada com eletricidade e iluminação pública.'
  },
  {
    id: 2,
    src: '/images/frente-direita.png',
    title: 'Topografia Plana',
    tag: 'Cota Direta',
    description: 'Entrada suave sem declives, permitindo obra mais rápida e económica.'
  },
  {
    id: 3,
    src: '/images/lado-direita.png',
    title: 'Envolvente Residencial',
    tag: 'Área Consolidada',
    description: 'Zona tranquila com moradias unifamiliares modernas no Troviscal.'
  },
  {
    id: 4,
    src: '/images/tras.png',
    title: 'Profundidade do Lote',
    tag: 'Orientação Solar',
    description: 'Ampla profundidade para jardim privativo, piscina e exposição solar favorável.'
  },
  {
    id: 5,
    src: '/images/tras-direita.png',
    title: 'Extrema Posterior',
    tag: 'Privacidade',
    description: 'Resguardo natural circundante, ar puro e sossego constante.'
  },
  {
    id: 6,
    src: '/images/mapa.png',
    title: 'Planta Cadastral',
    tag: 'Documentação',
    description: 'Morfologia regular com os 38m de frente e 1.474,50 m² delimitados.'
  }
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const openLightbox = (item: GalleryItem) => setSelectedImage(item);
  const closeLightbox = () => setSelectedImage(null);

  const nextImage = () => {
    if (!selectedImage) return;
    const currentIndex = galleryItems.findIndex(i => i.id === selectedImage.id);
    const nextIdx = (currentIndex + 1) % galleryItems.length;
    setSelectedImage(galleryItems[nextIdx]);
  };

  const prevImage = () => {
    if (!selectedImage) return;
    const currentIndex = galleryItems.findIndex(i => i.id === selectedImage.id);
    const prevIdx = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    setSelectedImage(galleryItems[prevIdx]);
  };

  const scrollToForm = () => {
    const el = document.getElementById('formulario');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="galeria" className="py-12 sm:py-16 bg-[#062319] text-[#fcf9f2] border-b border-[#c5a869]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] uppercase tracking-wider text-[#c5a869] font-bold block mb-1">
            Fotografias Reais
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Perspectiva Cinematográfica do Terreno
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#d1e0d7] max-w-xl mx-auto">
            Imagens sem filtros ou textos à frente. Veja a cota real e as condições do espaço.
          </p>
        </div>

        {/* Gallery Grid: Grid de 2 no mobile! 3 no desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className="group bg-[#03150e] rounded-xl overflow-hidden border border-[#c5a869]/20 hover:border-[#c5a869]/60 cursor-pointer shadow-md transition-all flex flex-col"
            >
              {/* Imagem 100% limpa, cinematográfica */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* Legenda fora da imagem (por baixo) */}
              <div className="p-2.5 sm:p-4 bg-[#092e21]/70">
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#c5a869] block">
                  {item.tag}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-white mt-0.5 line-clamp-1">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery CTA */}
        <div className="mt-8 text-center">
          <button
            onClick={scrollToForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-[#062319] bg-[#c5a869] hover:bg-[#dfc282] shadow-md transition-all cursor-pointer"
          >
            <CalendarCheck className="h-4 w-4" />
            <span>Marcar Visita ao Terreno</span>
          </button>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full max-h-[92vh] flex flex-col bg-[#062319] rounded-2xl border border-[#c5a869]/40 overflow-hidden shadow-2xl">
            
            {/* Header */}
            <div className="p-3 sm:p-4 flex items-center justify-between border-b border-[#c5a869]/20 bg-[#03150e]">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#c5a869] font-bold">
                  {selectedImage.tag}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {selectedImage.title}
                </h3>
              </div>
              <button
                onClick={closeLightbox}
                className="h-8 w-8 rounded-full bg-[#062319] border border-[#c5a869]/30 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Viewport */}
            <div className="relative flex-1 min-h-[300px] sm:min-h-[480px] w-full bg-black/50 flex items-center justify-center">
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                className="object-contain p-2"
                priority
              />

              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/70 text-white flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/70 text-white flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Footer */}
            <div className="p-3 sm:p-4 bg-[#03150e] border-t border-[#c5a869]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-[#d1e0d7] text-center sm:text-left">
                {selectedImage.description}
              </p>
              <button
                onClick={() => {
                  closeLightbox();
                  scrollToForm();
                }}
                className="w-full sm:w-auto px-6 py-2 rounded-full text-xs uppercase font-bold text-[#062319] bg-[#c5a869] hover:bg-[#dfc282] cursor-pointer"
              >
                Marcar Visita
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
