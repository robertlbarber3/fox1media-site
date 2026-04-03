import styles from './FinalCTASection.module.css';
import fox1Logo from '../assets/fox1logo.png';

export default function FinalCTASection({ onNavigate }) {
  return (
    <section className={styles.section}>
      <div className={styles.gridLayer} />
      <div className={styles.scanlines} />
      <div className={styles.ambientGlow} />

      <div className={styles.hudBorder}>
        <div className={`${styles.chamferCorner} ${styles.tl}`} />
        <div className={`${styles.chamferCorner} ${styles.tr}`} />
        <div className={`${styles.chamferCorner} ${styles.bl}`} />
        <div className={`${styles.chamferCorner} ${styles.br}`} />
      </div>

      <div className={styles.dataStamp}>
        <div>FILE_REF: <span className={styles.highlight}>FINAL_CTA_008</span></div>
        <div>STATUS: <span className={styles.highlight}>AWAITING INPUT</span></div>
      </div>

      <main className={styles.main}>
        <div className={styles.contentBox}>
          <div className={styles.eyebrow}>
            <span className={styles.statusDot} /> End of Line // Initiate Contact
          </div>

          <h2 className={styles.heading}>
            Ready to Make Your Build<br />
            the <span className={styles.accent}>Benchmark</span><br />
            This Show Season?
          </h2>

          <p className={styles.body}>
            Don't let another year pass with amateur photos and generic merch dragging down your presentation. Secure your magazine-quality visuals, exclusive apparel, and small batch custom car decals directly from a creative partner who respects the build as much as you do.
          </p>

          <div className={styles.ctaGroup}>
            <button onClick={() => onNavigate('contact')} className={styles.btnPrimary}>Email Me About Your Build</button>
          </div>

          <p className={styles.disclaimer}>
            Skip the corporate runaround. No massive minimum orders, no faceless CRM tickets, and absolutely no getting ghosted right before the next meet.
          </p>
        </div>

        <div className={styles.decorPanel}>
          <div className={`${styles.cm} ${styles.cmTl}`} />
          <div className={`${styles.cm} ${styles.cmTr}`} />
          <div className={`${styles.cm} ${styles.cmBl}`} />
          <div className={`${styles.cm} ${styles.cmBr}`} />
          <img src={fox1Logo} alt="Fox 1 Media" className={styles.panelBadge} />
          <div className={styles.panelAwait}>
            <span>AWAITING INPUT...</span>
            <div className={styles.cursorBlock} />
          </div>
        </div>
      </main>

      <div className={styles.bottomTelemetry}>
        <div className={styles.telemetryItem}><span>//</span> MISSION: READY</div>
        <div className={styles.telemetryItem}><span>//</span> FOX_UNIT: 01</div>
      </div>

      <div className={styles.barcode} />
    </section>
  );
}
