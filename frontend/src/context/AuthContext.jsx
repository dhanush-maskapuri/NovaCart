import { createContext, useState, useEffect } from 'react';

/**
 * AuthContext
 * Manages mock user authentication, login validation, and session persistence in localStorage.
 */
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('shopsphere_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  // Sync user state with localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('shopsphere_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('shopsphere_user');
      }
    } catch (e) {
      console.error('Failed to sync auth state with localStorage', e);
    }
  }, [user]);

  // Mock Login Verification
  const login = (email, password) => {
    if (email === 'demo@shopsphere.com' && password === '123456') {
      const loggedUser = {
        name: 'Demo Customer',
        email: 'demo@shopsphere.com',
        role: 'customer',
        memberSince: 'July 2026',
      };
      setUser(loggedUser);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  // Mock Registration
  const register = (userData) => {
    const newUser = {
      name: userData.name,
      email: userData.email,
      role: 'customer',
      memberSince: 'July 2026',
    };
    setUser(newUser);
    return { success: true };
  };

  // Logout action
  const logout = () => {
    setUser(null);
    localStorage.removeItem('shopsphere_user');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

