import { Outlet, NavLink, Link } from 'react-router-dom';
import {
  FiGrid,
  FiBox,
  FiShoppingBag,
  FiUsers,
  FiArrowLeft,
  FiShield,
  FiLayers,
  FiMessageSquare,
} from 'react-icons/fi';

/**
 * AdminLayout Component - Glassmorphic Admin Suite Wrapper
 */
const AdminLayout = () => {
  const adminNavs = [
    { name: 'Dashboard Analytics', path: '/admin', icon: FiGrid, end: true },
    { name: 'Product Management', path: '/admin/products', icon: FiBox },
    { name: 'Category Taxonomy', path: '/admin/categories', icon: FiGrid },
    { name: 'Inventory Control', path: '/admin/inventory', icon: FiLayers },
    { name: 'Order Processing', path: '/admin/orders', icon: FiShoppingBag },
    { name: 'User Directory', path: '/admin/users', icon: FiUsers },
    { name: 'Review Moderation', path: '/admin/reviews', icon: FiMessageSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row font-sans selection:bg-indigo-500 selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900/90 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shrink-0 glass-effect">
        <div className="space-y-8">
          {/* Admin Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
              <FiShield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-slate-900 dark:text-white">Merchant Admin</h2>
              <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold uppercase">
                NovaCart India
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
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
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
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Customer Marketplace</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content View */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-50 dark:bg-slate-950">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
