import { motion } from 'framer-motion';
import { mockReviews } from '../../data/products';
import ReviewCard from '../product/ReviewCard';

/**
 * TestimonialsSection Component
 * Customer reviews and satisfaction testimonials grid.
 */
const TestimonialsSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
          Community Feedback
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mt-1">
          Loved by 50,000+ Shoppers
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ReviewCard review={review} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
