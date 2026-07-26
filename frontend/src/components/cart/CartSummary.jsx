import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiShield, FiTag, FiCheck, FiInfo } from 'react-icons/fi';
import Button from '../common/Button';
import { formatCurrency, calculateGST } from '../../utils/formatters';

/**
 * CartSummary Component - NOVACART
 * Order calculation in ₹, GST tax breakdown, Platform Fee, Indian Coupon Codes.
 */
const CartSummary = ({ subtotal = 0, items = [], onCheckout }) => {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState('');
  const [promoError, setPromoError] = useState('');

  const validPromos = {
    NOVACART100: 500,
    FESTIVE500: 500,
    INDIA100: 200,
    GROCERY10: 100,
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();

    if (validPromos[code]) {
      setAppliedDiscount(validPromos[code]);
      setAppliedCode(code);
      setPromoCode('');
    } else {
      setPromoError('Invalid coupon code. Try NOVACART100 or FESTIVE500');
    }
  };

  const gstBreakdown = calculateGST(subtotal);
  const deliveryFee = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const platformFee = items.length > 0 ? 7 : 0;
  const packingFee = items.length > 0 ? 15 : 0;
  const total = Math.max(0, subtotal - appliedDiscount + deliveryFee + platformFee + packingFee);

  return (
    <div className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-6 sticky top-24">
      <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
        Order Financial Summary
      </h3>

      {/* Estimated Delivery Banner */}
      <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-300">
        <span>⚡ Estimated Delivery:</span>
        <span className="font-black">10-Min Express (NovaMart) / Tomorrow</span>
      </div>

      {/* Promo Code Form */}
      <form onSubmit={handleApplyPromo} className="space-y-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Coupon Code (e.g. NOVACART100)"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-bold font-mono rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 uppercase"
            />
            <FiTag className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-colors"
          >
            Apply
          </button>
        </div>

        {promoError && (
          <p className="text-[11px] font-bold text-rose-500">{promoError}</p>
        )}

        {appliedCode && (
          <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-xs font-bold text-emerald-600 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <FiCheck className="w-4 h-4" />
              <span>Coupon {appliedCode} Applied! (-{formatCurrency(appliedDiscount)})</span>
            </span>
            <button
              onClick={() => {
                setAppliedDiscount(0);
                setAppliedCode('');
              }}
              className="text-[10px] text-rose-500 hover:underline"
            >
              Remove
            </button>
          </div>
        )}
      </form>

      {/* Summary Rows */}
      <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
        <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 font-semibold">
          <span>Items Subtotal</span>
          <span className="font-bold text-slate-900 dark:text-slate-100">{formatCurrency(subtotal)}</span>
        </div>

        {appliedDiscount > 0 && (
          <div className="flex items-center justify-between text-emerald-600 font-bold">
            <span>Festive Coupon Savings</span>
            <span>-{formatCurrency(appliedDiscount)}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 font-semibold">
          <span>Platform & Tech Fee</span>
          <span className="font-bold text-slate-900 dark:text-slate-100">{formatCurrency(platformFee)}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 font-semibold">
          <span>Safety Packing & Handling Fee</span>
          <span className="font-bold text-slate-900 dark:text-slate-100">{formatCurrency(packingFee)}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 font-semibold">
          <span>Delivery Charge</span>
          {deliveryFee === 0 ? (
            <span className="font-extrabold text-emerald-600">FREE</span>
          ) : (
            <span className="font-bold text-slate-900 dark:text-slate-100">{formatCurrency(deliveryFee)}</span>
          )}
        </div>

        {/* GST Tax Breakdown Box */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1 text-[11px]">
          <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
            <span>Includes 18% GST (CGST + SGST):</span>
            <span className="text-blue-600 font-mono font-bold">{formatCurrency(gstBreakdown.totalGst)}</span>
          </div>
          <p className="text-[10px] text-slate-400">
            Input Tax Credit ready invoice available on checkout.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-baseline justify-between text-base font-black text-slate-900 dark:text-slate-100">
          <span>Grand Total</span>
          <span className="text-xl text-blue-600 dark:text-blue-400">{formatCurrency(total)}</span>
        </div>
      </div>

      <Button
        fullWidth
        size="lg"
        rightIcon={<FiArrowRight className="w-5 h-5" />}
        onClick={onCheckout || (() => navigate('/checkout'))}
      >
        Proceed to Secure Checkout
      </Button>

      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-bold">
        <FiShield className="w-3.5 h-3.5 text-emerald-500" />
        <span>Instant UPI Refunds & 100% Genuine Brands</span>
      </div>
    </div>
  );
};

export default CartSummary;
