import { motion } from 'framer-motion';
import Spinner from './Spinner';
import { buttonTap } from '../../animations/variants';

/**
 * Button Component
 * Reusable interactive button with variant styling, size configurations, icon integration, loading state, and Framer Motion feedback.
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  leftIcon = null,
  rightIcon = null,
  fullWidth = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyle =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary:
      'bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white shadow-sm hover:shadow dark:bg-primary-500 dark:hover:bg-primary-600',
    secondary:
      'bg-gray-100 dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-dark-border',
    outline:
      'border border-primary-600 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950/30',
    ghost:
      'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-card',
    danger:
      'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm dark:bg-red-500 dark:hover:bg-red-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      type={type}
      whileHover={isDisabled || isLoading ? {} : buttonTap.hover}
      whileTap={isDisabled || isLoading ? {} : buttonTap.tap}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${widthStyle} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner size={size === 'lg' ? 'md' : 'sm'} color={variant === 'primary' || variant === 'danger' ? 'white' : 'primary'} />
          <span>{children}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
};

export default Button;

