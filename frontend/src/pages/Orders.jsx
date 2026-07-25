import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiChevronDown,
  FiChevronUp,
  FiLock,
  FiMapPin,
  FiZap,
} from 'react-icons/fi';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';
import InvoiceModal from '../components/invoice/InvoiceModal';
import OrderTrackingModal from '../components/orders/OrderTrackingModal';
import { useAuth } from '../hooks/useAuth';
import { products } from '../data/products';
import { fadeIn } from '../animations/variants';
import { formatCurrency, formatDate } from '../utils/formatters';

/**
 * Orders Page Component - Indian Marketplace Order History & Live Tracking
 */
const Orders = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [showOrderSuccessToast, setShowOrderSuccessToast] = useState(false);

  useEffect(() => {
    // Load orders from localStorage or default mock orders
    const savedOrders = JSON.parse(localStorage.getItem('shopsphere_orders') || '[]');
    if (savedOrders.length > 0) {
      setOrders(savedOrders);
      setExpandedOrderId(savedOrders[0].id);
    } else {
      const defaultMock = [
        {
          id: 'ORD-98421',
          createdAt: new Date().toISOString(),
          totalAmount: 2499,
          status: 'Out for Delivery',
          paymentMethod: 'UPI (Google Pay)',
          shippingAddress: {
            name: 'Rahul Sharma',
            phone: '+91 9876543210',
            street: '42, Barakhamba Road, Connaught Place',
            city: 'New Delhi',
            state: 'Delhi',
            pincode: '110001',
          },
          items: [{ product: products[0], quantity: 1 }],
          deliveryPartner: 'Shadowfax Express Rider',
          trackingNumber: 'SFX-908123984',
        },
        {
          id: 'ORD-84102',
          createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          totalAmount: 9995,
          status: 'Delivered',
          paymentMethod: 'Credit Card (RuPay)',
          shippingAddress: {
            name: 'Rahul Sharma',
            phone: '+91 9876543210',
            street: '42, Barakhamba Road',
            city: 'New Delhi',
            state: 'Delhi',
            pincode: '110001',
          },
          items: [{ product: products[3], quantity: 1 }],
          deliveryPartner: 'BlueDart Express',
          trackingNumber: 'BLU-776123001',
        },
      ];
      setOrders(defaultMock);
      setExpandedOrderId(defaultMock[0].id);
    }

    if (location.state?.newOrderPlaced) {
      setShowOrderSuccessToast(true);
    }
  }, [location]);

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

      <div>
        <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
          PURCHASES & SHIPMENT TIMELINE
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
          My Order History
        </h1>
      </div>

      <div className="space-y-6">
        {orders.map((order) => {
          const isExpanded = expandedOrderId === order.id;
          return (
            <div
              key={order.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs transition-all"
            >
              {/* Order Bar Header */}
              <div
                onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                className="p-5 md:p-6 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 rounded-2xl">
                    <FiPackage className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-base text-slate-900 dark:text-slate-100">
                        Order #{order.id}
                      </h3>
                      <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">
                      Placed on {formatDate(order.createdAt)} • {order.items.length} Item(s)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-lg font-black text-slate-900 dark:text-slate-100">
                    {formatCurrency(order.totalAmount)}
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
                          Delivery Partner: {order.deliveryPartner || 'Shadowfax Rider'}
                        </strong>
                        <p className="text-slate-500">Tracking Waybill: {order.trackingNumber || 'SFX-908123984'}</p>
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
                      Order Products ({order.items.length})
                    </h4>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                      {order.items.map((item, idx) => {
                        const p = item.product || item;
                        return (
                          <div key={idx} className="py-3 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                              />
                              <div>
                                <h5 className="font-extrabold text-slate-900 dark:text-slate-100">
                                  {p.name}
                                </h5>
                                <p className="text-slate-500 font-medium">Qty: {item.quantity || 1}</p>
                              </div>
                            </div>
                            <span className="font-black text-slate-900 dark:text-slate-100">
                              {formatCurrency((p.price || 0) * (item.quantity || 1))}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
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

      {/* Invoice Modal Trigger */}
      <InvoiceModal
        isOpen={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        order={selectedInvoice}
      />

      {/* Order Tracking Modal Trigger */}
      <OrderTrackingModal
        isOpen={!!selectedTrackingOrder}
        onClose={() => setSelectedTrackingOrder(null)}
        order={selectedTrackingOrder}
      />
    </motion.div>
  );
};

export default Orders;
