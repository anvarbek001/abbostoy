import { useEffect, useRef, useState } from "react";
import "./App.css";
import "./invite-extra.css";
import "./book.css";

import foto1 from "./assets/photos/1.jpg";
import foto2 from "./assets/photos/2.jpg";
import foto3 from "./assets/photos/3.jpg";
import foto4 from "./assets/photos/4.jpg";
import foto5 from "./assets/photos/5.jpg";

// To'yxona suratlari: src/assets/venue/ papkasiga 1.jpg ... 4.jpg qo'ying
import venue1 from "./assets/venue/1.jpg";
import venue2 from "./assets/venue/2.jpg";
import venue3 from "./assets/venue/3.jpg";
import venue4 from "./assets/venue/4.jpg";

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
  iso: "2026-11-15T17:00:00",
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
    cap: "Ikki yurak, bitta taqdir",
    alt: "Kelin-kuyov quchoqlashib turibdi",
  },
  { src: foto3, cap: "Baxt satrlari", alt: "Kelin guvohnomaga qarab turibdi" },
  { src: foto2, cap: "Qalbdagi va'da", alt: "Kelin-kuyov guldasta bilan" },
  {
    src: foto4,
    cap: "Gullar ichida sevgi",
    alt: "Kelin kuyovning yelkasiga qo'lini qo'ygan",
  },
];

// ====== To'yxona ======
const VENUE_PHOTOS = [
  { src: venue1, cap: "Tantana zali", alt: "To'yxona zali" },
  { src: venue2, cap: "Bezatilgan stollar", alt: "To'yxona stollari" },
  { src: venue3, cap: "Kirish qismi", alt: "To'yxona kirish qismi" },
  { src: venue4, cap: "Hovli va bog'", alt: "To'yxona hovlisi" },
];

// Katta video: src/ ichiga EMAS, public/video/toyxona.mp4 ga qo'ying
const VENUE_VIDEO = "/video/toyxona.mp4";
const VENUE_POSTER = venue1;

const OPEN_DELAY = 1400;
const monogram = `${INVITE.groom[0]}&${INVITE.bride[0]}`;
const TARGET = new Date(INVITE.iso).getTime();

/* ---------- Hook ---------- */

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

/* ---------- Dekor (SVG) ---------- */

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

  if (done) return <p className="cd-done">To'y kuni keldi!</p>;

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

/* ---------- Kitob sahifalari ---------- */

// Matnli sahifalar (burchaklarida novdalar bor)
function IntroPage() {
  return (
    <>
      <p className="kicker reveal" style={{ "--i": 0 }}>
        {INVITE.kicker}
      </p>
      <h1 className="names reveal" style={{ "--i": 1 }}>
        <span>{INVITE.groom}</span>
        <span className="amp">&amp;</span>
        <span>{INVITE.bride}</span>
      </h1>
      <Divider />
      <p className="greeting reveal" style={{ "--i": 2 }}>
        {INVITE.greeting}
      </p>
    </>
  );
}

function DatePage() {
  return (
    <>
      <div className="date reveal" style={{ "--i": 0 }}>
        <p className="weekday">{INVITE.weekday}</p>
        <div className="date-row">
          <span>{INVITE.month}</span>
          <strong>{INVITE.day}</strong>
          <span>{INVITE.year}</span>
        </div>
      </div>
      <div className="countdown reveal" style={{ "--i": 1 }}>
        <Countdown />
      </div>
    </>
  );
}

function DetailsPage() {
  return (
    <>
      <div className="details reveal" style={{ "--i": 0 }}>
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
      <Divider />
      <p className="sign reveal" style={{ "--i": 1 }}>
        {INVITE.sign}
      </p>
    </>
  );
}

function ClosingPage() {
  return (
    <>
      <Divider />
      <p className="closing-text reveal" style={{ "--i": 0 }}>
        Sizni kutib qolamiz
      </p>
      <p className="closing-names reveal" style={{ "--i": 1 }}>
        {INVITE.groom} &amp; {INVITE.bride}
      </p>
    </>
  );
}

/* Har bir surat — alohida sahifa */

const SPARKS = [
  [6, 10, 0],
  [92, 4, 0.8],
  [-2, 46, 1.6],
  [100, 54, 0.4],
  [8, 88, 1.2],
  [94, 94, 2],
];

function HeroPage({ active, onZoom }) {
  return (
    <div className="photo-page">
      <p className="photo-kicker reveal" style={{ "--i": 0 }}>
        Bizning hikoyamiz
      </p>
      <div className={`arch-wrap ${active ? "in" : ""}`}>
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
      </div>
      <p className="photo-cap reveal" style={{ "--i": 2 }}>
        {HERO.caption}
      </p>
    </div>
  );
}

function PhotoPage({ item, label, onZoom }) {
  return (
    <figure className="photo-page">
      {label && (
        <p className="photo-kicker reveal" style={{ "--i": 0 }}>
          {label}
        </p>
      )}
      <div
        className="photo-frame reveal"
        style={{ "--i": 1 }}
        onClick={() => onZoom(item)}
      >
        <img src={item.src} alt={item.alt} loading="lazy" />
      </div>
      <figcaption className="photo-cap reveal" style={{ "--i": 2 }}>
        {item.cap}
      </figcaption>
    </figure>
  );
}

