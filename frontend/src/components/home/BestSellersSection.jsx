import { useState, useEffect } from 'react';
import ProductCard from '../product/ProductCard';
import { products as fallbackProducts } from '../../data/products';
import { fetchBestSellers } from '../../services/productService';

/**
 * BestSellersSection Component - Connected to API
 */
const BestSellersSection = () => {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchBestSellers(4);
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          setBestSellers(res.data);
        } else {
          setBestSellers(fallbackProducts.filter((p) => p.isBestSeller).slice(0, 4));
        }
      } catch (err) {
        setBestSellers(fallbackProducts.filter((p) => p.isBestSeller).slice(0, 4));
      }
    };
    load();
  }, []);

  return (
    <section className="py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            MOST LOVED BY INDIAN CUSTOMERS
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
            Marketplace Best Sellers
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {(bestSellers.length > 0 ? bestSellers : fallbackProducts.slice(0, 4)).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestSellersSection;
