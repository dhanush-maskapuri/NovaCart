import { createContext, useState, useEffect } from 'react';

/**
 * WishlistContext
 * Manages wishlist state with localStorage persistence and toggle functionality.
 */
export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('shopsphere_wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch {
      return [];
    }
  });

  // Sync wishlist state with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shopsphere_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  // Add an item to the wishlist
  const addToWishlist = (product) => {
    if (!product) return;
    const targetId = product._id || product.id;

    setWishlist((prev) => {
      const exists = prev.some((item) => (item._id || item.id) === targetId);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  // Remove an item from the wishlist by ID
  const removeFromWishlist = (productId) => {
    if (!productId) return;
    setWishlist((prev) => prev.filter((item) => (item._id || item.id) !== productId));
  };

  // Toggle item in wishlist (adds if not present, removes if present)
  const toggleWishlist = (product) => {
    if (!product) return;
    const targetId = product._id || product.id;
    if (isInWishlist(targetId)) {
      removeFromWishlist(targetId);
    } else {
      addToWishlist(product);
    }
  };

  // Check if an item is present in wishlist
  const isInWishlist = (productId) => {
    if (!productId) return false;
    return wishlist.some((item) => (item._id || item.id) === productId);
  };

  // Clear all wishlist items
  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

