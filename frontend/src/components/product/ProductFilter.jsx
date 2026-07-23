import { CATEGORIES } from '../../utils/constants';

const ProductFilter = () => {
  return (
    <div className="p-4 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl">
      <h4 className="font-semibold mb-3">Categories</h4>
      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        {CATEGORIES.map((cat) => (
          <li key={cat} className="hover:text-primary-500 cursor-pointer">
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductFilter;
