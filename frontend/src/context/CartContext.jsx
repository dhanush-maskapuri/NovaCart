import { createContext, useState, useEffect, useCallback } from 'react';
import { fetchCart, addToCartApi, updateCartQuantityApi, removeFromCartApi, clearCartApi } from '../services/cartService';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('shopsphere_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);
  const [cartMeta, setCartMeta] = useState({ subtotal: 0, discount: 0, gst: 0, deliveryFee: 0, finalAmount: 0 });

  // Sync with Backend API if token exists
  const syncWithApi = useCallback(async () => {
    const token = localStorage.getItem('novacart_token') || localStorage.getItem('token');
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetchCart();
      if (res && res.success && res.data) {
        if (Array.isArray(res.data.items)) {
          const formatted = res.data.items.map((it) => ({
            ...it.product,
            product: it.product,
            quantity: it.quantity,
            _id: it.product?._id || it.product,
          }));
          setCart(formatted);
          setCartMeta({
            subtotal: res.data.subtotal || 0,
            discount: res.data.discount || 0,
            gst: res.data.gst || 0,
            deliveryFee: res.data.deliveryFee || 0,
            finalAmount: res.data.finalAmount || 0,
          });
        }
      }
    } catch (err) {
      console.warn('Cart API sync warning:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    syncWithApi();
  }, [syncWithApi]);

  // Sync cart changes with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shopsphere_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Add product to cart
  const addToCart = async (product, quantity = 1) => {
    if (!product) return;
    const productId = product._id || product.id;

    // Optimistic UI Update
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => (item._id || item.id || item.product?._id || item.product?.id) === productId
      );

      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        const newQty = (updatedCart[existingIndex].quantity || 1) + quantity;
        if (newQty <= 0) {
          return prevCart.filter(
            (item) => (item._id || item.id || item.product?._id || item.product?.id) !== productId
          );
        }
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: newQty,
        };
        return updatedCart;
      } else {
        if (quantity <= 0) return prevCart;
        return [...prevCart, { _id: productId, ...product, product, quantity }];
      }
    });

    const token = localStorage.getItem('novacart_token') || localStorage.getItem('token');
    if (token) {
      try {
        await addToCartApi(productId, quantity);
        await syncWithApi();
      } catch (err) {
        console.warn('Add to cart API call error:', err);
      }
    }
  };

  // Directly set item quantity
  const updateQuantity = async (productId, quantity) => {
    if (!productId) return;

    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter(
          (item) => (item._id || item.id || item.product?._id || item.product?.id) !== productId
        );
      }
      return prevCart.map((item) =>
        (item._id || item.id || item.product?._id || item.product?.id) === productId
          ? { ...item, quantity }
          : item
      );
    });

    const token = localStorage.getItem('novacart_token') || localStorage.getItem('token');
    if (token) {
      try {
        await updateCartQuantityApi(productId, quantity);
        await syncWithApi();
      } catch (err) {
        console.warn('Update quantity API call error:', err);
      }
    }
  };

  // Remove single product from cart
  const removeFromCart = async (productId) => {
    if (!productId) return;
    setCart((prevCart) =>
      prevCart.filter(
        (item) => (item._id || item.id || item.product?._id || item.product?.id) !== productId
      )
    );

    const token = localStorage.getItem('novacart_token') || localStorage.getItem('token');
    if (token) {
      try {
        await removeFromCartApi(productId);
        await syncWithApi();
      } catch (err) {
        console.warn('Remove from cart API call error:', err);
      }
    }
  };

  // Clear all items from cart
  const clearCart = async () => {
    setCart([]);
    const token = localStorage.getItem('novacart_token') || localStorage.getItem('token');
    if (token) {
      try {
        await clearCartApi();
      } catch (err) {
        console.warn('Clear cart API call error:', err);
      }
    }
  };

  const isInCart = (productId) => {
    if (!productId) return false;
    return cart.some(
      (item) => (item.product?._id || item.product?.id || item._id || item.id) === productId
    );
  };

  const totalCartItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + (item.price || item.product?.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        cartMeta,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isInCart,
        totalCartItems,
        cartSubtotal,
        syncWithApi,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
