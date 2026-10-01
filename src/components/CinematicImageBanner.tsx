import React from 'react';
import Image from 'next/image';

interface CinematicImageBannerProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export default function CinematicImageBanner({ src, alt, priority = false }: CinematicImageBannerProps) {
  return (
    <div className="w-full py-4 sm:py-6 bg-[#092c22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/20">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className="object-cover object-center hover:scale-[1.01] transition-transform duration-700 ease-out"
          />
        </div>
      </div>
    </div>
  );
}
