import { motion } from 'framer-motion';
import { FiInbox } from 'react-icons/fi';
import Button from './Button';
import { fadeIn } from '../../animations/variants';

/**
 * EmptyState Component
 * Reusable placeholder view for empty lists, search results, cart, or wishlist states.
 */
const EmptyState = ({
  icon: Icon = FiInbox,
  title = 'No items found',
  description = 'There are no items available to display right now.',
  actionLabel,
  onAction,
  actionIcon,
  className = '',
}) => {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className={`flex flex-col items-center justify-center text-center p-8 md:p-12 my-6 bg-white dark:bg-dark-card border border-dashed border-gray-300 dark:border-dark-border rounded-2xl ${className}`}
    >
      <div className="p-4 bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 rounded-full mb-4">
        <Icon className="w-10 h-10" />
      </div>

      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm mb-6">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button onClick={onAction} leftIcon={actionIcon}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;
