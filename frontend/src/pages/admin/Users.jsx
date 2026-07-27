import { useState, useEffect } from 'react';
import { FiUsers, FiShield, FiUserCheck, FiSlash, FiCheckCircle } from 'react-icons/fi';
import { fetchAdminUsers, updateAdminUserRole, toggleAdminUserBlock } from '../../services/adminService';
import { formatCurrency, formatDate } from '../../utils/formatters';

/**
 * Admin Users Management Page - Connected to Live Backend REST APIs
 */
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await fetchAdminUsers();
      if (res && res.success && Array.isArray(res.data)) {
        setUsers(res.data);
      }
    } catch (err) {
      console.warn('Admin users fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleToggle = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!window.confirm(`Change user role to '${newRole}'?`)) return;
    try {
      await updateAdminUserRole(userId, newRole);
      await loadUsers();
    } catch (err) {
      alert('Error updating user role');
    }
  };

  const handleBlockToggle = async (userId) => {
    try {
      await toggleAdminUserBlock(userId);
      await loadUsers();
    } catch (err) {
      alert('Error toggling block status');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono font-bold uppercase text-indigo-400">
          USER & ROLES DIRECTORY
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
          Registered Accounts ({users.length})
        </h1>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-400 font-extrabold uppercase">
                <th className="p-4">User Name</th>
                <th className="p-4">Email Address</th>
                <th className="p-4">Mobile</th>
                <th className="p-4">Orders & Spending</th>
                <th className="p-4">Role</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400 font-bold">Loading users directory...</td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-4 font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <FiUserCheck className="w-4 h-4 text-indigo-600" />
                      <span>{u.name}</span>
                      {u.isBlocked && (
                        <span className="text-[10px] font-black bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">BLOCKED</span>
                      )}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400 font-mono">{u.email}</td>
                    <td className="p-4 font-mono">{u.phone || 'N/A'}</td>
                    <td className="p-4 font-bold">
                      <span className="text-slate-900 dark:text-slate-100 block">{u.ordersCount || 0} Orders</span>
                      <span className="text-indigo-600 text-[10px]">{formatCurrency(u.totalSpending || 0)}</span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleRoleToggle(u._id, u.role)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border uppercase ${
                          u.role === 'admin' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-100 text-slate-700 border-slate-300'
                        }`}
                      >
                        {u.role}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleBlockToggle(u._id)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold ${
                          u.isBlocked ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                        }`}
                      >
                        {u.isBlocked ? 'Unblock' : 'Block User'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
