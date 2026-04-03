import { useState, useEffect, useRef } from 'react';
import fox1Logo from '../assets/fox1logo.png';
import styles from './CatalogPage.module.css';

// ─── Config ───────────────────────────────────────────────────────────────────
// Your backend should call stripe.products.list({ expand: ['data.default_price'] })
// and return: { products: [...stripeProductObjects] }
const PRODUCTS_ENDPOINT = '/api/products';

// ─── Mock data (used when backend is not yet connected) ───────────────────────
const MOCK_PRODUCTS = [
  {
    id: 'mock_1',
    name: 'Custom Crew T-Shirt',
    description:
      'Premium heavyweight cotton tee with your custom artwork, logo, or design. Built for the car culture — not the mall. Garment-dyed finish, pre-shrunk, retail-grade output.',
    images: [],
    price: 35,
    currency: 'usd',
    category: 'APPAREL',
    metadata: { sizes: 'S / M / L / XL / XXL', material: '100% Ringspun Cotton' },
  },
  {
    id: 'mock_2',
    name: 'Fox 1 × Custom Hoodie',
    description:
      'Midweight pullover hoodie. Triple-needle stitching, fleece interior, built to survive shop life and the car show circuit. Custom embroidery or screen print available.',
    images: [],
    price: 65,
    currency: 'usd',
    category: 'APPAREL',
    metadata: { sizes: 'S / M / L / XL / XXL', material: '80/20 Cotton Poly Fleece' },
  },
  {
    id: 'mock_3',
    name: 'Custom Structured Cap',
    description:
      'Six-panel structured cap, your logo embroidered or heat-transferred. The kind your crew actually wants to wear off the lot and at the meet.',
    images: [],
    price: 30,
    currency: 'usd',
    category: 'APPAREL',
    metadata: { sizes: 'One Size / Adjustable Snapback', material: 'Structured Cotton Twill' },
  },
  {
    id: 'mock_4',
    name: 'Industrial Decal Pack',
    description:
      'Cast-vinyl decals rated for exterior use. Survives triple-digit speeds and pressure washes without peeling, cracking, or UV fade. Custom die-cut to your shape.',
    images: [],
    price: 25,
    currency: 'usd',
    category: 'DECALS',
    metadata: { sizes: '3" / 6" / 12" / custom', material: 'Cast Vinyl — 7-Year Outdoor Rated' },
  },
  {
    id: 'mock_5',
    name: 'Die-Cut Window Banner',
    description:
      'Precision die-cut banner for rear windshields or panel placement. Your design, your dimensions. Perforated so visibility is never compromised.',
    images: [],
    price: 40,
    currency: 'usd',
    category: 'DECALS',
    metadata: { sizes: 'Custom dimensions', material: 'Perforated Vinyl' },
  },
  {
    id: 'mock_6',
    name: 'Laser-Engraved Dash Plaque',
    description:
      'Bespoke aluminum dash plaque laser-engraved with your build details, club name, or spec sheet. Show-ready, heirloom quality — the kind that earns a second look.',
    images: [],
    price: 55,
    currency: 'usd',
    category: 'PLAQUES',
    metadata: { sizes: '3″ × 6″ standard', material: 'Brushed Aluminum' },
  },
  {
    id: 'mock_7',
    name: 'Engraved Build Spec Plate',
    description:
      'Custom spec plate displaying engine, suspension, and build details. Stainless or brushed aluminum with precision laser engraving — functional art for elite builds.',
    images: [],
    price: 70,
    currency: 'usd',
    category: 'PLAQUES',
    metadata: { sizes: '4″ × 8″ custom', material: 'Stainless Steel / Aluminum' },
  },
];

const CATEGORIES = ['ALL', 'APPAREL', 'DECALS', 'PLAQUES'];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function normalizeProduct(p) {
  return {
    id:          p.id,
    name:        p.name,
    description: p.description || '',
    images:      p.images || [],
    price:       p.default_price?.unit_amount
      ? p.default_price.unit_amount / 100
      : (p.price || 0),
    currency:    p.default_price?.currency || p.currency || 'usd',
    category:    ((p.metadata?.category || p.category || 'APPAREL')).toUpperCase(),
    metadata:    p.metadata || {},
  };
}

