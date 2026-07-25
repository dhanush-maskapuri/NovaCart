import { NavLink } from 'react-router-dom';
import { FiHome, FiGrid, FiZap, FiCpu, FiShoppingCart, FiUser } from 'react-icons/fi';
import { useCart } from '../../hooks/useCart';

/**
 * MobileBottomNav Component - Sticky Bottom Bar for Mobile Devices
 */
const MobileBottomNav = () => {
  const { cart = [] } = useCart();
  const totalCartItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const navs = [
    { label: 'Home', path: '/', icon: FiHome, end: true },
    { label: 'Shop', path: '/shop', icon: FiGrid },
    { label: '10-Min', path: '/shop?category=groceries', icon: FiZap },
    { label: 'AI Shopping', path: '/ai-assistant', icon: FiCpu },
    { label: 'Cart', path: '/cart', icon: FiShoppingCart, badge: totalCartItems },
    { label: 'Profile', path: '/profile', icon: FiUser },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-2xl border-t border-slate-800 lg:hidden px-2 py-2 flex items-center justify-around shadow-2xl">
      {navs.map((n) => {
        const Icon = n.icon;
        return (
          <NavLink
            key={n.path}
            to={n.path}
            end={n.end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-[10px] font-bold transition-all relative ${
                isActive
                  ? 'text-amber-400 font-black'
                  : 'text-slate-400 hover:text-white'
              }`
            }
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {n.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {n.badge}
                </span>
              )}
            </div>
            <span>{n.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
