import styles from './ServicesProof.module.css';
import fox1Logo from '../assets/fox1logo.png';

const outcomes = [
  {
    id: 'LOG_001',
    unit: 'PHOTO_OPS',
    status: 'RESOLVED',
    title: 'From Grainy Photos to Magazine-Quality Portfolios',
    body: 'Builders who were once ignored by elite commercial agencies now use our media to become the benchmark in their niche. By ending the frustrating search for a reliable automotive photographer who does rollers, they secure the hero shots needed to lock down sponsorships and solve exactly how to get their car featured in a magazine.',
  },
  {
    id: 'LOG_002',
    unit: 'VIDEO_OPS',
    status: 'RESOLVED',
    title: 'Static Posts to Cinematic Content That Converts',
    body: 'Builders running six-figure builds on social media hit a ceiling with static images. Cinematic rolling footage and platform-optimized reels changed everything—driving real follower growth, inbound sponsor inquiries, and the kind of engagement that proves your machine deserves to be seen at speed, not just at a standstill.',
  },
  {
    id: 'LOG_003',
    unit: 'DEPOT_OPS',
    status: 'RESOLVED',
    title: 'Retail-Quality Crew Apparel Without the Corporate Wall',
    body: '"Big brands make me feel like I\'m an annoyance for asking for a small run. I just want to talk to the guy actually making the shirt, not a customer service rep." This is why we stripped the friction out of custom merch. Our partners get exclusive, durable crew apparel in runs of just five or ten—coordinated directly over text, no minimum-order headaches, no corporate wall.',
    isQuote: true,
  },
];

export default function ServicesProof() {
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

      <div className={styles.sectorLabel}>SYS_LOG // SECTOR_05 // OUTCOMES</div>

      <main className={styles.main}>
        <header className={styles.sectionHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            Proven Outcomes // Field Reports
          </div>
          <h2 className={styles.heading}>
            Real Results for<br />
            <span className={styles.accent}>High-End Builders</span>
          </h2>
          <p className={styles.intro}>
            These aren't testimonials from a corporate review platform. These are outcomes from builders who refused to settle for generic—and got the visuals and gear to prove it.
          </p>
        </header>

        <div className={styles.logPanel}>
          <div className={styles.logHeader}>
            <img src={fox1Logo} alt="" aria-hidden="true" className={styles.panelSeal} />
            <div className={styles.logHeaderText}>
              <span>FIELD_REPORT</span>
              <span className={styles.logStatus}><span className={styles.statusDot} /> ALL_UNITS: RESOLVED</span>
            </div>
          </div>

          {outcomes.map((outcome) => (
            <div className={styles.logEntry} key={outcome.id}>
              <div className={styles.entryMeta}>
                <div className={styles.entryId}>{outcome.id}</div>
                <div className={styles.entryUnit}>{outcome.unit}</div>
                <div className={styles.entryBadge}>{outcome.status}</div>
              </div>
              <div className={styles.entryContent}>
                <div className={styles.entryTitle}>{outcome.title}</div>
                <p className={`${styles.entryBody} ${outcome.isQuote ? styles.entryQuote : ''}`}>
                  {outcome.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.calloutBar}>
          <div className={styles.calloutAccentLine} />
          <div className={styles.calloutAccentTick} />
          <p className={styles.callout}>
            Your build is a one-off. Your brand&apos;s presentation{' '}
            <span className={styles.calloutHighlight}>shouldn&apos;t look mass-produced.</span>
          </p>
        </div>
      </main>

      <div className={styles.bottomTelemetry}>
        <div className={styles.telemetryItem}><span>//</span> FIELD_LOGS: 3/3</div>
        <div className={styles.telemetryItem}><span>//</span> OUTCOMES: VERIFIED</div>
      </div>

      <div className={styles.barcode} />
    </section>
  );
}
