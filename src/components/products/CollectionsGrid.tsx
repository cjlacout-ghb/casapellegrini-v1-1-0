'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/data/products';
import { supabase } from '@/lib/supabase';

export default function CollectionsGrid() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [liveProducts, setLiveProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('items')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setLiveProducts(data || []);
        } catch (error: any) {
            console.error('Error fetching public products:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Usar únicamente los productos de la base de datos real
    const allProducts = liveProducts.map(p => ({
        id: p.id.toString(),
        title: p.name,
        category: p.category,
        price: p.price || 'Consultar',
        image: p.image_url,
        status: p.status,
        year: p.year,
        origin: p.origin,
        dimensions: p.dimensions,
        description: p.description,
        show_price: p.show_price
    }));

    const filteredProducts = allProducts.filter((product) => {
        const productCategory = product.category || '';
        const matchesCategory = selectedCategory ? (productCategory.toLowerCase() === selectedCategory.toLowerCase()) : true;
        const matchesSearch = (product.title || '').toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-parchment py-20 px-6 lg:px-24">

            {/* Minimalist Discovery Header */}
            <div className="max-w-7xl mx-auto mb-20">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-taupe/30 pb-10">
                    <div className="flex flex-wrap justify-center md:justify-start gap-8">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`text-xs uppercase tracking-museum transition-all duration-300 relative pb-1 ${selectedCategory === null ? 'text-sienna border-b border-sienna' : 'text-charcoal/60 hover:text-charcoal'
                                }`}
                        >
                            Ver Todo
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`text-xs uppercase tracking-museum transition-all duration-300 relative pb-1 ${selectedCategory === cat ? 'text-sienna border-b border-sienna' : 'text-charcoal/60 hover:text-charcoal'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-64 group">
                        <input
                            type="text"
                            placeholder="Buscar en la galería"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent border-b border-taupe/40 py-2 pr-8 text-sm focus:border-sienna outline-none transition-all duration-500 placeholder:text-taupe/60 italic font-light"
                        />
                        <svg
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-taupe/60 group-focus-within:text-sienna transition-colors duration-500 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <div className="mt-8">
                    <p className="text-[10px] uppercase tracking-museum text-taupe text-center md:text-left">
                        {isLoading ? 'Conectando con la base de datos...' : `Curaduría de ${filteredProducts.length} piezas excepcionales`}
                    </p>
                </div>
            </div>

            {/* Gallery Grid */}
            <main className="max-w-7xl mx-auto">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-6">
                        <div className="w-12 h-12 border-4 border-sand border-t-sienna rounded-full animate-spin"></div>
                        <p className="font-serif italic text-charcoal/40">Abriendo Galería...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                            {filteredProducts.map((product, index) => (
                                <Link
                                    key={product.id}
                                    href={`/colecciones/${product.id}`}
                                    className={`group block museum-hover ${index % 2 !== 0 ? 'md:mt-12' : ''}`}
                                >
                                    {/* Museum Box */}
                                    <div className="relative aspect-[4/5] bg-white overflow-hidden border-museum shadow-museum group-hover:shadow-museum-lg transition-all duration-700">
                                        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                            <div className="glass-effect px-3 py-1 border border-taupe/20 text-[9px] uppercase tracking-widest shadow-sm rounded-sm flex items-center gap-2 text-charcoal/60">
                                                <span className="w-1 h-1 rounded-full bg-charcoal/30" />
                                                {product.status === 'Available' ? 'Disponible' :
                                                    product.status === 'Reserved' ? 'Reservado' : 'Vendido'}
                                            </div>
                                        </div>
                                        <Image
                                            src={product.image || 'https://placehold.co/800x1000/E5E0D8/1A1A1A?text=Sin+Imagen'}
                                            alt={product.title || 'Sin título'}
                                            fill
                                            className="object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    </div>

                                    {/* Provenance & Title */}
                                    <div className="mt-8 space-y-3 px-2">
                                        <div className="flex items-center gap-3">
                                            <span className="h-px w-6 bg-sienna/40"></span>
                                            <span className="text-[10px] uppercase tracking-museum text-sienna font-medium">
                                                {product.category}
                                            </span>
                                        </div>
                                        <h3 className="font-serif text-2xl text-charcoal leading-tight group-hover:text-sienna transition-colors duration-500">
                                            {product.title}
                                        </h3>
                                        <div className="flex justify-between items-end pt-4 border-t border-taupe/20">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-taupe mb-1">Procedencia</p>
                                                <p className="text-xs text-charcoal/70 font-light italic">{product.year}</p>
                                            </div>
                                            <p className="text-sm font-serif text-sienna">
                                                {product.show_price ? product.price : 'Consultar precio'}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="py-40 text-center col-span-full">
                                <p className="font-serif text-2xl text-taupe italic">
                                    La búsqueda no ha revelado piezas en esta sección.
                                </p>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
