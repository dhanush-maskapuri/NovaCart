import { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiGrid,
  FiBox,
  FiShoppingBag,
  FiUsers,
  FiArrowLeft,
  FiBarChart2,
  FiShield,
  FiLogOut,
  FiShoppingBag as FiLogoIcon,
} from 'react-icons/fi';
import ThemeToggle from '../common/ThemeToggle';

/**
 * AdminLayout Component - Glassmorphic Admin Suite Wrapper
 */
const AdminLayout = () => {
  const navigate = useNavigate();

  const adminNavs = [
    { name: 'Dashboard Overview', path: '/admin', icon: FiGrid, end: true },
    { name: 'Products & Stock', path: '/admin/products', icon: FiBox },
    { name: 'Orders & Fulfillment', path: '/admin/orders', icon: FiShoppingBag },
    { name: 'User Management', path: '/admin/users', icon: FiUsers },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-indigo-500 selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900/90 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0 glass-effect">
        <div className="space-y-8">
          {/* Admin Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
              <FiShield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-white">Merchant Admin</h2>
              <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase">
                ShopSphere India
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-extrabold">
            {adminNavs.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Back to Customer Store Button */}
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4 text-indigo-400" />
            <span>Customer Store</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content View */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-950">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
