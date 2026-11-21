export type Currency = 'GHS' | 'USD';

export interface ProductVariant {
  name: string;
  options: string[];
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Smartphones' | 'TVs & Audio' | 'Home Appliances' | 'Laptops & Accessories';
  priceGHS: number;
  originalPriceGHS?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  images: string[];
  badge?: string;
  deliveryEstimate: string;
  warranty: string;
  shortDescription: string;
  specs: Record<string, string>;
  colors: { name: string; hex: string }[];
  storageOptions?: string[];
  reviews: ProductReview[];
}

export type ServiceCategory =
  | 'Passport'
  | 'Permits & Licenses'
  | 'Tax & Business'
  | 'Utility Assistance';

export interface ServiceDocumentReq {
  id: string;
  label: string;
  description: string;
  required: boolean;
}

export interface DigitalService {
  id: string;
  title: string;
  category: ServiceCategory;
  serviceFeeGHS: number;
  govtFeeGHS: number;
  processingTime: string;
  badge?: string;
  shortDescription: string;
  fullDescription: string;
  requirements: string[];
  requiredDocuments: ServiceDocumentReq[];
  stepsSummary: string[];
  popularity: number;
}

export interface UploadedDoc {
  reqId: string;
  reqLabel: string;
  fileName: string;
  fileSize: string;
  status: 'verified' | 'uploaded';
}

export interface ServiceApplicationPayload {
  fullName: string;
  ghanaCardNumber: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  deliveryMethod: 'Digital Delivery (Email/Portal)' | 'Office Pickup (Accra Central)' | 'Courier Dispatch';
  notes?: string;
  documents: UploadedDoc[];
}

export type CartItem =
  | {
      type: 'product';
      cartItemId: string;
      product: Product;
      quantity: number;
      selectedColor: string;
      selectedStorage?: string;
    }
  | {
      type: 'service';
      cartItemId: string;
      service: DigitalService;
      application: ServiceApplicationPayload;
    };

export type OrderStatus = 'Confirmed' | 'Packed' | 'In Transit' | 'Delivered';
export type ServiceRequestStatus = 'Submitted' | 'Under Review' | 'Processing' | 'Completed';

export interface ElectronicsOrder {
  id: string;
  date: string;
  status: OrderStatus;
  paymentMethod: string;
  totalGHS: number;
  shippingAddress: string;
  estimatedDelivery: string;
  items: {
    productId: string;
    name: string;
    image: string;
    variant: string;
    quantity: number;
    priceGHS: number;
  }[];
}

export interface AdminMessage {
  id: string;
  sender: 'user' | 'admin';
  senderName: string;
  text: string;
  timestamp: string;
  attachmentName?: string;
}

export interface ServiceRequestRecord {
  trackingId: string;
  serviceId: string;
  serviceTitle: string;
  category: ServiceCategory;
  submittedDate: string;
  estimatedCompletion: string;
  status: ServiceRequestStatus;
  totalPaidGHS: number;
  paymentMethod: string;
  applicantName: string;
  ghanaCardNumber: string;
  documents: UploadedDoc[];
  messages: AdminMessage[];
  finalDocumentUrl?: string;
}

export interface SavedAddress {
  id: string;
  label: string;
  recipient: string;
  phone: string;
  street: string;
  city: string;
  region: string;
  isDefault: boolean;
}

export interface ClipComment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface VideoClip {
  id: string;
  title: string;
  creator: string;
  creatorHandle: string;
  videoUrl: string;
  thumbnailUrl: string;
  views: number;
  likes: number;
  isLiked?: boolean;
  isSaved?: boolean;
  linkedType: 'product' | 'service';
  linkedId: string;
  linkedLabel: string;
  comments: ClipComment[];
}
