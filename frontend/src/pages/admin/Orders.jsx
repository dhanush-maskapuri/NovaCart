import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiTruck, FiCheckCircle, FiClock, FiFileText } from 'react-icons/fi';
import { fetchAdminOrders, updateAdminOrderStatus } from '../../services/adminService';
import { formatCurrency, formatDate } from '../../utils/formatters';

/**
 * Admin Orders Fulfillment Management Page - Connected to Backend REST APIs
 */
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await fetchAdminOrders();
      if (res && res.success && Array.isArray(res.data)) {
        setOrders(res.data);
      }
    } catch (err) {
      console.warn('Admin orders fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateAdminOrderStatus(id, newStatus);
      await loadOrders();
    } catch (err) {
      alert('Error updating order status');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono font-bold uppercase text-indigo-400">
          ORDER FULFILLMENT & DISPATCH
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
          Merchant Order Queue ({orders.length})
        </h1>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-400 font-extrabold uppercase">
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">Buyer & Destination</th>
                <th className="p-4">Total Value</th>
                <th className="p-4">Current Status</th>
                <th className="p-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-bold">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400 font-bold">Loading orders...</td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400 font-bold">No orders found in database.</td>
                </tr>
              ) : (
                orders.map((o) => {
                  const buyerName = o.user?.name || o.shippingAddress?.fullName || 'Customer';
                  const buyerPhone = o.shippingAddress?.phone || '';
                  const cityState = `${o.shippingAddress?.city || ''}, ${o.shippingAddress?.state || ''} - ${o.shippingAddress?.pincode || o.shippingAddress?.zipCode || ''}`;

                  return (
                    <tr key={o._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-4">
                        <span className="text-indigo-600 dark:text-indigo-400 font-mono block">#{o._id.slice(-8).toUpperCase()}</span>
                        <span className="text-[10px] text-slate-400">{formatDate(o.createdAt)}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-extrabold text-slate-900 dark:text-slate-100 block">{buyerName} ({buyerPhone})</span>
                        <span className="text-[11px] text-slate-400">{cityState}</span>
                      </td>
                      <td className="p-4 font-black text-indigo-600">{formatCurrency(o.totalPrice)}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200">
                          {o.orderStatus}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <select
                          value={o.orderStatus}
                          onChange={(e) => handleStatusChange(o._id, e.target.value)}
                          className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                        >
                          <option value="Placed">Placed</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Packed">Packed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Returned">Returned</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
