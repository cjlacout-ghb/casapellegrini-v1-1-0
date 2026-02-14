'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const navLinks = [
        { name: 'Inicio', href: '/' },
        { name: 'Colecciones', href: '/colecciones' },
        { name: 'Contacto', href: '/contacto' },
    ];

    return (
        <nav className="w-full py-10 px-6 lg:px-24 flex justify-between items-center border-b border-taupe/10 bg-parchment/80 backdrop-blur-md sticky top-0 z-50">
            {/* Logo */}
            <div className="flex-1">
                <Link href="/" className="text-xl md:text-2xl font-serif tracking-[0.2em] font-bold text-sienna">
                    CASA PELLEGRINI
                </Link>
            </div>

            {/* Centered Links (Desktop) */}
            <div className="hidden md:flex gap-12 items-center justify-center flex-1">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-xs uppercase tracking-museum transition-all duration-300 relative pb-1 ${isActive ? 'text-sienna border-b border-sienna' : 'text-charcoal/60 hover:text-sienna'
                                }`}
                        >
                            {link.name}
                        </Link>
                    );
                })}
            </div>

            {/* Right Actions */}
            <div className="flex-1 flex justify-end gap-4 items-center">
                {/* Mobile Menu Icon Placeholder */}
                <button className="md:hidden text-charcoal p-2 border border-taupe/20 rounded-lg">
                    <span className="sr-only">Menu</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}
