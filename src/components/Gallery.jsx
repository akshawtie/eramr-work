import { motion } from 'framer-motion';
import './Gallery.css';

const items = [
  {
    title: "Jaipur Lattice Cabinet",
    price: "$1,200",
    img: "https://images.unsplash.com/photo-1595514535313-df8d9f456c2d?q=80&w=2670&auto=format&fit=crop"
  },
  {
    title: "Teakwood Lounge Chair",
    price: "$850",
    img: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=2669&auto=format&fit=crop"
  },
  {
    title: "Brass Petal Chandelier",
    price: "$450",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2669&auto=format&fit=crop"
  }
];

export default function Gallery() {
  return (
    <section className="gallery-section">
      <div className="gallery-container">
        <div className="gallery-header">
          <h2 className="gallery-title">Curated Pieces</h2>
          <button className="gallery-link">
            View All
          </button>
        </div>
        <div className="gallery-grid">
          {items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="gallery-card"
            >
              <div className="gallery-image-wrapper">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="gallery-image"
                />
              </div>
              <h3 className="gallery-card-title">{item.title}</h3>
              <p className="gallery-card-price">{item.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
