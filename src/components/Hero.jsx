import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hero.css';

const HERO_IMAGE = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2900&auto=format&fit=crop";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-grid">
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="hero-content"
          >
            <div className="hero-trust-badge">
              <span className="hero-trust-text">Trusted by 10,000+ Clients</span>
            </div>
            
            <h1 className="hero-title">
              The Standard <br/>
              of Living.
            </h1>
            <p className="hero-description">
              Elevate your space with our premium collection of artisanal furniture. 
              Where timeless heritage meets modern design.
            </p>
            
            <div className="hero-actions">
              <Link to="/catalogue" className="hero-btn-primary">
                Shop Collection
              </Link>
              <Link to="/catalogue" className="hero-btn-secondary">
                View Lookbook
              </Link>
            </div>
            
            <div className="hero-stats-grid">
              <div className="hero-stat-item">
                <p className="hero-stat-value">15+</p>
                <p className="hero-stat-label">Years Heritage</p>
              </div>
              <div className="hero-stat-item">
                <p className="hero-stat-value">500</p>
                <p className="hero-stat-label">Artisans</p>
              </div>
              <div className="hero-stat-item">
                <p className="hero-stat-value">100%</p>
                <p className="hero-stat-label">Sustainable</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hero-image-wrapper"
          >
            <img 
              src={HERO_IMAGE}
              alt="Premium decor" 
              className="hero-image"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
