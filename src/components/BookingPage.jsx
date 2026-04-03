import { useState, useEffect } from 'react';
import fox1Logo from '../assets/fox1logo.png';
import styles from './BookingPage.module.css';

// ─── Google Calendar Config ───────────────────────────────────────────────────
// 1. Go to console.cloud.google.com → Create project → Enable "Google Calendar API"
// 2. Create an API Key (restrict it to Calendar API + your domain)
// 3. Share your Google Calendar publicly (read-only) and copy the Calendar ID
const GOOGLE_API_KEY     = '0cba6dc6994f1899a4597b5c05448666be14bfba';
const GOOGLE_CALENDAR_ID = 'robert@fox1media.com';

// ─── Session options ──────────────────────────────────────────────────────────
const SESSIONS = [
  { hours: 1, price: 50,  photos: 7,  label: '1 HR'  },
  { hours: 2, price: 70,  photos: 9,  label: '2 HRS' },
  { hours: 3, price: 90,  photos: 11, label: '3 HRS' },
  { hours: 4, price: 110, photos: 13, label: '4 HRS' },
];

const MONTHS = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE',
                'JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
const DAYS   = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function dateKey(y, m, d) { return `${y}-${m}-${d}`; }

function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

// Generate 10:00 AM → 10:00 PM in 30-min steps
function generateTimeSlots() {
  const slots = [];
  for (let h = 10; h <= 22; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (h === 22 && m > 0) break;
      slots.push({ h, m });
    }
  }
  return slots;
}
const TIME_SLOTS = generateTimeSlots();

function formatTime(h, m) {
  const period = h < 12 ? 'AM' : 'PM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const mins   = m === 0 ? '00' : String(m).padStart(2, '0');
  return `${hour12}:${mins} ${period}`;
}

