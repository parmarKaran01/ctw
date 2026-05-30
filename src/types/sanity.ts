export interface TrustedBrand {
  name: string;
  logoUrl?: string;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  bookCallUrl: string;
  statsLine: string;
  trustedBy: TrustedBrand[];
  heroHeadline: string;
  heroItalic: string;
}

export interface Video {
  _id: string;
  title: string;
  subtitle: string;
  duration: string;
  tag: string;
  embedUrl: string;
  thumbUrl: string;
  thumbLqip?: string;
  featured?: boolean;
  loopClipUrl?: string;
  loopClipPoster?: string;
}

export interface PricingTier {
  _id: string;
  label: string;
  name: string;
  turnaround: string;
  price: string;
  period: string;
  badge: string;
  description: string;
  features: string[];
  ctaLabel: string;
}

export interface Testimonial {
  _id: string;
  quote: string;
  avatarUrl: string;
}
