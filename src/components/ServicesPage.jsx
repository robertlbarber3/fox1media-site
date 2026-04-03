import ServicesHero from './ServicesHero';
import ServicesTiers from './ServicesTiers';
import ServicesProof from './ServicesProof';
import FinalCTASection from './FinalCTASection';
import styles from './ServicesPage.module.css';

export default function ServicesPage({ onNavigate, cart = [] }) {
  const total = cart.reduce((sum, b) => sum + (b.price || 0), 0);

  return (
    <>
      {cart.length > 0 && (
        <div className={styles.cartBar}>
          <div className={styles.cartInfo}>
            <span className={styles.cartDot} />
            CART:&nbsp;
            <strong>{cart.length} SERVICE{cart.length > 1 ? 'S' : ''} SAVED</strong>
            <span className={styles.cartDivider}>//</span>
            <span className={styles.cartTotal}>${total}</span>
          </div>
          <button
            className={styles.cartCheckoutBtn}
            onClick={() => onNavigate('checkout', cart)}
          >
            PROCEED TO CHECKOUT &gt;&gt;
          </button>
        </div>
      )}
      <ServicesHero onNavigate={onNavigate} />
      <ServicesTiers onNavigate={onNavigate} />
      <ServicesProof />
      <FinalCTASection onNavigate={onNavigate} />
    </>
  );
}
