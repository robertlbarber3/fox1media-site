import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import fox1Logo from '../assets/fox1logo.png';
import styles from './ContactPage.module.css';

const EMAILJS_SERVICE_ID  = 'service_2pvvmnh';
const EMAILJS_TEMPLATE_ID = 'template_i7ym8d6';
const EMAILJS_PUBLIC_KEY  = 'RY24lUdzCEPzbjj1z';

export default function ContactPage({ onNavigate }) {
  const formRef = useRef(null);

  const [fields, setFields] = useState({
    name: '',
    phone: '',
    email: '',
    description: '',
  });

  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  function handleChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handlePhoneChange(e) {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
    let formatted = '';
    if (digits.length === 0) {
      formatted = '';
    } else if (digits.length <= 3) {
      formatted = `(${digits}`;
    } else if (digits.length <= 6) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    setFields((prev) => ({ ...prev, phone: formatted }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email:    'robert@fox1media.com',
          subject:     `Request ICO (${fields.name})`,
          from_name:   fields.name,
          from_email:  fields.email,
          phone:       fields.phone || 'Not provided',
          description: fields.description,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setFields({ name: '', phone: '', email: '', description: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className={styles.page}>
      {/* Layers */}
      <div className={styles.scanlines} />
      <div className={styles.gridLayer} />
      <div className={styles.ambientGlow} />
      <img src={fox1Logo} alt="" aria-hidden="true" className={styles.watermarkBadge} />

      {/* HUD border */}
      <div className={styles.hudBorder}>
        <div className={`${styles.chamferCorner} ${styles.tl}`} />
        <div className={`${styles.chamferCorner} ${styles.tr}`} />
        <div className={`${styles.chamferCorner} ${styles.bl}`} />
        <div className={`${styles.chamferCorner} ${styles.br}`} />
      </div>

      {/* Telemetry bar */}
      <div className={styles.telemetryBar}>
        <div><span className={styles.statusDot} /> SYSTEM: ACTIVE</div>
        <div>SECTOR: COMMS_INTERFACE</div>
        <div>MODE: SECURE_CHANNEL</div>
        <div>FOX_UNIT: 01</div>
      </div>

      {/* Header */}
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
          <button onClick={() => onNavigate('services')} className={styles.navBtn}>Services_DEPOT</button>
          <span className={styles.navActive}>Comms</span>
        </nav>
      </header>

      {/* Main layout */}
      <main className={styles.main}>

        {/* Left — heading + info */}
        <div className={styles.leftCol}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            Initiate Contact // Secure Channel Open
          </div>

          <h1 className={styles.heading}>
            Let's Talk<br />
            About Your<br />
            <span className={styles.accent}>Build.</span>
          </h1>

          <p className={styles.subtext}>
            Whether you're rolling into a show season, building out exclusive crew merch, or just want magazine-grade shots of your daily — drop your details and I'll get back to you fast. No forms lost in a CRM. No corporate runaround.
          </p>

          <div className={styles.infoCards}>
            <div className={styles.infoCard}>
              <div className={styles.infoCardLabel}>CHANNEL</div>
              <div className={styles.infoCardValue}>robert@fox1media.com</div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoCardLabel}>LOCATION</div>
              <div className={styles.infoCardValue}>Jacksonville, FL</div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoCardLabel}>RESPONSE TIME</div>
              <div className={styles.infoCardValue} style={{ color: 'var(--accent)' }}>24 HRS</div>
            </div>
          </div>

          <div className={styles.dataStamp}>
            <div>FILE_REF: <span className={styles.highlight}>COMMS_ICO_FORM</span></div>
            <div>STATUS: <span className={styles.highlight}>AWAITING_INPUT</span></div>
          </div>
        </div>

        {/* Right — form */}
        <div className={styles.rightCol}>
          <div className={styles.formPanel}>
            {/* Corner markers */}
            <div className={`${styles.cm} ${styles.cmTl}`} />
            <div className={`${styles.cm} ${styles.cmTr}`} />
            <div className={`${styles.cm} ${styles.cmBl}`} />
            <div className={`${styles.cm} ${styles.cmBr}`} />

            <div className={styles.formHeader}>
              <span className={styles.statusDot} />
              <span>TRANSMISSION // FORM_001</span>
              <div className={styles.cursorBlock} />
            </div>

            {status === 'success' ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>Transmission Received</h3>
                <p className={styles.successBody}>
                  Your request has been logged. I'll be in touch within 24 hours. — Fox 1 Media
                </p>
                <button className={styles.resetBtn} onClick={() => setStatus('idle')}>
                  Send Another
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className={styles.form} noValidate>
                {/* Name */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="name">
                    NAME <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className={styles.input}
                      placeholder="CALLSIGN_INPUT"
                      value={fields.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                    />
                    <div className={styles.inputLine} />
                  </div>
                </div>

                {/* Phone */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="phone">
                    PHONE <span className={styles.optional}>// OPTIONAL</span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className={styles.input}
                      placeholder="(XXX) XXX-XXXX"
                      value={fields.phone}
                      onChange={handlePhoneChange}
                      autoComplete="tel"
                    />
                    <div className={styles.inputLine} />
                  </div>
                </div>

                {/* Email */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="email">
                    EMAIL <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={styles.input}
                      placeholder="YOUR@DOMAIN.COM"
                      value={fields.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                    />
                    <div className={styles.inputLine} />
                  </div>
                </div>

                {/* Description */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="description">
                    MISSION BRIEF <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <textarea
                      id="description"
                      name="description"
                      className={`${styles.input} ${styles.textarea}`}
                      placeholder="DESCRIBE YOUR BUILD, PROJECT, OR REQUEST..."
                      value={fields.description}
                      onChange={handleChange}
                      required
                      rows={5}
                    />
                    <div className={styles.inputLine} />
                  </div>
                </div>

                {status === 'error' && (
                  <div className={styles.errorMsg}>
                    TRANSMISSION FAILED — check your connection and retry.
                  </div>
                )}

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'TRANSMITTING...' : 'SEND TRANSMISSION'}
                </button>

                <p className={styles.formDisclaimer}>
                  No spam. No CRM tickets. Direct line to Fox 1 Media.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Bottom telemetry */}
      <div className={styles.bottomTelemetry}>
        <div className={styles.telemetryItem}><span>//</span> COMMS: OPEN</div>
        <div className={styles.telemetryItem}><span>//</span> FOX_UNIT: 01</div>
      </div>

      <div className={styles.barcode} />
    </section>
  );
}
