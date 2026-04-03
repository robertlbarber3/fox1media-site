import styles from './HowItWorks.module.css';
import fox1Logo from '../assets/fox1logo.png';

const steps = [
  {
    num: '01',
    hudLabel: ['INIT', 'COMMS'],
    body: "Text me directly about your build so we can skip the corporate email chains and talk builder-to-builder.",
  },
  {
    num: '02',
    hudLabel: ['TACTICAL', 'PLANNING'],
    body: "We'll collaborate one-on-one to lock in your small batch custom car decals, artisan apparel, or schedule your photo session.",
  },
  {
    num: '03',
    hudLabel: ['MISSION', 'EXECUTION'],
    body: "You roll into the next show season with magazine-quality visuals and exclusive gear that finally sets the benchmark for your niche.",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.scanlines} />
      <div className={styles.gridLayer} />
      <div className={styles.ambientGlow} />
      <img src={fox1Logo} alt="" aria-hidden="true" className={styles.cornerBadge} />

      <div className={styles.hudBorder}>
        <div className={`${styles.chamferCorner} ${styles.tl}`} />
        <div className={`${styles.chamferCorner} ${styles.tr}`} />
        <div className={`${styles.chamferCorner} ${styles.bl}`} />
        <div className={`${styles.chamferCorner} ${styles.br}`} />
      </div>

      <div className={styles.dataStamp}>
        <div>FILE_REF: <span className={styles.highlight}>OP_SEQ_001</span></div>
        <div>STATUS: <span className={styles.highlight}>SECURE</span></div>
      </div>

      <main className={styles.processContainer}>
        <header className={styles.sectionHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.statusDot} /> OPERATIONAL SEQUENCE
          </div>
          <h2 className={styles.heading}>
            How It <span className={styles.accentWord}>Works</span>
          </h2>
        </header>

        <div className={styles.stepsGrid}>
          {steps.map((step, i) => (
            <div className={styles.stepWrapper} key={step.num}>
              {i < steps.length - 1 && <span className={styles.arrow}>{'>>'}</span>}
              <div className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <div className={styles.stepNumContainer}>
                    <span className={styles.stepBracket}>[</span>
                    <span className={styles.stepNum}>{step.num}</span>
                    <span className={styles.stepBracket}>]</span>
                  </div>
                  <div className={styles.stepHudLabel}>
                    {step.hudLabel[0]}<br />{step.hudLabel[1]}
                  </div>
                </div>
                <div className={styles.stepBody}>{step.body}</div>
                <div className={styles.cardCrosshair} />
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className={styles.bottomTelemetry}>
        <div className={styles.telemetryItem}><span>//</span> PROTOCOLS LOADED: 3/3</div>
        <div className={styles.telemetryItem}><span>//</span> GRID_SYNC: ACTIVE</div>
      </div>

      <div className={styles.barcode} />
    </section>
  );
}
