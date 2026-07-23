import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

/**
 * Toast Component
 * Floating notification alert card with Framer Motion slide-in animation.
 */
const Toast = ({ isVisible, message, type = 'success', onClose }) => {
  const icons = {
    success: <FiCheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <FiAlertCircle className="w-5 h-5 text-red-500 shrink-0" />,
    info: <FiInfo className="w-5 h-5 text-blue-500 shrink-0" />,
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl shadow-2xl max-w-sm"
        >
          {icons[type] || icons.success}
          <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 flex-1">
            {message}
          </p>
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close notification"
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
