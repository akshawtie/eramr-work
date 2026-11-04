import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  ChevronLeft, 
  ChevronRight,
  Check,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES, SUB_CATEGORIES, products } from '../data/products';
import './Catalogue.css';

const ITEMS_PER_PAGE = 24;

export default function Catalogue() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const sectionRef = useRef(null);

  // Get available sub-categories for current category
  const availableSubCategories = useMemo(() => {
    if (selectedCategory === 'all') return [];
    return SUB_CATEGORIES[selectedCategory] || [];
  }, [selectedCategory]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Compute sub-category counts
  const subCategoryCounts = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      const key = `${p.category}:${p.subCategory}`;
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSubCategory = selectedSubCategory === 'all' || item.subCategory === selectedSubCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = 
        !q || 
        item.name.toLowerCase().includes(q) || 
        item.categoryLabel.toLowerCase().includes(q) ||
        item.subCategoryLabel.toLowerCase().includes(q) ||
        (item.sourceCode && item.sourceCode.toLowerCase().includes(q));

      return matchesCategory && matchesSubCategory && matchesSearch;
    });
  }, [selectedCategory, selectedSubCategory, searchQuery]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSubCategory, searchQuery]);

  // Reset sub-category when category changes
  useEffect(() => {
    setSelectedSubCategory('all');
  }, [selectedCategory]);

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
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Generate visible page numbers
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 7;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (validCurrentPage > 3) pages.push('...');
      const start = Math.max(2, validCurrentPage - 1);
      const end = Math.min(totalPages - 1, validCurrentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (validCurrentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <section id="catalogue" ref={sectionRef} className="catalogue-section">
      <div className="catalogue-container">
        
        {/* ================= CATALOGUE HEADER ================= */}
        <div className="catalogue-header">
          <h2 className="catalogue-title">Product Catalogue</h2>
          <p className="catalogue-subtitle">
            Explore our complete collection of {products.length} handcrafted artisanal products.
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

        {/* ================= SUB-CATEGORY CHIPS ================= */}
        {availableSubCategories.length > 0 && (
          <div className="catalogue-subcategory-nav">
            <button
              onClick={() => setSelectedSubCategory('all')}
              className={`subcategory-chip ${selectedSubCategory === 'all' ? 'active' : ''}`}
            >
              All
            </button>
            {availableSubCategories.map((sub) => {
              const count = subCategoryCounts[`${selectedCategory}:${sub.id}`] || 0;
              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubCategory(sub.id)}
                  className={`subcategory-chip ${selectedSubCategory === sub.id ? 'active' : ''}`}
                >
                  {sub.label}
                  <span className="subcategory-count">{count}</span>
                </button>
              );
            })}
            {selectedCategory === 'kitchenware' && (
              <Link to="/catalogue/trays" className="trays-collection-link">
                Explore the trays collection
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
            {selectedCategory === 'cane-metal' && (
              <Link to="/catalogue/iron-planter-stands" className="trays-collection-link">
                Explore iron planter stands
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        )}

        {/* ================= SEARCH & TOOLBAR ================= */}
        <div className="catalogue-toolbar">
          <div className="catalogue-search-wrapper">
            <Search className="catalogue-search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name, code, or category..."
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
            <div className="catalogue-count-info">
              {totalItems > 0 ? (
                <span>
                  Showing <strong>{startIndex + 1}–{endIndex}</strong> of <strong>{totalItems}</strong> products
                </span>
              ) : (
                <span>0 products found</span>
              )}
            </div>
          </div>
        </div>

        {/* ================= PRODUCT GRID ================= */}
        {currentProducts.length > 0 ? (
          <div className="catalogue-grid">
            {currentProducts.map((product, idx) => {
              return (
                <motion.article 
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: (idx % 12) * 0.04 }}
                  className="product-card group"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="product-image-container">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      loading="lazy"
                      className="product-image"
                    />
                    <div className="product-code-badge">
                      {product.sourceCode}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="product-details">
                    <div className="product-category-row">
                      <span className="product-sub-label">{product.subCategoryLabel}</span>
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
          <div className="catalogue-empty">
            <p className="catalogue-empty-title">No matching products found</p>
            <p className="catalogue-empty-subtitle">Try clearing your search or switching categories.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedSubCategory('all'); }}
              className="catalogue-reset-btn"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ================= PAGINATION SYSTEM ================= */}
        {totalItems > 0 && totalPages > 1 && (
          <nav className="pagination-wrapper" aria-label="Catalogue Pagination">
            <div className="pagination-summary">
              Showing <strong>{startIndex + 1}–{endIndex}</strong> of <strong>{totalItems}</strong> items 
              <span className="pagination-page-label"> (Page {validCurrentPage} of {totalPages})</span>
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
                {getVisiblePages().map((pageNum, i) => {
                  if (pageNum === '...') {
                    return <span key={`ellipsis-${i}`} className="pagination-ellipsis">…</span>;
                  }
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

      {/* ================= PRODUCT LIGHTBOX MODAL ================= */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="product-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              className="product-lightbox"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="lightbox-close-btn" 
                onClick={() => setSelectedProduct(null)}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="lightbox-image-wrapper">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="lightbox-image"
                />
              </div>
              <div className="lightbox-info">
                <span className="lightbox-code">{selectedProduct.sourceCode}</span>
                <h3 className="lightbox-name">{selectedProduct.name}</h3>
                <div className="lightbox-meta">
                  <span className="lightbox-category">{selectedProduct.categoryLabel}</span>
                  <span className="lightbox-separator">→</span>
                  <span className="lightbox-subcategory">{selectedProduct.subCategoryLabel}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
