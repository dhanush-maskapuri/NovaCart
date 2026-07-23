import { useState } from 'react';
import { FiCheckCircle, FiThumbsUp } from 'react-icons/fi';
import Rating from './Rating';

/**
 * ReviewCard Component
 * Displays verified customer review details with helpful voting button.
 */
const ReviewCard = ({ review }) => {
  const { userName, avatar, rating, date, title, content, verified, helpfulCount = 0 } = review;
  const [likes, setLikes] = useState(helpfulCount);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (!hasVoted) {
      setLikes((prev) => prev + 1);
      setHasVoted(true);
    } else {
      setLikes((prev) => prev - 1);
      setHasVoted(false);
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-xs transition-colors">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt={userName}
            className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-dark-border"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">{userName}</h4>
              {verified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                  <FiCheckCircle className="w-3 h-3" />
                  Verified
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">{date}</span>
          </div>
        </div>

        <Rating rating={rating} showCount={false} size="sm" />
      </div>

      <h5 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1.5">{title}</h5>
      <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{content}</p>

      <button
        onClick={handleVote}
        className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
          hasVoted
            ? 'bg-primary-50 dark:bg-primary-950/40 border-primary-300 dark:border-primary-700 text-primary-600 dark:text-primary-400 font-medium'
            : 'border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
        }`}
      >
        <FiThumbsUp className="w-3.5 h-3.5" />
        <span>Helpful ({likes})</span>
      </button>
    </div>
  );
};

export default ReviewCard;
