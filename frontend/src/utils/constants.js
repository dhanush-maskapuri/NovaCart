export const APP_NAME = 'NOVACART';
export const APP_TAGLINE = "India's Smart Marketplace";

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const CURRENCY = '₹';

export const CATEGORIES = [
  'Mobiles',
  'Laptops',
  'Gaming',
  'TV & Appliances',
  'Audio',
  'Camera',
  'Fashion',
  'Men',
  'Women',
  'Kids',
  'Beauty & Skincare',
  'Groceries',
  'Vegetables & Fruits',
  'Dairy & Bakery',
  'Snacks & Drinks',
  'Home Essentials',
  'Kitchenware',
  'Furniture',
  'Sports & Outdoors',
  'Books & Stationeries',
  'Fitness & Gear',
  'Pet Care',
  'Automotive Accessories',
  'Travel & Luggage',
  'Fashion Accessories',
];

export const SERVICE_HUBS = [
  {
    id: 'novamart',
    name: 'NovaMart 10-Min',
    subtitle: 'Groceries & Essentials',
    icon: '⚡',
    badge: '10 MIN EXPRESS',
    description: 'Fresh fruits, vegetables, dairy, pulses, snacks & household essentials delivered at lightning speed.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    color: 'from-amber-500 to-emerald-600',
    tag: 'Hyperlocal Grocery',
  },
  {
    id: 'novatech',
    name: 'NovaTech Flagship',
    subtitle: 'Smartphones & Laptops',
    icon: '💻',
    badge: 'GST TAX INVOICE',
    description: 'Flagship smartphones, M3 MacBooks, OLED TVs, gaming rigs & wearables with official warranty.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    color: 'from-blue-600 to-indigo-700',
    tag: '100% Genuine Tech',
  },
  {
    id: 'novafashion',
    name: 'NovaFashion Hub',
    subtitle: 'Ethnic & Streetwear',
    icon: '👗',
    badge: 'NEW TRENDS',
    description: 'Lucknowi Chikankari, Silk Sarees, oversized hoodies, Nike sneakers & designer handbags.',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
    color: 'from-purple-600 to-pink-600',
    tag: 'Top Indian Labels',
  },
  {
    id: 'novahome',
    name: 'NovaHome Teak',
    subtitle: 'Furniture & Decor',
    icon: '🛋️',
    badge: 'FREE ASSEMBLY',
    description: 'Solid teakwood sofas, ambient smart lighting, ergonomic executive chairs & kitchenware.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    color: 'from-rose-500 to-orange-600',
    tag: 'Crafted in India',
  },
  {
    id: 'novacare',
    name: 'NovaCare Wellness',
    subtitle: 'Ayurveda & Beauty',
    icon: '🌿',
    badge: '100% AYURVEDIC',
    description: 'Kama Ayurveda Kumkumadi serums, organic protein powders, Minimalist Vitamin C & wellness care.',
    image: 'https://images.unsplash.com/photo-1512290900676-26c2a6a095ae?auto=format&fit=crop&w=800&q=80',
    color: 'from-teal-500 to-cyan-700',
    tag: 'Clean & Certified',
  },
];

export const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI (GPay / PhonePe / Paytm / BHIM VPA)', icon: '📱' },
  { id: 'card', label: 'Credit / Debit Card (RuPay / Visa / Mastercard)', icon: '💳' },
  { id: 'netbanking', label: 'Net Banking (HDFC, ICICI, SBI, Axis)', icon: '🏦' },
  { id: 'cod', label: 'Cash on Delivery (COD)', icon: '💵' },
];

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Delhi', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 
  'Telangana', 'Uttar Pradesh', 'West Bengal', 'Gujarat', 'Punjab', 'Kerala'
];

export const SEARCH_SUGGESTIONS = [
  'iPhone 15 Pro Titanium',
  'OnePlus 12R 5G',
  'Samsung Galaxy S24 Ultra',
  'Asus ROG Gaming Laptop',
  'boAt Soundbar 500W',
  'Organic Tattva Toor Dal',
  'Royal Oak Teakwood Sofa',
  'Kama Ayurveda Kumkumadi Serum',
  'Nike Air Max Running Shoes',
  'Prestige 3-Burner Gas Stove',
];
