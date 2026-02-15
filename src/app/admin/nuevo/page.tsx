'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { categories } from '@/data/products';
import {
    ChevronLeft,
    Upload,
    Plus,
    LayoutDashboard,
    Settings,
    FolderOpen,
    Eye,
    LogOut,
    Info,
    Camera
} from 'lucide-react';

export default function NuevoObjetoPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        category: 'Muebles',
        year: '',
        origin: '',
        dimensions: '',
        material: '',
        provenance: '',
        description: '',
        status: 'Available' as const
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulación de guardado premium
        const btn = e.currentTarget.querySelector('button[type="submit"]');
        if (btn) btn.innerHTML = 'Catalogando...';

        setTimeout(() => {
            router.push('/admin/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#FDFCF9] flex overflow-hidden">
            {/* Sidebar - Curator Navigation */}
            <aside className="w-72 bg-charcoal text-parchment flex-shrink-0 flex flex-col border-r border-white/5">
                <div className="p-8 pt-12">
                    <h1 className="font-serif text-2xl tracking-[0.2em] font-light text-white">CASA</h1>
                    <h1 className="font-serif text-2xl tracking-[0.2em] font-bold text-sienna -mt-1">PELLEGRINI</h1>
                    <div className="mt-2 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-sienna animate-pulse" />
                        <p className="text-[10px] text-parchment/40 uppercase tracking-[0.3em]">Modo Curador</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 mt-8 space-y-1">
                    <Link href="/admin/dashboard" className="px-4 py-3 text-parchment/50 hover:text-white hover:bg-white/5 transition-all text-xs uppercase tracking-widest flex items-center gap-3">
                        <LayoutDashboard size={16} />
                        Inventario
                    </Link>
                    <div className="px-4 py-3 bg-sienna/10 border-l-2 border-sienna text-sienna font-medium text-xs uppercase tracking-widest flex items-center gap-3">
                        <Plus size={16} />
                        Catalogar Pieza
                    </div>
                    <a href="#" className="px-4 py-3 text-parchment/50 hover:text-white hover:bg-white/5 transition-all text-xs uppercase tracking-widest flex items-center gap-3">
                        <FolderOpen size={16} />
                        Colecciones
                    </a>
                </nav>

                <div className="p-8 space-y-4">
                    <Link href="/" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-parchment/30 hover:text-sienna transition-colors group">
                        <Eye size={12} />
                        Ver sitio público
                    </Link>
                    <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-red-400/50 hover:text-red-400 transition-colors">
                        <LogOut size={12} />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-24 bg-white border-b border-sand flex items-center justify-between px-12 sticky top-0 z-10">
                    <div className="flex items-center gap-6">
                        <Link href="/admin/dashboard" className="p-2 hover:bg-parchment rounded-full transition-colors text-charcoal/40 hover:text-charcoal mr-2">
                            <ChevronLeft size={24} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-serif text-charcoal italic">Nueva Adquisición</h2>
                            <p className="text-[10px] uppercase tracking-[0.1em] text-charcoal/40 font-medium">Registro detallado de pieza patrimonial</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Link href="/admin/dashboard" className="px-6 py-3 border border-sand hover:bg-parchment text-charcoal/60 uppercase tracking-widest text-[10px] font-bold rounded-lg transition-all">
                            Descartar
                        </Link>
                        <button
                            form="catalog-form"
                            type="submit"
                            className="bg-sienna hover:bg-[#b0360d] text-white px-8 py-3 rounded-lg uppercase tracking-widest text-[10px] font-bold transition-all shadow-xl shadow-sienna/20 active:scale-95"
                        >
                            Catalogar Pieza
                        </button>
                    </div>
                </header>

                <div className="p-12 max-w-6xl mx-auto">
                    <form id="catalog-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Left Column: Visual Assets */}
                        <div className="lg:col-span-5 space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-sienna flex items-center gap-2">
                                        <Camera size={14} />
                                        Registro Fotográfico
                                    </h3>
                                    <span className="text-[9px] text-charcoal/30 uppercase font-medium">Recomendado: 4:5 Aspect Ratio</span>
                                </div>
                                <div className="aspect-[4/5] bg-white border-2 border-dashed border-sand rounded-2xl flex flex-col items-center justify-center p-12 text-center group hover:border-sienna/40 transition-all cursor-pointer shadow-sm hover:shadow-xl hover:shadow-sienna/5">
                                    <div className="w-20 h-20 bg-parchment rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Upload className="text-charcoal/20 group-hover:text-sienna transition-colors" size={32} />
                                    </div>
                                    <p className="text-sm font-serif italic text-charcoal mb-2 font-medium">Arrastre la imagen principal</p>
                                    <p className="text-[10px] text-charcoal/30 uppercase tracking-widest leading-relaxed">Alta resolución (JPG, WEBP)<br />Máximo 10MB por archivo</p>
                                </div>

                                <div className="grid grid-cols-4 gap-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="aspect-square bg-white border border-sand rounded-xl flex items-center justify-center group hover:border-sienna/30 transition-all cursor-pointer overflow-hidden">
                                            <div className="w-8 h-8 rounded-full bg-parchment flex items-center justify-center text-charcoal/20 group-hover:text-sienna">
                                                <Plus size={16} />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="aspect-square border border-dashed border-sand rounded-xl flex items-center justify-center text-charcoal/20">
                                        <span className="text-xs uppercase font-bold tracking-tighter tracking-widest">Galería</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-sienna/5 border border-sienna/10 p-6 rounded-2xl flex gap-4">
                                <Info className="text-sienna flex-shrink-0" size={20} />
                                <p className="text-[11px] text-sienna/80 leading-relaxed font-medium italic">
                                    Las imágenes serán procesadas automáticamente para optimizar el tiempo de carga sin perder el detalle de la pátina y los grabados.
                                </p>
                            </div>
                        </div>

                        {/* Right Column: Curator's Data */}
                        <div className="lg:col-span-7 space-y-10">
                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-sand space-y-10">
                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-sienna">Detalles de la Obra</h3>

                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-1">Título de la Pieza</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-parchment/30 border-b border-sand py-4 px-2 outline-none focus:border-sienna transition-all text-xl font-serif italic"
                                            placeholder="Nombre descriptivo de la obra..."
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-1">Categoría</label>
                                            <select
                                                className="w-full bg-transparent border-b border-sand py-4 px-1 outline-none focus:border-sienna text-sm font-medium"
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            >
                                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-1">Estado de Inventario</label>
                                            <select
                                                className="w-full bg-transparent border-b border-sand py-4 px-1 outline-none focus:border-sienna text-sm font-medium"
                                                value={formData.status}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                            >
                                                <option value="Available">Disponible</option>
                                                <option value="Reserved">Reservado</option>
                                                <option value="Sold">Vendido</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-1">Época / Datación</label>
                                            <input
                                                type="text"
                                                className="w-full bg-transparent border-b border-sand py-4 px-1 outline-none focus:border-sienna text-sm font-serif italic"
                                                placeholder="Ej: Circa 1850"
                                                value={formData.year}
                                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-1">Origen Geográfico</label>
                                            <input
                                                type="text"
                                                className="w-full bg-transparent border-b border-sand py-4 px-1 outline-none focus:border-sienna text-sm font-serif italic"
                                                placeholder="Ej: Madrid, España"
                                                value={formData.origin}
                                                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-1">Dimensiones</label>
                                            <input
                                                type="text"
                                                className="w-full bg-transparent border-b border-sand py-4 px-1 outline-none focus:border-sienna text-sm"
                                                placeholder="Ej: 110 x 45 x 30 cm"
                                                value={formData.dimensions}
                                                onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-1">Materiales Principales</label>
                                            <input
                                                type="text"
                                                className="w-full bg-transparent border-b border-sand py-4 px-1 outline-none focus:border-sienna text-sm"
                                                placeholder="Ej: Madera de nogal, Bronce"
                                                value={formData.material}
                                                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-1">Procedencia e Historia (Opcional)</label>
                                        <textarea
                                            rows={2}
                                            className="w-full bg-transparent border-b border-sand py-4 px-1 outline-none focus:border-sienna text-sm resize-none font-serif italic"
                                            placeholder="Detalles sobre adquisiciones anteriores o relevancia histórica..."
                                            value={formData.provenance}
                                            onChange={(e) => setFormData({ ...formData, provenance: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-1">Descripción Curatorial para el Público</label>
                                        <textarea
                                            rows={5}
                                            required
                                            className="w-full bg-parchment/20 border-sand border p-4 rounded-xl outline-none focus:border-sienna text-sm leading-relaxed"
                                            placeholder="Redacte un texto que resalte la belleza y el valor de esta pieza..."
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
