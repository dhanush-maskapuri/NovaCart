import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiShoppingBag,
  FiUser,
  FiShoppingCart,
  FiHeart,
  FiSearch,
  FiMenu,
  FiX,
  FiLogOut,
} from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { useAuth } from '../../hooks/useAuth';
import { drawerSlide } from '../../animations/variants';

/**
 * Navbar Component
 * Sticky top navigation bar featuring active link highlighting, search modal toggle,
 * cart & wishlist badge indicators, user menu, theme switcher, and responsive mobile drawer.
 */
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const { cart = [] } = useCart();
  const { wishlist = [] } = useWishlist();
  const { user } = useAuth();

  const totalCartItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const totalWishlistItems = wishlist.length;

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-dark-border glass-effect transition-colors duration-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-primary-600 dark:text-primary-400 shrink-0"
        >
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="p-1.5 bg-primary-100 dark:bg-primary-950/60 rounded-xl"
          >
            <FiShoppingBag className="w-6 h-6" />
          </motion.div>
          <span className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-200 bg-clip-text text-transparent">
            ShopSphere
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative py-1 transition-colors ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Quick Search Input (Desktop Expandable) */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '240px' }}
              exit={{ opacity: 0, width: 0 }}
              className="hidden lg:flex items-center"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Toggle Icon */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search products"
            title="Search"
            className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-card transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <FiSearch className="w-5 h-5" />
          </button>

          {/* Wishlist Icon */}
          <Link
            to="/wishlist"
            aria-label="View Wishlist"
            title="Wishlist"
            className="p-2 relative rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-card transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <FiHeart className="w-5 h-5" />
            {totalWishlistItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
              >
                {totalWishlistItems}
              </motion.span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link
            to="/cart"
            aria-label="View Cart"
            title="Shopping Cart"
            className="p-2 relative rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-card transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <FiShoppingCart className="w-5 h-5" />
            {totalCartItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
              >
                {totalCartItems}
              </motion.span>
            )}
          </Link>

          {/* Theme Switcher Toggle */}
          <ThemeToggle />

          {/* Auth Login/Profile Button */}
          {user ? (
            <Link
              to="/profile"
              className="hidden sm:flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border hover:bg-gray-100 dark:hover:bg-dark-card transition-colors text-gray-800 dark:text-gray-200"
            >
              <FiUser className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="truncate max-w-[100px]">{user.name || 'Account'}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white shadow-sm transition-colors"
            >
              <FiUser className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-card transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 top-16 bg-black/50 backdrop-blur-xs z-40 md:hidden"
            />

            {/* Slide Drawer Content */}
            <motion.aside
              variants={drawerSlide}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-16 right-0 bottom-0 w-64 bg-white dark:bg-dark-card border-l border-gray-200 dark:border-dark-border z-50 md:hidden p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
            >
              <div className="flex flex-col gap-6">
                <nav className="flex flex-col gap-4 font-medium text-base">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={({ isActive }) =>
                        `py-2 px-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 font-semibold'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                  <NavLink
                    to="/wishlist"
                    className={({ isActive }) =>
                      `py-2 px-3 rounded-lg flex items-center justify-between transition-colors ${
                        isActive
                          ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 font-semibold'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`
                    }
                  >
                    <span>Wishlist</span>
                    {totalWishlistItems > 0 && (
                      <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                        {totalWishlistItems}
                      </span>
                    )}
                  </NavLink>
                </nav>
              </div>

              {/* Mobile Auth Button */}
              <div className="border-t border-gray-200 dark:border-dark-border pt-6">
                {user ? (
                  <Link
                    to="/profile"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-gray-100 dark:bg-dark-bg text-gray-900 dark:text-gray-100 font-semibold text-sm"
                  >
                    <FiUser className="w-4 h-4 text-primary-600" />
                    <span>My Account</span>
                  </Link>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-primary-600 text-white font-semibold text-sm hover:bg-primary-700 transition-colors"
                    >
                      <FiUser className="w-4 h-4" />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg border border-gray-300 dark:border-dark-border text-gray-800 dark:text-gray-200 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span>Register</span>
                    </Link>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

