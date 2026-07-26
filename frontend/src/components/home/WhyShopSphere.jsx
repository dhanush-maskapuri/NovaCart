import { motion } from 'framer-motion';
import { FiZap, FiShield, FiRefreshCw, FiFileText } from 'react-icons/fi';

/**
 * WhyShopSphere Component
 */
const WhyShopSphere = () => {
  const features = [
    {
      icon: FiZap,
      title: '10-Min Hyperlocal Delivery',
      description: 'Powered by NovaMart dark stores across major Indian cities.',
      color: 'bg-amber-500/10 text-amber-500',
    },
    {
      icon: FiShield,
      title: '100% Genuine Warranties',
      description: 'Official Indian brand seals with doorstep technician support.',
      color: 'bg-indigo-500/10 text-indigo-500',
    },
    {
      icon: FiRefreshCw,
      title: 'Instant UPI Refunds',
      description: 'Zero waiting period on returns straight to GPay or PhonePe.',
      color: 'bg-emerald-500/10 text-emerald-500',
    },
    {
      icon: FiFileText,
      title: 'GST Invoice Ready',
      description: 'Save up to 18% with tax credit on corporate purchases.',
      color: 'bg-purple-500/10 text-purple-500',
    },
  ];

  return (
    <section className="py-12 px-6 rounded-3xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          WHY CUSTOMERS TRUST US
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
          Why 1 Crore+ Shoppers Choose NovaCart
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-xs text-center flex flex-col items-center"
            >
              <div className={`p-3.5 rounded-2xl ${item.color} mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyShopSphere;
