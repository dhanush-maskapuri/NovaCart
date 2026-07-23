import { FiStar } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

/**
 * Rating Component
 * Renders full, half, and empty stars with rating numbers and review counts.
 */
const Rating = ({ rating = 0, reviewsCount, showCount = true, size = 'sm', className = '' }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.8;

  const starSizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const iconClass = starSizeClasses[size] || starSizeClasses.sm;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} className={`${iconClass} text-amber-400`} />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} className={`${iconClass} text-amber-400`} />);
    } else {
      stars.push(<FiStar key={i} className={`${iconClass} text-gray-300 dark:text-gray-600`} />);
    }
  }

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
        {stars}
      </div>
      {showCount && (
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-gray-800 dark:text-gray-200">{rating.toFixed(1)}</span>
          {reviewsCount !== undefined && <span> ({reviewsCount})</span>}
        </span>
      )}
    </div>
  );
};

export default Rating;
