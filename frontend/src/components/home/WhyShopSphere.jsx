import { motion } from 'framer-motion';
import { FiTruck, FiShield, FiRefreshCw, FiCpu, FiHeadphones } from 'react-icons/fi';

/**
 * WhyShopSphere Component
 * Highlights platform value propositions: Fast Delivery, Secure Payments, Easy Returns, AI Recommendations, 24x7 Support.
 */
const WhyShopSphere = () => {
  const features = [
    {
      icon: FiTruck,
      title: 'Fast Delivery',
      description: 'Expedited shipping direct to your door with real-time GPS tracking.',
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40',
    },
    {
      icon: FiShield,
      title: 'Secure Payments',
      description: 'Bank-grade 256-bit encryption for seamless and safe checkout.',
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40',
    },
    {
      icon: FiRefreshCw,
      title: 'Easy Returns',
      description: 'Hassle-free 30-day return policy with instant door pickup.',
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40',
    },
    {
      icon: FiCpu,
      title: 'AI Recommendations',
      description: 'Intelligent curation algorithms tailored to your exact taste.',
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40',
    },
    {
      icon: FiHeadphones,
      title: '24x7 Support',
      description: 'Dedicated customer care team ready round-the-clock for your assistance.',
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40',
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
          The ShopSphere Difference
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mt-1">
          Why Modern Shoppers Choose Us
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-white dark:bg-dark-card border border-gray-200/80 dark:border-dark-border shadow-xs hover:shadow-lg transition-all flex flex-col items-start gap-4"
            >
              <div className={`p-3.5 rounded-2xl ${feature.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyShopSphere;
