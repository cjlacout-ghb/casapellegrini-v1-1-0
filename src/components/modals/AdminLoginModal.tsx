'use client';

import React, { useState, useEffect } from 'react';
import { X, Key, User, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AdminLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Si ya está logueado, redirigir directo
            if (localStorage.getItem('admin_logged_in') === 'true') {
                router.push('/admin/dashboard');
                onClose();
                return;
            }
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = 'unset';
            setError(false);
            return () => clearTimeout(timer);
        }
    }, [isOpen, router, onClose]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(false);

        // Client-side validation using Env Vars for this implementation
        const validUser = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
        const validPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

        if (username === validUser && password === validPass) {
            // Guardar sesión persistente
            localStorage.setItem('admin_logged_in', 'true');

            // Success: Add a small delay for premium feel
            setTimeout(() => {
                onClose();
                router.push('/admin/dashboard');
            }, 800);
        } else {
            setTimeout(() => {
                setError(true);
                setIsLoading(false);
            }, 500);
        }
    };

    if (!isOpen && !isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div
                className={`relative w-full max-w-md bg-[#1A1311] border border-white/5 rounded-2xl shadow-2xl transition-all duration-300 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
                    }`}
                style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 text-white/40 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="p-8 pt-12 flex flex-col items-center">
                    {/* Key Icon Circle */}
                    <div className="relative mb-8">
                        <div className={`absolute inset-0 rounded-full blur-xl animate-pulse ${error ? 'bg-red-500/20' : 'bg-sienna/20'}`} />
                        <div className={`relative w-20 h-20 rounded-full border flex items-center justify-center bg-gradient-to-br transition-colors duration-500 ${error ? 'border-red-500/30 from-red-500/10' : 'border-sienna/30 from-sienna/10'} to-transparent`}>
                            <Key className={error ? 'text-red-500' : 'text-sienna'} size={32} />
                        </div>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-serif text-white uppercase tracking-wider mb-2">
                            Acceso Administrador
                        </h2>
                        <p className="text-white/40 text-sm font-light">
                            Gestión interna de Casa Pellegrini
                        </p>
                    </div>

                    {/* Form */}
                    <form className="w-full space-y-6" onSubmit={handleLogin}>
                        {/* Username */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] text-sienna font-bold ml-1">
                                Nombre de Usuario
                            </label>
                            <div className="relative group">
                                <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors ${error ? 'group-focus-within:text-red-500' : 'group-focus-within:text-sienna'}`}>
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Ingrese su usuario"
                                    required
                                    className={`w-full bg-black/40 border rounded-lg py-4 pl-12 pr-4 text-white font-serif placeholder:text-white/20 focus:outline-none focus:bg-black/60 transition-all ${error ? 'border-red-500/50' : 'border-white/10 focus:border-sienna/50'}`}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-sienna font-bold">
                                    Contraseña
                                </label>
                                <button type="button" className="text-[10px] uppercase tracking-[0.05em] text-white/30 hover:text-sienna transition-colors font-medium">
                                    ¿Olvidó su contraseña?
                                </button>
                            </div>
                            <div className="relative group">
                                <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors ${error ? 'group-focus-within:text-red-500' : 'group-focus-within:text-sienna'}`}>
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className={`w-full bg-black/40 border rounded-lg py-4 pl-12 pr-4 text-white font-serif placeholder:text-white/20 focus:outline-none focus:bg-black/60 transition-all ${error ? 'border-red-500/50' : 'border-white/10 focus:border-sienna/50'}`}
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="text-red-500 text-[10px] uppercase tracking-wider text-center animate-pulse">
                                Credenciales incorrectas. Intente nuevamente.
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-sienna hover:bg-[#b0360d] text-white rounded-lg py-5 px-4 font-serif text-lg tracking-wide flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-sienna/20 group uppercase ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
                        >
                            {isLoading ? 'Verificando...' : (
                                <>
                                    Iniciar Sesión
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer Security */}
                    <div className="mt-12 flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2 text-white/30 text-[10px] tracking-[0.15em] uppercase font-medium">
                            <ShieldCheck size={14} />
                            Conexión cifrada de alta seguridad
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-[1px] bg-white/10 mb-4" />
                            <div className="text-white/20 text-[11px] tracking-[0.4em] uppercase">
                                Casa Pellegrini
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginModal;
