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
  FiMapPin,
  FiZap,
  FiPercent,
  FiFileText,
  FiLayers,
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
import { formatCurrency, calculateGST } from '../utils/formatters';

/**
 * ProductDetails Page Component - Indian Marketplace Overhaul
 * Pincode Delivery Check, Bank Offers & Coupons, GST Claim Details, Specs,
 * Frequently Bought Together bundle widget, & Customer Reviews.
 */
const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);

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
    hsnCode = '8518',
    deliveryTime = '10 Mins Express',
  } = product;

  const isWishlisted = isInWishlist(_id);
  const gstDetails = calculateGST(price * quantity);

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

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeStatus(`Available! ${deliveryTime} delivery for pincode ${pincode}`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian Pincode.');
    }
  };

  const relatedProducts = products.filter((p) => p.category === category && p._id !== _id).slice(0, 4);
  const bundleProduct = products.find((p) => p._id !== _id) || products[1];

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-bold text-slate-500">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <FiChevronRight className="w-3 h-3" />
        <Link to="/shop" className="hover:text-indigo-600">Shop Catalog</Link>
        <FiChevronRight className="w-3 h-3" />
        <span className="text-slate-900 dark:text-slate-100 font-extrabold truncate max-w-[240px]">
          {name}
        </span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6">
          <ProductGallery images={gallery} name={name} discount={discount} />
        </div>

        {/* Right Column: Details & Indian Banking / Pincode Modules */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
              <span>{brand || category}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-mono">HSN: {hsnCode}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
              {name}
            </h1>

            <div className="flex items-center gap-4 mt-2">
              <Rating rating={rating} reviewsCount={reviewsCount} size="md" />
              <span className="text-slate-300">|</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full">
                <FiCheckCircle className="w-3.5 h-3.5" />
                {inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Pricing Box in ₹ */}
          <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900 dark:text-slate-100">
                {formatCurrency(price)}
              </span>
              {originalPrice > price && (
                <span className="text-base text-slate-400 line-through font-bold">
                  {formatCurrency(originalPrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="text-xs font-black text-rose-600 bg-rose-100 dark:bg-rose-950/60 px-2.5 py-0.5 rounded-full ml-auto uppercase">
                  Save {discount}%
                </span>
              )}
            </div>
            <p className="text-[11px] font-semibold text-slate-500">
              Inclusive of 18% GST ({formatCurrency(gstDetails.totalGst)} CGST+SGST split)
            </p>
          </div>

          {/* Indian Bank Offers Box */}
          <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
            <div className="flex items-center gap-2 font-extrabold text-amber-700 dark:text-amber-300">
              <FiPercent className="w-4 h-4" />
              <span>Available Bank Offers & Festive Coupons</span>
            </div>
            <ul className="space-y-1 text-slate-700 dark:text-slate-300 font-medium">
              <li>• <strong>HDFC Credit Card:</strong> 10% Instant Discount up to ₹1,500</li>
              <li>• <strong>ICICI NetBanking:</strong> Flat ₹500 Cashback on min purchase of ₹3,000</li>
              <li>• Use coupon code <strong className="text-indigo-600">FESTIVE500</strong> for extra ₹500 Off</li>
            </ul>
          </div>

          {/* Pincode Delivery Check */}
          <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100">
              <FiMapPin className="w-4 h-4 text-indigo-600" />
              <span>Delivery Pincode Check</span>
            </div>

            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                className="flex-1 px-3.5 py-2 text-xs font-bold rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm"
              >
                Check Speed
              </button>
            </form>

            {pincodeStatus && (
              <p className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <FiZap className="w-3.5 h-3.5 fill-emerald-600" />
                <span>{pincodeStatus}</span>
              </p>
            )}
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                className="p-2 text-slate-600 hover:text-slate-900"
              >
                <FiMinus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center text-sm font-black">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 text-slate-600 hover:text-slate-900"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>

            <Button
              size="lg"
              onClick={handleAddToCart}
              leftIcon={<FiShoppingCart className="w-5 h-5" />}
              className="flex-1"
            >
              Add to Cart ({formatCurrency(price * quantity)})
            </Button>

            <button
              onClick={handleWishlistToggle}
              className={`p-3.5 rounded-2xl border transition-colors ${
                isWishlisted
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              <FiHeart className={`w-6 h-6 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together Bundle */}
      <div className="p-6 rounded-3xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-sm">
          <FiLayers className="w-5 h-5" />
          <span>Frequently Bought Together</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded-xl border" />
            <span className="font-extrabold text-slate-400 text-lg">+</span>
            <img src={bundleProduct.image} alt={bundleProduct.name} className="w-14 h-14 object-cover rounded-xl border" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {product.name} + {bundleProduct.name}
              </h4>
              <p className="text-xs font-black text-indigo-600">
                Bundle Price: {formatCurrency(price + bundleProduct.price - 200)} (Save ₹200)
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              addToCart(product);
              addToCart(bundleProduct);
            }}
            className="px-4 py-2 rounded-2xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold shadow-md shrink-0"
          >
            Add Both to Cart
          </button>
        </div>
      </div>

      {/* Tabs: Specifications & Customer Reviews */}
      <div className="pt-6">
        <div className="flex items-center gap-6 border-b border-slate-200 dark:border-slate-800 mb-6">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-sm font-extrabold transition-colors relative ${
              activeTab === 'specs' ? 'text-indigo-600' : 'text-slate-500'
            }`}
          >
            <span>Product Specifications</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-sm font-extrabold transition-colors relative ${
              activeTab === 'reviews' ? 'text-indigo-600' : 'text-slate-500'
            }`}
          >
            <span>Verified Customer Reviews ({mockReviews.length})</span>
          </button>
        </div>

        {activeTab === 'specs' && (
          <div className="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 mb-4">
              Technical Details & Warranty
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {Object.entries(specs).map(([key, val]) => (
                <div key={key} className="py-3 flex justify-between text-xs">
                  <span className="font-bold text-slate-500">{key}</span>
                  <span className="font-black text-slate-900 dark:text-slate-100">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockReviews.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>
        )}
      </div>

      {/* Recommended Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-6">
            Recommended Products
          </h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </motion.div>
  );
};

export default ProductDetails;
