import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div>
          <h2 className="footer-brand-title">Artisanal Decor</h2>
          <p className="footer-brand-desc">
            Bringing the rich heritage of Indian craftsmanship into the modern home with elegant, minimalist design.
          </p>
        </div>
        <div>
          <h3 className="footer-col-title">Shop</h3>
          <ul className="footer-list">
            <li><a href="#" className="footer-link">Furniture</a></li>
            <li><a href="#" className="footer-link">Lighting</a></li>
            <li><a href="#" className="footer-link">Decor</a></li>
            <li><a href="#" className="footer-link">Collections</a></li>
          </ul>
        </div>
        <div>
          <h3 className="footer-col-title">About</h3>
          <ul className="footer-list">
            <li><a href="#" className="footer-link">Our Story</a></li>
            <li><a href="#" className="footer-link">Artisans</a></li>
            <li><a href="#" className="footer-link">Sustainability</a></li>
            <li><a href="#" className="footer-link">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="footer-col-title">Newsletter</h3>
          <p className="footer-text">Subscribe to receive updates on new collections.</p>
          <div className="footer-form">
            <input 
              type="email" 
              placeholder="Email address" 
              className="footer-input"
            />
            <button aria-label="Subscribe" className="footer-submit">
              Join
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
