'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
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
    Eye,
    Loader2
} from 'lucide-react';

export default function AdminDashboard() {
    const router = useRouter();
    const [items, setItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('items')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setItems(data || []);
        } catch (error: any) {
            console.error('Error fetching items:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Está seguro de que desea eliminar esta pieza permanentemente?')) return;

        try {
            const { error } = await supabase
                .from('items')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setItems(items.filter(item => item.id !== id));
        } catch (error: any) {
            alert('Error al eliminar: ' + error.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_logged_in');
        router.push('/');
    };

    const toggleStatus = async (item: any) => {
        const nextStatus = item.status === 'Available' ? 'Reserved' : (item.status === 'Reserved' ? 'Sold' : 'Available');
        try {
            const { error } = await supabase
                .from('items')
                .update({ status: nextStatus })
                .eq('id', item.id);

            if (error) throw error;
            setItems(items.map(p => p.id === item.id ? { ...p, status: nextStatus } : p));
        } catch (error: any) {
            alert('Error al actualizar estado: ' + error.message);
        }
    };

    const filteredItems = items.filter(item => {
        const matchesFilter = filter === 'All' || item.status === filter;
        const itemName = item.name || '';
        const itemCategory = item.category || '';
        const matchesSearch = itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            itemCategory.toLowerCase().includes(searchQuery.toLowerCase());
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
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-red-400/50 hover:text-red-400 transition-colors group"
                    >
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
                        <h2 className="text-2xl font-serif text-charcoal italic leading-none">Gestión de Galería</h2>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 font-bold mt-2">Control Maestro de Inventario Patrimonial</p>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4 bg-parchment/50 px-6 py-3 rounded-xl border border-sand">
                            <Search size={16} className="text-charcoal/30" />
                            <input
                                type="text"
                                placeholder="Buscar en el catálogo..."
                                className="bg-transparent border-none outline-none text-xs uppercase tracking-widest w-48 placeholder:text-charcoal/20"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <Link
                            href="/admin/nuevo"
                            className="bg-sienna hover:bg-[#b0360d] text-white px-8 py-4 rounded-lg uppercase tracking-widest text-[10px] font-bold transition-all shadow-xl shadow-sienna/20 flex items-center gap-2 group active:scale-95"
                        >
                            <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                            Añadir Nueva Pieza
                        </Link>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-12 space-y-8">
                    {/* Filter Tabs */}
                    <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                            {['All', 'Available', 'Reserved', 'Sold'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-black transition-all ${filter === f
                                        ? 'bg-charcoal text-white shadow-lg'
                                        : 'bg-white text-charcoal/40 hover:text-charcoal border border-sand'
                                        }`}
                                >
                                    {f === 'All' ? 'Todo' : f === 'Available' ? 'Disponibles' : f === 'Reserved' ? 'Reservados' : 'Vendidos'}
                                </button>
                            ))}
                        </div>
                        <div className="text-[10px] uppercase tracking-widest font-bold text-charcoal/30">
                            {filteredItems.length} Objetos Encontrados
                        </div>
                    </div>

                    {/* Table View */}
                    <div className="bg-white rounded-2xl border border-sand shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-parchment/30 border-b border-sand">
                                    <th className="p-6 text-[10px] uppercase tracking-widest font-black text-charcoal/40 w-32">Imagen</th>
                                    <th className="p-6 text-[10px] uppercase tracking-widest font-black text-charcoal/40">Detalles de la Obra</th>
                                    <th className="p-6 text-[10px] uppercase tracking-widest font-black text-charcoal/40">Categoría</th>
                                    <th className="p-6 text-[10px] uppercase tracking-widest font-black text-charcoal/40">Estado</th>
                                    <th className="p-6 text-[10px] uppercase tracking-widest font-black text-charcoal/40 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sand">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={6} className="p-24 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <Loader2 className="animate-spin text-sienna" size={40} />
                                                <p className="text-sm font-serif italic text-charcoal/40">Recuperando catálogo...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredItems.length > 0 ? (
                                    filteredItems.map((item) => (
                                        <tr key={item.id} className="hover:bg-parchment/50 transition-colors group">
                                            <td className="p-6">
                                                <div className="w-20 h-24 relative bg-sand/30 rounded-lg overflow-hidden border border-sand group-hover:scale-105 transition-transform duration-500 shadow-sm">
                                                    <Image
                                                        src={item.image_url || 'https://placehold.co/800x1000/E5E0D8/1A1A1A?text=Sin+Imagen'}
                                                        alt={item.name || 'Sin título'}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <h3 className="font-serif text-charcoal font-medium text-lg leading-tight">{item.name}</h3>
                                                <p className="text-[10px] uppercase tracking-widest text-taupe mt-1 font-bold">{item.year || 'Época desconocida'}</p>
                                            </td>
                                            <td className="p-6">
                                                <span className="flex items-center gap-2 text-xs text-charcoal/60 uppercase tracking-widest font-medium">
                                                    <Package size={14} className="text-sienna/40" />
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="p-6">
                                                <button
                                                    onClick={() => toggleStatus(item)}
                                                    className={`px-4 py-1.5 rounded-full text-[9px] uppercase tracking-widest font-black transition-all border ${item.status === 'Available'
                                                        ? 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100'
                                                        : item.status === 'Reserved'
                                                            ? 'bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100'
                                                            : 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100'
                                                        }`}
                                                >
                                                    {item.status === 'Available' ? 'Disponible' : item.status === 'Reserved' ? 'Reservado' : 'Vendido'}
                                                </button>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex justify-end items-center gap-3">
                                                    <Link
                                                        href={`/admin/editar/${item.id}`}
                                                        className="p-3 text-taupe hover:text-charcoal hover:bg-white rounded-xl border border-transparent hover:border-sand transition-all shadow-sm shadow-transparent hover:shadow-xl"
                                                    >
                                                        <Edit3 size={16} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="p-3 text-taupe/40 hover:text-red-500 hover:bg-red-50 rounded-xl border border-transparent hover:border-red-100 transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="p-24 text-center">
                                            <div className="flex flex-col items-center gap-4 text-charcoal/20">
                                                <Search size={48} strokeWidth={1} />
                                                <p className="text-sm font-serif italic uppercase tracking-widest">No se encontraron piezas en esta categoría</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
