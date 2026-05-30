import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/types/sanity";
import styles from "./Nav.module.css";

interface Props {
  settings: SiteSettings;
  showArchives?: boolean;
  showBack?: boolean;
}

export default function Nav({ settings, showArchives, showBack }: Props) {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <Image src="/images/CTW-logo.png" alt={settings.brandName} width={96} height={96} className={styles.logoImg} />
      </Link>
      {showArchives && (
        <Link href="/gallery" className={styles.archives}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path strokeLinecap="round" d="M3.75 12h16.5M3.75 6h16.5M3.75 18h16.5" />
          </svg>
          Archives
        </Link>
      )}
      {showBack && (
        <Link href="/" className={styles.back}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </Link>
      )}
    </nav>
  );
}
