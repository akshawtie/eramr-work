import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Hero.css';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1000&auto=format&fit=crop",
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? HERO_IMAGES.length - 1 : prev - 1));

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
              <span className="hero-trust-text">Trusted by Clients</span>
            </div>

            <h1 className="hero-title">
              The Standard <br />
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
              {/*<Link to="/catalogue" className="hero-btn-secondary">
                View Lookbook
              </Link>*/}
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
            className="hero-image-wrapper group"
          >
            <motion.img
              key={currentSlide}
              src={HERO_IMAGES[currentSlide]}
              alt={`Premium decor ${currentSlide + 1}`}
              className="hero-image"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {/* Slider Navigation */}
            <div className="hero-slider-nav">
              <button onClick={prevSlide} className="hero-slider-btn">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextSlide} className="hero-slider-btn">
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Slider Dots */}
            <div className="hero-slider-dots">
              {HERO_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`hero-slider-dot ${index === currentSlide ? 'active' : ''}`}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