// ─── Image placeholder ────────────────────────────────────────────────────────
function ProductImagePlaceholder({ category }) {
  const icons = { APPAREL: '👕', DECALS: '🏷', PLAQUES: '🏅' };
  return (
    <div className={styles.imgPlaceholder}>
      <span className={styles.imgPlaceholderIcon}>{icons[category] || '📦'}</span>
      <span className={styles.imgPlaceholderLabel}>// NO PREVIEW</span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CatalogPage({ onNavigate, cart = [], addToCart }) {
  const [view,             setView]            = useState('grid');
  const [products,         setProducts]        = useState([]);
  const [loading,          setLoading]         = useState(true);
  const [activeCategory,   setActiveCategory]  = useState('ALL');
  const [selectedProduct,  setSelectedProduct] = useState(null);
  const [dragOver,         setDragOver]        = useState(false);

  // Customization state (detail view)
  const [customPhoto,        setCustomPhoto]        = useState(null);
  const [customPhotoPreview, setCustomPhotoPreview] = useState('');
  const [customText,         setCustomText]         = useState('');
  const [quantity,           setQuantity]           = useState(1);
  const [fieldErrors,        setFieldErrors]        = useState({});
  const [addedToCart,        setAddedToCart]        = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => { fetchProducts(); }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res  = await fetch(PRODUCTS_ENDPOINT);
      if (!res.ok) throw new Error('backend unavailable');
      const data = await res.json();
      const raw  = data.products || data.data || [];
      const list = raw.map(normalizeProduct);
      setProducts(list.length ? list : MOCK_PRODUCTS);
    } catch {
      setProducts(MOCK_PRODUCTS);
    } finally {
      setLoading(false);
    }
  }

  // ── Grid helpers ────────────────────────────────────────────────────────────
  const filtered = activeCategory === 'ALL'
    ? products
    : products.filter(p => p.category === activeCategory);

  // ── Detail helpers ──────────────────────────────────────────────────────────
  function openDetail(product) {
    setSelectedProduct(product);
    setCustomPhoto(null);
    setCustomPhotoPreview('');
    setCustomText('');
    setQuantity(1);
    setFieldErrors({});
    setAddedToCart(false);
    setView('detail');
    window.scrollTo(0, 0);
  }

  function backToGrid() {
    setView('grid');
    setSelectedProduct(null);
    setAddedToCart(false);
    window.scrollTo(0, 0);
  }

  // ── File upload ─────────────────────────────────────────────────────────────
  function readFile(file) {
    if (!file) return;
    setCustomPhoto(file);
    const reader = new FileReader();
    reader.onload = ev => setCustomPhotoPreview(ev.target.result);
    reader.readAsDataURL(file);
    setFieldErrors(prev => ({ ...prev, photo: false }));
  }

  function handleFileInput(e) { readFile(e.target.files?.[0]); }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    readFile(e.dataTransfer.files?.[0]);
  }

  function removePhoto() {
    setCustomPhoto(null);
    setCustomPhotoPreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  // ── Add to cart ─────────────────────────────────────────────────────────────
  function handleAddToCart() {
    const errors = {};
    if (!customText.trim()) errors.text = true;
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }
    addToCart({
      type:               'merch',
      productId:          selectedProduct.id,
      name:               selectedProduct.name,
      unitPrice:          selectedProduct.price,
      price:              selectedProduct.price * quantity,
      image:              selectedProduct.images[0] || '',
      category:           selectedProduct.category,
      customPhotoPreview,
      customText:         customText.trim(),
      quantity,
    });
    setAddedToCart(true);
  }

  function handleProceedToCheckout() {
    // cart already has this item from handleAddToCart; pass full cart
    onNavigate('checkout', [...cart]);
  }

  // ── Cart running total (including any item just added) ──────────────────────
  const cartTotal = cart.reduce((s, b) => s + (b.price || 0), 0);

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <section className={styles.page}>
      {/* Atmosphere */}
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

      {/* Telemetry */}
      <div className={styles.telemetryBar}>
        <div><span className={styles.statusDot} /> SYSTEM: ACTIVE</div>
        <div>SECTOR: MERCH_DEPOT</div>
        <div>MODE: {view === 'grid' ? 'CATALOG_BROWSE' : 'ITEM_DETAIL'}</div>
        <div>FOX_UNIT: 01</div>
      </div>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.brandContainer}>
          <img src={fox1Logo} alt="Fox 1 Media" className={styles.logoImg} />
          <div className={styles.brandText}>
            FOX 1 MEDIA<span>TACTICAL VISUALS</span>
          </div>
        </div>
        <nav className={styles.nav}>
          <button onClick={() => onNavigate('home')}     className={styles.navBtn}>Home_SYS</button>
          <button onClick={() => onNavigate('services')} className={styles.navBtn}>Services_DEPOT</button>
          <button onClick={() => onNavigate('contact')}  className={styles.navBtn}>Comms</button>
          {cart.length > 0 && (
            <button
              className={`${styles.navBtn} ${styles.navCartBtn}`}
              onClick={() => onNavigate('checkout', cart)}
            >
              CART ({cart.length}) ${cartTotal}
            </button>
          )}
        </nav>
      </header>

      <main className={styles.main}>

        {/* ── GRID VIEW ──────────────────────────────────────────────────────── */}
        {view === 'grid' && (
          <>
            <div className={styles.titleRow}>
              <div className={styles.eyebrow}>
                <span className={styles.eyebrowLine} />
                Custom Merch // Catalog Browse
              </div>
              <h1 className={styles.heading}>
                Custom <span className={styles.accent}>Catalog.</span>
              </h1>
              <p className={styles.subheading}>
                // Select an item to configure your custom order. All pieces require uploaded artwork and custom text before checkout.
              </p>
            </div>

            {/* Category filter */}
            <div className={styles.filterRow}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
              <div className={styles.filterCount}>
                {filtered.length} ITEM{filtered.length !== 1 ? 'S' : ''}
              </div>
            </div>

            {/* Loading state */}
            {loading && (
              <div className={styles.loadingState}>
                <span className={styles.statusDot} /> LOADING CATALOG...
              </div>
            )}

            {/* Product grid */}
            {!loading && (
              <div className={styles.productGrid}>
                {filtered.map(product => (
                  <button
                    key={product.id}
                    className={styles.productCard}
                    onClick={() => openDetail(product)}
                  >
                    <div className={`${styles.cm} ${styles.cmTl}`} />
                    <div className={`${styles.cm} ${styles.cmTr}`} />
                    <div className={`${styles.cm} ${styles.cmBl}`} />
                    <div className={`${styles.cm} ${styles.cmBr}`} />

                    {/* Image */}
                    <div className={styles.cardImg}>
                      {product.images[0] ? (
                        <img src={product.images[0]} alt={product.name} />
                      ) : (
                        <ProductImagePlaceholder category={product.category} />
                      )}
                      <div className={styles.cardCategoryBadge}>{product.category}</div>
                    </div>

                    {/* Info */}
                    <div className={styles.cardBody}>
                      <div className={styles.cardName}>{product.name}</div>
                      <div className={styles.cardPrice}>${product.price}</div>
                      <p className={styles.cardDesc}>
                        {product.description.length > 90
                          ? product.description.slice(0, 87) + '...'
                          : product.description}
                      </p>
                    </div>

                    <div className={styles.cardCta}>
                      INSPECT ITEM &gt;&gt;
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── DETAIL VIEW ────────────────────────────────────────────────────── */}
        {view === 'detail' && selectedProduct && (
          <>
            {/* Back nav */}
            <button className={styles.backBtn} onClick={backToGrid}>
              &lt; BACK TO CATALOG
            </button>

            <div className={styles.detailLayout}>

              {/* ── Left: product info ─────────────────────────── */}
              <div className={styles.detailLeft}>
                <div className={styles.detailImgWrap}>
                  <div className={`${styles.cm} ${styles.cmTl}`} />
                  <div className={`${styles.cm} ${styles.cmTr}`} />
                  <div className={`${styles.cm} ${styles.cmBl}`} />
                  <div className={`${styles.cm} ${styles.cmBr}`} />
                  {selectedProduct.images[0] ? (
                    <img
                      src={selectedProduct.images[0]}
                      alt={selectedProduct.name}
                      className={styles.detailImg}
                    />
                  ) : (
                    <ProductImagePlaceholder category={selectedProduct.category} />
                  )}
                </div>

                <div className={styles.detailInfoPanel}>
                  <div className={`${styles.cm} ${styles.cmTl}`} />
                  <div className={`${styles.cm} ${styles.cmTr}`} />
                  <div className={`${styles.cm} ${styles.cmBl}`} />
                  <div className={`${styles.cm} ${styles.cmBr}`} />

                  <div className={styles.detailCategory}>{selectedProduct.category}</div>
                  <h2 className={styles.detailName}>{selectedProduct.name}</h2>
                  <div className={styles.detailPrice}>${selectedProduct.price}</div>
                  <p className={styles.detailDesc}>{selectedProduct.description}</p>

                  {/* Metadata rows */}
                  {Object.entries(selectedProduct.metadata).map(([key, val]) => (
                    <div className={styles.detailMeta} key={key}>
                      <span className={styles.detailMetaKey}>
                        {key.replace(/_/g, ' ').toUpperCase()}
                      </span>
                      <span className={styles.detailMetaVal}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right: customization block ─────────────────── */}
              <div className={styles.detailRight}>

                {/* Added-to-cart confirmation */}
                {addedToCart ? (
                  <div className={styles.addedBlock}>
                    <div className={`${styles.cm} ${styles.cmTl}`} />
                    <div className={`${styles.cm} ${styles.cmTr}`} />
                    <div className={`${styles.cm} ${styles.cmBl}`} />
                    <div className={`${styles.cm} ${styles.cmBr}`} />

                    <div className={styles.addedIcon}>✓</div>
                    <div className={styles.addedTitle}>ADDED TO CART</div>
                    <p className={styles.addedSub}>
                      {selectedProduct.name} has been saved to your order.
                      {cart.length > 0 && (
                        <> Cart total: <strong style={{ color: 'var(--accent)' }}>${cartTotal}</strong></>
                      )}
                    </p>
                    <div className={styles.addedBtns}>
                      <button className={styles.continueBrowseBtn} onClick={backToGrid}>
                        CONTINUE SHOPPING &gt;&gt;
                      </button>
                      <button className={styles.proceedCheckoutBtn} onClick={handleProceedToCheckout}>
                        PROCEED TO CHECKOUT (${cartTotal}) &gt;&gt;
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.customizeBlock}>
                    <div className={`${styles.cm} ${styles.cmTl}`} />
                    <div className={`${styles.cm} ${styles.cmTr}`} />
                    <div className={`${styles.cm} ${styles.cmBl}`} />
                    <div className={`${styles.cm} ${styles.cmBr}`} />

                    <div className={styles.customizeHeader}>
                      <span className={styles.statusDot} />
                      CUSTOMIZATION // REQUIRED
                    </div>
                    <p className={styles.customizeNote}>
                      // Custom text is required. Artwork upload is optional — if you have a logo or
                      design file, attach it here and it will be sent directly to production with your order.
                    </p>

                    {/* ── 01: Photo upload ──────────────────────── */}
                    <div className={styles.customizeStep}>
                      <div className={styles.customizeStepLabel}>
                        <span className={styles.customizeStepNum}>01</span>
                        UPLOAD YOUR ARTWORK OR PHOTO
                        <span className={styles.optBadge}>OPTIONAL</span>
                      </div>

                      {customPhotoPreview ? (
                        <div className={styles.photoPreviewWrap}>
                          <img
                            src={customPhotoPreview}
                            alt="Custom artwork preview"
                            className={styles.photoPreview}
                          />
                          <div className={styles.photoPreviewMeta}>
                            <span className={styles.photoPreviewName}>
                              ✓ {customPhoto?.name}
                            </span>
                            <button className={styles.photoRemoveBtn} onClick={removePhoto}>
                              ✕ REMOVE
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`${styles.uploadZone} ${dragOver ? styles.uploadZoneDrag : ''} ${fieldErrors.photo ? styles.uploadZoneError : ''}`}
                          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                          onDragLeave={() => setDragOver(false)}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          role="button"
                          tabIndex={0}
                          onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
                        >
                          <div className={styles.uploadZoneIcon}>↑</div>
                          <div className={styles.uploadZoneText}>
                            DRAG &amp; DROP OR CLICK TO UPLOAD
                          </div>
                          <div className={styles.uploadZoneSub}>
                            // JPG / PNG / SVG / PDF — max 20MB
                          </div>
                        </div>
                      )}

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,.pdf,.svg"
                        className={styles.fileInputHidden}
                        onChange={handleFileInput}
                      />

                      {fieldErrors.photo && (
                        <div className={styles.fieldError}>
                          // ARTWORK UPLOAD REQUIRED BEFORE CONTINUING
                        </div>
                      )}
                    </div>

                    {/* ── 02: Custom text ───────────────────────── */}
                    <div className={styles.customizeStep}>
                      <div className={styles.customizeStepLabel}>
                        <span className={styles.customizeStepNum}>02</span>
                        ENTER YOUR CUSTOM TEXT
                        <span className={styles.reqBadge}>REQUIRED</span>
                      </div>

                      <div className={styles.textareaWrap}>
                        <textarea
                          className={`${styles.customTextarea} ${fieldErrors.text ? styles.customTextareaError : ''}`}
                          placeholder="YOUR NAME, LOGO TEXT, CLUB AFFILIATION, BUILD DETAILS, OR ANY SPECIAL INSTRUCTIONS FOR PRODUCTION..."
                          value={customText}
                          onChange={e => {
                            setCustomText(e.target.value);
                            if (e.target.value.trim()) {
                              setFieldErrors(prev => ({ ...prev, text: false }));
                            }
                          }}
                          rows={5}
                          maxLength={500}
                        />
                        <div className={styles.textareaLine} />
                        <div className={styles.charCount}>
                          {customText.length} / 500
                        </div>
                      </div>

                      {fieldErrors.text && (
                        <div className={styles.fieldError}>
                          // CUSTOM TEXT IS REQUIRED BEFORE CONTINUING
                        </div>
                      )}
                    </div>

                    {/* ── 03: Quantity ──────────────────────────── */}
                    <div className={styles.customizeStep}>
                      <div className={styles.customizeStepLabel}>
                        <span className={styles.customizeStepNum}>03</span>
                        SELECT QUANTITY
                      </div>

                      <div className={styles.qtyRow}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => setQuantity(q => Math.max(1, q - 1))}
                          disabled={quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <div className={styles.qtyDisplay}>
                          <input
                            className={styles.qtyInput}
                            type="number"
                            min={1}
                            max={99}
                            value={quantity}
                            onChange={e => {
                              const val = parseInt(e.target.value, 10);
                              if (isNaN(val) || e.target.value === '') {
                                setQuantity('');
                              } else {
                                setQuantity(Math.min(99, Math.max(1, val)));
                              }
                            }}
                            onBlur={e => {
                              const val = parseInt(e.target.value, 10);
                              setQuantity(isNaN(val) || val < 1 ? 1 : Math.min(99, val));
                            }}
                          />
                          <span className={styles.qtyUnit}>UNIT{quantity !== 1 ? 'S' : ''}</span>
                        </div>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => setQuantity(q => Math.min(99, q + 1))}
                          disabled={quantity >= 99}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <div className={styles.qtyTotal}>
                          ${selectedProduct.price * quantity}
                        </div>
                      </div>
                    </div>

                    {/* ── Add to cart ───────────────────────────── */}
                    <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                      ADD TO CART — {quantity > 1 ? `${quantity} × $${selectedProduct.price} = ` : ''}${selectedProduct.price * quantity} &gt;&gt;
                    </button>

                    <p className={styles.customizeDisclaimer}>
                      // Submitting your order confirms the artwork and text above are final.
                      Production begins after payment. No changes after checkout.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

      </main>

      {/* Bottom chrome */}
      <div className={styles.bottomTelemetry}>
        <div className={styles.telemetryItem}><span>//</span> DEPOT: OPEN</div>
        <div className={styles.telemetryItem}><span>//</span> FOX_UNIT: 01</div>
      </div>
      <div className={styles.barcode} />
    </section>
  );
}
