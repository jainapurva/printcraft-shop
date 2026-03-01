export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  features: string[];
  image: string;
  images?: string[];
  inStock: boolean;
  leadTime: string;
  materials: string[];
}

export const products: Product[] = [
  {
    id: 'books-read-tracker',
    name: 'Books Read This Year Tracker',
    category: 'decorative',
    price: 24.99,
    description: 'Track your reading goals with this charming desk counter. Rotatable number dials let you update your count as you finish each book. Features miniature 3D book decorations.',
    features: ['Rotatable number dials', 'Miniature book details', 'Two-tone design', 'Desk or shelf display'],
    image: '/products/book-tracker-product.jpg',
    images: ['/products/book-tracker-product.jpg', '/products/book-tracker-lifestyle.jpg'],
    inStock: true,
    leadTime: '3-4 days',
    materials: ['PLA'],
  },
  {
    id: 'robot-watch-stand',
    name: 'Robot Apple Watch Charging Stand',
    category: 'functional',
    price: 19.99,
    description: 'Adorable robot character that holds your Apple Watch charger as its face. Your watch charges while sitting on this cute little buddy. A fun conversation starter for any desk.',
    features: ['Fits Apple Watch charger', 'Cute robot design', 'Cable management', 'Stable base'],
    image: '/products/robot-watch-stand-product.jpg',
    inStock: true,
    leadTime: '2-3 days',
    materials: ['PLA'],
  },
  {
    id: 'ps5-controller-stand',
    name: 'PS5 DualSense Controller Stand',
    category: 'gaming',
    price: 24.99,
    description: 'Sleek stand for two PS5 DualSense controllers with PS5 branding and PlayStation logo. Black and white two-tone design perfectly matches your PS5 console. Keeps your controllers organized and your gaming setup clean.',
    features: ['Holds 2 controllers', 'PS5-inspired design', 'Two-tone black/white', 'Matches PS5 aesthetic'],
    image: '/products/ps5-tower-gaming.jpg',
    images: ['/products/ps5-tower-gaming.jpg', '/products/ps5-tower-with-console.jpg', '/products/ps5-tower-closeup.jpg'],
    inStock: true,
    leadTime: '3-4 days',
    materials: ['PLA', 'PETG'],
  },
];
