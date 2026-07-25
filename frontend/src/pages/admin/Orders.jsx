import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiTruck, FiCheckCircle, FiClock, FiFileText } from 'react-icons/fi';
import { formatCurrency, formatDate } from '../../utils/formatters';

/**
 * Admin Orders Fulfillment Management Page
 */
const AdminOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-98421',
      buyer: 'Rahul Sharma (+91 9876543210)',
      pincode: '110001 - New Delhi',
      amount: 2499,
      status: 'Out for Delivery',
      date: new Date().toISOString(),
      itemsCount: 1,
    },
    {
      id: 'ORD-84102',
      buyer: 'Priya Iyer (+91 9812345678)',
      pincode: '560001 - Bengaluru',
      amount: 9995,
      status: 'Delivered',
      date: new Date(Date.now() - 86400000 * 2).toISOString(),
      itemsCount: 1,
    },
    {
      id: 'ORD-76120',
      buyer: 'Aarav Patel (+91 9898989898)',
      pincode: '400001 - Mumbai',
      amount: 14999,
      status: 'Processing',
      date: new Date(Date.now() - 86400000).toISOString(),
      itemsCount: 2,
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono font-bold uppercase text-indigo-400">
          ORDER FULFILLMENT & DISPATCH
        </span>
        <h1 className="text-3xl font-black text-white tracking-tight mt-1">
          Merchant Order Queue ({orders.length})
        </h1>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-extrabold uppercase">
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">Buyer & Destination</th>
                <th className="p-4">Total Value</th>
                <th className="p-4">Current Status</th>
                <th className="p-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold">
                    <span className="text-indigo-400 font-mono block">{o.id}</span>
                    <span className="text-[10px] text-slate-400">{formatDate(o.date)}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-extrabold text-white block">{o.buyer}</span>
                    <span className="text-[11px] text-slate-400">{o.pincode}</span>
                  </td>
                  <td className="p-4 font-black text-emerald-400">{formatCurrency(o.amount)}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-950 text-amber-300 border border-amber-800 uppercase">
                      {o.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
