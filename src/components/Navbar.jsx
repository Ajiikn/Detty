export default function Navbar({ active, scrollTo, menuOpen, setMenuOpen }) {
  const links = [
    { id: "home",    label: "Home"    },
    { id: "shop",    label: "Shop"    },
    { id: "about",   label: "About"   },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="nav">
        <button className="nav-brand" onClick={() => scrollTo("home")}>
          DETTY<em>NOTDIRTY</em>
        </button>

        <ul className="nav-links">
          {links.map(({ id, label }) => (
            <li key={id}>
              <button
                className={active === id ? "act" : ""}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile fullscreen nav */}
      <div className={`mob-nav${menuOpen ? " open" : ""}`}>
        {links.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => { scrollTo(id); setMenuOpen(false); }}
          >
            {label.toUpperCase()}
          </button>
        ))}
      </div>
    </>
  );
}
