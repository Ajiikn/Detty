export default function MusicBar({
  track,
  playing,
  fillRef,
  timeRef,
  onPlay,
  onMute,
  onSeek,
}) {
  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    onSeek(ratio);
  };

  return (
    <div className="mbar">
      <div className={`mbar-dot${playing ? "" : " off"}`} />

      <div className="mbar-info">
        <div className="mbar-artist">{track.artist}</div>
        <div className="mbar-title">{track.title}</div>
      </div>

      {/* Progress bar updated via direct DOM ref — no re-renders */}
      <div className="mbar-prog" onClick={handleProgressClick}>
        <div className="mbar-fill" ref={fillRef} style={{ width: "0%" }} />
      </div>

      {/* Timestamp updated via direct DOM ref — no re-renders */}
      <div className="mbar-time" ref={timeRef}>
        --:-- / --:--
      </div>

      <button
        className="mbar-btn mbar-play"
        onClick={onPlay}
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? "❚❚" : "▶"}
      </button>

      <a
        className="sptfy"
        href={track.spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        SPOTIFY ↗
      </a>

      <button className="mbar-btn" onClick={onMute} aria-label="Turn off music">
        ✕
      </button>
    </div>
  );
}
