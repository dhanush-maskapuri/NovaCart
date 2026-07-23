import { motion } from 'framer-motion';
import { cardHover } from '../../animations/variants';

/**
 * Card Component
 * Reusable layout card with interactive hover states, glassmorphism options, and compound header/body/footer subcomponents.
 */
const Card = ({
  children,
  className = '',
  isHoverable = false,
  isGlass = false,
  onClick,
  ...props
}) => {
  const baseStyle =
    'bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl shadow-sm overflow-hidden transition-all duration-200';

  const glassStyle = isGlass ? 'glass-effect' : '';

  if (isHoverable) {
    return (
      <motion.div
        variants={cardHover}
        initial="rest"
        whileHover="hover"
        onClick={onClick}
        className={`${baseStyle} ${glassStyle} cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div onClick={onClick} className={`${baseStyle} ${glassStyle} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`p-4 md:p-6 border-b border-gray-100 dark:border-dark-border/60 ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`p-4 md:p-6 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`p-4 md:p-6 border-t border-gray-100 dark:border-dark-border/60 bg-gray-50/50 dark:bg-dark-bg/40 ${className}`}>
    {children}
  </div>
);

export default Card;

