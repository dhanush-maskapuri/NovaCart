import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import { fadeIn } from '../../animations/variants';

/**
 * MainLayout Component
 * Root layout structure providing sticky Navbar header, page transitions for Outlet, and responsive Footer.
 */
const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 transition-colors duration-200 selection:bg-primary-500 selection:text-white">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex-grow container mx-auto px-4 py-6 md:py-10"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default MainLayout;

