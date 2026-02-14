export default function Footer() {
    return (
        <footer className="bg-charcoal text-parchment py-24 px-6 md:px-12 border-t border-taupe/10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
                <div className="space-y-8">
                    <h3 className="font-serif text-3xl tracking-widest uppercase text-parchment">CASA PELLEGRINI</h3>
                    <p className="font-light text-sm opacity-80 leading-relaxed max-w-xs mx-auto md:mx-0 italic">
                        Preservando la herencia cultural a través de la curaduría excepcional de antigüedades y objetos de arte.
                    </p>
                    <div className="flex justify-center md:justify-start gap-4">
                        <div className="h-px w-8 bg-sienna"></div>
                    </div>
                </div>

                <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-museum text-sienna mb-8">Navegación</h4>
                    <ul className="space-y-4 text-xs font-light tracking-widest uppercase opacity-80">
                        <li><a href="/colecciones" className="hover:text-sienna transition-colors">Catálogo Curado</a></li>
                        <li><a href="/colecciones?category=muebles" className="hover:text-sienna transition-colors">Muebles de Época</a></li>
                        <li><a href="/colecciones?category=arte" className="hover:text-sienna transition-colors">Galería de Arte</a></li>
                        <li><a href="/contacto" className="hover:text-sienna transition-colors">Solicitar Cita</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-museum text-sienna mb-8">Contacto & Ubicación</h4>
                    <div className="space-y-4 text-xs font-light tracking-widest uppercase opacity-80 text-parchment">
                        <p>Av. Alvear 1800, Recoleta</p>
                        <p>Buenos Aires, Argentina</p>
                        <p className="pt-4 font-medium">+54 11 4800 1234</p>
                        <a href="mailto:info@casapellegrini.com" className="block text-sienna pt-2 hover:text-white transition-colors">
                            info@casapellegrini.com
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-parchment/10 mt-24 pt-10 text-center text-[9px] opacity-40 uppercase tracking-[0.3em] text-parchment">
                &copy; {new Date().getFullYear()} Casa Pellegrini &bull; Patrimonio & Arte &bull; Todos los derechos reservados.
            </div>
        </footer>
    );
}
