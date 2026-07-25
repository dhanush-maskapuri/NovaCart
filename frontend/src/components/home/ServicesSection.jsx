import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiZap, FiCheckCircle } from 'react-icons/fi';
import { SERVICE_HUBS } from '../../utils/constants';

/**
 * ServicesSection Component - Marketplace Hubs (NovaMart, NovaTech, NovaFashion, NovaHome, NovaCare)
 * Each with Hero Card, Image, Framer Motion animations, description, and CTA.
 */
const ServicesSection = () => {
  return (
    <section className="py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            HYPERLOCAL & SPECIALTY MARKETPLACES
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
            Explore ShopSphere Indian Hubs
          </h2>
        </div>
        <p className="text-xs md:text-sm text-slate-500 max-w-md">
          From 10-minute instant grocery delivery to certified electronic warranty & handcrafted Indian teakwood furniture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICE_HUBS.map((hub, index) => (
          <motion.div
            key={hub.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
          >
            {/* Image Banner */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={hub.image}
                alt={hub.name}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

              {/* Badge & Icon */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 shadow-md backdrop-blur-md flex items-center gap-1">
                  <span>{hub.icon}</span> {hub.badge}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest block">
                  {hub.tag}
                </span>
                <h3 className="text-xl font-black text-white">{hub.name}</h3>
              </div>
            </div>

            {/* Content & CTA */}
            <div className="p-6 flex flex-col justify-between flex-grow gap-4">
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {hub.description}
              </p>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <FiCheckCircle className="w-3.5 h-3.5" />
                  <span>GST Invoice Available</span>
                </div>

                <Link
                  to={`/shop?category=${hub.id.replace('nova', '')}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all group-hover:translate-x-1"
                >
                  <span>Explore {hub.name}</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
