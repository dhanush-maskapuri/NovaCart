import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg mt-auto py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-lg font-bold text-primary-600 dark:text-primary-500">
          <FiShoppingBag className="w-5 h-5" />
          <span>ShopSphere</span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} ShopSphere. Built with React, Vite & Node.js.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
