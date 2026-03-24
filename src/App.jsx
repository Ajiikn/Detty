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
  const [progress, setProgress] = useState(0);
  const [curTime, setCurTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

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

      setCurTime(a.currentTime);
      setProgress((a.currentTime / a.duration) * 100);
    });

    a.addEventListener("loadedmetadata", () => setDuration(a.duration));

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
    setProgress(0);
    setCurTime(0);
    setDuration(0);
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
          progress={progress}
          curTime={curTime}
          duration={duration}
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
