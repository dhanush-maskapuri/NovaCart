/**
 * Spinner Component
 * Reusable inline loading spinner for buttons, inline loading indicators, and small UI elements.
 */
const Spinner = ({ size = 'md', color = 'primary', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
    xl: 'w-12 h-12 border-4',
  };

  const colors = {
    primary: 'border-primary-600 dark:border-primary-500 border-t-transparent dark:border-t-transparent',
    white: 'border-white border-t-transparent',
    dark: 'border-gray-800 dark:border-gray-200 border-t-transparent dark:border-t-transparent',
    gray: 'border-gray-400 border-t-transparent',
  };

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`inline-block rounded-full animate-spin ${sizes[size] || sizes.md} ${colors[color] || colors.primary} ${className}`}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
