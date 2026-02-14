import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-parchment">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden bg-parchment text-charcoal flex items-center justify-center">
        <div className="absolute inset-0 z-0 opacity-15">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-parchment via-transparent to-parchment/60" />
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6">
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="h-px w-12 bg-charcoal/20"></div>
            <span className="text-[10px] uppercase tracking-museum text-charcoal font-bold">Est. 1924</span>
            <div className="h-px w-12 bg-charcoal/20"></div>
          </div>

          <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 tracking-[0.2em] uppercase text-charcoal">
            CASA PELLEGRINI
          </h1>

          <p className="text-[10px] uppercase tracking-museum text-charcoal font-bold mb-12 opacity-90 max-w-3xl mx-auto">
            Un legado de belleza, historia y piezas únicas de colección
          </p>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <Link
              href="/colecciones"
              className="px-10 py-4 bg-sienna text-white hover:bg-white hover:text-charcoal transition-all duration-500 uppercase tracking-museum text-[11px] font-bold shadow-xl rounded-lg"
            >
              Explorar Galería
            </Link>
            <Link
              href="/contacto"
              className="px-10 py-4 border border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-white transition-all duration-500 uppercase tracking-museum text-[11px] rounded-lg"
            >
              Agendar Visita
            </Link>
          </div>
        </div>

      </section>

      {/* Featured Exhibition Section */}
      <section className="py-32 px-6 md:px-24 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <div className="flex justify-center items-center gap-3 mb-4">
            <span className="h-px w-6 bg-sienna/40"></span>
            <span className="text-sienna uppercase tracking-museum text-[10px] font-bold">Curaduría Destacada</span>
            <span className="h-px w-6 bg-sienna/40"></span>
          </div>
          <h2 className="text-5xl font-serif mt-4 text-charcoal">Piezas de Antología</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-32">
          {/* Mockup Items with Staggered Layout */}
          {[
            { id: 1, title: "Mueble Luis XV", year: "Siglo XVIII", category: "Mueblería" },
            { id: 2, title: "Reloj de Péndulo", year: "1820", category: "Relojería" },
            { id: 3, title: "Vaso de Cristal", year: "Art Nouveau", category: "Cristalería" }
          ].map((item, index) => (
            <div key={item.id} className={`group cursor-pointer museum-hover ${index % 2 !== 0 ? 'lg:mt-16' : ''}`}>
              <div className="relative aspect-[4/5] bg-white overflow-hidden mb-8 border-museum shadow-museum group-hover:shadow-museum-lg transition-all duration-700">
                <div className="w-full h-full bg-[gray] opacity-10 group-hover:scale-105 transition-transform duration-1000 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              <div className="space-y-3 px-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-museum text-sienna">{item.category}</span>
                </div>
                <h3 className="text-2xl font-serif text-charcoal group-hover:text-sienna transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-[10px] uppercase tracking-widest text-taupe">{item.year}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center">
          <Link href="/colecciones" className="inline-block border-b border-charcoal/20 pb-2 text-sm uppercase tracking-museum hover:text-sienna hover:border-sienna transition-all duration-300">
            Ver Colección Completa
          </Link>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-charcoal text-parchment py-32 px-6 md:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif mb-12 leading-relaxed italic">
            "La belleza de una pieza antigua no reside solo en su forma, sino en el eco de las historias que ha presenciado."
          </h2>
          <div className="w-12 h-px bg-sienna mx-auto"></div>
        </div>
      </section>
    </main>
  );
}
