import { FiRotateCcw, FiFilter } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

/**
 * ProductFilter Component
 * Comprehensive modern filtering sidebar for categories, price range, rating, availability, and brands.
 */
const ProductFilter = ({
  categories = [],
  selectedCategory = 'all',
  onCategoryChange,
  priceRange = [0, 1000],
  onPriceChange,
  selectedRating = 0,
  onRatingChange,
  inStockOnly = false,
  onInStockChange,
  selectedBrands = [],
  onBrandToggle,
  onResetFilters,
  className = '',
}) => {
  const availableBrands = ['Acoustics', 'SphereTech', 'Nike', 'Keycraft', 'Workspace Pro', 'SphereApparel', 'HydroSphere'];

  return (
    <div className={`flex flex-col gap-6 p-6 bg-white dark:bg-dark-card border border-gray-200/80 dark:border-dark-border rounded-3xl shadow-xs ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-dark-border">
        <div className="flex items-center gap-2">
          <FiFilter className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">Filters</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <FiRotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Category
        </h4>
        <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
          <button
            onClick={() => onCategoryChange && onCategoryChange('all')}
            className={`flex items-center justify-between text-xs py-1.5 px-3 rounded-xl font-medium transition-colors text-left ${
              selectedCategory === 'all'
                ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 font-bold'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <span>All Categories</span>
          </button>

          {categories.map((cat) => {
            const catId = typeof cat === 'string' ? cat : cat.name;
            const isSelected = selectedCategory.toLowerCase() === catId.toLowerCase();
            return (
              <button
                key={catId}
                onClick={() => onCategoryChange && onCategoryChange(catId)}
                className={`flex items-center justify-between text-xs py-1.5 px-3 rounded-xl font-medium transition-colors text-left ${
                  isSelected
                    ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 font-bold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <span>{catId}</span>
                {cat.count !== undefined && (
                  <span className="text-[10px] text-gray-400">{cat.count}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="flex flex-col gap-3 pt-2 border-t border-gray-100 dark:border-dark-border/60">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Price Range
          </h4>
          <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          step="25"
          value={priceRange[1]}
          onChange={(e) => onPriceChange && onPriceChange([priceRange[0], Number(e.target.value)])}
          className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
        />
      </div>

      {/* Rating Filter */}
      <div className="flex flex-col gap-2.5 pt-2 border-t border-gray-100 dark:border-dark-border/60">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Minimum Rating
        </h4>
        <div className="flex items-center gap-1.5">
          {[4, 3, 2, 1].map((starVal) => (
            <button
              key={starVal}
              onClick={() => onRatingChange && onRatingChange(selectedRating === starVal ? 0 : starVal)}
              className={`flex items-center gap-1 text-xs py-1 px-2.5 rounded-lg border font-medium transition-colors ${
                selectedRating === starVal
                  ? 'bg-amber-500 text-white border-amber-500 font-bold'
                  : 'border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <span>{starVal}</span>
              <FaStar className="w-3 h-3 text-amber-400 inline" />
              <span>+</span>
            </button>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-dark-border/60">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          In Stock Only
        </span>
        <button
          onClick={() => onInStockChange && onInStockChange(!inStockOnly)}
          className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
            inStockOnly ? 'bg-primary-600 justify-end' : 'bg-gray-300 dark:bg-gray-700 justify-start'
          }`}
        >
          <div className="w-4 h-4 rounded-full bg-white shadow-md" />
        </button>
      </div>

      {/* Brands Filter */}
      <div className="flex flex-col gap-2.5 pt-2 border-t border-gray-100 dark:border-dark-border/60">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Brand
        </h4>
        <div className="flex flex-col gap-2">
          {availableBrands.map((brandName) => {
            const isChecked = selectedBrands.includes(brandName);
            return (
              <label
                key={brandName}
                className="flex items-center gap-2.5 text-xs text-gray-700 dark:text-gray-300 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onBrandToggle && onBrandToggle(brandName)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:bg-dark-card dark:border-dark-border"
                />
                <span>{brandName}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
