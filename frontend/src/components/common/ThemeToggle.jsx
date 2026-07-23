import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../hooks/useTheme';

/**
 * ThemeToggle Component
 * Interactive button to switch between Light and Dark themes with Framer Motion micro-animations.
 */
const ThemeToggle = ({ className = '' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`p-2 rounded-lg bg-gray-100 dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-500 ${className}`}
    >
      <motion.div
        key={isDarkMode ? 'dark' : 'light'}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isDarkMode ? (
          <FiSun className="w-5 h-5 text-amber-400" />
        ) : (
          <FiMoon className="w-5 h-5 text-slate-700" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;

