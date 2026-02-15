'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products as initialProducts, Product } from '@/data/products';
import {
    FolderOpen,
    Plus,
    Search,
    Trash2,
    Edit3,
    LogOut,
    LayoutDashboard,
    Settings,
    Package,
    Eye
} from 'lucide-react';

export default function AdminDashboard() {
    const [items, setItems] = useState<Product[]>(initialProducts);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (id: string) => {
        if (confirm('¿Está seguro de eliminar este objeto del inventario? Esta acción no se puede deshacer.')) {
            setItems(items.filter(p => p.id !== id));
        }
    };

    const toggleStatus = (id: string) => {
        setItems(items.map(p => {
            if (p.id === id) {
                const nextStatus: Product['status'] = p.status === 'Available' ? 'Reserved' : (p.status === 'Reserved' ? 'Sold' : 'Available');
                return { ...p, status: nextStatus };
            }
            return p;
        }));
    };

    const filteredItems = items.filter(item => {
        const matchesFilter = filter === 'All' || item.status === filter;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#FDFCF9] flex overflow-hidden">
            {/* Sidebar - Curator Navigation */}
            <aside className="w-72 bg-charcoal text-parchment flex-shrink-0 flex flex-col border-r border-white/5">
                <div className="p-8 pt-12">
                    <h1 className="font-serif text-2xl tracking-[0.2em] font-bold text-sienna leading-tight uppercase">
                        CASA<br />PELLEGRINI
                    </h1>
                    <div className="mt-4 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-sienna animate-pulse" />
                        <p className="text-[10px] text-parchment/40 uppercase tracking-museum">Modo Curador</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 mt-8 space-y-1">
                    <div className="px-4 py-3 bg-sienna/10 border-l-2 border-sienna text-sienna font-medium text-xs uppercase tracking-widest flex items-center gap-3">
                        <LayoutDashboard size={16} />
                        Inventario
                    </div>
                    <a href="#" className="px-4 py-3 text-parchment/50 hover:text-white hover:bg-white/5 transition-all text-xs uppercase tracking-widest flex items-center gap-3">
                        <FolderOpen size={16} />
                        Colecciones
                    </a>
                    <a href="#" className="px-4 py-3 text-parchment/50 hover:text-white hover:bg-white/5 transition-all text-xs uppercase tracking-widest flex items-center gap-3">
                        <Settings size={16} />
                        Configuración
                    </a>
                </nav>

                <div className="p-8 space-y-4">
                    <Link href="/" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-parchment/30 hover:text-sienna transition-colors group">
                        <Eye size={12} className="group-hover:scale-110 transition-transform" />
                        Ver sitio público
                    </Link>
                    <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-red-400/50 hover:text-red-400 transition-colors group">
                        <LogOut size={12} />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen">
                {/* Header */}
                <header className="h-24 bg-white border-b border-sand flex items-center justify-between px-12 flex-shrink-0">
                    <div>
                        <h2 className="text-2xl font-serif text-charcoal italic">Gestión de Patrimonio</h2>
                        <p className="text-[10px] uppercase tracking-[0.1em] text-charcoal/40 font-medium">Inventario activo: {items.length} piezas</p>
                    </div>

                    <Link
                        href="/admin/nuevo"
                        className="bg-sienna hover:bg-[#b0360d] text-white px-8 py-4 rounded-lg uppercase tracking-widest text-[10px] font-bold transition-all shadow-xl shadow-sienna/20 flex items-center gap-2 group active:scale-95"
                    >
                        <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                        Añadir Nueva Pieza
                    </Link>
                </header>

                <div className="flex-1 overflow-y-auto p-12 space-y-8">
                    {/* Filters & Search */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 rounded-xl border border-sand shadow-sm">
                        <div className="flex bg-sand/30 p-1 rounded-lg">
                            {['All', 'Available', 'Reserved', 'Sold'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setFilter(s)}
                                    className={`px-4 py-2 rounded-md text-[10px] uppercase tracking-widest font-bold transition-all ${filter === s
                                        ? 'bg-charcoal text-white shadow-md'
                                        : 'text-charcoal/40 hover:text-charcoal'
                                        }`}
                                >
                                    {s === 'All' ? 'Todos' : s === 'Available' ? 'Disponibles' : s === 'Reserved' ? 'Reservados' : 'Vendidos'}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-96 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 group-focus-within:text-sienna transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Buscar en el catálogo..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-parchment/50 border border-sand focus:border-sienna/50 rounded-xl py-3 pl-12 pr-4 text-sm font-serif outline-none transition-all placeholder:text-charcoal/20"
                            />
                        </div>
                    </div>

                    {/* Table View */}
                    <div className="bg-white rounded-2xl border border-sand shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-charcoal text-parchment/70 text-[10px] uppercase tracking-[0.2em] font-bold">
                                    <th className="p-6 w-32">Vista Previa</th>
                                    <th className="p-6">Descripción de la Obra</th>
                                    <th className="p-6">Origen / Época</th>
                                    <th className="p-6">Disponibilidad</th>
                                    <th className="p-6">Valor</th>
                                    <th className="p-6 text-right">Gestión</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sand">
                                {filteredItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-parchment/50 transition-colors group">
                                        <td className="p-6">
                                            <div className="w-20 h-24 relative bg-sand/30 rounded-lg overflow-hidden border border-sand group-hover:scale-105 transition-transform duration-500 shadow-sm">
                                                <Image src={item.image} alt={item.title} fill className="object-cover" />
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <h3 className="font-serif text-charcoal font-medium text-lg leading-tight">{item.title}</h3>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Package size={12} className="text-sienna/60" />
                                                <span className="text-[10px] text-sienna uppercase tracking-widest font-bold">{item.category}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm font-serif text-charcoal/80 uppercase tracking-widest">{item.origin}</span>
                                                <span className="text-[10px] text-charcoal/40 font-medium italic">{item.year}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <button
                                                onClick={() => toggleStatus(item.id)}
                                                className={`px-4 py-1.5 rounded-full text-[9px] uppercase tracking-[0.15em] font-black border transition-all ${item.status === 'Available' ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' :
                                                    item.status === 'Reserved' ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' :
                                                        'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {item.status === 'Available' ? 'Disponible' : item.status === 'Reserved' ? 'Reservado' : 'Vendido'}
                                            </button>
                                        </td>
                                        <td className="p-6 font-serif text-charcoal/70 italic text-sm">{item.price}</td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform">
                                                <button className="p-2 text-charcoal/40 hover:text-sienna hover:bg-sienna/5 rounded-lg transition-all" title="Editar detalles">
                                                    <Edit3 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-2 text-charcoal/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Eliminar de la colección"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredItems.length === 0 && (
                            <div className="flex flex-col items-center justify-center p-24 text-center">
                                <Search className="text-sand mb-4" size={48} />
                                <h4 className="font-serif text-xl text-charcoal/30">Sin hallazgos</h4>
                                <p className="text-sm text-charcoal/20 mt-2 italic">Ajuste los términos de búsqueda o filtros de colección.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
