"use client";

import { motion } from "framer-motion";

interface TrustedBrand {
  name: string;
  logoUrl?: string;
}

interface TrustedByProps {
  trustedByHighlightText: string;
  brands: TrustedBrand[];
}

export default function TrustedBy({
  trustedByHighlightText,
  brands,
}: TrustedByProps) {
  const hasBrands = brands?.length > 0;

  return (
    <section className="relative overflow-hidden py-20">
      {/* atmospheric bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f7f5ef] to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* heading */}
        <div className="mb-10 text-center">
          <h2
            className="
              text-[30px]
              font-medium
              tracking-[-0.05em]
              text-[#111]
              md:text-[42px]
            "
          >
            {trustedByHighlightText}
          </h2>
        </div>

        {hasBrands && (
          <div
            className="
              relative overflow-hidden rounded-[32px]
              border border-black/[0.04]
              bg-white/50
              px-6 py-8
              backdrop-blur-2xl
            "
          >
            {/* edge fades */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#f7f5ef] to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#f7f5ef] to-transparent" />

            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "linear",
              }}
              className="flex min-w-max items-center gap-20"
            >
              {[...brands, ...brands].map((brand, i) => (
                <div
                  key={`${brand.name}-${i}`}
                  className="
                    flex shrink-0 items-center justify-center
                    opacity-70 transition-all duration-300
                    hover:opacity-100
                  "
                >
                  {brand.logoUrl ? (
                    <img
                      src={brand.logoUrl}
                      alt={brand.name}
                      loading="lazy"
                      className="
                        h-auto max-h-[42px]
                        w-auto max-w-[140px]
                        object-contain grayscale
                      "
                    />
                  ) : (
                    <span className="text-lg font-medium text-black/60">
                      {brand.name}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
