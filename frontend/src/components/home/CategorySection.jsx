import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { categories } from '../../data/categories';

/**
 * CategorySection Component - Flipkart-Style Horizontal Cards
 * Displays categories (Electronics, Mobiles, Fashion, Beauty, Groceries, Kitchen, Furniture, Sports, Gaming, Books)
 * as horizontal cards with image, category name, number of products, hover & click animations.
 */
const CategorySection = () => {
  const navigate = useNavigate();

  // Highlight key categories required by prompt
  const mainCategories = [
    { id: 'mobiles', name: 'Mobiles', count: '240+ Products', slug: 'mobiles', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=400&q=80', color: 'from-blue-500 to-indigo-600' },
    { id: 'laptops', name: 'Electronics', count: '180+ Products', slug: 'laptops', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80', color: 'from-purple-500 to-indigo-600' },
    { id: 'fashion', name: 'Fashion', count: '520+ Products', slug: 'fashion', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=400&q=80', color: 'from-pink-500 to-rose-600' },
    { id: 'beauty', name: 'Beauty', count: '340+ Products', slug: 'beauty', image: 'https://images.unsplash.com/photo-1512290900676-26c2a6a095ae?auto=format&fit=crop&w=400&q=80', color: 'from-rose-400 to-pink-500' },
    { id: 'groceries', name: 'Groceries', count: '650+ Products', slug: 'groceries', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80', color: 'from-emerald-500 to-teal-600' },
    { id: 'kitchen', name: 'Kitchen', count: '220+ Products', slug: 'kitchen', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80', color: 'from-orange-500 to-amber-600' },
    { id: 'furniture', name: 'Furniture', count: '140+ Products', slug: 'furniture', image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=400&q=80', color: 'from-amber-700 to-yellow-800' },
    { id: 'sports', name: 'Sports', count: '175+ Products', slug: 'sports', image: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=400&q=80', color: 'from-emerald-600 to-cyan-700' },
    { id: 'gaming', name: 'Gaming', count: '150+ Products', slug: 'gaming', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80', color: 'from-violet-600 to-purple-700' },
    { id: 'books', name: 'Books', count: '290+ Products', slug: 'books', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80', color: 'from-blue-700 to-cyan-900' },
  ];

  return (
    <section className="py-8 my-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
            FLIPKART STYLE CATEGORY HUB
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Top Categories
          </h2>
        </div>
        <Link
          to="/shop"
          className="text-xs font-black text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          <span>View All 25+ Categories</span> →
        </Link>
      </div>

      {/* Horizontal Cards Layout (Scrollable on mobile, Grid on desktop) */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
        {mainCategories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.04 }}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate(`/shop?category=${cat.slug}`)}
            className="snap-start shrink-0 w-36 sm:w-44 p-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-800 relative shadow-inner">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
            </div>

            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {cat.name}
            </h3>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-0.5">
              {cat.count}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
