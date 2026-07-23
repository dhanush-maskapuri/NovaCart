import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTag, FiTruck, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import Button from '../common/Button';

/**
 * CartSummary Component
 * Order breakdown panel with coupon discount calculator, shipping estimate, tax, and checkout trigger.
 */
const CartSummary = ({ subtotal = 0 }) => {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // percentage
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const freeShippingThreshold = 150;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const taxCost = Number((subtotal * 0.08).toFixed(2));
  const discountAmount = Number(((subtotal * appliedDiscount) / 100).toFixed(2));

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost + taxCost).toFixed(2);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    if (couponCode.toUpperCase() === 'SHOPSPHERE10' || couponCode.toUpperCase() === 'PROMO10') {
      setAppliedDiscount(10);
      setCouponSuccess('10% discount coupon applied successfully!');
    } else if (couponCode.trim() !== '') {
      setCouponError('Invalid coupon code. Try SHOPSPHERE10');
    }
  };

  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="flex flex-col gap-6 p-6 bg-white dark:bg-dark-card border border-gray-200/80 dark:border-dark-border rounded-3xl shadow-sm">
      <h3 className="font-extrabold text-xl text-gray-900 dark:text-gray-100">Order Summary</h3>

      {/* Free Shipping Progress Indicator */}
      <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border/60">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
            <FiTruck className="w-4 h-4 text-primary-500" />
            {subtotal >= freeShippingThreshold ? (
              <strong className="text-emerald-600 dark:text-emerald-400">
                Congratulations! You unlocked Free Shipping
              </strong>
            ) : (
              <span>Add ${(freeShippingThreshold - subtotal).toFixed(2)} for Free Shipping</span>
            )}
          </span>
        </div>

        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-600 rounded-full transition-all duration-300"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Breakdown Rows */}
      <div className="flex flex-col gap-3 text-sm border-b border-gray-100 dark:border-dark-border/60 pb-4">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Subtotal</span>
          <span className="font-bold text-gray-900 dark:text-gray-100">${subtotal.toFixed(2)}</span>
        </div>

        {appliedDiscount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
            <span>Promo Discount ({appliedDiscount}%)</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Shipping Estimate</span>
          <span className="font-bold text-gray-900 dark:text-gray-100">
            {shippingCost === 0 ? <strong className="text-emerald-500">FREE</strong> : `$${shippingCost}`}
          </span>
        </div>

        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Estimated Tax (8%)</span>
          <span className="font-bold text-gray-900 dark:text-gray-100">${taxCost}</span>
        </div>
      </div>

      {/* Coupon Code Section */}
      <form onSubmit={handleApplyCoupon} className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Promo code (e.g. SHOPSPHERE10)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 uppercase font-semibold"
            />
          </div>
          <Button type="submit" variant="secondary" size="sm" className="shrink-0">
            Apply
          </Button>
        </div>

        {couponError && <span className="text-[11px] font-semibold text-red-500">{couponError}</span>}
        {couponSuccess && (
          <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <FiCheckCircle className="w-3 h-3" />
            {couponSuccess}
          </span>
        )}
      </form>

      {/* Grand Total */}
      <div className="flex justify-between items-baseline pt-2">
        <span className="text-base font-extrabold text-gray-900 dark:text-gray-100">Total</span>
        <span className="text-2xl font-black text-primary-600 dark:text-primary-400">
          ${grandTotal}
        </span>
      </div>

      {/* Checkout CTA */}
      <Button
        size="lg"
        fullWidth
        rightIcon={<FiArrowRight className="w-5 h-5" />}
        onClick={() => navigate('/checkout')}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CartSummary;

