import { motion } from 'framer-motion';
import { Leaf, Hand, Compass } from 'lucide-react';
import './Features.css';

const features = [
  {
    icon: Hand,
    title: "Master Craftsmanship",
    desc: "Carved by generational artisans using techniques passed down through centuries."
  },
  {
    icon: Leaf,
    title: "Sustainable Materials",
    desc: "Ethically sourced local wood and natural fibers that honor the earth."
  },
  {
    icon: Compass,
    title: "Contemporary Vision",
    desc: "Traditional motifs re-imagined for the modern, minimalist home."
  }
];

export default function Features() {
  return (
    <section className="feat-section">
      <div className="feat-container">
        <div className="feat-header">
          <h2 className="feat-title">The Art of Creation</h2>
          <p className="feat-subtitle">Every piece in our collection is a testament to the dedication of human hands.</p>
        </div>
        <div className="feat-grid">
          {features.map((feat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="feat-card"
            >
              <div className="feat-icon-wrapper">
                <feat.icon strokeWidth={1.5} className="feat-icon" />
              </div>
              <h3 className="feat-card-title">{feat.title}</h3>
              <p className="feat-card-desc">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
