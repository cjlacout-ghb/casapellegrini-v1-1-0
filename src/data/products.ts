export interface Product {
    id: string;
    title: string;
    category: string;
    price: string;
    image: string;
    gallery: string[];
    status: 'Available' | 'Reserved' | 'Sold';
    year: string;
    origin: string;
    dimensions: string;
    description: string;
}

export const products: Product[] = [];

export const categories = [
    'Muebles',
    'Relojes',
    'Arte',
    'Iluminación',
    'Espejos',
    'Objetos'
];
