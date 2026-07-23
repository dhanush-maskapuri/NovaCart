import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiCheck, FiShield } from 'react-icons/fi';
import Button from '../common/Button';

/**
 * NewsletterSection Component
 * Modern SaaS email subscription card with anti-spam guarantee and submission feedback.
 */
const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
    }
  };

  return (
    <section className="py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="p-8 md:p-14 rounded-3xl bg-white dark:bg-dark-card border border-gray-200/80 dark:border-dark-border shadow-lg text-center max-w-4xl mx-auto flex flex-col items-center gap-6"
      >
        <div className="p-3.5 bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 rounded-full">
          <FiMail className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            Stay ahead of the curve
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-lg mx-auto">
            Subscribe to receive exclusive drop announcements, AI shopping insights, and VIP discounts directly to your inbox.
          </p>
        </div>

        {isSubscribed ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-6 py-3 rounded-2xl border border-emerald-200 dark:border-emerald-900"
          >
            <FiCheck className="w-5 h-5" />
            <span>Thank you for subscribing! Check your inbox for your welcome gift.</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Button type="submit" size="md" className="w-full sm:w-auto shrink-0">
              Subscribe
            </Button>
          </form>
        )}

        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
          <FiShield className="w-3.5 h-3.5" />
          <span>No spam guaranteed. Unsubscribe anytime with 1-click.</span>
        </div>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
