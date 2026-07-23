import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-12"
    >
      <section className="bg-gradient-to-r from-primary-600 to-indigo-600 text-white rounded-3xl p-12 text-center shadow-xl">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          Discover Premium Collections at ShopSphere
        </h1>
        <p className="text-lg text-primary-100 max-w-2xl mx-auto mb-8">
          Elevate your lifestyle with modern design, unmatched quality, and effortless shopping.
        </p>
      </section>
    </motion.div>
  );
};

export default Home;
