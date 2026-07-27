import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiZap,
  FiSmartphone,
  FiMonitor,
  FiWatch,
  FiHeadphones,
  FiShoppingBag,
} from 'react-icons/fi';
import { usePreferences } from '../../context/PreferencesContext';

/**
 * HeroSection Component - NovaCart ("India's Smart Marketplace")
 * Features 6 floating glassmorphism showcase cards spread naturally across the right hero area
 * with varying heights, tilt rotations, floating delays, and smooth infinite animations.
 */
const HeroSection = () => {
  const navigate = useNavigate();
  const { formatPrice } = usePreferences();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) / 35;
    const y = (clientY - window.innerHeight / 2) / 35;
    setMousePos({ x, y });
  };

  // 6 Floating Product Cards with varying sizes, heights, rotations, and float animation speeds
  const floatingCards = [
    {
      id: 1,
      name: 'iPhone 15 Pro Titanium',
      category: 'iPhone',
      price: 129900,
      badge: 'FLAGSHIP 5G',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80',
      icon: FiSmartphone,
      color: 'from-blue-600/30 via-indigo-600/20 to-purple-600/30 border-blue-500/40 text-blue-300',
      delay: 0,
      duration: 5,
      rotate: -3,
      size: 'col-span-2 row-span-2',
      imgSize: 'w-20 h-20',
      positionClass: 'top-0 left-0',
    },
    {
      id: 2,
      name: 'Samsung S24 Ultra 5G',
      category: 'Samsung',
      price: 129999,
      badge: 'GALAXY AI',
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80',
      icon: FiSmartphone,
      color: 'from-purple-600/30 via-pink-600/20 to-rose-600/30 border-purple-500/40 text-purple-300',
      delay: 0.6,
      duration: 5.5,
      rotate: 4,
      size: 'col-span-1 row-span-1',
      imgSize: 'w-14 h-14',
      positionClass: 'top-2 right-0',
    },
    {
      id: 3,
      name: 'MacBook Air M3 15"',
      category: 'Laptop',
      price: 154900,
      badge: 'ULTRA FAST',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
      icon: FiMonitor,
      color: 'from-indigo-600/30 via-blue-600/20 to-cyan-600/30 border-indigo-500/40 text-indigo-300',
      delay: 1.2,
      duration: 4.8,
      rotate: -2,
      size: 'col-span-2 row-span-1',
      imgSize: 'w-16 h-16',
      positionClass: 'top-32 left-8',
    },
    {
      id: 4,
      name: 'Nike Air Max 270',
      category: 'Nike Shoes',
      price: 11995,
      badge: 'NEW ARRIVAL',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
      icon: FiShoppingBag,
      color: 'from-rose-600/30 via-amber-600/20 to-red-600/30 border-rose-500/40 text-rose-300',
      delay: 0.3,
      duration: 5.2,
      rotate: 5,
      size: 'col-span-1 row-span-2',
      imgSize: 'w-16 h-16',
      positionClass: 'top-36 right-4',
    },
    {
      id: 5,
      name: 'Sony WH-1000XM5 ANC',
      category: 'Headphones',
      price: 29990,
      badge: 'HI-RES AUDIO',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
      icon: FiHeadphones,
      color: 'from-emerald-600/30 via-teal-600/20 to-cyan-600/30 border-emerald-500/40 text-emerald-300',
      delay: 0.9,
      duration: 4.5,
      rotate: -4,
      size: 'col-span-1 row-span-1',
      imgSize: 'w-14 h-14',
      positionClass: 'bottom-4 left-4',
    },
    {
      id: 6,
      name: 'Apple Watch Series 9',
      category: 'Watch',
      price: 41900,
      badge: 'AMOLED DISPLAY',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
      icon: FiWatch,
      color: 'from-amber-600/30 via-orange-600/20 to-yellow-600/30 border-amber-500/40 text-amber-300',
      delay: 1.5,
      duration: 5.8,
      rotate: 3,
      size: 'col-span-2 row-span-1',
      imgSize: 'w-16 h-16',
      positionClass: 'bottom-0 right-8',
    },
  ];

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden py-16 md:py-28 bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl my-4 select-none"
    >
      {/* Glowing Circles & Parallax Blobs Background */}
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

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Dominant Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start text-left gap-6"
          >
            {/* Express Delivery Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-400/20">
                <FiZap className="w-3.5 h-3.5 fill-slate-950" /> 10-MIN NOVAMART EXPRESS
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-extrabold">
                🇮🇳 Delivering Across India
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              India's Smart{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-amber-400">
                Marketplace
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-medium">
              Buy Electronics, Groceries, Fashion, Beauty, Furniture, Kitchen, Books, Sports, Pets, and more with 10-Min Express Delivery.
            </p>

            {/* Call To Action Buttons */}
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

            {/* Statistics Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80 w-full">
              <div>
                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300 block">
                  40 Lakh+
                </span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Products
                </span>
              </div>
              <div>
                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 block">
                  2000+
                </span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Brands
                </span>
              </div>
              <div>
                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300 block">
                  1 Crore+
                </span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Customers
                </span>
              </div>
              <div>
                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-300 block">
                  10-Min
                </span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  NovaMart Delivery
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 6 Floating Glassmorphism Product Showcase Cards Spread Naturally */}
          <motion.div
            style={{ x: mousePos.x, y: mousePos.y }}
            className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-4 relative min-h-[460px]"
          >
            {floatingCards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -12, 0],
                  rotate: [card.rotate, card.rotate + 2, card.rotate],
                }}
                transition={{
                  duration: card.duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: card.delay,
                }}
                whileHover={{ scale: 1.08, y: -15, zIndex: 30 }}
                onClick={() => navigate(`/shop?search=${encodeURIComponent(card.category)}`)}
                className={`p-3.5 rounded-3xl bg-gradient-to-br ${card.color} backdrop-blur-2xl border shadow-2xl flex flex-col justify-between cursor-pointer group transition-all`}
              >
                <div className="relative overflow-hidden rounded-2xl mb-2 aspect-square bg-slate-900/70 border border-white/10">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-1.5 left-1.5 bg-slate-950/80 backdrop-blur-xs text-[8px] font-black text-amber-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {card.badge}
                  </span>
                </div>

                <div>
                  <span className="text-[9px] font-black text-slate-400 uppercase block tracking-wider">
                    {card.category}
                  </span>
                  <h4 className="text-xs font-black text-white truncate group-hover:text-blue-300 transition-colors">
                    {card.name}
                  </h4>
                  <span className="text-xs font-black text-emerald-400 block mt-0.5">
                    {formatPrice(card.price)}
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
