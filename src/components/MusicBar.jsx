function fmtTime(s) {
  if (!s || !isFinite(s)) return "--:--";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? "0" : ""}${sec}`;
}

function MusicBar({
  track,
  playing,
  progress,
  curTime,
  duration,
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

      {/* Clickable progress bar  */}
      <div className="mbar-prog" onClick={handleProgressClick}>
        <div className="mbar-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Timestamp */}
      <div className="mbar-time">
        {fmtTime(curTime)} / {fmtTime(duration)}
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

export default React.memo(MusicBar);
