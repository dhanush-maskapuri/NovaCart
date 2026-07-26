import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiZap,
  FiSmartphone,
  FiMonitor,
  FiTv,
  FiWatch,
  FiShoppingBag,
  FiShield,
  FiHeart,
  FiFeather,
  FiBox,
  FiSun,
  FiSmile,
} from 'react-icons/fi';
import { formatCurrency } from '../../utils/formatters';

/**
 * HeroSection Component - NovaCart ("India's Smart Marketplace")
 * Features slow-floating animated cards for iPhone, Samsung, Milk, Vegetables, Nike Shoes,
 * Laptop, Television, Watch, Perfume, Furniture, Beauty, Groceries.
 * Animated glowing circles, blobs, floating particles, mouse parallax, and exact counters.
 */
const HeroSection = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) / 40;
    const y = (clientY - window.innerHeight / 2) / 40;
    setMousePos({ x, y });
  };

  // 12 Required Floating Product Cards with individual animation delays & float heights
  const floatingCards = [
    {
      name: 'iPhone 15 Pro Titanium',
      category: 'iPhone',
      price: 129900,
      badge: 'FLAGSHIP 5G',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80',
      icon: FiSmartphone,
      color: 'from-blue-600/30 to-indigo-600/30 border-blue-500/40 text-blue-300',
      delay: 0,
      duration: 4,
    },
    {
      name: 'Samsung S24 Ultra 5G',
      category: 'Samsung',
      price: 129999,
      badge: 'GALAXY AI',
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80',
      icon: FiSmartphone,
      color: 'from-purple-600/30 to-pink-600/30 border-purple-500/40 text-purple-300',
      delay: 0.5,
      duration: 4.5,
    },
    {
      name: 'Amul Fresh Toned Milk 1L',
      category: 'Milk',
      price: 66,
      badge: '10-MIN EXPRESS',
      image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=400&q=80',
      icon: FiBox,
      color: 'from-sky-600/30 to-blue-600/30 border-sky-500/40 text-sky-300',
      delay: 1,
      duration: 3.8,
    },
    {
      name: 'Farm Fresh Organic Veggies',
      category: 'Vegetables',
      price: 149,
      badge: 'ORGANIC FARM',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80',
      icon: FiSun,
      color: 'from-emerald-600/30 to-teal-600/30 border-emerald-500/40 text-emerald-300',
      delay: 0.2,
      duration: 4.2,
    },
    {
      name: 'Nike Air Max 270 Sneakers',
      category: 'Nike Shoes',
      price: 11995,
      badge: 'NEW ARRIVAL',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
      icon: FiShoppingBag,
      color: 'from-rose-600/30 to-amber-600/30 border-rose-500/40 text-rose-300',
      delay: 0.8,
      duration: 5,
    },
    {
      name: 'MacBook Air M3 15"',
      category: 'Laptop',
      price: 154900,
      badge: 'ULTRA FAST',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
      icon: FiMonitor,
      color: 'from-indigo-600/30 to-blue-600/30 border-indigo-500/40 text-indigo-300',
      delay: 1.2,
      duration: 4.6,
    },
    {
      name: 'Sony Bravia 55" 4K OLED',
      category: 'Television',
      price: 57990,
      badge: 'CINEMA 4K',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=80',
      icon: FiTv,
      color: 'from-slate-700/50 to-slate-900/50 border-slate-600/40 text-slate-300',
      delay: 0.4,
      duration: 4.1,
    },
    {
      name: 'Titan Smartwatch Pro',
      category: 'Watch',
      price: 12995,
      badge: 'AMOLED DISPLAY',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
      icon: FiWatch,
      color: 'from-violet-600/30 to-purple-600/30 border-violet-500/40 text-violet-300',
      delay: 0.9,
      duration: 4.8,
    },
    {
      name: 'Luxury Dior Sauvage Elixir',
      category: 'Perfume',
      price: 14500,
      badge: 'LONG LASTING',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=400&q=80',
      icon: FiFeather,
      color: 'from-pink-600/30 to-rose-600/30 border-pink-500/40 text-pink-300',
      delay: 0.6,
      duration: 3.9,
    },
    {
      name: 'Royal Teakwood 3-Seater Sofa',
      category: 'Furniture',
      price: 34999,
      badge: 'TEAKWOOD',
      image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=400&q=80',
      icon: FiBox,
      color: 'from-amber-700/30 to-yellow-900/30 border-amber-600/40 text-amber-300',
      delay: 1.1,
      duration: 4.4,
    },
    {
      name: 'Kama Ayurvedic Serum 30ml',
      category: 'Beauty',
      price: 2495,
      badge: '100% NATURAL',
      image: 'https://images.unsplash.com/photo-1512290900676-26c2a6a095ae?auto=format&fit=crop&w=400&q=80',
      icon: FiShield,
      color: 'from-emerald-700/30 to-cyan-800/30 border-emerald-600/40 text-emerald-300',
      delay: 0.3,
      duration: 4.3,
    },
    {
      name: 'Fortune Sunlite Oil 5L',
      category: 'Groceries',
      price: 685,
      badge: '10-MIN EXPRESS',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
      icon: FiZap,
      color: 'from-amber-600/30 to-orange-600/30 border-amber-500/40 text-amber-300',
      delay: 0.7,
      duration: 4.7,
    },
  ];

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden py-12 md:py-24 bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl my-4 select-none"
    >
      {/* Animated Glowing Circles & Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.4, 0.25],
          x: mousePos.x * 2,
          y: mousePos.y * 2,
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/40 via-purple-600/30 to-indigo-600/40 blur-[150px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
          x: -mousePos.x * 2,
          y: -mousePos.y * 2,
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-gradient-to-tr from-amber-500/30 via-emerald-500/20 to-blue-500/30 blur-[140px] rounded-full pointer-events-none"
      />

      {/* Floating Particle Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 1000,
              y: Math.random() * 600,
              opacity: Math.random() * 0.4 + 0.1,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 shadow-sm shadow-blue-400"
          />
        ))}
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text & CTA Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start text-left gap-6"
          >
            {/* Express Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-400/20">
                <FiZap className="w-3.5 h-3.5 fill-slate-950" /> 10-MIN NOVAMART EXPRESS
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-extrabold">
                🇮🇳 Delivering Across India
              </span>
            </div>

            {/* Exact Required Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              India's Smart{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-amber-400">
                Marketplace
              </span>
            </h1>

            {/* Exact Required Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-medium">
              Buy Electronics, Groceries, Fashion, Beauty, Furniture, Kitchen, Books, Sports, Pets, and more.
            </p>

            {/* Animated CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/shop')}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-sm shadow-xl shadow-blue-600/30 flex items-center gap-2.5 group transition-all"
              >
                <span>Shop Now</span>
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/shop?category=groceries')}
                className="px-7 py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-400/20 flex items-center gap-2 transition-all"
              >
                <FiZap className="w-4 h-4 fill-slate-950" />
                <span>Explore NovaMart</span>
              </motion.button>
            </div>

            {/* Exact Animated Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80 w-full">
              <div className="space-y-0.5">
                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300 block">
                  40 Lakh+
                </span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Products
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 block">
                  2000+
                </span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Brands
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300 block">
                  1 Crore+
                </span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Customers
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-300 block">
                  10-Min
                </span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  NovaMart Delivery
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Slow Floating Product Cards Grid with Mouse Parallax */}
          <motion.div
            style={{ x: mousePos.x, y: mousePos.y }}
            className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3.5 max-h-[520px] overflow-y-auto pr-1 custom-scrollbar"
          >
            {floatingCards.map((card, idx) => (
              <motion.div
                key={idx}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: card.duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: card.delay,
                }}
                whileHover={{ scale: 1.05, y: -12 }}
                onClick={() => navigate(`/shop?search=${encodeURIComponent(card.category)}`)}
                className={`p-3 rounded-2xl bg-gradient-to-br ${card.color} backdrop-blur-xl border shadow-xl flex flex-col justify-between cursor-pointer group transition-all`}
              >
                <div className="relative overflow-hidden rounded-xl mb-2 aspect-square bg-slate-900/60">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-1 left-1 bg-slate-950/80 backdrop-blur-xs text-[8px] font-black text-amber-400 px-1.5 py-0.5 rounded-md uppercase">
                    {card.badge}
                  </span>
                </div>

                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">
                    {card.category}
                  </span>
                  <h4 className="text-xs font-extrabold text-white truncate group-hover:text-blue-300 transition-colors">
                    {card.name}
                  </h4>
                  <span className="text-xs font-black text-emerald-400 block mt-0.5">
                    {formatCurrency(card.price)}
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
