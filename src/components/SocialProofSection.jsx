import styles from './SocialProofSection.module.css';
import fox1Logo from '../assets/fox1logo.png';

const entries = [
  {
    id: '01',
    complaint: '"I just want to talk to the guy actually making the shirt, not a customer service rep."',
    context: 'The everyday reality of dealing with generic big-box print shops.',
    standard: 'You get a direct text-thread connection to a creative partner who actually understands car culture.',
  },
  {
    id: '02',
    complaint: '"Big brands make me feel like I\'m an annoyance for asking for a small run."',
    context: 'The minimum-order headache that leaves dedicated small crews behind.',
    standard: 'Retail-quality apparel and small batch custom car decals delivered with zero friction in runs of 5 to 10.',
  },
  {
    id: '03',
    complaint: '"That \'free\' photographer ghosted you again right before show season, didn\'t he?"',
    context: 'The risk of rolling the dice on a random "automotive photographer near me who does rollers."',
    standard: 'Dependable, magazine-quality hero shots delivered on time to secure your inner-circle credibility before the next big meet.',
  },
  {
    id: '04',
    complaint: '"Your build is $50k deep, but your decals look like they came from a grocery store kiosk."',
    context: 'The visual disconnect between a high-end machine and cheap promotional gear.',
    standard: 'Industrial-grade vinyl and the best laser engraved dash plaques engineered to survive 100mph speeds and high-pressure washes.',
  },
];

export default function SocialProofSection() {
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

      <div className={styles.sectorLabel}>SYS_LOG // SECTOR_06 // FIELD_REPORT</div>

      <main className={styles.main}>
        <header className={styles.sectionHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            Field Report // The Standard We Hold
          </div>
          <h2 className={styles.heading}>
            A Standard Built for the <span className={styles.accent}>Garage,</span><br />
            Not the Boardroom
          </h2>
          <p className={styles.intro}>
            I didn't start this to run a faceless agency. I started this to document the blood, sweat, and tears of the custom car community. Because we don't rely on corporate CRM tickets, our proof is in how we solve the exact frustrations builders face every day:
          </p>
        </header>

        <div className={styles.logPanel}>
          <div className={`${styles.cm} ${styles.cmTl}`} />
          <div className={`${styles.cm} ${styles.cmTr}`} />
          <div className={`${styles.cm} ${styles.cmBl}`} />
          <div className={`${styles.cm} ${styles.cmBr}`} />

          <div className={styles.panelHeader}>
            <span>FIELD_LOG // RESOLVED ANOMALIES</span>
            <img src={fox1Logo} alt="" aria-hidden="true" className={styles.panelSeal} />
            <span className={styles.resolvedBadge}>
              <span className={styles.resolveDot} />
              4 RESOLVED
            </span>
          </div>

          <div className={styles.logList}>
            {entries.map((e) => (
              <div className={styles.logEntry} key={e.id}>
                <div className={styles.entryId}>[{e.id}]</div>
                <div className={styles.entryContent}>
                  <p className={styles.complaint}>{e.complaint}</p>
                  <p className={styles.context}>— {e.context}</p>
                  <div className={styles.standardRow}>
                    <span className={styles.standardLabel}>THE STANDARD:</span>
                    <span className={styles.standardText}>{e.standard}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className={styles.bottomTelemetry}>
        <div className={styles.telemetryItem}><span>//</span> ANOMALIES_RESOLVED: 4/4</div>
        <div className={styles.telemetryItem}><span>//</span> TRUST_PROTOCOL: ACTIVE</div>
      </div>

      <div className={styles.barcode} />
    </section>
  );
}
