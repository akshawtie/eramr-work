import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Building2,
  CookingPot,
  DoorOpen,
  Home,
  ImageOff,
  Store,
  Utensils
} from 'lucide-react';
import { products } from '../data/products';
import { getListedMaterials, PRODUCT_PAGE_CONTENT, PRODUCT_RELATIONSHIPS } from '../data/productDetails';
import './ProductDetailPage.css';

const ROOM_ICONS = {
  kitchen: CookingPot,
  dining: Utensils,
  living: Home,
  bedroom: BedDouble,
  entry: DoorOpen,
  pantry: Store,
  office: Building2
};

function ProductImage({ src, alt, className = '', loading = 'lazy', onLoad }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`product-detail-image-fallback ${className}`} role="img" aria-label={`${alt} image unavailable`}>
        <ImageOff aria-hidden="true" size={28} />
        <span>Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={loading}
      onLoad={onLoad}
      onError={() => {
        setFailed(true);
        onLoad?.();
      }}
    />
  );
}

function ProductCard({ product, label }) {
  return (
    <Link to={`/catalogue/product/${product.id}`} className="product-detail-related-card">
      <div className="product-detail-related-image">
        <ProductImage src={product.image} alt={`${product.name}, ${product.sourceCode}`} />
        <span>{product.sourceCode}</span>
      </div>
      <div className="product-detail-related-info">
        <div>
          <p>{label || product.subCategoryLabel}</p>
          <h3>{product.name}</h3>
        </div>
        <ArrowUpRight aria-hidden="true" size={18} />
      </div>
    </Link>
  );
}

