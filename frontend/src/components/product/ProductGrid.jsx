import ProductCard from './ProductCard';
import Skeleton from '../common/Skeleton';
import EmptyState from '../common/EmptyState';

/**
 * ProductGrid Component
 * Responsive grid displaying product cards, skeleton loaders during fetch states, and EmptyState when empty.
 */
const ProductGrid = ({ products = [], isLoading = false, emptyTitle = 'No products found', emptyMessage = 'Try adjusting your filters or search terms.' }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-3 p-4 bg-white dark:bg-dark-card rounded-3xl border border-gray-100 dark:border-dark-border">
            <Skeleton variant="rectangular" className="h-48 rounded-2xl" />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="title" width="80%" />
            <div className="flex justify-between items-center pt-2">
              <Skeleton variant="text" width="30%" />
              <Skeleton variant="circular" width={36} height={36} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyMessage}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id || product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
