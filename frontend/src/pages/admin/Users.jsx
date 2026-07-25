import { useState } from 'react';
import { FiUsers, FiShield, FiUserCheck } from 'react-icons/fi';

/**
 * Admin Users Management Page
 */
const AdminUsers = () => {
  const [users] = useState([
    {
      id: 'usr-1',
      name: 'Demo Customer',
      email: 'demo@shopsphere.com',
      phone: '+91 98765 43210',
      role: 'Customer (VIP)',
      joined: 'July 2026',
      ordersCount: 4,
    },
    {
      id: 'usr-2',
      name: 'Rahul Sharma',
      email: 'rahul@shopsphere.in',
      phone: '+91 98123 45678',
      role: 'Customer (VIP)',
      joined: 'June 2026',
      ordersCount: 8,
    },
    {
      id: 'usr-3',
      name: 'Merchant Admin',
      email: 'admin@shopsphere.in',
      phone: '+91 1800 419 7467',
      role: 'Super Admin',
      joined: 'May 2026',
      ordersCount: 0,
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono font-bold uppercase text-indigo-400">
          USER & ROLES DIRECTORY
        </span>
        <h1 className="text-3xl font-black text-white tracking-tight mt-1">
          Registered Accounts ({users.length})
        </h1>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-extrabold uppercase">
                <th className="p-4">User Name</th>
                <th className="p-4">Email Address</th>
                <th className="p-4">Mobile</th>
                <th className="p-4">Role & Status</th>
                <th className="p-4">Member Since</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200 font-medium">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/40">
                  <td className="p-4 font-black text-white flex items-center gap-2">
                    <FiUserCheck className="w-4 h-4 text-indigo-400" />
                    <span>{u.name}</span>
                  </td>
                  <td className="p-4 text-slate-300 font-mono">{u.email}</td>
                  <td className="p-4 font-mono">{u.phone}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-950 text-indigo-300 border border-indigo-800 uppercase">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 font-bold">{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
