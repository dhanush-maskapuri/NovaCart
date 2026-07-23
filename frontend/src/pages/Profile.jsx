import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from 'react-icons/fi';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';
import { useAuth } from '../hooks/useAuth';
import { fadeIn } from '../animations/variants';

/**
 * Profile Page Component
 * Tabbed user profile management for Personal Info, Address Book, and Security Settings.
 */
const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'addresses' | 'settings'

  const [name, setName] = useState(user?.name || 'Demo Customer');
  const [email, setEmail] = useState(user?.email || 'demo@shopsphere.com');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
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
          description="Please sign in with your ShopSphere account to manage your profile, addresses, and order settings."
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
      <div className="p-6 md:p-8 bg-white dark:bg-dark-card border border-gray-200/80 dark:border-dark-border rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              alt={user.name || name}
              className="w-20 h-20 rounded-full object-cover border-2 border-primary-500 shadow-md"
            />
            <button
              aria-label="Edit avatar"
              className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary-600 text-white shadow-md hover:bg-primary-700 transition-colors"
            >
              <FiEdit2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
                {user.name || name}
              </h1>
              <Badge variant="success">Pro Member</Badge>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{user.email || email}</p>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          leftIcon={<FiLogOut className="w-4 h-4 text-red-500" />}
          onClick={handleLogout}
        >
          Sign Out
        </Button>
      </div>

      {/* Main Tabbed Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar Tabs */}
        <aside className="md:col-span-3 flex flex-col gap-1 p-2 bg-white dark:bg-dark-card border border-gray-200/80 dark:border-dark-border rounded-2xl">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'info'
                ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <FiUser className="w-4 h-4" />
            <span>Personal Information</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'addresses'
                ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <FiMapPin className="w-4 h-4" />
            <span>Address Book</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'settings'
                ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <FiSettings className="w-4 h-4" />
            <span>Account Settings</span>
          </button>
        </aside>

        {/* Tab Content Panel */}
        <main className="md:col-span-9 bg-white dark:bg-dark-card border border-gray-200/80 dark:border-dark-border rounded-3xl p-6 md:p-8 shadow-xs">
          {/* Tab 1: Personal Info */}
          {activeTab === 'info' && (
            <form onSubmit={handleSaveInfo} className="space-y-6 max-w-xl">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Personal Details
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Update your contact details and profile preferences
                </p>
              </div>

              {savedSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-xs font-semibold text-emerald-600 flex items-center gap-2">
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
                label="Phone Number"
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
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Saved Shipping Addresses
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Manage default delivery addresses for 1-click checkout
                  </p>
                </div>
                <Button size="sm" leftIcon={<FiPlus className="w-4 h-4" />}>
                  Add Address
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border-2 border-primary-500 bg-primary-50/20 dark:bg-primary-950/20 relative">
                  <Badge variant="primary" className="mb-2">Default Shipping</Badge>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100">Alex Mercer</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    123 Market Street, Suite 400<br />
                    Tech City, CA 94103<br />
                    United States
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-gray-200 dark:border-dark-border relative hover:border-gray-300">
                  <Badge variant="secondary" className="mb-2">Office</Badge>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100">Alex Mercer</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    789 Innovation Way<br />
                    Silicon Valley, CA 94025<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Account Settings */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Security & Notifications
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Manage your account security and email alert settings
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

