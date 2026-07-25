import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiCheck } from 'react-icons/fi';
import { products as initialProducts } from '../../data/products';
import { formatCurrency } from '../../utils/formatters';

/**
 * Admin Products Management Page
 */
const AdminProducts = () => {
  const [productList, setProductList] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProd, setNewProd] = useState({
    name: '',
    brand: '',
    category: 'Electronics',
    price: '',
    originalPrice: '',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    deliveryTime: '10 Mins Express',
  });

  const filtered = productList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setProductList((prev) => prev.filter((p) => p._id !== id));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) return;
    const created = {
      _id: `prod-${Date.now()}`,
      ...newProd,
      price: Number(newProd.price),
      originalPrice: Number(newProd.originalPrice || newProd.price),
      rating: 4.9,
      reviewsCount: 1,
      inStock: true,
    };
    setProductList([created, ...productList]);
    setIsAddModalOpen(false);
    setNewProd({
      name: '',
      brand: '',
      category: 'Electronics',
      price: '',
      originalPrice: '',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      deliveryTime: '10 Mins Express',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase text-indigo-400">
            MERCHANT INVENTORY
          </span>
          <h1 className="text-3xl font-black text-white tracking-tight mt-1">
            Product Management ({productList.length})
          </h1>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-lg flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Filter catalog by product or brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs font-bold rounded-2xl border border-slate-800 bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-extrabold uppercase">
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price (₹)</th>
                <th className="p-4">Delivery Speed</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {filtered.map((prod) => (
                <tr key={prod._id} className="hover:bg-slate-800/40">
                  <td className="p-4 flex items-center gap-3 font-bold">
                    <img src={prod.image} alt={prod.name} className="w-10 h-10 object-cover rounded-xl border border-slate-700" />
                    <div>
                      <span className="block text-white line-clamp-1">{prod.name}</span>
                      <span className="text-[10px] text-indigo-400 font-mono">{prod.brand}</span>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-slate-400">{prod.category}</td>
                  <td className="p-4 font-black text-emerald-400">{formatCurrency(prod.price)}</td>
                  <td className="p-4 font-bold text-amber-400">{prod.deliveryTime || '10 Mins Express'}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-950 text-emerald-400 border border-emerald-800">
                      IN STOCK
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(prod._id)}
                      className="p-2 text-slate-400 hover:text-rose-500 rounded-xl"
                      title="Delete Product"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4 text-slate-100"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <h3 className="font-extrabold text-base text-white">Add New Product to Catalog</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400">
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4 text-xs font-bold">
                <div>
                  <label className="block text-slate-400 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. boAt Soundbar 500W"
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Brand</label>
                    <input
                      type="text"
                      placeholder="e.g. boAt"
                      value={newProd.brand}
                      onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Price (₹)</label>
                    <input
                      type="number"
                      required
                      placeholder="2499"
                      value={newProd.price}
                      onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;
