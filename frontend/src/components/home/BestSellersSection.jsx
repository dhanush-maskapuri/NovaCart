import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiTrendingUp } from 'react-icons/fi';
import ProductCard from '../product/ProductCard';
import { products } from '../../data/products';

/**
 * BestSellersSection Component
 * Horizontal scrolling showcase section for top-performing best seller products.
 */
const BestSellersSection = () => {
  const scrollRef = useRef(null);

  const bestSellerProducts = products.filter((p) => p.isBestSeller || p.rating >= 4.7);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-16 relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-500">
            <FiTrendingUp className="w-4 h-4" />
            <span>Customer Favorites</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mt-1">
            Best Sellers
          </h2>
        </div>

        {/* Scroll Control Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
            className="p-2.5 rounded-full border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-xs"
          >
            <FiChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
            className="p-2.5 rounded-full border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-xs"
          >
            <FiChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-none pb-4 pt-1 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {bestSellerProducts.map((product) => (
          <div key={product._id} className="min-w-[280px] sm:min-w-[320px] max-w-[320px] snap-start shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellersSection;
