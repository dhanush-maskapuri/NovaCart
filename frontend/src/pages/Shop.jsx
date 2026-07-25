import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX, FiSliders, FiChevronDown, FiGrid, FiList, FiCheckCircle } from 'react-icons/fi';
import SearchBar from '../components/search/SearchBar';
import ProductFilter from '../components/product/ProductFilter';
import ProductGrid from '../components/product/ProductGrid';
import ProductCompareModal from '../components/product/ProductCompareModal';
import Button from '../components/common/Button';
import { products as initialProducts } from '../data/products';
import { categories } from '../data/categories';
import { fadeIn } from '../animations/variants';
import { formatCurrency } from '../utils/formatters';

/**
 * Shop Page Component - Redesigned for Indian Marketplace
 * Features Price Slider in ₹, Indian Brand Filters, Express Delivery filter,
 * Product Comparison Drawer, Grid/List views, and Search Synchronization.
 */
const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState([0, 150000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [expressOnly, setExpressOnly] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
    if (searchParam) setSearchQuery(searchParam);
  }, [categoryParam, searchParam]);

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

  const handleCompareToggle = (product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p._id === product._id);
      if (exists) return prev.filter((p) => p._id !== product._id);
      if (prev.length >= 3) {
        alert('You can compare up to 3 products at a time.');
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange([0, 150000]);
    setSelectedRating(0);
    setInStockOnly(false);
    setExpressOnly(false);
    setSelectedBrands([]);
    setSortBy('featured');
    setCurrentPage(1);
    searchParams.delete('category');
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        if (
          searchQuery &&
          !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.category.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.brand.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        if (
          selectedCategory !== 'all' &&
          product.category.toLowerCase() !== selectedCategory.toLowerCase() &&
          product.hub !== selectedCategory.toLowerCase()
        ) {
          return false;
        }

        if (product.price < priceRange[0] || product.price > priceRange[1]) {
          return false;
        }

        if (selectedRating > 0 && product.rating < selectedRating) {
          return false;
        }

        if (inStockOnly && !product.inStock) {
          return false;
        }

        if (expressOnly && !product.deliveryTime?.includes('10 Mins')) {
          return false;
        }

        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') return b.discount - a.discount;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0;
      });
  }, [
    searchQuery,
    selectedCategory,
    priceRange,
    selectedRating,
    inStockOnly,
    expressOnly,
    selectedBrands,
    sortBy,
  ]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-8">
      {/* Header & Search Bar */}
      <div className="flex flex-col gap-6">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            OFFICIAL INDIAN CATALOG
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Explore Marketplace Catalog
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
            expressOnly={expressOnly}
            onExpressChange={setExpressOnly}
            selectedBrands={selectedBrands}
            onBrandToggle={handleBrandToggle}
            onResetFilters={handleResetFilters}
          />
        </aside>

        {/* Main Content Area */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                <FiSliders className="w-4 h-4 text-indigo-600" />
                <span>Filters</span>
              </button>

              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                Showing <strong className="text-slate-900 dark:text-slate-100">{filteredProducts.length}</strong> products
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Compare Bar Trigger */}
              {compareList.length > 0 && (
                <button
                  onClick={() => setIsCompareOpen(true)}
                  className="px-3 py-1.5 rounded-2xl bg-indigo-600 text-white text-xs font-bold shadow-md animate-pulse flex items-center gap-1.5"
                >
                  <FiCheckCircle className="w-4 h-4" />
                  <span>Compare ({compareList.length})</span>
                </button>
              )}

              {/* Sorting Select */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort-select" className="text-xs font-bold text-slate-400 shrink-0">
                  Sort:
                </label>
                <div className="relative">
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-800 dark:text-slate-200 pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="featured">Featured Deals</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="discount">Highest Discount</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                  <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {(selectedCategory !== 'all' ||
            selectedBrands.length > 0 ||
            selectedRating > 0 ||
            inStockOnly ||
            expressOnly) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-bold">Active filters:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 font-bold">
                  Category: {selectedCategory}
                  <FiX className="w-3.5 h-3.5 cursor-pointer" onClick={() => handleCategoryChange('all')} />
                </span>
              )}
              {selectedBrands.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 font-bold"
                >
                  Brand: {b}
                  <FiX className="w-3.5 h-3.5 cursor-pointer" onClick={() => handleBrandToggle(b)} />
                </span>
              ))}
              {expressOnly && (
                <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 border border-amber-200 font-bold">
                  10-Min Express
                  <FiX className="w-3.5 h-3.5 cursor-pointer" onClick={() => setExpressOnly(false)} />
                </span>
              )}
            </div>
          )}

          {/* Product Grid Display */}
          <ProductGrid
            products={paginatedProducts}
            onCompareToggle={handleCompareToggle}
            compareList={compareList}
            emptyTitle="No matching products found in Indian catalog"
            emptyMessage="Try resetting filters or searching for terms like boAt, Apple, or Groceries."
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
                    className={`w-9 h-9 rounded-2xl text-xs font-black transition-colors ${
                      currentPage === pageNum
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
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

      {/* Compare Modal */}
      <ProductCompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        compareList={compareList}
        onRemove={(id) => setCompareList((prev) => prev.filter((p) => p._id !== id))}
      />

      {/* Mobile Drawer Filters */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white dark:bg-slate-900 z-50 lg:hidden p-6 overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-slate-600"
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
                expressOnly={expressOnly}
                onExpressChange={setExpressOnly}
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
