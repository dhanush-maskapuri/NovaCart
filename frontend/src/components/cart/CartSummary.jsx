import Button from '../common/Button';

const CartSummary = ({ subtotal = 0 }) => {
  return (
    <div className="p-6 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl space-y-4">
      <h3 className="font-bold text-lg">Order Summary</h3>
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Shipping</span>
        <span>Free</span>
      </div>
      <div className="border-t border-gray-200 dark:border-dark-border pt-4 flex justify-between font-bold text-base">
        <span>Total</span>
        <span className="text-primary-600 dark:text-primary-400">₹{subtotal}</span>
      </div>
      <Button className="w-full">Proceed to Checkout</Button>
    </div>
  );
};

export default CartSummary;
