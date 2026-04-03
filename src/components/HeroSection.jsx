import fox1Logo from '../assets/fox1logo.png';
import styles from './HeroSection.module.css';


export default function HeroSection({ onNavigate }) {
  return (
    <section className={styles.hero}>
      {/* Scanline overlay */}
      <div className={styles.scanlines} />

      {/* Grid layer */}
      <div className={styles.gridLayer} />

      {/* Background watermark badge */}
      <img src={fox1Logo} alt="" aria-hidden="true" className={styles.watermarkBadge} />

      {/* Hero image */}
      <div className={styles.heroImage} />
      <div className={styles.heroOverlay} />

      {/* HUD border frame */}
      <div className={styles.hudBorder}>
        <div className={`${styles.chamferCorner} ${styles.tl}`} />
        <div className={`${styles.chamferCorner} ${styles.tr}`} />
        <div className={`${styles.chamferCorner} ${styles.bl}`} />
        <div className={`${styles.chamferCorner} ${styles.br}`} />
      </div>

      {/* Telemetry bar */}
      <div className={styles.telemetryBar}>
        <div><span className={styles.statusDot} /> SYSTEM: ACTIVE</div>
        <div>LOC: 30.332184° N // -81.655651° E</div>
        <div>MODE: 8K_RAW</div>
        <div>FOX_UNIT: 01</div>
      </div>

      {/* Header — brand lockup + nav */}
      <header className={styles.header}>
        <div className={styles.brandContainer}>
          <img src={fox1Logo} alt="Fox 1 Media" className={styles.logoImg} />
          <div className={styles.brandText}>
            FOX 1 MEDIA
            <span>TACTICAL VISUALS</span>
          </div>
        </div>
        <nav className={styles.nav}>
          <a href="#">Portfolio_SYS</a>
          <button onClick={() => onNavigate('services')} className={styles.navBtn}>Services_DEPOT</button>
          <button onClick={() => onNavigate('contact')} className={styles.navBtn}>Comms</button>
        </nav>
      </header>

      {/* Main content */}
      <main className={styles.mainContainer}>
        <div className={styles.contentBox}>
          <div className={styles.eyebrow}>For Automotive Purists &amp; Custom Builders</div>
          <h1>
            Magazine-<br />
            Quality <span className={styles.accentWord}>Visuals</span><br />
            &amp; Small-<br />
            Batch <span className={styles.accentWord}>Gear</span>
          </h1>
          <p className={styles.description}>
            Stop searching for an "automotive photographer near me who does rollers" and settling for corporate print shops. I'm your creative partner for badass rolling shots and exclusive custom merch, with zero minimum-order headaches.
          </p>
          <div className={styles.btnGroup}>
            <button onClick={() => onNavigate('contact')} className={`${styles.btn} ${styles.btnPrimary}`}>Email Me About Your Build</button>
            <a href="#" className={`${styles.btn} ${styles.btnSecondary}`}>View the Portfolio</a>
          </div>
        </div>
      </main>

      {/* Metrics */}
      <div className={styles.metrics}>
        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>Min Order QTY</span>
          <span className={styles.metricValue}>ZERO</span>
        </div>
        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>Visual Spec</span>
          <span className={styles.metricValue}>MAG-GRADE</span>
        </div>
        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>Network</span>
          <span className={styles.metricValue} style={{ color: 'var(--accent)' }}>ENCRYPTED</span>
        </div>
      </div>

      {/* Barcode */}
      <div className={styles.barcode} />
    </section>
  );
}
