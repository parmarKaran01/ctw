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
          <div className="flex flex-wrap items-center justify-center gap-12">
              {brands.map((brand) => (
                <div
                  key={brand.name}
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
                        h-auto max-h-[56px]
                        w-auto max-w-[180px]
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
          </div>
        )}
      </div>
    </section>
  );
}
