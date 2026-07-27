import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiGlobe,
  FiDollarSign,
  FiBell,
  FiEye,
  FiShield,
  FiTruck,
  FiCheck,
  FiRefreshCw,
} from 'react-icons/fi';
import { usePreferences } from '../context/PreferencesContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Preferences = () => {
  const { preferences, updatePreferences, resetPreferences } = usePreferences();
  const [activeTab, setActiveTab] = useState('regional');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e?.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            ACCOUNT & SHOPPING CONTROLS
          </span>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight mt-1">
            User Preferences Center
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Customize language, currency, accessibility, notification alerts, and shopping delivery options.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={resetPreferences} leftIcon={<FiRefreshCw />}>
            Reset Defaults
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave} leftIcon={<FiCheck />}>
            Save Preferences
          </Button>
        </div>
      </div>

      {savedSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-between"
        >
          <span>Preferences updated and saved successfully!</span>
          <FiCheck className="w-4 h-4" />
        </motion.div>
      )}

      {/* Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-black">
        {[
          { id: 'regional', label: 'Regional & Currency', icon: <FiGlobe /> },
          { id: 'notifications', label: 'Notifications & Alerts', icon: <FiBell /> },
          { id: 'accessibility', label: 'Accessibility & Theme', icon: <FiEye /> },
          { id: 'shopping', label: 'Delivery & Shopping', icon: <FiTruck /> },
          { id: 'privacy', label: 'Privacy & Data', icon: <FiShield /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-2xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <Card className="p-6">
        {activeTab === 'regional' && (
          <div className="space-y-6">
            <h3 className="text-base font-black flex items-center gap-2 text-indigo-600">
              <FiGlobe /> Language, Currency & Region
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold">
              <div>
                <label className="block text-slate-500 mb-2">Display Language</label>
                <select
                  value={preferences.language}
                  onChange={(e) => updatePreferences({ language: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
                >
                  <option>English</option>
                  <option>Hindi (हिंदी)</option>
                  <option>Telugu (తెలుగు)</option>
                  <option>Tamil (தமிழ்)</option>
                  <option>Kannada (కన్నడ)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 mb-2">Shopping Currency</label>
                <select
                  value={preferences.currency}
                  onChange={(e) => updatePreferences({ currency: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
                >
                  <option>INR (₹)</option>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 mb-2">Country / Marketplace</label>
                <input
                  type="text"
                  disabled
                  value={preferences.country}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-slate-500 mb-2">Region / State</label>
                <input
                  type="text"
                  value={preferences.region}
                  onChange={(e) => updatePreferences({ region: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h3 className="text-base font-black flex items-center gap-2 text-indigo-600">
              <FiBell /> Notification Preferences
            </h3>
            <div className="space-y-4 text-xs font-bold">
              <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
                <div>
                  <span className="block font-black text-sm">Email Order Notifications</span>
                  <span className="text-slate-400 font-normal">Receive order confirmation receipts and tracking updates via email.</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications}
                  onChange={(e) => updatePreferences({ emailNotifications: e.target.checked })}
                  className="w-5 h-5 accent-indigo-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
                <div>
                  <span className="block font-black text-sm">SMS Delivery Alerts</span>
                  <span className="text-slate-400 font-normal">Receive 10-minute NovaMart delivery arrival SMS alerts.</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.smsNotifications}
                  onChange={(e) => updatePreferences({ smsNotifications: e.target.checked })}
                  className="w-5 h-5 accent-indigo-600 rounded"
                />
              </label>
            </div>
          </div>
        )}

        {activeTab === 'accessibility' && (
          <div className="space-y-6">
            <h3 className="text-base font-black flex items-center gap-2 text-indigo-600">
              <FiEye /> Accessibility & Theme Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold">
              <div>
                <label className="block text-slate-500 mb-2">Application Theme</label>
                <select
                  value={preferences.theme}
                  onChange={(e) => updatePreferences({ theme: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
                >
                  <option value="system">System Default</option>
                  <option value="light">Light Mode</option>
                  <option value="dark">Dark Mode</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 mb-2">Font Size Accessibility</label>
                <select
                  value={preferences.fontSize}
                  onChange={(e) => updatePreferences({ fontSize: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
                >
                  <option value="small">Small (Compact)</option>
                  <option value="medium">Medium (Standard)</option>
                  <option value="large">Large (High Readability)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shopping' && (
          <div className="space-y-6">
            <h3 className="text-base font-black flex items-center gap-2 text-indigo-600">
              <FiTruck /> Preferred Delivery & Shopping Controls
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold">
              <div>
                <label className="block text-slate-500 mb-2">Preferred Delivery Time Slot</label>
                <select
                  value={preferences.preferredDeliveryTime}
                  onChange={(e) => updatePreferences({ preferredDeliveryTime: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
                >
                  <option>Morning (8 AM - 12 PM)</option>
                  <option>Afternoon (12 PM - 4 PM)</option>
                  <option>Evening (4 PM - 8 PM)</option>
                  <option>Instant 10-Min Express</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 mb-2">Favorite Category Shortcut</label>
                <select
                  value={preferences.preferredCategory}
                  onChange={(e) => updatePreferences({ preferredCategory: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
                >
                  <option>Mobiles & Electronics</option>
                  <option>Groceries (NovaMart)</option>
                  <option>Fashion & Apparel</option>
                  <option>Home & Appliances</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <h3 className="text-base font-black flex items-center gap-2 text-indigo-600">
              <FiShield /> Privacy & Data Preferences
            </h3>
            <div className="space-y-4 text-xs font-bold">
              <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
                <div>
                  <span className="block font-black text-sm">Personalized Analytics & Recommendations</span>
                  <span className="text-slate-400 font-normal">Allow local browsing history to personalize AI recommendations.</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.privacyDataSharing}
                  onChange={(e) => updatePreferences({ privacyDataSharing: e.target.checked })}
                  className="w-5 h-5 accent-indigo-600 rounded"
                />
              </label>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Preferences;
