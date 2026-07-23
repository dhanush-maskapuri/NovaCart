import { useState } from 'react';
import { FiSearch, FiX, FiTrendingUp, FiClock } from 'react-icons/fi';

/**
 * SearchBar Component
 * Elegant search interface with clear action, Recent Searches, and Popular Searches placeholders.
 */
const SearchBar = ({ onSearch, value = '', onChange, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const recentSearches = ['ANC Headphones', 'Smartwatch', 'Running Shoes'];
  const popularSearches = ['Wireless Audio', 'Mechanical Keyboards', 'Oversized Hoodie', 'Desk Lamps'];

  const handleChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (onChange) onChange(val);
    if (onSearch) onSearch(val);
  };

  const handleClear = () => {
    setSearchTerm('');
    if (onChange) onChange('');
    if (onSearch) onSearch('');
  };

  const handleSelectTag = (tag) => {
    setSearchTerm(tag);
    if (onChange) onChange(tag);
    if (onSearch) onSearch(tag);
    setIsFocused(false);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Search Input Box */}
      <div className="relative flex items-center w-full">
        <FiSearch className="absolute left-4 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search products, brands, or categories..."
          className="w-full pl-12 pr-10 py-3.5 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 shadow-sm transition-all"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-4 p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown Suggestions Panel */}
      {isFocused && !searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-2 p-5 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl shadow-xl z-30 flex flex-col gap-4 animate-in fade-in duration-200">
          {/* Recent Searches */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
              <FiClock className="w-3.5 h-3.5" />
              <span>Recent Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((item) => (
                <button
                  key={item}
                  onClick={() => handleSelectTag(item)}
                  className="px-3 py-1 text-xs rounded-lg bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-950/40 hover:text-primary-600 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Searches */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
              <FiTrendingUp className="w-3.5 h-3.5 text-primary-500" />
              <span>Popular Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((item) => (
                <button
                  key={item}
                  onClick={() => handleSelectTag(item)}
                  className="px-3 py-1 text-xs rounded-lg border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 hover:border-primary-500 hover:text-primary-600 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
