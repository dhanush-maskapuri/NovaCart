import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiUser,
  FiMapPin,
  FiSettings,
  FiShoppingBag,
  FiMail,
  FiPhone,
  FiEdit2,
  FiPlus,
  FiSave,
  FiCheckCircle,
  FiLogOut,
  FiLock,
  FiCreditCard,
  FiPackage,
  FiHeart,
} from 'react-icons/fi';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';
import { useAuth } from '../hooks/useAuth';
import { fadeIn } from '../animations/variants';

/**
 * Profile Page Component - Indian Marketplace Edition
 */
const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('info');

  const [name, setName] = useState(user?.name || 'Rahul Sharma');
  const [email, setEmail] = useState(user?.email || 'rahul@shopsphere.in');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveInfo = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6">
        <Breadcrumb items={[{ label: 'Account Profile' }]} />
        <EmptyState
          icon={FiLock}
          title="Sign in to view your profile"
          description="Please sign in to manage your Indian addresses, saved UPI IDs, and order invoices."
          actionLabel="Sign In Now"
          onAction={() => navigate('/login')}
        />
      </motion.div>
    );
  }

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6">
      <Breadcrumb items={[{ label: 'Account Profile' }]} />

      {/* Header Profile Card */}
      <div className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
              alt={user.name || name}
              className="w-20 h-20 rounded-full object-cover border-2 border-indigo-600 shadow-md"
            />
            <button
              aria-label="Edit avatar"
              className="absolute bottom-0 right-0 p-1.5 rounded-full bg-indigo-600 text-white shadow-md"
            >
              <FiEdit2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                {user.name || name}
              </h1>
              <Badge variant="primary">ShopSphere VIP</Badge>
            </div>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">{user.email || email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/orders"
            className="px-4 py-2 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 font-extrabold text-xs flex items-center gap-1.5"
          >
            <FiPackage className="w-4 h-4" />
            <span>My Orders</span>
          </Link>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<FiLogOut className="w-4 h-4 text-rose-500" />}
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Tabbed Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar Tabs */}
        <aside className="md:col-span-3 flex flex-col gap-1 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black transition-colors ${
              activeTab === 'info'
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <FiUser className="w-4 h-4" />
            <span>Personal Information</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black transition-colors ${
              activeTab === 'addresses'
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <FiMapPin className="w-4 h-4" />
            <span>Indian Address Book</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black transition-colors ${
              activeTab === 'payments'
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <FiCreditCard className="w-4 h-4" />
            <span>Saved UPI & Cards</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black transition-colors ${
              activeTab === 'settings'
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <FiSettings className="w-4 h-4" />
            <span>Security Settings</span>
          </button>
        </aside>

        {/* Tab Content Panel */}
        <main className="md:col-span-9 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xs">
          {/* Tab 1: Personal Info */}
          {activeTab === 'info' && (
            <form onSubmit={handleSaveInfo} className="space-y-6 max-w-xl">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  Personal Details
                </h3>
                <p className="text-xs text-slate-500">
                  Update your contact information for 10-Min Express delivery SMS updates
                </p>
              </div>

              {savedSuccess && (
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-xs font-bold text-emerald-600 flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4" />
                  <span>Profile details updated successfully!</span>
                </div>
              )}

              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                leftIcon={<FiUser className="w-4 h-4" />}
              />

              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<FiMail className="w-4 h-4" />}
              />

              <Input
                label="Mobile Number (India)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                leftIcon={<FiPhone className="w-4 h-4" />}
              />

              <Button type="submit" leftIcon={<FiSave className="w-4 h-4" />}>
                Save Changes
              </Button>
            </form>
          )}

          {/* Tab 2: Address Book */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                    Saved Shipping Addresses
                  </h3>
                  <p className="text-xs text-slate-500">
                    Manage delivery locations across Delhi, Bengaluru, Mumbai, etc.
                  </p>
                </div>
                <Button size="sm" leftIcon={<FiPlus className="w-4 h-4" />}>
                  Add New Address
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-3xl border-2 border-indigo-600 bg-indigo-50/20 dark:bg-indigo-950/20 relative">
                  <Badge variant="primary" className="mb-2">Default Home</Badge>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">Rahul Sharma</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    42, Barakhamba Road, Connaught Place<br />
                    New Delhi, Delhi - 110001<br />
                    Phone: +91 98765 43210
                  </p>
                </div>

                <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 relative">
                  <Badge variant="secondary" className="mb-2">Bengaluru Tech Park</Badge>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">Rahul Sharma</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    Embassy Tech Village, Outer Ring Road<br />
                    Bengaluru, Karnataka - 560103<br />
                    Phone: +91 98765 43210
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Saved Payments */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  Saved Payment Methods
                </h3>
                <p className="text-xs text-slate-500">
                  Manage your UPI IDs (GPay / PhonePe) & RuPay Cards
                </p>
              </div>

              <div className="space-y-3 max-w-md">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-extrabold text-indigo-600">Google Pay UPI</span>
                    <p className="font-mono text-slate-500">rahul@okicici</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Primary</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-extrabold text-slate-900 dark:text-slate-100">HDFC Bank RuPay Debit Card</span>
                    <p className="font-mono text-slate-500">•••• •••• •••• 4210</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Security Settings */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  Security & Notifications
                </h3>
                <p className="text-xs text-slate-500">
                  Manage account password and 2-Factor Authentication
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <Input label="Current Password" type="password" placeholder="••••••••" />
                <Input label="New Password" type="password" placeholder="••••••••" />
                <Button variant="secondary" size="sm">
                  Update Password
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </motion.div>
  );
};

export default Profile;
