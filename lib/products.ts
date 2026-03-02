export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  features: string[];
  image: string;
  images?: string[];
  transparentImage?: string;
  inStock: boolean;
  leadTime: string;
  materials: string[];
  colors: string[];
}

export const COLOR_HEX: Record<string, string> = {
  'Red': '#EF4444',
  'Yellow': '#EAB308',
  'White': '#F5F5F5',
  'Black': '#1F2937',
  'Green': '#22C55E',
  'Cyan': '#06B6D4',
  'Wood': '#A0522D',
  'Marble': '#E8E0D8',
  'Brown Coffee': '#6F4E37',
  'Dark Brown': '#3E2723',
  'Pink Light': '#F9A8D4',
  'Pink': '#EC4899',
  'Dark Pink': '#BE185D',
  'Pastel Green': '#86EFAC',
};

export const products: Product[] = [
  {
    id: 'books-read-tracker',
    name: 'Books Read This Year Tracker',
    category: 'decorative',
    price: 9.99,
    description: 'Track your reading goals with this charming desk counter. Rotatable number dials let you update your count as you finish each book. Features miniature 3D book decorations.',
    features: ['Rotatable number dials', 'Miniature book details', 'Two-tone design', 'Desk or shelf display'],
    image: '/products/book-tracker-product.jpg',
    images: ['/products/book-tracker-product.jpg', '/products/book-tracker-lifestyle.jpg'],
    transparentImage: '/products/book-tracker-product-transparent.png',
    inStock: true,
    leadTime: '3-4 days',
    materials: ['PLA'],
    colors: ['Red', 'Yellow', 'White', 'Black', 'Green', 'Cyan', 'Wood', 'Marble', 'Brown Coffee', 'Dark Brown', 'Pink Light', 'Pink', 'Dark Pink', 'Pastel Green'],
  },
  {
    id: 'robot-watch-stand',
    name: 'Robot Apple Watch Charging Stand',
    category: 'functional',
    price: 9.99,
    description: 'Adorable robot character that holds your Apple Watch charger as its face. Your watch charges while sitting on this cute little buddy. A fun conversation starter for any desk.',
    features: ['Fits Apple Watch charger', 'Cute robot design', 'Cable management', 'Stable base'],
    image: '/products/robot-watch-stand-product.jpg',
    transparentImage: '/products/robot-watch-stand-product-transparent.png',
    inStock: true,
    leadTime: '2-3 days',
    materials: ['PLA'],
    colors: ['Red', 'Yellow', 'White', 'Black', 'Green', 'Cyan', 'Wood', 'Marble', 'Brown Coffee', 'Dark Brown', 'Pink Light', 'Pink', 'Dark Pink', 'Pastel Green'],
  },
  {
    id: 'ps5-controller-stand',
    name: 'PS5 DualSense Controller Stand',
    category: 'gaming',
    price: 9.99,
    description: 'Sleek stand for two PS5 DualSense controllers with PS5 branding and PlayStation logo. Black and white two-tone design perfectly matches your PS5 console. Keeps your controllers organized and your gaming setup clean.',
    features: ['Holds 2 controllers', 'PS5-inspired design', 'Two-tone black/white', 'Matches PS5 aesthetic'],
    image: '/products/ps5-tower-gaming.jpg',
    images: ['/products/ps5-tower-gaming.jpg', '/products/ps5-tower-with-console.jpg', '/products/ps5-tower-closeup.jpg'],
    transparentImage: '/products/ps5-tower-gaming-transparent.png',
    inStock: true,
    leadTime: '3-4 days',
    materials: ['PLA', 'PETG'],
    colors: ['Red', 'Yellow', 'White', 'Black', 'Green', 'Cyan', 'Wood', 'Marble', 'Brown Coffee', 'Dark Brown', 'Pink Light', 'Pink', 'Dark Pink', 'Pastel Green'],
  },
  {
    id: 'desk-organizer',
    name: 'Multi-Compartment Desk Organizer',
    category: 'functional',
    price: 9.99,
    description: 'Keep your desk tidy with this multi-compartment organizer. Holds remotes, glasses, coasters, phones, and everyday essentials in one clean spot. Perfect for living room coffee tables or home office desks.',
    features: ['Multiple compartments', 'Holds remotes, glasses & more', 'Stable flat base', 'Clean modern design'],
    image: '/products/desk-organizer-product.jpg',
    images: ['/products/desk-organizer-product.jpg', '/products/desk-organizer-2.jpg', '/products/desk-organizer-3.jpg'],
    transparentImage: '/products/desk-organizer-product-transparent.png',
    inStock: true,
    leadTime: '3-4 days',
    materials: ['PLA'],
    colors: ['Red', 'Yellow', 'White', 'Black', 'Green', 'Cyan', 'Wood', 'Marble', 'Brown Coffee', 'Dark Brown', 'Pink Light', 'Pink', 'Dark Pink', 'Pastel Green'],
  },
];
