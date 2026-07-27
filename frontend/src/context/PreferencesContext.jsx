import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { translations } from '../utils/translations';
import { formatCurrency as formatCurrencyUtil } from '../utils/formatters';

const PreferencesContext = createContext();

const DEFAULT_PREFERENCES = {
  language: 'English',
  currency: 'INR (₹)',
  currencySymbol: '₹',
  country: 'India',
  region: 'Karnataka / Bengaluru',
  timeZone: 'IST (UTC+5:30)',
  theme: 'system',
  emailNotifications: true,
  smsNotifications: true,
  fontSize: 'medium',
  reduceAnimations: false,
  privacyDataSharing: false,
  preferredDeliveryTime: 'Morning (8 AM - 12 PM)',
  preferredCategory: 'Mobiles & Electronics',
};

export const PreferencesProvider = ({ children }) => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem('novacart_preferences');
      return saved ? { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) } : DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('novacart_preferences', JSON.stringify(preferences));
    } catch (e) {
      console.error('Failed to save preferences:', e);
    }
  }, [preferences]);

  const updatePreferences = (newPrefs) => {
    setPreferences((prev) => ({ ...prev, ...newPrefs }));
  };

  const resetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES);
  };

  // Helper translation function
  const t = (key) => {
    const langDict = translations[preferences.language] || translations['English'];
    return langDict[key] || translations['English'][key] || key;
  };

  // Format currency helper using selected preferences
  const formatPrice = (amountInINR) => {
    return formatCurrencyUtil(amountInINR, preferences.currency);
  };

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        updatePreferences,
        resetPreferences,
        t,
        formatPrice,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
