import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';

/**
 * CategorySection Component - Featured Indian Categories
 */
const CategorySection = () => {
  return (
    <section className="py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            BROWSE BY CATEGORY
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
            Featured Categories
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            whileHover={{ y: -6 }}
          >
            <Link
              to={`/shop?category=${cat.slug}`}
              className="group relative flex flex-col justify-between h-48 rounded-3xl p-5 overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 dark:border-slate-800 transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

              <div className="relative z-10 flex justify-between items-start">
                <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-slate-100 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs uppercase">
                  {cat.badge}
                </span>
                <span className="text-xs font-bold text-white/80 bg-slate-950/40 px-2 py-0.5 rounded-full">
                  {cat.count}+ items
                </span>
              </div>

              <div className="relative z-10 text-white">
                <h3 className="text-lg font-black leading-tight group-hover:text-amber-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-200 mt-1 line-clamp-1">
                  {cat.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
