import type {
  DigitalService,
  ElectronicsOrder,
  Product,
  SavedAddress,
  ServiceRequestRecord,
  VideoClip,
} from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra 5G',
    brand: 'Samsung',
    category: 'Smartphones',
    priceGHS: 14850,
    originalPriceGHS: 16200,
    rating: 4.9,
    reviewCount: 128,
    inStock: true,
    stockCount: 14,
    badge: 'Best Seller',
    deliveryEstimate: 'Same-day in Accra · 1–2 days nationwide',
    warranty: '24-Month Official Samsung Ghana Warranty',
    shortDescription:
      'Titanium frame, 200MP Pro-grade camera, built-in S Pen, and Galaxy AI productivity suite.',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
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
        id: 'r1',
        author: 'Kwame Mensah',
        rating: 5,
        date: '2026-10-28',
        comment: 'Sealed box delivered to East Legon within 3 hours. Genuine Samsung warranty verified!',
        verified: true,
      },
      {
        id: 'r2',
        author: 'Abena Osei',
        rating: 5,
        date: '2026-10-15',
        comment: 'Camera is unreal. Paid easily with MTN MoMo.',
        verified: true,
      },
    ],
  },
  {
    id: 'lg-oled-65-c4',
    name: 'LG 65" 4K UHD Smart OLED evo TV',
    brand: 'LG',
    category: 'TVs & Audio',
    priceGHS: 19500,
    originalPriceGHS: 22400,
    rating: 4.8,
    reviewCount: 74,
    inStock: true,
    stockCount: 6,
    badge: '13% Off',
    deliveryEstimate: 'Free White-Glove Delivery in Accra & Tema',
    warranty: '24-Month LG Warranty + Free Surge Protector',
    shortDescription:
      'Self-lit OLED pixels with α9 AI Processor Gen7, Dolby Vision IQ, and 120Hz gaming support.',
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1571415060716-baff5f717c37?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [{ name: 'Obsidian Black', hex: '#0F172A' }],
    storageOptions: ['65-Inch', '55-Inch'],
    specs: {
      Resolution: '3840 x 2160 (4K Ultra HD)',
      Panel: 'OLED evo 120Hz',
      SmartOS: 'webOS 24 with ThinQ AI',
      Audio: '40W Dolby Atmos',
      Ports: '4x HDMI 2.1, 3x USB',
    },
    reviews: [
      {
        id: 'r3',
        author: 'Daniel Boateng',
        rating: 5,
        date: '2026-11-02',
        comment: 'Shema technicians mounted it on the wall the same day. Picture quality is cinema-grade.',
        verified: true,
      },
    ],
  },
  {
    id: 'macbook-air-m3',
    name: 'Apple MacBook Air 13" M3 Chip',
    brand: 'Apple',
    category: 'Laptops & Accessories',
    priceGHS: 16900,
    originalPriceGHS: 18200,
    rating: 4.9,
    reviewCount: 92,
    inStock: true,
    stockCount: 9,
    badge: 'Top Rated',
    deliveryEstimate: 'Same-day in Accra · 1–2 days nationwide',
    warranty: '12-Month AppleCare Limited Warranty',
    shortDescription:
      'Ultra-thin aluminum laptop powered by Apple M3, 18-hour battery life, and Liquid Retina display.',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Midnight', hex: '#1E293B' },
      { name: 'Starlight', hex: '#E2D9C8' },
      { name: 'Space Gray', hex: '#6B7280' },
    ],
    storageOptions: ['8GB / 256GB', '16GB / 512GB'],
    specs: {
      Chip: 'Apple M3 8-Core CPU / 10-Core GPU',
      Display: '13.6" Liquid Retina (500 nits)',
      Battery: 'Up to 18 hours',
      Weight: '1.24 kg',
      Connectivity: 'MagSafe 3, 2x Thunderbolt, Wi-Fi 6E',
    },
    reviews: [],
  },
  {
    id: 'hisense-double-door-fridge',
    name: 'Hisense 450L Inverter Double-Door Fridge',
    brand: 'Hisense',
    category: 'Home Appliances',
    priceGHS: 7650,
    originalPriceGHS: 8400,
    rating: 4.7,
    reviewCount: 53,
    inStock: true,
    stockCount: 11,
    badge: 'Energy Saver',
    deliveryEstimate: 'Next-day scheduled home delivery',
    warranty: '36-Month Compressor Warranty',
    shortDescription:
      'Frost-free Inverter technology built for tropical climates with voltage fluctuation protection.',
    images: [
      'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Brushed Inox', hex: '#94A3B8' },
      { name: 'Matte Black', hex: '#1E293B' },
    ],
    specs: {
      Capacity: '450 Litres Net',
      Compressor: 'Pro Inverter (Low Noise)',
      Cooling: 'Multi-Air Flow No Frost',
      Voltage: '160V – 260V Wide Range',
      EnergyRating: 'A++ Eco',
    },
    reviews: [],
  },
  {
    id: 'iphone-16-pro',
    name: 'Apple iPhone 16 Pro (Factory Unlocked)',
    brand: 'Apple',
    category: 'Smartphones',
    priceGHS: 17400,
    originalPriceGHS: 18900,
    rating: 4.9,
    reviewCount: 112,
    inStock: true,
    stockCount: 7,
    badge: 'New Arrival',
    deliveryEstimate: 'Same-day in Accra · Insured Courier',
    warranty: '12-Month Apple Official Warranty',
    shortDescription:
      'Grade 5 Titanium design, A18 Pro chip, 4K 120fps Dolby Vision video, and Camera Control.',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Desert Titanium', hex: '#C2A88B' },
      { name: 'Natural Titanium', hex: '#8E8D8A' },
      { name: 'Black Titanium', hex: '#18181B' },
    ],
    storageOptions: ['128GB', '256GB', '512GB'],
    specs: {
      Display: '6.3" Super Retina XDR ProMotion',
      Chip: 'A18 Pro (3nm)',
      Camera: '48MP Fusion + 48MP Ultra Wide + 5x Telephoto',
      Connectivity: '5G, Wi-Fi 7, USB-C',
    },
    reviews: [],
  },
  {
    id: 'anker-solix-power-station',
    name: 'Anker SOLIX C1000 Portable Power Station',
    brand: 'Anker',
    category: 'Laptops & Accessories',
    priceGHS: 9200,
    originalPriceGHS: 10500,
    rating: 4.8,
    reviewCount: 64,
    inStock: true,
    stockCount: 15,
    badge: 'Dumsor Proof',
    deliveryEstimate: 'Same-day dispatch',
    warranty: '5-Year Anker LiFePO4 Warranty',
    shortDescription:
      '1056Wh LiFePO4 backup power station with 1800W AC output—powers TVs, Wi-Fi, laptops & fridges.',
    images: [
      'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [{ name: 'Dark Slate', hex: '#334155' }],
    specs: {
      Capacity: '1,056Wh (LiFePO4 3,000+ Cycles)',
      Output: '1,800W Pure Sine Wave (2,400W Surge)',
      Recharge: '0–100% in 58 mins (HyperFlash)',
      Ports: '6x AC, 2x USB-C (100W), 2x USB-A',
    },
    reviews: [],
  },
  {
    id: 'lg-inverter-ac-15hp',
    name: 'LG DualCool 1.5HP Inverter Split AC',
    brand: 'LG',
    category: 'Home Appliances',
    priceGHS: 5950,
    originalPriceGHS: 6600,
    rating: 4.6,
    reviewCount: 39,
    inStock: true,
    stockCount: 8,
    deliveryEstimate: '1–2 days · Installation available',
    warranty: '10-Year Dual Inverter Compressor Warranty',
    shortDescription:
      'Up to 70% energy saving with Dual Inverter compressor, fast cooling, and low-voltage operation.',
    images: [
      'https://images.unsplash.com/photo-1631545806609-c2f4d1914704?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [{ name: 'Pure White', hex: '#F8FAFC' }],
    specs: {
      Capacity: '1.5 HP (12,000 BTU)',
      Refrigerant: 'R32 Eco-Friendly',
      Noise: '19 dB Ultra Quiet',
      Filter: 'Auto Clean + Anti-Dust',
    },
    reviews: [],
  },
  {
    id: 'sony-wh1000xm5',
    name: 'Sony WH-1000XM5 Wireless ANC Headphones',
    brand: 'Sony',
    category: 'TVs & Audio',
    priceGHS: 4100,
    originalPriceGHS: 4650,
    rating: 4.9,
    reviewCount: 87,
    inStock: false,
    stockCount: 0,
    badge: 'Restocking Soon',
    deliveryEstimate: 'Back in stock in 3 days',
    warranty: '12-Month Sony Warranty',
    shortDescription:
      'Industry-leading noise cancellation with 8 microphones, 30-hour battery, and multipoint pairing.',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=900&q=80',
    ],
    colors: [
      { name: 'Midnight Black', hex: '#0F172A' },
      { name: 'Platinum Silver', hex: '#CBD5E1' },
    ],
    specs: {
      Battery: '30 Hours (ANC On)',
      Charging: 'USB-C PD (3 min = 3 hrs)',
      Bluetooth: '5.2 Multipoint',
      Weight: '250g',
    },
    reviews: [],
  },
];

