export type AppView = 
  | 'home'
  | 'explore'
  | 'product-detail'
  | 'verify'
  | 'verifier-dashboard'
  | 'artisan-dashboard'
  | 'artisans';

export interface PriceBreakdown {
  artisan: number;
  logistics: number;
  craftpass: number;
  currency: string;
}

export interface VerificationCheck {
  id: string;
  label: string;
  icon: string;
  verified: boolean;
  notes?: string;
}

export interface VerificationTimelineEvent {
  step: number;
  title: string;
  date: string;
  icon: string;
  status: 'completed' | 'current' | 'pending';
}

export interface CraftProduct {
  id: string;
  certificateId: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  isVerified: boolean;
  isGiTagged: boolean;
  giTagLabel?: string;
  origin: string;
  region: string;
  material: string;
  technique: string;
  craftingTime: string;
  description: string;
  mainImage: string;
  galleryImages?: string[];
  artisanId: string;
  artisanName: string;
  artisanAvatar: string;
  artisanExperience: string;
  artisanBio: string;
  priceBreakdown: PriceBreakdown;
  verificationChecks: VerificationCheck[];
  timeline: VerificationTimelineEvent[];
  verificationDate: string;
}

export interface VerificationRequest {
  id: string;
  certificateId: string;
  craftName: string;
  productName: string;
  artisanId: string;
  artisanName: string;
  artisanAvatar: string;
  artisanRegNumber: string;
  region: string;
  giTagRegistered: boolean;
  giTagName?: string;
  status: 'pending' | 'needs_info' | 'verified' | 'rejected';
  submittedTimeAgo: string;
  submissionDate: string;
  declaredMaterials: string[];
  declaredProcess: string;
  mainImage: string;
  processImages: string[];
  verifierNotes?: string;
  checks: {
    artisanIdentity: boolean;
    originAndGi: boolean;
    processAndMaterials: boolean;
  };
}

export interface ArtisanProfile {
  id: string;
  name: string;
  craft: string;
  location: string;
  avatar: string;
  experienceYears: number;
  bio: string;
  productsCount: number;
  verifiedCount: number;
  status: 'Verified' | 'Pending';
  giCertified: boolean;
  specialty: string;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  productName: string;
  price: number;
  currency: string;
  date: string;
  status: 'Delivered' | 'In Transit' | 'Processing';
  buyerName: string;
}
