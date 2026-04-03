import styles from './Diagnostics.module.css';
import fox1Logo from '../assets/fox1logo.png';

const anomalies = [
  {
    id: '01',
    body: 'fighting a minimum order headache just to get five high-quality shirts for the crew.',
  },
  {
    id: '02',
    body: 'settling for stickers that look like they came from a grocery store kiosk instead of durable, small batch custom car decals.',
  },
  {
    id: '03',
    body: 'scrambling for content because the photographer you hired ghosted you right before show season.',
  },
  {
    id: '04',
    body: 'searching for the best laser engraved dash plaques but only finding mass-produced, generic plastic.',
  },
];

export default function Diagnostics() {
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

      <div className={styles.sysLog}>SYS_LOG // SECTOR_02 // DIAGNOSTICS</div>

      {/* Stamp badge */}
      <img src={fox1Logo} alt="" aria-hidden="true" className={styles.stampBadge} />

      <main className={styles.main}>
        <div className={styles.top}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            System Diagnostic // Current State Analysis
          </div>

          <div className={styles.grid}>
            {/* Left: headline + body copy */}
            <div className={styles.leftCol}>
              <h2 className={styles.heading}>
                Your build is <br />
                <span className={styles.accent}>fifty grand deep,</span><br />
                but your visual presence is stuck in the <br />
                <span className={styles.accent}>amateur gap.</span>
              </h2>

              <div className={styles.bodyText}>
                <p>
                  You've poured blood, sweat, and thousands of dollars into your ride to make it perfect. But when it comes to showing it off, the digital presentation doesn't capture the soul of the machine. You're researching how to get your car featured in a magazine, but you're forced to rely on grainy phone photos and generic presets that make your high-tier work look like an everyday driver.
                </p>
                <p>
                  When you try to elevate your branding to match the car, you hit the corporate wall. You reach out to big-box print shops and quickly realize you're just Invoice #402 to them. You just want to talk to the artisan actually making the gear, but instead, you get a customer service rep who gives off a generic corporate vibe and doesn't understand the build at all.
                </p>
                <p>
                  Car season moves incredibly fast. If your visuals and crew gear aren't completely dialed in for the next big show cycle or local meet, you risk losing an entire year of networking and sponsorship potential.
                </p>
              </div>
            </div>

            {/* Right: anomalies panel */}
            <div className={styles.rightCol}>
              <div className={styles.anomalyPanel}>
                <div className={`${styles.cm} ${styles.cmTl}`} />
                <div className={`${styles.cm} ${styles.cmTr}`} />
                <div className={`${styles.cm} ${styles.cmBl}`} />
                <div className={`${styles.cm} ${styles.cmBr}`} />

                <div className={styles.panelHeader}>
                  <span>Detected Anomalies</span>
                  <span className={styles.issueCount}>
                    <span className={styles.pulseDot} />
                    4 ISSUES
                  </span>
                </div>

                <div className={styles.anomalyList}>
                  {anomalies.map((a) => (
                    <div className={styles.anomalyItem} key={a.id}>
                      <div className={styles.anomalyId}>[{a.id}]</div>
                      <p className={styles.anomalyText}>
                        <strong>Meanwhile, you're still...</strong>
                        {a.body}
                      </p>
                    </div>
                  ))}
                </div>

                <div className={styles.panelBarcode}>
                  <div className={styles.barcodeInner} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom callout */}
        <div className={styles.bottom}>
          <div className={styles.bottomAccentLine} />
          <div className={styles.bottomAccentTick} />
          <div className={styles.bottomInner}>
            <p className={styles.callout}>
              You can't become the benchmark in your niche when your creative partners treat your life's work like a{' '}
              <span className={styles.calloutAccent}>CRM ticket number.</span>
            </p>
            <div className={styles.awaitingInput}>
              <span>END OF LINE<br />AWAITING INPUT...</span>
              <div className={styles.cursorBlock} />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
