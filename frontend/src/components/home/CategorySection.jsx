import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { categories } from '../../data/categories';

/**
 * CategorySection Component
 * Displays 8 category cards with hover animations and product count badges.
 */
const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 md:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Curated Collections
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mt-1">
            Shop by Category
          </h2>
        </div>
        <button
          onClick={() => navigate('/shop')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:gap-3 transition-all"
        >
          <span>View All Categories</span>
          <FiArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -6 }}
            onClick={() => navigate(`/shop?category=${encodeURIComponent(category.name)}`)}
            className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200/60 dark:border-dark-border"
          >
            {/* Background Image */}
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity group-hover:opacity-90" />

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
              <div className="flex justify-end">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20">
                  {category.count} Products
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-primary-300 transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-1">{category.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
