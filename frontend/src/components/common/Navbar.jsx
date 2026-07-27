import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiShoppingBag,
  FiUser,
  FiShoppingCart,
  FiHeart,
  FiSearch,
  FiX,
  FiMapPin,
  FiZap,
  FiChevronDown,
  FiBell,
  FiMic,
  FiGrid,
  FiSliders,
  FiPackage,
  FiLogOut,
  FiTag,
  FiStar,
  FiCpu,
  FiCoffee,
  FiBookOpen,
  FiSmile,
  FiTruck,
  FiShield,
  FiTv,
} from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { useAuth } from '../../hooks/useAuth';
import { usePreferences } from '../../context/PreferencesContext';
import { fetchNotificationsApi, markAllNotificationsReadApi, clearNotificationsApi } from '../../services/notificationService';
import { APP_NAME, APP_TAGLINE } from '../../utils/constants';

const MEGA_CATEGORIES = [
  { id: 'electronics', name: 'Electronics', icon: FiCpu, sub: ['Smartphones', 'Laptops', 'Headphones', 'Smartwatches', 'Cameras'] },
  { id: 'fashion', name: 'Fashion', icon: FiShoppingBag, sub: ['Men Clothing', 'Women Wear', 'Footwear', 'Watches', 'Bags'] },
  { id: 'groceries', name: 'Groceries', icon: FiCoffee, sub: ['Dairy & Milk', 'Fresh Fruits', 'Atta & Rice', 'Snacks', 'Beverages'] },
  { id: 'beauty', name: 'Beauty & Care', icon: FiSmile, sub: ['Skincare', 'Haircare', 'Makeup', 'Fragrances', 'Grooming'] },
  { id: 'furniture', name: 'Furniture', icon: FiTv, sub: ['Sofas', 'Beds', 'Dining Tables', 'Office Chairs', 'Storage'] },
  { id: 'kitchen', name: 'Kitchen & Home', icon: FiCoffee, sub: ['Cookware', 'Mixer Grinders', 'Dinnerware', 'Water Purifiers', 'Decor'] },
  { id: 'books', name: 'Books & Stationery', icon: FiBookOpen, sub: ['Fiction', 'Academic', 'Self-Help', 'Notebooks', 'Pens'] },
  { id: 'sports', name: 'Sports & Fitness', icon: FiZap, sub: ['Gym Equipment', 'Yoga Mats', 'Badminton', 'Cycles', 'Sports Wear'] },
  { id: 'health', name: 'Health & Wellness', icon: FiShield, sub: ['Vitamins', 'Protein Powders', 'First Aid', 'Personal Hygiene'] },
  { id: 'automotive', name: 'Automotive', icon: FiTruck, sub: ['Car Accessories', 'Helmets', 'Riding Gear', 'Engine Oils'] },
  { id: 'pet', name: 'Pet Supplies', icon: FiSmile, sub: ['Dog Food', 'Cat Litter', 'Pet Toys', 'Grooming Tools'] },
];

