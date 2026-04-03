import styles from './ServicesTiers.module.css';

const tiers = [
  {
    num: '01',
    id: 'photography',
    category: 'HIGH-END VISUALS',
    hudLabel: 'PHOTO_OPS',
    tag: 'Photography',
    headline: 'Magazine-Quality Automotive Photography',
    forWho: "Enthusiasts who are done searching for an \"automotive photographer near me who does rollers\" only to get ghosted by someone who doesn't understand your fitment or your build culture.",
    features: [
      {
        title: 'HIGH-DEFINITION HERO SHOTS',
        desc: 'Precision photography that captures your deep metallic flake, exact wheel offsets, and every hand-fabricated detail at its absolute best.',
      },
      {
        title: 'SCROLL-STOPPING ROLLING MEDIA',
        desc: 'Dynamic shots that prove your car looks just as badass on pavement as it does in the shop—the kind that stops a feed cold.',
      },
      {
        title: 'SPONSORSHIP-READY VISUAL ASSETS',
        desc: 'A complete portfolio that positions your build as the benchmark in your niche, opening doors for sponsorships and show promoter attention.',
      },
    ],
    pricing: 'Flat session rates based on location and custom shot list.',
    cta: 'Book a Photo Session',
    bookingPage: 'booking',
    flip: false,
  },
  {
    num: '02',
    category: 'MOTION MEDIA',
    id: 'videography',
    hudLabel: 'VIDEO_OPS',
    tag: 'Videography',
    headline: 'Cinematic Automotive Videography',
    forWho: "Builders who need dynamic motion content for social media, sponsorship packages, and event coverage. Stop posting static photos of a machine that sounds like thunder—let the world feel it move.",
    features: [
      {
        title: 'CINEMATIC ROLLING FOOTAGE',
        desc: 'Precision-stabilized motion sequences that capture the power, sound, and presence of your build—crafted for maximum visual impact on any screen.',
      },
      {
        title: 'SOCIAL-OPTIMIZED SHORT-FORM REELS',
        desc: 'Platform-ready cuts engineered for Instagram, YouTube, and TikTok that stop the scroll and drive real engagement from the right audience.',
      },
      {
        title: 'SHOW & REVEAL VIDEO PACKAGES',
        desc: 'Full-length coverage of reveal moments, show days, and build milestones that document the full story of your machine from every angle.',
      },
    ],
    pricing: 'Custom quoted based on scope, location, and deliverable package.',
    cta: 'Book a Video Session',
    bookingPage: 'videoBooking',
    flip: true,
  },
  {
    num: '03',
    category: 'CUSTOM MERCH',
    id: 'custom-merch',
    hudLabel: 'DEPOT_OPS',
    tag: 'Custom Merch Shop',
    headline: 'Retail-Quality Apparel & Industrial-Grade Details',
    forWho: "Small shop owners and car club purists who only need a run of ten, not ten thousand. You're tired of being treated like Invoice #402 just because you won't order in massive bulk.",
    features: [
      {
        title: 'PREMIUM CREW APPAREL',
        desc: 'Shirts, hoodies, and hats that look and feel like exclusive streetwear, not cheap promo giveaways. Runs starting at 5 units with builder-to-builder design collaboration.',
      },
      {
        title: 'INDUSTRIAL-GRADE SMALL BATCH DECALS',
        desc: 'Built to survive 100mph speeds and high-pressure washes without peeling or yellowing. Custom designs, not stock graphics from a catalogue.',
      },
      {
        title: 'LASER ENGRAVED DASH PLAQUES',
        desc: 'Bespoke interior finishes that give your machine instant inner-circle credibility at elite automotive events and local meets.',
      },
    ],
    pricing: 'Custom quoted per project. Apparel starting at 5 units. Decals and plaques starting at 1–5 pieces.',
    cta: 'View Catalog',
    bookingPage: 'catalog',
    flip: false,
  },
];

