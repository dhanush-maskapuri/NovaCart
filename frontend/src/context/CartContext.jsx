import { createContext, useState, useEffect } from 'react';

/**
 * CartContext
 * Global Cart State Management with localStorage persistence, quantity updates, and duplicate prevention.
 */
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

  // Sync cart changes with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shopsphere_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Add product to cart or increment quantity if already present
  const addToCart = (product, quantity = 1) => {
    if (!product) return;
    const productId = product._id || product.id;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => (item.product?._id || item.product?.id) === productId
      );

      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        const newQty = updatedCart[existingIndex].quantity + quantity;
        if (newQty <= 0) {
          return prevCart.filter(
            (item) => (item.product?._id || item.product?.id) !== productId
          );
        }
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: newQty,
        };
        return updatedCart;
      } else {
        if (quantity <= 0) return prevCart;
        return [...prevCart, { product, quantity }];
      }
    });
  };

  // Directly set item quantity
  const updateQuantity = (productId, quantity) => {
    if (!productId) return;
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter(
          (item) => (item.product?._id || item.product?.id) !== productId
        );
      }
      return prevCart.map((item) =>
        (item.product?._id || item.product?.id) === productId
          ? { ...item, quantity }
          : item
      );
    });
  };

  // Remove single product from cart
  const removeFromCart = (productId) => {
    if (!productId) return;
    setCart((prevCart) =>
      prevCart.filter(
        (item) => (item.product?._id || item.product?.id) !== productId
      )
    );
  };

  // Clear all items from cart
  const clearCart = () => {
    setCart([]);
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    if (!productId) return false;
    return cart.some(
      (item) => (item.product?._id || item.product?.id) === productId
    );
  };

  // Derived properties
  const totalCartItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + (item.product?.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isInCart,
        totalCartItems,
        cartSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

