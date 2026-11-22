import type {
  DigitalService,
  ElectronicsOrder,
  Product,
  SavedAddress,
  ServiceCategory,
  ServiceDocumentReq,
  ServiceRequestRecord,
  VideoClip,
} from '../types';

export const PRODUCTS: Product[] = [
  // =========================================================================
  // 1. SMARTPHONES
  // =========================================================================
  {
    id: 'apple-iphone-16-pro-max',
    name: 'Apple iPhone 16 Pro Max',
    brand: 'Apple',
    category: 'Smartphones',
    subCategory: 'Apple iPhones',
    availability: 'dubai_order',
    priceTZS: 3650000,
    originalPriceTZS: 3890000,
    rating: 4.9,
    reviewCount: 94,
    inStock: true,
    stockCount: 10,
    badge: 'Dubai Sourcing',
    deliveryEstimate: 'Sourced from Dubai, UAE · 4–7 business days to Tanzania',
    warranty: '12-Month Apple International Warranty',
    shortDescription:
      'Grade 5 Titanium, A18 Pro chip, 48MP Fusion camera with 5x Telephoto, and Camera Control. Sourced directly from Dubai.',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Desert Titanium', hex: '#C2A88B' },
      { name: 'Natural Titanium', hex: '#94948C' },
      { name: 'Black Titanium', hex: '#1E293B' },
      { name: 'White Titanium', hex: '#F1F5F9' },
    ],
    storageOptions: ['256GB', '512GB', '1TB'],
    specs: {
      Display: '6.9" Super Retina XDR OLED (120Hz)',
      Chip: 'Apple A18 Pro',
      Camera: '48MP Main + 48MP Ultra Wide + 12MP 5x Telephoto',
      SIM: 'Physical SIM + eSIM (UAE / Global Spec)',
      Sourcing: 'Dubai, UAE (Price confirmed before order)',
    },
    reviews: [
      {
        id: 'r1',
        author: 'Neema J.',
        rating: 5,
        date: '2026-10-28',
        comment: 'Ordered my Desert Titanium 256GB from Dubai through Shema. Arrived sealed in Dar es Salaam in 5 days!',
        verified: true,
      },
    ],
  },
  {
    id: 'google-pixel-9-pro',
    name: 'Google Pixel 9 Pro 5G',
    brand: 'Google',
    category: 'Smartphones',
    subCategory: 'Google Pixel Smartphones',
    availability: 'dubai_order',
    priceTZS: 2780000,
    rating: 4.9,
    reviewCount: 41,
    inStock: true,
    stockCount: 8,
    badge: 'Dubai Sourcing',
    deliveryEstimate: 'Sourced from Dubai, UAE · 4–7 business days to Tanzania',
    warranty: '12-Month International Warranty',
    shortDescription:
      'Google Tensor G4, pro triple rear camera system, Super Actua display, and Gemini AI built in.',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Obsidian', hex: '#1E293B' },
      { name: 'Porcelain', hex: '#F8FAFC' },
      { name: 'Hazel', hex: '#64748B' },
    ],
    storageOptions: ['128GB', '256GB', '512GB'],
    specs: {
      Display: '6.3" Super Actua LTPO OLED (120Hz)',
      Processor: 'Google Tensor G4',
      Camera: '50MP Main + 48MP Ultrawide + 48MP 5x Telephoto',
      Memory: '16GB RAM',
      Sourcing: 'Dubai, UAE (Available on Order)',
    },
    reviews: [],
  },
  {
    id: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra 5G',
    brand: 'Samsung',
    category: 'Smartphones',
    subCategory: 'Samsung Galaxy Smartphones',
    availability: 'local_tanzania',
    priceTZS: 2950000,
    originalPriceTZS: 3200000,
    rating: 4.9,
    reviewCount: 128,
    inStock: true,
    stockCount: 7,
    badge: 'In Tanzania',
    deliveryEstimate: 'Same-day in Dar es Salaam · 1–3 days across Tanzania',
    warranty: '12-Month Official Warranty',
    shortDescription:
      'Titanium frame, 200MP Pro-grade camera, built-in S Pen, and Galaxy AI productivity suite.',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Titanium Gray', hex: '#64748B' },
      { name: 'Titanium Black', hex: '#1E293B' },
      { name: 'Titanium Violet', hex: '#6D28D9' },
    ],
    storageOptions: ['256GB', '512GB', '1TB'],
    specs: {
      Display: '6.8" Dynamic AMOLED 2X (120Hz)',
      Processor: 'Snapdragon 8 Gen 3',
      Camera: '200MP + 50MP + 12MP + 10MP',
      Battery: '5,000 mAh · 45W Fast Charging',
      SIM: 'Dual SIM + eSIM',
    },
    reviews: [
      {
        id: 'r2',
        author: 'Kelvin M.',
        rating: 5,
        date: '2026-10-18',
        comment: 'Picked up locally in Dar es Salaam. Sealed box and super fast service.',
        verified: true,
      },
    ],
  },
  {
    id: 'xiaomi-redmi-note-14-pro',
    name: 'Xiaomi Redmi Note 14 Pro 5G',
    brand: 'Xiaomi / Redmi',
    category: 'Smartphones',
    subCategory: 'Xiaomi / Redmi',
    availability: 'local_tanzania',
    priceTZS: 890000,
    originalPriceTZS: 960000,
    rating: 4.8,
    reviewCount: 64,
    inStock: true,
    stockCount: 12,
    badge: 'In Tanzania',
    deliveryEstimate: 'Same-day in Dar es Salaam · 1–3 days nationwide',
    warranty: '12-Month Warranty',
    shortDescription:
      '200MP OIS camera, 1.5K curved AMOLED 120Hz display, IP68 protection, and turbo fast charging.',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Midnight Black', hex: '#0F172A' },
      { name: 'Lavender Purple', hex: '#8B5CF6' },
      { name: 'Coral Green', hex: '#10B981' },
    ],
    storageOptions: ['256GB', '512GB'],
    specs: {
      Display: '6.67" 1.5K AMOLED 120Hz',
      Camera: '200MP OIS Main Camera',
      Battery: '5,110 mAh · 45W Turbo Charge',
      Protection: 'IP68 Water & Dust Resistant',
    },
    reviews: [],
  },
  {
    id: 'oneplus-13-5g',
    name: 'OnePlus 13 5G Flagship',
    brand: 'OnePlus',
    category: 'Smartphones',
    subCategory: 'OnePlus',
    availability: 'dubai_order',
    priceTZS: 2450000,
    rating: 4.8,
    reviewCount: 29,
    inStock: true,
    stockCount: 6,
    badge: 'Dubai Sourcing',
    deliveryEstimate: 'Sourced from Dubai, UAE · 4–7 business days to Tanzania',
    warranty: '12-Month International Warranty',
    shortDescription:
      'Hasselblad camera system, Snapdragon 8 Elite, 6,000 mAh Silicon-Carbon battery with 100W SUPERVOOC.',
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Midnight Ocean', hex: '#1E3A8A' },
      { name: 'Black Eclipse', hex: '#0F172A' },
    ],
    storageOptions: ['256GB', '512GB'],
    specs: {
      Display: '6.82" 2K ProXDR LTPO AMOLED',
      Processor: 'Snapdragon 8 Elite',
      Battery: '6,000 mAh · 100W Wired + 50W Wireless',
      Sourcing: 'Dubai, UAE (Available on Order)',
    },
    reviews: [],
  },
  {
    id: 'tecno-camon-30-premier',
    name: 'Tecno Camon 30 Premier 5G',
    brand: 'Tecno',
    category: 'Smartphones',
    subCategory: 'Tecno',
    availability: 'local_tanzania',
    priceTZS: 1180000,
    rating: 4.7,
    reviewCount: 53,
    inStock: true,
    stockCount: 9,
    badge: 'In Tanzania',
    deliveryEstimate: 'Same-day in Dar es Salaam · 1–3 days nationwide',
    warranty: '12-Month Carlcare Tanzania Warranty',
    shortDescription:
      'Triple 50MP Sony IMX890 camera with periscope telephoto, 512GB storage, and 70W Ultra Charge.',
    images: [
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Alps Snowy Silver', hex: '#CBD5E1' },
      { name: 'Hawaii Lava Black', hex: '#1E293B' },
    ],
    storageOptions: ['256GB', '512GB'],
    specs: {
      Display: '6.77" LTPO AMOLED 120Hz',
      Camera: '50MP + 50MP Periscope + 50MP Ultrawide',
      Storage: '512GB · 12GB RAM',
      Battery: '5,000 mAh · 70W Fast Charge',
    },
    reviews: [],
  },
  {
    id: 'infinix-note-40-pro',
    name: 'Infinix Note 40 Pro',
    brand: 'Infinix',
    category: 'Smartphones',
    subCategory: 'Infinix',
    availability: 'local_tanzania',
    priceTZS: 720000,
    rating: 4.7,
    reviewCount: 77,
    inStock: true,
    stockCount: 15,
    badge: 'In Tanzania',
    deliveryEstimate: 'Same-day in Dar es Salaam · 1–3 days nationwide',
    warranty: '12-Month Carlcare Tanzania Warranty',
    shortDescription:
      '108MP OIS Super-Zoom camera, 120Hz curved AMOLED display, and 20W Wireless MagCharge support.',
    images: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Vintage Green', hex: '#15803D' },
      { name: 'Titan Gold', hex: '#D97706' },
    ],
    storageOptions: ['256GB'],
    specs: {
      Display: '6.78" Curved AMOLED 120Hz',
      Camera: '108MP OIS Main Camera',
      Charging: '70W All-Round FastCharge 2.0 + MagCharge',
    },
    reviews: [],
  },
  {
    id: 'oppo-reno-12-pro',
    name: 'Oppo Reno 12 Pro 5G',
    brand: 'Oppo',
    category: 'Smartphones',
    subCategory: 'Oppo',
    availability: 'dubai_order',
    priceTZS: 1620000,
    rating: 4.8,
    reviewCount: 32,
    inStock: true,
    stockCount: 6,
    badge: 'Dubai Sourcing',
    deliveryEstimate: 'Sourced from Dubai, UAE · 4–7 business days to Tanzania',
    warranty: '12-Month International Warranty',
    shortDescription:
      'AI Portrait Expert with 50MP Telephoto, 80W SUPERVOOC flash charge, and ultra-slim quad-curved display.',
    images: [
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Nebula Silver', hex: '#94A3B8' },
      { name: 'Space Brown', hex: '#451A03' },
    ],
    storageOptions: ['256GB', '512GB'],
    specs: {
      Display: '6.7" 120Hz AMOLED',
      Camera: '50MP Main + 50MP Telephoto + 8MP Ultrawide',
      Charging: '80W SUPERVOOC',
    },
    reviews: [],
  },

  // =========================================================================
  // 2. MOBILE PHONE ACCESSORIES
  // =========================================================================
  {
    id: 'anker-65w-gan-charger-cable',
    name: 'Anker 65W GaN Fast Charger & USB-C Cable',
    brand: 'Anker',
    category: 'Mobile Phone Accessories',
    subCategory: 'Chargers & Adapters',
    availability: 'local_tanzania',
    priceTZS: 115000,
    originalPriceTZS: 135000,
    rating: 4.9,
    reviewCount: 112,
    inStock: true,
    stockCount: 25,
    badge: 'In Tanzania',
    deliveryEstimate: 'Same-day in Dar es Salaam · 1–2 days nationwide',
    warranty: '18-Month Anker Warranty',
    shortDescription:
      'Compact 3-port GaN wall adapter (2x USB-C, 1x USB-A) bundled with braided 100W USB-C charging cable.',
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Matte Black', hex: '#0F172A' },
      { name: 'Arctic White', hex: '#F8FAFC' },
    ],
    specs: {
      Output: '65W Max Power Delivery (PD 3.0)',
      Ports: '2x USB-C + 1x USB-A',
      Compatibility: 'iPhone, Samsung, Pixel, MacBook Air',
    },
    reviews: [],
  },
  {
    id: 'anker-maggo-powerbank-10k',
    name: 'Anker 10,000mAh MagSafe & USB-C Power Bank',
    brand: 'Anker',
    category: 'Mobile Phone Accessories',
    subCategory: 'Power Banks',
    availability: 'local_tanzania',
    priceTZS: 145000,
    rating: 4.9,
    reviewCount: 86,
    inStock: true,
    stockCount: 18,
    badge: 'In Tanzania',
    deliveryEstimate: 'Same-day in Dar es Salaam · 1–2 days nationwide',
    warranty: '18-Month Anker Warranty',
    shortDescription:
      'Slim magnetic wireless + 27W USB-C fast power bank with built-in kickstand for travel and daily backup.',
    images: [
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0F172A' },
      { name: 'Ice Blue', hex: '#38BDF8' },
    ],
    specs: {
      Capacity: '10,000 mAh',
      Wireless: '15W Qi2 MagSafe Compatible',
      Wired: '27W USB-C PD Fast Charge',
    },
    reviews: [],
  },
  {
    id: 'apple-airpods-pro-2',
    name: 'Apple AirPods Pro (2nd Gen, USB-C)',
    brand: 'Apple',
    category: 'Mobile Phone Accessories',
    subCategory: 'Bluetooth Earbuds',
    availability: 'dubai_order',
    priceTZS: 640000,
    rating: 4.9,
    reviewCount: 68,
    inStock: true,
    stockCount: 14,
    badge: 'Dubai Sourcing',
    deliveryEstimate: 'Sourced from Dubai, UAE · 4–7 business days to Tanzania',
    warranty: '12-Month Apple Warranty',
    shortDescription:
      'Active Noise Cancellation, Adaptive Audio, Personalized Spatial Audio, and MagSafe USB-C charging case.',
    images: [
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [{ name: 'White', hex: '#F8FAFC' }],
    specs: {
      Chip: 'Apple H2 Headphone Chip',
      Battery: 'Up to 6 hrs listening (30 hrs with case)',
      Case: 'MagSafe Charging Case (USB-C)',
    },
    reviews: [],
  },
  {
    id: 'sony-wh1000xm5-headphones',
    name: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
    brand: 'Sony',
    category: 'Mobile Phone Accessories',
    subCategory: 'Headphones & Earphones',
    availability: 'dubai_order',
    priceTZS: 920000,
    rating: 4.9,
    reviewCount: 44,
    inStock: true,
    stockCount: 7,
    badge: 'Dubai Sourcing',
    deliveryEstimate: 'Sourced from Dubai, UAE · 4–7 business days to Tanzania',
    warranty: '12-Month International Warranty',
    shortDescription:
      'Industry-leading noise cancellation with 8 microphones, 30-hour battery life, and multipoint Bluetooth.',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Black', hex: '#0F172A' },
      { name: 'Platinum Silver', hex: '#CBD5E1' },
    ],
    specs: {
      Battery: 'Up to 30 hours with ANC',
      Connectivity: 'Bluetooth 5.2 Multipoint + 3.5mm',
      Charging: '3 min charge = 3 hrs playback (USB-C PD)',
    },
    reviews: [],
  },
  {
    id: 'armor-case-tempered-glass-kit',
    name: 'MagSafe Shockproof Case & Tempered Glass Bundle',
    brand: 'Spigen / Shema',
    category: 'Mobile Phone Accessories',
    subCategory: 'Phone Cases & Covers',
    availability: 'local_tanzania',
    priceTZS: 45000,
    rating: 4.8,
    reviewCount: 145,
    inStock: true,
    stockCount: 40,
    badge: 'In Tanzania',
    deliveryEstimate: 'Same-day in Dar es Salaam · 1–2 days nationwide',
    warranty: 'Replacement Guarantee on Delivery',
    shortDescription:
      '9H HD anti-scratch tempered glass screen protector paired with a magnetic shock-absorbing case. Available for iPhone & Samsung.',
    images: [
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Clear MagSafe', hex: '#E2E8F0' },
      { name: 'Matte Black', hex: '#1E293B' },
    ],
    storageOptions: ['iPhone 15/16 Series', 'Samsung S23/S24 Series', 'Tecno / Infinix / Xiaomi'],
    specs: {
      Protection: 'Military-Grade Drop Protection + 9H Glass',
      Compatibility: 'Specify exact phone model at checkout/WhatsApp',
    },
    reviews: [],
  },
  {
    id: 'wireless-3in1-stand-charger',
    name: '3-in-1 Foldable Wireless Charger & Phone Stand',
    brand: 'Anker / Ugreen',
    category: 'Mobile Phone Accessories',
    subCategory: 'Wireless Chargers',
    availability: 'local_tanzania',
    priceTZS: 135000,
    rating: 4.8,
    reviewCount: 38,
    inStock: true,
    stockCount: 11,
    badge: 'In Tanzania',
    deliveryEstimate: 'Same-day in Dar es Salaam · 1–2 days nationwide',
    warranty: '12-Month Warranty',
    shortDescription:
      'Charge your smartphone, smartwatch, and wireless earbuds simultaneously on a sleek foldable desk stand.',
    images: [
      'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [{ name: 'Space Gray', hex: '#334155' }],
    specs: {
      Output: '15W Phone + 5W Watch + 5W Earbuds',
      Design: 'Foldable Aluminium Desk Stand',
    },
    reviews: [],
  },

  // =========================================================================
  // 3. SMART GADGETS & WEARABLES
  // =========================================================================
  {
    id: 'apple-watch-series-10',
    name: 'Apple Watch Series 10 (GPS)',
    brand: 'Apple',
    category: 'Smart Gadgets & Wearables',
    subCategory: 'Smartwatches',
    availability: 'dubai_order',
    priceTZS: 1190000,
    rating: 4.9,
    reviewCount: 47,
    inStock: true,
    stockCount: 8,
    badge: 'Dubai Sourcing',
    deliveryEstimate: 'Sourced from Dubai, UAE · 4–7 business days to Tanzania',
    warranty: '12-Month Apple Warranty',
    shortDescription:
      'Thinnest Apple Watch ever with wide-angle OLED display, sleep apnea notifications, ECG, and fast charging.',
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Jet Black', hex: '#0F172A' },
      { name: 'Silver Aluminium', hex: '#CBD5E1' },
      { name: 'Rose Gold', hex: '#F4A261' },
    ],
    storageOptions: ['42mm', '46mm'],
    specs: {
      Display: 'Always-On Retina LTPO3 OLED',
      Health: 'ECG, Blood Oxygen, Heart Rate, Sleep Tracking',
      WaterResistance: '50m Swimproof',
    },
    reviews: [],
  },
  {
    id: 'xiaomi-smart-band-9',
    name: 'Xiaomi Smart Band 9',
    brand: 'Xiaomi / Redmi',
    category: 'Smart Gadgets & Wearables',
    subCategory: 'Smart Bands',
    availability: 'local_tanzania',
    priceTZS: 125000,
    rating: 4.8,
    reviewCount: 92,
    inStock: true,
    stockCount: 20,
    badge: 'In Tanzania',
    deliveryEstimate: 'Same-day in Dar es Salaam · 1–2 days nationwide',
    warranty: '12-Month Warranty',
    shortDescription:
      '1.62" AMOLED 60Hz display, 21-day battery life, aluminium alloy frame, and 150+ sports modes.',
    images: [
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Midnight Black', hex: '#0F172A' },
      { name: 'Glacier Silver', hex: '#CBD5E1' },
    ],
    specs: {
      Display: '1.62" AMOLED 1200 nits',
      Battery: 'Up to 21 days typical use',
      Compatibility: 'Android & iOS',
    },
    reviews: [],
  },
  {
    id: 'jbl-charge-5-speaker',
    name: 'JBL Charge 5 Portable Bluetooth Speaker',
    brand: 'JBL',
    category: 'Smart Gadgets & Wearables',
    subCategory: 'Bluetooth Speakers',
    availability: 'local_tanzania',
    priceTZS: 440000,
    rating: 4.9,
    reviewCount: 81,
    inStock: true,
    stockCount: 9,
    badge: 'In Tanzania',
    deliveryEstimate: 'Same-day in Dar es Salaam · 1–3 days nationwide',
    warranty: '12-Month Warranty',
    shortDescription:
      'Bold JBL Original Pro Sound, 20-hour playtime, IP67 waterproof/dustproof, and built-in powerbank.',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Black', hex: '#0F172A' },
      { name: 'Squad Camo', hex: '#4D7C0F' },
      { name: 'Blue', hex: '#1D4ED8' },
    ],
    specs: {
      Audio: '40W RMS JBL Pro Sound',
      Battery: '20 Hours Playtime + USB Powerbank Out',
      Durability: 'IP67 Waterproof & Dustproof',
    },
    reviews: [],
  },
  {
    id: 'smart-home-wifi-camera-kit',
    name: 'TP-Link Tapo 2K Smart Home Security Camera & Plug',
    brand: 'TP-Link',
    category: 'Smart Gadgets & Wearables',
    subCategory: 'Smart Home Accessories',
    availability: 'local_tanzania',
    priceTZS: 165000,
    rating: 4.7,
    reviewCount: 49,
    inStock: true,
    stockCount: 14,
    badge: 'In Tanzania',
    deliveryEstimate: 'Same-day in Dar es Salaam · 1–2 days nationwide',
    warranty: '12-Month Warranty',
    shortDescription:
      'Pan/Tilt 2K Wi-Fi indoor camera with night vision, motion alerts to your phone, and two-way audio.',
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [{ name: 'White', hex: '#F8FAFC' }],
    specs: {
      Resolution: '2K QHD (2560 × 1440)',
      Storage: 'microSD up to 512GB / Cloud',
      AppControl: 'iOS & Android Remote View',
    },
    reviews: [],
  },

  // =========================================================================
  // 4. COMPUTERS & ELECTRONICS
  // =========================================================================
  {
    id: 'macbook-air-13-m3',
    name: 'Apple MacBook Air 13" M3',
    brand: 'Apple',
    category: 'Computers & Electronics',
    subCategory: 'Laptops',
    availability: 'dubai_order',
    priceTZS: 3150000,
    originalPriceTZS: 3350000,
    rating: 4.9,
    reviewCount: 62,
    inStock: true,
    stockCount: 6,
    badge: 'Dubai Sourcing',
    deliveryEstimate: 'Sourced from Dubai, UAE · 4–7 business days to Tanzania',
    warranty: '12-Month Apple International Warranty',
    shortDescription:
      'Apple M3 chip, 16GB unified memory, Liquid Retina display, MagSafe 3, and up to 18 hours battery life.',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Midnight', hex: '#0F172A' },
      { name: 'Starlight', hex: '#E2E8F0' },
      { name: 'Space Gray', hex: '#475569' },
    ],
    storageOptions: ['256GB SSD', '512GB SSD'],
    specs: {
      Processor: 'Apple M3 (8-Core CPU, 10-Core GPU)',
      Memory: '16GB Unified Memory',
      Display: '13.6" Liquid Retina',
      Sourcing: 'Dubai, UAE (English Keyboard)',
    },
    reviews: [],
  },
  {
    id: 'samsung-galaxy-tab-s9-fe',
    name: 'Samsung Galaxy Tab S9 FE (with S Pen)',
    brand: 'Samsung',
    category: 'Computers & Electronics',
    subCategory: 'Tablets',
    availability: 'dubai_order',
    priceTZS: 1290000,
    rating: 4.8,
    reviewCount: 35,
    inStock: true,
    stockCount: 8,
    badge: 'Dubai Sourcing',
    deliveryEstimate: 'Sourced from Dubai, UAE · 4–7 business days to Tanzania',
    warranty: '12-Month Samsung International Warranty',
    shortDescription:
      '10.9" 90Hz display, IP68 water-resistant tablet and S Pen included in the box for work, study, and design.',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Gray', hex: '#475569' },
      { name: 'Mint', hex: '#6EE7B7' },
    ],
    storageOptions: ['128GB Wi-Fi', '256GB 5G'],
    specs: {
      Display: '10.9" 90Hz LCD',
      Included: 'S Pen in box',
      Battery: '8,000 mAh · 45W Fast Charging',
    },
    reviews: [],
  },
  {
    id: 'logitech-wireless-keyboard-mouse',
    name: 'Logitech Wireless Keyboard & Mouse Combo',
    brand: 'Logitech',
    category: 'Computers & Electronics',
    subCategory: 'Wireless Keyboards & Mice',
    availability: 'local_tanzania',
    priceTZS: 135000,
    rating: 4.8,
    reviewCount: 54,
    inStock: true,
    stockCount: 16,
    badge: 'In Tanzania',
    deliveryEstimate: 'Same-day in Dar es Salaam · 1–2 days nationwide',
    warranty: '12-Month Warranty',
    shortDescription:
      'Silent wireless full-size keyboard and ergonomic optical mouse with single plug-and-play USB receiver.',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Graphite', hex: '#334155' },
      { name: 'Off-White', hex: '#F1F5F9' },
    ],
    specs: {
      Connectivity: '2.4GHz Wireless + Bluetooth',
      Battery: 'Up to 24 months keyboard / 12 months mouse',
      Compatibility: 'Windows, macOS, ChromeOS',
    },
    reviews: [],
  },
  {
    id: 'sandisk-usb-flash-memory-bundle',
    name: 'SanDisk 128GB USB 3.2 Flash Drive & microSD Card',
    brand: 'SanDisk',
    category: 'Computers & Electronics',
    subCategory: 'USB Flash Drives & Memory Cards',
    availability: 'local_tanzania',
    priceTZS: 68000,
    rating: 4.9,
    reviewCount: 118,
    inStock: true,
    stockCount: 35,
    badge: 'In Tanzania',
    deliveryEstimate: 'Same-day in Dar es Salaam · 1–2 days nationwide',
    warranty: '12-Month Warranty',
    shortDescription:
      'High-speed USB 3.2 flash drive and A1-rated microSDXC memory card for phones, cameras, and laptops.',
    images: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [{ name: 'Red / Black', hex: '#DC2626' }],
    storageOptions: ['64GB', '128GB', '256GB'],
    specs: {
      Speed: 'Up to 150MB/s Read',
      Format: 'USB-A / USB-C Dual & microSDXC',
    },
    reviews: [],
  },
  {
    id: 'samsung-t7-external-ssd',
    name: 'Samsung T7 1TB Portable External SSD',
    brand: 'Samsung',
    category: 'Computers & Electronics',
    subCategory: 'External Storage Devices',
    availability: 'dubai_order',
    priceTZS: 345000,
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    stockCount: 10,
    badge: 'Dubai Sourcing',
    deliveryEstimate: 'Sourced from Dubai, UAE · 4–7 business days to Tanzania',
    warranty: '36-Month Samsung Warranty',
    shortDescription:
      'Pocket-sized USB 3.2 Gen 2 external SSD with 1,050 MB/s transfer speeds and shock-resistant metal body.',
    images: [
      'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Titan Gray', hex: '#475569' },
      { name: 'Indigo Blue', hex: '#1D4ED8' },
    ],
    storageOptions: ['1TB', '2TB'],
    specs: {
      Speed: 'Up to 1,050 MB/s Read · 1,000 MB/s Write',
      Interface: 'USB-C & USB-A cables included',
    },
    reviews: [],
  },
];

