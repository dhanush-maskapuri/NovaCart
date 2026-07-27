import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiEye, FiZap, FiCheck, FiAlertTriangle, FiArrowRight } from 'react-icons/fi';
import Rating from './Rating';
import ProductQuickViewModal from './ProductQuickViewModal';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { formatCurrency } from '../../utils/formatters';

/**
 * ProductCard Component - 4-Tier Stock System & Buy Now Action
 */
const ProductCard = ({ product, onCompareToggle, isCompared }) => {
  const navigate = useNavigate();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const {
    _id,
    name,
    brand,
    category,
    price,
    originalPrice,
    discount,
    rating = 4.8,
    reviewsCount = 42,
    image,
    images = [],
    isNew,
    isBestSeller,
    stock = 10,
    status,
    deliveryTime = '10 Mins Express',
  } = product;

  const displayImage = image || (images && images[0]?.url) || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';
  const isWishlisted = isInWishlist(_id);
  const isAvailable = stock > 0 && status !== 'out_of_stock';

  // Determine Stock Badge (4 Tiers)
  const getStockBadge = () => {
    if (!isAvailable) {
      return (
        <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 uppercase tracking-wider">
          <FiAlertTriangle className="w-2.5 h-2.5" /> Out of Stock
        </span>
      );
    }
    if (stock <= 5) {
      return (
        <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
          🔥 Low Stock! Only {stock} Left
        </span>
      );
    }
    if (stock <= 15) {
      return (
        <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
          Limited Stock
        </span>
      );
    }
    return (
      <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
        Available
      </span>
    );
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(_id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAvailable) {
      addToCart(product);
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAvailable) {
      addToCart(product, 1);
      navigate('/checkout');
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="group relative flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl hover:border-indigo-500/30 transition-all duration-300"
      >
        {/* Product Image Box */}
        <div className="relative aspect-square w-full bg-slate-100 dark:bg-slate-950/60 overflow-hidden">
          <Link to={`/product/${_id}`} className="block w-full h-full">
            <img
              src={displayImage}
              alt={name}
              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
            />
          </Link>

          {/* Badges Container */}
          <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5 z-10 pointer-events-none">
            {discount > 0 && (
              <span className="bg-gradient-to-r from-red-600 to-rose-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                {discount}% OFF
              </span>
            )}
            {getStockBadge()}
            {isNew && (
              <span className="bg-emerald-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
                NEW
              </span>
            )}
            {isBestSeller && !discount && (
              <span className="bg-indigo-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
                BESTSELLER
              </span>
            )}
          </div>

          {/* Quick Action Floating Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            {/* Wishlist Button */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleWishlistToggle}
              aria-label="Wishlist toggle"
              className={`p-2.5 rounded-full backdrop-blur-md shadow-md transition-colors ${
                isWishlisted
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-900'
              }`}
            >
              <FiHeart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
            </motion.button>

            {/* Quick View Button */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleQuickView}
              aria-label="Quick View product"
              className="p-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-900 shadow-md transition-colors opacity-0 group-hover:opacity-100"
            >
              <FiEye className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Compare Checkbox Overlay */}
          {onCompareToggle && (
            <div className="absolute bottom-2 left-3 z-10">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onCompareToggle(product);
                }}
                className={`text-[10px] font-bold px-2 py-1 rounded-lg backdrop-blur-md transition-colors flex items-center gap-1 ${
                  isCompared
                    ? 'bg-indigo-600 text-white'
                    : 'bg-black/40 text-white hover:bg-black/60'
                }`}
              >
                {isCompared ? <FiCheck className="w-3 h-3" /> : null}
                <span>{isCompared ? 'Compared' : '+ Compare'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col flex-grow p-5 justify-between gap-3">
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              <span>{brand || category}</span>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">
                GST Eligible
              </span>
            </div>

            <Link to={`/product/${_id}`}>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                {name}
              </h3>
            </Link>

            <div className="mt-2">
              <Rating rating={rating} reviewsCount={reviewsCount} size="xs" />
            </div>
          </div>

          {/* Price & Buy Now / Add to Cart Controls */}
          <div className="flex flex-col gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex items-baseline gap-1.5 justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                  {formatCurrency(price)}
                </span>
                {originalPrice > price && (
                  <span className="text-xs text-slate-400 line-through font-medium">
                    {formatCurrency(originalPrice)}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold text-emerald-600">Incl. GST</span>
            </div>

            {/* Action Buttons Row */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={!isAvailable}
                className={`py-2 px-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  isAvailable
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <FiShoppingCart className="w-3.5 h-3.5" />
                <span>Add</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBuyNow}
                disabled={!isAvailable}
                className={`py-2 px-3 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-1 ${
                  isAvailable
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Buy Now</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal Popup */}
      <ProductQuickViewModal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        product={product}
      />
    </>
  );
};

export default ProductCard;