/* Video sahifa (200 MB — faqat bosilganda yuklanadi) */

function VideoPage({ active }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  // Sahifadan chiqilsa video to'xtaydi
  useEffect(() => {
    if (!active && ref.current) ref.current.pause();
  }, [active]);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    setStarted(true);
    v.play().catch(() => {});
  };

  return (
    <div className="photo-page">
      <p className="photo-kicker reveal" style={{ "--i": 0 }}>
        To'yxona bilan tanishing
      </p>
      <div className="video-box reveal" style={{ "--i": 1 }}>
        <video
          ref={ref}
          src={VENUE_VIDEO}
          poster={VENUE_POSTER}
          preload="none"
          playsInline
          controls={started}
          controlsList="nodownload"
        />
        {!started && (
          <button
            type="button"
            className="video-play"
            onClick={play}
            aria-label="Videoni ijro etish"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
            </svg>
          </button>
        )}
      </div>
      <p className="photo-cap reveal" style={{ "--i": 2 }}>
        {INVITE.place}
      </p>
    </div>
  );
}

/* ---------- Kitob ---------- */

function Book({ onZoom }) {
  const ref = useRef(null);
  const wheelLock = useRef(0);
  const [index, setIndex] = useState(0);

  // ornate: burchaklarda novdalar bo'ladi
  const pages = [
    { key: "intro", ornate: true, render: () => <IntroPage /> },
    { key: "date", ornate: true, render: () => <DatePage /> },
    { key: "details", ornate: true, render: () => <DetailsPage /> },
    { key: "hero", render: (a) => <HeroPage active={a} onZoom={onZoom} /> },
    ...MOMENTS.map((m, i) => ({
      key: `m${i}`,
      render: () => <PhotoPage item={m} onZoom={onZoom} />,
    })),
    ...VENUE_PHOTOS.map((v, i) => ({
      key: `v${i}`,
      render: () => (
        <PhotoPage
          item={v}
          label={i === 0 ? INVITE.place : ""}
          onZoom={onZoom}
        />
      ),
    })),
    { key: "video", render: (a) => <VideoPage active={a} /> },
    { key: "end", ornate: true, render: () => <ClosingPage /> },
  ];
  const last = pages.length - 1;

  const go = (i) => {
    const el = ref.current;
    if (!el) return;
    const n = Math.max(0, Math.min(last, i));
    el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = ref.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const onWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || Math.abs(e.deltaY) < 20)
      return;
    const now = Date.now();
    if (now - wheelLock.current < 700) return;
    wheelLock.current = now;
    go(index + (e.deltaY > 0 ? 1 : -1));
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  return (
    <>
      <div className="book" ref={ref} onScroll={onScroll} onWheel={onWheel}>
        {pages.map((p, i) => {
          const state = i === index ? "active" : i < index ? "before" : "after";
          return (
            <section
              key={p.key}
              className={`leaf ${state}`}
              aria-hidden={i !== index}
              aria-label={`${i + 1}-sahifa`}
            >
              <article className="paper page">
                {p.ornate && (
                  <>
                    <Sprig className="sprig-tl" />
                    <Sprig className="sprig-tr" />
                    <Sprig className="sprig-bl" />
                    <Sprig className="sprig-br" />
                  </>
                )}
                <div className="page-body">{p.render(i === index)}</div>
              </article>
            </section>
          );
        })}
      </div>

      <nav className="book-nav" aria-label="Sahifalar">
        <button
          type="button"
          className="nav-btn"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Oldingi sahifa"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M15 5l-7 7 7 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="nav-mid">
          <span className="nav-count">
            {index + 1} / {pages.length}
          </span>
          <span className="nav-bar">
            <i style={{ width: `${((index + 1) / pages.length) * 100}%` }} />
          </span>
        </div>

        <button
          type="button"
          className={`nav-btn ${index === 0 ? "nudge" : ""}`}
          onClick={() => go(index === last ? 0 : index + 1)}
          aria-label={index === last ? "Boshiga qaytish" : "Keyingi sahifa"}
        >
          {index === last ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 12a8 8 0 1 0 3-6.2M4 4v4h4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </nav>
    </>
  );
}

/* ---------- Asosiy komponent ---------- */

function App() {
  const [page, setPage] = useState("envelope"); // "envelope" -> "book"
  const [opening, setOpening] = useState(false);
  const [zoom, setZoom] = useState(null);

  useEffect(() => {
    if (!opening) return;
    const id = setTimeout(() => setPage("book"), OPEN_DELAY);
    return () => clearTimeout(id);
  }, [opening]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className={`app ${page === "book" ? "is-book" : ""}`}>
      {page === "envelope" && (
        <Envelope open={opening} onOpen={() => setOpening(true)} />
      )}

      {page === "book" && <Book onZoom={setZoom} />}

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
