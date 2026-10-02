'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Eye
} from 'lucide-react';

interface LibraryPhoto {
  id: number;
  src: string;
  alt: string;
}

const photos: LibraryPhoto[] = [
  {
    id: 1,
    src: '/images/tras.webp',
    alt: 'Vista soalheira do terreno com relvado amplo'
  },
  {
    id: 2,
    src: '/images/frente.webp',
    alt: 'Frente urbana de 38 metros ao longo da via asfaltada'
  },
  {
    id: 3,
    src: '/images/frente-direita.webp',
    alt: 'Perspectiva angular da entrada e topografia plana'
  },
  {
    id: 4,
    src: '/images/lado-direita.webp',
    alt: 'Envolvente residencial consolidada e cota direta'
  },
  {
    id: 5,
    src: '/images/tras-direita.webp',
    alt: 'Extrema posterior com arvoredo e privacidade'
  },
  {
    id: 6,
    src: '/images/mapa.webp',
    alt: 'Planta de localização aérea oficial e implantação cadastral'
  }
];

export default function ImageLibrarySection() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [scale, setScale] = useState(1);

  // Referência para toque e swipe em mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Pré-carregamento imediato de todas as imagens em cache no momento da montagem
  useEffect(() => {
    photos.forEach((photo) => {
      const img = new window.Image();
      img.src = photo.src;
    });
  }, []);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setScale(1);
  };

  const closeLightbox = useCallback(() => {
    setCurrentIndex(null);
    setScale(1);
  }, []);

  const nextPhoto = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % photos.length;
    });
    setScale(1);
  }, []);

  const prevPhoto = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => {
      if (prev === null) return 0;
      return (prev - 1 + photos.length) % photos.length;
    });
    setScale(1);
  }, []);

  const zoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.min(prev + 0.4, 3.0));
  };

  const zoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.max(prev - 0.4, 1));
  };

  const resetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
  };

  // Suporte a teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === '+' || e.key === '=') setScale((prev) => Math.min(prev + 0.4, 3.0));
      if (e.key === '-' || e.key === '_') setScale((prev) => Math.max(prev - 0.4, 1));
      if (e.key === '0') setScale(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, closeLightbox, nextPhoto, prevPhoto]);

  // Gestos de toque para passar fotos rapidamente em telemóveis
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextPhoto();
    } else if (diff < -45) {
      prevPhoto();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const activePhoto = currentIndex !== null ? photos[currentIndex] : null;

  return (
    <section id="galeria" className="py-12 sm:py-16 bg-[#092c22] text-white border-b border-[#dfb15b]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] uppercase tracking-wider text-[#dfb15b] font-bold block mb-1">
            Galeria Fotográfica Completa • 6 Imagens Oficiais
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Explore Todos os Ângulos do Terreno
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto font-light">
            Clique em qualquer imagem para abrir em ecrã completo com carregamento ultrarrápido, zoom e transição instantânea.
          </p>
        </div>

        {/* Aesthetic Sequential Photo Grid (6 Fotos em Grade Perfeita 2x3 / 3x2) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {photos.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-2xl overflow-hidden bg-[#072218] border border-emerald-400/20 hover:border-[#dfb15b]/80 cursor-pointer shadow-md transition-all duration-200 hover:-translate-y-1 aspect-[4/3] sm:aspect-[16/10]"
            >
              {/* Foto com carregamento otimizado */}
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 420px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
                priority={index < 4}
                unoptimized
              />

              {/* Botão interativo no hover */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#072218]/90 text-[#dfb15b] text-xs font-bold shadow-lg border border-[#dfb15b]/40">
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Ver Foto</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal com Carregamento e Transição Ultrarrápidos */}
      {currentIndex !== null && activePhoto && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-5 animate-in fade-in duration-150 select-none"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full h-[94vh] flex flex-col bg-[#072218] rounded-2xl border border-[#dfb15b]/40 overflow-hidden shadow-2xl"
          >
            {/* Top Toolbar */}
            <div className="p-3 sm:p-4 bg-[#0d382c] border-b border-[#dfb15b]/20 flex items-center justify-between z-20 shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                  Terreno no Troviscal • 50.000 €
                </span>
                <span className="text-xs text-[#dfb15b] font-mono font-bold bg-[#072218] px-2 py-0.5 rounded-full border border-[#dfb15b]/30">
                  {currentIndex + 1} / {photos.length}
                </span>
              </div>

              {/* Zoom & Action Controls */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                <button
                  onClick={zoomIn}
                  className="h-8 px-2 rounded-lg bg-[#072218] border border-[#dfb15b]/30 text-white hover:bg-[#dfb15b] hover:text-[#072218] transition-colors flex items-center gap-1 text-xs cursor-pointer active:scale-95"
                  title="Aumentar Zoom (+)"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Zoom +</span>
                </button>

                <button
                  onClick={zoomOut}
                  className="h-8 px-2 rounded-lg bg-[#072218] border border-[#dfb15b]/30 text-white hover:bg-[#dfb15b] hover:text-[#072218] transition-colors flex items-center gap-1 text-xs cursor-pointer active:scale-95"
                  title="Diminuir Zoom (-)"
                >
                  <ZoomOut className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Zoom -</span>
                </button>

                {scale !== 1 && (
                  <button
                    onClick={resetZoom}
                    className="h-8 px-2 rounded-lg bg-[#072218] border border-[#dfb15b]/30 text-[#dfb15b] hover:bg-[#dfb15b] hover:text-[#072218] transition-colors flex items-center justify-center text-xs cursor-pointer"
                    title="Repor Escala (100%)"
                  >
                    <RotateCcw className="h-3 w-3" />
                  </button>
                )}

                <button
                  onClick={closeLightbox}
                  className="h-8 w-8 rounded-lg bg-[#072218] border border-[#dfb15b]/30 text-white hover:bg-red-600 transition-colors flex items-center justify-center cursor-pointer ml-1 active:scale-95"
                  title="Fechar (Esc)"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Viewport: Multi-Image Pre-Rendered Stack para Transição Instantânea (0ms de atraso) */}
            <div 
              className="relative flex-1 w-full bg-black/80 flex items-center justify-center overflow-hidden touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {photos.map((photo, index) => {
                const isSelected = index === currentIndex;
                return (
                  <div
                    key={photo.id}
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-150 ease-out ${
                      isSelected ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                    style={{
                      transform: isSelected ? `scale(${scale})` : 'scale(1)',
                      transition: 'opacity 120ms ease-out, transform 150ms ease-out',
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="100vw"
                      className="object-contain p-2 sm:p-4 select-none"
                      priority
                      unoptimized
                    />
                  </div>
                );
              })}

              {/* Botão Anterior */}
              <button
                onClick={prevPhoto}
                className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/75 border border-[#dfb15b]/50 text-white hover:bg-[#dfb15b] hover:text-[#072218] flex items-center justify-center transition-all cursor-pointer shadow-xl active:scale-90"
                title="Foto anterior (←)"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Botão Seguinte */}
              <button
                onClick={nextPhoto}
                className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/75 border border-[#dfb15b]/50 text-white hover:bg-[#dfb15b] hover:text-[#072218] flex items-center justify-center transition-all cursor-pointer shadow-xl active:scale-90"
                title="Próxima foto (→)"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Barra Inferior com Legenda e Faixa de Miniaturas (Mini-Strip para Seleção Imediata) */}
            <div className="p-2.5 sm:p-3 bg-[#0d382c] border-t border-[#dfb15b]/20 flex flex-col sm:flex-row items-center justify-between gap-2.5 z-20 shrink-0">
              <p className="text-[11px] sm:text-xs text-emerald-100 text-center sm:text-left truncate max-w-sm">
                {activePhoto.alt}
              </p>

              {/* Faixa de Miniaturas para passagem instantânea de fotos com 1 toque */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1">
                {photos.map((thumb, idx) => {
                  const isThumbActive = idx === currentIndex;
                  return (
                    <button
                      key={thumb.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setScale(1);
                      }}
                      className={`relative h-10 w-14 sm:h-11 sm:w-16 rounded-md overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        isThumbActive 
                          ? 'border-[#dfb15b] ring-2 ring-[#dfb15b]/60 scale-105' 
                          : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/50'
                      }`}
                      title={thumb.alt}
                    >
                      <Image
                        src={thumb.src}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover"
                        unoptimized
                      />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}

