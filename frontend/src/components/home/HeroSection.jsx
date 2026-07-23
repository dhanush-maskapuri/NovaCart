import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCpu, FiShield, FiZap, FiStar } from 'react-icons/fi';
import Button from '../common/Button';

/**
 * HeroSection Component
 * Apple / SaaS inspired minimalist hero section with AI tagline, CTAs, and glassmorphism preview graphic.
 */
const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-24">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/20 blur-3xl rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col items-start text-left gap-6"
          >
            {/* AI Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400 text-xs font-semibold">
              <FiCpu className="w-4 h-4 animate-pulse" />
              <span>AI-Powered Shopping Curation</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 leading-[1.15]">
              Experience the{' '}
              <span className="bg-gradient-to-r from-primary-600 via-indigo-500 to-purple-600 dark:from-primary-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
                Future of E-Commerce
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
              Curated precision engineering meets minimal aesthetic. ShopSphere intuitively tailors premium lifestyle, electronics, and fashion directly to your world.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                size="lg"
                rightIcon={<FiArrowRight className="w-5 h-5" />}
                onClick={() => navigate('/shop')}
              >
                Explore Collection
              </Button>
              <Button
                size="lg"
                variant="secondary"
                leftIcon={<FiStar className="w-5 h-5 text-amber-500 fill-amber-500" />}
                onClick={() => navigate('/shop')}
              >
                Try AI Recommendations
              </Button>
            </div>

            {/* Quick Feature Badges */}
            <div className="flex items-center gap-6 pt-6 border-t border-gray-100 dark:border-dark-border text-xs font-medium text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <FiZap className="w-4 h-4 text-amber-500" />
                <span>Next-Day Shipping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiShield className="w-4 h-4 text-emerald-500" />
                <span>Verified Products</span>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl p-6 bg-gradient-to-br from-white/80 to-white/40 dark:from-dark-card/80 dark:to-dark-card/40 border border-gray-200/80 dark:border-dark-border shadow-2xl backdrop-blur-xl overflow-hidden group">
              <div className="aspect-square rounded-2xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                  alt="Hero Premium Headphone"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-primary-400 font-bold mb-1">
                    Featured Edition
                  </span>
                  <h3 className="text-xl font-bold">SphereSound ANC Wireless</h3>
                  <p className="text-xs text-gray-200 mt-1">$299 • Studio-grade Sound</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
