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
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <Image src="/images/CTW-logo.png" alt={settings.brandName} width={96} height={96} className={styles.logoImg} />
        </Link>
      </div>
    </nav>
  );
}
