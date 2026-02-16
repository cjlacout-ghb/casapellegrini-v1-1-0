'use client';

import { useState, useEffect, useRef, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { categories } from '@/data/products';
import { supabase } from '@/lib/supabase';
import {
    ChevronLeft,
    Upload,
    Plus,
    LayoutDashboard,
    FolderOpen,
    Eye,
    LogOut,
    Info,
    Camera,
    Loader2,
    Save
} from 'lucide-react';
import Image from 'next/image';

export default function EditarObjetoPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        category: 'Muebles',
        year: '',
        origin: '',
        dimensions: '',
        material: '',
        condition: 'Excelente / Restaurado',
        description: '',
        status: 'Available' as const,
        price: '',
        show_price: true
    });

    useEffect(() => {
        fetchItem();
    }, [params.id]);

    const fetchItem = async () => {
        try {
            const { data, error } = await supabase
                .from('items')
                .select('*')
                .eq('id', params.id)
                .single();

            if (error) throw error;
            if (data) {
                setFormData({
                    title: data.name || '',
                    category: data.category || 'Muebles',
                    year: data.year || '',
                    origin: data.origin || '',
                    dimensions: data.dimensions || '',
                    material: data.material || '',
                    condition: data.condition || 'Excelente / Restaurado',
                    description: data.description || '',
                    status: data.status || 'Available',
                    price: data.price || '',
                    show_price: data.show_price ?? true
                });
                setPreviewUrl(data.image_url);
                setOriginalImageUrl(data.image_url);
            }
        } catch (error: any) {
            console.error('Error fetching item:', error.message);
            alert('No se pudo encontrar la pieza.');
            router.push('/admin/dashboard');
        } finally {
            setIsLoading(false);
        }
    };

    const processFile = (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Por favor, suba un archivo de imagen válido.');
            return;
        }
        setImageFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            let finalImageUrl = originalImageUrl;

            // 1. Si hay una nueva imagen, subirla
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('inventario')
                    .upload(filePath, imageFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('inventario')
                    .getPublicUrl(filePath);

                finalImageUrl = publicUrl;
            }

            // 2. Actualizar en la base de datos
            const { error: dbError } = await supabase
                .from('items')
                .update({
                    name: formData.title,
                    description: formData.description,
                    category: formData.category,
                    image_url: finalImageUrl,
                    year: formData.year,
                    origin: formData.origin,
                    dimensions: formData.dimensions,
                    material: formData.material,
                    condition: formData.condition,
                    status: formData.status,
                    price: formData.price,
                    show_price: formData.show_price
                })
                .eq('id', params.id);

            if (dbError) throw dbError;

            router.push('/admin/dashboard');
            router.refresh();
        } catch (error: any) {
            console.error('Error:', error.message);
            alert('Error al actualizar: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_logged_in');
        router.push('/');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-parchment flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-sienna" size={40} />
                <p className="font-serif italic text-charcoal/60 uppercase tracking-widest text-[10px]">Cargando expediente...</p>
            </div>
        );
    }

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
                    <Link href="/admin/dashboard" className="px-4 py-3 text-parchment/50 hover:text-white hover:bg-white/5 transition-all text-xs uppercase tracking-widest flex items-center gap-3">
                        <LayoutDashboard size={16} />
                        Inventario
                    </Link>
                    <Link href="/admin/nuevo" className="px-4 py-3 text-parchment/50 hover:text-white hover:bg-white/5 transition-all text-xs uppercase tracking-widest flex items-center gap-3">
                        <Plus size={16} />
                        Catalogar Pieza
                    </Link>
                    <a href="#" className="px-4 py-3 text-parchment/50 hover:text-white hover:bg-white/5 transition-all text-xs uppercase tracking-widest flex items-center gap-3">
                        <FolderOpen size={16} />
                        Colecciones
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
            <main className="flex-1 overflow-y-auto">
                <header className="h-24 bg-white border-b border-sand flex items-center justify-between px-12 sticky top-0 z-10">
                    <div className="flex items-center gap-6">
                        <Link href="/admin/dashboard" className="p-2 hover:bg-parchment rounded-full transition-colors text-charcoal/40 hover:text-charcoal mr-2">
                            <ChevronLeft size={24} />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-serif text-charcoal italic">Editar Pieza</h2>
                            <p className="text-[10px] uppercase tracking-[0.1em] text-charcoal/40 font-medium">Actualización de registro patrimonial</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Link href="/admin/dashboard" className="px-6 py-3 border border-sand hover:bg-parchment text-charcoal/60 uppercase tracking-widest text-[10px] font-bold rounded-lg transition-all">
                            Cancelar
                        </Link>
                        <button
                            form="catalog-form"
                            type="submit"
                            disabled={isSaving}
                            className="bg-charcoal hover:bg-charcoal/90 text-white px-8 py-3 rounded-lg uppercase tracking-widest text-[10px] font-bold transition-all shadow-xl shadow-charcoal/20 active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <Save size={16} />
                                    Guardar Cambios
                                </>
                            )}
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
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`aspect-[4/5] bg-white border-2 border-dashed rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group transition-all cursor-pointer shadow-sm ${isDragging
                                        ? 'border-sienna bg-sienna/5 shadow-xl shadow-sienna/10'
                                        : 'border-sand hover:border-sienna/40 hover:shadow-xl hover:shadow-sienna/5'
                                        }`}
                                >
                                    {previewUrl ? (
                                        <>
                                            <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-center p-6">
                                                <div className="flex flex-col items-center gap-3">
                                                    <Upload className="text-white" size={32} />
                                                    <p className="text-white text-[10px] uppercase tracking-widest font-bold">Cambiar Fotografía</p>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center p-12 text-center">
                                            <div className="w-20 h-20 bg-parchment rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <Upload className="text-charcoal/20 group-hover:text-sienna transition-colors" size={32} />
                                            </div>
                                            <p className="text-sm font-serif italic text-charcoal mb-2 font-medium">Arrastre la imagen principal</p>
                                            <p className="text-[10px] text-charcoal/30 uppercase tracking-widest leading-relaxed">Alta resolución (JPG, WEBP)<br />Máximo 10MB por archivo</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            <div className="bg-sienna/5 border border-sienna/10 p-6 rounded-2xl flex gap-4">
                                <Info className="text-sienna flex-shrink-0" size={20} />
                                <p className="text-[11px] text-sienna/80 leading-relaxed font-medium italic">
                                    Si desea cambiar la fotografía, simplemente arrastre una nueva sobre la actual o haga clic para seleccionar un archivo.
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

                                    <div className="grid grid-cols-2 gap-8 items-end">
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-1">Valor / Precio (Opcional)</label>
                                            <input
                                                type="text"
                                                className="w-full bg-transparent border-b border-sand py-4 px-1 outline-none focus:border-sienna text-sm font-serif italic"
                                                placeholder="Ej: 1.200"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex items-center gap-4 py-4 px-2 bg-parchment/30 rounded-lg border border-sand/30">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] uppercase tracking-widest text-charcoal/60 font-bold">Visibilidad</span>
                                                <span className="text-[8px] text-charcoal/40 italic">{formData.show_price ? 'Mostrar Precio' : 'Mostrar "Consultar"'}</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, show_price: !formData.show_price })}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${formData.show_price ? 'bg-sienna' : 'bg-taupe/40'}`}
                                            >
                                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.show_price ? 'translate-x-6' : 'translate-x-1'}`} />
                                            </button>
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

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-1">País de Origen</label>
                                            <input
                                                type="text"
                                                className="w-full bg-transparent border-b border-sand py-4 px-1 outline-none focus:border-sienna text-sm"
                                                placeholder="Ej: Francia, Italia..."
                                                value={formData.origin}
                                                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-1">Estado de Conservación</label>
                                            <input
                                                type="text"
                                                className="w-full bg-transparent border-b border-sand py-4 px-1 outline-none focus:border-sienna text-sm font-serif italic"
                                                placeholder="Ej: Excelente / Restaurado"
                                                value={formData.condition}
                                                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                                            />
                                        </div>
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
