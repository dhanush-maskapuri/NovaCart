import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from 'react-icons/fi';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';
import Modal from '../components/common/Modal';
import { useAuth } from '../hooks/useAuth';
import { products } from '../data/products';
import { fadeIn } from '../animations/variants';

/**
 * Orders Page Component
 * Order history timeline, status tracker, and invoice card modal.
 */
const Orders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState('ORD-9842');

  if (!user) {
    return (
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6">
        <Breadcrumb items={[{ label: 'Order History' }]} />
        <EmptyState
          icon={FiLock}
          title="Sign in to view your orders"
          description="Please sign in to view your past purchases, shipment tracking timeline, and invoices."
          actionLabel="Sign In Now"
          onAction={() => navigate('/login')}
        />
      </motion.div>
    );
  }

  const mockOrders = [
    {
      id: 'ORD-9842',
      date: 'July 21, 2026',
      total: 458.0,
      status: 'Delivered',
      variant: 'success',
      items: [
        { product: products[0], quantity: 1 },
        { product: products[2], quantity: 1 },
      ],
      timeline: [
        { label: 'Order Placed', time: 'July 21, 10:14 AM', done: true },
        { label: 'Processing & Quality Check', time: 'July 21, 02:30 PM', done: true },
        { label: 'Shipped via Express Delivery', time: 'July 22, 08:00 AM', done: true },
        { label: 'Delivered', time: 'July 23, 11:20 AM', done: true },
      ],
    },
    {
      id: 'ORD-8410',
      date: 'July 15, 2026',
      total: 179.0,
      status: 'In Transit',
      variant: 'info',
      items: [{ product: products[3], quantity: 1 }],
      timeline: [
        { label: 'Order Placed', time: 'July 15, 04:20 PM', done: true },
        { label: 'Processing & Quality Check', time: 'July 16, 09:00 AM', done: true },
        { label: 'Shipped via Express Delivery', time: 'July 17, 11:45 AM', done: true },
        { label: 'Estimated Delivery', time: 'July 24, 05:00 PM', done: false },
      ],
    },
  ];

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6">
      <Breadcrumb items={[{ label: 'Order History' }]} />

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
          Purchases & Shipments
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mt-1">
          My Order History
        </h1>
      </div>

      <div className="space-y-6">
        {mockOrders.map((order) => {
          const isExpanded = expandedOrderId === order.id;
          return (
            <div
              key={order.id}
              className="bg-white dark:bg-dark-card border border-gray-200/80 dark:border-dark-border rounded-3xl overflow-hidden shadow-xs"
            >
              {/* Order Bar Header */}
              <div
                onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                className="p-5 md:p-6 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-50 dark:bg-primary-950/60 text-primary-600 rounded-2xl">
                    <FiPackage className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-base text-gray-900 dark:text-gray-100">
                        Order #{order.id}
                      </h3>
                      <Badge variant={order.variant} showDot>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Placed on {order.date} • {order.items.length} item(s)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-lg font-black text-gray-900 dark:text-gray-100">
                    ${order.total.toFixed(2)}
                  </span>
                  {isExpanded ? (
                    <FiChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <FiChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Expanded Order Content */}
              {isExpanded && (
                <div className="p-6 md:p-8 border-t border-gray-100 dark:border-dark-border/60 bg-gray-50/30 dark:bg-dark-bg/30 space-y-6">
                  {/* Order Timeline */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                      Shipment Progress Timeline
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {order.timeline.map((step, idx) => (
                        <div
                          key={idx}
                          className={`p-3.5 rounded-2xl border text-xs flex flex-col gap-1 ${
                            step.done
                              ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-300'
                              : 'bg-gray-100/50 dark:bg-dark-card border-gray-200 dark:border-dark-border text-gray-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 font-bold">
                            {step.done ? (
                              <FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                            ) : (
                              <FiClock className="w-4 h-4 text-gray-400 shrink-0" />
                            )}
                            <span>{step.label}</span>
                          </div>
                          <span className="text-[11px] opacity-75">{step.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Item Rows */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Order Items
                    </h4>
                    <div className="divide-y divide-gray-100 dark:divide-dark-border/60">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="py-3 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.product?.image}
                              alt={item.product?.name}
                              className="w-12 h-12 rounded-xl object-cover border border-gray-200 dark:border-dark-border"
                            />
                            <div>
                              <h5 className="font-bold text-gray-900 dark:text-gray-100">
                                {item.product?.name}
                              </h5>
                              <p className="text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-bold text-gray-900 dark:text-gray-100">
                            ${(item.product?.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200/80 dark:border-dark-border">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<FiFileText className="w-4 h-4" />}
                      onClick={() => setSelectedInvoice(order)}
                    >
                      View Invoice
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Invoice Card Modal */}
      {selectedInvoice && (
        <Modal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          title={`Invoice #${selectedInvoice.id}`}
          size="md"
        >
          <div className="space-y-4 text-xs">
            <div className="flex justify-between pb-3 border-b border-gray-100 dark:border-dark-border">
              <div>
                <strong className="text-gray-900 dark:text-gray-100 text-sm">ShopSphere Inc.</strong>
                <p className="text-gray-500">Invoice Date: {selectedInvoice.date}</p>
              </div>
              <Badge variant="success">Paid in Full</Badge>
            </div>

            <div className="space-y-2">
              {selectedInvoice.items.map((it, i) => (
                <div key={i} className="flex justify-between">
                  <span>{it.product?.name} x{it.quantity}</span>
                  <span className="font-bold">${(it.product?.price * it.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-dark-border flex justify-between font-extrabold text-sm">
              <span>Total Amount Paid</span>
              <span className="text-primary-600">${selectedInvoice.total.toFixed(2)}</span>
            </div>
          </div>
        </Modal>
      )}
    </motion.div>
  );
};

export default Orders;

