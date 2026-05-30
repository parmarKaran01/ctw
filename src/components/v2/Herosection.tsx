import { GlassmorphicButton } from "./GlassmorphicButton";
import { SanityVideo } from "../../types/sanity";
import { HeroCarousel } from "./Herocarousel";

const ANNOUNCEMENT_URL = "https://x.com/ekuyda/status/1986135875479380479";

interface HeroSectionProps {
  videos: Pick<SanityVideo, "_id" | "title" | "loopClipUrl" | "loopClipPoster">[];
  heroHeadline?: string;
  bookCallUrl?: string;
}

export function HeroSection({ videos, heroHeadline, bookCallUrl }: HeroSectionProps) {
  return (
    <section className="px-4 pt-[170px] pb-0 text-center md:px-6 md:pt-40 md:pb-20">
      <div className="mx-auto">
        {/* Announcement pill */}
        <div className="mb-6 flex justify-center animate-hero-fade-in [animation-delay:0.1s] opacity-0">
          <GlassmorphicButton
            as="link"
            href={ANNOUNCEMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="announcement"
          >
            Who are we?
          </GlassmorphicButton>
        </div>

        {/* Headline */}
        <h1 className="mx-auto mb-[30px] text-center md:w-[40vw] text-[36px] leading-[38px] font-normal tracking-[-0.03em] text-[#191919] opacity-0 [animation-delay:0.2s] animate-hero-fade-in md:mb-[45px] md:text-[58px] md:leading-[64px]">
          {heroHeadline || "Create, discover, and remix any mini-app in minutes"}
        </h1>

        {/* Desktop CTA */}
        <div className="mt-5 hidden justify-center opacity-0 [animation-delay:0.6s] sm:flex animate-hero-fade-in">
          {/* Mobile: direct link */}
          <span className="inline-flex md:hidden">
            <GlassmorphicButton as="link" href={bookCallUrl || "#"} target="_blank" rel="noopener noreferrer" variant="cta">
            Get yours now
            </GlassmorphicButton>
          </span>
          {/* Desktop: button (wire to modal) */}
          <span className="hidden md:inline-flex">
            <GlassmorphicButton>
              Get yours now
            </GlassmorphicButton>
          </span>
        </div>
      </div>

      {/* Carousel */}
      <div className="opacity-0 [animation-delay:0.8s] animate-hero-fade-in-slow">
        <HeroCarousel videos={videos} />
      </div>
    </section>
  );
}