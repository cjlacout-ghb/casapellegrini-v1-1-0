'use client';

import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';

interface ProductGalleryProps {
    images: string[];
    title: string;
    status: 'Available' | 'Reserved' | 'Sold';
}

export default function ProductGallery({ images, title, status }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
    const [isZoomActive, setIsZoomActive] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Desactivar zoom al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event: globalThis.MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsZoomActive(false);
            }
        };

        if (isZoomActive) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isZoomActive]);

    const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
        if (!isZoomActive || !containerRef.current) return;

        const { left, top, width, height } = containerRef.current.getBoundingClientRect();

        // Calcular posición relativa del cursor (0 a 100)
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setZoomPos({ x, y });
    };

    const toggleZoom = (e: ReactMouseEvent) => {
        e.stopPropagation();
        setIsZoomActive(!isZoomActive);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Main Exhibition Viewer */}
            <div
                ref={containerRef}
                className={`relative aspect-[4/5] w-full bg-white border-museum shadow-museum overflow-hidden group transition-all duration-500 ${isZoomActive ? 'cursor-crosshair ring-2 ring-sienna ring-offset-4' : 'cursor-default'}`}
                onMouseMove={handleMouseMove}
            >
                {/* Labels de estado */}
                <div className="absolute top-6 left-6 z-30 flex flex-col gap-2">
                    <div className="glass-effect px-4 py-2 border border-taupe/30 text-[10px] uppercase tracking-widest shadow-sm rounded-sm flex items-center gap-3 text-charcoal/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-charcoal/30" />
                        {status === 'Available' ? 'Disponible' :
                            status === 'Reserved' ? 'Pieza Reservada' : 'Adquirida'}
                    </div>
                </div>

                {/* Base Image */}
                <Image
                    src={images[activeIndex]}
                    alt={`${title} - Vista ${activeIndex + 1}`}
                    fill
                    className={`object-cover transition-opacity duration-500 ${isZoomActive ? 'opacity-0' : 'opacity-100'}`}
                    priority
                />

                {/* Zoom Layer: High Detail Inspection */}
                {isZoomActive && (
                    <div
                        className="absolute inset-0 z-20 pointer-events-none"
                        style={{
                            backgroundImage: `url(${images[activeIndex]})`,
                            backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                            backgroundSize: '250%', // 2.5x Zoom para inspección técnica
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        {/* Indicador de zona de inspección */}
                        <div className="absolute inset-0 border-[20px] border-charcoal/5 pointer-events-none" />
                    </div>
                )}

                {/* Action Button - Toggle Magnifier */}
                <button
                    onClick={toggleZoom}
                    className={`absolute bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 z-40 border shadow-2xl group/btn ${isZoomActive
                        ? 'bg-sienna text-white border-sienna scale-110'
                        : 'bg-white/90 backdrop-blur-md text-charcoal border-taupe/20 hover:bg-sienna hover:text-white'
                        }`}
                    aria-label={isZoomActive ? "Desactivar Lupa" : "Activar Lupa de Inspección"}
                >
                    <Search size={24} className={`${isZoomActive ? 'scale-110' : 'group-hover/btn:scale-110'} transition-transform`} />

                    {/* Tooltip informativo */}
                    {!isZoomActive && (
                        <div className="absolute right-full mr-4 px-4 py-2 bg-charcoal text-white text-[9px] uppercase tracking-[0.2em] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-lg">
                            Activar Inspección Técnica
                        </div>
                    )}
                </button>

                {/* Instruction Tag when Active */}
                {isZoomActive && (
                    <div className="absolute bottom-6 left-6 z-40 bg-charcoal/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-xl animate-in fade-in slide-in-from-left-4 duration-500">
                        <span className="text-[9px] uppercase tracking-widest font-bold text-white">Modo Inspección Activo</span>
                    </div>
                )}

                {/* Subtle Gradiente Superior */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
            </div>

            {/* Thumbnails Ribbon */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setActiveIndex(idx);
                            setIsZoomActive(false); // Reset zoom when changing image
                        }}
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

                {/* Video Placeholder */}
                <div className="relative flex-shrink-0 w-32 aspect-square bg-taupe/5 border border-taupe/20 flex flex-col items-center justify-center gap-2 group cursor-not-allowed opacity-40 rounded-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-taupe group-hover:text-sienna transition-colors">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M10 8L16 12L10 16V8Z" fill="currentColor" />
                    </svg>
                    <span className="text-[8px] uppercase tracking-widest text-taupe">Análisis 360°</span>
                </div>
            </div>
        </div>
    );
}
