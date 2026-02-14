'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { categories } from '@/data/products';

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
        status: 'Available'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Objeto guardado exitosamente (Simulación)');
        router.push('/admin/dashboard');
    };

    return (
        <div className="min-h-screen bg-cream flex">
            {/* Sidebar - Consistent with Admin Dashboard */}
            <aside className="w-64 bg-charcoal text-cream flex-shrink-0 hidden md:flex flex-col sticky top-0 h-screen">
                <div className="p-8 border-b border-white/10">
                    <Link href="/admin/dashboard" className="font-serif text-xl tracking-widest font-bold block">CASA PELLEGRINI</Link>
                    <p className="text-[10px] text-gold uppercase tracking-[0.2em] mt-1">Admin Panel</p>
                </div>

                <nav className="flex-1 p-6 space-y-2">
                    <Link href="/admin/dashboard" className="block px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-md text-sm uppercase tracking-widest transition-colors">Inventario</Link>
                    <Link href="/admin/nuevo" className="block px-4 py-3 bg-white/10 rounded-md text-sm uppercase tracking-widest text-gold font-bold">Añadir Objeto</Link>
                </nav>

                <div className="p-6 border-t border-white/10">
                    <Link href="/admin/dashboard" className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                        <span>← Volver al Panel</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 md:p-12 overflow-y-auto max-w-5xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-serif text-charcoal">Catalogar Nueva Pieza</h1>
                    <p className="text-gray-500 mt-2">Complete la información técnica y suba las imágenes de alta calidad.</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Left Column: Image Uploader Placeholder */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gold">Imágenes del Objeto</h3>
                        <div className="border-2 border-dashed border-taupe bg-white aspect-[4/5] flex flex-col items-center justify-center p-8 text-center group hover:border-gold transition-colors cursor-pointer rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-taupe group-hover:text-gold mb-4 transition-colors">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <p className="text-sm font-medium text-charcoal">Arrastre las imágenes aquí</p>
                            <p className="text-xs text-gray-400 mt-2 uppercase tracking-tight">Formatos: JPG, PNG, WEBP (Máx. 5MB)</p>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="aspect-square bg-gray-100 rounded border border-muted"></div>
                            ))}
                            <div className="aspect-square bg-gray-50 flex items-center justify-center border border-dashed border-muted rounded">
                                <span className="text-xl text-gray-300">+</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Technical Specs Form */}
                    <div className="space-y-8 bg-white p-8 border border-muted shadow-sm rounded-lg">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gold">Especificaciones Técnicas</h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Título de la Pieza</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full border-b border-muted py-2 outline-none focus:border-gold transition-colors bg-transparent text-lg font-serif"
                                    placeholder="Ej: Reloj de Pared Estilo Regency"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Categoría</label>
                                    <select
                                        className="w-full border-b border-muted py-2 outline-none focus:border-gold bg-transparent text-sm"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Estado</label>
                                    <select
                                        className="w-full border-b border-muted py-2 outline-none focus:border-gold bg-transparent text-sm"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="Available">Disponible</option>
                                        <option value="Reserved">Reservado</option>
                                        <option value="Sold">Vendido</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Época / Año</label>
                                    <input
                                        type="text"
                                        className="w-full border-b border-muted py-2 outline-none focus:border-gold bg-transparent text-sm"
                                        placeholder="c. 1880"
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Origen</label>
                                    <input
                                        type="text"
                                        className="w-full border-b border-muted py-2 outline-none focus:border-gold bg-transparent text-sm"
                                        placeholder="Francia / Inglaterra"
                                        value={formData.origin}
                                        onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Dimensiones</label>
                                    <input
                                        type="text"
                                        className="w-full border-b border-muted py-2 outline-none focus:border-gold bg-transparent text-sm"
                                        placeholder="120 x 80 cm"
                                        value={formData.dimensions}
                                        onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Materiales</label>
                                    <input
                                        type="text"
                                        className="w-full border-b border-muted py-2 outline-none focus:border-gold bg-transparent text-sm"
                                        placeholder="Oro de ley, Caoba..."
                                        value={formData.material}
                                        onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Procedencia / Historia</label>
                                <textarea
                                    rows={2}
                                    className="w-full border-b border-muted py-2 outline-none focus:border-gold bg-transparent text-sm resize-none"
                                    placeholder="Detalles sobre el origen de la pieza..."
                                    value={formData.provenance}
                                    onChange={(e) => setFormData({ ...formData, provenance: e.target.value })}
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Descripción Curatorial</label>
                                <textarea
                                    rows={4}
                                    required
                                    className="w-full border-b border-muted py-2 outline-none focus:border-gold bg-transparent text-sm resize-none"
                                    placeholder="Describa la pieza en detalle para el público..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>
                        </div>

                        <div className="pt-4 flex gap-4">
                            <Link
                                href="/admin/dashboard"
                                className="flex-1 border border-charcoal text-charcoal py-4 text-center text-xs uppercase tracking-widest hover:bg-charcoal hover:text-white transition-all"
                            >
                                Cancelar
                            </Link>
                            <button
                                type="submit"
                                className="flex-1 bg-gold text-white py-4 text-center text-xs uppercase tracking-widest font-bold hover:bg-charcoal transition-all shadow-lg shadow-gold/20"
                            >
                                Guardar Pieza
                            </button>
                        </div>
                    </div>

                </form>
            </main>
        </div>
    );
}