// =========================================================================
// DIGITAL SERVICES BUILDER (TANZANIA GOVERNMENT PORTALS & BUSINESS SUPPORT)
// =========================================================================

interface ServiceSeed {
  id: string;
  title: string;
  category: ServiceCategory;
  subGroup?: string;
  officialPortalName?: string;
  officialPortalUrl?: string;
  officialPortalUrls?: { label: string; url: string }[];
  serviceFeeTZS: number;
  govtFeeTZS: number;
  govtFeeNote?: string;
  processingTime: string;
  badge?: string;
  shortDescription: string;
  requirements: string[];
  requiredDocuments?: ServiceDocumentReq[];
  popularity?: number;
}

const DEFAULT_STEPS = [
  'Submit your details & supporting documents securely to Shema',
  'Shema specialist reviews requirements & prepares your online application',
  'Guidance on official government payment (Control Number) where applicable',
  'Online submission & ongoing application progress follow-up',
];

function makeService(seed: ServiceSeed): DigitalService {
  const defaultDocs: ServiceDocumentReq[] = seed.requiredDocuments ?? [
    {
      id: 'id-copy',
      label: 'NIDA / National ID or Passport Copy',
      description: 'Clear scan or photo of your valid identification.',
      required: true,
    },
    {
      id: 'supporting-doc',
      label: 'Primary Supporting Document',
      description: seed.requirements[0] || 'Relevant certificate, letter, or form.',
      required: true,
    },
    {
      id: 'extra-doc',
      label: 'Additional Supporting Document (Optional)',
      description: 'Any extra verification or reference document.',
      required: false,
    },
  ];

  return {
    id: seed.id,
    title: seed.title,
    category: seed.category,
    subGroup: seed.subGroup,
    officialPortalName: seed.officialPortalName,
    officialPortalUrl: seed.officialPortalUrl,
    officialPortalUrls: seed.officialPortalUrls,
    serviceFeeTZS: seed.serviceFeeTZS,
    govtFeeTZS: seed.govtFeeTZS,
    govtFeeNote:
      seed.govtFeeNote ??
      (seed.govtFeeTZS > 0
        ? 'Official government fee paid separately via GePG Control Number'
        : 'Official portal fees (if any) confirmed per application'),
    processingTime: seed.processingTime,
    badge: seed.badge,
    shortDescription: seed.shortDescription,
    fullDescription: `${seed.shortDescription} Shema acts as an independent digital assistance provider helping you prepare documents, complete online forms accurately, and track progress on ${seed.officialPortalName || 'the official platform'}. All official certificates, numbers, and approvals are issued solely by the respective government authority.`,
    requirements: seed.requirements,
    requiredDocuments: defaultDocs,
    stepsSummary: DEFAULT_STEPS,
    popularity: seed.popularity ?? 80,
  };
}

