interface PageHeroProps {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}

/** Compact hero banner used at the top of inner pages. */
export function PageHero({ image, imageAlt, eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative flex h-[46vh] min-h-[360px] items-center justify-center overflow-hidden">
      <img
        src={image}
        alt={imageAlt}
        className="animate-kenburns absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/80 via-forest-deep/60 to-forest-deep/80" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 pt-20 text-center">
        <p className="hero-rise hero-rise-1 text-sm font-semibold tracking-[0.3em] uppercase text-terracotta-light">
          {eyebrow}
        </p>
        <h1 className="hero-rise hero-rise-2 mt-4 font-display text-4xl font-semibold text-cream sm:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="hero-rise hero-rise-3 mt-4 text-base text-cream/85 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
