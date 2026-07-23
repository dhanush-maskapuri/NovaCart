import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPercent } from 'react-icons/fi';
import Button from '../common/Button';

/**
 * PromoBanner Component
 * High impact promotional banner section with discount badges and action CTA.
 */
const PromoBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 text-white p-8 md:p-14 border border-gray-800 shadow-2xl"
      >
        {/* Background Decorative Blur */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-primary-500/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-2xl flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-amber-400">
            <FiPercent className="w-4 h-4" />
            <span>Limited Time Event</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Summer Innovation & Style Drop.{' '}
            <span className="bg-gradient-to-r from-primary-400 to-indigo-300 bg-clip-text text-transparent">
              Up to 40% Off.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Upgrade your ecosystem with our flagship wireless audio, smart wearables, and apparel drops. Discount automatically applied at checkout.
          </p>

          <div className="pt-2">
            <Button
              size="lg"
              rightIcon={<FiArrowRight className="w-5 h-5" />}
              onClick={() => navigate('/shop')}
            >
              Shop Summer Sale
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PromoBanner;
