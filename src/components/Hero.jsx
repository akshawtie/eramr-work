import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import './Hero.css';

const images = [
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=2787&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=2874&auto=format&fit=crop"
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-grid">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hero-content"
          >
            <div className="hero-trust-badge">
              <div className="hero-stars">
                {[...Array(5)].map((_, i) => <Star key={i} className="hero-star-icon" />)}
              </div>
              <span className="hero-trust-text">Trusted by 10,000+ Clients</span>
            </div>
            
            <h1 className="hero-title">
              The Royal <br/>
              <span className="hero-title-accent">Standard</span><br/>
              of Living.
            </h1>
            <p className="hero-description">
              Elevate your space with our premium collection of artisanal furniture. 
              Where timeless Indian heritage meets uncompromising modern luxury.
            </p>
            
            <div className="hero-actions">
              <button className="hero-btn-primary">
                Shop Collection
              </button>
              <button className="hero-btn-secondary">
                View Lookbook
              </button>
            </div>
            
            <div className="hero-stats-grid">
              <div className="hero-stat-item">
                <p className="hero-stat-value">15+</p>
                <p className="hero-stat-label">Years Heritage</p>
              </div>
              <div className="hero-stat-item">
                <p className="hero-stat-value">500</p>
                <p className="hero-stat-label">Master Artisans</p>
              </div>
              <div className="hero-stat-item">
                <p className="hero-stat-value">100%</p>
                <p className="hero-stat-label">Sustainable</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hero-image-wrapper"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentIndex}
                src={images[currentIndex]}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                alt={`Premium decor image ${currentIndex + 1}`} 
                className="hero-image"
              />
            </AnimatePresence>
            <div className="hero-overlay-blend"></div>
            <div className="hero-overlay-gradient"></div>
            
            {/* Elegant Slider Indicators */}
            <div className="hero-indicators">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`hero-indicator-btn ${currentIndex === idx ? 'active' : 'inactive'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
