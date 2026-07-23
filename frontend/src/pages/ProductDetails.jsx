import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiShoppingCart,
  FiHeart,
  FiCheckCircle,
  FiTruck,
  FiShield,
  FiChevronRight,
  FiMinus,
  FiPlus,
  FiStar,
} from 'react-icons/fi';
import ProductGallery from '../components/product/ProductGallery';
import Rating from '../components/product/Rating';
import ReviewCard from '../components/product/ReviewCard';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import { products, mockReviews } from '../data/products';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { fadeIn } from '../animations/variants';

/**
 * ProductDetails Page Component
 * Premium product details view featuring image gallery, specs, review cards, quantity selector, and related products.
 */
const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'reviews'

  // Find target product from mock data or fallback to first product
  const product = products.find((p) => p._id === id) || products[0];

  if (!product) {
    return (
      <EmptyState
        title="Product Not Found"
        description="The requested product could not be located in our catalog."
      />
    );
  }

  const {
    _id,
    name,
    brand,
    category,
    price,
    originalPrice,
    discount,
    rating = 4.8,
    reviewsCount = 42,
    gallery = [],
    description,
    specs = {},
    inStock = true,
  } = product;

  const isWishlisted = isInWishlist(_id);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(_id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const relatedProducts = products.filter((p) => p.category === category && p._id !== _id).slice(0, 4);

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">
          Home
        </Link>
        <FiChevronRight className="w-3 h-3" />
        <Link to="/shop" className="hover:text-primary-600 dark:hover:text-primary-400">
          Shop
        </Link>
        <FiChevronRight className="w-3 h-3" />
        <span className="text-gray-900 dark:text-gray-100 font-semibold truncate max-w-[200px]">
          {name}
        </span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6">
          <ProductGallery images={gallery} name={name} discount={discount} />
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
              {brand || category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mt-1 mb-2">
              {name}
            </h1>

            <div className="flex items-center gap-4">
              <Rating rating={rating} reviewsCount={reviewsCount} size="md" />
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <span
                className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  inStock
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                    : 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400'
                }`}
              >
                <FiCheckCircle className="w-3.5 h-3.5" />
                {inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="flex items-baseline gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-dark-card border border-gray-100 dark:border-dark-border">
            <span className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">${price}</span>
            {originalPrice > price && (
              <span className="text-base text-gray-400 line-through font-medium">${originalPrice}</span>
            )}
            {discount > 0 && (
              <span className="text-xs font-bold text-red-500 bg-red-100 dark:bg-red-950/60 px-2 py-0.5 rounded-md ml-auto">
                Save ${(originalPrice - price).toFixed(0)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Quantity:
            </span>
            <div className="flex items-center border border-gray-200 dark:border-dark-border rounded-xl bg-white dark:bg-dark-card">
              <button
                onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                aria-label="Decrease quantity"
                className="p-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <FiMinus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center text-sm font-bold text-gray-900 dark:text-gray-100">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="p-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-2">
            <Button
              size="lg"
              onClick={handleAddToCart}
              leftIcon={<FiShoppingCart className="w-5 h-5" />}
              className="flex-1"
            >
              Add to Cart (${price * quantity})
            </Button>

            <button
              onClick={handleWishlistToggle}
              aria-label="Wishlist toggle"
              className={`p-3.5 rounded-xl border transition-colors ${
                isWishlisted
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-card'
              }`}
            >
              <FiHeart className={`w-6 h-6 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-dark-border text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <FiTruck className="w-4 h-4 text-primary-500" />
              <span>Free Express Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <FiShield className="w-4 h-4 text-emerald-500" />
              <span>2 Year Official Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications & Customer Reviews */}
      <div className="pt-8">
        <div className="flex items-center gap-6 border-b border-gray-200 dark:border-dark-border mb-6">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-sm font-bold transition-colors relative ${
              activeTab === 'specs'
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <span>Specifications</span>
            {activeTab === 'specs' && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-sm font-bold transition-colors relative ${
              activeTab === 'reviews'
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <span>Customer Reviews ({mockReviews.length})</span>
            {activeTab === 'reviews' && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
              />
            )}
          </button>
        </div>

        {/* Specifications Tab */}
        {activeTab === 'specs' && (
          <div className="max-w-2xl bg-white dark:bg-dark-card border border-gray-200/80 dark:border-dark-border rounded-2xl overflow-hidden p-6">
            <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 mb-4">
              Technical Specifications
            </h3>
            <div className="divide-y divide-gray-100 dark:divide-dark-border/60">
              {Object.entries(specs).map(([key, val]) => (
                <div key={key} className="py-3 flex justify-between text-xs">
                  <span className="font-semibold text-gray-500 dark:text-gray-400">{key}</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockReviews.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>
        )}
      </div>

      {/* Related Products Recommendations */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-gray-200 dark:border-dark-border">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mb-6">
            You Might Also Like
          </h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </motion.div>
  );
};

export default ProductDetails;
