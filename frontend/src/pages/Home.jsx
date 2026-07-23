import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';
import BestSellersSection from '../components/home/BestSellersSection';
import WhyShopSphere from '../components/home/WhyShopSphere';
import PromoBanner from '../components/home/PromoBanner';
import TestimonialsSection from '../components/home/TestimonialsSection';
import NewsletterSection from '../components/home/NewsletterSection';
import ProductGrid from '../components/product/ProductGrid';
import { products } from '../data/products';
import { fadeIn } from '../animations/variants';

/**
 * Home Page Component
 * Complete Customer Landing Page incorporating Hero, Categories, Featured Products, Best Sellers, Features, Promo Banner, Testimonials, and Newsletter.
 */
const Home = () => {
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="space-y-6 md:space-y-12"
    >
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Categories Section */}
      <CategorySection />

      {/* 3. Featured Products */}
      <section className="py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
              Handpicked Essentials
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mt-1">
              Featured Products
            </h2>
          </div>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      {/* 4. Best Sellers */}
      <BestSellersSection />

      {/* 5. Why ShopSphere */}
      <WhyShopSphere />

      {/* 6. Promotional Banner */}
      <PromoBanner />

      {/* 7. Customer Testimonials */}
      <TestimonialsSection />

      {/* 8. Newsletter */}
      <NewsletterSection />
    </motion.div>
  );
};

export default Home;

