import { Link } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import './TraysPage.css';

const trayProducts = products.filter(
  (product) => product.category === 'kitchenware' && product.subCategory === 'trays'
);

export default function TraysPage() {
  return (
    <div className="trays-page">
      <section className="trays-hero">
        <div className="trays-hero-copy">
          <Link to="/catalogue" className="trays-back-link">
            <ArrowLeft aria-hidden="true" size={16} />
            Back to catalogue
          </Link>
          <p className="trays-eyebrow">ARR GROUPS · KITCHENWARE</p>
          <h1>Trays for<br /><em>everyday living.</em></h1>
          <p className="trays-intro">
            Explore our tray collection, thoughtfully selected for serving and styling your home.
            Find a design you love and get in touch to enquire.
          </p>
          <a href="#tray-collection" className="trays-primary-link">
            Explore the collection
            <ArrowDown aria-hidden="true" size={16} />
          </a>
        </div>
        {trayProducts[0] && (
          <div className="trays-hero-image-wrap">
            <img
              className="trays-hero-image"
              src={trayProducts[0].image}
              alt="Featured tray design"
            />
            <span className="trays-hero-image-caption">
              A closer look <span>{trayProducts[0].sourceCode}</span>
            </span>
          </div>
        )}
        <span className="trays-hero-index" aria-hidden="true">01 / 01</span>
      </section>

      <section className="trays-collection" id="tray-collection">
        <div className="trays-section-heading">
          <div>
            <p className="trays-eyebrow">THE COLLECTION</p>
            <h2>Find your favourite</h2>
          </div>
          <p>{trayProducts.length} designs <span>·</span> Kitchenware</p>
        </div>

        <div className="trays-grid">
          {trayProducts.map((product, index) => (
            <motion.article
              className="trays-card"
              key={product.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (index % 4) * 0.07 }}
            >
              <div className="trays-card-image-wrap">
                <img
                  src={product.image}
                  alt={`${product.name} design ${product.sourceCode}`}
                  loading="lazy"
                />
                <span className="trays-card-number">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="trays-card-info">
                <div>
                  <p>TRAY DESIGN</p>
                  <h3>{product.sourceCode}</h3>
                </div>
                <Link
                  to="/contact"
                  className="trays-card-link"
                  aria-label={`Enquire about tray ${product.sourceCode}`}
                >
                  <ArrowUpRight aria-hidden="true" size={19} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="trays-contact">
        <div>
          <p className="trays-eyebrow">HAVE A DESIGN IN MIND?</p>
          <h2>Let’s talk trays.</h2>
        </div>
        <Link to="/contact" className="trays-contact-link">
          Enquire with us
          <ArrowRight aria-hidden="true" size={17} />
        </Link>
      </section>
    </div>
  );
}
