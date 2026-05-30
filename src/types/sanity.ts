export interface TrustedBrand {
  name: string;
  logoUrl?: string;
}

export interface SiteSettings {
  brandName: string;
  taglineHighlight: string;
  tagline: string;
  bookCallUrl: string;
  statsLine: string;
  trustedBy: TrustedBrand[];
  trustedByHighlightText: string;
  heroHeadline: string;
}
export interface SanityVideo {
  _id: string;
  title: string;
  subtitle?: string;
  duration?: string;
  tag?: "Brand Film" | "Podcast Clip" | "Social" | "Documentary" | "Reel" | "Other";
  thumbnail: {
    asset: {
      _ref: string;
      url: string;
    };
    hotspot?: {
      x: number;
      y: number;
    };
  };
  featured: boolean;
  order?: number;
  loopClipUrl?: string;
  loopClipPoster?: string;
}
export interface PricingTier {
  _id: string;
  label: string;
  name: string;
  turnaround?: string;
  price: string;
  period: string;
  badge?: string;
  description?: string;
  features: string[];
  ctaLabel?: string;
  billingCycle: "quarterly" | "monthly";
  order?: number;
}

export interface Testimonial {
  _id: string;
  quote: string;
  avatarUrl: string;
}