export const DIGITAL_SERVICES: DigitalService[] = [
  {
    id: 'passport-standard-assistance',
    title: 'Standard Biometric Passport Assistance',
    category: 'Passport',
    serviceFeeGHS: 280,
    govtFeeGHS: 500,
    processingTime: '5–7 Working Days (Expedited Booking)',
    badge: 'Most Popular',
    shortDescription:
      'End-to-end online passport form completion, biometric appointment scheduling, and document pre-verification.',
    fullDescription:
      'Avoid queues and rejected forms. Our certified digital specialists verify your Birth Certificate and Ghana Card details, complete your official passport application, book your nearest PAC biometric slot, and track your booklet status until collection.',
    requirements: [
      'Original / Certified Birth Certificate (Digital Scan)',
      'Valid Ghana Card (Front & Back)',
      'Recent Passport-Sized Photograph (White Background)',
      'Guarantor Details (Name, Phone & Ghana Card ID)',
    ],
    requiredDocuments: [
      {
        id: 'doc-birth-cert',
        label: 'Birth Certificate',
        description: 'Clear scan or photo of your certified Birth Certificate (PDF, JPG, PNG)',
        required: true,
      },
      {
        id: 'doc-ghana-card',
        label: 'Ghana Card (Front & Back)',
        description: 'Valid NIA Ghana Card clearly showing your PIN',
        required: true,
      },
      {
        id: 'doc-passport-photo',
        label: 'Passport Photograph',
        description: 'Recent digital photo on a plain white background',
        required: true,
      },
    ],
    stepsSummary: [
      'Submit personal & guarantor details online',
      'Upload Birth Certificate, Ghana Card & photo',
      'Shema specialist audits for 100% accuracy',
      'Receive confirmed PAC biometric appointment slip',
    ],
    popularity: 99,
  },
  {
    id: 'passport-express-renewal',
    title: 'Express Passport Renewal & Lost Replacement',
    category: 'Passport',
    serviceFeeGHS: 420,
    govtFeeGHS: 800,
    processingTime: '3–5 Working Days',
    badge: 'Fast-Track',
    shortDescription:
      'Priority handling for expired, full, or misplaced biometric passports with affidavit guidance.',
    fullDescription:
      'Designed for urgent travelers. We handle renewal filings, police extract/affidavit formatting for lost booklets, and secure the earliest priority biometric appointment.',
    requirements: [
      'Bio-data page of previous passport (or Police Extract if lost)',
      'Valid Ghana Card',
      'Recent Passport-Sized Photograph',
    ],
    requiredDocuments: [
      {
        id: 'doc-old-passport',
        label: 'Old Passport Bio Page / Police Extract',
        description: 'Scan of existing passport bio-data page or police report',
        required: true,
      },
      {
        id: 'doc-ghana-card',
        label: 'Ghana Card',
        description: 'Valid NIA Ghana Card',
        required: true,
      },
    ],
    stepsSummary: [
      'Upload old passport or police extract',
      'Priority verification within 4 hours',
      'Express PAC slot confirmation sent to your portal',
    ],
    popularity: 92,
  },
  {
    id: 'ghana-card-nia-assistance',
    title: 'National ID (Ghana Card) Update & Replacement',
    category: 'Permits & Licenses',
    serviceFeeGHS: 150,
    govtFeeGHS: 120,
    processingTime: '2–4 Working Days',
    badge: 'High Demand',
    shortDescription:
      'Assistance with NIA record corrections, name/DOB updates, and lost card replacement scheduling.',
    fullDescription:
      'Resolve NIA biometric mismatches, SIM-registration linkage errors, or damaged/lost card replacements with guided documentation and scheduled center booking.',
    requirements: [
      'Sworn Affidavit or Gazette (for name changes)',
      'Birth Certificate or Old Passport',
      'Police Extract (for lost card)',
    ],
    requiredDocuments: [
      {
        id: 'doc-supporting-id',
        label: 'Supporting ID / Birth Certificate',
        description: 'Official document confirming your correct details',
        required: true,
      },
      {
        id: 'doc-affidavit',
        label: 'Affidavit / Police Extract (if applicable)',
        description: 'Required for name changes or lost cards',
        required: false,
      },
    ],
    stepsSummary: [
      'Choose update or replacement type',
      'Upload supporting proof',
      'Receive NIA center appointment & checklist',
    ],
    popularity: 88,
  },
  {
    id: 'rgd-business-registration',
    title: 'Business Name & RGD Company Registration',
    category: 'Tax & Business',
    serviceFeeGHS: 350,
    govtFeeGHS: 480,
    processingTime: '5–8 Working Days',
    badge: 'Entrepreneur',
    shortDescription:
      'Complete Registrar General’s Department (RGD) Sole Proprietorship or Limited Liability registration + GRA TIN.',
    fullDescription:
      'Launch your business legally without stepping into a government office. We run name availability checks, file Form A / Form 3, generate your GRA TIN, and deliver your digital & physical certificates.',
    requirements: [
      '3 Proposed Business Names',
      'Director / Proprietor Ghana Card',
      'Business Digital Address (GhanaPost GPS)',
    ],
    requiredDocuments: [
      {
        id: 'doc-director-id',
        label: 'Proprietor / Director Ghana Card',
        description: 'Clear front and back scan',
        required: true,
      },
      {
        id: 'doc-gps',
        label: 'GhanaPost GPS Proof / Utility Bill',
        description: 'Screenshot of GhanaPost GPS or recent utility bill',
        required: false,
      },
    ],
    stepsSummary: [
      'Submit 3 proposed names & business activity',
      'We conduct RGD name search & file forms',
      'Receive Certificate of Incorporation & TIN',
    ],
    popularity: 95,
  },
  {
    id: 'gra-tin-tax-clearance',
    title: 'GRA TIN Registration & Tax Clearance Support',
    category: 'Tax & Business',
    serviceFeeGHS: 120,
    govtFeeGHS: 0,
    processingTime: '24–48 Hours',
    shortDescription:
      'Fast Taxpayer Identification Number (TIN) generation, Ghana Card TIN linkage, and Tax Clearance filing.',
    fullDescription:
      'Need a TIN for banking, vehicle registration, or tender bidding? Our tax desk processes individual and corporate TIN registrations within 48 hours.',
    requirements: ['Valid Ghana Card', 'Active Phone Number & Email', 'Residential GhanaPost GPS'],
    requiredDocuments: [
      {
        id: 'doc-ghana-card',
        label: 'Ghana Card',
        description: 'Valid NIA card for TIN linkage',
        required: true,
      },
    ],
    stepsSummary: [
      'Enter personal/business details',
      'Upload Ghana Card',
      'Download official TIN certificate from your portal',
    ],
    popularity: 84,
  },
  {
    id: 'utility-ecg-gwcl-assistance',
    title: 'ECG / GWCL Utility Bill & New Meter Assistance',
    category: 'Utility Assistance',
    serviceFeeGHS: 95,
    govtFeeGHS: 0,
    processingTime: 'Same Day – 48 Hours',
    shortDescription:
      'Instant postpaid/prepaid bill settlement, consolidated receipts, and new meter application filing.',
    fullDescription:
      'Pay multiple ECG electricity or Ghana Water (GWCL) bills with verified official receipts, or let our team submit your new residential/commercial meter application.',
    requirements: ['Meter / Account Number', 'GhanaPost GPS Address', 'Ghana Card (for new meter)'],
    requiredDocuments: [
      {
        id: 'doc-meter-bill',
        label: 'Previous Bill or Meter Photo',
        description: 'Photo of meter number or recent bill statement',
        required: true,
      },
    ],
    stepsSummary: [
      'Provide meter number & address',
      'Pay securely via MoMo or Card',
      'Download stamped payment receipt or meter tracking slip',
    ],
    popularity: 81,
  },
  {
    id: 'dvla-license-renewal',
    title: 'DVLA Driver’s License Renewal & IDP',
    category: 'Permits & Licenses',
    serviceFeeGHS: 220,
    govtFeeGHS: 310,
    processingTime: '3–5 Working Days',
    shortDescription:
      'Hassle-free renewal of expired driver’s licenses or International Driving Permit (IDP) processing.',
    fullDescription:
      'Skip the long queues. We prepare your DVLA renewal forms, schedule your eye test/biometric capture, and notify you as soon as your smart card is ready.',
    requirements: [
      'Current / Expired Driver’s License',
      'Valid Ghana Card',
      '2 Passport Photographs',
    ],
    requiredDocuments: [
      {
        id: 'doc-old-license',
        label: 'Current Driver’s License',
        description: 'Front & back photo of your license',
        required: true,
      },
      {
        id: 'doc-ghana-card',
        label: 'Ghana Card',
        description: 'Valid NIA card',
        required: true,
      },
    ],
    stepsSummary: [
      'Upload existing license & Ghana Card',
      'Form verification & DVLA booking',
      'Receive collection SMS & portal confirmation',
    ],
    popularity: 79,
  },
];

