import { motion } from 'framer-motion';
import './Testimonials.css';

const reviews = [
  {
    name: "Eleanor Richards",
    role: "Interior Designer",
    text: "The craftsmanship is unparalleled. I've sourced pieces for luxury hotels, and nothing compares to the detailed carving and rich finishes of Artisanal's collection."
  },
  {
    name: "James Cavendish",
    role: "Private Collector",
    text: "Adding their Teakwood Lounge Chair completely transformed my study. It commands the room while offering exceptional comfort. A true masterpiece."
  }
];

export default function Testimonials() {
  return (
    <section className="testi-section">
      <div className="testi-bg-pattern"></div>
      
      <div className="testi-container">
        <div className="testi-layout">
          <div className="testi-header-col">
            <h2 className="testi-title">Words of Praise</h2>
            <p className="testi-subtitle">
              Hear from our esteemed clientele and renowned designers who have brought our heritage pieces into their spaces.
            </p>
            <button className="testi-link">
              Read All Stories
            </button>
          </div>
          
          <div className="testi-grid">
            {reviews.map((rev, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                className="testi-card"
              >
                <div className="testi-quote-mark">"</div>
                <p className="testi-text">
                  {rev.text}
                </p>
                <div>
                  <p className="testi-author-name">{rev.name}</p>
                  <p className="testi-author-role">{rev.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
