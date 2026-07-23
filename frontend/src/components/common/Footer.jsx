import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiShoppingBag,
  FiGithub,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
} from 'react-icons/fi';

/**
 * Footer Component
 * Comprehensive responsive multi-column footer with brand section, navigation links, support details, social media links, and copyright banner.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer className="border-t border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg mt-auto transition-colors duration-200">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-primary-600 dark:text-primary-400">
              <div className="p-1.5 bg-primary-100 dark:bg-primary-950/60 rounded-xl text-primary-600 dark:text-primary-400">
                <FiShoppingBag className="w-5 h-5" />
              </div>
              <span className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-200 bg-clip-text text-transparent">
                ShopSphere
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Your premium destination for modern e-commerce shopping. Curated quality products delivered right to your doorstep.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-gray-900 dark:text-gray-100">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Shop Products
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  My Wishlist
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support Column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-gray-900 dark:text-gray-100">
              Customer Care
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link to="/orders" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <span className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer">
                  Shipping & Returns
                </span>
              </li>
              <li>
                <span className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer">
                  FAQs & Help Center
                </span>
              </li>
              <li>
                <span className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-gray-900 dark:text-gray-100">
              Get In Touch
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2.5">
                <FiMapPin className="w-4 h-4 text-primary-600 shrink-0" />
                <span>123 Market Street, Tech City, USA</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="w-4 h-4 text-primary-600 shrink-0" />
                <span>+1 (800) 555-SHOPSPHERE</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail className="w-4 h-4 text-primary-600 shrink-0" />
                <span>support@shopsphere.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Line */}
        <div className="border-t border-gray-100 dark:border-dark-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          <p>&copy; {currentYear} ShopSphere. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with React 18, Vite, Tailwind CSS & Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

