import { useEffect, useState } from "react";
import "./App.css";

// ====== Taklifnoma ma'lumotlarini shu yerdan o'zgartiring ======
const INVITE = {
  groom: "Akmal",
  bride: "Dilnoza",
  kicker: "Nikoh to'yiga taklifnoma",
  greeting:
    "Hayotimizdagi eng baxtli kunni siz bilan baham ko'rishni istaymiz. Aziz mehmonimiz, tantanamizga tashrif buyurib, quvonchimizga sherik bo'lishingizni so'raymiz.",
  weekday: "Yakshanba",
  day: "20",
  month: "Dekabr",
  year: "2026",
  time: "18:00",
  place: "Navro'z to'yxonasi",
  address: "Toshkent shahri",
  sign: "Karimovlar va Rahimovlar oilalari",
};

const OPEN_DELAY = 1400; // konvert ochilish animatsiyasi (ms)
const monogram = `${INVITE.groom[0]}&${INVITE.bride[0]}`;

/* ---------- Dekor elementlar (SVG) ---------- */

function Sprig({ className = "" }) {
  const leaf = "M0 0 C 6 -9 18 -9 26 0 C 18 9 6 9 0 0Z";
  const leaves = [
    [20.7, 123, -125],
    [20.7, 123, -5],
    [35.5, 99, -128],
    [35.5, 99, 0],
    [53.6, 73, -122],
    [53.6, 73, -12],
    [75.9, 45, -112],
    [75.9, 45, -22],
    [104, 12, -58],
  ];
  return (
    <svg
      className={`sprig ${className}`}
      viewBox="0 0 120 150"
      aria-hidden="true"
    >
      <path
        d="M8 146 C 28 108 52 70 104 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <g
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="0.9"
      >
        {leaves.map(([x, y, a], i) => (
          <path
            key={i}
            d={leaf}
            transform={`translate(${x} ${y}) rotate(${a})`}
          />
        ))}
      </g>
      <circle cx="10" cy="143" r="2.2" fill="currentColor" />
    </svg>
  );
}

function Divider() {
  return (
    <svg className="divider" viewBox="0 0 220 14" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <path d="M0 7 H92" />
        <path d="M128 7 H220" />
        <path d="M110 1.5 L115.5 7 L110 12.5 L104.5 7 Z" fill="currentColor" />
      </g>
    </svg>
  );
}

/* ---------- 1-bosqich: konvert ---------- */

function Envelope({ open, onOpen }) {
  return (
    <div className={`stage-envelope ${open ? "is-leaving" : ""}`}>
      <button
        type="button"
        className={`envelope ${open ? "open" : ""}`}
        onClick={onOpen}
        aria-label="Taklifnomani ochish"
      >
        <span className="env-back" />

        <span className="env-letter">
          <span className="env-letter-names">
            {INVITE.groom} <i>&amp;</i> {INVITE.bride}
          </span>
        </span>

        {/* Konvertning old tomoni */}
        <svg
          className="env-pocket"
          viewBox="0 0 400 300"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g stroke="#c8a45d" strokeOpacity="0.7" strokeWidth="1">
            <polygon points="0,0 200,165 0,300" fill="#efe6d4" />
            <polygon points="400,0 200,165 400,300" fill="#ebe1cc" />
            <polygon points="0,300 200,150 400,300" fill="#f6f0e3" />
          </g>
        </svg>

        {/* Qopqoq: old va orqa yuzi */}
        <span className="env-flap">
          <svg
            className="flap-face front"
            viewBox="0 0 400 165"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon
              points="0,0 400,0 200,163"
              fill="#f8f2e6"
              stroke="#c8a45d"
              strokeOpacity="0.8"
              strokeWidth="1.2"
            />
          </svg>
          <svg
            className="flap-face back"
            viewBox="0 0 400 165"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="diamonds"
                width="22"
                height="22"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M11 4 L18 11 L11 18 L4 11 Z"
                  fill="none"
                  stroke="#c8a45d"
                  strokeOpacity="0.45"
                  strokeWidth="0.8"
                />
              </pattern>
            </defs>
            <polygon points="0,0 400,0 200,163" fill="#0f3a30" />
            <polygon points="0,0 400,0 200,163" fill="url(#diamonds)" />
            <polygon
              points="0,0 400,0 200,163"
              fill="none"
              stroke="#c8a45d"
              strokeOpacity="0.8"
              strokeWidth="1.2"
            />
          </svg>
        </span>

        <span className="env-seal" aria-hidden="true">
          <span className="env-seal-inner">{monogram}</span>
        </span>
      </button>

      <p className={`hint ${open ? "hint-hidden" : ""}`}>
        Ochish uchun konvertni bosing
      </p>
    </div>
  );
}

