import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * BrandCollectionsSection Component - Official Brand Stores Showcase
 */
const BrandCollectionsSection = () => {
  const brands = [
    { name: 'boAt', tag: 'Sound of India', bg: 'from-red-600 to-rose-700', logo: '🎧' },
    { name: 'Apple', tag: 'Designed in California', bg: 'from-slate-800 to-slate-950', logo: '🍏' },
    { name: 'OnePlus', tag: 'Never Settle', bg: 'from-red-500 to-amber-600', logo: '📱' },
    { name: 'Nike', tag: 'Just Do It', bg: 'from-slate-900 to-indigo-950', logo: '👟' },
    { name: 'Tata', tag: 'Trust of India', bg: 'from-blue-700 to-indigo-900', logo: '🌾' },
    { name: 'Titan', tag: 'Be More', bg: 'from-purple-700 to-slate-900', logo: '⌚' },
    { name: 'Kama Ayurveda', tag: 'Pure Ayurveda', bg: 'from-amber-600 to-emerald-800', logo: '🌿' },
    { name: 'Royal Oak', tag: 'Teakwood Living', bg: 'from-orange-700 to-amber-900', logo: '🛋️' },
  ];

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            OFFICIAL BRAND PARTNERS
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
            Top Indian & Global Collections
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {brands.map((brand, index) => (
          <motion.div
            key={brand.name}
            whileHover={{ y: -6, scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              to={`/shop?search=${encodeURIComponent(brand.name)}`}
              className={`flex flex-col items-center justify-center p-4 rounded-3xl bg-gradient-to-b ${brand.bg} text-white shadow-md text-center h-32 relative overflow-hidden group border border-white/10`}
            >
              <span className="text-3xl mb-1 group-hover:scale-125 transition-transform duration-300">
                {brand.logo}
              </span>
              <h4 className="text-sm font-extrabold tracking-tight">{brand.name}</h4>
              <span className="text-[9px] font-semibold text-white/70 block mt-0.5 line-clamp-1">
                {brand.tag}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BrandCollectionsSection;
