import { FiRotateCcw, FiFilter, FiZap, FiFileText } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { formatCurrency } from '../../utils/formatters';

/**
 * ProductFilter Component - NOVACART Catalog Sidebar Filter
 * Price Slider up to ₹2,50,000, 23 Indian & Global Brands, Express Delivery Filter.
 */
const ProductFilter = ({
  categories = [],
  selectedCategory = 'all',
  onCategoryChange,
  priceRange = [0, 250000],
  onPriceChange,
  selectedRating = 0,
  onRatingChange,
  inStockOnly = false,
  onInStockChange,
  expressOnly = false,
  onExpressChange,
  selectedBrands = [],
  onBrandToggle,
  onResetFilters,
  className = '',
}) => {
  const availableBrands = [
    'Apple', 'Samsung', 'OnePlus', 'Nothing', 'Boat', 'Noise', 'Titan',
    'Puma', 'Nike', 'Adidas', 'LG', 'Sony', 'IFB', 'Prestige', 'Milton',
    'Amul', 'Nestle', 'Tata', 'Aashirvaad', 'Fortune', 'Dove', 'Mamaearth', 'Minimalist'
  ];

  return (
    <div
      className={`flex flex-col gap-6 p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm ${className}`}
    >
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <FiFilter className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
            Catalog Filters
          </h3>
        </div>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <FiRotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Category</h4>
        <div className="flex flex-col gap-1.5 max-h-56 overflow-y-auto pr-1">
          <button
            onClick={() => onCategoryChange && onCategoryChange('all')}
            className={`flex items-center justify-between text-xs py-2 px-3 rounded-2xl font-bold transition-colors text-left ${
              selectedCategory === 'all'
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
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
                className={`flex items-center justify-between text-xs py-2 px-3 rounded-2xl font-bold transition-colors text-left ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>{catId}</span>
                {cat.count !== undefined && (
                  <span className="text-[10px] text-slate-400 font-normal">{cat.count}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter (in ₹) */}
      <div className="flex flex-col gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <h4 className="font-black uppercase tracking-wider text-slate-400">Price Range</h4>
          <span className="font-extrabold text-indigo-600 dark:text-indigo-400">
            {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="250000"
          step="1000"
          value={priceRange[1]}
          onChange={(e) => onPriceChange && onPriceChange([priceRange[0], Number(e.target.value)])}
          className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
      </div>

      {/* Express 10-Min Delivery Toggle */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
          <FiZap className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>10-Min Express Only</span>
        </div>
        <button
          onClick={() => onExpressChange && onExpressChange(!expressOnly)}
          className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
            expressOnly ? 'bg-amber-400 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
          }`}
        >
          <div className="w-4 h-4 rounded-full bg-slate-950 shadow-md" />
        </button>
      </div>

      {/* Minimum Rating */}
      <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Minimum Rating</h4>
        <div className="flex items-center gap-1.5">
          {[4, 3, 2, 1].map((starVal) => (
            <button
              key={starVal}
              onClick={() => onRatingChange && onRatingChange(selectedRating === starVal ? 0 : starVal)}
              className={`flex items-center gap-1 text-xs py-1 px-2.5 rounded-xl border font-bold transition-colors ${
                selectedRating === starVal
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              <span>{starVal}</span>
              <FaStar className="w-3 h-3 text-amber-300" />
              <span>+</span>
            </button>
          ))}
        </div>
      </div>

      {/* In Stock Only */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
        <span className="text-xs font-black uppercase tracking-wider text-slate-400">In Stock Only</span>
        <button
          onClick={() => onInStockChange && onInStockChange(!inStockOnly)}
          className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
            inStockOnly ? 'bg-indigo-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
          }`}
        >
          <div className="w-4 h-4 rounded-full bg-white shadow-md" />
        </button>
      </div>

      {/* Indian Brands Filter */}
      <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Verified Brands</h4>
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
          {availableBrands.map((brandName) => {
            const isChecked = selectedBrands.includes(brandName);
            return (
              <label
                key={brandName}
                className="flex items-center gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onBrandToggle && onBrandToggle(brandName)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
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
