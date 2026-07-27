import { motion } from 'framer-motion';
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
import FloatingAIAssistant from '../components/ai/FloatingAIAssistant';
import { products } from '../data/products';
import { fadeIn } from '../animations/variants';

/**
 * Home Page Component - NOVACART ("India's Smart Marketplace")
 */
const Home = () => {
  const electronicsProducts = products.filter((p) => p.category === 'Mobiles' || p.category === 'Laptops' || p.category === 'Electronics' || p.category === 'TV & Appliances').slice(0, 4);
  const groceryProducts = products.filter((p) => p.category === 'Groceries' || p.category === 'Dairy & Bakery').slice(0, 4);
  const displayElectronics = electronicsProducts.length > 0 ? electronicsProducts : products.slice(0, 4);
  const displayGroceries = groceryProducts.length > 0 ? groceryProducts : products.slice(4, 8);

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="space-y-8 md:space-y-14"
    >
      {/* 1. Large Animated Hero Section (No Headphones, CRED/Nothing/Apple style) */}
      <HeroSection />

      {/* 2. Service Hubs (NovaMart 10-Min, NovaTech, NovaFashion, NovaHome, NovaCare) */}
      <ServicesSection />

      {/* 3. Flash Deals with Live Countdown */}
      <FlashDealsSection />

      {/* 4. Shop by Category (25+ Categories Grid) */}
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
        <ProductGrid products={displayElectronics} />
      </section>

      {/* 6. NovaMart 10-Minute Instant Delivery Corner */}
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
        <ProductGrid products={displayGroceries} />
      </section>

      {/* 7. Official Brand Collections */}
      <BrandCollectionsSection />

      {/* 8. Marketplace Best Sellers */}
      <BestSellersSection />

      {/* 9. Why Customers Trust NOVACART */}
      <WhyShopSphere />

      {/* 10. Real Customer Reviews */}
      <TestimonialsSection />

      {/* 11. Newsletter & Festive Coupons */}
      <NewsletterSection />

      {/* 12. Floating AI Assistant Widget */}
      <FloatingAIAssistant />
    </motion.div>
  );
};

export default Home;