export const DIGITAL_SERVICES: DigitalService[] = [
  // -------------------------------------------------------------------------
  // A. RITA SERVICES — eRITA Portal (https://erita.rita.go.tz/)
  // -------------------------------------------------------------------------
  ...[
    {
      id: 'rita-new-birth-certificate',
      title: 'New Birth Certificate Registration',
      shortDescription:
        'End-to-end online form filling, document organization, and submission assistance on the eRITA portal for new birth certificates.',
      serviceFeeTZS: 25000,
      govtFeeTZS: 3500,
      processingTime: '3–7 working days',
      badge: 'Most Requested',
      popularity: 99,
      requirements: [
        'Hospital birth notification / clinic card',
        'Parents’ NIDA numbers or IDs',
        'Ward Executive / local confirmation (if late registration)',
      ],
    },
    {
      id: 'rita-birth-replacement',
      title: 'Birth Certificate Replacement',
      shortDescription:
        'Assistance applying for replacement of a lost, damaged, or old-format birth certificate via eRITA.',
      serviceFeeTZS: 25000,
      govtFeeTZS: 3500,
      processingTime: '3–7 working days',
      popularity: 91,
      requirements: [
        'Loss report / Police report (for lost certificate)',
        'Copy of old certificate or entry details',
        'Applicant NIDA ID / NIN',
      ],
    },
    {
      id: 'rita-birth-correction',
      title: 'Birth Certificate Correction',
      shortDescription:
        'Guidance and online submission for correcting spelling, date, or parent details on an existing birth certificate.',
      serviceFeeTZS: 30000,
      govtFeeTZS: 5000,
      processingTime: '5–10 working days',
      popularity: 85,
      requirements: [
        'Original birth certificate with error',
        'Sworn affidavit / Deed Poll (where applicable)',
        'Academic or NIDA supporting records',
      ],
    },
    {
      id: 'rita-birth-verification',
      title: 'Birth Certificate Verification',
      shortDescription:
        'Online verification request assistance for passport, NIDA, scholarship, or embassy requirements.',
      serviceFeeTZS: 20000,
      govtFeeTZS: 3500,
      processingTime: '2–5 working days',
      popularity: 88,
      requirements: [
        'Clear scan of the birth certificate',
        'Applicant NIDA / Passport details',
      ],
    },
    {
      id: 'rita-new-death-certificate',
      title: 'New Death Certificate Registration',
      shortDescription:
        'Compassionate, accurate online application assistance for registering and obtaining an official death certificate.',
      serviceFeeTZS: 25000,
      govtFeeTZS: 3500,
      processingTime: '3–7 working days',
      popularity: 74,
      requirements: [
        'Hospital death notification / burial permit',
        'Deceased & informant NIDA details',
      ],
    },
    {
      id: 'rita-death-replacement',
      title: 'Death Certificate Replacement',
      shortDescription:
        'Online application assistance to replace a lost or damaged death certificate through eRITA.',
      serviceFeeTZS: 25000,
      govtFeeTZS: 3500,
      processingTime: '3–7 working days',
      popularity: 70,
      requirements: [
        'Police loss report or damaged copy',
        'Applicant relationship proof & NIDA ID',
      ],
    },
    {
      id: 'rita-marriage-certificate',
      title: 'Marriage Certificate Application',
      shortDescription:
        'Online form preparation and submission guidance for official RITA marriage certificates.',
      serviceFeeTZS: 30000,
      govtFeeTZS: 10000,
      processingTime: '5–10 working days',
      popularity: 82,
      requirements: [
        'Marriage register / religious or district marriage record',
        'Both spouses’ NIDA IDs & passport photos',
      ],
    },
    {
      id: 'rita-marriage-registration',
      title: 'Marriage Registration Assistance',
      shortDescription:
        'Step-by-step guidance on eRITA marriage registration requirements, notices, and document preparation.',
      serviceFeeTZS: 30000,
      govtFeeTZS: 10000,
      processingTime: '5–14 working days',
      popularity: 76,
      requirements: [
        'NIDA IDs of both parties & witnesses',
        'Birth certificates & marital status declarations',
      ],
    },
    {
      id: 'rita-divorce-registration',
      title: 'Divorce Registration Assistance',
      shortDescription:
        'Document organization and eRITA online submission assistance for registering a court-granted divorce decree.',
      serviceFeeTZS: 35000,
      govtFeeTZS: 10000,
      processingTime: '5–10 working days',
      popularity: 68,
      requirements: [
        'Certified Court Divorce Decree',
        'Original marriage certificate & NIDA ID',
      ],
    },
  ].map((s) =>
    makeService({
      ...s,
      category: 'RITA Services',
      subGroup: 'eRITA Portal',
      officialPortalName: 'RITA – eRITA Portal',
      officialPortalUrl: 'https://erita.rita.go.tz/',
    })
  ),

  // -------------------------------------------------------------------------
  // B. NIDA SERVICES — NIDA Online Services (https://services.nida.go.tz/)
  // -------------------------------------------------------------------------
  ...[
    {
      id: 'nida-nin-application',
      title: 'National Identification Number (NIN) Application Assistance',
      shortDescription:
        'Complete online form filling and document checklist preparation for first-time NIDA NIN registration.',
      serviceFeeTZS: 20000,
      govtFeeTZS: 0,
      govtFeeNote: 'First-time NIDA registration is free of government charge',
      processingTime: '1–2 days form prep',
      badge: 'Popular',
      popularity: 96,
      requirements: [
        'Verified Birth Certificate',
        'Academic certificates / Voter ID',
        'Local Government (Serikali za Mitaa) intro letter',
      ],
    },
    {
      id: 'nida-registration-guidance',
      title: 'NIDA Registration Guidance',
      shortDescription:
        'Consultation, eligibility check, and appointment preparation for NIDA biometric registration.',
      serviceFeeTZS: 15000,
      govtFeeTZS: 0,
      processingTime: 'Same day',
      popularity: 84,
      requirements: [
        'Birth certificate & parent details',
        'Residence address & ward details',
      ],
    },
    {
      id: 'nida-information-update',
      title: 'NIDA Information Update Assistance',
      shortDescription:
        'Assistance preparing and submitting requests to update name, date of birth, or address on NIDA records.',
      serviceFeeTZS: 25000,
      govtFeeTZS: 20000,
      processingTime: '3–7 working days',
      popularity: 83,
      requirements: [
        'Existing NIN / NIDA Card copy',
        'Affidavit / Deed Poll & verified Birth Certificate',
      ],
    },
    {
      id: 'nida-card-replacement',
      title: 'NIDA Card Replacement Assistance',
      shortDescription:
        'Online application guidance for replacing a lost, stolen, or damaged National ID card.',
      serviceFeeTZS: 25000,
      govtFeeTZS: 20000,
      processingTime: '3–5 working days',
      popularity: 89,
      requirements: [
        'Police Loss Report (RB)',
        'Existing NIN number & NIDA copy (if available)',
      ],
    },
    {
      id: 'nida-number-retrieval',
      title: 'NIDA Number Retrieval Assistance',
      shortDescription:
        'Fast assistance retrieving your issued National Identification Number (NIN) through official NIDA online services.',
      serviceFeeTZS: 10000,
      govtFeeTZS: 0,
      processingTime: 'Same day – 24 hrs',
      badge: 'Fast Track',
      popularity: 94,
      requirements: [
        'Full name as registered & Date of Birth',
        'Phone number used during NIDA registration',
      ],
    },
  ].map((s) =>
    makeService({
      ...s,
      category: 'NIDA Services',
      subGroup: 'NIDA Online Services Portal',
      officialPortalName: 'NIDA Online Services Portal',
      officialPortalUrl: 'https://services.nida.go.tz/',
    })
  ),

  // -------------------------------------------------------------------------
  // C. TRA SERVICES — TRA Taxpayer Portal (https://taxpayerportal.tra.go.tz/)
  // -------------------------------------------------------------------------
  ...[
    {
      id: 'tra-new-tin-application',
      title: 'New TIN Application',
      shortDescription:
        'Online Taxpayer Identification Number (TIN) application assistance for individuals and businesses via TRA Taxpayer Portal.',
      serviceFeeTZS: 20000,
      govtFeeTZS: 0,
      govtFeeNote: 'TRA TIN issuance is free of government charge',
      processingTime: '1–3 working days',
      badge: 'Most Requested',
      popularity: 97,
      requirements: [
        'Valid NIDA NIN number',
        'Active phone number & email address',
        'Business / employment details (for business TIN)',
      ],
    },
    {
      id: 'tra-tin-certificate',
      title: 'TIN Certificate Assistance',
      shortDescription:
        'Help retrieving, downloading, or verifying your official TRA TIN certificate from the Taxpayer Portal.',
      serviceFeeTZS: 15000,
      govtFeeTZS: 0,
      processingTime: 'Same day',
      popularity: 90,
      requirements: [
        'Existing TIN number & NIDA ID',
        'Registered phone number for OTP',
      ],
    },
    {
      id: 'tra-taxpayer-registration',
      title: 'Taxpayer Registration Assistance',
      shortDescription:
        'Guidance for registering your TRA Taxpayer Portal account, linking business entities, and setting up e-filing.',
      serviceFeeTZS: 25000,
      govtFeeTZS: 0,
      processingTime: '1–2 working days',
      popularity: 85,
      requirements: [
        'TIN number & NIDA ID',
        'BRELA Certificate (if company/business)',
      ],
    },
    {
      id: 'tra-tax-returns-filing',
      title: 'Tax Returns Filing Assistance',
      shortDescription:
        'Structured guidance and online portal assistance for submitting provisional and final tax returns.',
      serviceFeeTZS: 45000,
      govtFeeTZS: 0,
      govtFeeNote: 'Assessed tax payable directly to TRA via control number',
      processingTime: '1–3 working days',
      popularity: 88,
      requirements: [
        'TRA Taxpayer Portal access & TIN',
        'Financial / income summary or nil-return confirmation',
      ],
    },
    {
      id: 'tra-taxpayer-update',
      title: 'Taxpayer Information Update',
      shortDescription:
        'Assistance updating phone number, email, physical address, or business details on the TRA portal.',
      serviceFeeTZS: 20000,
      govtFeeTZS: 0,
      processingTime: '1–3 working days',
      popularity: 80,
      requirements: [
        'TIN number & NIDA ID',
        'Supporting proof of updated details',
      ],
    },
    {
      id: 'tra-online-tax-services',
      title: 'Online Tax Services Assistance',
      shortDescription:
        'General support navigating TRA Taxpayer Portal modules, tax clearance requests, and e-services.',
      serviceFeeTZS: 25000,
      govtFeeTZS: 0,
      processingTime: '1–2 working days',
      popularity: 77,
      requirements: ['TIN number & portal login details', 'Description of request'],
    },
    {
      id: 'tra-tax-payment-guidance',
      title: 'Tax Payment Guidance',
      shortDescription:
        'Help generating official TRA GePG control numbers and verifying payment receipts on the portal.',
      serviceFeeTZS: 15000,
      govtFeeTZS: 0,
      processingTime: 'Same day',
      popularity: 79,
      requirements: ['TIN number', 'Tax assessment or installment details'],
    },
  ].map((s) =>
    makeService({
      ...s,
      category: 'TRA Services',
      subGroup: 'TRA Taxpayer Portal',
      officialPortalName: 'TRA Taxpayer Portal',
      officialPortalUrl: 'https://taxpayerportal.tra.go.tz/',
    })
  ),

  // -------------------------------------------------------------------------
  // D. BRELA SERVICES — BOS & ORS (bos.brela.go.tz & ors.brela.go.tz)
  // -------------------------------------------------------------------------
  ...[
    {
      id: 'brela-business-name-search',
      title: 'Business Name Search',
      shortDescription:
        'Preliminary name availability search on BRELA ORS to ensure your proposed business or company name is unique.',
      serviceFeeTZS: 15000,
      govtFeeTZS: 0,
      processingTime: 'Same day',
      popularity: 92,
      requirements: [
        '2–3 proposed business or company names',
        'Brief description of business activities',
      ],
    },
    {
      id: 'brela-new-business-name',
      title: 'New Business Name Registration',
      shortDescription:
        'Complete online registration assistance on BRELA ORS for sole proprietors and partnerships.',
      serviceFeeTZS: 40000,
      govtFeeTZS: 20000,
      processingTime: '2–5 working days',
      badge: 'Popular',
      popularity: 95,
      requirements: [
        'Proposed business name & objectives',
        'Owner(s) NIDA NIN, phone & email',
        'Physical & postal business address',
      ],
    },
    {
      id: 'brela-business-name-renewal',
      title: 'Business Name Renewal',
      shortDescription:
        'Annual maintenance and renewal filing assistance for registered business names on BRELA ORS.',
      serviceFeeTZS: 25000,
      govtFeeTZS: 15000,
      processingTime: '1–3 working days',
      popularity: 82,
      requirements: [
        'Existing Business Name Registration Number',
        'Owner NIDA ID',
      ],
    },
    {
      id: 'brela-business-name-changes',
      title: 'Business Name Changes',
      shortDescription:
        'Online filing assistance for updating partners, address, or business activities on an existing registration.',
      serviceFeeTZS: 35000,
      govtFeeTZS: 15000,
      processingTime: '2–5 working days',
      popularity: 76,
      requirements: [
        'Certificate of Registration',
        'NIDA IDs of existing & new owners',
      ],
    },
    {
      id: 'brela-company-registration',
      title: 'Company Registration',
      shortDescription:
        'Full online assistance preparing MEMART, director/shareholder details, and submitting company incorporation on BRELA ORS.',
      serviceFeeTZS: 120000,
      govtFeeTZS: 95000,
      govtFeeNote: 'Official BRELA incorporation fees depend on share capital',
      processingTime: '3–7 working days',
      badge: 'Business Launch',
      popularity: 93,
      requirements: [
        'Proposed company name & share capital structure',
        'Directors & shareholders NIDA IDs + TINs',
        'Registered office address in Tanzania',
      ],
    },
    {
      id: 'brela-company-changes',
      title: 'Company Information Changes',
      shortDescription:
        'Filing assistance for annual returns, change of directors, shareholding updates, or registered office changes.',
      serviceFeeTZS: 60000,
      govtFeeTZS: 30000,
      processingTime: '3–7 working days',
      popularity: 78,
      requirements: [
        'Company Registration Number & Certificate',
        'Board resolution & NIDA/TIN of directors',
      ],
    },
    {
      id: 'brela-certificate-assistance',
      title: 'Business Registration Certificate Assistance',
      shortDescription:
        'Help retrieving, downloading, or verifying official BRELA registration certificates and extracts.',
      serviceFeeTZS: 20000,
      govtFeeTZS: 0,
      processingTime: '1–2 working days',
      popularity: 84,
      requirements: ['Registration Number', 'Owner/Director NIDA ID'],
    },
    {
      id: 'brela-trademark-assistance',
      title: 'Trademark Registration Assistance',
      shortDescription:
        'Search, class selection guidance, and online trademark application submission via BRELA.',
      serviceFeeTZS: 95000,
      govtFeeTZS: 50000,
      processingTime: '5–10 working days (filing)',
      popularity: 75,
      requirements: [
        'High-resolution brand logo / wordmark',
        'Goods/services class description & owner NIDA/BRELA cert',
      ],
    },
  ].map((s) =>
    makeService({
      ...s,
      category: 'BRELA Services',
      subGroup: 'BRELA BOS & ORS',
      officialPortalName: 'BRELA BOS & ORS',
      officialPortalUrl: 'https://ors.brela.go.tz/',
      officialPortalUrls: [
        { label: 'BRELA BOS', url: 'https://bos.brela.go.tz/' },
        { label: 'BRELA ORS', url: 'https://ors.brela.go.tz/' },
      ],
    })
  ),

  // -------------------------------------------------------------------------
  // E. IMMIGRATION SERVICES — Tanzania e-Immigration (eservices.immigration.go.tz)
  // -------------------------------------------------------------------------
  ...[
    {
      id: 'immigration-new-passport',
      title: 'New Passport Application Assistance',
      shortDescription:
        'Complete online e-Passport form filling, document verification, and appointment preparation via Tanzania e-Immigration.',
      serviceFeeTZS: 45000,
      govtFeeTZS: 150000,
      processingTime: '1–2 days form prep',
      badge: 'Most Requested',
      popularity: 98,
      requirements: [
        'Verified Birth Certificate & NIDA NIN',
        'Parents’ birth certificates / citizenship proof',
        'Passport-size photo & travel/purpose letter',
      ],
    },
    {
      id: 'immigration-passport-renewal',
      title: 'Passport Renewal / Replacement Guidance',
      shortDescription:
        'Online application assistance for expiring, full, lost, or damaged Tanzanian e-Passports.',
      serviceFeeTZS: 45000,
      govtFeeTZS: 150000,
      processingTime: '1–2 days form prep',
      popularity: 91,
      requirements: [
        'Previous passport bio-page copy (or Police loss report)',
        'NIDA NIN & Birth Certificate',
      ],
    },
    {
      id: 'immigration-passport-form',
      title: 'Passport Application Form Assistance',
      shortDescription:
        'Error-free online form completion and control number guidance for applicants who already have all documents ready.',
      serviceFeeTZS: 30000,
      govtFeeTZS: 150000,
      processingTime: 'Same day',
      popularity: 86,
      requirements: [
        'NIDA NIN & Birth Certificate',
        'Supporting letters & digital photo',
      ],
    },
    {
      id: 'immigration-passport-followup',
      title: 'Passport Application Follow-up Assistance',
      shortDescription:
        'Helping applicants check online status, control numbers, and next steps on the Tanzania e-Immigration portal.',
      serviceFeeTZS: 15000,
      govtFeeTZS: 0,
      processingTime: 'Same day',
      popularity: 82,
      requirements: [
        'Application Reference Number',
        'Applicant NIDA NIN / Date of Birth',
      ],
    },
  ].map((s) =>
    makeService({
      ...s,
      category: 'Immigration Services',
      subGroup: 'Tanzania e-Immigration Portal',
      officialPortalName: 'Tanzania e-Immigration Portal',
      officialPortalUrl: 'https://eservices.immigration.go.tz/',
    })
  ),

  // -------------------------------------------------------------------------
  // F. OTHER BUSINESS & DIGITAL SERVICES
  // -------------------------------------------------------------------------
  ...[
    // Business Support
    {
      id: 'biz-licence-assistance',
      title: 'Business Licence Application Assistance',
      subGroup: 'Business Support',
      shortDescription:
        'Document preparation and online submission guidance for municipal and trade business licences in Tanzania.',
      serviceFeeTZS: 40000,
      govtFeeTZS: 0,
      govtFeeNote: 'Municipal licence fee varies by business category',
      processingTime: '2–5 working days',
      popularity: 88,
      requirements: [
        'BRELA Certificate & TRA TIN',
        'Lease agreement / premises proof & NIDA ID',
      ],
    },
    {
      id: 'biz-profile-preparation',
      title: 'Business Profile Preparation',
      subGroup: 'Business Support',
      shortDescription:
        'Professionally designed company profile PDF for tenders, bank accounts, partners, and corporate clients.',
      serviceFeeTZS: 85000,
      govtFeeTZS: 0,
      processingTime: '2–4 working days',
      popularity: 83,
      requirements: [
        'Company overview, services & logo',
        'Registration details & contact info',
      ],
    },
    {
      id: 'biz-plan-preparation',
      title: 'Business Plan Preparation',
      subGroup: 'Business Support',
      shortDescription:
        'Structured business plan with market overview and financial projections for loans, investors, or grants.',
      serviceFeeTZS: 150000,
      govtFeeTZS: 0,
      processingTime: '4–7 working days',
      popularity: 80,
      requirements: [
        'Business idea & target market details',
        'Estimated startup costs & revenue model',
      ],
    },
    {
      id: 'biz-online-reg-guidance',
      title: 'Online Business Registration Guidance',
      subGroup: 'Business Support',
      shortDescription:
        '1-on-1 digital consultation covering BRELA, TRA TIN, and Business Licence steps for new entrepreneurs.',
      serviceFeeTZS: 25000,
      govtFeeTZS: 0,
      processingTime: 'Same day',
      popularity: 81,
      requirements: ['Brief description of your planned business'],
    },
    // Document & Digital Services
    {
      id: 'doc-professional-typing',
      title: 'Professional Typing Services',
      subGroup: 'Document & Digital Services',
      shortDescription:
        'Fast, accurate typing of handwritten notes, contracts, reports, and academic or business manuscripts.',
      serviceFeeTZS: 15000,
      govtFeeTZS: 0,
      processingTime: 'Same day – 24 hrs',
      popularity: 79,
      requirements: ['Clear photos or scans of source material'],
    },
    {
      id: 'doc-official-letter-writing',
      title: 'Official Letter Writing',
      subGroup: 'Document & Digital Services',
      shortDescription:
        'Formal English or Swahili official letters for embassies, government offices, employers, and banks.',
      serviceFeeTZS: 20000,
      govtFeeTZS: 0,
      processingTime: 'Same day',
      popularity: 85,
      requirements: ['Recipient details & purpose of the letter'],
    },
    {
      id: 'doc-pdf-editing-conversion',
      title: 'PDF Editing and Conversion',
      subGroup: 'Document & Digital Services',
      shortDescription:
        'Merge, split, compress, convert Word/Image to PDF, and prepare portal-ready PDF files within size limits.',
      serviceFeeTZS: 10000,
      govtFeeTZS: 0,
      processingTime: 'Within 2–4 hours',
      popularity: 87,
      requirements: ['Source files (PDF, Word, or Images)'],
    },
    {
      id: 'doc-formatting',
      title: 'Document Formatting',
      subGroup: 'Document & Digital Services',
      shortDescription:
        'Clean layout, typography, tables, and page numbering for proposals, CVs, and official reports.',
      serviceFeeTZS: 20000,
      govtFeeTZS: 0,
      processingTime: 'Same day – 24 hrs',
      popularity: 75,
      requirements: ['Draft document file'],
    },
    {
      id: 'doc-online-form-filling',
      title: 'Online Form Filling',
      subGroup: 'Document & Digital Services',
      shortDescription:
        'Accurate completion of online job, scholarship, visa, or portal forms according to your provided data.',
      serviceFeeTZS: 20000,
      govtFeeTZS: 0,
      processingTime: 'Same day',
      popularity: 86,
      requirements: ['Portal link & required personal/document details'],
    },
    {
      id: 'doc-email-creation',
      title: 'Email Creation and Assistance',
      subGroup: 'Document & Digital Services',
      shortDescription:
        'Setup and recovery guidance for personal or business email accounts with 2-factor security.',
      serviceFeeTZS: 10000,
      govtFeeTZS: 0,
      processingTime: 'Same day',
      popularity: 74,
      requirements: ['Full name & active phone number'],
    },
    {
      id: 'doc-online-account-registration',
      title: 'Online Account Registration',
      subGroup: 'Document & Digital Services',
      shortDescription:
        'Guided setup for government, banking, education, or business online portal accounts.',
      serviceFeeTZS: 15000,
      govtFeeTZS: 0,
      processingTime: 'Same day',
      popularity: 78,
      requirements: ['NIDA NIN, email & active phone number'],
    },
    {
      id: 'doc-preparation',
      title: 'Document Preparation',
      subGroup: 'Document & Digital Services',
      shortDescription:
        'Complete scanning, naming, sizing, and checklist compilation for any online application.',
      serviceFeeTZS: 15000,
      govtFeeTZS: 0,
      processingTime: 'Same day',
      popularity: 80,
      requirements: ['Documents to be organized & compiled'],
    },
  ].map((s) =>
    makeService({
      ...s,
      category: 'Other Business & Digital Services',
    })
  ),
];

