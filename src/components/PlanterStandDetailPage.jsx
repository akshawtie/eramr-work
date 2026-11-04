import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Leaf, PanelsTopLeft, Store } from 'lucide-react';
import { products } from '../data/products';
import './PlanterStandDetailPage.css';

const planterStandProducts = products.filter(
  (product) => product.category === 'cane-metal' && product.subCategory === 'planter-stands'
);

const applications = [
  {
    icon: Leaf,
    title: 'Plant display',
    description: 'Give a favourite potted plant a dedicated place in your room or sunlit corner.'
  },
  {
    icon: PanelsTopLeft,
    title: 'Room accents',
    description: 'Use greenery to bring a natural focal point to an entryway or living space.'
  },
  {
    icon: Store,
    title: 'Styled spaces',
    description: 'Add a touch of greenery to a reception, boutique, or hospitality setting.'
  }
];

export default function PlanterStandDetailPage() {
  const { productId } = useParams();
  const product = planterStandProducts.find((item) => item.id === productId);

  if (!product) {
    return (
      <section className="planter-detail-not-found">
        <p className="planter-detail-eyebrow">PRODUCT NOT FOUND</p>
        <h1>This design isn’t available.</h1>
        <Link to="/catalogue/iron-planter-stands" className="planter-detail-back">
          <ArrowLeft aria-hidden="true" size={16} />
          Browse iron planter stands
        </Link>
      </section>
    );
  }

  const similarProducts = planterStandProducts.filter((item) => item.id !== product.id);

  return (
    <div className="planter-detail-page">
      <div className="planter-detail-breadcrumb">
        <Link to="/catalogue/iron-planter-stands">
          <ArrowLeft aria-hidden="true" size={15} />
          Iron planter stands
        </Link>
        <span aria-hidden="true">/</span>
        <span>{product.sourceCode}</span>
      </div>

      <section className="planter-detail-main">
        <div className="planter-detail-image">
          <img src={product.image} alt={`${product.name}, design ${product.sourceCode}`} />
          <span>{product.sourceCode}</span>
        </div>
        <div className="planter-detail-summary">
          <p className="planter-detail-eyebrow">ARR GROUPS · CANE &amp; METAL</p>
          <h1>{product.name}</h1>
          <p className="planter-detail-code">DESIGN CODE <strong>{product.sourceCode}</strong></p>
          <p className="planter-detail-description">
            A decorative iron stand designed to elevate and display a potted plant.
            Enquire with our team for product dimensions, finish details, and availability.
          </p>
          <Link to="/contact" className="planter-detail-cta">
            Enquire about this design
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
          <p className="planter-detail-note">
            Have the design code ready when you contact us: <strong>{product.sourceCode}</strong>
          </p>
        </div>
      </section>

      <section className="planter-detail-specs" aria-labelledby="planter-specs-title">
        <div className="planter-detail-section-heading">
          <p className="planter-detail-eyebrow">PRODUCT INFORMATION</p>
          <h2 id="planter-specs-title">Specifications</h2>
        </div>
        <dl className="planter-spec-list">
          <div><dt>Product</dt><dd>{product.name}</dd></div>
          <div><dt>Material</dt><dd>Iron, as identified in the product name</dd></div>
          <div><dt>Design code</dt><dd>{product.sourceCode}</dd></div>
          <div><dt>Dimensions &amp; finish</dt><dd>Contact us to confirm details for this design</dd></div>
          <div><dt>Availability</dt><dd>Contact us for current availability</dd></div>
        </dl>
      </section>

      <section className="planter-detail-applications" aria-labelledby="planter-applications-title">
        <div className="planter-detail-section-heading">
          <p className="planter-detail-eyebrow">IDEAS FOR YOUR SPACE</p>
          <h2 id="planter-applications-title">Suitable applications</h2>
          <p>Ideas for styling this planter stand in your home or commercial space.</p>
        </div>
        <div className="planter-application-grid">
          {applications.map(({ icon: Icon, title, description }) => (
            <article className="planter-application-card" key={title}>
              <Icon aria-hidden="true" size={23} strokeWidth={1.5} />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      {similarProducts.length > 0 && (
        <section className="planter-detail-similar" aria-labelledby="planter-similar-title">
          <div className="planter-detail-section-heading">
            <p className="planter-detail-eyebrow">MORE FROM THIS COLLECTION</p>
            <h2 id="planter-similar-title">Similar designs</h2>
          </div>
          <div className="planter-similar-grid">
            {similarProducts.map((similar) => (
              <Link
                to={`/catalogue/iron-planter-stands/${similar.id}`}
                className="planter-similar-card"
                key={similar.id}
              >
                <div className="planter-similar-image">
                  <img src={similar.image} alt={`${similar.name}, design ${similar.sourceCode}`} loading="lazy" />
                </div>
                <div className="planter-similar-info">
                  <div>
                    <p>IRON PLANTER STAND</p>
                    <h3>{similar.sourceCode}</h3>
                  </div>
                  <ArrowUpRight aria-hidden="true" size={19} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
