export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:      #060606;
  --surface: #0d0d0d;
  --border:  #1c1c1c;
  --text:    #e9ddd1;
  --dim:     #524b44;
  --acc:     #FF3300;
  --teal:    #00FFB2;
  --gold:    #FFD60A;
  --font-d:  'Bebas Neue', sans-serif;
  --font-b:  'Syne', sans-serif;
  --font-m:  'Space Mono', monospace;
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-b);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* ── Grain overlay ── */
body::after {
  content: '';
  position: fixed; inset: 0; z-index: 999; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
  opacity: 0.4;
}

/* ════ NAVBAR ════ */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 36px;
  background: rgba(6,6,6,0.88);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}
.nav-brand {
  font-family: var(--font-d); font-size: 26px; letter-spacing: 0.1em;
  color: var(--text); text-decoration: none; cursor: pointer;
  background: none; border: none;
}
.nav-brand em { color: var(--acc); font-style: normal; }
.nav-links { display: flex; gap: 36px; list-style: none; }
.nav-links button {
  font-family: var(--font-m); font-size: 10px; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--dim); background: none; border: none;
  cursor: pointer; transition: color 0.2s; padding: 2px 0;
}
.nav-links button:hover,
.nav-links button.act { color: var(--text); }
.nav-links button.act::after {
  content: ''; display: block; height: 1px; background: var(--acc); margin-top: 3px;
}
.hamburger {
  display: none; flex-direction: column; gap: 5px;
  cursor: pointer; padding: 4px; background: none; border: none;
}
.hamburger span { display: block; width: 22px; height: 1.5px; background: var(--text); transition: all 0.3s; }
.hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

.mob-nav {
  position: fixed; inset: 0; z-index: 99;
  background: var(--bg);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 28px;
  transform: translateX(100%);
  transition: transform 0.38s cubic-bezier(0.77,0,0.18,1);
}
.mob-nav.open { transform: translateX(0); }
.mob-nav button {
  font-family: var(--font-d); font-size: 52px; letter-spacing: 0.05em;
  color: var(--dim); background: none; border: none; cursor: pointer; transition: color 0.2s;
}
.mob-nav button:hover { color: var(--acc); }

/* ════ MUSIC BAR ════ */
.mbar {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 95;
  display: flex; align-items: center; gap: 14px;
  padding: 10px 24px;
  background: rgba(8,8,8,0.96);
  backdrop-filter: blur(16px);
  border-top: 1px solid var(--border);
}
.mbar-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--teal); flex-shrink: 0;
  animation: mdot 1.6s ease-in-out infinite;
}
.mbar-dot.off { animation: none; background: var(--dim); }
@keyframes mdot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.65)} }

