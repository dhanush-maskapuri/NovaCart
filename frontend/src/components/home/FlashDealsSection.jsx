import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiZap, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';
import { products } from '../../data/products';

/**
 * FlashDealsSection Component - Lightning Deals with Countdown Timer
 */
const FlashDealsSection = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.filter((p) => p.discount >= 20).slice(0, 4);

  return (
    <section className="py-12 px-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white shadow-2xl relative overflow-hidden my-6">
      {/* Ambient background glow circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-400 text-slate-950 font-black flex items-center justify-center shadow-lg animate-bounce">
            <FiZap className="w-6 h-6 fill-slate-950" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-amber-300">
              LIMITED TIME OFFER
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Festive Flash Deals
            </h2>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
          <FiClock className="w-4 h-4 text-amber-300" />
          <span className="text-xs font-bold text-slate-300">Ends in:</span>
          <div className="flex items-center gap-1 font-mono font-black text-sm text-white">
            <span className="bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-700">
              {String(timeLeft.hours).padStart(2, '0')}h
            </span>
            <span>:</span>
            <span className="bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-700">
              {String(timeLeft.minutes).padStart(2, '0')}m
            </span>
            <span>:</span>
            <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-lg">
              {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {flashProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FlashDealsSection;
