import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiCheck } from 'react-icons/fi';
import { fetchAdminProducts, createAdminProduct, updateAdminProduct, deleteAdminProduct } from '../../services/adminService';
import { formatCurrency } from '../../utils/formatters';

/**
 * Admin Products Management Page - Connected to Live Admin REST APIs
 */
const AdminProducts = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProd, setNewProd] = useState({
    name: '',
    brand: '',
    category: 'Electronics',
    price: '',
    originalPrice: '',
    stock: 20,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description: '',
  });

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await fetchAdminProducts();
      if (res && res.success && Array.isArray(res.data)) {
        setProductList(res.data);
      }
    } catch (err) {
      console.warn('Admin products fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filtered = productList.filter((p) =>
    (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.brand || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product from catalog?')) return;
    try {
      await deleteAdminProduct(id);
      await loadProducts();
    } catch (err) {
      alert('Error deleting product');
    }
  };

  const handleOpenModal = (prod = null) => {
    if (prod) {
      setEditingProduct(prod);
      setNewProd({
        name: prod.name || '',
        brand: prod.brand || '',
        category: prod.category || 'Electronics',
        price: prod.price || '',
        originalPrice: prod.originalPrice || '',
        stock: prod.stock || 20,
        image: prod.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        description: prod.description || '',
      });
    } else {
      setEditingProduct(null);
      setNewProd({
        name: '',
        brand: '',
        category: 'Electronics',
        price: '',
        originalPrice: '',
        stock: 20,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        description: '',
      });
    }
    setIsAddModalOpen(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) return;

    try {
      const payload = {
        ...newProd,
        price: Number(newProd.price),
        originalPrice: Number(newProd.originalPrice || newProd.price),
        stock: Number(newProd.stock),
      };

      if (editingProduct) {
        await updateAdminProduct(editingProduct._id, payload);
      } else {
        await createAdminProduct(payload);
      }
      setIsAddModalOpen(false);
      await loadProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving product');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase text-indigo-400">
            MERCHANT INVENTORY
          </span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
            Product Management ({productList.length})
          </h1>
        </div>

        <button
          onClick={() => handleOpenModal()}
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
          className="w-full pl-10 pr-4 py-2.5 text-xs font-bold rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-400 font-extrabold uppercase">
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price (₹)</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400 font-bold">Loading catalog products...</td>
                </tr>
              ) : (
                filtered.map((prod) => (
                  <tr key={prod._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-4 flex items-center gap-3 font-bold">
                      <img src={prod.image} alt={prod.name} className="w-10 h-10 object-cover rounded-xl border border-slate-200" />
                      <div>
                        <span className="block text-slate-900 dark:text-slate-100 line-clamp-1">{prod.name}</span>
                        <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono">{prod.brand}</span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-slate-500">{prod.category}</td>
                    <td className="p-4 font-black text-indigo-600">{formatCurrency(prod.price)}</td>
                    <td className="p-4 font-black text-sm">{prod.stock || 0}</td>
                    <td className="p-4">
                      {(prod.stock || 0) === 0 ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-700">OUT OF STOCK</span>
                      ) : (prod.stock || 0) <= 5 ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-700">LOW STOCK</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700">IN STOCK</span>
                      )}
                    </td>
                    <td className="p-4 text-right flex gap-1 justify-end">
                      <button
                        onClick={() => handleOpenModal(prod)}
                        className="p-2 text-slate-500 hover:text-indigo-600 rounded-xl"
                        title="Edit Product"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(prod._id)}
                        className="p-2 text-slate-500 hover:text-rose-500 rounded-xl"
                        title="Delete Product"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4 text-slate-900 dark:text-slate-100"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-extrabold text-base">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400">
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4 text-xs font-bold">
                <div>
                  <label className="block text-slate-500 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. boAt Soundbar 500W"
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 mb-1">Brand</label>
                    <input
                      type="text"
                      placeholder="e.g. boAt"
                      value={newProd.brand}
                      onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Price (₹) *</label>
                    <input
                      type="number"
                      required
                      placeholder="2499"
                      value={newProd.price}
                      onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 mb-1">Category</label>
                    <input
                      type="text"
                      placeholder="Electronics"
                      value={newProd.category}
                      onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Initial Stock</label>
                    <input
                      type="number"
                      value={newProd.stock}
                      onChange={(e) => setNewProd({ ...newProd, stock: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 font-bold"
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
