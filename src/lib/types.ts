export interface CompanyInfo {
  name: string;
  description: string;
  industry: string;
  founded: string;
  employees: string;
  location: string;
  logo: string;
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
}

export interface ProductInfo {
  pricing: PricingTier[];
  features: string[];
  usp: string;
  targetAudience: string;
}

export interface SocialMedia {
  twitter: string;
  linkedin: string;
  facebook: string;
  instagram: string;
}

export interface MarketingInfo {
  seoScore: number;
  trafficEstimate: string;
  socialMedia: SocialMedia;
  contentStrategy: string;
}

export interface TechInfo {
  stack: string[];
  analytics: string[];
  cms: string;
  cdn: string;
  hosting: string;
}

export interface SwotInfo {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface CompetitorReport {
  id: string;
  url: string;
  createdAt: string;
  company: CompanyInfo;
  product: ProductInfo;
  marketing: MarketingInfo;
  tech: TechInfo;
  swot: SwotInfo;
  recommendations: string[];
}
