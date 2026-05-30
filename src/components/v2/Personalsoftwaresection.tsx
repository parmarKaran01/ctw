import { GlassmorphicButton } from "./GlassmorphicButton";

export function PersonalSoftwareSection({ taglineHighlight, tagline, bookCallUrl }: { taglineHighlight?: string; tagline?: string; bookCallUrl?: string }) {
  return (
    <section className="relative overflow-hidden px-6 pt-[120px] pb-[100px] text-center md:pt-[220px] md:pb-[320px]">
      <h2 className="mx-auto mb-5 max-w-[580px] text-[32px] leading-[38px] font-normal tracking-[-0.03em] sm:text-[58px] sm:leading-[64px]">
        Welcome to the era
        <br />
        of personal software
      </h2>
      <p className="mx-auto mb-8 max-w-[580px] text-lg leading-[26px] tracking-[-0.03em] text-[#525252] opacity-60 sm:text-[25px] sm:leading-[34px]">
        <em>{taglineHighlight || "Where anyone can"}</em>
        {" "}{tagline || "create, discover, remix, and share mini-apps — no code required."}
      </p>

      {/* Mobile-only CTA (desktop CTA is in the hero) */}
      <div className="flex justify-center sm:hidden">
        <GlassmorphicButton as="link" href={bookCallUrl || "#"} target="_blank" rel="noopener noreferrer" variant="cta">
        Get yours now
        </GlassmorphicButton>
      </div>
    </section>
  );
}