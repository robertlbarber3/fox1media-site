import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import fox1Logo from '../assets/fox1logo.png';
import styles from './CheckoutPage.module.css';

// ─── Config ───────────────────────────────────────────────────────────────────
// For Vite, put this in your .env file:
// VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxx
//
// If you need a temporary fallback while testing, you can replace the right side
// with your full publishable key string in quotes.
const STRIPE_PUBLISHABLE_KEY =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_51THsCMGkYzvcfX0wESFvRL3CNZHesfFiqyHwiEr5Pb7tiMzKu6jDL5RxyHqfzK2vh9kE3ptC9jRJn8pLPG2m8IHn00dh5jk4O6";

// Backend endpoints
const PAYMENT_INTENT_ENDPOINT  = '/api/create-payment-intent';
const CREATE_BOOKING_ENDPOINT  = '/api/create-booking';
// Your backend should call stripe.promotionCodes.list({ code }) or
// stripe.coupons.retrieve(code) and return:
//   { valid: true, code, name, percentOff, amountOff }  — on success
//   { valid: false, error: '...' }                       — on failure
const VALIDATE_COUPON_ENDPOINT = '/api/validate-coupon';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const cardElementOptions = {
  style: {
    base: {
      color: '#F4F4F5',
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: '14px',
      letterSpacing: '0.05em',
      '::placeholder': { color: 'rgba(138,141,145,0.4)' },
    },
    invalid: { color: '#ff4f4f' },
  },
};

