import { useEffect, useRef, useState } from "react";
import "./App.css";
import "./invite-extra.css";

import foto1 from "./assets/photos/1.jpg";
import foto2 from "./assets/photos/2.jpg";
import foto3 from "./assets/photos/3.jpg";
import foto4 from "./assets/photos/4.jpg";
import foto5 from "./assets/photos/5.jpg";

// ====== Taklifnoma ma'lumotlarini shu yerdan o'zgartiring ======
const INVITE = {
  groom: "Abbosbek",
  bride: "Marjonaoy",
  kicker: "Nikoh to'yiga taklifnoma",
  greeting:
    "Hayotimizdagi eng baxtli kunni siz bilan baham ko'rishni istaymiz. Aziz mehmonimiz, tantanamizga tashrif buyurib, quvonchimizga sherik bo'lishingizni so'raymiz.",
  weekday: "Yakshanba",
  day: "15",
  month: "Noyabr",
  year: "2026",
  time: "17:00",
  iso: "2026-11-15T17:00:00", // hisoblagich uchun aniq sana va vaqt
  place: "Beksaroy to'yxonasi",
  address: "",
  sign: "Berkinovlar oilasi",
};

// ====== Suratlar va izohlar ======
const HERO = {
  src: foto5,
  alt: `${INVITE.groom} va ${INVITE.bride}`,
  caption: "Endi hamisha birga",
};

const MOMENTS = [
  {
    src: foto1,
    rot: -3,
    cap: "Ikki yurak, bitta taqdir",
    alt: "Kelin-kuyov quchoqlashib turibdi",
  },
  {
    src: foto3,
    rot: 2.5,
    cap: "Baxt satrlari",
    alt: "Kelin guvohnomaga qarab turibdi",
  },
  {
    src: foto2,
    rot: 3,
    cap: "Qalbdagi va'da",
    alt: "Kelin-kuyov guldasta bilan",
  },
  {
    src: foto4,
    rot: -2.5,
    cap: "Gullar ichida sevgi",
    alt: "Kelin kuyovning yelkasiga qo'lini qo'ygan",
  },
];

const OPEN_DELAY = 1400; // konvert ochilish animatsiyasi (ms)
const monogram = `${INVITE.groom[0]}&${INVITE.bride[0]}`;
const TARGET = new Date(INVITE.iso).getTime();

/* ---------- Yordamchi hooklar ---------- */

function useCountdown(target) {
  const left = () => Math.max(0, target - Date.now());
  const [ms, setMs] = useState(left);

  useEffect(() => {
    const id = setInterval(() => setMs(left()), 1000);
    return () => clearInterval(id);
  }, [target]);

  const s = Math.floor(ms / 1000);
  return {
    done: ms === 0,
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

function useSeen() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

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

/* ---------- To'ygacha qolgan vaqt ---------- */

function Countdown() {
  const { done, d, h, m, s } = useCountdown(TARGET);
  const p = (n) => String(n).padStart(2, "0");

  if (done) {
    return <p className="cd-done">To'y kuni keldi!</p>;
  }

  const cells = [
    [d, "kun"],
    [p(h), "soat"],
    [p(m), "daqiqa"],
    [p(s), "soniya"],
  ];

  return (
    <>
      <p className="cd-label">To'ygacha qolgan vaqt</p>
      <div className="cd-grid" role="timer" aria-live="off">
        {cells.map(([v, label]) => (
          <div className="cd-cell" key={label}>
            <b>{v}</b>
            <small>{label}</small>
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------- 2-bosqich: taklifnoma varag'i ---------- */

function Letter() {
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

        <div className="countdown reveal" style={r()}>
          <Countdown />
        </div>

        <div className="details reveal" style={r()}>
          <div className="detail">
            <span className="detail-label">Vaqt</span>
            <span className="detail-value">{INVITE.time}</span>
          </div>
          <div className="detail">
            <span className="detail-label">Manzil</span>
            <span className="detail-value">{INVITE.place}</span>
            {INVITE.address && (
              <span className="detail-sub">{INVITE.address}</span>
            )}
          </div>
        </div>

        <p className="sign reveal" style={r()}>
          {INVITE.sign}
        </p>
      </div>
    </article>
  );
}

/* ---------- 3-bosqich: kelin-kuyov suratlari ---------- */

const SPARKS = [
  [6, 10, 0],
  [92, 4, 0.8],
  [-2, 46, 1.6],
  [100, 54, 0.4],
  [8, 88, 1.2],
  [94, 94, 2],
  [50, -3, 0.6],
  [46, 102, 1.4],
];

function Moment({ item, onZoom }) {
  const [ref, seen] = useSeen();
  return (
    <figure
      ref={ref}
      className={`pola ${seen ? "in" : ""}`}
      style={{ "--rot": `${item.rot}deg` }}
      onClick={() => onZoom(item)}
    >
      <img src={item.src} alt={item.alt} loading="lazy" />
      <figcaption>{item.cap}</figcaption>
    </figure>
  );
}

function Story({ onZoom }) {
  const [ref, seen] = useSeen();
  return (
    <section className="story" aria-label="Kelin-kuyov suratlari">
      <p className="story-kicker">Ikki qalbni bir qilgan lahzalar</p>
      <h2 className="story-title">Bizning hikoyamiz</h2>

      <div ref={ref} className={`arch-wrap ${seen ? "in" : ""}`}>
        {SPARKS.map(([x, y, d], k) => (
          <i
            key={k}
            className="spark"
            style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` }}
          />
        ))}
        <div className="arch" onClick={() => onZoom(HERO)}>
          <div className="arch-in">
            <img src={HERO.src} alt={HERO.alt} />
          </div>
        </div>
        <p className="arch-cap">{HERO.caption}</p>
      </div>

      <div className="polas">
        {MOMENTS.map((m) => (
          <Moment key={m.src} item={m} onZoom={onZoom} />
        ))}
      </div>

      <div className="closing">
        <Divider />
        <p className="closing-text">Sizni kutib qolamiz</p>
        <p className="closing-names">
          {INVITE.groom} &amp; {INVITE.bride}
        </p>
      </div>
    </section>
  );
}

/* ---------- Asosiy komponent ---------- */

function App() {
  // "envelope" -> "letter"
  const [page, setPage] = useState("envelope");
  const [opening, setOpening] = useState(false);
  const [zoom, setZoom] = useState(null);

  useEffect(() => {
    if (!opening) return;
    const id = setTimeout(() => {
      setPage("letter");
      window.scrollTo({ top: 0 });
    }, OPEN_DELAY);
    return () => clearTimeout(id);
  }, [opening]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className={`app ${page === "letter" ? "is-scroll" : ""}`}>
      {page === "envelope" && (
        <Envelope open={opening} onOpen={() => setOpening(true)} />
      )}

      {page === "letter" && (
        <div className="stack">
          <Letter />
          <Story onZoom={setZoom} />
        </div>
      )}

      {zoom && (
        <div
          className="zoom"
          onClick={() => setZoom(null)}
          role="dialog"
          aria-modal="true"
        >
          <img src={zoom.src} alt={zoom.alt} />
        </div>
      )}
    </main>
  );
}

export default App;
