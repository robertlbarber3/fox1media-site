import styles from './SolutionSection.module.css';
import fox1Logo from '../assets/fox1logo.png';

const services = [
  {
    num: '01',
    hudLabel: ['PHOTOGRAPHY', 'SYS'],
    headline: 'Badass, Magazine-Quality Photography',
    body: "Skip the amateur presets and the \"free\" shooters who ghost you right before show season. I capture high-definition hero shots and dynamic rolling media that highlight your deep metallic flake and exact wheel fitment. This is the precision visual storytelling you need to dominate your niche and document your blood, sweat, and tears.",
  },
  {
    num: '02',
    hudLabel: ['BRANDING', 'UNIT'],
    headline: 'Industrial-Grade Custom Branding',
    body: "Your build details shouldn't look like a cheap afterthought. I design and produce small batch custom car decals and the best laser engraved dash plaques that easily survive 100mph speeds and high-pressure washes. These are the one-off, premium touches that give your machine instant inner-circle credibility at elite automotive events.",
  },
  {
    num: '03',
    hudLabel: ['APPAREL', 'OPS'],
    headline: 'Retail-Quality Apparel Without the Minimums',
    body: "Forget big-box print shops that treat you like an annoyance for asking for a small run. Get exclusive, durable crew apparel in batches of just five or ten, directly from a builder you can actually text. Finally, you can equip your team with gear that matches the uncompromising caliber of your craftsmanship.",
  },
];

export default function SolutionSection() {
  return (
    <section className={styles.section}>
      <div className={styles.gridLayer} />
      <div className={styles.scanlines} />

      <div className={styles.hudBorder}>
        <div className={`${styles.chamferCorner} ${styles.tl}`} />
        <div className={`${styles.chamferCorner} ${styles.tr}`} />
        <div className={`${styles.chamferCorner} ${styles.bl}`} />
        <div className={`${styles.chamferCorner} ${styles.br}`} />
      </div>

      <div className={styles.sectorLabel}>SYS_LOG // SECTOR_03 // SOLUTION</div>

      <main className={styles.main}>
        <header className={styles.sectionHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            Creative Partner // Artisan Media &amp; Small-Batch Gear
          </div>
          <h2 className={styles.heading}>
            I Bridge the Gap Between<br />
            <span className={styles.accent}>Garage-Built Passion</span><br />
            &amp; High-End Presentation
          </h2>
          <p className={styles.intro}>
            You don't need to cross your fingers hoping a local automotive photographer who does rollers actually understands car culture. You need a dedicated collaborator who delivers elite visuals and premium merchandise—with zero corporate friction and a direct line of communication.
          </p>
        </header>

        <div className={styles.dividerBadge}>
          <img src={fox1Logo} alt="" aria-hidden="true" className={styles.dividerBadgeImg} />
        </div>

        <div className={styles.servicesGrid}>
          {services.map((svc) => (
            <div className={styles.serviceWrapper} key={svc.num}>
              <div className={styles.serviceCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.numContainer}>
                    <span className={styles.bracket}>[</span>
                    <span className={styles.num}>{svc.num}</span>
                    <span className={styles.bracket}>]</span>
                  </div>
                  <div className={styles.hudLabel}>
                    {svc.hudLabel[0]}<br />{svc.hudLabel[1]}
                  </div>
                </div>
                <div className={styles.serviceHeadline}>{svc.headline}</div>
                <div className={styles.serviceBody}>{svc.body}</div>
                <div className={styles.cardCrosshair} />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.calloutBar}>
          <div className={styles.calloutAccentLine} />
          <div className={styles.calloutAccentTick} />
          <p className={styles.callout}>
            Because your build wasn't mass-produced on a corporate assembly line, and your{' '}
            <span className={styles.calloutHighlight}>brand's presentation shouldn't be either.</span>
          </p>
        </div>
      </main>

      <div className={styles.bottomTelemetry}>
        <div className={styles.telemetryItem}><span>//</span> SERVICES_LOADED: 3/3</div>
        <div className={styles.telemetryItem}><span>//</span> MIN_ORDER: ZERO</div>
      </div>

      <div className={styles.barcode} />
    </section>
  );
}
