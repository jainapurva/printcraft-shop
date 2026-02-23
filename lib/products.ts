export interface Product {
  id: string;
  name: string;
  category: 'organizers' | 'cable-management' | 'decorative' | 'custom';
  price: number;
  description: string;
  features: string[];
  image: string;
  inStock: boolean;
  leadTime: string;
  materials: string[];
}

export const products: Product[] = [
  {
    id: 'desk-organizer-pro',
    name: 'Desk Organizer Pro',
    category: 'organizers',
    price: 24.99,
    description: 'Modular desk organizer with compartments for pens, scissors, sticky notes, and small gadgets. Stackable design for scalability.',
    features: ['6 compartments', 'Stackable design', 'Fits A4 paper slot', 'Non-slip base'],
    image: '/products/placeholder.svg',
    inStock: true,
    leadTime: '2-3 days',
    materials: ['PLA', 'PETG'],
  },
  {
    id: 'wall-shelf-organizer',
    name: 'Wall-Mount Shelf Organizer',
    category: 'organizers',
    price: 19.99,
    description: 'Clean wall-mounted organizer for keys, mail, sunglasses, and everyday items. Easy screw-mount installation.',
    features: ['3 hooks', '2 shelves', 'Wall-mount hardware included', 'Minimalist design'],
    image: '/products/placeholder.svg',
    inStock: true,
    leadTime: '2-3 days',
    materials: ['PLA', 'PETG'],
  },
  {
    id: 'drawer-divider-set',
    name: 'Drawer Divider Set (8 pieces)',
    category: 'organizers',
    price: 18.99,
    description: 'Customizable drawer dividers to keep your drawers neat. Interlocking pieces fit most standard drawer sizes.',
    features: ['8 pieces', 'Interlocking system', 'Adjustable layout', 'Fits 30-40cm drawers'],
    image: '/products/placeholder.svg',
    inStock: true,
    leadTime: '3-4 days',
    materials: ['PLA'],
  },
  {
    id: 'cable-clip-pack',
    name: 'Cable Clip Pack (12 pieces)',
    category: 'cable-management',
    price: 12.99,
    description: 'Self-adhesive cable clips to route and manage cables along desks, walls, or furniture. Multiple sizes included.',
    features: ['12 clips (3 sizes)', 'Self-adhesive 3M backing', 'Holds up to 3 cables each', 'Paintable surface'],
    image: '/products/placeholder.svg',
    inStock: true,
    leadTime: '1-2 days',
    materials: ['TPU', 'PLA'],
  },
  {
    id: 'cable-raceway',
    name: 'Under-Desk Cable Raceway',
    category: 'cable-management',
    price: 22.99,
    description: 'Under-desk cable management raceway to hide power strips and cable bundles. Mounts to any flat surface.',
    features: ['500mm length', 'Snap-on cover', 'Holds 8+ cables', 'Screw or adhesive mount'],
    image: '/products/placeholder.svg',
    inStock: true,
    leadTime: '2-3 days',
    materials: ['PETG'],
  },
  {
    id: 'monitor-cable-spine',
    name: 'Monitor Cable Spine',
    category: 'cable-management',
    price: 16.99,
    description: 'Articulated cable spine for monitor arms — keeps cables neatly routed and flexible as you adjust your monitor.',
    features: ['Articulated segments', 'Fits 4-6 cables', 'Clips to arm pole', 'Tool-free install'],
    image: '/products/placeholder.svg',
    inStock: true,
    leadTime: '2-3 days',
    materials: ['TPU', 'PLA'],
  },
  {
    id: 'geometric-vase',
    name: 'Geometric Vase',
    category: 'decorative',
    price: 29.99,
    description: 'Striking low-poly geometric vase — perfect for dried flowers or as a standalone decor piece. Available in multiple colors.',
    features: ['Waterproof coating', '18cm tall', 'Fits standard flower stems', 'Multiple color options'],
    image: '/products/placeholder.svg',
    inStock: true,
    leadTime: '3-4 days',
    materials: ['PLA', 'Resin'],
  },
  {
    id: 'wall-art-panel',
    name: 'Modular Wall Art Panel',
    category: 'decorative',
    price: 39.99,
    description: 'Interlocking hexagonal wall tiles to create custom wall art installations. Mix and match colors.',
    features: ['Set of 7 hexagons', 'Interlocking design', 'Wall-mount included', 'Custom color combos available'],
    image: '/products/placeholder.svg',
    inStock: true,
    leadTime: '4-5 days',
    materials: ['PLA'],
  },
  {
    id: 'planter-geometric',
    name: 'Geometric Planter',
    category: 'decorative',
    price: 21.99,
    description: 'Modern geometric planter with drainage hole and matching tray. Ideal for succulents and small plants.',
    features: ['Drainage hole + tray', '12cm pot size', 'UV-resistant material', 'Indoor/outdoor safe'],
    image: '/products/placeholder.svg',
    inStock: true,
    leadTime: '2-3 days',
    materials: ['PETG', 'ASA'],
  },
];

export const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'organizers', label: 'Organizers' },
  { id: 'cable-management', label: 'Cable Management' },
  { id: 'decorative', label: 'Decorative' },
];
