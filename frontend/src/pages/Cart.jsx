import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyState from '../components/common/EmptyState';
import Breadcrumb from '../components/common/Breadcrumb';
import { useCart } from '../hooks/useCart';
import { fadeIn } from '../animations/variants';

/**
 * Cart Page Component
 * Renders user's cart items, subtotal calculation, free shipping progress, coupon code box, and order summary.
 */
const Cart = () => {
  const { cart = [], clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6">
      <Breadcrumb items={[{ label: 'Shopping Cart' }]} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Shopping Bag
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mt-1">
            My Cart ({cart.length})
          </h1>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-500 transition-colors"
          >
            <FiTrash2 className="w-4 h-4" />
            <span>Clear Cart</span>
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <EmptyState
          icon={FiShoppingCart}
          title="Your cart is empty"
          description="Looks like you haven't added any products to your shopping bag yet."
          actionLabel="Start Shopping"
          actionIcon={<FiShoppingBag className="w-4 h-4" />}
          onAction={() => navigate('/shop')}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 bg-white dark:bg-dark-card border border-gray-200/80 dark:border-dark-border rounded-3xl overflow-hidden shadow-xs">
            {cart.map((item, idx) => (
              <CartItem key={item.product?._id || item.product?.id || idx} item={item} />
            ))}
          </div>

          {/* Summary Panel */}
          <div className="lg:col-span-4 sticky top-24">
            <CartSummary subtotal={subtotal} />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;


