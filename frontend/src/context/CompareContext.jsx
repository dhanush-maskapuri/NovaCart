import { createContext, useState, useContext, useEffect } from 'react';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState(() => {
    try {
      const saved = localStorage.getItem('novacart_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isGiftFinderOpen, setIsGiftFinderOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('novacart_compare', JSON.stringify(compareItems));
    } catch (e) {
      console.error('Error saving compare items:', e);
    }
  }, [compareItems]);

  const addToCompare = (product) => {
    if (!product) return;
    if (compareItems.some((item) => item._id === product._id)) {
      return;
    }
    if (compareItems.length >= 4) {
      alert('You can compare up to 4 products at a time.');
      return;
    }
    setCompareItems((prev) => [...prev, product]);
    setIsCompareOpen(true);
  };

  const removeFromCompare = (productId) => {
    setCompareItems((prev) => prev.filter((item) => item._id !== productId));
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  const isInCompare = (productId) => {
    return compareItems.some((item) => item._id === productId);
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        isCompareOpen,
        setIsCompareOpen,
        isGiftFinderOpen,
        setIsGiftFinderOpen,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
