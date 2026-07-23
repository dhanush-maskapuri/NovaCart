import { Link } from 'react-router-dom';
import { FiShoppingBag, FiUser, FiShoppingCart, FiSearch } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-dark-border glass-effect">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-primary-600 dark:text-primary-500">
          <FiShoppingBag className="w-6 h-6" />
          <span>ShopSphere</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-sm">
          <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-500 transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-primary-600 dark:hover:text-primary-500 transition-colors">Shop</Link>
          <Link to="/orders" className="hover:text-primary-600 dark:hover:text-primary-500 transition-colors">My Orders</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link to="/cart" className="p-2 relative rounded-full hover:bg-gray-100 dark:hover:bg-dark-card transition-colors">
            <FiShoppingCart className="w-5 h-5" />
          </Link>
          <Link to="/login" className="flex items-center gap-1 text-sm font-semibold px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors">
            <FiUser className="w-4 h-4" />
            <span>Login</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