function TierSection({ tier, onNavigate }) {
  return (
    <section id={tier.id} className={`${styles.tier} ${tier.flip ? styles.tierFlip : ''}`}>
      <div className={styles.gridLayer} />
      <div className={styles.scanlines} />
      <div className={styles.ambientGlow} />

      <div className={styles.hudBorder}>
        <div className={`${styles.chamferCorner} ${styles.tl}`} />
        <div className={`${styles.chamferCorner} ${styles.tr}`} />
        <div className={`${styles.chamferCorner} ${styles.bl}`} />
        <div className={`${styles.chamferCorner} ${styles.br}`} />
      </div>

      <div className={styles.tierLayout}>
        {/* Content */}
        <div className={styles.content}>
          <div className={styles.tierTag}>
            <span className={styles.tagLine} />
            {tier.category} // {tier.hudLabel}
          </div>

          <h2 className={styles.tierHeadline}>{tier.headline}</h2>

          <div className={styles.forWho}>
            <div className={styles.forWhoLabel}>WHO_IT&apos;S_FOR</div>
            <p className={styles.forWhoText}>{tier.forWho}</p>
          </div>

          <div className={styles.features}>
            <div className={styles.featuresLabel}>WHAT_YOU_GET</div>
            {tier.features.map((f, i) => (
              <div className={styles.featureItem} key={i}>
                <div className={styles.featureBullet}>&gt;</div>
                <div className={styles.featureContent}>
                  <div className={styles.featureTitle}>{f.title}</div>
                  <div className={styles.featureDesc}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.pricingBlock}>
            <div className={styles.pricingLabel}>PRICING_APPROACH</div>
            <p className={styles.pricingText}>{tier.pricing}</p>
          </div>

          {tier.bookingPage ? (
            <button
              className={styles.ctaButton}
              onClick={() => onNavigate(tier.bookingPage)}
            >
              {tier.cta} &gt;&gt;
            </button>
          ) : (
            <a href="#" className={styles.ctaButton}>{tier.cta} &gt;&gt;</a>
          )}
        </div>

        {/* Decorative panel */}
        <div className={styles.decorPanel}>
          <div className={`${styles.cm} ${styles.cmTl}`} />
          <div className={`${styles.cm} ${styles.cmTr}`} />
          <div className={`${styles.cm} ${styles.cmBl}`} />
          <div className={`${styles.cm} ${styles.cmBr}`} />

          <div className={styles.decorNumBg}>{tier.num}</div>

          <div className={styles.decorInner}>
            <div className={styles.decorCategory}>{tier.category}</div>
            <div className={styles.decorDivider} />
            <div className={styles.decorStats}>
              <div className={styles.decorStat}>
                <span className={styles.decorDot} />
                UNIT: {tier.hudLabel}
              </div>
              <div className={styles.decorStat}>
                <span className={styles.decorDot} />
                STATUS: ACCEPTING_CLIENTS
              </div>
              <div className={styles.decorStat}>
                <span className={styles.decorDot} />
                PRIORITY: IMMEDIATE
              </div>
            </div>
          </div>

          <div className={styles.decorBarcode} />
        </div>
      </div>

      <div className={styles.tierTelemetry}>
        <div><span>//</span> TIER_{tier.num}</div>
        <div><span>//</span> {tier.hudLabel}</div>
        <div><span>//</span> STATUS: ACTIVE</div>
      </div>
    </section>
  );
}

export default function ServicesTiers({ onNavigate }) {
  return (
    <div id="services" className={styles.container}>
      <div className={styles.sectorHeader}>
        <div className={styles.sectorLine} />
        <span className={styles.sectorText}>SERVICE_TIERS // 03 ACTIVE UNITS</span>
        <div className={styles.sectorLine} />
      </div>
      {tiers.map((tier) => (
        <TierSection key={tier.num} tier={tier} onNavigate={onNavigate} />
      ))}
    </div>
  );
}
