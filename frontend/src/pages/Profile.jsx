import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser,
  FiMapPin,
  FiSettings,
  FiMail,
  FiPhone,
  FiEdit2,
  FiPlus,
  FiSave,
  FiCheckCircle,
  FiLogOut,
  FiLock,
  FiPackage,
  FiHeart,
  FiBell,
  FiEye,
  FiTrash2,
} from 'react-icons/fi';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';
import ProductGrid from '../components/product/ProductGrid';
import Modal from '../components/common/Modal';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { fetchAddresses, addAddressApi, updateAddressApi, deleteAddressApi, setDefaultAddressApi } from '../services/addressService';
import { fetchNotificationsApi, markAllNotificationsReadApi, clearNotificationsApi } from '../services/notificationService';
import { fadeIn } from '../animations/variants';
import { isValidPhone, isValidPincode } from '../utils/formatters';

/**
 * Profile & User Dashboard Component - Complete Address Book, Notifications & Recently Viewed
 */
const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, updateUserProfile, changePassword } = useAuth();
  const { wishlist = [] } = useWishlist();
  const { recentlyViewed = [], clearRecentlyViewed } = useRecentlyViewed();

  const [activeTab, setActiveTab] = useState('overview');

  // Form State
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Address Book State
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addrForm, setAddrForm] = useState({
    fullName: '',
    phone: '',
    house: '',
    street: '',
    city: '',
    state: 'Delhi',
    pincode: '',
    country: 'India',
    isDefault: false,
  });

  // Notifications State
  const [notifications, setNotifications] = useState([]);

  // Status Alerts
  const [savedSuccess, setSavedSuccess] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    try {
      const addrRes = await fetchAddresses();
      if (addrRes && addrRes.success && Array.isArray(addrRes.data)) {
        setAddresses(addrRes.data);
      }

      const notifRes = await fetchNotificationsApi();
      if (notifRes && notifRes.success && notifRes.data) {
        setNotifications(notifRes.data.notifications || []);
      }
    } catch (err) {
      console.warn('Dashboard data fetch warning:', err);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      loadData();
    }
  }, [user]);

  const handleSaveInfo = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSavedSuccess('');

    if (phone && !isValidPhone(phone)) {
      setErrorMsg('Please enter a valid 10-digit Indian phone number.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await updateUserProfile({ name, phone });
      if (res) {
        setSavedSuccess('Profile details updated successfully!');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update profile.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenAddressModal = (addr = null) => {
    setErrorMsg('');
    if (addr) {
      setEditingAddress(addr);
      setAddrForm({
        fullName: addr.fullName || '',
        phone: addr.phone || '',
        house: addr.house || '',
        street: addr.street || '',
        city: addr.city || '',
        state: addr.state || 'Delhi',
        pincode: addr.pincode || '',
        country: addr.country || 'India',
        isDefault: addr.isDefault || false,
      });
    } else {
      setEditingAddress(null);
      setAddrForm({
        fullName: user?.name || '',
        phone: user?.phone || '',
        house: '',
        street: '',
        city: '',
        state: 'Delhi',
        pincode: '',
        country: 'India',
        isDefault: addresses.length === 0,
      });
    }
    setShowAddressModal(true);
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!addrForm.fullName || !addrForm.house || !addrForm.street || !addrForm.city) {
      setErrorMsg('Please fill in all required address fields.');
      return;
    }

    if (!isValidPhone(addrForm.phone)) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (!isValidPincode(addrForm.pincode)) {
      setErrorMsg('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    setSubmitting(true);
    try {
      if (editingAddress) {
        await updateAddressApi(editingAddress._id, addrForm);
        setSavedSuccess('Address updated successfully!');
      } else {
        await addAddressApi(addrForm);
        setSavedSuccess('New address added to Address Book!');
      }
      setShowAddressModal(false);
      await loadData();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Error saving address.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;
    try {
      await deleteAddressApi(id);
      setSavedSuccess('Address deleted successfully.');
      await loadData();
    } catch (err) {
      setErrorMsg('Failed to delete address.');
    }
  };

  const handleSetDefaultAddress = async (id) => {
    try {
      await setDefaultAddressApi(id);
      setSavedSuccess('Default address updated!');
      await loadData();
    } catch (err) {
      setErrorMsg('Failed to set default address.');
    }
  };

  const handleChangePass = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSavedSuccess('');

    if (!currentPassword || !newPassword) {
      setErrorMsg('Please fill in both current and new password.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters long.');
      return;
    }

    setSubmitting(true);
    try {
      await changePassword({ currentPassword, newPassword });
      setSavedSuccess('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to change password.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6">
        <Breadcrumb items={[{ label: 'User Dashboard' }]} />
        <EmptyState
          icon={FiLock}
          title="Please Sign In"
          description="Sign in to access your saved address book, order history, and account settings."
          actionLabel="Go to Login"
          onAction={() => navigate('/login')}
        />
      </motion.div>
    );
  }

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-8">
      <Breadcrumb items={[{ label: 'My Account & Dashboard' }]} />

      {/* Header Banner */}
      <div className="relative p-6 md:p-8 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white shadow-xl overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
              alt={user.name}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white/20 object-cover shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-black">{user.name}</h1>
                <Badge variant="warning">Gold Member</Badge>
              </div>
              <p className="text-xs text-indigo-100 font-medium">{user.email} • {phone || '+91 Verified Mobile'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              leftIcon={<FiLogOut className="w-4 h-4" />}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Tabs & Details Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="md:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-xs space-y-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black transition-colors ${
              activeTab === 'overview'
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <FiUser className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black transition-colors ${
              activeTab === 'info'
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <FiEdit2 className="w-4 h-4" />
            <span>Personal Details</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black transition-colors ${
              activeTab === 'addresses'
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <FiMapPin className="w-4 h-4" />
            <span>Address Book ({addresses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black transition-colors ${
              activeTab === 'notifications'
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <FiBell className="w-4 h-4" />
            <span>Notifications ({notifications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black transition-colors ${
              activeTab === 'settings'
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <FiSettings className="w-4 h-4" />
            <span>Account Security</span>
          </button>
        </aside>

        {/* Tab Content Panel */}
        <main className="md:col-span-9 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xs">
          {savedSuccess && (
            <div className="p-3.5 mb-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-xs font-bold text-emerald-600 flex items-center gap-2">
              <FiCheckCircle className="w-4 h-4" />
              <span>{savedSuccess}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 mb-6 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-xs font-bold text-rose-600">
              {errorMsg}
            </div>
          )}

          {/* Section 1: Dashboard Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  to="/orders"
                  className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 hover:border-indigo-500 transition-all flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs text-slate-500 font-bold block">Order History</span>
                    <strong className="text-xl font-black text-slate-900 dark:text-slate-100">View Orders</strong>
                  </div>
                  <FiPackage className="w-8 h-8 text-indigo-600" />
                </Link>

                <Link
                  to="/wishlist"
                  className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 hover:border-indigo-500 transition-all flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs text-slate-500 font-bold block">Saved Wishlist</span>
                    <strong className="text-xl font-black text-slate-900 dark:text-slate-100">{wishlist.length} Items</strong>
                  </div>
                  <FiHeart className="w-8 h-8 text-rose-500" />
                </Link>

                <div
                  onClick={() => setActiveTab('addresses')}
                  className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 hover:border-indigo-500 transition-all flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <span className="text-xs text-slate-500 font-bold block">Address Book</span>
                    <strong className="text-xl font-black text-slate-900 dark:text-slate-100">{addresses.length} Addresses</strong>
                  </div>
                  <FiMapPin className="w-8 h-8 text-emerald-600" />
                </div>
              </div>

              {/* Recently Viewed Widget */}
              {recentlyViewed.length > 0 && (
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <FiEye className="text-indigo-600" />
                      <span>Recently Viewed Products ({recentlyViewed.length})</span>
                    </h3>
                    <button onClick={clearRecentlyViewed} className="text-xs font-bold text-rose-500 hover:underline">Clear History</button>
                  </div>
                  <ProductGrid products={recentlyViewed.slice(0, 4)} />
                </div>
              )}
            </div>
          )}

          {/* Section 2: Edit Profile */}
          {activeTab === 'info' && (
            <form onSubmit={handleSaveInfo} className="space-y-6 max-w-xl">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  ⚙ Personal Details & Contact Information
                </h3>
                <p className="text-xs text-slate-500">Update profile name and mobile number</p>
              </div>

              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                leftIcon={<FiUser className="w-4 h-4" />}
              />

              <Input
                label="Email Address (Registered)"
                type="email"
                disabled
                value={email}
                leftIcon={<FiMail className="w-4 h-4" />}
              />

              <Input
                label="Mobile Number (10 Digits)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                leftIcon={<FiPhone className="w-4 h-4" />}
              />

              <Button type="submit" isDisabled={submitting} leftIcon={<FiSave className="w-4 h-4" />}>
                {submitting ? 'Saving...' : 'Save Profile Changes'}
              </Button>
            </form>
          )}

          {/* Section 3: Address Book CRUD */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <FiMapPin className="w-5 h-5 text-indigo-600" />
                    <span>📍 Saved Delivery Addresses ({addresses.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500">Manage saved locations for 10-Min NovaMart & express logistics</p>
                </div>
                <Button onClick={() => handleOpenAddressModal()} size="sm" leftIcon={<FiPlus />}>
                  Add Address
                </Button>
              </div>

              {addresses.length === 0 ? (
                <div className="p-8 text-center border border-dashed rounded-3xl space-y-2">
                  <FiMapPin className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs font-bold text-slate-500">No saved addresses yet. Add your first address for fast checkout!</p>
                  <Button size="sm" onClick={() => handleOpenAddressModal()}>Add First Address</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div key={addr._id} className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 relative">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">{addr.fullName}</span>
                        {addr.isDefault ? (
                          <span className="text-[10px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded-full">DEFAULT</span>
                        ) : (
                          <button
                            onClick={() => handleSetDefaultAddress(addr._id)}
                            className="text-[10px] font-bold text-indigo-600 hover:underline"
                          >
                            Set Default
                          </button>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {addr.house}, {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-xs font-bold text-slate-500">Ph: {addr.phone}</p>

                      <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <button
                          onClick={() => handleOpenAddressModal(addr)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1 hover:bg-slate-200"
                        >
                          <FiEdit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(addr._id)}
                          className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold flex items-center gap-1 hover:bg-rose-100"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Section 4: Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <FiBell className="text-indigo-600" />
                    <span>User Notifications ({notifications.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500">Order updates, shipment alerts, and price drop notifications</p>
                </div>
                <button
                  onClick={async () => {
                    await markAllNotificationsReadApi();
                    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
                  }}
                  className="text-xs font-bold text-indigo-600 hover:underline"
                >
                  Mark All Read
                </button>
              </div>

              <div className="space-y-3">
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center font-bold">No notifications found.</p>
                ) : (
                  notifications.map((n, idx) => (
                    <div
                      key={n._id || idx}
                      className={`p-4 rounded-2xl border text-xs space-y-1 ${
                        n.isRead ? 'bg-slate-50 dark:bg-slate-950 border-slate-200' : 'bg-indigo-50/50 dark:bg-indigo-950/40 border-indigo-200'
                      }`}
                    >
                      <h4 className="font-extrabold text-slate-900 dark:text-slate-100">{n.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400">{n.message}</p>
                      <span className="text-[10px] text-slate-400 block font-semibold">
                        {new Date(n.createdAt || Date.now()).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Section 5: Security Settings */}
          {activeTab === 'settings' && (
            <form onSubmit={handleChangePass} className="space-y-6 max-w-xl">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  🔒 Password & Account Security
                </h3>
                <p className="text-xs text-slate-500">Update your account password</p>
              </div>

              <Input
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                leftIcon={<FiLock className="w-4 h-4" />}
              />

              <Input
                label="New Password (Min 6 Characters)"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                leftIcon={<FiLock className="w-4 h-4" />}
              />

              <Button type="submit" isDisabled={submitting} leftIcon={<FiSave className="w-4 h-4" />}>
                {submitting ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          )}
        </main>
      </div>

      {/* Address Form Modal */}
      <Modal isOpen={showAddressModal} onClose={() => setShowAddressModal(false)} title={editingAddress ? 'Edit Address' : 'Add New Address'}>
        <form onSubmit={handleSaveAddress} className="space-y-4">
          <Input
            label="Full Name *"
            value={addrForm.fullName}
            onChange={(e) => setAddrForm({ ...addrForm, fullName: e.target.value })}
            placeholder="Recipient's full name"
          />

          <Input
            label="Mobile Number (10 Digits) *"
            value={addrForm.phone}
            onChange={(e) => setAddrForm({ ...addrForm, phone: e.target.value })}
            placeholder="e.g. 9876543210"
          />

          <Input
            label="House / Flat / Building No. *"
            value={addrForm.house}
            onChange={(e) => setAddrForm({ ...addrForm, house: e.target.value })}
          />

          <Input
            label="Street / Road / Landmark *"
            value={addrForm.street}
            onChange={(e) => setAddrForm({ ...addrForm, street: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City *"
              value={addrForm.city}
              onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })}
            />
            <Input
              label="PIN Code (6 Digits) *"
              value={addrForm.pincode}
              onChange={(e) => setAddrForm({ ...addrForm, pincode: e.target.value.replace(/\D/g, '') })}
              maxLength={6}
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isDefaultCheck"
              checked={addrForm.isDefault}
              onChange={(e) => setAddrForm({ ...addrForm, isDefault: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <label htmlFor="isDefaultCheck" className="text-xs font-bold text-slate-700 dark:text-slate-300">Set as Default Delivery Address</label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="secondary" onClick={() => setShowAddressModal(false)}>Cancel</Button>
            <Button type="submit" isDisabled={submitting}>{submitting ? 'Saving...' : 'Save Address'}</Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};

export default Profile;
