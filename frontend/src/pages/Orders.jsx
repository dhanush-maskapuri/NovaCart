import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiFileText,
  FiChevronDown,
  FiChevronUp,
  FiLock,
  FiZap,
  FiRefreshCw,
  FiXCircle,
  FiRotateCcw,
} from 'react-icons/fi';
import Button from '../components/common/Button';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';
import InvoiceModal from '../components/invoice/InvoiceModal';
import OrderTrackingModal from '../components/orders/OrderTrackingModal';
import { useAuth } from '../hooks/useAuth';
import { fetchMyOrders, cancelOrderApi, returnOrderApi, reorderItemsApi } from '../services/orderService';
import { fadeIn } from '../animations/variants';
import { formatCurrency, formatDate } from '../utils/formatters';

/**
 * Orders Page Component - Live Order Tracking, Cancel, Return, Buy Again & GST Invoices
 */
const Orders = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [showOrderSuccessToast, setShowOrderSuccessToast] = useState(false);
  const [actionMsg, setActionMsg] = useState('');

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await fetchMyOrders();
      if (res && res.success && Array.isArray(res.data)) {
        setOrders(res.data);
        if (res.data.length > 0) {
          setExpandedOrderId(res.data[0]._id || res.data[0].id);
        }
      }
    } catch (err) {
      console.warn('Orders fetch warning:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadOrders();
    }
    if (location.state?.newOrderPlaced) {
      setShowOrderSuccessToast(true);
    }
  }, [user, location]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order? Item stock will be restored.')) return;
    try {
      await cancelOrderApi(orderId);
      setActionMsg('Order cancelled successfully.');
      await loadOrders();
    } catch (err) {
      alert(err.response?.data?.message || 'Error cancelling order');
    }
  };

  const handleReturnOrder = async (orderId) => {
    if (!window.confirm('Request return for this delivered order?')) return;
    try {
      await returnOrderApi(orderId);
      setActionMsg('Return request submitted for pickup.');
      await loadOrders();
    } catch (err) {
      alert(err.response?.data?.message || 'Error requesting return');
    }
  };

  const handleReorder = async (orderId) => {
    try {
      await reorderItemsApi(orderId);
      setActionMsg('Order items added back to cart!');
      navigate('/cart');
    } catch (err) {
      alert('Error reordering items');
    }
  };

  if (!user) {
    return (
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6">
        <Breadcrumb items={[{ label: 'Order History' }]} />
        <EmptyState
          icon={FiLock}
          title="Sign in to view your orders"
          description="Please sign in to track live 10-Min Shadowfax deliveries, view timeline stages, and print GST Tax Invoices."
          actionLabel="Sign In Now"
          onAction={() => navigate('/login')}
        />
      </motion.div>
    );
  }

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6">
      <Breadcrumb items={[{ label: 'Order History' }]} />

      {/* Success Notification Banner */}
      {showOrderSuccessToast && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-3xl bg-emerald-500 text-white font-bold text-xs flex items-center justify-between shadow-lg"
        >
          <div className="flex items-center gap-2">
            <FiCheckCircle className="w-5 h-5" />
            <span>🎉 Order placed successfully! Your 10-Min Express delivery rider is assigned.</span>
          </div>
          <button onClick={() => setShowOrderSuccessToast(false)} className="text-white text-xs underline">
            Dismiss
          </button>
        </motion.div>
      )}

      {actionMsg && (
        <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-bold text-xs">
          {actionMsg}
        </div>
      )}

      <div>
        <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
          PURCHASES & SHIPMENT TIMELINE
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
          My Order History ({orders.length})
        </h1>
      </div>

      {loading ? (
        <div className="p-12 text-center text-xs font-bold text-slate-400">Loading live orders...</div>
      ) : orders.length === 0 ? (
        <EmptyState
          icon={FiPackage}
          title="No Orders Yet"
          description="Place your first order to experience 10-Min NovaMart express delivery!"
          actionLabel="Shop Catalog"
          onAction={() => navigate('/shop')}
        />
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const orderId = order._id || order.id;
            const isExpanded = expandedOrderId === orderId;
            const status = order.orderStatus || order.status || 'Placed';
            const items = order.orderItems || order.items || [];
            const grandTotal = order.totalPrice || order.totalAmount || 0;

            let badgeColor = 'bg-indigo-100 text-indigo-700';
            if (status === 'Delivered') badgeColor = 'bg-emerald-100 text-emerald-700';
            if (status === 'Cancelled') badgeColor = 'bg-rose-100 text-rose-700';
            if (status === 'Returned') badgeColor = 'bg-amber-100 text-amber-700';

            return (
              <div
                key={orderId}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs transition-all"
              >
                {/* Order Bar Header */}
                <div
                  onClick={() => setExpandedOrderId(isExpanded ? null : orderId)}
                  className="p-5 md:p-6 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 rounded-2xl">
                      <FiPackage className="w-6 h-6" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-base text-slate-900 dark:text-slate-100">
                          Invoice #{order.invoiceNumber || orderId}
                        </h3>
                        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${badgeColor}`}>
                          {status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        Placed on {formatDate(order.createdAt)} • {items.length} Item(s)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-lg font-black text-slate-900 dark:text-slate-100">
                      {formatCurrency(grandTotal)}
                    </span>
                    {isExpanded ? (
                      <FiChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <FiChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Order Details */}
                {isExpanded && (
                  <div className="p-6 md:p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/40 space-y-6">
                    {/* Shipment Rider Details */}
                    <div className="flex flex-wrap items-center justify-between p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 gap-4">
                      <div className="flex items-center gap-3">
                        <FiZap className="w-5 h-5 text-amber-500 fill-amber-500" />
                        <div className="text-xs">
                          <strong className="text-slate-900 dark:text-slate-100 font-black">
                            Courier Partner: {order.courierPartner || 'Shadowfax Rider'}
                          </strong>
                          <p className="text-slate-500">Tracking ID: {order.trackingId || 'TRK-SFX-908123984'}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedTrackingOrder(order)}
                        className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5"
                      >
                        <FiTruck className="w-4 h-4" />
                        <span>Live Timeline</span>
                      </button>
                    </div>

                    {/* Items List */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                        Order Products ({items.length})
                      </h4>
                      <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {items.map((item, idx) => {
                          const p = item.product || item;
                          return (
                            <div key={idx} className="py-3 flex items-center justify-between text-xs">
                              <div className="flex items-center gap-3">
                                <img
                                  src={p.image || item.image}
                                  alt={p.name || item.name}
                                  className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                                />
                                <div>
                                  <h5 className="font-extrabold text-slate-900 dark:text-slate-100">
                                    {p.name || item.name}
                                  </h5>
                                  <p className="text-slate-500 font-medium">Qty: {item.quantity || 1}</p>
                                </div>
                              </div>
                              <span className="font-black text-slate-900 dark:text-slate-100">
                                {formatCurrency((item.price || p.price || 0) * (item.quantity || 1))}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Buttons: Cancel, Return, Buy Again, Invoice */}
                    <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                      {['Placed', 'Confirmed', 'Processing'].includes(status) && (
                        <Button
                          variant="secondary"
                          size="sm"
                          leftIcon={<FiXCircle className="w-4 h-4 text-rose-500" />}
                          onClick={() => handleCancelOrder(orderId)}
                        >
                          Cancel Order
                        </Button>
                      )}

                      {status === 'Delivered' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          leftIcon={<FiRotateCcw className="w-4 h-4 text-amber-500" />}
                          onClick={() => handleReturnOrder(orderId)}
                        >
                          Return Items
                        </Button>
                      )}

                      <Button
                        variant="secondary"
                        size="sm"
                        leftIcon={<FiRefreshCw className="w-4 h-4" />}
                        onClick={() => handleReorder(orderId)}
                      >
                        Buy Again
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<FiFileText className="w-4 h-4" />}
                        onClick={() => setSelectedInvoice(order)}
                      >
                        Print GST Tax Invoice
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Invoice Modal */}
      <InvoiceModal
        isOpen={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        order={selectedInvoice}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={!!selectedTrackingOrder}
        onClose={() => setSelectedTrackingOrder(null)}
        order={selectedTrackingOrder}
      />
    </motion.div>
  );
};

export default Orders;
