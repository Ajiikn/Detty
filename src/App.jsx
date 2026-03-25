import { useState, useRef, useEffect, useCallback } from "react";

import { CSS } from "./utils/css";
import { TRACKS } from "./data/tracks";

import Navbar from "./components/Navbar";
import MusicBar from "./components/MusicBar";
import EntryOverlay from "./components/EntryOverlay";
import HeroSection from "./components/HeroSection";
import ShopSection from "./components/ShopSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";

function fmtTime(s) {
  if (!s || !isFinite(s)) return "--:--";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? "0" : ""}${sec}`;
}

export default function App() {
  /* ── UI state ── */
  const [entered, setEntered] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  /* ── Audio state ── */
  const [playing, setPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);

  const audioRef = useRef(null);

  /* ── Direct DOM refs for progress bar and timestamp ── */
  const fillRef = useRef(null);
  const timeRef = useRef(null);

  /* ─────────────────────────────────────────
     Build the Audio element once on mount.
     All event listeners live here so they
     never go stale.
  ───────────────────────────────────────── */
  useEffect(() => {
    const a = new Audio();
    a.preload = "metadata";

    let lastUpdate = 0;

    a.addEventListener("timeupdate", () => {
      if (!a.duration) return;

      const now = performance.now();
      if (now - lastUpdate < 250) return; // throttle updates (~4/sec)
      lastUpdate = now;

      // Update DOM directly — zero re-renders, no blinking
      if (fillRef.current) {
        fillRef.current.style.width = `${(a.currentTime / a.duration) * 100}%`;
      }
      if (timeRef.current) {
        timeRef.current.textContent = `${fmtTime(a.currentTime)} / ${fmtTime(a.duration)}`;
      }
    });

    a.addEventListener("loadedmetadata", () => {
      if (timeRef.current) {
        timeRef.current.textContent = `--:-- / ${fmtTime(a.duration)}`;
      }
    });

    a.addEventListener("ended", () => {
      a.currentTime = 0;
      a.play().catch(() => {});
    });

    a.addEventListener("play", () => setPlaying(true));
    a.addEventListener("pause", () => setPlaying(false));

    audioRef.current = a;

    return () => {
      a.pause();
      a.src = "";
    };
  }, []);

  /* ─────────────────────────────────────────
     Load a track into the audio element.
     Pass autoplay=true to start immediately.
  ───────────────────────────────────────── */
  const loadTrack = useCallback((idx, autoplay = false) => {
    const a = audioRef.current;
    if (!a) return;
    a.src = TRACKS[idx].src;
    a.load();
    setTrackIdx(idx);
    // Reset DOM refs directly
    if (fillRef.current) fillRef.current.style.width = "0%";
    if (timeRef.current) timeRef.current.textContent = "--:-- / --:--";
    if (autoplay) a.play().catch(() => {});
  }, []);

  /* ── Entry: with sound ── */
  const handleEnterSound = useCallback(() => {
    setExiting(true);
    setSoundOn(true);
    setTimeout(() => setEntered(true), 600);
    loadTrack(0, true);
  }, [loadTrack]);

  /* ── Entry: silent ── */
  const handleEnterSilent = useCallback(() => {
    setExiting(true);
    setTimeout(() => setEntered(true), 600);
    loadTrack(0, false); // preload silently so it's ready when user enables
  }, [loadTrack]);

  /* ── Play / Pause toggle ── */
  const handleTogglePlay = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    playing ? a.pause() : a.play().catch(() => {});
  }, [playing]);

  /* ── Seek: called with a 0–1 ratio from MusicBar ── */
  const handleSeek = useCallback((ratio) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    a.currentTime = ratio * a.duration;
  }, []);

  /* ── Turn off music bar ── */
  const handleMute = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
    setSoundOn(false);
  }, []);

  /* ── Re-enable sound from the FAB ── */
  const handleEnableSound = useCallback(() => {
    setSoundOn(true);
    audioRef.current?.play().catch(() => {});
  }, []);

  /* ─────────────────────────────────────────
     Fix hero glitch on scroll-to-top.
     Mobile browsers resize the viewport when
     the address bar shows/hides, causing dvh
     to recalculate and repaint the hero.
     We measure the real height once on mount
     and lock it into a CSS variable --vh so
     it never changes mid-session.
  ───────────────────────────────────────── */
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh", `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    // Only update on actual orientation change, not address bar resize
    window.addEventListener("orientationchange", setVh);
    return () => window.removeEventListener("orientationchange", setVh);
  }, []);

  /* ─────────────────────────────────────────
     Lock body scroll when mobile menu is open.
     - position:fixed handles iOS Safari
     - touchmove preventDefault handles Android
       (Chrome still fires touch events through
       position:fixed overlays)
  ───────────────────────────────────────── */
  useEffect(() => {
    const preventTouch = (e) => e.preventDefault();
    if (menuOpen) {
      const y = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${y}px`;
      document.body.style.width = "100%";
      // Block touchmove on the document for Android
      document.addEventListener("touchmove", preventTouch, { passive: false });
    } else {
      const y = parseInt(document.body.style.top || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, -y);
      document.removeEventListener("touchmove", preventTouch);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.removeEventListener("touchmove", preventTouch);
    };
  }, [menuOpen]);

  /* ── Scroll spy ── */
  useEffect(() => {
    const onScroll = () => {
      const ids = ["home", "shop", "about", "contact"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 80 && r.bottom > 80) {
          setActiveNav(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  return (
    <>
      {/* Global styles */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Entry overlay — hidden once entered */}
      {!entered && (
        <EntryOverlay
          onEnterSound={handleEnterSound}
          onEnterSilent={handleEnterSilent}
          exiting={exiting}
        />
      )}

      {/* Navbar */}
      {entered && (
        <Navbar
          active={activeNav}
          scrollTo={scrollTo}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      )}

      {/* Music bar — visible only when soundOn */}
      {entered && soundOn && (
        <MusicBar
          track={TRACKS[trackIdx]}
          playing={playing}
          fillRef={fillRef}
          timeRef={timeRef}
          onPlay={handleTogglePlay}
          onMute={handleMute}
          onSeek={handleSeek}
        />
      )}

      {/* FAB: shown when entered but sound is off */}
      {entered && !soundOn && (
        <button
          className="sfab"
          onClick={handleEnableSound}
          title="Enable Sound"
        >
          ♪
        </button>
      )}

      {/* Page */}
      {entered && (
        <main style={{ paddingBottom: soundOn ? "60px" : "0" }}>
          <HeroSection scrollTo={scrollTo} />
          <ShopSection />
          <AboutSection />
          <ContactSection />
        </main>
      )}
    </>
  );
}
