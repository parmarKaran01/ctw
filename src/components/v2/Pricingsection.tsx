"use client";

import { useState } from "react";
import type { PricingTier } from "@/types/sanity";

interface Props {
  tiers: PricingTier[];
  bookCallUrl?: string;
  whatsappUrl?: string;
  pricingFootnote1?: string;
  pricingFootnote2?: string;
  pricingToggleBadge?: string;
}

const CheckIcon = () => (
  <svg
    className="mt-0.5 size-[18px] shrink-0"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="7" strokeOpacity="0.12" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1" />
    <path d="M5 8.5l2 2 4-4" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="15" height="15" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
  </svg>
);

function PricingCard({
  tier,
  activeBilling,
  bookCallUrl,
  whatsappUrl,
}: {
  tier: PricingTier;
  activeBilling: "quarterly" | "monthly";
  bookCallUrl: string;
  whatsappUrl?: string;
}) {
  const quarterlyActive = activeBilling === "quarterly";

  return (
    <div className="flex flex-col rounded-2xl border border-[#d0d0d0] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-300 sm:p-8">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#888]">{tier.label}</p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-[#191919]">{tier.name}</h3>
        </div>
        {tier.turnaround && (
          <span className="mt-0.5 shrink-0 rounded-full bg-[#f0f0f0] px-3 py-1 text-xs font-medium text-[#555]">
            {tier.turnaround}
          </span>
        )}
      </div>

      {/* Price */}
      <div className="mb-1.5">
        {quarterlyActive ? (
          <>
            <span className="text-[36px] font-bold leading-none tracking-tight text-[#191919] sm:text-[42px]">
              {tier.quarterlyPrice}
            </span>
            <span className="mb-1 ml-1 text-sm text-[#888]">{tier.quarterlyPeriod}</span>
            {tier.quarterlyBadge && <p className="mt-1 text-sm text-[#888]">{tier.quarterlyBadge}</p>}
          </>
        ) : (
          <>
            <span className="text-[36px] font-bold leading-none tracking-tight text-[#191919] sm:text-[42px]">
              {tier.monthlyPrice}
            </span>
            <span className="mb-1 ml-1 text-sm text-[#888]">{tier.monthlyPeriod}</span>
            {tier.monthlyBadge && <p className="mt-1 text-sm text-[#888]">{tier.monthlyBadge}</p>}
          </>
        )}
      </div>

      <div className="mb-5 h-px bg-[#f0f0f0]" />

      {tier.description && (
        <p className="mb-5 text-sm leading-relaxed text-[#555]">{tier.description}</p>
      )}

      <ul className="mb-8 flex flex-col gap-3">
        {tier.features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-[#333]">
            <CheckIcon />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-3">
        <a
          href={whatsappUrl ?? bookCallUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-[#e5e5e5] bg-white py-3.5 text-sm font-medium text-[#191919] transition-colors hover:bg-[#f5f5f5]"
        >
          <WhatsAppIcon />
          {tier.ctaLabel ?? "Message Us"}
        </a>
        <a
          href={bookCallUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#191919] py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#333]"
        >
          <CalendarIcon />
          Talk to Us
        </a>
      </div>
    </div>
  );
}

export default function PricingSection({
  tiers,
  bookCallUrl = "#",
  whatsappUrl,
  pricingFootnote1,
  pricingFootnote2,
  pricingToggleBadge,
}: Props) {
  const [billing, setBilling] = useState<"quarterly" | "monthly">("quarterly");

  return (
    <section className="bg-white px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-4xl">
        {/* Toggle */}
        <div className="mb-12 flex justify-center">
          <div className="flex items-center rounded-full border border-[#e5e5e5] bg-[#f5f5f5] p-1.5">
            <button
              type="button"
              onClick={() => setBilling("quarterly")}
              className={`flex items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 ${
                billing === "quarterly"
                  ? "bg-white text-[#191919] shadow-sm"
                  : "text-[#888] hover:text-[#555]"
              }`}
            >
              {billing === "quarterly" && (
                pricingToggleBadge && <span className="rounded-full bg-[#191919] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                  {pricingToggleBadge}
                </span>
              )}
              Quarterly
            </button>
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 ${
                billing === "monthly"
                  ? "bg-white text-[#191919] shadow-sm"
                  : "text-[#888] hover:text-[#555]"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Headline */}
        <div className="mb-12 text-center">
          <h2 className="text-[28px] font-bold tracking-tight text-[#191919] sm:text-[52px]">
            Choose Your Plan
          </h2>
          <p className="mt-3 text-base text-[#888]">
            Unlimited short-form editing. Fixed monthly price. No surprises.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {tiers.map((tier) => (
            <PricingCard
              key={tier._id}
              tier={tier}
              activeBilling={billing}
              bookCallUrl={bookCallUrl}
              whatsappUrl={whatsappUrl}
            />
          ))}
        </div>

        {/* Footnotes */}
        {(pricingFootnote1 || pricingFootnote2) && (
          <div className="mt-8 space-y-1.5 text-center">
            {pricingFootnote1 && <p className="text-sm text-[#aaa]">{pricingFootnote1}</p>}
            {pricingFootnote2 && <p className="text-sm text-[#aaa]">{pricingFootnote2}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
