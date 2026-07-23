import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX, FiSliders, FiChevronDown } from 'react-icons/fi';
import SearchBar from '../components/search/SearchBar';
import ProductFilter from '../components/product/ProductFilter';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/common/Button';
import { products as initialProducts } from '../data/products';
import { categories } from '../data/categories';
import { fadeIn } from '../animations/variants';

/**
 * Shop Page Component
 * Complete shopping catalog interface featuring SearchBar, responsive ProductFilter, sorting options, pagination UI, and URL synchronization.
 */
const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
    setCurrentPage(1);
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange([0, 1000]);
    setSelectedRating(0);
    setInStockOnly(false);
    setSelectedBrands([]);
    setSortBy('featured');
    setCurrentPage(1);
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Search query filter
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.category.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (
        selectedCategory !== 'all' &&
        product.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Rating filter
      if (selectedRating > 0 && product.rating < selectedRating) {
        return false;
      }

      // Stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // default featured
    });
  }, [searchQuery, selectedCategory, priceRange, selectedRating, inStockOnly, selectedBrands, sortBy]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-8">
      {/* Page Header & Search Bar */}
      <div className="flex flex-col gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Catalog Collection
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            Explore All Products
          </h1>
        </div>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Main Grid & Filters Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 sticky top-24">
          <ProductFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            selectedRating={selectedRating}
            onRatingChange={setSelectedRating}
            inStockOnly={inStockOnly}
            onInStockChange={setInStockOnly}
            selectedBrands={selectedBrands}
            onBrandToggle={handleBrandToggle}
            onResetFilters={handleResetFilters}
          />
        </aside>

        {/* Main Content Area */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Controls Bar (Filter toggle button for mobile, count, sorting dropdown) */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-dark-card border border-gray-200/80 dark:border-dark-border rounded-2xl shadow-xs">
            <div className="flex items-center gap-3">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl bg-gray-100 dark:bg-dark-bg text-gray-800 dark:text-gray-200"
              >
                <FiSliders className="w-4 h-4 text-primary-600" />
                <span>Filters</span>
              </button>

              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Showing{' '}
                <strong className="text-gray-900 dark:text-gray-100">
                  {filteredProducts.length}
                </strong>{' '}
                products
              </span>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs font-medium text-gray-500 shrink-0">
                Sort by:
              </label>
              <div className="relative">
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-xs font-semibold text-gray-800 dark:text-gray-200 pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
                <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {(selectedCategory !== 'all' || selectedBrands.length > 0 || selectedRating > 0 || inStockOnly) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-400 font-medium">Active filters:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 font-semibold">
                  Category: {selectedCategory}
                  <FiX className="w-3.5 h-3.5 cursor-pointer" onClick={() => handleCategoryChange('all')} />
                </span>
              )}
              {selectedBrands.map((b) => (
                <span key={b} className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 font-semibold">
                  Brand: {b}
                  <FiX className="w-3.5 h-3.5 cursor-pointer" onClick={() => handleBrandToggle(b)} />
                </span>
              ))}
              {selectedRating > 0 && (
                <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 border border-amber-200 dark:border-amber-900 font-semibold">
                  {selectedRating}+ Stars
                  <FiX className="w-3.5 h-3.5 cursor-pointer" onClick={() => setSelectedRating(0)} />
                </span>
              )}
              {inStockOnly && (
                <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-900 font-semibold">
                  In Stock Only
                  <FiX className="w-3.5 h-3.5 cursor-pointer" onClick={() => setInStockOnly(false)} />
                </span>
              )}
            </div>
          )}

          {/* Product Grid Display */}
          <ProductGrid
            products={paginatedProducts}
            emptyTitle="No matching products found"
            emptyMessage="Try broadening your filter criteria or searching for another keyword."
          />

          {/* Pagination UI */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-8">
              <Button
                variant="secondary"
                size="sm"
                isDisabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              >
                Previous
              </Button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-colors ${
                      currentPage === pageNum
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <Button
                variant="secondary"
                size="sm"
                isDisabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white dark:bg-dark-card z-50 lg:hidden p-6 overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-dark-border">
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <ProductFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={(cat) => {
                  handleCategoryChange(cat);
                  setIsMobileFilterOpen(false);
                }}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                selectedRating={selectedRating}
                onRatingChange={setSelectedRating}
                inStockOnly={inStockOnly}
                onInStockChange={setInStockOnly}
                selectedBrands={selectedBrands}
                onBrandToggle={handleBrandToggle}
                onResetFilters={handleResetFilters}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Shop;

