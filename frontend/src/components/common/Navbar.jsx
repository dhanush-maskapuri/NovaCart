import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiShoppingBag,
  FiUser,
  FiShoppingCart,
  FiHeart,
  FiSearch,
  FiMenu,
  FiX,
  FiMapPin,
  FiZap,
  FiChevronDown,
  FiBell,
  FiMic,
  FiGrid,
  FiCheck,
  FiTrash2,
} from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { useAuth } from '../../hooks/useAuth';
import { fetchNotificationsApi, markAllNotificationsReadApi, clearNotificationsApi } from '../../services/notificationService';
import { APP_NAME, APP_TAGLINE } from '../../utils/constants';

/**
 * Navbar Component - NovaCart ("India's Smart Marketplace")
 * Includes Live Notification Center with unread counter badge.
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);
  const [selectedPincode, setSelectedPincode] = useState('400001 - Mumbai');
  const [tempPincode, setTempPincode] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Live Notifications State
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const { cart = [] } = useCart();
  const { wishlist = [] } = useWishlist();
  const { user } = useAuth();

  const totalCartItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const totalCartPrice = cart.reduce((total, item) => {
    const price = item.price || item.product?.price || 0;
    return total + (price * (item.quantity || 1));
  }, 0);
  const totalWishlistItems = wishlist.length;

  const loadNotifications = useCallback(async () => {
    const token = localStorage.getItem('novacart_token') || localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetchNotificationsApi();
      if (res && res.success && res.data) {
        setNotifications(res.data.notifications || []);
        setUnreadCount(res.data.unreadCount || 0);
      }
    } catch (err) {
      console.warn('Notifications fetch warning:', err);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications, user]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsNotificationsOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim() && selectedCategory === 'All') return;
    const catQuery = selectedCategory !== 'All' ? `&category=${encodeURIComponent(selectedCategory.toLowerCase())}` : '';
    navigate(`/shop?search=${encodeURIComponent(searchQuery)}${catQuery}`);
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
        navigate(`/shop?search=${encodeURIComponent(transcript)}`);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } else {
      setIsListening(true);
      setTimeout(() => {
        const sampleQueries = ['iPhone 15 Pro', 'Amul Butter', 'Teakwood Sofa', 'boAt Earbuds'];
        const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
        setSearchQuery(randomQuery);
        setIsListening(false);
        navigate(`/shop?search=${encodeURIComponent(randomQuery)}`);
      }, 2000);
    }
  };

  const handlePincodeSubmit = (e) => {
    e.preventDefault();
    if (tempPincode.trim().length === 6) {
      setSelectedPincode(`${tempPincode} - Verified Delivery`);
      setIsPincodeModalOpen(false);
      setTempPincode('');
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsReadApi();
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.warn('Error marking read:', err);
    }
  };

  const handleClearNotifications = async () => {
    try {
      await clearNotificationsApi();
      setNotifications([]);
      setUnreadCount(0);
    } catch (err) {
      console.warn('Error clearing notifications:', err);
    }
  };

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      isScrolled ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-lg shadow-slate-900/5 border-b border-slate-200/80 dark:border-slate-800/80' : 'glass-effect border-b border-slate-200/60 dark:border-slate-800'
    }`}>
      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-800 text-white text-[11px] font-bold py-1.5 px-4 shadow-inner">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full text-[10px] uppercase font-black flex items-center gap-1 shrink-0">
              <FiZap className="w-3 h-3 fill-slate-950" /> FESTIVE DHAMAKA
            </span>
            <span className="truncate">
              ⚡ <strong>NovaCart Great Indian Festival</strong> — Extra 10% Instant Discount on HDFC & ICICI Cards + 10-Min Express Grocery Delivery!
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] shrink-0">
            <button
              onClick={() => setIsPincodeModalOpen(true)}
              className="flex items-center gap-1 hover:underline text-amber-200 font-semibold"
            >
              <FiMapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>Deliver to: <strong>{selectedPincode}</strong></span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-3 lg:gap-6">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <motion.div
            whileHover={{ rotate: 12, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25"
          >
            <FiShoppingBag className="w-5 h-5" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-300 leading-none">
              {APP_NAME}
            </span>
            <span className="text-[9px] font-extrabold tracking-widest text-amber-600 dark:text-amber-400 uppercase leading-tight flex items-center gap-1">
              <span>{APP_TAGLINE}</span>
            </span>
          </div>
        </Link>

        {/* Amazon-Style Rounded Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center flex-1 max-w-2xl h-11 bg-slate-100 dark:bg-slate-900 border-2 border-blue-600/30 focus-within:border-blue-600 rounded-full overflow-hidden shadow-sm transition-all"
        >
          {/* Category Dropdown */}
          <div className="relative shrink-0 border-r border-slate-200 dark:border-slate-800">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-11 pl-3 pr-7 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 appearance-none focus:outline-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="mobiles">Mobiles</option>
              <option value="laptops">Laptops</option>
              <option value="groceries">NovaMart Groceries</option>
              <option value="fashion">Fashion</option>
              <option value="beauty">Beauty & Skincare</option>
              <option value="furniture">Furniture</option>
              <option value="tv">TV & Appliances</option>
            </select>
            <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Search Input */}
          <div className="relative flex-1 flex items-center px-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 40 Lakh+ products, brands, groceries..."
              className="w-full text-xs font-medium text-slate-900 dark:text-slate-100 bg-transparent placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Microphone Icon */}
          <button
            type="button"
            onClick={handleVoiceSearch}
            title="Voice Search"
            className={`p-2 text-slate-500 hover:text-blue-600 transition-colors ${isListening ? 'animate-pulse text-red-500' : ''}`}
          >
            <FiMic className="w-4 h-4" />
          </button>

          {/* Search Button */}
          <button
            type="submit"
            className="h-11 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold flex items-center justify-center transition-colors shrink-0"
          >
            <FiSearch className="w-4 h-4" />
          </button>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* NovaMart Quick Pill */}
          <NavLink
            to="/shop?category=groceries"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-black hover:scale-105 transition-all shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>NovaMart 10-Min</span>
          </NavLink>

          {/* Live Notification Center */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              title="Notifications"
              className="p-2.5 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
            >
              <FiBell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-4 z-50 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-slate-100">
                    <span className="flex items-center gap-1.5">
                      <FiBell className="text-blue-600" /> Notifications ({unreadCount} Unread)
                    </span>
                    <div className="flex gap-2">
                      <button onClick={handleMarkAllRead} className="text-blue-600 text-[10px] hover:underline">Read All</button>
                      <button onClick={handleClearNotifications} className="text-rose-500 text-[10px] hover:underline">Clear</button>
                    </div>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-4 font-bold">No notifications yet</p>
                    ) : (
                      notifications.map((n, idx) => (
                        <div
                          key={n._id || idx}
                          className={`p-2.5 rounded-2xl text-xs space-y-1 transition-colors ${
                            n.isRead ? 'bg-slate-50 dark:bg-slate-800/40 text-slate-600' : 'bg-indigo-50/70 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-slate-900 dark:text-slate-100'
                          }`}
                        >
                          <h5 className="font-extrabold">{n.title}</h5>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400">{n.message}</p>
                          <span className="text-[9px] text-slate-400 block font-semibold">
                            {new Date(n.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            title="Wishlist"
            className="p-2.5 relative rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <FiHeart className="w-5 h-5" />
            {totalWishlistItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs"
              >
                {totalWishlistItems}
              </motion.span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            title="Cart"
            className="p-2 sm:px-3 sm:py-2 relative rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 flex items-center gap-2 transition-colors border border-blue-200/60 dark:border-blue-800/60"
          >
            <div className="relative">
              <FiShoppingCart className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-blue-600 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                  {totalCartItems}
                </span>
              )}
            </div>
            <div className="hidden xl:flex flex-col text-left leading-tight">
              <span className="text-[9px] uppercase font-extrabold text-slate-400">Total</span>
              <span className="text-xs font-black text-blue-700 dark:text-blue-300">
                ₹{totalCartPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </Link>

          <ThemeToggle />

          {/* User Profile */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="hidden sm:flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors"
              >
                <FiUser className="w-4 h-4 text-blue-600" />
                <span className="truncate max-w-[80px]">{user.name || 'Profile'}</span>
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all"
            >
              <FiUser className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
