'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
    images: string[];
    title: string;
    status: 'Available' | 'Reserved' | 'Sold';
}

export default function ProductGallery({ images, title, status }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="flex flex-col gap-6">
            {/* Main Exhibition Viewer */}
            <div className="relative aspect-[4/5] w-full bg-white border-museum shadow-museum overflow-hidden group">
                {status !== 'Available' && (
                    <div className="absolute top-6 right-6 glass-effect px-4 py-2 border border-taupe/30 text-[10px] uppercase tracking-widest z-10 text-charcoal shadow-sm">
                        {status === 'Reserved' ? 'Pieza Reservada' : 'Adquirida'}
                    </div>
                )}

                <Image
                    src={images[activeIndex]}
                    alt={`${title} - Vista ${activeIndex + 1}`}
                    fill
                    className="object-cover transition-opacity duration-700 ease-in-out"
                    priority
                />

                {/* Subtle Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/5 to-transparent pointer-events-none" />

                {/* Zoom Action Button */}
                <button
                    className="absolute bottom-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-taupe/20 shadow-lg text-charcoal hover:bg-sienna hover:text-white transition-all duration-500 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                    aria-label="Ver en detalle"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21L16.65 16.65" strokeLinecap="round" />
                        <path d="M11 8V14M8 11H14" strokeLinecap="round" />
                    </svg>
                </button>
            </div>

            {/* Thumbnails Ribbon */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`relative flex-shrink-0 w-32 aspect-square transition-all duration-300 rounded-lg overflow-hidden p-0.5 ${activeIndex === idx
                                ? 'bg-sienna'
                                : 'bg-transparent opacity-60 hover:opacity-100'
                            }`}
                    >
                        <div className="relative w-full h-full rounded-[6px] overflow-hidden bg-white">
                            <Image
                                src={img}
                                alt={`${title} miniatura ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </button>
                ))}

                {/* Optional: Video/360 Placeholder as in reference */}
                <div className="relative flex-shrink-0 w-32 aspect-square bg-taupe/5 border border-taupe/20 flex flex-col items-center justify-center gap-2 group cursor-not-allowed opacity-40 rounded-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-taupe group-hover:text-sienna transition-colors">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M10 8L16 12L10 16V8Z" fill="currentColor" />
                    </svg>
                    <span className="text-[8px] uppercase tracking-widest text-taupe">Video</span>
                </div>
            </div>
        </div>
    );
}
