import { client } from "./client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const builder = client ? createImageUrlBuilder(client) : null;
export const urlFor = (source: SanityImageSource) => builder?.image(source);

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  ...,
  "trustedBy": trustedBy[]{..., "logoUrl": logo.asset->url}
}`;

export const FEATURED_VIDEOS_QUERY = `
  *[_type == "video" && featured == true] | order(order asc) {
    _id,
    title,
    subtitle,
    tag,
    loopClipUrl,
    loopClipPoster
  }
`;

export const ALL_VIDEOS_QUERY = `
  *[_type == "video"] | order(order asc) {
    _id, title, subtitle, duration, tag, embedUrl, loopClipUrl, loopClipPoster,
    "thumbUrl": thumbnail.asset->url,
    "thumbLqip": thumbnail.asset->metadata.lqip,
  }
`;

export const PRICING_QUERY = `
  *[_type == "pricingTier"] | order(order asc) {
    _id,
    label,
    name,
    turnaround,
    quarterlyPrice,
    quarterlyPeriod,
    quarterlyBadge,
    monthlyPrice,
    monthlyPeriod,
    monthlyBadge,
    description,
    features,
    ctaLabel,
    order
  }
`;

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(order asc) {
    _id, quote,
    "avatarUrl": avatar.asset->url,
  }
`;
