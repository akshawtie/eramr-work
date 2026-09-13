import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  ChevronLeft, 
  ChevronRight,
  Check
} from 'lucide-react';
import { CATEGORIES, products } from '../data/products';
import './Catalogue.css';

const ITEMS_PER_PAGE = 25;

const reducedProducts = [];
const tempCatCounts = {};
for (const p of products) {
  if (!tempCatCounts[p.category]) tempCatCounts[p.category] = 0;
  if (tempCatCounts[p.category] < 4) {
    reducedProducts.push(p);
    tempCatCounts[p.category]++;
  }
}

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
    const counts = { all: reducedProducts.length };
    reducedProducts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    let list = reducedProducts.filter((item) => {
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

    if (sortBy === 'rating') {
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
          <h2 className="catalogue-title">Catalogue</h2>
          <p className="catalogue-subtitle">
            Explore {reducedProducts.length} curated pieces designed for modern spaces.
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
                  </div>

                  {/* Product Details */}
                  <div className="product-details">
                    <div className="product-category-row">
                      <span>{product.categoryLabel}</span>
                    </div>

                    <h3 className="product-name" title={product.name}>
                      {product.name}
                    </h3>
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