// ─── Inner form ───────────────────────────────────────────────────────────────
function PaymentForm({ cartItems, total, couponCode, onNavigate }) {
  const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('idle'); // idle | processing | success | error
  const [errMsg, setErrMsg] = useState('');

  function formatPhone(val) {
    const digits = val.replace(/\D/g, '').slice(0, 10);
    if (digits.length === 0) return '';
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!stripe || !elements) return;

    if (!name.trim()) {
      setErrMsg('Please enter your full name.');
      setStatus('error');
      return;
    }

    if (!email.trim()) {
      setErrMsg('Please enter your email address.');
      setStatus('error');
      return;
    }

    if (!cartItems.length) {
      setErrMsg('Booking details are incomplete. Please go back and select your session again.');
      setStatus('error');
      return;
    }

    setStatus('processing');
    setErrMsg('');

    const servicesSummary = cartItems.map(b =>
      `${b.type === 'video' ? 'Video' : 'Photo'} ${b.hours}hr`
    ).join(', ');

    try {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error('Card form failed to load. Please refresh and try again.');
      }

      // 1) Ask backend to create a PaymentIntent
      const intentRes = await fetch(PAYMENT_INTENT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          currency: 'usd',
          description: `Fox 1 Media — ${servicesSummary}`,
          customer: {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim() || '',
          },
          cart: cartItems.map(b => ({
            type:  b.type,
            hours: b.hours,
            price: b.price,
            photos: b.photos || null,
            date:  new Date(b.date).toISOString(),
            notes: notes.trim() || '',
          })),
          ...(couponCode ? { couponCode } : {}),
        }),
      });

      const intentData = await intentRes.json().catch(() => ({}));

      if (!intentRes.ok) {
        throw new Error(intentData.error || 'Unable to start payment.');
      }

      if (!intentData.clientSecret) {
        throw new Error('Missing payment client secret from server.');
      }

      // 2) Confirm payment with Stripe
      const paymentResult = await stripe.confirmCardPayment(intentData.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim() || undefined,
          },
        },
      });

      if (paymentResult.error) {
        throw new Error(paymentResult.error.message || 'Payment failed.');
      }

      const paymentIntent = paymentResult.paymentIntent;

      if (!paymentIntent || paymentIntent.status !== 'succeeded') {
        throw new Error('Payment was not completed successfully.');
      }

      // 3) Tell backend to create the bookings / calendar events / confirmation email
      const bookingRes = await fetch(CREATE_BOOKING_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentIntentId: paymentIntent.id,
          paymentStatus:   paymentIntent.status,
          name:   name.trim(),
          email:  email.trim(),
          phone:  phone.trim() || 'Not provided',
          total,
          notes:  notes.trim() || '',
          cart: cartItems.map(b => ({
            type:  b.type,
            hours: b.hours,
            price: b.price,
            photos: b.photos || null,
            date:  new Date(b.date).toISOString(),
          })),
        }),
      });

      const bookingData = await bookingRes.json().catch(() => ({}));

      if (!bookingRes.ok) {
        throw new Error(bookingData.error || 'Payment succeeded, but booking creation failed.');
      }

      setStatus('success');
    } catch (err) {
      setErrMsg(err.message || 'Payment failed. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.successState}>
        <div className={styles.successIcon}>✓</div>
        <h2 className={styles.successTitle}>Booking Confirmed</h2>
        <p className={styles.successBody}>
          Payment received and your session{cartItems.length > 1 ? 's are' : ' is'} locked in.
          A confirmation has been sent to <strong>{email}</strong>. I&apos;ll reach out shortly
          to finalize location and shot list. — Fox 1 Media
        </p>

        <div className={styles.successDetails}>
          <div className={styles.successDetailItem}>
            <span>SERVICES BOOKED</span>
            <strong>{cartItems.length} SESSION{cartItems.length > 1 ? 'S' : ''}</strong>
          </div>
          <div className={styles.successDetailItem}>
            <span>TYPES</span>
            <strong>
              {[...new Set(cartItems.map(b => b.type === 'video' ? 'VIDEO' : 'PHOTO'))].join(' + ')}
            </strong>
          </div>
          <div className={styles.successDetailItem}>
            <span>TOTAL PAID</span>
            <strong style={{ color: 'var(--accent)' }}>${total}</strong>
          </div>
        </div>

        <button className={styles.homeBtn} onClick={() => onNavigate('home')}>
          RETURN HOME
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formSection}>
        <div className={styles.formSectionLabel}>CONTACT INFORMATION</div>

        <div className={styles.fieldRow}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="co-name">
              FULL NAME <span className={styles.req}>*</span>
            </label>
            <div className={styles.inputWrap}>
              <input
                id="co-name"
                type="text"
                className={styles.input}
                placeholder="FULL_NAME"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
              <div className={styles.inputLine} />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="co-email">
              EMAIL <span className={styles.req}>*</span>
            </label>
            <div className={styles.inputWrap}>
              <input
                id="co-email"
                type="email"
                className={styles.input}
                placeholder="YOUR@EMAIL.COM"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <div className={styles.inputLine} />
            </div>
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="co-phone">
            PHONE <span className={styles.opt}>// OPTIONAL</span>
          </label>
          <div className={styles.inputWrap}>
            <input
              id="co-phone"
              type="tel"
              className={styles.input}
              placeholder="(XXX) XXX-XXXX"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              autoComplete="tel"
            />
            <div className={styles.inputLine} />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="co-notes">
            BOOKING NOTES <span className={styles.opt}>// OPTIONAL</span>
          </label>
          <div className={styles.inputWrap}>
            <textarea
              id="co-notes"
              className={`${styles.input} ${styles.textarea}`}
              placeholder="LOCATION PREFERENCE, SHOT IDEAS, SPECIAL REQUESTS..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
            <div className={styles.inputLine} />
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <div className={styles.formSectionLabel}>PAYMENT INFORMATION</div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            CARD DETAILS <span className={styles.req}>*</span>
          </label>
          <div className={styles.cardElementWrap}>
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        <div className={styles.stripeNote}>
          <span className={styles.lockIcon}>🔒</span>
          Payments secured by Stripe. Your card details are never stored on our servers.
        </div>
      </div>

      {status === 'error' && <div className={styles.errorMsg}>{errMsg}</div>}

      <button
        type="submit"
        className={styles.payBtn}
        disabled={!stripe || status === 'processing'}
      >
        {status === 'processing'
          ? 'PROCESSING...'
          : `PAY $${total} // CONFIRM BOOKING`}
      </button>

      <p className={styles.disclaimer}>
        By completing this purchase you agree to show up ready to shoot. No-shows forfeit the
        session fee.
      </p>
    </form>
  );
}

