export default function ContactoPage() {
    return (
        <div className="min-h-screen bg-cream py-16 px-6 lg:px-12 text-charcoal">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Contact Info */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-serif mb-8 text-charcoal">Contacto</h1>
                    <p className="font-light text-lg mb-12 max-w-md leading-relaxed">
                        Estamos a su disposición para consultas sobre piezas específicas, tasaciones o visitas a nuestra galería.
                    </p>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Visítenos</h3>
                            <p className="font-serif text-xl">Av. Alvear 1800</p>
                            <p className="font-light">C1129AAB, Buenos Aires, Argentina</p>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Horarios</h3>
                            <p className="font-light">Lunes a Viernes: 10:00 - 19:00</p>
                            <p className="font-light">Sábados: 10:00 - 14:00</p>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Contacto Directo</h3>
                            <p className="font-light block mb-1">Tel: +54 11 4800 1234</p>
                            <p className="font-light">Email: <a href="mailto:info@casapellegrini.com" className="text-gold hover:underline">info@casapellegrini.com</a></p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white p-8 md:p-12 border border-muted shadow-sm">
                    <h2 className="font-serif text-2xl mb-6">Envíenos un mensaje</h2>
                    {/* Reemplace 'YOUR_FORMSPREE_ID' con su ID real de Formspree */}
                    <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-xs uppercase tracking-widest mb-2 font-medium">Nombre Completo</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full border-b border-muted py-2 outline-none focus:border-gold transition-colors bg-transparent"
                                placeholder="Juan Pérez"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-xs uppercase tracking-widest mb-2 font-medium">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full border-b border-muted py-2 outline-none focus:border-gold transition-colors bg-transparent"
                                placeholder="juan@ejemplo.com"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-xs uppercase tracking-widest mb-2 font-medium">Teléfono (Opcional)</label>
                            <input
                                type="tel"
                                id="phone"
                                className="w-full border-b border-muted py-2 outline-none focus:border-gold transition-colors bg-transparent"
                                placeholder="+54 11 ..."
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-xs uppercase tracking-widest mb-2 font-medium">Mensaje</label>
                            <textarea
                                id="message"
                                rows={4}
                                className="w-full border-b border-muted py-2 outline-none focus:border-gold transition-colors bg-transparent resize-none"
                                placeholder="Estoy interesado en..."
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-charcoal text-cream py-4 uppercase tracking-widest text-sm hover:bg-gold transition-colors duration-300"
                        >
                            Enviar Mensaje
                        </button>
                    </form>
                </div>

            </div>

            {/* Map Placeholder */}
            <div className="max-w-7xl mx-auto mt-24 h-96 bg-muted relative grayscale hover:grayscale-0 transition-all duration-700">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.473586820353!2d-58.3908290847699!3d-34.58823598046342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccaa8c32d4315%3A0x67114227914856f6!2sAv.%20Alvear%201800%2C%20C1129AAB%20CABA%2C%20Argentina!5e0!3m2!1sen!2sus!4v1645000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="opacity-80"
                ></iframe>
            </div>
        </div>
    );
}
