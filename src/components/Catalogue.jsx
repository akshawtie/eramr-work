import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Heart, 
  Eye, 
  ShoppingBag, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { CATEGORIES, products } from '../data/products';
import './Catalogue.css';

const ITEMS_PER_PAGE = 25;

export default function Catalogue() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const sectionRef = useRef(null);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    let list = products.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = 
        !q || 
        item.name.toLowerCase().includes(q) || 
        item.material.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  // Reset page when category or search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy]);

  // Pagination calculations
  const totalItems = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const validCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== validCurrentPage) {
      setCurrentPage(newPage);
      // Smooth scroll back to catalogue section top
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const triggerToast = (productName) => {
    setToastMessage(`"${productName}" added to your bag`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <section id="catalogue" ref={sectionRef} className="catalogue-section">
      <div className="catalogue-container">
        
        {/* ================= CATALOGUE HEADER ================= */}
        <div className="catalogue-header">
          <div className="catalogue-eyebrow">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Artisanal Archive</span>
          </div>
          <h2 className="catalogue-title">The Royal Catalogue</h2>
          <p className="catalogue-subtitle">
            Explore {products.length} mastercrafted heirloom furnishings and decor pieces, hand-selected across our regional artisan guilds.
          </p>
        </div>

        {/* ================= CATEGORY TABS ================= */}
        <div className="catalogue-category-nav" role="tablist" aria-label="Product Categories">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat.id)}
                className={`category-tab-btn ${isActive ? 'active' : 'inactive'}`}
              >
                <span>{cat.label}</span>
                <span className="category-badge-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* ================= SEARCH & TOOLBAR ================= */}
        <div className="catalogue-toolbar">
          <div className="catalogue-search-wrapper">
            <Search className="catalogue-search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by piece name, wood, brass, or material..."
              className="catalogue-search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="catalogue-clear-search"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="catalogue-toolbar-actions">
            <div className="catalogue-sort-wrapper">
              <SlidersHorizontal className="w-4 h-4" />
              <label htmlFor="catalogue-sort" className="sr-only">Sort By</label>
              <select
                id="catalogue-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="catalogue-sort-select"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div className="catalogue-count-info">
              {totalItems > 0 ? (
                <span>
                  Showing <strong>{startIndex + 1}–{endIndex}</strong> of <strong>{totalItems}</strong> pieces
                </span>
              ) : (
                <span>0 pieces found</span>
              )}
            </div>
          </div>
        </div>

        {/* ================= PRODUCT GRID (25 PER PAGE) ================= */}
        {currentProducts.length > 0 ? (
          <div className="catalogue-grid">
            {currentProducts.map((product, idx) => {
              const tagClass = (product.tag || '').toLowerCase().replace(/\s+/g, '-');
              const isFav = !!favorites[product.id];

              return (
                <motion.article 
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: (idx % 10) * 0.04 }}
                  className="product-card group"
                >
                  <div className="product-image-container">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      loading="lazy"
                      className="product-image"
                    />

                    {/* Tag Badge */}
                    {product.tag && (
                      <span className={`product-badge-tag ${tagClass}`}>
                        {product.tag}
                      </span>
                    )}

                    {/* Top Action Icons */}
                    <div className="product-action-buttons">
                      <button 
                        onClick={(e) => toggleFavorite(product.id, e)}
                        className={`product-icon-action ${isFav ? 'text-red-600' : ''}`}
                        aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="product-icon-action"
                        aria-label="Quick preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Hover Quick Add to Cart */}
                    <button 
                      onClick={() => triggerToast(product.name)}
                      className="product-quick-add"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="product-details">
                    <div className="product-category-row">
                      <span>{product.categoryLabel}</span>
                      <div className="product-rating">
                        <Star className="w-3.5 h-3.5 fill-current text-accent" />
                        <span>{product.rating}</span>
                        <span className="text-muted-foreground font-light text-[10px]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 
                      onClick={() => setSelectedProduct(product)}
                      className="product-name"
                      title={product.name}
                    >
                      {product.name}
                    </h3>

                    <p className="product-material">
                      {product.material}
                    </p>

                    <div className="product-price-row">
                      <div className="flex items-baseline">
                        <span className="product-price">${product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="product-original-price">
                            ${product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <span className="product-stock-pill">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                        In Stock
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-border mb-12">
            <p className="text-lg font-serif text-primary mb-2">No matching artisanal pieces found</p>
            <p className="text-sm text-muted-foreground mb-4">Try clearing your search or switching categories.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-5 py-2 bg-primary text-primary-foreground text-xs uppercase tracking-wider rounded-md"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ================= PAGINATION SYSTEM ================= */}
        {totalItems > 0 && (
          <nav className="pagination-wrapper" aria-label="Catalogue Pagination">
            <div className="pagination-summary">
              Showing <strong>{startIndex + 1}–{endIndex}</strong> of <strong>{totalItems}</strong> items 
              <span className="hidden sm:inline"> (Page {validCurrentPage} of {totalPages})</span>
            </div>

            <div className="pagination-controls">
              {/* Previous Page Button */}
              <button
                onClick={() => handlePageChange(validCurrentPage - 1)}
                disabled={validCurrentPage <= 1}
                className="pagination-btn"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {/* Page Numbers */}
              <div className="pagination-page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isActive = pageNum === validCurrentPage;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`pagination-number-btn ${isActive ? 'active' : 'inactive'}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Next Page Button */}
              <button
                onClick={() => handlePageChange(validCurrentPage + 1)}
                disabled={validCurrentPage >= totalPages}
                className="pagination-btn"
                aria-label="Next Page"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        )}

      </div>

      {/* ================= QUICK VIEW MODAL ================= */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="modal-content"
            >
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="modal-close-btn"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="modal-grid">
                <div className="modal-image-col">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="modal-image"
                  />
                </div>

                <div className="modal-info-col">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs uppercase tracking-wider text-accent font-semibold">
                        {selectedProduct.categoryLabel}
                      </span>
                      {selectedProduct.tag && (
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                          {selectedProduct.tag}
                        </span>
                      )}
                    </div>

                    <h3 className="modal-title">{selectedProduct.name}</h3>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center text-accent">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-foreground font-medium">{selectedProduct.rating}</span>
                      <span className="text-xs text-muted-foreground">({selectedProduct.reviewsCount} customer reviews)</span>
                    </div>

                    <p className="modal-description">{selectedProduct.description}</p>

                    <div className="modal-spec-grid">
                      <div>
                        <span className="modal-spec-label">Material & Craft</span>
                        <span className="modal-spec-value">{selectedProduct.material}</span>
                      </div>
                      <div>
                        <span className="modal-spec-label">Dimensions</span>
                        <span className="modal-spec-value">{selectedProduct.dimensions || 'Custom sizing available'}</span>
                      </div>
                      <div>
                        <span className="modal-spec-label">Delivery</span>
                        <span className="modal-spec-value">White-Glove In-Room</span>
                      </div>
                      <div>
                        <span className="modal-spec-label">Warranty</span>
                        <span className="modal-spec-value">10-Year Artisan Guarantee</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-2xl font-serif font-semibold text-primary">
                          ${selectedProduct.price.toLocaleString()}
                        </span>
                        {selectedProduct.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            ${selectedProduct.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Available for immediate dispatch
                      </span>
                    </div>

                    <button 
                      onClick={() => {
                        triggerToast(selectedProduct.name);
                        setSelectedProduct(null);
                      }}
                      className="modal-add-btn"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Shopping Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= TOAST NOTIFICATION ================= */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="catalogue-toast"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
