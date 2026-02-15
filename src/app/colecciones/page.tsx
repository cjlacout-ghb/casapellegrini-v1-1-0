import CollectionsGrid from "@/components/products/CollectionsGrid";

export default function ColeccionesPage() {
    return (
        <div className="min-h-screen bg-cream">
            <div className="pt-24 pb-12 px-6 lg:px-12 text-center border-b border-muted">
                <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">Nuestra Colección</h1>
                <p className="max-w-2xl mx-auto text-gray-600 font-light italic">
                    Piezas seleccionadas por su historia, belleza y autenticidad
                </p>
            </div>
            <CollectionsGrid />
        </div>
    );
}