// =========================================================================
// INITIAL MOCK ORDERS, SERVICE REQUESTS, ADDRESSES, TESTIMONIALS & CLIPS
// =========================================================================

export const INITIAL_ORDERS: ElectronicsOrder[] = [
  {
    id: 'SHM-ORD-8421',
    date: '2026-11-12',
    status: 'In Transit',
    paymentMethod: 'M-Pesa Tanzania',
    totalTZS: 2950000,
    shippingAddress: 'Msasani Peninsula, Plot 14, Kinondoni, Dar es Salaam',
    estimatedDelivery: 'Arriving Today by 5:00 PM',
    items: [
      {
        productId: 'samsung-s24-ultra',
        name: 'Samsung Galaxy S24 Ultra 5G',
        image:
          'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80',
        variant: 'Titanium Gray · 256GB',
        quantity: 1,
        priceTZS: 2950000,
      },
    ],
  },
];

export const INITIAL_SERVICE_REQUESTS: ServiceRequestRecord[] = [
  {
    trackingId: 'SHM-SRV-49201',
    serviceId: 'immigration-new-passport',
    serviceTitle: 'New Passport Application Assistance',
    category: 'Immigration Services',
    submittedDate: '2026-11-10',
    estimatedCompletion: '1–2 days form prep',
    status: 'Processing',
    totalPaidTZS: 195000,
    paymentMethod: 'Tigo Pesa / Mixx by Yas',
    applicantName: 'Amani Juma',
    nidaNumber: '19940615-14102-00001-24',
    documents: [
      {
        reqId: 'id-copy',
        reqLabel: 'NIDA / National ID or Passport Copy',
        fileName: 'nida_amani_juma.pdf',
        fileSize: '1.1 MB',
        status: 'verified',
      },
      {
        reqId: 'supporting-doc',
        reqLabel: 'Verified Birth Certificate',
        fileName: 'erita_birth_cert.pdf',
        fileSize: '840 KB',
        status: 'verified',
      },
    ],
    messages: [
      {
        id: 'm1',
        sender: 'admin',
        senderName: 'Shema Digital Desk',
        text: 'Habari Amani! We have verified your eRITA birth certificate and NIDA NIN. Your e-Immigration form is prepared and your GePG control number is ready.',
        timestamp: '2026-11-11 10:15 AM',
      },
    ],
  },
  {
    trackingId: 'SHM-SRV-48910',
    serviceId: 'brela-new-business-name',
    serviceTitle: 'New Business Name Registration',
    category: 'BRELA Services',
    submittedDate: '2026-11-04',
    estimatedCompletion: '2–5 working days',
    status: 'Completed',
    totalPaidTZS: 60000,
    paymentMethod: 'Airtel Money',
    applicantName: 'Amani Juma',
    nidaNumber: '19940615-14102-00001-24',
    documents: [
      {
        reqId: 'id-copy',
        reqLabel: 'NIDA / National ID Copy',
        fileName: 'nida_amani_juma.pdf',
        fileSize: '1.1 MB',
        status: 'verified',
      },
    ],
    messages: [
      {
        id: 'm3',
        sender: 'admin',
        senderName: 'Shema BRELA Desk',
        text: 'Your BRELA Business Name Registration has been approved! Your Certificate of Registration is ready for download.',
        timestamp: '2026-11-08 02:40 PM',
        attachmentName: 'BRELA_Certificate_of_Registration.pdf',
      },
    ],
    finalDocumentUrl: '#download-certificate',
  },
];