.mbar-info { flex: 1; min-width: 0; }
.mbar-artist { font-family: var(--font-m); font-size: 8px; letter-spacing: 0.2em; color: var(--dim); }
.mbar-title {
  font-family: var(--font-d); font-size: 17px; letter-spacing: 0.04em;
  color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

.mbar-prog {
  flex: 1; max-width: 180px; height: 2px;
  background: var(--border); border-radius: 1px; overflow: hidden;
  cursor: pointer;
}
.mbar-fill { height: 100%; background: var(--teal); border-radius: 1px; transition: width 0.25s linear; }

/* ── Timestamp ── */
.mbar-time {
  font-family: var(--font-m); font-size: 8px; letter-spacing: 0.08em;
  color: var(--dim); white-space: nowrap; flex-shrink: 0;
  width: 80px;  text-align: right;
}

.mbar-btn {
  width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
  border: 1px solid var(--border); background: none; color: var(--text);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: 11px; transition: all 0.2s;
}
.mbar-btn:hover { border-color: var(--teal); color: var(--teal); }
.mbar-play { width: 38px; height: 38px; border-color: rgba(255,255,255,0.25); }
.mbar-play:hover { background: var(--acc); border-color: var(--acc); color: #fff; }

.sptfy {
  font-family: var(--font-m); font-size: 8px; letter-spacing: 0.12em;
  padding: 5px 11px; border: 1px solid #1DB954; border-radius: 20px;
  color: #1DB954; background: none; cursor: pointer;
  text-decoration: none; white-space: nowrap; transition: all 0.2s; flex-shrink: 0;
}
.sptfy:hover { background: #1DB954; color: #000; }

/* ════ ENTRY OVERLAY ════ */
.entry {
  position: fixed; inset: 0; z-index: 200;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg); text-align: center; padding: 20px;
}
.entry-inner { display: flex; flex-direction: column; align-items: center; }
.entry-logo {
  font-family: var(--font-d);
  font-size: clamp(72px, 18vw, 160px);
  line-height: 0.85; letter-spacing: 0.04em;
  margin-bottom: 10px;
}
.entry-logo em { color: var(--acc); font-style: normal; }
.entry-tag {
  font-family: var(--font-m); font-size: 10px; letter-spacing: 0.25em;
  color: var(--dim); margin-bottom: 64px; text-transform: uppercase;
}
.entry-sound {
  padding: 15px 44px; margin-bottom: 14px;
  border: 1px solid var(--acc); background: none; color: var(--acc);
  font-family: var(--font-m); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
  cursor: pointer; transition: all 0.25s;
}
.entry-sound:hover { background: var(--acc); color: #fff; }
.entry-silent {
  font-family: var(--font-m); font-size: 9px; letter-spacing: 0.12em;
  color: var(--dim); background: none; border: none; cursor: pointer;
  text-decoration: underline; text-underline-offset: 4px; transition: color 0.2s;
}
.entry-silent:hover { color: var(--text); }
.entry.exit { animation: exitAnim 0.6s ease forwards; }
@keyframes exitAnim { to { opacity: 0; pointer-events: none; } }

/* ════ HERO ════ */
.hero {
  min-height: 100dvh; padding: 100px 32px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; position: relative; overflow: hidden;
}
.hero-glow {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 60% 50% at 50% 20%, rgba(255,51,0,0.09) 0%, transparent 70%),
    radial-gradient(ellipse 50% 40% at 80% 85%, rgba(0,255,178,0.05) 0%, transparent 60%);
}
.hero-line {
  display: flex; align-items: center; gap: 14px;
  font-family: var(--font-m); font-size: 9px; letter-spacing: 0.28em;
  color: var(--acc); text-transform: uppercase; margin-bottom: 18px;
}
.hero-line::before, .hero-line::after {
  content: ''; display: block; width: 36px; height: 1px; background: var(--acc);
}
.hero-h1 {
  font-family: var(--font-d);
  font-size: clamp(80px, 18vw, 200px);
  line-height: 0.85; letter-spacing: 0.02em; margin-bottom: 6px;
}
.hero-h1 em { color: var(--acc); font-style: normal; }
.hero-h2 {
  font-family: var(--font-d);
  font-size: clamp(26px, 5.5vw, 68px);
  letter-spacing: 0.12em; color: var(--dim); margin-bottom: 36px;
}
.hero-p {
  font-size: 15px; line-height: 1.75; color: var(--dim);
  max-width: 420px; margin: 0 auto 48px;
}
.hero-cta {
  padding: 16px 52px; background: var(--acc); color: #fff; border: none;
  font-family: var(--font-m); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
  cursor: pointer; transition: all 0.25s;
}
.hero-cta:hover { background: var(--text); color: var(--bg); }
.hero-scroll {
  position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%);
  font-family: var(--font-m); font-size: 8px; letter-spacing: 0.22em; color: var(--dim);
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  animation: scrollBlink 2.5s ease-in-out infinite;
}
.hero-scroll::after { content: ''; width: 1px; height: 28px; background: var(--dim); }
@keyframes scrollBlink { 0%,100%{opacity:0.8} 50%{opacity:0.2} }

/* ════ SECTIONS ════ */
.sec { padding: 110px 36px; position: relative; }
.sec-label {
  font-family: var(--font-m); font-size: 9px; letter-spacing: 0.3em; color: var(--acc);
  text-transform: uppercase; margin-bottom: 14px;
}
.sec-title {
  font-family: var(--font-d);
  font-size: clamp(44px, 9vw, 100px); line-height: 0.87;
  margin-bottom: 52px;
}

/* ════ SHOP ════ */
.shop { background: var(--surface); }
.shop-wrap { max-width: 1140px; margin: 0 auto; }
.shop-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; }
.pcard { position: relative; overflow: hidden; aspect-ratio: 3/4; cursor: pointer; }
.pcard img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94);
}
.pcard:hover img { transform: scale(1.06); }
.pcard-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.15) 55%, transparent 100%);
  display: flex; flex-direction: column; justify-content: flex-end; padding: 18px;
}
.pcard-tag {
  position: absolute; top: 13px; left: 13px;
  font-family: var(--font-m); font-size: 7px; letter-spacing: 0.16em;
  padding: 4px 9px; background: var(--acc); color: #fff; text-transform: uppercase;
}
.pcard-tag.sold { background: var(--dim); }
.pcard-name { font-family: var(--font-d); font-size: 23px; letter-spacing: 0.04em; color: #fff; }
.pcard-meta { display: flex; justify-content: space-between; align-items: center; margin-top: 5px; }
.pcard-price { font-family: var(--font-m); font-size: 11px; color: var(--teal); }
.pcard-cat   { font-family: var(--font-m); font-size: 7px; letter-spacing: 0.14em; color: var(--dim); }

/* ════ ABOUT ════ */
.about-grid {
  max-width: 1140px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 90px; align-items: center;
}
.about-img-wrap { position: relative; }
.about-img { width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block; }
.about-frame {
  position: absolute; bottom: -18px; right: -18px;
  width: 55%; height: 55%; border: 1px solid var(--acc); z-index: -1; pointer-events: none;
}
.about-p { font-size: 15px; line-height: 1.85; color: var(--dim); margin-bottom: 28px; }
.about-p strong { color: var(--text); }
.stats { display: flex; gap: 44px; margin-top: 8px; }
.stat-n { font-family: var(--font-d); font-size: 54px; color: var(--acc); line-height: 1; }
.stat-l { font-family: var(--font-m); font-size: 8px; letter-spacing: 0.18em; color: var(--dim); margin-top: 2px; }

/* ════ CONTACT ════ */
.contact { background: var(--surface); }
.contact-wrap { max-width: 780px; margin: 0 auto; text-align: center; }
.contact-p { font-size: 15px; line-height: 1.75; color: var(--dim); margin-bottom: 52px; }
.socials { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 56px; }
.soc-a {
  font-family: var(--font-m); font-size: 9px; letter-spacing: 0.16em;
  padding: 10px 22px; border: 1px solid var(--border);
  color: var(--dim); text-decoration: none; transition: all 0.2s;
}
.soc-a:hover { border-color: var(--text); color: var(--text); }
.contact-email {
  font-family: var(--font-d); font-size: clamp(26px, 4vw, 42px);
  color: var(--dim); text-decoration: none; transition: color 0.2s;
  display: block; margin-bottom: 80px; letter-spacing: 0.04em;
}
.contact-email:hover { color: var(--acc); }
.footer {
  border-top: 1px solid var(--border); padding-top: 30px;
  display: flex; justify-content: space-between; align-items: center; gap: 12px;
}
.footer span { font-family: var(--font-m); font-size: 8px; letter-spacing: 0.12em; color: var(--dim); }

/* ── Sound FAB ── */
.sfab {
  position: fixed; bottom: 24px; right: 24px; z-index: 93;
  width: 48px; height: 48px; border-radius: 50%;
  border: 1px solid var(--border); background: var(--surface);
  color: var(--teal); font-size: 16px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.2s;
}
.sfab:hover { border-color: var(--teal); color: var(--teal); }

/* ════ RESPONSIVE ════ */
@media (max-width: 780px) {
  .nav-links { display: none; }
  .hamburger { display: flex; }
  .shop-grid { grid-template-columns: repeat(2, 1fr); }
  .about-grid { grid-template-columns: 1fr; gap: 44px; }
  .about-frame { display: none; }
  .mbar-prog, .mbar-time { display: none; }
  .mbar { padding: 10px 16px; gap: 10px; }
  .footer { flex-direction: column; text-align: center; }
  .sec { padding: 72px 22px; }
}
@media (max-width: 480px) {
  .shop-grid { grid-template-columns: 1fr; }
  .stats { gap: 28px; }
  .hero { padding: 90px 22px 80px; }
}
`;
