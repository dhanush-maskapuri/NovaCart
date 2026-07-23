import { Link } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';

/**
 * Breadcrumb Component
 * Dynamic breadcrumb navigation bar supporting custom links and icons.
 */
const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 mb-6 overflow-x-auto py-1">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      >
        <FiHome className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={item.label} className="flex items-center gap-2 shrink-0">
            <FiChevronRight className="w-3 h-3 text-gray-400 dark:text-gray-600" />
            {isLast || !item.path ? (
              <span className="font-bold text-gray-900 dark:text-gray-100 truncate max-w-[200px]">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
