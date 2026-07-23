import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import EmptyState from '../components/common/EmptyState';
import ProductGrid from '../components/product/ProductGrid';
import Breadcrumb from '../components/common/Breadcrumb';
import { useWishlist } from '../hooks/useWishlist';
import { fadeIn } from '../animations/variants';

/**
 * Wishlist Page Component
 * Renders user's saved products in a grid or EmptyState view when empty.
 */
const Wishlist = () => {
  const { wishlist = [], clearWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6">
      <Breadcrumb items={[{ label: 'Saved Wishlist' }]} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
            Saved Favorites
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mt-1">
            My Wishlist ({wishlist.length})
          </h1>
        </div>

        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-rose-500 transition-colors"
          >
            <FiTrash2 className="w-4 h-4" />
            <span>Clear Wishlist</span>
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <EmptyState
          icon={FiHeart}
          title="Your wishlist is empty"
          description="Explore our curated catalog and save your favorite electronics, apparel, and lifestyle gear."
          actionLabel="Explore Catalog"
          actionIcon={<FiShoppingBag className="w-4 h-4" />}
          onAction={() => navigate('/shop')}
        />
      ) : (
        <ProductGrid products={wishlist} />
      )}
    </motion.div>
  );
};

export default Wishlist;


