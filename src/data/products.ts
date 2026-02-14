export interface Product {
    id: string;
    title: string;
    category: string;
    price: string;
    image: string;
    status: 'Available' | 'Reserved' | 'Sold';
    year: string;
    origin: string;
    dimensions: string;
    description: string;
}

export const products: Product[] = [
    {
        id: '1',
        title: 'Mueble Luis XV Restaurado',
        category: 'Muebles',
        price: 'Consultar',
        image: 'https://placehold.co/800x1000/E5E0D8/1A1A1A?text=Mueble+Luis+XV',
        status: 'Available',
        year: 'c. 1750',
        origin: 'Francia',
        dimensions: '120cm x 85cm x 45cm',
        description: 'Impresionante cómoda de estilo Luis XV, realizada en madera de nogal con marquetería fina y bronces dorados originales. Restaurada conservando su pátina original.'
    },
    {
        id: '2',
        title: 'Reloj de Pie Grandfather',
        category: 'Relojes',
        price: 'Consultar',
        image: 'https://placehold.co/800x1000/E5E0D8/1A1A1A?text=Reloj+Grandfather',
        status: 'Available',
        year: 'c. 1890',
        origin: 'Inglaterra',
        dimensions: '210cm x 50cm x 30cm',
        description: 'Reloj de pie de caoba con incrustaciones, maquinaria de 8 días y sonería sobre campana. Esfera pintada a mano con fases lunares.'
    },
    {
        id: '3',
        title: 'Espejo Dorado Rococó',
        category: 'Espejos',
        price: 'Reservado',
        image: 'https://placehold.co/800x1000/E5E0D8/1A1A1A?text=Espejo+Rococo',
        status: 'Reserved',
        year: 'c. 1820',
        origin: 'Italia',
        dimensions: '150cm x 90cm',
        description: 'Gran espejo de estilo Rococó con marco de madera tallada y dorada al pan de oro. Luna original con ligero desgaste propio de la antigüedad.'
    },
    {
        id: '4',
        title: 'Jarrón de Porcelana Sevres',
        category: 'Arte',
        price: 'Consultar',
        image: 'https://placehold.co/800x1000/E5E0D8/1A1A1A?text=Jarron+Sevres',
        status: 'Available',
        year: 'c. 1860',
        origin: 'Francia',
        dimensions: '45cm alto',
        description: 'Exquisito jarrón de porcelana de Sevres con pintura central de escena galante y decoraciones en oro sobre fondo azul cobalto.'
    },
    {
        id: '5',
        title: 'Escritorio Bureau Plat',
        category: 'Muebles',
        price: 'Consultar',
        image: 'https://placehold.co/800x1000/E5E0D8/1A1A1A?text=Bureau+Plat',
        status: 'Available',
        year: 'c. 1900',
        origin: 'Francia',
        dimensions: '140cm x 75cm x 70cm',
        description: 'Escritorio plano de estilo Imperio en caoba con aplicaciones de bronce dorado y tapa de cuero verde con greca dorada.'
    },
    {
        id: '6',
        title: 'Pareja de Candelabros de Bronce',
        category: 'Iluminación',
        price: 'Vendido',
        image: 'https://placehold.co/800x1000/E5E0D8/1A1A1A?text=Candelabros',
        status: 'Sold',
        year: 'c. 1880',
        origin: 'Francia',
        dimensions: '55cm alto',
        description: 'Pareja de candelabros de cinco luces en bronce dorado y patinado, con figuras de querubines en la base.'
    }
];

export const categories = ['Muebles', 'Relojes', 'Arte', 'Iluminación', 'Espejos', 'Objetos'];
