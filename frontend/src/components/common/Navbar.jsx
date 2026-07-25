import { useState, useEffect } from 'react';
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
  FiCpu,
} from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import SearchModal from '../search/SearchModal';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { useAuth } from '../../hooks/useAuth';
import { categories } from '../../data/categories';
import { APP_NAME, APP_TAGLINE } from '../../utils/constants';

/**
 * Navbar Component - NOVACART ("India's Smart Marketplace")
 * Royal Blue & Indigo Glassmorphism Header, Category Mega Menu, Voice Search Modal Trigger,
 * Notifications Popover, Delivery Pincode Drawer, & Badge Counters.
 */
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);
  const [selectedPincode, setSelectedPincode] = useState('110001 - New Delhi');
  const [tempPincode, setTempPincode] = useState('');
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { cart = [] } = useCart();
  const { wishlist = [] } = useWishlist();
  const { user } = useAuth();

  const totalCartItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const totalWishlistItems = wishlist.length;

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsMegaMenuOpen(false);
    setIsNotificationsOpen(false);
  }, [location.pathname]);

  const handlePincodeSubmit = (e) => {
    e.preventDefault();
    if (tempPincode.trim().length === 6) {
      setSelectedPincode(`${tempPincode} - Verified Express Zone`);
      setIsPincodeModalOpen(false);
      setTempPincode('');
    }
  };

  const notifications = [
    { title: '⚡ Festive Sale Live', desc: 'Up to 70% Off on Mobiles & NovaMart 10-Min Groceries', time: 'Just Now' },
    { title: '📦 Order #ORD-98421 Update', desc: 'Rider is out for delivery in your area', time: '10 Mins Ago' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-effect border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      {/* Top Banner Announcement Ticker */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white text-[11px] font-bold py-1.5 px-4 flex items-center justify-between">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full text-[10px] uppercase font-black flex items-center gap-1">
              <FiZap className="w-3 h-3 fill-slate-950" /> FESTIVE SALE
            </span>
            <span className="hidden sm:inline">
              ⚡ Great Indian Sale — Get Up to 70% OFF + 10-Min Instant Grocery Delivery!
            </span>
            <span className="sm:hidden">⚡ Great Indian Sale — Up to 70% OFF</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setIsPincodeModalOpen(true)}
              className="flex items-center gap-1 hover:underline text-amber-200 font-semibold"
            >
              <FiMapPin className="w-3.5 h-3.5" />
              <span>{selectedPincode}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight shrink-0 group"
        >
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20"
          >
            <FiShoppingBag className="w-5 h-5" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-gradient leading-none">
              {APP_NAME}
            </span>
            <span className="text-[9px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase leading-tight">
              {APP_TAGLINE}
            </span>
          </div>
        </Link>

        {/* Desktop Category Navigation & Mega Menu Trigger */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/80 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-800 relative">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600'
              }`
            }
          >
            All Products
          </NavLink>

          {/* Mega Menu Category Hover */}
          <div
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
            className="relative"
          >
            <button className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 flex items-center gap-1">
              <span>Categories ({categories.length})</span>
              <FiChevronDown className="w-3.5 h-3.5" />
            </button>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {isMegaMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-[640px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 z-50 grid grid-cols-3 gap-4"
                >
                  {categories.slice(0, 15).map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/shop?category=${cat.slug}`}
                      className="p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                        {cat.name[0]}
                      </div>
                      <div>
                        <h5 className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                          {cat.name}
                        </h5>
                        <span className="text-[10px] text-slate-400">{cat.count}+ items</span>
                      </div>
                    </Link>
                  ))}
                  <div className="col-span-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-400">Explore 25+ categories</span>
                    <Link to="/shop" className="text-indigo-600 hover:underline">
                      View All Catalog →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink
            to="/shop?category=groceries"
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 flex items-center gap-1"
          >
            ⚡ NovaMart 10-Min
          </NavLink>

          <NavLink
            to="/ai-assistant"
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 flex items-center gap-1"
          >
            <FiCpu className="w-3.5 h-3.5" />
            <span>AI Assistant</span>
          </NavLink>
        </nav>

        {/* Quick Search Input Trigger */}
        <div className="hidden md:flex flex-1 max-w-sm relative">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full text-left pl-9 pr-8 py-2 text-xs rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/60 text-slate-400 font-medium transition-all flex items-center justify-between"
          >
            <span>Search 40+ Lakh products or Voice...</span>
            <FiMic className="w-4 h-4 text-indigo-500" />
          </button>
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications Popover */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              title="Notifications"
              className="p-2.5 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative"
            >
              <FiBell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full" />
            </button>

            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-4 z-50 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-slate-100">
                    <span>Notifications</span>
                    <span className="text-indigo-600 text-[10px]">Mark as read</span>
                  </div>
                  <div className="space-y-2">
                    {notifications.map((n, idx) => (
                      <div key={idx} className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1">
                        <h5 className="font-bold text-slate-900 dark:text-slate-100">{n.title}</h5>
                        <p className="text-[11px] text-slate-500">{n.desc}</p>
                        <span className="text-[9px] text-slate-400 block">{n.time}</span>
                      </div>
                    ))}
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
            className="p-2.5 relative rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
          >
            <FiShoppingCart className="w-5 h-5" />
            {totalCartItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 w-4 h-4 bg-indigo-600 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs"
              >
                {totalCartItems}
              </motion.span>
            )}
          </Link>

          <ThemeToggle />

          {/* Account */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="hidden sm:flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors"
              >
                <FiUser className="w-4 h-4 text-indigo-600" />
                <span className="truncate max-w-[90px]">{user.name || 'Profile'}</span>
              </Link>
              <Link
                to="/admin"
                title="Admin Dashboard"
                className="p-2 rounded-2xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold"
              >
                <FiGrid className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 transition-all"
            >
              <FiUser className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}

          {/* Mobile Drawer Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Voice & Instant Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Pincode Location Modal */}
      <AnimatePresence>
        {isPincodeModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPincodeModalOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 max-w-[90vw] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl z-50"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-lg">
                  <FiMapPin className="w-5 h-5" />
                  <span>Delivery Pincode</span>
                </div>
                <button onClick={() => setIsPincodeModalOpen(false)} className="text-slate-400">
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handlePincodeSubmit} className="space-y-4">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 110001, 560001, 400001"
                  value={tempPincode}
                  onChange={(e) => setTempPincode(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-2.5 text-sm font-semibold rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                />
                <button
                  type="submit"
                  disabled={tempPincode.length !== 6}
                  className="w-full py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md"
                >
                  Verify Pincode
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
