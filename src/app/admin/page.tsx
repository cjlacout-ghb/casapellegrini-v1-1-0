'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const router = useRouter();

    useEffect(() => {
        // En una aplicación real, aquí verificaríamos cookies o tokens de sesión.
        // Dado el flujo actual del AdminLoginModal, si el usuario llega aquí sin estar logueado,
        // podríamos redirigirlo al home o mostrar un mensaje.

        // Por ahora, simplemente redirigimos al dashboard ya que el login lo maneja el modal.
        router.replace('/admin/dashboard');
    }, [router]);

    return (
        <div className="min-h-screen bg-charcoal flex items-center justify-center">
            <div className="animate-pulse text-parchment/50 font-serif tracking-[0.3em] uppercase text-xs">
                Cargando panel de gestión...
            </div>
        </div>
    );
}
