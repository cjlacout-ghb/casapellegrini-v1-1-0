'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = () => {
            const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true';

            if (!isLoggedIn) {
                // Si no está logueado, redirigir al home (donde está el modal)
                router.push('/');
            } else {
                setIsAuthorized(true);
            }
        };

        checkAuth();
    }, [router]);

    if (isAuthorized === null) {
        return (
            <div className="min-h-screen bg-parchment flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-sienna" size={40} />
                <p className="font-serif italic text-charcoal/60 uppercase tracking-widest text-[10px]">
                    Verificando Credenciales...
                </p>
            </div>
        );
    }

    return (
        <div className="admin-root">
            {children}
        </div>
    );
}
