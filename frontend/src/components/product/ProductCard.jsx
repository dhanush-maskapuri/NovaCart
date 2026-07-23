import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import Card from '../common/Card';
import Rating from './Rating';
import ProductQuickViewModal from './ProductQuickViewModal';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

/**
 * ProductCard Component
 * Modern Apple/Nike inspired card with smooth Framer Motion interactions, badge overlays, rating, wishlist toggle, and quick view modal trigger.
 */
const ProductCard = ({ product }) => {
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
    isNew,
    isBestSeller,
  } = product;

  const isWishlisted = isInWishlist(_id);

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
    addToCart(product);
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
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="group relative flex flex-col h-full bg-white dark:bg-dark-card border border-gray-200/80 dark:border-dark-border rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300"
      >
        {/* Product Image Container */}
        <div className="relative aspect-square w-full bg-gray-100 dark:bg-gray-800/50 overflow-hidden">
          <Link to={`/product/${_id}`} className="block w-full h-full">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
            />
          </Link>

          {/* Badges Container */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {discount > 0 && (
              <span className="bg-red-500 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
                -{discount}%
              </span>
            )}
            {isNew && (
              <span className="bg-emerald-500 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
                NEW
              </span>
            )}
            {isBestSeller && !discount && (
              <span className="bg-amber-500 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
                BESTSELLER
              </span>
            )}
          </div>

          {/* Quick Action Overlay Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            {/* Wishlist Button */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleWishlistToggle}
              aria-label="Wishlist toggle"
              className={`p-2.5 rounded-full backdrop-blur-md shadow-md transition-colors ${
                isWishlisted
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/80 dark:bg-dark-card/80 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-dark-card'
              }`}
            >
              <FiHeart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
            </motion.button>

            {/* Quick View Button */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleQuickView}
              aria-label="Quick View product"
              className="p-2.5 rounded-full bg-white/80 dark:bg-dark-card/80 backdrop-blur-md text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-dark-card shadow-md transition-colors opacity-0 group-hover:opacity-100"
            >
              <FiEye className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col flex-grow p-5 justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              {brand || category}
            </span>

            <Link to={`/product/${_id}`}>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2 mt-0.5 mb-1.5">
                {name}
              </h3>
            </Link>

            <Rating rating={rating} reviewsCount={reviewsCount} size="xs" />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-dark-border/60">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-gray-900 dark:text-gray-100">
                ${price}
              </span>
              {originalPrice > price && (
                <span className="text-xs text-gray-400 line-through font-medium">
                  ${originalPrice}
                </span>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleAddToCart}
              aria-label="Add to cart"
              className="p-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white shadow-sm transition-colors"
            >
              <FiShoppingCart className="w-4 h-4" />
            </motion.button>
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
