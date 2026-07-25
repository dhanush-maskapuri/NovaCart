import { motion } from 'framer-motion';
import { mockReviews } from '../../data/products';
import Rating from '../product/Rating';

/**
 * TestimonialsSection Component
 */
const TestimonialsSection = () => {
  return (
    <section className="py-12">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          REAL VERIFIED CUSTOMER REVIEWS
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
          Loved Across India
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockReviews.map((rev, idx) => (
          <motion.div
            key={rev.id}
            whileHover={{ y: -6 }}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={rev.avatar}
                  alt={rev.userName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {rev.userName}
                  </h4>
                  <span className="text-[10px] text-emerald-600 font-bold">Verified Buyer</span>
                </div>
              </div>

              <Rating rating={rev.rating} size="xs" />

              <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-2 mb-1">
                "{rev.title}"
              </h5>
              <p className="text-xs text-slate-500 leading-relaxed">{rev.content}</p>
            </div>

            <span className="text-[10px] text-slate-400 font-mono mt-4 block">{rev.date}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
