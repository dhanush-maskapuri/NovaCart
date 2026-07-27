import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiGrid, FiCpu, FiShoppingCart, FiUser } from 'react-icons/fi';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';

const MobileBottomNav = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();

  const navItems = [
    { label: 'Home', path: '/', icon: <FiHome className="w-5 h-5" /> },
    { label: 'Shop', path: '/shop', icon: <FiGrid className="w-5 h-5" /> },
    { label: 'AI Guide', path: '/ai-assistant', icon: <FiCpu className="w-5 h-5 animate-pulse text-indigo-500" /> },
    {
      label: 'Cart',
      path: '/cart',
      icon: (
        <div className="relative">
          <FiShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {totalItems > 9 ? '9+' : totalItems}
            </span>
          )}
        </div>
      ),
    },
    {
      label: 'Account',
      path: isAuthenticated ? '/dashboard' : '/login',
      icon: <FiUser className="w-5 h-5" />,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 py-2 px-3 flex items-center justify-around text-[10px] font-black text-slate-500 dark:text-slate-400">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.label}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-indigo-600 dark:text-indigo-400 font-extrabold' : 'hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileBottomNav;
