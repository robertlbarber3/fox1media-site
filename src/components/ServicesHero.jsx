import fox1Logo from '../assets/fox1logo.png';
import styles from './ServicesHero.module.css';

const servicePreview = [
  { num: '01', label: 'PHOTO_OPS', name: 'Photography', desc: 'Magazine-Quality Visuals', href: '#photography' },
  { num: '02', label: 'VIDEO_OPS', name: 'Videography', desc: 'Cinematic Motion Media', href: '#videography' },
  { num: '03', label: 'DEPOT_OPS', name: 'Custom Merch', desc: 'Small-Batch Artisan Gear', href: '#custom-merch' },
];

export default function ServicesHero({ onNavigate }) {
  return (
    <section className={styles.hero}>
      <div className={styles.scanlines} />
      <div className={styles.gridLayer} />
      <div className={styles.ambientGlowRight} />
      <div className={styles.ambientGlowLeft} />

      <img src={fox1Logo} alt="" aria-hidden="true" className={styles.watermarkBadge} />

      <div className={styles.hudBorder}>
        <div className={`${styles.chamferCorner} ${styles.tl}`} />
        <div className={`${styles.chamferCorner} ${styles.tr}`} />
        <div className={`${styles.chamferCorner} ${styles.bl}`} />
        <div className={`${styles.chamferCorner} ${styles.br}`} />
      </div>

      <div className={styles.telemetryBar}>
        <div><span className={styles.statusDot} /> SYSTEM: ACTIVE</div>
        <div>SECTOR: SERVICES_OVERVIEW</div>
        <div>UNITS: 03/03</div>
        <div>BOOKING: OPEN</div>
      </div>

      <header className={styles.header}>
        <div className={styles.brandContainer}>
          <img src={fox1Logo} alt="Fox 1 Media" className={styles.logoImg} />
          <div className={styles.brandText}>
            FOX 1 MEDIA
            <span>TACTICAL VISUALS</span>
          </div>
        </div>
        <nav className={styles.nav}>
          <button onClick={() => onNavigate('home')} className={styles.navBtn}>Home_SYS</button>
          <span className={styles.navActive}>Services_DEPOT</span>
          <button onClick={() => onNavigate('contact')} className={styles.navBtn}>Comms</button>
        </nav>
      </header>

      <main className={styles.mainContainer}>
        <div className={styles.contentBox}>
          <div className={styles.eyebrow}>Service Overview // Three Ways to Elevate Your Build</div>
          <h1>
            Artisan Gear.<br />
            Cinematic <span className={styles.accentWord}>Visuals.</span><br />
            Zero Corporate<br />
            <span className={styles.accentWord}>Friction.</span>
          </h1>
          <p className={styles.description}>
            Whether you need a short run of exclusive crew apparel or you&apos;re ready to stop searching for a rollers photographer who actually gets it—here are the three ways we collaborate to make your build impossible to ignore.
          </p>
        </div>

        <div className={styles.previewPanel}>
          <div className={styles.previewPanelHeader}>
            <span className={styles.previewPanelDot} />
            <span className={styles.previewPanelLabel}>ACTIVE_SERVICES // SELECT_UNIT</span>
          </div>
          {servicePreview.map((svc) => (
            <a href={svc.href} className={styles.previewCard} key={svc.num}>
              <div className={styles.previewNum}>{svc.num}</div>
              <div className={styles.previewInfo}>
                <div className={styles.previewLabel}>{svc.label}</div>
                <div className={styles.previewName}>{svc.name}</div>
                <div className={styles.previewDesc}>{svc.desc}</div>
              </div>
              <div className={styles.previewArrow}>&gt;&gt;</div>
            </a>
          ))}
          <div className={styles.previewPanelFooter}>
            FILE_REF: FOX1_SVC_MANIFEST_2025
          </div>
        </div>
      </main>

      <div className={styles.metrics}>
        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>Services Available</span>
          <span className={styles.metricValue}>03</span>
        </div>
        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>Min Order Qty</span>
          <span className={styles.metricValue}>ZERO</span>
        </div>
        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>Booking Status</span>
          <span className={styles.metricValue} style={{ color: 'var(--accent)' }}>OPEN</span>
        </div>
      </div>

      <div className={styles.barcode} />
    </section>
  );
}
