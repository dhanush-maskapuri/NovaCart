import { useState, useEffect, useCallback } from 'react';
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
  FiMapPin,
  FiFileText,
  FiAlertTriangle,
} from 'react-icons/fi';
import ProductGallery from '../components/product/ProductGallery';
import Rating from '../components/product/Rating';
import ReviewCard from '../components/product/ReviewCard';
import ProductGrid from '../components/product/ProductGrid';
import PriceHistoryWidget from '../components/product/PriceHistoryWidget';
import EcoScoreBadge from '../components/product/EcoScoreBadge';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import { products, mockReviews } from '../data/products';
import { fetchProductById, fetchProducts } from '../services/productService';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { fadeIn } from '../animations/variants';
import { formatCurrency, calculateGST } from '../utils/formatters';

/**
 * ProductDetails Page Component - Integrated with Price History & Sustainability Eco-Score
 */
const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addRecentlyViewed } = useRecentlyViewed();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);

  const loadProductData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchProductById(id);
      let foundProd = null;
      if (res && res.success && res.data) {
        foundProd = res.data;
      } else {
        foundProd = products.find((p) => p._id === id) || products[0];
      }
      setProduct(foundProd);
      if (foundProd) {
        addRecentlyViewed(foundProd);
      }

      // Fetch related items
      const relRes = await fetchProducts({ limit: 4 });
      if (relRes && relRes.success && Array.isArray(relRes.data?.products)) {
        setRelatedProducts(relRes.data.products.filter((p) => p._id !== id).slice(0, 4));
      } else {
        setRelatedProducts(products.slice(1, 5));
      }
    } catch (err) {
      console.warn('API error fetching product details, using local dataset:', err);
      const found = products.find((p) => p._id === id) || products[0];
      setProduct(found);
      if (found) addRecentlyViewed(found);
      setRelatedProducts(products.slice(1, 5));
    } finally {
      setLoading(false);
    }
  }, [id, addRecentlyViewed]);

  useEffect(() => {
    loadProductData();
  }, [loadProductData]);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3">
        <Loader message="Loading product details from NovaCart..." />
      </div>
    );
  }

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
    numReviews = 42,
    images = [],
    image,
    gallery = [],
    description,
    specifications = {},
    specs = {},
    stock = 10,
    status,
    seller = 'NovaCart Official Retailer',
    warranty = '1 Year Manufacturer Warranty',
    deliveryTime = '10 Mins Express',
    deliveryEstimate = '10 Mins Express',
    returnPolicy = '7 Days Replacement Policy',
    highlights = [],
  } = product;

  const isStockAvailable = stock > 0 && status !== 'out_of_stock';
  const isWishlisted = isInWishlist(_id);
  const gstDetails = calculateGST(price * quantity);

  const imageGallery =
    gallery.length > 0
      ? gallery
      : images.length > 0
      ? images.map((img) => img.url)
      : [image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'];

  const mergedSpecs = {
    ...specs,
    ...(specifications instanceof Map ? Object.fromEntries(specifications) : specifications),
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(_id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    if (isStockAvailable) {
      addToCart(product, quantity);
    }
  };

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeStatus(`Available! ${deliveryTime || deliveryEstimate} delivery for pincode ${pincode}`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian Pincode.');
    }
  };

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-12">
      {/* Breadcrumb Trail */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <FiChevronRight className="w-3.5 h-3.5" />
        <Link to="/shop" className="hover:text-indigo-600">Shop</Link>
        <FiChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-slate-100 font-bold truncate max-w-xs">{name}</span>
      </nav>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 sticky top-24 space-y-6">
          <ProductGallery images={imageGallery} title={name} />
          {/* Price History Graph Widget */}
          <PriceHistoryWidget currentPrice={price} originalPrice={originalPrice} />
        </div>

        {/* Right Column: Information & Actions */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {brand} • {category}
              </span>
              <EcoScoreBadge price={price} />
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {name}
            </h1>

            <div className="flex items-center gap-3 pt-1">
              <Rating value={rating} text={`${reviewsCount || numReviews} verified ratings`} />
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs font-bold text-slate-500">Seller: {seller}</span>
            </div>
          </div>

          {/* Pricing Block with ₹ formatting */}
          <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900 dark:text-slate-100">
                {formatCurrency(price)}
              </span>
              {originalPrice > price && (
                <>
                  <span className="text-sm line-through text-slate-400 font-semibold">
                    {formatCurrency(originalPrice)}
                  </span>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                    {discount || Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="text-[11px] font-bold text-slate-500 flex items-center gap-2">
              <FiFileText className="text-indigo-600" />
              <span>Includes GST Tax Invoice ({formatCurrency(gstDetails.taxAmount)} Tax included)</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
          </p>

          {/* Quantity Selector & Add to Cart */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-500">Quantity:</span>
              <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                  className="p-2.5 text-slate-600 hover:text-indigo-600"
                >
                  <FiMinus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-black text-slate-900 dark:text-slate-100">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(q + 1, stock || 10))}
                  className="p-2.5 text-slate-600 hover:text-indigo-600"
                >
                  <FiPlus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={handleAddToCart}
                isDisabled={!isStockAvailable}
                fullWidth
                size="lg"
                leftIcon={<FiShoppingCart className="w-5 h-5" />}
              >
                {isStockAvailable ? 'Add to Cart' : 'Out of Stock'}
              </Button>

              <Button
                variant={isWishlisted ? 'primary' : 'secondary'}
                onClick={handleWishlistToggle}
                fullWidth
                size="lg"
                leftIcon={<FiHeart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />}
              >
                {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>
          </div>

          {/* Delivery & Pincode Checker */}
          <div className="p-4 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-2.5 pl-9 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                />
                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
              <Button type="submit" variant="secondary" size="sm">
                Check
              </Button>
            </form>

            {pincodeStatus && (
              <p className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <FiCheckCircle className="w-4 h-4" />
                <span>{pincodeStatus}</span>
              </p>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] font-bold text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <FiTruck className="w-4 h-4 text-indigo-600" />
                <span>{deliveryTime || deliveryEstimate}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiShield className="w-4 h-4 text-emerald-600" />
                <span>{returnPolicy}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications & Customer Reviews */}
      <div className="border-t border-slate-200 dark:border-slate-800 pt-8 space-y-6">
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-sm font-black">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'specs'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'reviews'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Customer Reviews ({reviewsCount || numReviews})
          </button>
        </div>

        {activeTab === 'specs' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            {Object.keys(mergedSpecs).length > 0 ? (
              Object.entries(mergedSpecs).map(([key, val]) => (
                <div key={key} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex justify-between text-xs">
                  <span className="font-extrabold text-slate-500">{key}:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{String(val)}</span>
                </div>
              ))
            ) : (
              <div className="p-4 text-xs font-bold text-slate-500">
                Standard {brand} Warranty ({warranty}) with verified GST invoice details.
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 max-w-3xl">
            {mockReviews.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>
        )}
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 space-y-4">
          <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
            Similar Products You Might Like
          </h3>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </motion.div>
  );
};

export default ProductDetails;
