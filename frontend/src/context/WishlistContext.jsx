import { createContext, useState, useEffect, useCallback } from 'react';
import { fetchWishlist, addToWishlistApi, removeFromWishlistApi, moveToCartApi, clearWishlistApi } from '../services/wishlistService';

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

  const [loading, setLoading] = useState(false);

  const syncWishlistWithApi = useCallback(async () => {
    const token = localStorage.getItem('novacart_token') || localStorage.getItem('token');
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetchWishlist();
      if (res && res.success && res.data && Array.isArray(res.data.products)) {
        setWishlist(res.data.products);
      }
    } catch (err) {
      console.warn('Wishlist API sync warning:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    syncWishlistWithApi();
  }, [syncWishlistWithApi]);

  useEffect(() => {
    try {
      localStorage.setItem('shopsphere_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  const addToWishlist = async (product) => {
    if (!product) return;
    const targetId = product._id || product.id;

    setWishlist((prev) => {
      const exists = prev.some((item) => (item._id || item.id) === targetId);
      if (exists) return prev;
      return [...prev, product];
    });

    const token = localStorage.getItem('novacart_token') || localStorage.getItem('token');
    if (token) {
      try {
        await addToWishlistApi(targetId);
        await syncWishlistWithApi();
      } catch (err) {
        console.warn('Add to wishlist API error:', err);
      }
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!productId) return;
    setWishlist((prev) => prev.filter((item) => (item._id || item.id) !== productId));

    const token = localStorage.getItem('novacart_token') || localStorage.getItem('token');
    if (token) {
      try {
        await removeFromWishlistApi(productId);
        await syncWishlistWithApi();
      } catch (err) {
        console.warn('Remove from wishlist API error:', err);
      }
    }
  };

  const moveToCartAction = async (product) => {
    if (!product) return;
    const productId = product._id || product.id;
    removeFromWishlist(productId);

    const token = localStorage.getItem('novacart_token') || localStorage.getItem('token');
    if (token) {
      try {
        await moveToCartApi(productId);
        await syncWishlistWithApi();
      } catch (err) {
        console.warn('Move to cart API error:', err);
      }
    }
  };

  const toggleWishlist = (product) => {
    if (!product) return;
    const targetId = product._id || product.id;
    if (isInWishlist(targetId)) {
      removeFromWishlist(targetId);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    if (!productId) return false;
    return wishlist.some((item) => (item._id || item.id) === productId);
  };

  const clearWishlist = async () => {
    setWishlist([]);
    const token = localStorage.getItem('novacart_token') || localStorage.getItem('token');
    if (token) {
      try {
        await clearWishlistApi();
      } catch (err) {
        console.warn('Clear wishlist API error:', err);
      }
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        moveToCartAction,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount: wishlist.length,
        syncWishlistWithApi,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
