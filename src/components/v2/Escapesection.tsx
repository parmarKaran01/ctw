"use client";

import { motion } from "framer-motion";

interface EscapeSectionProps {
  taglineHighlight: string;
  tagline: string;
}

export default function EscapeSection({
  taglineHighlight,
  tagline,
}: EscapeSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#0f0f0f] py-28">
      {/* radial cinematic glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_50%)]" />

      {/* subtle noise */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('/noise.png')]" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
          }}
          className="
            text-[42px]
            font-medium
            leading-[0.92]
            tracking-[-0.06em]
            text-white
            md:text-[72px]
          "
        >
          <span className="font-serif italic text-white/90">
            {taglineHighlight}
          </span>{" "}
          {tagline}
        </motion.h2>
      </div>
    </section>
  );
}
