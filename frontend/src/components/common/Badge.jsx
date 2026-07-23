/**
 * Badge Component
 * Reusable indicator badge supporting multiple variants, sizes, and dot indicators.
 */
const Badge = ({
  children,
  variant = 'primary',
  size = 'sm',
  showDot = false,
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 font-bold rounded-full select-none';

  const variants = {
    primary: 'bg-primary-50 text-primary-600 dark:bg-primary-950/60 dark:text-primary-400 border border-primary-200 dark:border-primary-800',
    secondary: 'bg-gray-100 text-gray-700 dark:bg-dark-card dark:text-gray-300 border border-gray-200 dark:border-dark-border',
    success: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800',
    warning: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800',
    danger: 'bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400 border border-red-200 dark:border-red-800',
    info: 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
    neutral: 'bg-gray-200/60 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  };

  const dotColors = {
    primary: 'bg-primary-500',
    secondary: 'bg-gray-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
    neutral: 'bg-gray-400',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-[11px]',
    md: 'px-3 py-1 text-xs',
  };

  return (
    <span className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.sm} ${className}`}>
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant] || dotColors.primary}`} />
      )}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