/**
 * Navbar Component - 2-Row Header Layout with Perfect Baseline Alignment
 * ROW 1: Logo | Categories Mega Menu | Search Bar (Max Width 2XL) | Dark Mode Toggle | Profile Avatar
 * ROW 2: (Left) Home | Shop | Deals & Offers | New Arrivals | NovaMart 10-Min | Orders --- (Right) Wishlist | Notifications | Cart
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedPincode, setSelectedPincode] = useState('560066 - Bengaluru');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  // Live Notifications State
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const { cart = [] } = useCart();
  const { wishlist = [] } = useWishlist();
  const { user, logout } = useAuth();
  const { preferences, t, formatPrice } = usePreferences();

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
    setIsNotificationsOpen(false);
    setIsUserDropdownOpen(false);
    setIsMegaMenuOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMegaCategoryClick = (catId) => {
    setIsMegaMenuOpen(false);
    navigate(`/shop?category=${encodeURIComponent(catId)}`);
  };

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      isScrolled ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-lg shadow-slate-900/5 border-b border-slate-200/80 dark:border-slate-800/80' : 'glass-effect border-b border-slate-200/60 dark:border-slate-800'
    }`}>
      {/* Top Announcement Ticker */}
      <div className="bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-800 text-white text-[11px] font-bold py-1.5 px-4 shadow-inner">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full text-[10px] uppercase font-black flex items-center gap-1 shrink-0">
              <FiZap className="w-3 h-3 fill-slate-950" /> FESTIVE OFFER
            </span>
            <span className="truncate">
              ⚡ <strong>NovaCart Festival Dhamaka</strong> — Extra 10% Instant Discount + 10-Min Express Grocery Delivery!
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1 text-amber-200 font-semibold">
              <FiMapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('deliver_to')} <strong>{selectedPincode}</strong></span>
            </span>

            {user ? (
              <span className="text-white/90 font-semibold">Hello, <strong>{user.name}</strong></span>
            ) : (
              <Link to="/login" className="hover:underline font-bold text-amber-300">Sign In</Link>
            )}
          </div>
        </div>
      </div>

      {/* ROW 1: Logo | Categories Mega Menu Button | Search Bar (Max-W-2XL) | Dark Mode Toggle | Profile Avatar */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Left Categories Button */}
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/" className="flex items-center gap-2.5 group">
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

          <button
            onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-black hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-800 transition-colors shadow-xs"
          >
            <FiGrid className="w-4 h-4 text-indigo-600" />
            <span>Categories</span>
            <FiChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Clean Search Bar Container (Max-Width 2XL for Baseline Alignment) */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center flex-1 h-11 bg-slate-100 dark:bg-slate-900 border-2 border-blue-600/30 focus-within:border-blue-600 rounded-full overflow-hidden shadow-xs transition-all max-w-2xl mx-auto"
        >
          <div className="relative flex-1 flex items-center px-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, brands and categories"
              className="w-full text-xs font-semibold text-slate-900 dark:text-slate-100 bg-transparent placeholder-slate-400 focus:outline-none"
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

          <button
            type="button"
            onClick={handleVoiceSearch}
            title="Voice Search"
            className={`p-2.5 text-slate-500 hover:text-blue-600 transition-colors ${isListening ? 'animate-pulse text-red-500' : ''}`}
          >
            <FiMic className="w-4 h-4" />
          </button>

          <button
            type="submit"
            className="h-11 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold flex items-center justify-center transition-colors shrink-0"
          >
            <FiSearch className="w-4 h-4" />
          </button>
        </form>

        {/* Row 1 Right Controls: Dark Mode Toggle & User Profile Popover */}
        <div className="flex items-center gap-3 shrink-0">
          <ThemeToggle />

          {/* User Profile Popover Dropdown */}
          <div className="relative">
            {user ? (
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-[11px] shadow-xs">
                  {user.name?.[0] || 'U'}
                </div>
                <span className="truncate max-w-[80px] hidden sm:inline font-black">{user.name}</span>
                <FiChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all"
              >
                <FiUser className="w-4 h-4" />
                <span>{t('login')}</span>
              </Link>
            )}

            <AnimatePresence>
              {isUserDropdownOpen && user && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-3 z-50 space-y-1 text-xs font-bold text-slate-800 dark:text-slate-200"
                >
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl mb-2">
                    <span className="block font-black text-sm">{user.name}</span>
                    <span className="text-[10px] text-slate-400 font-medium block truncate">{user.email}</span>
                  </div>

                  <Link to="/profile" className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                    <FiUser className="text-blue-600" /> My Profile
                  </Link>
                  <Link to="/orders" className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                    <FiPackage className="text-indigo-600" /> My Orders
                  </Link>
                  <Link to="/wishlist" className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                    <FiHeart className="text-rose-500" /> Saved Wishlist
                  </Link>
                  <Link to="/profile" className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                    <FiMapPin className="text-amber-500" /> Addresses
                  </Link>
                  <Link to="/preferences" className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                    <FiSliders className="text-purple-600" /> Preferences (Language, Currency)
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 font-extrabold text-left border-t border-slate-100 dark:border-slate-800 mt-2 pt-2"
                  >
                    <FiLogOut /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Slide-Down Categories Mega Menu Drawer */}
      <AnimatePresence>
        {isMegaMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-slate-900 border-t border-b border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-30"
          >
            <div className="container mx-auto p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {MEGA_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.id} className="space-y-2">
                    <button
                      onClick={() => handleMegaCategoryClick(cat.id)}
                      className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 group text-left"
                    >
                      <Icon className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
                      <span>{cat.name}</span>
                    </button>
                    <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400 font-semibold pl-6">
                      {cat.sub.map((subItem) => (
                        <li key={subItem}>
                          <button
                            onClick={() => handleMegaCategoryClick(cat.id)}
                            className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition-colors"
                          >
                            {subItem}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ROW 2: (Left) Primary Nav Links --- (Right) Wishlist | Notifications | Cart */}
      <div className="border-t border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/50 py-2 px-4">
        <div className="container mx-auto flex items-center justify-between overflow-x-auto text-sm font-extrabold text-slate-700 dark:text-slate-300">
          {/* Row 2 Left Side Links */}
          <div className="flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative py-1 transition-colors ${
                  isActive ? 'text-indigo-600 font-black' : 'hover:text-indigo-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>Home</span>
                  {isActive && (
                    <motion.div layoutId="navUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `relative py-1 transition-colors ${
                  isActive ? 'text-indigo-600 font-black' : 'hover:text-indigo-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>Shop</span>
                  {isActive && (
                    <motion.div layoutId="navUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </>
              )}
            </NavLink>

            <NavLink to="/shop?sort=discount" className="relative py-1 hover:text-indigo-600 flex items-center gap-1.5 transition-colors">
              <FiTag className="text-rose-500" /> Deals & Offers
            </NavLink>

            <NavLink to="/shop?sort=newest" className="relative py-1 hover:text-indigo-600 flex items-center gap-1.5 transition-colors">
              <FiStar className="text-amber-500" /> New Arrivals
            </NavLink>

            <NavLink to="/shop?category=groceries" className="relative py-1 text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 transition-colors">
              <FiZap className="fill-emerald-500" /> NovaMart 10-Min Express
            </NavLink>

            {user && (
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `relative py-1 transition-colors ${
                    isActive ? 'text-indigo-600 font-black' : 'hover:text-indigo-600'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>Orders</span>
                    {isActive && (
                      <motion.div layoutId="navUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            )}
          </div>

          {/* Row 2 Right Side Toolbar: Wishlist | Notifications | Cart */}
          <div className="flex items-center gap-3 shrink-0 pl-4 border-l border-slate-200 dark:border-slate-800">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              title="Wishlist"
              className="p-2 relative rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs"
            >
              <FiHeart className="w-4 h-4 text-rose-500" />
              <span>Wishlist</span>
              {totalWishlistItems > 0 && (
                <span className="w-4 h-4 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                title="Notifications"
                className="p-2 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 relative transition-colors flex items-center gap-1 text-xs"
              >
                <FiBell className="w-4 h-4 text-amber-500" />
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <span className="w-4 h-4 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
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
                    className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-4 z-50 space-y-3 text-left font-normal"
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
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart Icon & Price Display */}
            <Link
              to="/cart"
              title="Cart"
              className="p-1.5 sm:px-3 sm:py-1.5 relative rounded-2xl bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 transition-colors shadow-md shadow-blue-500/20 text-xs font-black"
            >
              <div className="relative">
                <FiShoppingCart className="w-4 h-4" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                    {totalCartItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart ({formatPrice(totalCartPrice)})</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
