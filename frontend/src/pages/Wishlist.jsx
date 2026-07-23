import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../components/common/EmptyState';
import { useWishlist } from '../hooks/useWishlist';

/**
 * Wishlist Page Placeholder
 * Displays saved products or an EmptyState view when no items are saved.
 */
const Wishlist = () => {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <EmptyState
          icon={FiHeart}
          title="Your wishlist is empty"
          description="Explore our wide range of products and add your favorites to your wishlist!"
          actionLabel="Explore Shop"
          actionIcon={<FiShoppingBag className="w-4 h-4" />}
          onAction={() => navigate('/shop')}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Wishlist items rendering placeholder */}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