export const INITIAL_ORDERS: ElectronicsOrder[] = [
  {
    id: 'SHM-ORD-1042',
    date: '2026-11-12',
    status: 'In Transit',
    paymentMethod: 'MTN Mobile Money',
    totalGHS: 14850,
    shippingAddress: 'Plot 14, Liberation Road, Airport Residential, Accra',
    estimatedDelivery: 'Today by 5:00 PM',
    items: [
      {
        productId: 'samsung-s24-ultra',
        name: 'Samsung Galaxy S24 Ultra 5G',
        image:
          'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=300&q=80',
        variant: 'Titanium Gray · 256GB',
        quantity: 1,
        priceGHS: 14850,
      },
    ],
  },
  {
    id: 'SHM-ORD-0987',
    date: '2026-10-24',
    status: 'Delivered',
    paymentMethod: 'Visa Card (•••• 4821)',
    totalGHS: 9200,
    shippingAddress: 'Plot 14, Liberation Road, Airport Residential, Accra',
    estimatedDelivery: 'Delivered on 2026-10-25',
    items: [
      {
        productId: 'anker-solix-power-station',
        name: 'Anker SOLIX C1000 Portable Power Station',
        image:
          'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=300&q=80',
        variant: 'Dark Slate',
        quantity: 1,
        priceGHS: 9200,
      },
    ],
  },
];

