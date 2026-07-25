import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { formatCurrency } from '../../utils/formatters';
import { useCart } from '../../hooks/useCart';

/**
 * ProductCompareModal Component - Side-by-Side Product Comparison Drawer
 */
const ProductCompareModal = ({ isOpen, onClose, compareList = [], onRemove }) => {
  const { addToCart } = useCart();

  if (!isOpen || compareList.length === 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-4xl rounded-3xl shadow-2xl p-6 relative overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
                Compare Products ({compareList.length}/3)
              </h3>
              <p className="text-xs text-slate-500">
                Side-by-side specifications and Indian marketplace price comparison.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-2xl text-slate-400 hover:text-slate-600"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Comparison Table */}
          <div className="flex-1 overflow-x-auto overflow-y-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr>
                  <th className="w-40 p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 font-extrabold uppercase">
                    Attribute
                  </th>
                  {compareList.map((prod) => (
                    <th key={prod._id} className="p-3 min-w-[200px] border-l border-slate-200 dark:border-slate-800 align-top">
                      <div className="flex flex-col items-center text-center gap-2 relative">
                        <button
                          onClick={() => onRemove(prod._id)}
                          className="absolute top-0 right-0 p-1 text-slate-400 hover:text-rose-500"
                          title="Remove from compare"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-20 h-20 object-cover rounded-2xl border border-slate-200"
                        />
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 line-clamp-2">
                          {prod.name}
                        </h4>
                        <span className="text-sm font-black text-indigo-600">
                          {formatCurrency(prod.price)}
                        </span>
                        <button
                          onClick={() => addToCart(prod)}
                          className="w-full py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1"
                        >
                          <FiShoppingCart className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50 dark:bg-slate-800">Brand</td>
                  {compareList.map((p) => (
                    <td key={p._id} className="p-3 border-l border-slate-200 dark:border-slate-800 font-semibold">
                      {p.brand}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50 dark:bg-slate-800">Category</td>
                  {compareList.map((p) => (
                    <td key={p._id} className="p-3 border-l border-slate-200 dark:border-slate-800 font-semibold">
                      {p.category}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50 dark:bg-slate-800">Rating</td>
                  {compareList.map((p) => (
                    <td key={p._id} className="p-3 border-l border-slate-200 dark:border-slate-800 font-bold text-amber-500">
                      ★ {p.rating} ({p.reviewsCount} reviews)
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50 dark:bg-slate-800">Delivery Speed</td>
                  {compareList.map((p) => (
                    <td key={p._id} className="p-3 border-l border-slate-200 dark:border-slate-800 font-extrabold text-emerald-600">
                      {p.deliveryTime || '10-Min Express'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-500 bg-slate-50 dark:bg-slate-800">Key Specs</td>
                  {compareList.map((p) => (
                    <td key={p._id} className="p-3 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                      {p.specs ? (
                        <ul className="space-y-1">
                          {Object.entries(p.specs).map(([key, val]) => (
                            <li key={key} className="text-[11px]">
                              <span className="font-bold text-slate-800 dark:text-slate-200">{key}:</span> {val}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span>Standard Specifications</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductCompareModal;
