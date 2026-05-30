import type { TrustedBrand, Testimonial } from "@/types/sanity";
import styles from "./SocialProof.module.css";

interface Props {
  brands: TrustedBrand[];
  testimonials: Testimonial[];
}

export default function SocialProof({ brands, testimonials }: Props) {
  const hasBrands = brands && brands.length > 0;
  const hasTestimonials = testimonials && testimonials.length > 0;

  if (!hasBrands && !hasTestimonials) return null;

  return (
    <section className={styles.socialProof}>
      <div className={styles.content}>
        {hasBrands && (
          <div className={styles.brands}>
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
        )}

        {hasTestimonials && (
          <div className={styles.testimonials}>
            <div className={styles.track}>
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={`${t._id}-${i}`} className={styles.card}>
                  <div className={styles.cardInner}>
                    <img
                      src={t.avatarUrl}
                      alt=""
                      width={36}
                      height={36}
                      className={styles.avatar}
                      loading="lazy"
                    />
                    <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
