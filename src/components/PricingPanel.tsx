"use client";

import { useState } from "react";
import type { PricingTier } from "@/types/sanity";
import styles from "./PricingPanel.module.css";

interface Props {
  tiers: PricingTier[];
  bookCallUrl: string;
}

export default function PricingPanel({ tiers, bookCallUrl }: Props) {
  const [active, setActive] = useState(0);
  const tier = tiers[active];

  if (!tier) {
    return (
      <div className={styles.card}>
        <p className="text-sm text-[var(--ink3)]">No pricing available</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.tabsWrapper}>
        <div className={styles.tabs}>
          {tiers.map((t, i) => (
            <button
              key={t._id}
              className={`${styles.tab} ${active === i ? styles.tabActive : ""}`}
              onClick={() => setActive(i)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.name}>{tier.name}</span>
          <span className={styles.turnaround}>{tier.turnaround}</span>
        </div>
        <div className={styles.amountRow}>
          <span className={styles.amount}>{tier.price}</span>
          <span className={styles.period}>{tier.period}</span>
          <span className={styles.badge}>{tier.badge}</span>
        </div>
        <p className={styles.desc}>{tier.description}</p>
        <ul className={styles.features}>
          {tier.features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
        <a
          href={bookCallUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          <svg viewBox="0 0 24 24" fill="white" width="15" height="15">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
          {tier.ctaLabel}
        </a>
        <a
          href={bookCallUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.secondary}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="15" height="15">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
          </svg>
          Book a Call
        </a>
      </div>
    </>
  );
}
