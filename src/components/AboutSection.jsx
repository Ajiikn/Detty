export default function AboutSection() {
  return (
    <section id="about" className="sec">
      <div className="about-grid">
        <div className="about-img-wrap">
          <img
            className="about-img"
            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80"
            alt="DettyND artist"
            loading="lazy"
          />
          <div className="about-frame" />
        </div>
        <div>
          <div className="sec-label">/// The Story</div>
          <h2 className="sec-title">
            BORN FROM
            <br />
            THE STREETS
          </h2>
          <p className="about-p">
            <strong>DettyNOTDirty</strong> is more than a name — it's a praise
            poem, a declaration. Born in the underground of Port Harcourt, this
            brand fuses the raw energy of Afro-fusion music with streetwear that
            speaks before you do.
          </p>
          <p className="about-p">
            Every piece is a limited statement. No repeats. No compromises.
            <strong> Wear the culture. Be the movement.</strong>
          </p>
          <div className="stats">
            <div>
              <div className="stat-n">04</div>
              <div className="stat-l">Drops</div>
            </div>
            <div>
              <div className="stat-n">∞</div>
              <div className="stat-l">Identity</div>
            </div>
            <div>
              <div className="stat-n">1</div>
              <div className="stat-l">Movement</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
