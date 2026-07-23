import { Link } from 'react-router-dom';
import { FiMinus, FiPlus, FiTrash2, FiHeart } from 'react-icons/fi';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

/**
 * CartItem Component
 * Renders individual item row in cart with image, quantity adjuster, subtotal, and wishlist transfer.
 */
const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const { addToWishlist } = useWishlist();

  if (!item || !item.product) return null;

  const { product, quantity = 1 } = item;
  const { name, brand, category, price, image } = product;
  const productId = product._id || product.id;

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(productId, quantity - 1);
    } else {
      removeFromCart(productId);
    }
  };

  const handleIncrease = () => {
    updateQuantity(productId, quantity + 1);
  };

  const handleMoveToWishlist = () => {
    addToWishlist(product);
    removeFromCart(productId);
  };

  const handleRemove = () => {
    removeFromCart(productId);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 border-b border-gray-100 dark:border-dark-border/60 gap-4 last:border-b-0">
      {/* Product Image & Info */}
      <div className="flex items-center gap-4 flex-1">
        <Link to={`/product/${productId}`} className="shrink-0">
          <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-dark-bg overflow-hidden border border-gray-200 dark:border-dark-border">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
        </Link>

        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            {brand || category}
          </span>
          <Link
            to={`/product/${productId}`}
            className="text-sm font-bold text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-1"
          >
            {name}
          </Link>
          <span className="text-xs font-bold text-gray-900 dark:text-gray-100 sm:hidden mt-1">
            ${price} each
          </span>
        </div>
      </div>

      {/* Controls & Subtotal */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0">
        {/* Quantity Controls */}
        <div className="flex items-center border border-gray-200 dark:border-dark-border rounded-xl bg-gray-50 dark:bg-dark-card">
          <button
            onClick={handleDecrease}
            aria-label="Decrease quantity"
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <FiMinus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-xs font-bold text-gray-900 dark:text-gray-100">
            {quantity}
          </span>
          <button
            onClick={handleIncrease}
            aria-label="Increase quantity"
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <FiPlus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Item Subtotal Price */}
        <div className="text-right min-w-[70px]">
          <span className="text-base font-extrabold text-gray-900 dark:text-gray-100">
            ${(price * quantity).toFixed(2)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleMoveToWishlist}
            title="Move to Wishlist"
            aria-label="Move to Wishlist"
            className="p-2 text-gray-400 hover:text-rose-500 rounded-lg transition-colors"
          >
            <FiHeart className="w-4 h-4" />
          </button>

          <button
            onClick={handleRemove}
            title="Remove Item"
            aria-label="Remove Item"
            className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;