export const INITIAL_SERVICE_REQUESTS: ServiceRequestRecord[] = [
  {
    trackingId: 'SHM-SRV-84920',
    serviceId: 'passport-standard-assistance',
    serviceTitle: 'Standard Biometric Passport Assistance',
    category: 'Passport',
    submittedDate: '2026-11-14',
    estimatedCompletion: '2026-11-21',
    status: 'Processing',
    totalPaidGHS: 780,
    paymentMethod: 'MTN Mobile Money',
    applicantName: 'Kofi Asante',
    ghanaCardNumber: 'GHA-728491023-4',
    documents: [
      {
        reqId: 'doc-birth-cert',
        reqLabel: 'Birth Certificate',
        fileName: 'kofi_birth_cert.pdf',
        fileSize: '1.4 MB',
        status: 'verified',
      },
      {
        reqId: 'doc-ghana-card',
        reqLabel: 'Ghana Card (Front & Back)',
        fileName: 'kofi_ghana_card.jpg',
        fileSize: '840 KB',
        status: 'verified',
      },
      {
        reqId: 'doc-passport-photo',
        reqLabel: 'Passport Photograph',
        fileName: 'kofi_photo_whitebg.png',
        fileSize: '620 KB',
        status: 'verified',
      },
    ],
    messages: [
      {
        id: 'm1',
        sender: 'admin',
        senderName: 'Ama (Shema Passport Desk)',
        text: 'Hello Kofi! Your Birth Certificate and Ghana Card have been verified. Your biometric capture at Ridge PAC is scheduled for Nov 19 at 9:30 AM.',
        timestamp: '2026-11-15 10:14 AM',
      },
      {
        id: 'm2',
        sender: 'user',
        senderName: 'Kofi Asante',
        text: 'Thank you! Do I need to print the appointment slip before coming?',
        timestamp: '2026-11-15 11:02 AM',
      },
      {
        id: 'm3',
        sender: 'admin',
        senderName: 'Ama (Shema Passport Desk)',
        text: 'Yes, please bring the printed slip (available in your portal once status reaches Completed) along with your original Ghana Card.',
        timestamp: '2026-11-15 11:08 AM',
      },
    ],
  },
  {
    trackingId: 'SHM-SRV-73104',
    serviceId: 'gra-tin-tax-clearance',
    serviceTitle: 'GRA TIN Registration & Tax Clearance Support',
    category: 'Tax & Business',
    submittedDate: '2026-11-01',
    estimatedCompletion: '2026-11-03',
    status: 'Completed',
    totalPaidGHS: 120,
    paymentMethod: 'Telecel Cash',
    applicantName: 'Kofi Asante',
    ghanaCardNumber: 'GHA-728491023-4',
    documents: [
      {
        reqId: 'doc-ghana-card',
        reqLabel: 'Ghana Card',
        fileName: 'kofi_ghana_card.jpg',
        fileSize: '840 KB',
        status: 'verified',
      },
    ],
    messages: [
      {
        id: 'm4',
        sender: 'admin',
        senderName: 'Yaw (Tax & RGD Desk)',
        text: 'Your GRA TIN Certificate is ready! Click the Download Final Document button above.',
        timestamp: '2026-11-02 03:45 PM',
      },
    ],
    finalDocumentUrl: '#download-tin-certificate',
  },
];

