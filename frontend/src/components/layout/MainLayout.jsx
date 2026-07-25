import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import MobileBottomNav from '../common/MobileBottomNav';
import { fadeIn } from '../../animations/variants';

/**
 * MainLayout Component - NOVACART Layout Wrapper
 * Sticky Navbar header, animated page transitions for Outlet, responsive Footer, and MobileBottomNav.
 */
const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-indigo-600 selection:text-white pb-16 lg:pb-0 font-sans">
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
      <MobileBottomNav />
    </div>
  );
};

export default MainLayout;
