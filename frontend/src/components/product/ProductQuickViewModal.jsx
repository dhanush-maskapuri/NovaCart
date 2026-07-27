import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Rating from './Rating';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { formatCurrency } from '../../utils/formatters';

/**
 * ProductQuickViewModal Component
 * Interactive modal overlay previewing key product details and quick actions.
 */
const ProductQuickViewModal = ({ isOpen, onClose, product }) => {
  const navigate = useNavigate();
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
    rating,
    reviewsCount,
    image,
    images = [],
    description,
    stock = 10,
    status,
  } = product;

  const displayImage = image || (images && images[0]?.url) || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';
  const isWishlisted = isInWishlist(_id);
  const isAvailable = stock > 0 && status !== 'out_of_stock';

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(_id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    if (isAvailable) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    if (isAvailable) {
      addToCart(product, 1);
      onClose();
      navigate('/checkout');
    }
  };

  const handleViewDetails = () => {
    onClose();
    navigate(`/product/${_id}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick Product Preview" size="xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Product Image */}
        <div className="relative aspect-square w-full rounded-2xl bg-gray-100 dark:bg-slate-950 overflow-hidden border border-gray-200 dark:border-slate-800">
          <img src={displayImage} alt={name} className="w-full h-full object-cover" />
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-md">
              -{discount}% OFF
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {brand || category}
            </span>
            {isAvailable ? (
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                In Stock ({stock})
              </span>
            ) : (
              <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                Out of Stock
              </span>
            )}
          </div>

          <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 leading-snug">{name}</h3>

          <Rating rating={rating} reviewsCount={reviewsCount} />

          <div className="flex items-baseline gap-3 my-1">
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100">{formatCurrency(price)}</span>
            {originalPrice > price && (
              <span className="text-sm text-slate-400 line-through font-semibold">{formatCurrency(originalPrice)}</span>
            )}
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
            {description}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <Button
              onClick={handleAddToCart}
              isDisabled={!isAvailable}
              leftIcon={<FiShoppingCart className="w-4 h-4" />}
              className="flex-1"
            >
              Add to Cart
            </Button>

            <Button
              variant="secondary"
              onClick={handleBuyNow}
              isDisabled={!isAvailable}
              rightIcon={<FiArrowRight className="w-4 h-4" />}
              className="flex-1"
            >
              Buy Now
            </Button>

            <button
              onClick={handleWishlistToggle}
              aria-label="Wishlist toggle"
              className={`p-2.5 rounded-xl border transition-colors ${
                isWishlisted
                  ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/40 dark:border-rose-900'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <FiHeart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
            </button>
          </div>

          <button
            onClick={handleViewDetails}
            className="flex items-center justify-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline pt-2"
          >
            <span>View Full Details & Technical Specs</span>
            <FiExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductQuickViewModal;
