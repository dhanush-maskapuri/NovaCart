import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGrid, FiPlus, FiTrash2, FiEdit2, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import { fetchAdminCategories, createAdminCategory, updateAdminCategory, deleteAdminCategory } from '../../services/adminService';
import { categories as initialCategories } from '../../data/categories';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '', icon: 'FiGrid', subcategories: '' });
  const [msg, setMsg] = useState({ type: '', text: '' });

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await fetchAdminCategories();
      if (res && res.success && Array.isArray(res.data)) {
        setCategories(res.data);
      } else {
        setCategories(initialCategories);
      }
    } catch {
      setCategories(initialCategories);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleOpenModal = (cat = null) => {
    setMsg({ type: '', text: '' });
    if (cat) {
      setEditingCategory(cat);
      setForm({
        name: cat.name || '',
        slug: cat.slug || '',
        icon: cat.icon || 'FiGrid',
        subcategories: Array.isArray(cat.subcategories) ? cat.subcategories.join(', ') : '',
      });
    } else {
      setEditingCategory(null);
      setForm({ name: '', slug: '', icon: 'FiGrid', subcategories: '' });
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setMsg({ type: 'error', text: 'Category name is required' });
      return;
    }

    const payload = {
      name: form.name,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-'),
      icon: form.icon,
      subcategories: form.subcategories ? form.subcategories.split(',').map((s) => s.trim()).filter(Boolean) : [],
    };

    try {
      if (editingCategory) {
        await updateAdminCategory(editingCategory._id, payload);
        setMsg({ type: 'success', text: 'Category updated successfully!' });
      } else {
        await createAdminCategory(payload);
        setMsg({ type: 'success', text: 'New category created!' });
      }
      setShowModal(false);
      await loadCategories();
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Error saving category' });
    }
  };

  const handleDelete = async (cat) => {
    if (!window.confirm(`Are you sure you want to delete '${cat.name}'?`)) return;
    try {
      await deleteAdminCategory(cat._id);
      setMsg({ type: 'success', text: 'Category deleted!' });
      await loadCategories();
    } catch (err) {
      alert(err.response?.data?.message || 'Cannot delete category containing active products.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FiGrid className="text-indigo-600" />
            <span>Category Taxonomy Management</span>
          </h1>
          <p className="text-xs text-slate-500">Manage 9+ Main Categories & Subcategory mappings</p>
        </div>
        <Button onClick={() => handleOpenModal()} leftIcon={<FiPlus />}>Add Category</Button>
      </div>

      {msg.text && (
        <div className={`p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 ${msg.type === 'error' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
          {msg.type === 'error' ? <FiAlertCircle /> : <FiCheckCircle />}
          <span>{msg.text}</span>
        </div>
      )}

      {loading ? (
        <p className="text-xs text-slate-400 font-bold py-8 text-center">Loading categories...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat._id || cat.id} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">{cat.name}</h3>
                <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{cat.slug}</span>
              </div>

              {cat.subcategories && cat.subcategories.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.subcategories.map((sub, i) => (
                    <span key={i} className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md">
                      {sub}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button onClick={() => handleOpenModal(cat)} className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold">
                  <FiEdit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(cat)} className="p-1.5 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold">
                  <FiTrash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingCategory ? 'Edit Category' : 'Create Category'}>
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Category Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Groceries" />
          <Input label="URL Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="e.g. groceries" />
          <Input label="Subcategories (Comma Separated)" value={form.subcategories} onChange={(e) => setForm({ ...form, subcategories: e.target.value })} placeholder="e.g. Dairy, Fruits, Snacks" />
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit">Save Category</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminCategories;
