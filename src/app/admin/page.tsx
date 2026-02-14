'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            router.push('/admin/dashboard');
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('https://placehold.co/1920x1080/1a1a1a/FFF?text=Casa+Pellegrini')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>

            <div className="relative z-10 w-full max-w-md bg-cream p-12 shadow-2xl border border-charcoal/20">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-serif tracking-widest text-charcoal font-bold mb-2">CASA PELLEGRINI</h1>
                    <p className="text-xs text-gold uppercase tracking-[0.2em]">Panel de Administración</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Usuario</label>
                        <input
                            type="text"
                            className="w-full bg-transparent border-b border-gray-300 focus:border-gold outline-none py-2 transition-colors"
                            placeholder="admin"
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Contraseña</label>
                        <input
                            type="password"
                            className="w-full bg-transparent border-b border-gray-300 focus:border-gold outline-none py-2 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-charcoal text-white py-3 mt-4 uppercase tracking-widest text-sm hover:bg-gold transition-colors duration-300 disabled:opacity-50"
                    >
                        {loading ? 'Ingresando...' : 'Acceder'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <a href="/" className="text-xs text-gray-400 hover:text-charcoal transition-colors underline">Volver al sitio público</a>
                </div>
            </div>
        </div>
    );
}
