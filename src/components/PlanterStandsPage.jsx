import { Link } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import './TraysPage.css';

const planterStandProducts = products.filter(
  (product) => product.category === 'cane-metal' && product.subCategory === 'planter-stands'
);

export default function PlanterStandsPage() {
  return (
    <div className="trays-page">
      <section className="trays-hero">
        <div className="trays-hero-copy">
          <Link to="/catalogue" className="trays-back-link">
            <ArrowLeft aria-hidden="true" size={16} />
            Back to catalogue
          </Link>
          <p className="trays-eyebrow">ARR GROUPS · CANE &amp; METAL</p>
          <h1>Iron planter<br /><em>stands.</em></h1>
          <p className="trays-intro">
            Give your greenery a place to shine. Explore our iron planter-stand designs
            and get in touch to enquire about a piece.
          </p>
          <a href="#planter-stand-collection" className="trays-primary-link">
            Explore the collection
            <ArrowDown aria-hidden="true" size={16} />
          </a>
        </div>
        {planterStandProducts[0] && (
          <div className="trays-hero-image-wrap">
            <img
              className="trays-hero-image"
              src={planterStandProducts[0].image}
              alt={`${planterStandProducts[0].name} ${planterStandProducts[0].sourceCode}`}
            />
            <span className="trays-hero-image-caption">
              A closer look <span>{planterStandProducts[0].sourceCode}</span>
            </span>
          </div>
        )}
        <span className="trays-hero-index" aria-hidden="true">01 / 01</span>
      </section>

      <section className="trays-collection" id="planter-stand-collection">
        <div className="trays-section-heading">
          <div>
            <p className="trays-eyebrow">THE COLLECTION</p>
            <h2>Find your favourite</h2>
          </div>
          <p>{planterStandProducts.length} designs <span>·</span> Cane &amp; Metal</p>
        </div>

        <div className="trays-grid">
          {planterStandProducts.map((product, index) => (
            <motion.article
              className="trays-card"
              key={product.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (index % 4) * 0.07 }}
            >
              <div className="trays-card-image-wrap">
                <Link
                  to={`/catalogue/iron-planter-stands/${product.id}`}
                  aria-label={`View iron planter stand ${product.sourceCode}`}
                >
                  <img
                    src={product.image}
                    alt={`${product.name} design ${product.sourceCode}`}
                    loading="lazy"
                  />
                </Link>
                <span className="trays-card-number">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="trays-card-info">
                <Link to={`/catalogue/iron-planter-stands/${product.id}`} className="trays-card-product-link">
                  <p>IRON PLANTER STAND</p>
                  <h3>{product.sourceCode}</h3>
                </Link>
                <Link
                  to={`/catalogue/iron-planter-stands/${product.id}`}
                  className="trays-card-link"
                  aria-label={`View iron planter stand ${product.sourceCode}`}
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
          <h2>Let’s talk planters.</h2>
        </div>
        <Link to="/contact" className="trays-contact-link">
          Enquire with us
          <ArrowRight aria-hidden="true" size={17} />
        </Link>
      </section>
    </div>
  );
}