export const INITIAL_ADDRESSES: SavedAddress[] = [
  {
    id: 'addr-1',
    label: 'Home (Dar es Salaam)',
    recipient: 'Amani Juma',
    phone: '+255 755 000 192',
    street: 'Msasani Peninsula, Plot 14',
    city: 'Dar es Salaam',
    region: 'Dar es Salaam',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Office (Arusha)',
    recipient: 'Amani Juma',
    phone: '+255 755 000 192',
    street: 'Sokoine Road, 2nd Floor',
    city: 'Arusha',
    region: 'Arusha',
    isDefault: false,
  },
];

export const TESTIMONIALS = [
  {
    name: 'Baraka M.',
    role: 'Entrepreneur · Arusha',
    pillar: 'BRELA & TRA Services',
    quote:
      'Shema helped me with my BRELA business name registration and TRA TIN application in days. Every government fee and service charge was clearly explained upfront.',
    rating: 5,
  },
  {
    name: 'Neema J.',
    role: 'Architect · Dar es Salaam',
    pillar: 'Dubai Sourcing',
    quote:
      'Requested a specific iPhone 16 Pro Max 512GB Desert Titanium sourced from Dubai. Confirmed price on WhatsApp and received it sealed in 5 days!',
    rating: 5,
  },
  {
    name: 'Hassan K.',
    role: 'Consultant · Mwanza',
    pillar: 'RITA & Immigration',
    quote:
      'Used Shema for eRITA birth certificate verification and e-Immigration passport form assistance. Clean, transparent, and fast.',
    rating: 5,
  },
];

