import { createContext, useState, useEffect, useContext } from 'react';

export const RecentlyViewedContext = createContext();

export const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem('shopsphere_recently_viewed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('shopsphere_recently_viewed', JSON.stringify(recentlyViewed));
    } catch (e) {
      console.error('Error saving recently viewed products', e);
    }
  }, [recentlyViewed]);

  const addRecentlyViewed = (product) => {
    if (!product) return;
    const prodId = product._id || product.id;

    setRecentlyViewed((prev) => {
      // Avoid duplicates: filter out if already exists, then prepend
      const filtered = prev.filter((p) => (p._id || p.id) !== prodId);
      const updated = [product, ...filtered];
      // Max 10 products limit
      return updated.slice(0, 10);
    });
  };

  const removeRecentlyViewed = (productId) => {
    if (!productId) return;
    setRecentlyViewed((prev) => prev.filter((p) => (p._id || p.id) !== productId));
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  return (
    <RecentlyViewedContext.Provider
      value={{
        recentlyViewed,
        addRecentlyViewed,
        removeRecentlyViewed,
        clearRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
};
