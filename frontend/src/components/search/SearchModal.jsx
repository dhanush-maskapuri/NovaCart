import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiMic, FiX, FiClock, FiTrendingUp, FiChevronRight, FiZap } from 'react-icons/fi';
import { products } from '../../data/products';
import { fetchSearchSuggestions } from '../../services/productService';
import { SEARCH_SUGGESTIONS } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';

/**
 * SearchModal Component - Voice Search & Instant Backend API Search Overlay
 */
const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('novacart_recents') || '[]');
    } catch {
      return ['iPhone 15 Pro', 'boAt Soundbar', 'Amul Milk'];
    }
  });

  // Debounced API call for instant search suggestions
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetchSearchSuggestions(query);
        if (res && res.success && Array.isArray(res.data)) {
          setSearchResults(res.data);
        } else {
          // Local fallback
          setSearchResults(
            products.filter(
              (p) =>
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.category.toLowerCase().includes(query.toLowerCase()) ||
                p.brand.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 6)
          );
        }
      } catch (err) {
        // Fallback to dataset filter
        setSearchResults(
          products.filter(
            (p) =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.category.toLowerCase().includes(query.toLowerCase()) ||
              p.brand.toLowerCase().includes(query.toLowerCase())
          ).slice(0, 6)
        );
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectQuery = (term) => {
    setQuery(term);
    saveRecent(term);
    navigate(`/shop?search=${encodeURIComponent(term)}`);
    onClose();
  };

  const saveRecent = (term) => {
    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('novacart_recents', JSON.stringify(updated));
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const voiceTerm = 'OnePlus 12R';
      setQuery(voiceTerm);
      saveRecent(voiceTerm);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-start justify-center pt-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 text-white overflow-hidden"
        >
          {/* Search Input Bar */}
          <div className="relative flex items-center">
            <FiSearch className="absolute left-4 w-5 h-5 text-indigo-400" />
            <input
              type="text"
              autoFocus
              placeholder="Search 40+ Lakh Products, Brands or 10-Min Groceries..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-24 py-3.5 text-sm font-bold rounded-2xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Voice Search Button */}
            <button
              onClick={handleVoiceSearch}
              title="Voice Search"
              className={`absolute right-12 p-2 rounded-xl transition-all ${
                isListening ? 'bg-rose-500 text-white animate-bounce' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FiMic className="w-5 h-5" />
            </button>

            <button
              onClick={onClose}
              className="absolute right-3 p-1.5 rounded-xl text-slate-400 hover:text-white"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Voice Listening Animation Notice */}
          {isListening && (
            <div className="p-3 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center gap-3 text-xs font-bold text-indigo-300 animate-pulse">
              <span className="w-3 h-3 bg-indigo-400 rounded-full animate-ping" />
              <span>Listening... Say "OnePlus 12R" or "boAt Soundbar"...</span>
            </div>
          )}

          {/* Live Search Results Auto-Complete */}
          {query.trim() && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400">
                <span>Matching Products ({searchResults.length})</span>
                {loading && <span className="text-indigo-400 animate-pulse">Searching...</span>}
              </div>

              {searchResults.length > 0 ? (
                <div className="divide-y divide-slate-800 border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/60">
                  {searchResults.map((prod) => (
                    <div
                      key={prod._id}
                      onClick={() => {
                        saveRecent(prod.name);
                        navigate(`/product/${prod._id}`);
                        onClose();
                      }}
                      className="p-3 flex items-center justify-between hover:bg-slate-800/80 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image || (prod.images && prod.images[0]?.url) || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'}
                          alt={prod.name}
                          className="w-10 h-10 object-cover rounded-xl border border-slate-700"
                        />
                        <div>
                          <h5 className="text-xs font-extrabold text-white line-clamp-1">{prod.name}</h5>
                          <span className="text-[10px] font-bold text-amber-400">
                            {prod.deliveryTime || prod.deliveryEstimate || '10 Mins Express'}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-emerald-400">{formatCurrency(prod.price)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                !loading && (
                  <div className="p-6 text-center text-xs font-bold text-slate-500 rounded-2xl bg-slate-950 border border-slate-800">
                    No products found matching "{query}". Try searching for boAt, Apple, or Groceries.
                  </div>
                )
              )}
            </div>
          )}

          {/* Recent Searches */}
          {!query.trim() && recentSearches.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                <span className="flex items-center gap-1.5">
                  <FiClock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Recent Searches</span>
                </span>
                <button
                  onClick={() => {
                    setRecentSearches([]);
                    localStorage.removeItem('novacart_recents');
                  }}
                  className="text-slate-500 hover:underline text-[10px]"
                >
                  Clear
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {recentSearches.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuery(s)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          {!query.trim() && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                <FiTrendingUp className="w-3.5 h-3.5 text-amber-400" />
                <span>Trending Searches in India</span>
              </span>

              <div className="flex flex-wrap gap-2">
                {SEARCH_SUGGESTIONS.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuery(s)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-800/60 text-xs font-extrabold text-indigo-300 hover:bg-indigo-900 transition-colors"
                  >
                    ⚡ {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SearchModal;