export const FAQS = [
  {
    q: 'Does Shema issue government certificates or approvals directly?',
    a: 'No. Shema operates as an independent Digital Services Assistance Provider. All official registrations, certificates, NINs, TINs, and passports are issued solely by the respective Tanzanian government authorities (RITA, NIDA, TRA, BRELA, Immigration).',
  },
  {
    q: 'Are government fees and Shema service charges shown separately?',
    a: 'Yes! On every digital service card and application summary, official government fees and Shema’s assistance charges are displayed separately for full transparency.',
  },
  {
    q: 'How does Dubai sourcing work for phones, laptops, and electronics?',
    a: 'Shema is a Tanzanian business with procurement in Dubai, UAE. Some items are available locally in Tanzania for immediate dispatch. For phones, laptops, and electronics marked "On Order (Dubai)", once you place and confirm your order, we purchase the item for you in Dubai and deliver it safely to you in Tanzania (typically 4–7 business days). Prices and availability are always confirmed before orders are finalised.',
  },
  {
    q: 'Can I request a phone model or gadget not listed on the website?',
    a: 'Yes! Use the "Request a Product" button on the Electronics page to specify any smartphone, laptop, or gadget brand, storage capacity, colour, and specs, or message us directly on WhatsApp.',
  },
];

export const INITIAL_CLIPS: VideoClip[] = [
  {
    id: 'clip-1',
    title: 'iPhone 16 Pro Max — Dubai Sourcing to Dar es Salaam in 5 Days!',
    creator: 'Shema Tech Desk',
    creatorHandle: '@shema.electronics',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
    views: 14820,
    likes: 1940,
    linkedType: 'product',
    linkedId: 'apple-iphone-16-pro-max',
    linkedLabel: 'Apple iPhone 16 Pro Max',
    comments: [
      {
        id: 'c1',
        author: 'Neema_TZ',
        text: 'Confirmed price on WhatsApp and got my sealed unit in Dar!',
        timestamp: '2h ago',
      },
    ],
  },
  {
    id: 'clip-2',
    title: 'How to Prepare Your Tanzania e-Immigration Passport & eRITA Documents',
    creator: 'Shema Digital Desk',
    creatorHandle: '@shemadigital.tz',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=600&q=80',
    views: 28450,
    likes: 4120,
    linkedType: 'service',
    linkedId: 'immigration-new-passport',
    linkedLabel: 'New Passport Application Assistance',
    comments: [],
  },
  {
    id: 'clip-3',
    title: 'Samsung Galaxy S24 Ultra — Available Locally in Tanzania!',
    creator: 'Shema Tech Desk',
    creatorHandle: '@shema.electronics',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80',
    views: 9310,
    likes: 875,
    linkedType: 'product',
    linkedId: 'samsung-s24-ultra',
    linkedLabel: 'Samsung Galaxy S24 Ultra 5G',
    comments: [],
  },
];
