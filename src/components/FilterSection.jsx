import styles from './FilterSection.module.css';
import fox1Logo from '../assets/fox1logo.png';

const personas = [
  {
    id: '01',
    label: 'The Meticulous Builder',
    body: "You've spent years dialing in the perfect fitment. You need a creative partner who actually understands car culture and captures the soul of your machine, not a photographer who misses the details that matter most.",
  },
  {
    id: '02',
    label: 'The Small Shop Owner',
    body: "You want retail-quality crew apparel and small batch custom car decals that feel exclusive. You only need a run of ten, not ten thousand, and refuse to deal with massive minimum-order headaches.",
  },
  {
    id: '03',
    label: 'The High-End Enthusiast',
    body: "You want your car to be the benchmark in your niche. From badass rolling shots to the best laser engraved dash plaques, you demand visual presentation that matches the blood, sweat, and dollars poured into your ride.",
  },
  {
    id: '04',
    label: 'The Relationship Builder',
    body: "You are tired of the generic corporate vibe and being treated like \"Invoice #402.\" You want a direct text-thread connection to the guy who is actually shooting the photos and making the gear.",
  },
];

export default function FilterSection() {
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

      <div className={styles.sectorLabel}>SYS_LOG // SECTOR_04 // AUTHORIZED_USERS</div>
      <img src={fox1Logo} alt="" aria-hidden="true" className={styles.centerWatermark} />

      <main className={styles.main}>
        <header className={styles.sectionHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            Authorized Users // Field Identification
          </div>
          <h2 className={styles.heading}>
            For <span className={styles.accent}>Artisan Builders</span><br />
            Not Mass-Market Bargain Hunters
          </h2>
          <p className={styles.intro}>
            I partner with the purists—the builders, shop owners, and detail-obsessed enthusiasts who believe every weld and wheel offset is a work of art. If you're looking for the cheapest bulk rate or a faceless corporate transaction, you're in the wrong garage.
          </p>
        </header>

        <div className={styles.personaGrid}>
          {personas.map((p) => (
            <div className={styles.personaCard} key={p.id}>
              <div className={`${styles.cm} ${styles.cmTl}`} />
              <div className={`${styles.cm} ${styles.cmTr}`} />
              <div className={`${styles.cm} ${styles.cmBl}`} />
              <div className={`${styles.cm} ${styles.cmBr}`} />
              <div className={styles.personaId}>[{p.id}]</div>
              <div className={styles.personaLabel}>{p.label}</div>
              <p className={styles.personaBody}>{p.body}</p>
            </div>
          ))}
        </div>

        <div className={styles.calloutBar}>
          <div className={styles.calloutAccentLine} />
          <div className={styles.calloutAccentTick} />
          <p className={styles.callout}>
            If this sounds like your approach to car culture, you're in{' '}
            <span className={styles.calloutHighlight}>exactly the right place.</span>
            {' '}Keep reading to see how we can bring your vision to life.
          </p>
        </div>
      </main>

      <div className={styles.bottomTelemetry}>
        <div className={styles.telemetryItem}><span>//</span> PROFILES_MATCHED: 4</div>
        <div className={styles.telemetryItem}><span>//</span> ACCESS: AUTHORIZED</div>
      </div>

      <div className={styles.barcode} />
    </section>
  );
}