export const INITIAL_ADDRESSES: SavedAddress[] = [
  {
    id: 'addr-1',
    label: 'Home (Airport Residential)',
    recipient: 'Kofi Asante',
    phone: '+233 24 555 0192',
    street: 'Plot 14, Liberation Road',
    city: 'Accra',
    region: 'Greater Accra',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Office (Osu)',
    recipient: 'Kofi Asante',
    phone: '+233 24 555 0192',
    street: 'Oxford Street, 3rd Floor, Heritage Tower',
    city: 'Accra',
    region: 'Greater Accra',
    isDefault: false,
  },
];

export const TESTIMONIALS = [
  {
    name: 'Nana Yaw K.',
    role: 'Business Owner · Kumasi',
    pillar: 'Digital Services',
    quote:
      'Shema registered my limited liability company and linked my GRA TIN in 6 days without me traveling to Accra once. The live tracking bar gave me total peace of mind.',
    rating: 5,
  },
  {
    name: 'Efua Mensah',
    role: 'Architect · East Legon',
    pillar: 'Electronics Store',
    quote:
      'Ordered a 65" LG OLED TV and an Anker Power Station in the morning, paid via MTN MoMo, and had both delivered and installed before 5 PM.',
    rating: 5,
  },
  {
    name: 'Selorm Agbeko',
    role: 'Software Engineer · Tema',
    pillar: 'Hybrid Checkout',
    quote:
      'Love that I could buy a MacBook Air and pay for my express passport renewal in one checkout! Their WhatsApp desk answered my document questions in 2 minutes.',
    rating: 5,
  },
];

