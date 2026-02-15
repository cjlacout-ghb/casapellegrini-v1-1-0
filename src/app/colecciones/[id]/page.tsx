import { products } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductGallery from '@/components/products/ProductGallery';

export async function generateStaticParams() {
    return products.map(p => ({ id: p.id }));
}

export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const product = products.find(p => p.id === params.id);

    if (!product) return notFound();

    return (
        <div className="min-h-screen bg-parchment py-12 lg:py-24 px-6 lg:px-24">
            <div className="max-w-7xl mx-auto">

                {/* Back to Gallery Link */}
                <div className="mb-12">
                    <Link
                        href="/colecciones"
                        className="text-[10px] uppercase tracking-museum text-taupe hover:text-sienna transition-colors flex items-center gap-2"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Volver a la Galería
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                    {/* Primary Exhibition (Gallery) */}
                    <div className="lg:col-span-7 sticky top-32">
                        <ProductGallery
                            images={product.gallery || [product.image]}
                            title={product.title}
                            status={product.status}
                        />
                    </div>

                    {/* Curatorial Text & Inscription */}
                    <div className="lg:col-span-5 flex flex-col pt-4">
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="h-px w-8 bg-sienna"></span>
                                <span className="text-[11px] uppercase tracking-museum text-sienna font-bold">
                                    {product.category}
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-6xl font-serif text-charcoal mb-8 leading-[1.1]">
                                {product.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-[11px] uppercase tracking-museum text-taupe font-medium mb-12 border-b border-taupe/20 pb-8">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] text-taupe/60 tracking-widest">Época</span>
                                    <span className="text-charcoal">{product.year}</span>
                                </div>
                                <div className="flex flex-col gap-1 border-l border-taupe/20 pl-8">
                                    <span className="text-[9px] text-taupe/60 tracking-widest">Origen</span>
                                    <span className="text-charcoal">{product.origin}</span>
                                </div>
                                <div className="flex flex-col gap-1 border-l border-taupe/20 pl-8">
                                    <span className="text-[9px] text-taupe/60 tracking-widest">Referencia</span>
                                    <span className="text-charcoal">#{product.id.padStart(4, '0')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-stone max-w-none mb-16">
                            <p className="font-sans text-lg text-charcoal/80 font-light leading-relaxed mb-6 italic border-l-2 border-sienna/20 pl-6">
                                {product.description}
                            </p>
                            <p className="text-sm text-charcoal/60 font-light leading-loose">
                                Esta pieza representa un testimonio excepcional de la artesanía de su tiempo. Su conservación ha sido tratada con el máximo rigor histórico, preservando la pátina original que confiere a cada objeto su carácter único e irrepetible en el mercado del coleccionismo internacional.
                            </p>
                        </div>

                        {/* Condition & Technical Report */}
                        <div className="mb-16 p-8 bg-sand/30 border-museum">
                            <h3 className="font-serif text-xl text-charcoal mb-6 border-b border-taupe/20 pb-4">Informe de Conservación</h3>
                            <dl className="space-y-4">
                                <div className="flex justify-between items-end border-b border-taupe/10 pb-2">
                                    <dt className="text-[10px] uppercase tracking-museum text-taupe">Dimensiones</dt>
                                    <dd className="text-xs font-medium text-charcoal italic">{product.dimensions}</dd>
                                </div>
                                <div className="flex justify-between items-end border-b border-taupe/10 pb-2">
                                    <dt className="text-[10px] uppercase tracking-museum text-taupe">Estado</dt>
                                    <dd className="text-xs font-medium text-charcoal italic">Excelente / Restaurado</dd>
                                </div>
                                <div className="flex justify-between items-end border-b border-taupe/10 pb-2">
                                    <dt className="text-[10px] uppercase tracking-museum text-taupe">Materiales</dt>
                                    <dd className="text-xs font-medium text-charcoal italic">Madera Noble / Bronce Cincelado</dd>
                                </div>
                            </dl>
                        </div>

                        {/* Prestige Inquiry Section */}
                        <div className="space-y-4 sticky bottom-8 pt-8 bg-parchment/80 backdrop-blur-md">
                            <a
                                href={`https://wa.me/5491112345678?text=Hola, solicito información detallada sobre ${product.title} (Ref: #${product.id.padStart(4, '0')})`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-charcoal text-white text-center py-5 uppercase tracking-museum text-[11px] font-bold hover:bg-sienna transition-all duration-500 shadow-xl rounded-lg"
                            >
                                Solicitar Información de Pieza
                            </a>
                            <Link
                                href="/contacto"
                                className="block w-full border-museum text-charcoal text-center py-5 uppercase tracking-museum text-[11px] hover:bg-charcoal hover:text-white transition-all duration-500 rounded-lg"
                            >
                                Agendar Visita Privada
                            </Link>
                            <p className="text-[9px] text-center text-taupe uppercase tracking-widest pt-4">
                                Atención exclusiva bajo protocolos de galería
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
