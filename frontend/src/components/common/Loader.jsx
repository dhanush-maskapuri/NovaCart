import { motion } from 'framer-motion';
import { FiShoppingBag } from 'react-icons/fi';
import Spinner from './Spinner';
import { fadeIn } from '../../animations/variants';

/**
 * Loader Component
 * Full-page or container level loading state indicator with ShopSphere branding.
 */
const Loader = ({ message = 'Loading...', fullScreen = false }) => {
  const content = (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center gap-4 p-8 text-center"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full"
      >
        <FiShoppingBag className="w-8 h-8" />
      </motion.div>
      <Spinner size="lg" color="primary" />
      {message && (
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 animate-pulse">
          {message}
        </p>
      )}
    </motion.div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-16 w-full">{content}</div>;
};

export default Loader;