// ─── Outer wrapper ────────────────────────────────────────────────────────────
function fmtTime(h, m) {
  const period = h < 12 ? 'AM' : 'PM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const mins   = m === 0 ? '00' : String(m).padStart(2, '0');
  return `${hour12}:${mins} ${period}`;
}

function fmtDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });
}

export default function CheckoutPage({ booking, onNavigate }) {
  // Normalise: single object or array → always an array, held in local state so
  // removals update the total and payment form without leaving the page.
  const [items, setItems] = useState(() =>
    Array.isArray(booking) ? booking : booking ? [booking] : []
  );

  // Coupon state
  const [couponInput,  setCouponInput]  = useState('');
  const [couponStatus, setCouponStatus] = useState('idle'); // idle | loading | valid | invalid
  const [couponData,   setCouponData]   = useState(null);
  // couponData shape: { code, name, percentOff, amountOff }

  const subtotal = items.reduce((sum, b) => sum + (b.price || 0), 0);
  const discount = couponData
    ? couponData.percentOff
      ? Math.round(subtotal * couponData.percentOff / 100)
      : Math.min(couponData.amountOff || 0, subtotal)
    : 0;
  const total = subtotal - discount;

  function removeItem(idx) {
    setItems(prev => prev.filter((_, i) => i !== idx));
  }

  async function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    setCouponStatus('loading');
    try {
      const res  = await fetch(VALIDATE_COUPON_ENDPOINT, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ code }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.valid) {
        setCouponData(data);
        setCouponStatus('valid');
      } else {
        setCouponData(null);
        setCouponStatus('invalid');
      }
    } catch {
      setCouponData(null);
      setCouponStatus('invalid');
    }
  }

  function removeCoupon() {
    setCouponInput('');
    setCouponData(null);
    setCouponStatus('idle');
  }

  return (
    <section className={styles.page}>
      <div className={styles.scanlines} />
      <div className={styles.gridLayer} />
      <div className={styles.ambientGlow} />
      <img src={fox1Logo} alt="" aria-hidden="true" className={styles.watermarkBadge} />

      <div className={styles.hudBorder}>
        <div className={`${styles.chamferCorner} ${styles.tl}`} />
        <div className={`${styles.chamferCorner} ${styles.tr}`} />
        <div className={`${styles.chamferCorner} ${styles.bl}`} />
        <div className={`${styles.chamferCorner} ${styles.br}`} />
      </div>

      <div className={styles.telemetryBar}>
        <div><span className={styles.statusDot} /> SYSTEM: ACTIVE</div>
        <div>SECTOR: PAYMENT_OPS</div>
        <div>MODE: SECURE_CHECKOUT</div>
        <div>FOX_UNIT: 01</div>
      </div>

      <header className={styles.header}>
        <div className={styles.brandContainer}>
          <img src={fox1Logo} alt="Fox 1 Media" className={styles.logoImg} />
          <div className={styles.brandText}>
            FOX 1 MEDIA<span>TACTICAL VISUALS</span>
          </div>
        </div>

        <nav className={styles.nav}>
          <button onClick={() => onNavigate('home')} className={styles.navBtn}>
            Home_SYS
          </button>
          <button onClick={() => onNavigate('services')} className={styles.navBtn}>
            &#8249; Back to Services
          </button>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.titleRow}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            Checkout // Secure Payment
          </div>
          <h1 className={styles.heading}>
            Complete Your <span className={styles.accent}>Booking.</span>
          </h1>
        </div>

        <div className={styles.layout}>
          <div className={styles.summaryCol}>
            <div className={styles.summaryPanel}>
              <div className={`${styles.cm} ${styles.cmTl}`} />
              <div className={`${styles.cm} ${styles.cmTr}`} />
              <div className={`${styles.cm} ${styles.cmBl}`} />
              <div className={`${styles.cm} ${styles.cmBr}`} />

              <div className={styles.summaryHeader}>
                <span className={styles.statusDot} />
                ORDER SUMMARY // {items.length} SERVICE{items.length !== 1 ? 'S' : ''}
              </div>

              {/* Empty cart state */}
              {items.length === 0 && (
                <div className={styles.emptyCart}>
                  <div className={styles.emptyCartIcon}>∅</div>
                  <p className={styles.emptyCartMsg}>CART IS EMPTY</p>
                  <p className={styles.emptyCartSub}>// All items have been removed. Head back to services to add a booking.</p>
                  <button className={styles.emptyCartBtn} onClick={() => onNavigate('services')}>
                    BACK TO SERVICES &gt;&gt;
                  </button>
                </div>
              )}

              {/* One block per cart item */}
              {items.map((b, idx) => {
                const timeSlot = b.startTime && b.endTime
                  ? `${fmtTime(b.startTime.h, b.startTime.m)} – ${fmtTime(b.endTime.h, b.endTime.m)}`
                  : '';
                const typeLabel = b.type === 'video'
                  ? 'VIDEOGRAPHY'
                  : b.type === 'merch'
                    ? 'CUSTOM MERCH'
                    : 'PHOTOGRAPHY';
                return (
                  <div key={idx} className={styles.cartItemBlock}>
                    <div className={styles.cartItemHeader}>
                      <div className={styles.cartItemLabel}>
                        ITEM {String(idx + 1).padStart(2, '0')} //&nbsp;{typeLabel}
                      </div>
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeItem(idx)}
                        title="Remove this item"
                      >
                        ✕ REMOVE
                      </button>
                    </div>

                    <div className={styles.summaryItems}>
                      {/* ── Merch item rows ── */}
                      {b.type === 'merch' ? (
                        <>
                          <div className={styles.summaryRow}>
                            <span className={styles.summaryKey}>PRODUCT</span>
                            <span className={styles.summaryVal}>{b.name}</span>
                          </div>
                          {b.category && (
                            <div className={styles.summaryRow}>
                              <span className={styles.summaryKey}>CATEGORY</span>
                              <span className={styles.summaryVal}>{b.category}</span>
                            </div>
                          )}
                          {b.quantity > 1 && (
                            <div className={styles.summaryRow}>
                              <span className={styles.summaryKey}>QTY</span>
                              <span className={styles.summaryVal}>
                                {b.quantity} × ${b.unitPrice}
                              </span>
                            </div>
                          )}
                          {b.customText && (
                            <div className={styles.summaryRow}>
                              <span className={styles.summaryKey}>CUSTOM TEXT</span>
                              <span className={styles.summaryVal}>{b.customText}</span>
                            </div>
                          )}
                          <div className={styles.summaryRow}>
                            <span className={styles.summaryKey}>ARTWORK</span>
                            <span className={`${styles.summaryVal} ${styles.artworkConfirmed}`}>
                              ✓ UPLOADED
                            </span>
                          </div>
                          {b.customPhotoPreview && (
                            <img
                              src={b.customPhotoPreview}
                              alt="Custom artwork"
                              className={styles.summaryArtworkThumb}
                            />
                          )}
                        </>
                      ) : (
                        /* ── Session item rows ── */
                        <>
                          <div className={styles.summaryRow}>
                            <span className={styles.summaryKey}>DURATION</span>
                            <span className={styles.summaryVal}>{b.hours} Hour{b.hours > 1 ? 's' : ''}</span>
                          </div>
                          {b.type !== 'video' && b.photos && (
                            <div className={styles.summaryRow}>
                              <span className={styles.summaryKey}>PHOTOS</span>
                              <span className={styles.summaryVal}>{b.photos} Edited</span>
                            </div>
                          )}
                          {b.date && (
                            <div className={styles.summaryRow}>
                              <span className={styles.summaryKey}>DATE</span>
                              <span className={styles.summaryVal}>{fmtDate(b.date)}</span>
                            </div>
                          )}
                          {timeSlot && (
                            <div className={styles.summaryRow}>
                              <span className={styles.summaryKey}>TIME</span>
                              <span className={styles.summaryVal}>{timeSlot}</span>
                            </div>
                          )}
                        </>
                      )}

                      <div className={styles.summaryRow}>
                        <span className={styles.summaryKey}>SUBTOTAL</span>
                        <span className={`${styles.summaryVal} ${styles.summarySubPrice}`}>${b.price}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Coupon / promo code input */}
              {items.length > 0 && (
                <div className={styles.couponSection}>
                  <div className={styles.couponSectionLabel}>PROMO CODE</div>

                  {couponStatus === 'valid' && couponData ? (
                    <div className={styles.couponApplied}>
                      <div className={styles.couponAppliedInfo}>
                        <span className={styles.couponCheck}>✓</span>
                        <span>
                          {couponData.code}
                          {couponData.name ? ` — ${couponData.name}` : ''}
                          {couponData.percentOff ? ` (${couponData.percentOff}% OFF)` : ''}
                          {couponData.amountOff && !couponData.percentOff ? ` ($${couponData.amountOff} OFF)` : ''}
                        </span>
                      </div>
                      <button className={styles.couponRemoveBtn} onClick={removeCoupon} title="Remove promo code">
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className={styles.couponRow}>
                      <div className={styles.couponInputWrap}>
                        <input
                          className={`${styles.couponInput} ${couponStatus === 'invalid' ? styles.couponInputError : ''}`}
                          type="text"
                          placeholder="ENTER CODE"
                          value={couponInput}
                          onChange={e => {
                            setCouponInput(e.target.value.toUpperCase());
                            setCouponStatus('idle');
                          }}
                          onKeyDown={e => e.key === 'Enter' && applyCoupon()}
                          maxLength={30}
                        />
                        <div className={styles.couponInputLine} />
                      </div>
                      <button
                        className={styles.couponApplyBtn}
                        onClick={applyCoupon}
                        disabled={couponStatus === 'loading' || !couponInput.trim()}
                      >
                        {couponStatus === 'loading' ? '...' : 'APPLY'}
                      </button>
                    </div>
                  )}

                  {couponStatus === 'invalid' && (
                    <div className={styles.couponError}>// INVALID OR EXPIRED CODE</div>
                  )}
                </div>
              )}

              {/* Total (with optional discount line) */}
              {items.length > 0 && (
                <div className={styles.summaryTotal}>
                  {discount > 0 && (
                    <>
                      <div className={styles.subtotalRow}>
                        <span className={styles.subtotalLabel}>SUBTOTAL</span>
                        <span className={styles.subtotalAmt}>${subtotal}</span>
                      </div>
                      <div className={styles.discountRow}>
                        <span className={styles.discountLabel}>
                          PROMO&nbsp;
                          {couponData?.percentOff
                            ? `(-${couponData.percentOff}%)`
                            : `(-$${discount})`}
                        </span>
                        <span className={styles.discountAmt}>-${discount}</span>
                      </div>
                    </>
                  )}
                  <div className={styles.totalDueRow}>
                    <span className={styles.totalLabel}>TOTAL DUE</span>
                    <span className={styles.totalPrice}>${total}</span>
                  </div>
                </div>
              )}

              <div className={styles.summaryNote}>
                // Individual additional photos available post-session.
                <br />
                // Reach out via Comms for custom packages.
              </div>

              <div className={styles.panelBarcode} />
            </div>
          </div>

          {items.length > 0 && (
          <div className={styles.formCol}>
            <div className={styles.formPanel}>
              <div className={`${styles.cm} ${styles.cmTl}`} />
              <div className={`${styles.cm} ${styles.cmTr}`} />
              <div className={`${styles.cm} ${styles.cmBl}`} />
              <div className={`${styles.cm} ${styles.cmBr}`} />

              <div className={styles.formHeader}>
                <span className={styles.statusDot} />
                PAYMENT_FORM // ENCRYPTED
                <div className={styles.cursorBlock} />
              </div>

              <Elements stripe={stripePromise}>
                <PaymentForm
                  cartItems={items}
                  total={total}
                  couponCode={couponStatus === 'valid' ? couponData?.code : ''}
                  onNavigate={onNavigate}
                />
              </Elements>
            </div>
          </div>
          )}
        </div>
      </main>

      <div className={styles.bottomTelemetry}>
        <div className={styles.telemetryItem}><span>//</span> CHECKOUT: SECURE</div>
        <div className={styles.telemetryItem}><span>//</span> FOX_UNIT: 01</div>
      </div>

      <div className={styles.barcode} />
    </section>
  );
}