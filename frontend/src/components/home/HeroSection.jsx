import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiZap,
  FiShield,
  FiShoppingBag,
  FiMapPin,
  FiSmartphone,
  FiMonitor,
  FiTv,
  FiWatch,
  FiTrendingUp,
  FiUsers,
  FiCheckCircle,
} from 'react-icons/fi';
import Button from '../common/Button';
import { formatCurrency } from '../../utils/formatters';

/**
 * HeroSection Component - NOVACART ("India's Smart Marketplace")
 * Mix inspiration from CRED + Nothing + Apple + Flipkart + Swiggy Instamart.
 * NO Headphones. Features floating cards for Smartphones, Laptops, Groceries, Shoes, Beauty, AC, TV, Smart Watches.
 */
const HeroSection = () => {
  const navigate = useNavigate();

  // Floating multi-product showcase items (Phones, Laptop, Groceries, Shoes, Beauty, AC, TV, Smart Watch) - NO Headphones
  const floatingProducts = [
    {
      title: 'iPhone 15 Pro Titanium',
      category: 'Smartphones',
      price: 129900,
      badge: 'FLAGSHIP 5G',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
      icon: FiSmartphone,
      color: 'border-blue-500/40 bg-blue-950/40 text-blue-300',
    },
    {
      title: 'MacBook Air M3 15"',
      category: 'Laptops',
      price: 154900,
      badge: 'M3 POWER',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
      icon: FiMonitor,
      color: 'border-purple-500/40 bg-purple-950/40 text-purple-300',
    },
    {
      title: 'Organic Fruits & Milk',
      category: '10-Min Groceries',
      price: 195,
      badge: '10-MIN EXPRESS',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
      icon: FiZap,
      color: 'border-amber-500/40 bg-amber-950/40 text-amber-300',
    },
    {
      title: 'Nike Air Max 270',
      category: 'Shoes',
      price: 11995,
      badge: 'TOP COMFORT',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
      icon: FiShoppingBag,
      color: 'border-rose-500/40 bg-rose-950/40 text-rose-300',
    },
    {
      title: 'Minimalist Vitamin C',
      category: 'Beauty & Skincare',
      price: 664,
      badge: '100% CLEAN',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
      icon: FiShield,
      color: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300',
    },
    {
      title: 'LG 1.5 Ton 5 Star AC',
      category: 'Air Conditioner',
      price: 46490,
      badge: 'AI COOLING',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
      icon: FiZap,
      color: 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300',
    },
    {
      title: 'Sony Bravia 55" 4K OLED',
      category: 'Television',
      price: 57990,
      badge: 'CINEMA 4K',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80',
      icon: FiTv,
      color: 'border-indigo-500/40 bg-indigo-950/40 text-indigo-300',
    },
    {
      title: 'OnePlus Watch 2',
      category: 'Smart Watch',
      price: 19999,
      badge: '100H BATTERY',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
      icon: FiWatch,
      color: 'border-violet-500/40 bg-violet-950/40 text-violet-300',
    },
  ];

  return (
    <section className="relative overflow-hidden py-10 md:py-20 bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl my-4">
      {/* Background Animated Particle Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/20 to-purple-600/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Moving Offer Ticker Strip */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-2 px-4 mb-8 overflow-hidden text-xs font-black tracking-wider uppercase text-white flex items-center justify-around border-y border-white/10">
        <div className="flex items-center gap-6 whitespace-nowrap animate-pulse">
          <span>⚡ GREAT INDIAN FESTIVAL LIVE</span>
          <span>•</span>
          <span>10-MINUTE GROCERY DELIVERY VIA NOVAMART</span>
          <span>•</span>
          <span>UP TO 70% OFF ON ELECTRONICS & FASHION</span>
          <span>•</span>
          <span>GST TAX INVOICE ELIGIBLE ON ALL BUSINESS ORDERS</span>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 flex flex-col items-start text-left gap-6"
          >
            {/* Tagline Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md">
                <FiZap className="w-3.5 h-3.5 fill-slate-950" /> 10-MIN EXPRESS DELIVERY
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700 text-indigo-300 text-xs font-extrabold">
                <FiMapPin className="w-3.5 h-3.5" /> Delivering across 15,000+ Pincodes
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              India's Smart{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Marketplace
              </span>
            </h1>

            {/* Subtitle listing required categories */}
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed font-medium">
              Explore smartphones, gaming laptops, 10-minute NovaMart groceries, fashion, beauty, home, kitchenware, sports gear, books, pet care, and smart appliances with instant UPI checkout & GST Tax invoices.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigate('/shop')}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2 group"
              >
                <span>Shop Now</span>
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/shop?category=groceries')}
                className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-400/20 transition-all flex items-center gap-2"
              >
                <FiZap className="w-4 h-4 fill-slate-950" />
                <span>Explore NovaMart</span>
              </button>
            </div>

            {/* Animated Statistics Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80 w-full">
              <div>
                <span className="text-xl font-black text-indigo-400 block">40+ Lakh</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Products</span>
              </div>
              <div>
                <span className="text-xl font-black text-purple-400 block">2000+</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Top Brands</span>
              </div>
              <div>
                <span className="text-xl font-black text-emerald-400 block">1 Cr+</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Happy Shoppers</span>
              </div>
              <div>
                <span className="text-xl font-black text-amber-400 block">10-Min</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Grocery Delivery</span>
              </div>
            </div>
          </motion.div>

          {/* Right Floating Product Cards Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 grid grid-cols-2 gap-4"
          >
            {floatingProducts.map((prod, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.03 }}
                onClick={() => navigate('/shop')}
                className={`p-3.5 rounded-3xl border ${prod.color} backdrop-blur-xl shadow-xl flex items-center gap-3 cursor-pointer group transition-all`}
              >
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-14 h-14 object-cover rounded-2xl border border-white/10 group-hover:scale-110 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/10 block w-fit mb-1">
                    {prod.badge}
                  </span>
                  <h4 className="text-xs font-black text-white truncate group-hover:text-indigo-300">
                    {prod.title}
                  </h4>
                  <span className="text-xs font-black text-emerald-400 block">
                    {formatCurrency(prod.price)}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
