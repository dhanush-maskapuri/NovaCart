import { useState, useEffect } from 'react';
import { FiLayers, FiAlertTriangle, FiCheckCircle, FiEdit2 } from 'react-icons/fi';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import { fetchAdminInventory, updateAdminInventoryStock } from '../../services/adminService';
import { formatCurrency } from '../../utils/formatters';

const AdminInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [summary, setSummary] = useState({ totalProducts: 0, totalStock: 0, outOfStockCount: 0, lowStockCount: 0 });
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [newStock, setNewStock] = useState(0);

  const loadInventory = async () => {
    try {
      setLoading(true);
      const res = await fetchAdminInventory();
      if (res && res.success && res.data) {
        setInventory(res.data.inventory || []);
        setSummary(res.data.summary || {});
      }
    } catch (err) {
      console.warn('Inventory fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const handleUpdateStock = async (e) => {
    e.preventDefault();
    if (!editingItem) return;
    try {
      await updateAdminInventoryStock(editingItem._id, newStock);
      setEditingItem(null);
      await loadInventory();
    } catch (err) {
      alert('Error updating stock');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <FiLayers className="text-indigo-600" />
          <span>Warehouse Inventory Control</span>
        </h1>
        <p className="text-xs text-slate-500">Track stock levels, low-stock alerts, and SKU availability</p>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase text-slate-400">Total SKUs</span>
          <p className="text-xl font-black text-slate-900 dark:text-slate-100">{summary.totalProducts}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase text-slate-400">Total Units</span>
          <p className="text-xl font-black text-indigo-600">{summary.totalStock}</p>
        </div>
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
          <span className="text-[10px] font-bold uppercase text-amber-600">Low Stock (≤5)</span>
          <p className="text-xl font-black text-amber-600">{summary.lowStockCount}</p>
        </div>
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30">
          <span className="text-[10px] font-bold uppercase text-rose-600">Out of Stock (0)</span>
          <p className="text-xl font-black text-rose-600">{summary.outOfStockCount}</p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-extrabold uppercase text-slate-400">
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">SKU Code</th>
                <th className="py-3 px-4 text-center">Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-bold">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-bold">Loading inventory items...</td>
                </tr>
              ) : (
                inventory.map((item) => {
                  const stock = item.stock || 0;
                  let statusBadge = <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">IN_STOCK</span>;
                  if (stock === 0) statusBadge = <span className="text-[10px] font-black bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">OUT_OF_STOCK</span>;
                  else if (stock <= 5) statusBadge = <span className="text-[10px] font-black bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">LOW_STOCK</span>;

                  return (
                    <tr key={item._id}>
                      <td className="py-3 px-4 text-slate-900 dark:text-slate-100">{item.name}</td>
                      <td className="py-3 px-4 text-slate-500">{item.category}</td>
                      <td className="py-3 px-4 text-indigo-600">{formatCurrency(item.price)}</td>
                      <td className="py-3 px-4 font-mono text-slate-400">{item.SKU || `SKU-${item._id.slice(-6).toUpperCase()}`}</td>
                      <td className="py-3 px-4 text-center font-black text-sm">{stock}</td>
                      <td className="py-3 px-4">{statusBadge}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setEditingItem(item);
                            setNewStock(stock);
                          }}
                          className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs flex items-center gap-1 ml-auto"
                        >
                          <FiEdit2 className="w-3 h-3" /> Update Stock
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={!!editingItem} onClose={() => setEditingItem(null)} title="Update Stock Quantity">
        <form onSubmit={handleUpdateStock} className="space-y-4">
          <p className="text-xs font-bold text-slate-500">Updating inventory for: <strong className="text-slate-900 dark:text-slate-100">{editingItem?.name}</strong></p>
          <Input
            label="Stock Quantity *"
            type="number"
            value={newStock}
            onChange={(e) => setNewStock(Number(e.target.value))}
            min={0}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setEditingItem(null)}>Cancel</Button>
            <Button type="submit">Save Stock Level</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminInventory;
