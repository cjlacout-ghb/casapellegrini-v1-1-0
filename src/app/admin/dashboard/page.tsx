'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products as initialProducts, Product } from '@/data/products';

export default function AdminDashboard() {
    const [items, setItems] = useState<Product[]>(initialProducts);
    const [filter, setFilter] = useState('All');

    const handleDelete = (id: string) => {
        if (confirm('¿Está seguro de eliminar este ítem del inventario?')) {
            setItems(items.filter(p => p.id !== id));
        }
    };

    const toggleStatus = (id: string) => {
        setItems(items.map(p => {
            if (p.id === id) {
                const newStatus = p.status === 'Available' ? 'Reserved' : (p.status === 'Reserved' ? 'Sold' : 'Available');
                return { ...p, status: newStatus };
            }
            return p;
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-charcoal text-cream flex-shrink-0 hidden md:flex flex-col">
                <div className="p-8 border-b border-white/10">
                    <h1 className="font-serif text-xl tracking-widest font-bold">CASA PELLEGRINI</h1>
                    <p className="text-[10px] text-gold uppercase tracking-[0.2em] mt-1">Admin Panel</p>
                </div>

                <nav className="flex-1 p-6 space-y-2">
                    <a href="#" className="block px-4 py-3 bg-white/10 rounded-md text-sm uppercase tracking-widest text-gold font-bold">Inventario</a>
                    <a href="#" className="block px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-md text-sm uppercase tracking-widest transition-colors">Ventas</a>
                    <a href="#" className="block px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-md text-sm uppercase tracking-widest transition-colors">Configuración</a>
                </nav>

                <div className="p-6 border-t border-white/10">
                    <Link href="/" className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                        <span>← Volver al Sitio</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-serif text-charcoal">Gestión de Inventario</h2>
                        <p className="text-gray-500 text-sm mt-1">Administre el catálogo de antigüedades.</p>
                    </div>

                    <Link
                        href="/admin/nuevo"
                        className="bg-gold text-white px-6 py-3 uppercase tracking-widest text-xs font-bold hover:bg-charcoal transition-colors shadow-lg"
                    >
                        + Añadir Objeto
                    </Link>
                </div>

                {/* Filters & Search */}
                <div className="bg-white p-4 rounded-t-lg border-b border-gray-100 flex justify-between items-center shadow-sm">
                    <div className="flex gap-4">
                        <button onClick={() => setFilter('All')} className={`text-xs uppercase tracking-widest px-3 py-1 rounded-full ${filter === 'All' ? 'bg-charcoal text-white' : 'text-gray-500 hover:bg-gray-100'}`}>Todos</button>
                        <button onClick={() => setFilter('Available')} className={`text-xs uppercase tracking-widest px-3 py-1 rounded-full ${filter === 'Available' ? 'bg-green-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>Disponibles</button>
                        <button onClick={() => setFilter('Reserved')} className={`text-xs uppercase tracking-widest px-3 py-1 rounded-full ${filter === 'Reserved' ? 'bg-yellow-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>Reservados</button>
                        <button onClick={() => setFilter('Sold')} className={`text-xs uppercase tracking-widest px-3 py-1 rounded-full ${filter === 'Sold' ? 'bg-gray-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>Vendidos</button>
                    </div>
                    <input type="text" placeholder="Buscar por título..." className="text-sm border-b border-gray-300 focus:border-gold outline-none px-2 py-1 w-64" />
                </div>

                {/* Table */}
                <div className="bg-white shadow-sm rounded-b-lg overflow-hidden border border-gray-100">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-charcoal text-white text-xs uppercase tracking-widest">
                                <th className="p-4 w-24">Imagen</th>
                                <th className="p-4">Título / Categoría</th>
                                <th className="p-4">Año / Origen</th>
                                <th className="p-4">Estado</th>
                                <th className="p-4">Precio</th>
                                <th className="p-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {items.filter(i => filter === 'All' || i.status === filter).map((item) => (
                                <tr key={item.id} className="hover:bg-cream/30 group transition-colors">
                                    <td className="p-4">
                                        <div className="w-16 h-16 relative bg-gray-100 rounded overflow-hidden border border-gray-200">
                                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <h3 className="font-serif text-charcoal font-medium">{item.title}</h3>
                                        <span className="text-xs text-gold uppercase tracking-wider font-bold">{item.category}</span>
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">
                                        <div className="flex flex-col">
                                            <span>{item.year}</span>
                                            <span className="text-xs uppercase opacity-70">{item.origin}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => toggleStatus(item.id)}
                                            className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold border ${item.status === 'Available' ? 'bg-green-100 text-green-800 border-green-200' :
                                                item.status === 'Reserved' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                                    'bg-gray-100 text-gray-800 border-gray-200'
                                                }`}
                                        >
                                            {item.status}
                                        </button>
                                    </td>
                                    <td className="p-4 font-mono text-sm">{item.price}</td>
                                    <td className="p-4 text-right space-x-2">
                                        <button className="text-gray-400 hover:text-gold transition-colors" title="Editar">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-600 transition-colors" title="Eliminar">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {items.length === 0 && (
                        <div className="p-12 text-center text-gray-400">Inventario vacío.</div>
                    )}
                </div>
            </main>
        </div>
    );
}
