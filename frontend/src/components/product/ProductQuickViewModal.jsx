import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiExternalLink } from 'react-icons/fi';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Rating from './Rating';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

/**
 * ProductQuickViewModal Component
 * Interactive modal overlay previewing key product details and quick actions.
 */
const ProductQuickViewModal = ({ isOpen, onClose, product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const { _id, name, brand, category, price, originalPrice, discount, rating, reviewsCount, image, description } = product;
  const isWishlisted = isInWishlist(_id);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(_id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleViewDetails = () => {
    onClose();
    navigate(`/product/${_id}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick Product Preview" size="xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Product Image */}
        <div className="relative aspect-square w-full rounded-2xl bg-gray-100 dark:bg-dark-card overflow-hidden border border-gray-200 dark:border-dark-border">
          <img src={image} alt={name} className="w-full h-full object-cover" />
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            {brand || category}
          </span>

          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{name}</h3>

          <Rating rating={rating} reviewsCount={reviewsCount} />

          <div className="flex items-baseline gap-3 my-1">
            <span className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">${price}</span>
            {originalPrice > price && (
              <span className="text-sm text-gray-400 line-through">${originalPrice}</span>
            )}
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
            {description}
          </p>

          <div className="flex items-center gap-3 pt-4">
            <Button
              onClick={handleAddToCart}
              leftIcon={<FiShoppingCart className="w-4 h-4" />}
              className="flex-1"
            >
              Add to Cart
            </Button>

            <button
              onClick={handleWishlistToggle}
              aria-label="Wishlist toggle"
              className={`p-2.5 rounded-xl border transition-colors ${
                isWishlisted
                  ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/40 dark:border-rose-900'
                  : 'border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-bg'
              }`}
            >
              <FiHeart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
            </button>
          </div>

          <button
            onClick={handleViewDetails}
            className="flex items-center justify-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline pt-2"
          >
            <span>View Full Details & Reviews</span>
            <FiExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductQuickViewModal;
