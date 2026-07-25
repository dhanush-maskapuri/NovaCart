import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiTruck, FiPackage, FiMapPin, FiClock, FiPhone } from 'react-icons/fi';
import { formatDate } from '../../utils/formatters';

/**
 * OrderTrackingModal Component - Live Delivery Timeline Tracker
 */
const OrderTrackingModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  const {
    id = 'ORD-98421',
    createdAt = new Date().toISOString(),
    status = 'Out for Delivery',
    trackingNumber = 'SFX-908123984',
    deliveryPartner = 'Shadowfax Express Rider',
    courierPhone = '+91 9876543210',
    estimatedArrival = 'Today by 5:30 PM',
  } = order;

  const steps = [
    { label: 'Order Placed', time: '10:15 AM', done: true },
    { label: 'Packed & Quality Verified', time: '11:30 AM', done: true },
    { label: 'Shipped from Hub', time: '01:45 PM', done: true },
    { label: 'Out for Delivery', time: '03:10 PM', done: status === 'Out for Delivery' || status === 'Delivered' },
    { label: 'Delivered', time: 'Estimated 05:30 PM', done: status === 'Delivered' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-xl rounded-3xl shadow-2xl p-6 relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600">
                LIVE DELIVERY TIMELINE
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
                Tracking Order #{id}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-2xl text-slate-400 hover:text-slate-600"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Courier Card */}
          <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800 mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-600 text-white font-bold">
                <FiTruck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {deliveryPartner}
                </h4>
                <p className="text-[11px] font-mono text-slate-500">Waybill: {trackingNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${courierPhone}`}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-indigo-600 font-bold text-xs shadow-xs border border-indigo-200 flex items-center gap-1.5"
              >
                <FiPhone className="w-3.5 h-3.5" />
                <span>Call Rider</span>
              </a>
            </div>
          </div>

          {/* Timeline Visualizer */}
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-4">
                <div
                  className={`absolute -left-[23px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                    step.done
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-white dark:bg-slate-900 text-slate-400 border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {step.done ? <FiCheck className="w-3.5 h-3.5" /> : idx + 1}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5
                      className={`text-xs font-bold ${
                        step.done
                          ? 'text-slate-900 dark:text-slate-100'
                          : 'text-slate-400 dark:text-slate-600'
                      }`}
                    >
                      {step.label}
                    </h5>
                    <span className="text-[11px] font-mono text-slate-400">{step.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Estimated Arrival: <strong className="text-indigo-600">{estimatedArrival}</strong></span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-2xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold"
            >
              Close Tracker
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OrderTrackingModal;