function addHours(h, m, hoursToAdd) {
  const total = h * 60 + m + hoursToAdd * 60;
  return { h: Math.floor(total / 60) % 24, m: total % 60 };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function BookingPage({ onNavigate, cart = [], addToCart }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [selectedSession, setSelectedSession] = useState(null);
  const [calYear,  setCalYear]  = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);   // Date object
  const [selectedTime, setSelectedTime] = useState(null);   // { h, m }
  const [busyDates,    setBusyDates]    = useState(new Set());
  const [calLoading,   setCalLoading]   = useState(false);
  const [calError,     setCalError]     = useState(false);

  // Fetch Google Calendar busy times whenever visible month changes
  useEffect(() => {
    if (!selectedSession) return;
    fetchBusy(calYear, calMonth);
  }, [calYear, calMonth, selectedSession]);

  async function fetchBusy(year, month) {
    setCalLoading(true);
    setCalError(false);
    const timeMin = new Date(year, month, 1).toISOString();
    const timeMax = new Date(year, month + 1, 0, 23, 59, 59).toISOString();

    try {
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/freeBusy?key=${GOOGLE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timeMin,
            timeMax,
            items: [{ id: GOOGLE_CALENDAR_ID }],
          }),
        }
      );
      const data = await res.json();
      const busyPeriods = data.calendars?.[GOOGLE_CALENDAR_ID]?.busy ?? [];

      const set = new Set();
      busyPeriods.forEach(({ start, end }) => {
        const s = new Date(start);
        const e = new Date(end);
        for (const d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
          set.add(dateKey(d.getFullYear(), d.getMonth(), d.getDate()));
        }
      });
      setBusyDates(set);
    } catch {
      setCalError(true);
    } finally {
      setCalLoading(false);
    }
  }

  function prevMonth() {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
    setSelectedDate(null);
    setSelectedTime(null);
  }

  function nextMonth() {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
    setSelectedDate(null);
    setSelectedTime(null);
  }

  function handleDayClick(day) {
    if (!day) return;
    const d = new Date(calYear, calMonth, day);
    d.setHours(0, 0, 0, 0);
    if (d < today) return;
    if (busyDates.has(dateKey(calYear, calMonth, day))) return;
    setSelectedDate(d);
    setSelectedTime(null); // reset time when date changes
  }

  function isPast(day) {
    const d = new Date(calYear, calMonth, day);
    d.setHours(0, 0, 0, 0);
    return d < today;
  }

  function isBusy(day) {
    return busyDates.has(dateKey(calYear, calMonth, day));
  }

  function isSelected(day) {
    if (!selectedDate) return false;
    return (
      selectedDate.getFullYear() === calYear &&
      selectedDate.getMonth()    === calMonth &&
      selectedDate.getDate()     === day
    );
  }

  function isToday(day) {
    return (
      today.getFullYear() === calYear &&
      today.getMonth()    === calMonth &&
      today.getDate()     === day
    );
  }

  function buildItem() {
    const endTime = addHours(selectedTime.h, selectedTime.m, selectedSession.hours);
    return {
      type:      'photo',
      hours:     selectedSession.hours,
      price:     selectedSession.price,
      photos:    selectedSession.photos,
      date:      selectedDate,
      startTime: selectedTime,
      endTime,
    };
  }

  function handleAddMore() {
    if (!selectedSession || !selectedDate || !selectedTime) return;
    addToCart(buildItem());
    onNavigate('services');
  }

  function handleCheckout() {
    if (!selectedSession || !selectedDate || !selectedTime) return;
    onNavigate('checkout', [...cart, buildItem()]);
  }

  const grid = buildCalendarGrid(calYear, calMonth);

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    : null;

  const formattedTimeSlot = selectedTime && selectedSession
    ? `${formatTime(selectedTime.h, selectedTime.m)} – ${formatTime(...Object.values(addHours(selectedTime.h, selectedTime.m, selectedSession.hours)))}`
    : null;

  // Disable prev-month nav if already at current month
  const atMinMonth = calYear === today.getFullYear() && calMonth === today.getMonth();

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
        <div>SECTOR: BOOKING_OPS</div>
        <div>MODE: PHOTO_SESSION</div>
        <div>FOX_UNIT: 01</div>
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
          <button onClick={() => onNavigate('home')}     className={styles.navBtn}>Home_SYS</button>
          <button onClick={() => onNavigate('services')} className={styles.navBtn}>Services_DEPOT</button>
          <button onClick={() => onNavigate('contact')}  className={styles.navBtn}>Comms</button>
        </nav>
      </header>

      <main className={styles.main}>

        {/* Page title */}
        <div className={styles.titleRow}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            Photo Session Booking // Select Your Package
          </div>
          <h1 className={styles.heading}>
            Book Your <span className={styles.accent}>Session.</span>
          </h1>
        </div>

        {/* ── Step 1: Duration ─────────────────────────────────── */}
        <div className={styles.stepBlock}>
          <div className={styles.stepLabel}>
            <span className={styles.stepNum}>01</span>
            SELECT SESSION DURATION
          </div>

          <div className={styles.sessionGrid}>
            {SESSIONS.map((s) => (
              <button
                key={s.hours}
                className={`${styles.sessionCard} ${selectedSession?.hours === s.hours ? styles.sessionCardActive : ''}`}
                onClick={() => { setSelectedSession(s); setSelectedDate(null); setSelectedTime(null); }}
              >
                <div className={`${styles.cm} ${styles.cmTl}`} />
                <div className={`${styles.cm} ${styles.cmTr}`} />
                <div className={`${styles.cm} ${styles.cmBl}`} />
                <div className={`${styles.cm} ${styles.cmBr}`} />

                <div className={styles.sessionHours}>{s.label}</div>
                <div className={styles.sessionPrice}>${s.price}</div>
                <div className={styles.sessionPhotos}>{s.photos} PHOTOS</div>
                <div className={styles.sessionIncluded}>INCLUDED</div>

                {selectedSession?.hours === s.hours && (
                  <div className={styles.sessionCheck}>✓ SELECTED</div>
                )}
              </button>
            ))}
          </div>

          <div className={styles.photoNote}>
            <span className={styles.noteAccent}>//</span> Base session includes <strong>7 edited photos</strong>. Each additional hour adds <strong>2 photos</strong>.
            Individual photos can also be purchased separately — just mention it in your booking notes.
          </div>
        </div>

        {/* ── Step 2: Calendar ─────────────────────────────────── */}
        {selectedSession && (
          <div className={styles.stepBlock}>
            <div className={styles.stepLabel}>
              <span className={styles.stepNum}>02</span>
              SELECT A DATE
              {calLoading && <span className={styles.loadingTag}>SYNCING CALENDAR...</span>}
            </div>

            <div className={styles.calendarWrap}>
              <div className={`${styles.cm} ${styles.cmTl}`} />
              <div className={`${styles.cm} ${styles.cmTr}`} />
              <div className={`${styles.cm} ${styles.cmBl}`} />
              <div className={`${styles.cm} ${styles.cmBr}`} />

              {/* Calendar header */}
              <div className={styles.calHeader}>
                <button
                  className={styles.calNav}
                  onClick={prevMonth}
                  disabled={atMinMonth}
                >
                  &#8249;
                </button>
                <div className={styles.calMonthLabel}>
                  {MONTHS[calMonth]} {calYear}
                </div>
                <button className={styles.calNav} onClick={nextMonth}>
                  &#8250;
                </button>
              </div>

              {/* Day-of-week headers */}
              <div className={styles.calDaysRow}>
                {DAYS.map(d => (
                  <div key={d} className={styles.calDayHeader}>{d}</div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className={`${styles.calGrid} ${calLoading ? styles.calGridLoading : ''}`}>
                {grid.map((day, idx) => {
                  if (!day) return <div key={`empty-${idx}`} className={styles.calEmpty} />;

                  const past    = isPast(day);
                  const busy    = isBusy(day);
                  const sel     = isSelected(day);
                  const todayFl = isToday(day);

                  return (
                    <button
                      key={day}
                      className={[
                        styles.calDay,
                        past    ? styles.calDayPast    : '',
                        busy    ? styles.calDayBusy    : '',
                        sel     ? styles.calDaySelected: '',
                        todayFl ? styles.calDayToday   : '',
                        !past && !busy ? styles.calDayAvailable : '',
                      ].join(' ')}
                      onClick={() => handleDayClick(day)}
                      disabled={past || busy}
                      title={busy ? 'Already booked' : past ? 'Date has passed' : ''}
                    >
                      {day}
                      {busy && <span className={styles.busyDot} />}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className={styles.calLegend}>
                <div className={styles.legendItem}>
                  <span className={styles.legendDotAvail} /> AVAILABLE
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDotBusy} /> BOOKED
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDotSel} /> SELECTED
                </div>
              </div>

              {calError && (
                <div className={styles.calErrorMsg}>
                  CALENDAR SYNC FAILED — dates shown may not reflect current availability.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Step 3: Time ─────────────────────────────────────── */}
        {selectedSession && selectedDate && (
          <div className={styles.stepBlock}>
            <div className={styles.stepLabel}>
              <span className={styles.stepNum}>03</span>
              SELECT A START TIME
            </div>

            <div className={styles.timeGrid}>
              {TIME_SLOTS.map((slot) => {
                const end = addHours(slot.h, slot.m, selectedSession.hours);
                // Hide slots whose end time exceeds 10:00 PM (22 * 60 = 1320 mins)
                const endTotalMins = slot.h * 60 + slot.m + selectedSession.hours * 60;
                if (endTotalMins > 22 * 60) return null;
                const isActive = selectedTime?.h === slot.h && selectedTime?.m === slot.m;
                return (
                  <button
                    key={`${slot.h}-${slot.m}`}
                    className={`${styles.timeSlot} ${isActive ? styles.timeSlotActive : ''}`}
                    onClick={() => setSelectedTime(slot)}
                  >
                    <span className={styles.timeStart}>{formatTime(slot.h, slot.m)}</span>
                    <span className={styles.timeArrow}>→</span>
                    <span className={styles.timeEnd}>{formatTime(end.h, end.m)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Step 4: Confirm ──────────────────────────────────── */}
        {selectedSession && selectedDate && selectedTime && (
          <div className={styles.stepBlock}>
            <div className={styles.stepLabel}>
              <span className={styles.stepNum}>04</span>
              CONFIRM SELECTION
            </div>

            <div className={styles.summaryBar}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryKey}>SESSION</span>
                <span className={styles.summaryVal}>{selectedSession.label}</span>
              </div>
              <div className={styles.summaryDivider} />
              <div className={styles.summaryItem}>
                <span className={styles.summaryKey}>PHOTOS</span>
                <span className={styles.summaryVal}>{selectedSession.photos}</span>
              </div>
              <div className={styles.summaryDivider} />
              <div className={styles.summaryItem}>
                <span className={styles.summaryKey}>DATE</span>
                <span className={styles.summaryVal}>{formattedDate}</span>
              </div>
              <div className={styles.summaryDivider} />
              <div className={styles.summaryItem}>
                <span className={styles.summaryKey}>TIME</span>
                <span className={styles.summaryVal}>{formattedTimeSlot}</span>
              </div>
              <div className={styles.summaryDivider} />
              <div className={styles.summaryItem}>
                <span className={styles.summaryKey}>SUBTOTAL</span>
                <span className={`${styles.summaryVal} ${styles.summaryPrice}`}>
                  ${selectedSession.price}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 5: Add More Services? ───────────────────────── */}
        {selectedSession && selectedDate && selectedTime && (
          <div className={styles.stepBlock}>
            <div className={styles.stepLabel}>
              <span className={styles.stepNum}>05</span>
              ADD MORE SERVICES?
            </div>

            <div className={styles.upsellBlock}>
              <p className={styles.upsellQuestion}>
                Would you like to add another<br />
                <span>service to your order?</span>
              </p>
              <p className={styles.upsellSub}>
                // You can bundle a video session, custom merch, or any other service
                before checking out. Your current selection will be saved to your cart.
                {cart.length > 0 && (
                  <> &nbsp;<strong style={{ color: 'var(--accent)' }}>
                    {cart.length} item{cart.length > 1 ? 's' : ''} already in cart.
                  </strong></>
                )}
              </p>
              <div className={styles.upsellBtns}>
                <button className={styles.upsellYesBtn} onClick={handleAddMore}>
                  YES, ADD ANOTHER SERVICE &gt;&gt;
                </button>
                <button className={styles.upsellNoBtn} onClick={handleCheckout}>
                  NO — PROCEED TO CHECKOUT (${[...cart, buildItem()].reduce((s, b) => s + b.price, 0)}) &gt;&gt;
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      <div className={styles.bottomTelemetry}>
        <div className={styles.telemetryItem}><span>//</span> BOOKING: OPEN</div>
        <div className={styles.telemetryItem}><span>//</span> FOX_UNIT: 01</div>
      </div>
      <div className={styles.barcode} />
    </section>
  );
}
