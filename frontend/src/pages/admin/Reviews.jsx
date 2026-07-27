import { useState, useEffect } from 'react';
import { FiStar, FiTrash2, FiMessageSquare } from 'react-icons/fi';
import { fetchAdminReviews, deleteAdminReview } from '../../services/adminService';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const res = await fetchAdminReviews();
      if (res && res.success && Array.isArray(res.data)) {
        setReviews(res.data);
      }
    } catch (err) {
      console.warn('Reviews fetch warning:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleDelete = async (productId, reviewId) => {
    if (!window.confirm('Delete this user review?')) return;
    try {
      await deleteAdminReview(productId, reviewId);
      await loadReviews();
    } catch (err) {
      alert('Error deleting review');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <FiMessageSquare className="text-indigo-600" />
          <span>Customer Review Moderation</span>
        </h1>
        <p className="text-xs text-slate-500">Approve or remove inappropriate customer product reviews</p>
      </div>

      {loading ? (
        <p className="text-xs text-slate-400 font-bold py-8 text-center">Loading customer reviews...</p>
      ) : reviews.length === 0 ? (
        <div className="p-8 text-center border border-dashed rounded-3xl text-xs font-bold text-slate-400">
          No customer reviews to moderate.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((rev) => (
            <div key={rev._id} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-slate-900 dark:text-slate-100">{rev.user}</span>
                <span className="flex items-center text-xs font-bold text-amber-500">
                  <FiStar className="fill-current mr-1" /> {rev.rating} / 5
                </span>
              </div>

              <p className="text-xs text-slate-500 font-bold">Product: <span className="text-indigo-600">{rev.productName}</span></p>
              <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                "{rev.comment}"
              </p>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] text-slate-400 font-semibold">{new Date(rev.createdAt || Date.now()).toLocaleDateString('en-IN')}</span>
                <button
                  onClick={() => handleDelete(rev.productId, rev._id)}
                  className="px-3 py-1 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold flex items-center gap-1 hover:bg-rose-100"
                >
                  <FiTrash2 className="w-3.5 h-3.5" /> Delete Review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
