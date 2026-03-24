export default function HeroSection({ scrollTo }) {
  return (
    <section id="home" className="hero">
      <div className="hero-glow" />
      <div className="hero-line">Port Harcourt · Nigeria · Underground</div>
      <h1 className="hero-h1">
        DETTY<em>ND</em>
      </h1>
      <div className="hero-h2">Afro-Streetwear</div>
      <p className="hero-p">
        Born in the underground. Forged in PH nights.
        <br />
        Where music meets fabric. Where identity becomes art.
      </p>
      <button className="hero-cta" onClick={() => scrollTo("shop")}>
        Shop the Drops
      </button>
      <div className="hero-scroll">SCROLL</div>
    </section>
  );
}
