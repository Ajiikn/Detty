export default function ContactSection() {
  const socials = [
    ["Instagram", "https://www.instagram.com/dettynotdirty/"],
    ["TikTok", "https://www.tiktok.com/@dettynotdirty"],
    ["WhatsApp", "https://wa.me/2347082093989"],
  ];

  return (
    <section id="contact" className="sec contact">
      <div className="contact-wrap">
        <div className="sec-label">/// Connect</div>
        <h2 className="sec-title">LINK UP</h2>
        <p className="contact-p">
          For collabs, press, wholesale enquiries — or just to say what's up. We
          move in the underground but we're always reachable.
        </p>
        <div className="socials">
          {socials.map(([name, href]) => (
            <a
              key={name}
              className="soc-a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {name}
            </a>
          ))}
        </div>
        <a className="contact-email" href="mailto:info@oriki.ng">
          info@dnd.ng
        </a>
        <div className="footer">
          <span>© 2025 DETTYNOTDIRTY</span>
          <span>ALL RIGHTS RESERVED</span>
          <span>MADE IN PORT HARCOURT 🇳🇬</span>
          <span>
            EMAIL THE AUTHOR? <a className="sec-label" href="mailto:godswillajii2025@gmail.com">AJII ASHITEBE GODSWILL</a>
          </span>
        </div>
      </div>
    </section>
  );
}
