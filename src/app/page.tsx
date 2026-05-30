import { unstable_cache } from "next/cache";
import { client, sanityFetch } from "@/sanity/client";
import {
  SITE_SETTINGS_QUERY,
  FEATURED_VIDEOS_QUERY,
  PRICING_QUERY
} from "@/sanity/queries";
import type { SiteSettings, SanityVideo, TrustedBrand, PricingTier } from "@/types/sanity";
import { Navbar } from "@/components/v2/Navbar";
import { HeroSection } from "@/components/v2/Herosection";
import { PersonalSoftwareSection } from "@/components/v2/Personalsoftwaresection";
import { Footer } from "@/components/v2/Footer";
import EscapeSection from "@/components/v2/Escapesection";
import TrustedBy from "@/components/v2/TrustedBy";
import PricingSection from "@/components/v2/Pricingsection";

const getSettings = unstable_cache(
  () => sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY),
  ["settings"],
  { tags: ["siteSettings"] },
);

const getFeatured = unstable_cache(
  () => sanityFetch<SanityVideo[]>(FEATURED_VIDEOS_QUERY),
  ["featured"],
  { tags: ["video"] },
);
const getPricingTiers = unstable_cache(
  () => sanityFetch<PricingTier[]>(PRICING_QUERY),
  ["pricingTiers"],
  { tags: ["pricingTier"] },
);

export default async function Home() {
  const [settings, videos, allTiers] = await Promise.all([
    getSettings(),
    getFeatured(),
     getPricingTiers(),  
  ]);
  const brands = settings?.trustedBy?.map((brand: any) => ({ name: brand.name, logoUrl: brand.logo ? brand.logo : null, })) || [];
   // Split tiers by billing cycle
  const quarterlyTiers = allTiers?.filter((t) => t.billingCycle === "quarterly") ?? [];
  const monthlyTiers   = allTiers?.filter((t) => t.billingCycle === "monthly")   ?? [];
  return (
    <>
     <div className="relative isolate min-h-screen overscroll-none bg-[#f0f0f0] text-[#191919]">
      {/*
       * Main content card — casts a soft shadow over the dark footer canvas below.
       * mb-[60vh] leaves room for the fixed dark background panel to peek through.
       */}
      <div className="relative isolate z-[1] mb-[30vh] rounded-b-[18px] bg-[#f0f0f0] shadow-[0_40px_80px_rgba(0,0,0,0.045)] sm:rounded-b-[35px]">
        <Navbar bookCallUrl={settings?.bookCallUrl} />
  
        <main>
          <HeroSection videos={videos} heroHeadline={settings?.heroHeadline} bookCallUrl={settings?.bookCallUrl} />
          <TrustedBy trustedByHighlightText={settings?.trustedByHighlightText} brands={brands} /> 
          <EscapeSection taglineHighlight={settings?.taglineHighlight} tagline={settings?.tagline} />
     <PricingSection
              quarterlyTiers={quarterlyTiers}
              monthlyTiers={monthlyTiers}
              bookCallUrl={settings?.bookCallUrl ?? "#"}
              whatsappUrl={settings?.bookCallUrl}   // add whatsappUrl to SiteSettings if needed
            />
        </main>
  
        <Footer brandName={settings?.brandName} />
 
        {/* Spacer so shadow renders flush */}
        <div className="h-px" />
      </div>
 
      {/*
       * Dark fixed footer canvas — sits behind the main card.
       * The original Wabi site renders an interactive physics simulation here
       * using a <canvas>. Replace the placeholder below with your own canvas
       * component if you want that effect.
       */}
      <div className="fixed bottom-0 left-0 z-0 flex h-[40vh] w-full flex-col justify-end overflow-hidden bg-[#131313]">
        {/* 
          Optional: mount your physics/particle canvas here.
          e.g. <PhysicsCanvas />
        */}
      </div>
    </div>
    </>
  );
}
