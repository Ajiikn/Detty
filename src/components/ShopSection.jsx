import { PRODUCTS } from "../data/products";

export default function ShopSection() {
  return (
    <section id="shop" className="sec shop">
      <div className="shop-wrap">
        <div className="sec-label">/// Collection 01</div>
        <h2 className="sec-title">11:10</h2>
        <div className="shop-grid">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="pcard">
              <img src={p.img} alt={p.name} loading="lazy" />
              <div className="pcard-overlay">
                <div
                  className={`pcard-tag${p.tag === "SOLD OUT" ? " sold" : ""}`}
                >
                  {p.tag}
                </div>
                <div className="pcard-name">{p.name}</div>
                <div className="pcard-meta">
                  <span className="pcard-price">{p.price}</span>
                  <span className="pcard-cat">{p.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
