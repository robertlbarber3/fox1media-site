import styles from './BenefitsSection.module.css';
import fox1Logo from '../assets/fox1logo.png';

const benefits = [
  {
    num: '01',
    hudTag: 'VISUALS',
    headline: 'Magazine-Ready Visuals That Open Doors',
    body: "Instantly capture the attention of sponsors and show promoters with high-definition hero shots that highlight your precise fitment and deep metallic flake. Instead of crossing your fingers on a random \"automotive photographer near me who does rollers,\" you get a dedicated partner who shoots to elevate your name in the scene. If you are wondering how to get my car featured in a magazine, it starts right here with a badass visual portfolio that proves your pedigree.",
  },
  {
    num: '02',
    hudTag: 'GEAR',
    headline: 'Artisan Gear Without the Minimum Order Headache',
    body: "Outfit your crew and VIP clients in retail-quality apparel without dropping thousands of dollars on generic inventory you don't actually need. You get premium access to small batch custom car decals and limited-run shirts starting at just five or ten pieces. This means your brand stays exclusive, your budget stays focused on the garage, and you never feel like a nuisance for requesting a short run.",
  },
  {
    num: '03',
    hudTag: 'AUTHORITY',
    headline: 'Finishing Touches That Cement Your Authority',
    body: "Secure instant \"inner circle\" credibility the moment you roll into high-end automotive events. From industrial-grade vinyl that survives 100mph track days to the best laser engraved dash plaques that authenticate your custom work, these tactile details immediately elevate your perceived value. You walk away with total peace of mind knowing your brand materials won't yellow, peel, or look cheap in the sun.",
  },
  {
    num: '04',
    hudTag: 'COMMS',
    headline: 'A Direct Line to Your Creative Partner',
    body: "Reclaim your time and skip the painfully slow corporate email chains and generic customer service portals. You get a direct text-thread connection to the actual artisan shooting your car and crafting your gear. When you have a spontaneous idea or need a fast turnaround before SEMA, you have a collaborator who responds like a friend in the community, not a faceless corporate vendor.",
  },
];

export default function BenefitsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.gridLayer} />
      <div className={styles.scanlines} />
      <div className={styles.ambientGlow} />
      <img src={fox1Logo} alt="" aria-hidden="true" className={styles.ghostBadge} />

      <div className={styles.hudBorder}>
        <div className={`${styles.chamferCorner} ${styles.tl}`} />
        <div className={`${styles.chamferCorner} ${styles.tr}`} />
        <div className={`${styles.chamferCorner} ${styles.bl}`} />
        <div className={`${styles.chamferCorner} ${styles.br}`} />
      </div>

      <div className={styles.dataStamp}>
        <div>FILE_REF: <span className={styles.highlight}>OUTCOMES_005</span></div>
        <div>STATUS: <span className={styles.highlight}>VERIFIED</span></div>
      </div>

      <main className={styles.main}>
        <header className={styles.sectionHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.statusDot} /> Mission Outcomes // What You Gain
          </div>
          <h2 className={styles.heading}>
            Command the Respect<br />
            Your Build <span className={styles.accentWord}>Deserves</span>
          </h2>
        </header>

        <div className={styles.benefitsGrid}>
          {benefits.map((b) => (
            <div className={styles.benefitRow} key={b.num}>
              <div className={styles.benefitNum}>
                <span className={styles.bracket}>[</span>
                {b.num}
                <span className={styles.bracket}>]</span>
              </div>
              <div className={styles.benefitContent}>
                <div className={styles.benefitMeta}>
                  <span className={styles.benefitTag}>{b.hudTag}</span>
                  <span className={styles.tagLine} />
                </div>
                <div className={styles.benefitHeadline}>{b.headline}</div>
                <p className={styles.benefitBody}>{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className={styles.bottomTelemetry}>
        <div className={styles.telemetryItem}><span>//</span> OUTCOMES_LOADED: 4/4</div>
        <div className={styles.telemetryItem}><span>//</span> CREDIBILITY: MAX</div>
      </div>

      <div className={styles.barcode} />
    </section>
  );
}
