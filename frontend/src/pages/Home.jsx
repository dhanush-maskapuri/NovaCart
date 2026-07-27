import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSmartphone, FiShield, FiClock, FiCheckCircle, FiStar, FiArrowRight } from 'react-icons/fi';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import FlashDealsSection from '../components/home/FlashDealsSection';
import CategorySection from '../components/home/CategorySection';
import BrandCollectionsSection from '../components/home/BrandCollectionsSection';
import BestSellersSection from '../components/home/BestSellersSection';
import WhyShopSphere from '../components/home/WhyShopSphere';
import TestimonialsSection from '../components/home/TestimonialsSection';
import NewsletterSection from '../components/home/NewsletterSection';
import ProductGrid from '../components/product/ProductGrid';
import { products } from '../data/products';
import { fadeIn } from '../animations/variants';

/**
 * Home Page Component - Complete Redesign (Amazon/Flipkart Style)
 */
const Home = () => {
  const electronicsProducts = products.filter((p) => p.category === 'Mobiles' || p.category === 'Laptops' || p.category === 'Electronics' || p.category === 'TV & Appliances').slice(0, 4);
  const groceryProducts = products.filter((p) => p.category === 'Groceries' || p.category === 'Dairy & Bakery').slice(0, 4);
  const fashionProducts = products.filter((p) => p.category === 'Fashion' || p.category === 'Beauty & Skincare').slice(0, 4);

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="space-y-10 md:space-y-16"
    >
      {/* 1. Hero Banner Slider */}
      <HeroSection />

      {/* 2. Hyperlocal Service Hubs */}
      <ServicesSection />

      {/* 3. Flash Sale & Countdown Timer */}
      <FlashDealsSection />

      {/* 4. Category Grid */}
      <CategorySection />

      {/* 5. Trending Electronics & Mobiles */}
      <section className="py-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
              FLAGSHIP 5G & TECH
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
              Trending Electronics & Mobiles
            </h2>
          </div>
        </div>
        <ProductGrid products={electronicsProducts.length > 0 ? electronicsProducts : products.slice(0, 4)} />
      </section>

      {/* 6. NovaMart 10-Minute Hyperlocal Corner */}
      <section className="py-8 px-6 rounded-3xl bg-amber-500/10 border border-amber-500/30">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              ⚡ HYPERLOCAL 10-MINUTE GROCERIES
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
              NovaMart Express Delivery
            </h2>
          </div>
        </div>
        <ProductGrid products={groceryProducts.length > 0 ? groceryProducts : products.slice(4, 8)} />
      </section>

      {/* 7. Download NovaCart Mobile App Section */}
      <section className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden relative">
        <div className="space-y-4 max-w-xl">
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider">
            📲 SHOP ON THE GO
          </span>
          <h2 className="text-2xl md:text-4xl font-black leading-tight">
            Download the NovaCart App for Exclusive 10-Min Flash Offers!
          </h2>
          <p className="text-xs md:text-sm text-indigo-100 leading-relaxed font-medium">
            Get ₹100 flat discount on your first order + live GPS order tracking directly on your smartphone.
          </p>
          <div className="flex gap-4 pt-2">
            <button className="px-6 py-3 rounded-2xl bg-white text-slate-900 text-xs font-black shadow-lg hover:bg-slate-100 flex items-center gap-2">
              <FiSmartphone /> Google Play Store
            </button>
            <button className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-black border border-white/30 flex items-center gap-2">
              Apple App Store
            </button>
          </div>
        </div>

        <div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center p-6 border border-white/20 shrink-0">
          <FiSmartphone className="w-32 h-32 text-amber-300 animate-bounce" />
        </div>
      </section>

      {/* 8. Official Brand Collections */}
      <BrandCollectionsSection />

      {/* 9. Marketplace Best Sellers */}
      <BestSellersSection />

      {/* 10. Why Customers Trust NOVACART */}
      <WhyShopSphere />

      {/* 11. Customer Reviews */}
      <TestimonialsSection />

      {/* 12. Newsletter Section */}
      <NewsletterSection />
    </motion.div>
  );
};

export default Home;