function ProductDetailContent({ productId }) {
  const product = products.find((item) => item.id === productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  if (!product) {
    return (
      <section className="product-detail-not-found">
        <p className="product-detail-eyebrow">PRODUCT NOT FOUND</p>
        <h1>This design isn’t available.</h1>
        <Link to="/catalogue" className="product-detail-back">
          <ArrowLeft aria-hidden="true" size={16} />
          Back to catalogue
        </Link>
      </section>
    );
  }

  const content = PRODUCT_PAGE_CONTENT[product.subCategory] || {
    description: 'Product details are not available in the catalogue. Contact us for confirmed information.',
    features: [],
    applications: [],
    complementarySubCategories: [],
    complementaryReason: ''
  };
  const images = [...new Set([...(product.images || []), product.image].filter(Boolean))];
  const materialList = getListedMaterials(product.name);
  const compatibleIds = PRODUCT_RELATIONSHIPS.compatibleProductIds[product.id] || [];
  const compatibleProducts = compatibleIds
    .map((id) => products.find((item) => item.id === id))
    .filter((item) => item && item.id !== product.id);
  const complementarySubCategories = PRODUCT_RELATIONSHIPS.complementarySubCategoriesByProductId[product.id]
    || content.complementarySubCategories;
  const complementaryProducts = complementarySubCategories
    .flatMap((subCategory) => products
      .filter((item) => item.subCategory === subCategory && item.id !== product.id)
      .slice(0, 2))
    .slice(0, 4);

  const handleImageChange = (index) => {
    setImageLoading(true);
    setSelectedImage(index);
  };

  return (
    <div className="product-detail-page">
      <nav className="product-detail-breadcrumb" aria-label="Breadcrumb">
        <Link to="/catalogue">
          <ArrowLeft aria-hidden="true" size={15} />
          Catalogue
        </Link>
        <span aria-hidden="true">/</span>
        <span>{product.categoryLabel}</span>
        <span aria-hidden="true">/</span>
        <span>{product.sourceCode}</span>
      </nav>

      <section className="product-detail-main">
        <div className="product-detail-gallery">
          <div className={`product-detail-image-wrap${imageLoading ? ' is-loading' : ''}`}>
            {imageLoading && images[selectedImage] && (
              <div className="product-detail-image-loading" aria-label="Loading product image" />
            )}
            <ProductImage
              key={images[selectedImage]}
              src={images[selectedImage]}
              alt={`${product.name}, design ${product.sourceCode}`}
              className="product-detail-image"
              loading="eager"
              onLoad={() => setImageLoading(false)}
            />
            <span className="product-detail-code">{product.sourceCode}</span>
          </div>
          {images.length > 1 && (
            <div className="product-detail-thumbnails" aria-label="Product image gallery">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  className={index === selectedImage ? 'active' : ''}
                  onClick={() => handleImageChange(index)}
                  aria-label={`View product image ${index + 1}`}
                  aria-pressed={index === selectedImage}
                >
                  <ProductImage src={image} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-detail-summary">
          <p className="product-detail-eyebrow">{product.categoryLabel} · {product.subCategoryLabel}</p>
          <h1>{product.name}</h1>
          <p className="product-detail-design-code">DESIGN CODE <strong>{product.sourceCode}</strong></p>
          <p className="product-detail-description">{content.description}</p>
          {content.features.length > 0 && (
            <ul className="product-detail-features">
              {content.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          )}
          <Link to="/contact" className="product-detail-cta">
            Enquire about this design
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
          <p className="product-detail-note">
            Please mention design code <strong>{product.sourceCode}</strong> when enquiring.
          </p>
        </div>
      </section>

      <section className="product-detail-specs" aria-labelledby="product-specs-title">
        <div className="product-detail-section-heading">
          <p className="product-detail-eyebrow">PRODUCT INFORMATION</p>
          <h2 id="product-specs-title">Specifications</h2>
        </div>
        <dl className="product-detail-spec-list">
          <div><dt>Product</dt><dd>{product.name}</dd></div>
          <div><dt>Category</dt><dd>{product.categoryLabel} · {product.subCategoryLabel}</dd></div>
          <div><dt>Design code</dt><dd>{product.sourceCode}</dd></div>
          <div><dt>Material</dt><dd>{materialList.length > 0 ? materialList.join(', ') : 'Not specified in the catalogue'}</dd></div>
          <div><dt>Dimensions &amp; finish</dt><dd>Not listed; please contact us to confirm details.</dd></div>
          <div><dt>Variants &amp; availability</dt><dd>Not listed; please contact us for current options and availability.</dd></div>
        </dl>
      </section>

      <section className="product-detail-applications" aria-labelledby="product-applications-title">
        <div className="product-detail-section-heading">
          <p className="product-detail-eyebrow">IDEAS FOR YOUR SPACE</p>
          <h2 id="product-applications-title">Suitable Rooms &amp; Applications</h2>
          <p>Suggested spaces based on the product’s catalogue category and listed purpose.</p>
        </div>
        {content.applications.length > 0 ? (
          <div className="product-detail-application-grid">
            {content.applications.map(({ title, reason, icon }) => {
              const Icon = ROOM_ICONS[icon] || Home;
              return (
                <article className="product-detail-application-card" key={title}>
                  <Icon aria-hidden="true" size={23} strokeWidth={1.5} />
                  <h3>{title}</h3>
                  <p>{reason}</p>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="product-detail-empty">Room and application details are not available for this product.</p>
        )}
      </section>

      <section className="product-detail-related" aria-labelledby="compatible-title">
        <div className="product-detail-section-heading">
          <p className="product-detail-eyebrow">PRODUCT RELATIONSHIPS</p>
          <h2 id="compatible-title">Compatible Products</h2>
          <p>Only products with verified technical compatibility are listed here.</p>
        </div>
        {compatibleProducts.length > 0 ? (
          <div className="product-detail-related-grid">
            {compatibleProducts.map((related) => <ProductCard key={related.id} product={related} label="Verified compatible" />)}
          </div>
        ) : (
          <p className="product-detail-empty">No verified compatible products are listed for this design.</p>
        )}
      </section>

      <section className="product-detail-related product-detail-related-complementary" aria-labelledby="complementary-title">
        <div className="product-detail-section-heading">
          <p className="product-detail-eyebrow">RELATED DESIGNS</p>
          <h2 id="complementary-title">Complementary Products</h2>
          {content.complementaryReason && <p>{content.complementaryReason}</p>}
        </div>
        {complementaryProducts.length > 0 ? (
          <div className="product-detail-related-grid">
            {complementaryProducts.map((related) => <ProductCard key={related.id} product={related} />)}
          </div>
        ) : (
          <p className="product-detail-empty">No curated complementary products are listed for this design.</p>
        )}
      </section>
    </div>
  );
}

export default function ProductDetailPage() {
  const { productId } = useParams();
  return <ProductDetailContent key={productId} productId={productId} />;
}
