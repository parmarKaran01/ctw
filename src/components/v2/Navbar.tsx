"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GlassmorphicButton } from "./GlassmorphicButton";
import { WabiLogo } from "./WabiLogo";

export function Navbar({ bookCallUrl }: { bookCallUrl?: string }) {
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const threshold = window.innerHeight * 0.3;
    const onScroll = () => setShowCta(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between bg-[#f0f0f0] px-5 py-4 sm:p-6 md:bg-transparent md:p-8"
      aria-label="Primary"
    >
      {/* Logo */}
      <Link href="/" className="relative top-0 flex min-h-[50px] min-w-[140px] items-center no-underline md:-top-1 md:min-h-[60px] md:min-w-[200px]">
        <WabiLogo className="h-16 w-16 md:h-24 md:w-24" />
      </Link>

      {/* CTA — links to App Store on mobile, triggers modal on desktop */}
      <div
        className={`flex items-center gap-9 transition-opacity duration-300 ${
          showCta ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Mobile: direct App Store link */}
        <span className="inline-flex md:hidden">
          <GlassmorphicButton as="link" href={bookCallUrl || "#"} target="_blank" rel="noopener noreferrer" variant="header">
           Get yours now
          </GlassmorphicButton>
        </span>

        {/* Desktop: button (wire up to your modal as needed) */}
        <span className="hidden md:inline-flex">
          <GlassmorphicButton variant="header">
            Get yours now
          </GlassmorphicButton>
        </span>
      </div>
    </nav>
  );
}