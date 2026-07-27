import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMapPin,
  FiClock,
  FiCreditCard,
  FiCheckCircle,
  FiArrowRight,
  FiCheck,
  FiPlus,
  FiFileText,
  FiTag,
  FiPrinter,
} from 'react-icons/fi';
import Breadcrumb from '../components/common/Breadcrumb';
import Button from '../components/common/Button';
import { useCart } from '../hooks/useCart';
import { fetchAddresses, addAddressApi } from '../services/addressService';
import { applyCouponApi } from '../services/couponService';
import { createOrderApi } from '../services/orderService';
import { formatCurrency, calculateGST } from '../utils/formatters';
import { PAYMENT_METHODS, INDIAN_STATES } from '../utils/constants';

/**
 * Checkout Page Component - Complete Multi-Step Flow with Address Book, Coupons & GST Invoice
 */
const Checkout = () => {
  const { cart = [], cartSubtotal = 0, clearCart } = useCart();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // New address form state
  const [newAddr, setNewAddr] = useState({
    fullName: '',
    phone: '',
    house: '',
    street: '',
    area: '',
    city: '',
    state: 'Delhi',
    pincode: '',
    country: 'India',
  });

  // Delivery & Payment
  const [selectedSlot, setSelectedSlot] = useState('express');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('user@upi');

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMsg, setCouponMsg] = useState('');

  // Order Placement & Modal
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const res = await fetchAddresses();
        if (res && res.success && Array.isArray(res.data)) {
          setAddresses(res.data);
          const defaultAddr = res.data.find((a) => a.isDefault) || res.data[0];
          if (defaultAddr) setSelectedAddress(defaultAddr);
        }
      } catch (err) {
        console.warn('Could not fetch addresses:', err);
      }
    };
    loadAddresses();
  }, []);

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!newAddr.fullName || !newAddr.phone || !newAddr.house || !newAddr.pincode) {
      alert('Please fill in required address fields.');
      return;
    }

    try {
      const res = await addAddressApi(newAddr);
      if (res && res.success && res.data) {
        setAddresses((prev) => [res.data, ...prev]);
        setSelectedAddress(res.data);
        setShowAddForm(false);
        setNewAddr({ fullName: '', phone: '', house: '', street: '', area: '', city: '', state: 'Delhi', pincode: '', country: 'India' });
      }
    } catch (err) {
      alert('Error saving address');
    }
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode) return;
    try {
      const res = await applyCouponApi(couponCode, cartSubtotal);
      if (res && res.success && res.data) {
        setAppliedCoupon(res.data);
        setCouponMsg(`Coupon ${res.data.code} applied! Discount: ${formatCurrency(res.data.discountAmount)}`);
      }
    } catch (err) {
      setCouponMsg(err.response?.data?.message || 'Invalid coupon code');
    }
  };

  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const gstBreakdown = calculateGST(cartSubtotal);
  const deliveryFee = cartSubtotal >= 499 || cartSubtotal === 0 ? 0 : 49;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  const handlePlaceOrder = async () => {
    if (!selectedAddress && !showAddForm) {
      alert('Please select or add a delivery address.');
      setCurrentStep(1);
      return;
    }

    setLoading(true);
    try {
      const finalAddr = selectedAddress || {
        street: `${newAddr.house}, ${newAddr.street}`,
        city: newAddr.city,
        state: newAddr.state,
        zipCode: newAddr.pincode,
        country: newAddr.country,
      };

      const orderPayload = {
        orderItems: cart.map((item) => ({
          product: item._id || item.product?._id || item.id,
          name: item.name || item.product?.name,
          price: item.price || item.product?.price,
          quantity: item.quantity || 1,
          image: item.image || item.product?.image,
        })),
        shippingAddress: {
          fullName: finalAddr.fullName || finalAddr.name || 'Customer',
          phone: finalAddr.phone || '9876543210',
          street: `${finalAddr.house || ''} ${finalAddr.street || ''}`,
          city: finalAddr.city || 'City',
          state: finalAddr.state || 'State',
          zipCode: finalAddr.pincode || finalAddr.zipCode || '110001',
          country: 'India',
        },
        paymentMethod: PAYMENT_METHODS.find((p) => p.id === paymentMethod)?.label || paymentMethod,
        discount: discountAmount,
        deliveryFee: deliveryFee,
      };

      const res = await createOrderApi(orderPayload);
      if (res && res.success && res.data) {
        setOrderSuccess(res.data);
        clearCart();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating order. Please check stock and try again.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { num: 1, label: 'Address', icon: FiMapPin },
    { num: 2, label: 'Delivery Slot', icon: FiClock },
    { num: 3, label: 'Payment', icon: FiCreditCard },
    { num: 4, label: 'Review & Place', icon: FiCheckCircle },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-5xl mx-auto">
      <Breadcrumb items={[{ label: 'Checkout & GST Invoice' }]} />

      <div className="text-center max-w-lg mx-auto">
        <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          OFFICIAL GST INVOICE CHECKOUT
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
              <span className={`text-xs font-bold ${isCurrent ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>
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
          {/* STEP 1: ADDRESS BOOK */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <FiMapPin className="w-5 h-5 text-indigo-600" />
                  <span>1. Select Delivery Address</span>
                </h3>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-bold text-xs flex items-center gap-1"
                >
                  <FiPlus /> Add New
                </button>
              </div>

              {/* Saved Address Cards */}
              {addresses.length > 0 && !showAddForm && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr._id}
                      onClick={() => setSelectedAddress(addr)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedAddress?._id === addr._id
                          ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40'
                          : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-extrabold text-xs text-slate-900 dark:text-slate-100">{addr.fullName}</span>
                        {addr.isDefault && (
                          <span className="text-[10px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded-full">DEFAULT</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{addr.house}, {addr.street}, {addr.city}</p>
                      <p className="text-xs font-bold text-slate-500 mt-1">{addr.state} - {addr.pincode} | Ph: {addr.phone}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Address Form */}
              {showAddForm && (
                <form onSubmit={handleAddAddress} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={newAddr.fullName}
                      onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                      className="w-full px-4 py-2 text-xs font-bold rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">Phone Number *</label>
                    <input
                      type="text"
                      required
                      value={newAddr.phone}
                      onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                      className="w-full px-4 py-2 text-xs font-bold rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">House / Flat / Building *</label>
                    <input
                      type="text"
                      required
                      value={newAddr.house}
                      onChange={(e) => setNewAddr({ ...newAddr, house: e.target.value })}
                      className="w-full px-4 py-2 text-xs font-bold rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">Street / Landmark *</label>
                    <input
                      type="text"
                      required
                      value={newAddr.street}
                      onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                      className="w-full px-4 py-2 text-xs font-bold rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={newAddr.city}
                      onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                      className="w-full px-4 py-2 text-xs font-bold rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">Pincode *</label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={newAddr.pincode}
                      onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value.replace(/\D/g, '') })}
                      className="w-full px-4 py-2 text-xs font-bold rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                    />
                  </div>
                  <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                    <Button variant="secondary" size="sm" onClick={() => setShowAddForm(false)}>Cancel</Button>
                    <Button type="submit" size="sm">Save & Use Address</Button>
                  </div>
                </form>
              )}

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
                    selectedSlot === 'express' ? 'border-amber-500 bg-amber-500/10' : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">⚡ 10-MIN</span>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                        NovaMart 10-Min Express Delivery
                      </h4>
                      <p className="text-[11px] text-slate-500">Delivered directly to your doorstep</p>
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
                  <span className="text-slate-900 dark:text-slate-100">
                    {selectedAddress ? `${selectedAddress.fullName}, ${selectedAddress.house}, ${selectedAddress.city} - ${selectedAddress.pincode}` : 'Standard Address'}
                  </span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Payment Gateway:</span>
                  <span className="text-indigo-600">{PAYMENT_METHODS.find((p) => p.id === paymentMethod)?.label}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="secondary" onClick={() => setCurrentStep(3)}>Back</Button>
                <Button size="lg" isDisabled={loading} onClick={handlePlaceOrder} className="bg-emerald-600 hover:bg-emerald-700">
                  {loading ? 'Processing GST Order...' : `Pay & Place Order (${formatCurrency(grandTotal)})`}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Summary Sidebar with Coupon Engine */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm sticky top-24 space-y-4">
          <h3 className="font-black text-base text-slate-900 dark:text-slate-100">Order Summary ({cart.length} Items)</h3>

          {/* Coupon Form */}
          <form onSubmit={handleApplyCoupon} className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
            <label className="text-[10px] font-bold uppercase text-slate-400">Apply Coupon Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="WELCOM10 / FESTIVE20"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="flex-1 px-3 py-2 text-xs font-mono font-bold rounded-xl border border-slate-200 dark:border-slate-800 uppercase"
              />
              <Button type="submit" size="sm">Apply</Button>
            </div>
            {couponMsg && <p className="text-[11px] font-bold text-indigo-600">{couponMsg}</p>}
          </form>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-500 font-bold">
              <span>Item Subtotal:</span>
              <span>{formatCurrency(cartSubtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-extrabold">
                <span>Coupon Savings:</span>
                <span>-{formatCurrency(discountAmount)}</span>
              </div>
            )}
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

      {/* Order Success & GST Invoice Modal */}
      <AnimatePresence>
        {orderSuccess && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mx-auto text-emerald-600">
                <FiCheckCircle className="w-10 h-10" />
              </div>

              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Order Placed Successfully!</h2>
              <p className="text-xs font-bold text-slate-500">Invoice Number: <strong className="text-indigo-600">{orderSuccess.invoiceNumber}</strong></p>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 text-left text-xs space-y-1 border">
                <p className="font-extrabold text-slate-900 dark:text-slate-100">GST Invoice Details (18% Inclusive)</p>
                <p className="text-slate-500">Company GSTIN: 27AAACN1234F1Z5</p>
                <p className="text-slate-500">Taxable Value: {formatCurrency(orderSuccess.gstDetails?.taxableAmount || 0)}</p>
                <p className="text-slate-500">Total GST Paid: {formatCurrency(orderSuccess.gstDetails?.totalGst || 0)}</p>
                <p className="font-extrabold text-emerald-600 pt-1">Total Paid: {formatCurrency(orderSuccess.totalPrice)}</p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="secondary" fullWidth onClick={() => window.print()} leftIcon={<FiPrinter />}>
                  Print GST Invoice
                </Button>
                <Button fullWidth onClick={() => navigate('/orders')}>
                  Go to Orders Dashboard
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Checkout;
