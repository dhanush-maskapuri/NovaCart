import { motion } from 'framer-motion';
import {
  FiDollarSign,
  FiShoppingBag,
  FiBox,
  FiUsers,
  FiTrendingUp,
  FiArrowUpRight,
  FiCheckCircle,
} from 'react-icons/fi';
import { formatCurrency } from '../../utils/formatters';
import { products } from '../../data/products';

/**
 * Admin Dashboard Page - Revenue analytics in ₹, Charts, & Key Metrics
 */
const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Revenue (INR)',
      value: formatCurrency(1489200),
      growth: '+24.5%',
      icon: FiDollarSign,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Total Orders Placed',
      value: '1,420',
      growth: '+18.2%',
      icon: FiShoppingBag,
      color: 'from-indigo-500 to-purple-600',
    },
    {
      title: 'Catalog Items',
      value: products.length.toString(),
      growth: '+4 New',
      icon: FiBox,
      color: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Active Customers',
      value: '8,940',
      growth: '+12.8%',
      icon: FiUsers,
      color: 'from-pink-500 to-rose-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-mono font-bold uppercase text-indigo-400">
          ANALYTICS & METRICS
        </span>
        <h1 className="text-3xl font-black text-white tracking-tight mt-1">
          Merchant Operations Dashboard
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((st, idx) => {
          const Icon = st.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-tr ${st.color} text-white shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-800">
                  <FiTrendingUp className="w-3 h-3" /> {st.growth}
                </span>
              </div>
              <h3 className="text-2xl font-black text-white">{st.value}</h3>
              <p className="text-xs font-bold text-slate-400 mt-1">{st.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* SVG Revenue Chart & Category Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue Trend Chart Card */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-white">Monthly Sales Growth (₹)</h3>
              <p className="text-xs text-slate-400">Revenue performance across Indian festival months</p>
            </div>
            <span className="text-xs font-bold text-indigo-400">July 2026</span>
          </div>

          {/* SVG Trend Graph */}
          <div className="h-64 w-full pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="40" x2="500" y2="40" stroke="#334155" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="500" y2="90" stroke="#334155" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="#334155" strokeDasharray="4 4" />

              {/* Area Under Curve */}
              <path
                d="M 0,160 Q 80,120 150,140 T 300,60 T 450,30 L 500,50 L 500,190 L 0,190 Z"
                fill="url(#chartGradient)"
              />
              {/* Curve Line */}
              <path
                d="M 0,160 Q 80,120 150,140 T 300,60 T 450,30 L 500,50"
                fill="none"
                stroke="#6366f1"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="flex justify-between text-xs font-mono text-slate-400 border-t border-slate-800 pt-3">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <h3 className="text-lg font-black text-white">Sales by Category</h3>

          <div className="space-y-4">
            {[
              { cat: 'Electronics & Audio', share: '45%', amount: '₹6.70L', color: 'bg-indigo-600' },
              { cat: 'NovaMart Groceries', share: '25%', amount: '₹3.72L', color: 'bg-amber-400' },
              { cat: 'Fashion & Ethnic', share: '18%', amount: '₹2.68L', color: 'bg-pink-600' },
              { cat: 'Home & Teak Furniture', share: '12%', amount: '₹1.78L', color: 'bg-emerald-500' },
            ].map((item, i) => (
              <div key={i} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-bold text-slate-300">
                  <span>{item.cat}</span>
                  <span className="text-white">{item.amount} ({item.share})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: item.share }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
