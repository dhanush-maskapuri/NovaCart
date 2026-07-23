import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

const Cart = () => {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl">
          <CartItem item={{ name: 'Sample Item', quantity: 1, price: 999 }} />
        </div>
      </div>
      <div>
        <CartSummary subtotal={999} />
      </div>
    </div>
  );
};

export default Cart;