export const FAQS = [
  {
    q: 'Can I buy electronics and apply for a government service in the same checkout?',
    a: 'Yes! Our Unified Hybrid Cart lets you combine physical gadgets (with home delivery or pickup) and digital service applications (with your uploaded documents) in a single secure Mobile Money or Card payment.',
  },
  {
    q: 'How are my uploaded IDs and passport documents protected?',
    a: 'All documents uploaded to the Shema Digital Services Portal are encrypted in transit and at rest, used strictly for your authorized application, and automatically purged after completion.',
  },
  {
    q: 'Do your electronics come with official manufacturer warranties?',
    a: 'Every product sold by Shema Electronics is 100% authentic, factory-sealed, and backed by 12 to 36 months of official local manufacturer warranty.',
  },
  {
    q: 'Which Mobile Money networks and cards do you accept?',
    a: 'We accept MTN Mobile Money (MoMo), Telecel (Vodafone) Cash, AirtelTigo Money, as well as Visa and Mastercard debit/credit cards.',
  },
];

export const INITIAL_CLIPS: VideoClip[] = [
  {
    id: 'clip-1',
    title: 'Unboxing the Galaxy S24 Ultra 5G — 200MP Camera & S-Pen Test in Accra!',
    creator: 'Shema Tech Desk',
    creatorHandle: '@shematech.gh',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80',
    views: 14820,
    likes: 1940,
    linkedType: 'product',
    linkedId: 'samsung-s24-ultra',
    linkedLabel: 'Samsung Galaxy S24 Ultra 5G',
    comments: [
      {
        id: 'c1',
        author: 'Kwabena_O',
        text: 'Got mine from Shema yesterday, sealed box and official warranty!',
        timestamp: '2h ago',
      },
    ],
  },
  {
    id: 'clip-2',
    title: 'How to Fast-Track Your Ghana Biometric Passport in 5-7 Days (No Queues!)',
    creator: 'Shema Civic Concierge',
    creatorHandle: '@shemadigital.gh',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=600&q=80',
    views: 28450,
    likes: 4120,
    linkedType: 'service',
    linkedId: 'passport-standard-assistance',
    linkedLabel: 'Standard Biometric Passport Assistance',
    comments: [
      {
        id: 'c2',
        author: 'Akosua_M',
        text: 'Used this service last week. Got my Ridge PAC appointment slip in 24 hrs!',
        timestamp: '5h ago',
      },
    ],
  },
  {
    id: 'clip-3',
    title: 'Dumsor-Proof Your Home Office with Anker SOLIX C1000 (58-Min Recharge)',
    creator: 'Shema Power Lab',
    creatorHandle: '@shematech.gh',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=600&q=80',
    views: 9310,
    likes: 875,
    linkedType: 'product',
    linkedId: 'anker-solix-power-station',
    linkedLabel: 'Anker SOLIX C1000 Power Station',
    comments: [],
  },
];
