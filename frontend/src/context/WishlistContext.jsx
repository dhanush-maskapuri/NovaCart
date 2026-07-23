import { createContext, useState } from 'react';

/**
 * WishlistContext
 * Manages wishlist state across the ShopSphere application.
 */
export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Add an item to the wishlist
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item._id === product._id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  // Remove an item from the wishlist by ID
  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item._id !== productId));
  };

  // Check if an item is present in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
