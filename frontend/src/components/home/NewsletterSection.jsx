import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiCheck } from 'react-icons/fi';

/**
 * NewsletterSection Component
 */
const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-12">
      <div className="relative rounded-3xl p-8 md:p-12 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white shadow-2xl overflow-hidden">
        <div className="relative z-10 max-w-xl mx-auto text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto text-white">
            <FiMail className="w-6 h-6" />
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Subscribe for Festive Coupons & 10-Min Drops
          </h2>
          <p className="text-xs md:text-sm text-indigo-100 leading-relaxed">
            Get exclusive ₹500 discount vouchers, early access to Great Indian Festival deals, and new NovaMart product alerts.
          </p>

          {isSubscribed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-2xl bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2"
            >
              <FiCheck className="w-5 h-5" />
              <span>Thank you! Your ₹500 festive coupon code is: FESTIVE500</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 text-xs rounded-2xl border border-white/20 bg-white/10 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs shadow-lg transition-all"
              >
                Claim Coupon
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
