'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface LibraryPhoto {
  id: number;
  src: string;
  title: string;
  tag: string;
  desc: string;
}

const photos: LibraryPhoto[] = [
  {
    id: 1,
    src: '/images/tras.png',
    title: 'Vista Ampla do Terreno & Relvado',
    tag: 'Foto 01 • Amplitude Total',
    desc: 'Perspectiva soalheira a partir do fundo do lote, evidenciando a cota plana, relvado cuidado e excelente exposição solar.'
  },
  {
    id: 2,
    src: '/images/frente.png',
    title: 'Frente Urbana com 38 Metros',
    tag: 'Foto 02 • Acesso Principal',
    desc: 'Vista frontal contínua de 38 metros ao longo da estrada pavimentada com eletricidade e iluminação pública.'
  },
  {
    id: 3,
    src: '/images/frente-direita.png',
    title: 'Perspectiva Angular & Topografia',
    tag: 'Foto 03 • Entrada Nivelada',
    desc: 'Cota de entrada suave e nivelada em relação à via, eliminando necessidades de rampas ou aterros complexos.'
  },
  {
    id: 4,
    src: '/images/lado-direita.png',
    title: 'Envolvente Residencial Consolidada',
    tag: 'Foto 04 • Vizinhança',
    desc: 'Área edificada calma e cuidada, com moradias unifamiliares modernas integradas em ambiente campestre e seguro.'
  },
  {
    id: 5,
    src: '/images/tras-direita.png',
    title: 'Extrema Posterior & Arvoredo',
    tag: 'Foto 05 • Privacidade Natural',
    desc: 'Resguardo posterior protegido por árvores autóctones, garantindo ar puro e privacidade total.'
  }
];

export default function ImageLibrarySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<LibraryPhoto | null>(null);
  const [scale, setScale] = useState(1);

  const openLightbox = (photo: LibraryPhoto) => {
    setSelectedPhoto(photo);
    setScale(1);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    setScale(1);
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[nextIndex]);
    setScale(1);
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[prevIndex]);
    setScale(1);
  };

  const zoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.35, 2.8));
  };

  const zoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.max(prev - 0.35, 1));
  };

  const resetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  return (
    <section id="galeria" className="py-12 sm:py-16 bg-[#092c22] text-white border-b border-[#dfb15b]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] uppercase tracking-wider text-[#dfb15b] font-bold block mb-1">
            Galeria Fotográfica Oficial
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Explore o Terreno em Alta Resolução
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto font-light">
            Clique em qualquer imagem para abrir em ecrã inteiro com zoom interativo e navegação entre todos os ângulos.
          </p>
        </div>

        {/* Aesthetic Sequential Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {photos.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className={`group relative rounded-2xl overflow-hidden bg-[#072218] border border-emerald-400/20 hover:border-[#dfb15b]/70 cursor-pointer shadow-md transition-all duration-300 hover:-translate-y-1 ${
                index === 0 ? 'col-span-2 md:col-span-2 aspect-[16/9]' : 'aspect-[4/3] sm:aspect-[16/10]'
              }`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Tag pill */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#dfb15b] border border-[#dfb15b]/30">
                {item.tag}
              </div>

              {/* Hover zoom indicator */}
              <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/65 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="h-4 w-4 text-[#dfb15b]" />
              </div>

              {/* Subtle hover gradient on bottom */}
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                <h3 className="text-xs sm:text-sm font-bold text-white drop-shadow-sm">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal with Zoom & Navigation */}
      {selectedPhoto && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full h-[92vh] flex flex-col bg-[#072218] rounded-2xl border border-[#dfb15b]/40 overflow-hidden shadow-2xl"
          >
            {/* Top Toolbar */}
            <div className="p-3 sm:p-4 bg-[#0d382c] border-b border-[#dfb15b]/20 flex items-center justify-between z-10">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#dfb15b] font-bold block">
                  {selectedPhoto.tag}
                </span>
                <h3 className="text-xs sm:text-base font-bold text-white truncate max-w-xs sm:max-w-md">
                  {selectedPhoto.title}
                </h3>
              </div>

              {/* Zoom & Action Controls */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={zoomIn}
                  className="h-8 px-2.5 rounded-lg bg-[#072218] border border-[#dfb15b]/30 text-white hover:bg-[#dfb15b] hover:text-[#072218] transition-colors flex items-center gap-1 text-xs cursor-pointer"
                  title="Aumentar Zoom (+)"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Zoom +</span>
                </button>

                <button
                  onClick={zoomOut}
                  className="h-8 px-2.5 rounded-lg bg-[#072218] border border-[#dfb15b]/30 text-white hover:bg-[#dfb15b] hover:text-[#072218] transition-colors flex items-center gap-1 text-xs cursor-pointer"
                  title="Diminuir Zoom (-)"
                >
                  <ZoomOut className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Zoom -</span>
                </button>

                <button
                  onClick={resetZoom}
                  className="h-8 px-2 rounded-lg bg-[#072218] border border-[#dfb15b]/30 text-white hover:bg-[#dfb15b] hover:text-[#072218] transition-colors flex items-center justify-center text-xs cursor-pointer"
                  title="Repor Escala (100%)"
                >
                  <RotateCcw className="h-3 w-3" />
                </button>

                <button
                  onClick={closeLightbox}
                  className="h-8 w-8 rounded-lg bg-[#072218] border border-[#dfb15b]/30 text-white hover:bg-red-600 transition-colors flex items-center justify-center cursor-pointer ml-2"
                  title="Fechar (Esc)"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Viewport with Zoom Container & Navigation Arrows */}
            <div className="relative flex-1 w-full bg-black/70 flex items-center justify-center overflow-auto p-2">
              <div 
                className="relative w-full h-full min-h-[350px] transition-transform duration-200 ease-out flex items-center justify-center"
                style={{ transform: `scale(${scale})` }}
              >
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Prev Arrow */}
              <button
                onClick={prevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-black/75 border border-[#dfb15b]/40 text-white hover:bg-[#dfb15b] hover:text-[#072218] flex items-center justify-center transition-all cursor-pointer shadow-lg"
                title="Foto anterior (←)"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Next Arrow */}
              <button
                onClick={nextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-black/75 border border-[#dfb15b]/40 text-white hover:bg-[#dfb15b] hover:text-[#072218] flex items-center justify-center transition-all cursor-pointer shadow-lg"
                title="Próxima foto (→)"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Footer with Description and Navigation Counter */}
            <div className="p-3 sm:p-4 bg-[#0d382c] border-t border-[#dfb15b]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <p className="text-emerald-100 text-center sm:text-left font-light max-w-2xl">
                {selectedPhoto.desc}
              </p>

              <div className="flex items-center gap-2 text-white font-bold text-xs shrink-0">
                <span className="text-[#dfb15b]">{photos.findIndex(p => p.id === selectedPhoto.id) + 1}</span>
                <span>/</span>
                <span>{photos.length}</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
