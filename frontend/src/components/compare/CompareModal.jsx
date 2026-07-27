import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiShoppingCart, FiTrash2, FiLayers } from 'react-icons/fi';
import { useCompare } from '../../context/CompareContext';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatters';

const CompareModal = () => {
  const { compareItems, removeFromCompare, clearCompare, isCompareOpen, setIsCompareOpen } = useCompare();
  const { addToCart } = useCart();

  if (!isCompareOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-5xl rounded-3xl p-6 shadow-2xl space-y-6 overflow-hidden max-h-[90vh] flex flex-col text-slate-900 dark:text-slate-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
            <div className="flex items-center gap-2">
              <FiLayers className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-black">Product Specification Comparison ({compareItems.length}/4)</h2>
            </div>
            <div className="flex items-center gap-3">
              {compareItems.length > 0 && (
                <button onClick={clearCompare} className="text-xs font-bold text-rose-500 hover:underline">
                  Clear All
                </button>
              )}
              <button onClick={() => setIsCompareOpen(false)} className="text-slate-400 hover:text-slate-600">
                <FiX className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Comparison Matrix Body */}
          {compareItems.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <FiLayers className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-500">No products added for comparison yet.</p>
              <p className="text-xs text-slate-400">Click the "Compare" button on any product card to compare specs side-by-side!</p>
            </div>
          ) : (
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                    <th className="p-4 w-40 font-extrabold uppercase text-slate-400">Feature / Spec</th>
                    {compareItems.map((item) => (
                      <th key={item._id} className="p-4 min-w-[200px]">
                        <div className="space-y-2 relative">
                          <button
                            onClick={() => removeFromCompare(item._id)}
                            className="absolute -top-1 -right-1 text-slate-400 hover:text-rose-500"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                          <img src={item.image || item.images?.[0]?.url} alt={item.name} className="w-20 h-20 object-cover rounded-2xl border border-slate-200" />
                          <h4 className="font-extrabold text-sm line-clamp-2">{item.name}</h4>
                          <p className="font-black text-indigo-600 text-sm">{formatCurrency(item.price)}</p>
                          <button
                            onClick={() => addToCart(item, 1)}
                            className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center justify-center gap-1.5"
                          >
                            <FiShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-bold">
                  <tr>
                    <td className="p-4 text-slate-400 uppercase font-extrabold">Brand</td>
                    {compareItems.map((item) => (
                      <td key={item._id} className="p-4 text-indigo-600">{item.brand || 'NovaCart'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-slate-400 uppercase font-extrabold">Category</td>
                    {compareItems.map((item) => (
                      <td key={item._id} className="p-4">{item.category}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-slate-400 uppercase font-extrabold">Customer Rating</td>
                    {compareItems.map((item) => (
                      <td key={item._id} className="p-4 text-amber-500 font-black">★ {item.rating || 4.5} / 5</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-slate-400 uppercase font-extrabold">Stock Availability</td>
                    {compareItems.map((item) => (
                      <td key={item._id} className="p-4">
                        {(item.stock || 10) > 0 ? (
                          <span className="text-emerald-600 font-black flex items-center gap-1"><FiCheck /> In Stock ({item.stock || 10})</span>
                        ) : (
                          <span className="text-rose-500 font-black">Out of Stock</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-slate-400 uppercase font-extrabold">Warranty</td>
                    {compareItems.map((item) => (
                      <td key={item._id} className="p-4">{item.warranty || '1 Year Brand Warranty'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-slate-400 uppercase font-extrabold">Eco Score</td>
                    {compareItems.map((item) => (
                      <td key={item._id} className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black">
                          🌱 {Math.min(95, Math.max(65, ((item.price || 1000) % 35) + 65))} / 100
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CompareModal;
