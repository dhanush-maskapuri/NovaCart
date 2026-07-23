const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default Card;
