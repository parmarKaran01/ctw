import type { TrustedBrand } from "@/types/sanity";
import styles from "./TrustedBy.module.css";

interface Props {
  brands: TrustedBrand[];
}

export default function TrustedBy({ brands }: Props) {
  if (!brands || brands.length === 0) return null;

  return (
    <div className={styles.row}>
      <span className={styles.label}>Trusted by</span>
      <div className={styles.logos}>
        {brands.map((brand, i) =>
          brand.logoUrl ? (
            <img
              key={i}
              src={brand.logoUrl}
              alt={brand.name}
              className={styles.logoImg}
              loading="lazy"
            />
          ) : (
            <span key={i}>{brand.name}</span>
          ),
        )}
      </div>
    </div>
  );
}
