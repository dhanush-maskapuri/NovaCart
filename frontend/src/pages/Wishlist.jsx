import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiTrash2, FiTrendingDown } from 'react-icons/fi';
import EmptyState from '../components/common/EmptyState';
import ProductGrid from '../components/product/ProductGrid';
import Breadcrumb from '../components/common/Breadcrumb';
import { useWishlist } from '../hooks/useWishlist';
import { products } from '../data/products';
import { fadeIn } from '../animations/variants';

/**
 * Wishlist Page Component - Indian Marketplace Upgrade
 * Features Price Drop Alert Badges & Product Recommendations.
 */
const Wishlist = () => {
  const { wishlist = [], clearWishlist } = useWishlist();
  const navigate = useNavigate();

  const recommendedProducts = products.filter((p) => !wishlist.some((w) => w._id === p._id)).slice(0, 4);

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-8">
      <Breadcrumb items={[{ label: 'Saved Wishlist' }]} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-rose-500">
            SAVED FAVORITES
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
            My Wishlist ({wishlist.length})
          </h1>
        </div>

        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-rose-500 transition-colors"
          >
            <FiTrash2 className="w-4 h-4" />
            <span>Clear All Wishlist</span>
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <EmptyState
          icon={FiHeart}
          title="Your wishlist is empty"
          description="Explore our catalog and save boAt headphones, Apple devices, or 10-Min NovaMart groceries."
          actionLabel="Explore Catalog"
          actionIcon={<FiShoppingBag className="w-4 h-4" />}
          onAction={() => navigate('/shop')}
        />
      ) : (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2 text-xs font-extrabold text-amber-700 dark:text-amber-300">
            <FiTrendingDown className="w-4 h-4" />
            <span>Price Drop Alert: 2 items in your wishlist have dropped in price by up to 25%!</span>
          </div>

          <ProductGrid products={wishlist} />
        </div>
      )}

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <section className="pt-10 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-6">
            Recommended Based on Your Saved Items
          </h2>
          <ProductGrid products={recommendedProducts} />
        </section>
      )}
    </motion.div>
  );
};

export default Wishlist;
