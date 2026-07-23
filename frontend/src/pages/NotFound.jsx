import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiSearch, FiArrowRight } from 'react-icons/fi';
import Button from '../components/common/Button';
import { fadeIn } from '../animations/variants';

/**
 * NotFound Page Component
 * Apple / Linear inspired 404 page featuring graphic numbers, quick search input, and return CTA.
 */
const NotFound = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center text-center py-16 md:py-24 max-w-xl mx-auto"
    >
      {/* Gradient 404 Display */}
      <span className="text-8xl md:text-9xl font-black bg-gradient-to-r from-primary-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent tracking-tighter select-none">
        404
      </span>

      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mt-2 mb-3">
        Page Not Found
      </h1>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      {/* Quick Search */}
      <form onSubmit={handleSearch} className="w-full max-w-sm flex items-center gap-2 mb-8">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products instead..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <Button type="submit" size="sm">
          Search
        </Button>
      </form>

      {/* Return to Home CTA */}
      <div className="flex items-center gap-4">
        <Button
          onClick={() => navigate('/')}
          leftIcon={<FiHome className="w-4 h-4" />}
        >
          Return to Homepage
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate('/shop')}
          rightIcon={<FiArrowRight className="w-4 h-4" />}
        >
          Explore Catalog
        </Button>
      </div>
    </motion.div>
  );
};

export default NotFound;

