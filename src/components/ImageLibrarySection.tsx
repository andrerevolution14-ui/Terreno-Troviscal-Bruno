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
  RotateCcw
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
            Galeria Fotográfica Completa • 6 Imagens Oficiais
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Explore Todos os Ângulos do Terreno
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto font-light">
            Clique em qualquer imagem para abrir em alta definição com zoom interativo e navegação direta.
          </p>
        </div>

        {/* Aesthetic Sequential Photo Grid (6 Fotos em Grade Perfeita 2x3 / 3x2) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {photos.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#072218] border border-emerald-400/20 hover:border-[#dfb15b]/70 cursor-pointer shadow-md transition-all duration-300 hover:-translate-y-1 aspect-[4/3] sm:aspect-[16/10]"
            >
              {/* Foto 100% limpa, sem texto por cima */}
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 420px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />

              {/* Ícone subtil no hover */}
              <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="h-4 w-4 text-[#dfb15b]" />
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
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-bold text-white">
                  Terreno no Troviscal • 50.000 € (Negociável)
                </span>
                <span className="text-xs text-[#dfb15b] font-bold">
                  ({photos.findIndex(p => p.id === selectedPhoto.id) + 1} de {photos.length})
                </span>
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
                  alt={selectedPhoto.alt}
                  fill
                  sizes="100vw"
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

          </div>
        </div>
      )}
    </section>
  );
}
