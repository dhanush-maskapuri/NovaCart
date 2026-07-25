import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMapPin,
  FiClock,
  FiCreditCard,
  FiCheckCircle,
  FiArrowRight,
  FiCheck,
  FiShield,
  FiTruck,
  FiDollarSign,
} from 'react-icons/fi';
import Breadcrumb from '../components/common/Breadcrumb';
import Button from '../components/common/Button';
import { useCart } from '../hooks/useCart';
import { formatCurrency, calculateGST } from '../utils/formatters';
import { PAYMENT_METHODS, INDIAN_STATES } from '../utils/constants';

/**
 * Checkout Page Component - Indian Marketplace Checkout Overhaul
 * 4-Step Checkout Progress (Address -> Delivery Slot -> Payment Method -> Order Review).
 */
const Checkout = () => {
  const { cart = [], cartSubtotal = 0, clearCart } = useCart();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  // Address State
  const [address, setAddress] = useState({
    name: 'Rahul Sharma',
    phone: '+91 9876543210',
    pincode: '110001',
    street: '42, Barakhamba Road, Connaught Place',
    city: 'New Delhi',
    state: 'Delhi',
    addressType: 'Home',
  });

  // Delivery Slot State
  const [selectedSlot, setSelectedSlot] = useState('express');

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('rahul@okicici');

  const gstBreakdown = calculateGST(cartSubtotal);
  const deliveryFee = cartSubtotal >= 499 || cartSubtotal === 0 ? 0 : 49;
  const grandTotal = cartSubtotal + deliveryFee;

  const handlePlaceOrder = () => {
    const newOrder = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      items: [...cart],
      totalAmount: grandTotal,
      shippingAddress: { ...address },
      paymentMethod: PAYMENT_METHODS.find((p) => p.id === paymentMethod)?.label || paymentMethod,
      status: 'Out for Delivery',
      deliverySlot: selectedSlot === 'express' ? '10-Min Express' : 'Standard Delivery',
    };

    const existingOrders = JSON.parse(localStorage.getItem('shopsphere_orders') || '[]');
    localStorage.setItem('shopsphere_orders', JSON.stringify([newOrder, ...existingOrders]));

    clearCart();
    navigate('/orders', { state: { newOrderPlaced: true } });
  };

  const steps = [
    { num: 1, label: 'Address', icon: FiMapPin },
    { num: 2, label: 'Delivery Slot', icon: FiClock },
    { num: 3, label: 'Payment', icon: FiCreditCard },
    { num: 4, label: 'Review & Place', icon: FiCheckCircle },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-5xl mx-auto">
      <Breadcrumb items={[{ label: 'Checkout & Place Order' }]} />

      <div className="text-center max-w-lg mx-auto">
        <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
          SECURE INDIAN CHECKOUT
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
          Complete Your Order
        </h1>
      </div>

      {/* 4-Step Progress Bar Header */}
      <div className="flex items-center justify-between relative max-w-3xl mx-auto border-b border-slate-200 dark:border-slate-800 pb-6">
        {steps.map((s) => {
          const Icon = s.icon;
          const isDone = currentStep > s.num;
          const isCurrent = currentStep === s.num;
          return (
            <div key={s.num} className="flex flex-col items-center gap-2 relative z-10">
              <button
                onClick={() => s.num < currentStep && setCurrentStep(s.num)}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs transition-all ${
                  isDone
                    ? 'bg-emerald-500 text-white shadow-md'
                    : isCurrent
                    ? 'bg-indigo-600 text-white shadow-lg scale-110'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                {isDone ? <FiCheck className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </button>
              <span className={`text-xs font-bold ${isCurrent ? 'text-indigo-600' : 'text-slate-500'}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step Content & Summary Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Form Step */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          {/* STEP 1: SHIPPING ADDRESS */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <FiMapPin className="w-5 h-5 text-indigo-600" />
                <span>1. Delivery Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs font-bold rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">Mobile Number</label>
                  <input
                    type="text"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs font-bold rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">Indian Pincode (6 digits)</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs font-bold rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs font-bold rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-500 block mb-1">House / Flat No., Street, Landmark</label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs font-bold rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">State</label>
                  <select
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs font-bold rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">Address Type</label>
                  <div className="flex gap-2">
                    {['Home', 'Office', 'Other'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setAddress({ ...address, addressType: t })}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                          address.addressType === t
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button onClick={() => setCurrentStep(2)} rightIcon={<FiArrowRight />}>
                  Continue to Delivery Slot
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: DELIVERY SLOT */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <FiClock className="w-5 h-5 text-indigo-600" />
                <span>2. Choose Delivery Slot</span>
              </h3>

              <div className="space-y-3">
                <label
                  onClick={() => setSelectedSlot('express')}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedSlot === 'express'
                      ? 'border-amber-500 bg-amber-500/10'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">⚡ 10-MIN</span>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                        NovaMart 10-Min Express Delivery
                      </h4>
                      <p className="text-[11px] text-slate-500">Delivered by Shadowfax Rider directly to your door</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-600">FREE</span>
                </label>

                <label
                  onClick={() => setSelectedSlot('today')}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedSlot === 'today'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FiTruck className="w-5 h-5 text-indigo-600" />
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                        Same Day Evening Slot (5 PM - 8 PM)
                      </h4>
                      <p className="text-[11px] text-slate-500">Standard verified courier slot</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-600">FREE</span>
                </label>
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="secondary" onClick={() => setCurrentStep(1)}>Back</Button>
                <Button onClick={() => setCurrentStep(3)} rightIcon={<FiArrowRight />}>
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <FiCreditCard className="w-5 h-5 text-indigo-600" />
                <span>3. Select Payment Option</span>
              </h3>

              <div className="space-y-3">
                {PAYMENT_METHODS.map((pm) => (
                  <div
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === pm.id
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{pm.icon}</span>
                        <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-100">{pm.label}</h4>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === pm.id ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`} />
                    </div>

                    {paymentMethod === 'upi' && pm.id === 'upi' && (
                      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter VPA / UPI ID e.g. name@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white font-mono font-bold"
                        />
                        <button className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold">Verify UPI</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="secondary" onClick={() => setCurrentStep(2)}>Back</Button>
                <Button onClick={() => setCurrentStep(4)} rightIcon={<FiArrowRight />}>
                  Review & Place Order
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: ORDER REVIEW */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <FiCheckCircle className="w-5 h-5 text-emerald-600" />
                <span>4. Final Order Review</span>
              </h3>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between font-bold">
                  <span>Shipping Address:</span>
                  <span className="text-slate-900 dark:text-slate-100">{address.name}, {address.street}, {address.city} - {address.pincode}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Delivery Speed:</span>
                  <span className="text-amber-500 font-extrabold">{selectedSlot === 'express' ? '10-Min Express' : 'Same-Day Evening'}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Payment Gateway:</span>
                  <span className="text-indigo-600">{PAYMENT_METHODS.find((p) => p.id === paymentMethod)?.label}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="secondary" onClick={() => setCurrentStep(3)}>Back</Button>
                <Button size="lg" onClick={handlePlaceOrder} className="bg-emerald-600 hover:bg-emerald-700">
                  Pay & Place Order ({formatCurrency(grandTotal)})
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Summary Sidebar */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm sticky top-24 space-y-4">
          <h3 className="font-black text-base text-slate-900 dark:text-slate-100">Summary ({cart.length} Items)</h3>

          <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 pr-1">
            {cart.map((item, idx) => (
              <div key={idx} className="py-2 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[160px]">
                  {item.product?.name} x{item.quantity}
                </span>
                <span className="font-black">{formatCurrency((item.product?.price || 0) * (item.quantity || 1))}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-500 font-bold">
              <span>Item Subtotal:</span>
              <span>{formatCurrency(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-500 font-bold">
              <span>GST (18% Included):</span>
              <span>{formatCurrency(gstBreakdown.totalGst)}</span>
            </div>
            <div className="flex justify-between text-slate-500 font-bold">
              <span>Delivery Fee:</span>
              <span className="text-emerald-600 font-black">FREE</span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 dark:text-slate-100 pt-2 border-t">
              <span>Grand Total:</span>
              <span className="text-indigo-600">{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