/* ---------- 2-bosqich: taklifnoma varag'i ---------- */

function Letter({ onNext }) {
  let i = 0;
  const r = () => ({ "--i": i++ });

  return (
    <article className="paper" aria-live="polite">
      <Sprig className="sprig-tl" />
      <Sprig className="sprig-tr" />
      <Sprig className="sprig-bl" />
      <Sprig className="sprig-br" />

      <div className="paper-body">
        <p className="kicker reveal" style={r()}>
          {INVITE.kicker}
        </p>

        <h1 className="names reveal" style={r()}>
          <span>{INVITE.groom}</span>
          <span className="amp">&amp;</span>
          <span>{INVITE.bride}</span>
        </h1>

        <Divider />

        <p className="greeting reveal" style={r()}>
          {INVITE.greeting}
        </p>

        <div className="date reveal" style={r()}>
          <p className="weekday">{INVITE.weekday}</p>
          <div className="date-row">
            <span>{INVITE.month}</span>
            <strong>{INVITE.day}</strong>
            <span>{INVITE.year}</span>
          </div>
        </div>

        <div className="details reveal" style={r()}>
          <div className="detail">
            <span className="detail-label">Vaqt</span>
            <span className="detail-value">{INVITE.time}</span>
          </div>
          <div className="detail">
            <span className="detail-label">Manzil</span>
            <span className="detail-value">{INVITE.place}</span>
            <span className="detail-sub">{INVITE.address}</span>
          </div>
        </div>

        <p className="sign reveal" style={r()}>
          {INVITE.sign}
        </p>

        <button
          type="button"
          className="btn reveal"
          style={r()}
          onClick={onNext}
        >
          Davom etish
        </button>
      </div>
    </article>
  );
}

/* ---------- 3-bosqich: boshqa sahifa ---------- */

function NextPage({ onBack }) {
  return (
    <section className="paper next">
      <Sprig className="sprig-tl" />
      <Sprig className="sprig-tr" />
      <div className="paper-body">
        <h1 className="names single">Rahmat!</h1>
        <Divider />
        <p className="greeting">
          Bu yerga tashrifni tasdiqlash, manzil xaritasi yoki tabrik qoldirish
          bo'limini joylashtirishingiz mumkin.
        </p>
        <button type="button" className="btn btn-ghost" onClick={onBack}>
          Taklifnomaga qaytish
        </button>
      </div>
    </section>
  );
}

/* ---------- Asosiy komponent ---------- */

function App() {
  // "envelope" -> "letter" -> "next"
  const [page, setPage] = useState("envelope");
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    if (!opening) return;
    const id = setTimeout(() => setPage("letter"), OPEN_DELAY);
    return () => clearTimeout(id);
  }, [opening]);

  const goTo = (p) => {
    setPage(p);
    window.scrollTo({ top: 0 });
  };

  return (
    <main className="app">
      {page === "envelope" && (
        <Envelope open={opening} onOpen={() => setOpening(true)} />
      )}
      {page === "letter" && <Letter onNext={() => goTo("next")} />}
      {page === "next" && <NextPage onBack={() => goTo("letter")} />}
    </main>
  );
}

export default App;
