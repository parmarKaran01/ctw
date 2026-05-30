import { unstable_cache } from "next/cache";
import { sanityFetch } from "@/sanity/client";
import {
  SITE_SETTINGS_QUERY,
  FEATURED_VIDEOS_QUERY,
  PRICING_QUERY,
  TESTIMONIALS_QUERY,
} from "@/sanity/queries";
import Nav from "@/components/Nav";
import CardStack from "@/components/CardStack";
import PricingPanel from "@/components/PricingPanel";
import TrustedBy from "@/components/TrustedBy";
import HeroBackground from "@/components/HeroBackground";
import type { SiteSettings, Video, PricingTier, Testimonial } from "@/types/sanity";

const getSettings = unstable_cache(
  () => sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY),
  ["settings"],
  { tags: ["siteSettings"] },
);

const getFeatured = unstable_cache(
  () => sanityFetch<Video[]>(FEATURED_VIDEOS_QUERY),
  ["featured"],
  { tags: ["video"] },
);

const getPricing = unstable_cache(
  () => sanityFetch<PricingTier[]>(PRICING_QUERY),
  ["pricing"],
  { tags: ["pricingTier"] },
);

const getTestimonials = unstable_cache(
  () => sanityFetch<Testimonial[]>(TESTIMONIALS_QUERY),
  ["testimonials"],
  { tags: ["testimonial"] },
);

export default async function Home() {
  const [settings, videos, pricing, testimonials] = await Promise.all([
    getSettings(),
    getFeatured(),
    getPricing(),
    getTestimonials(),
  ]);

  return (
    <>
      <HeroBackground className="hero-bg" />
      <Nav settings={settings} showArchives />
      <main className="fixed-stage">
        <section className="lhs">
          <p className="eyebrow">Featured Work</p>
          <h1>
            {settings.heroHeadline} <em>{settings.heroItalic}</em>
          </h1>
          <CardStack videos={videos} />
          <TrustedBy brands={settings.trustedBy} />
        </section>

        <section className="rhs">
          <PricingPanel tiers={pricing} bookCallUrl={settings.bookCallUrl} />
          <div className="testimonials">
            <div className="testi-track">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={`${t._id}-${i}`} className="testi-item">
                  <img
                    src={t.avatarUrl}
                    alt=""
                    width={28}
                    height={28}
                    className="testi-avatar"
                    loading="lazy"
                  />
                  <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
