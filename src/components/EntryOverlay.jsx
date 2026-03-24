export default function EntryOverlay({ onEnterSound, onEnterSilent, exiting }) {
  return (
    <div className={`entry${exiting ? " exit" : ""}`}>
      <div className="entry-inner">
        <div className="entry-logo">
          DETTY<em>NOTDIRTY</em>
        </div>
        <div className="entry-tag">
          Underground Port Harcourt &middot; Afro-Streetwear
        </div>
        <button className="entry-sound" onClick={onEnterSound}>
          ♪&nbsp;&nbsp;Enter with Sound
        </button>
        <button className="entry-silent" onClick={onEnterSilent}>
          Enter silent
        </button>
      </div>
    </div>
  );
}
