import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import AdminLayout from '../components/layout/AdminLayout';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Wishlist from '../pages/Wishlist';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ResetPassword from '../pages/ResetPassword';
import Profile from '../pages/Profile';
import Orders from '../pages/Orders';
import Preferences from '../pages/Preferences';
import AIAssistantPage from '../pages/AIAssistantPage';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

// Admin Suite Pages
import AdminDashboard from '../pages/admin/Dashboard';
import AdminProducts from '../pages/admin/Products';
import AdminCategories from '../pages/admin/Categories';
import AdminInventory from '../pages/admin/Inventory';
import AdminOrders from '../pages/admin/Orders';
import AdminUsers from '../pages/admin/Users';
import AdminReviews from '../pages/admin/Reviews';

/**
 * AppRoutes Component - NOVACART Central Router with Preferences & Admin Route Guards
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Customer Marketplace Routes */}
      <Route path="/" element={<MainLayout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
        <Route path="ai-assistant" element={<AIAssistantPage />} />
        <Route path="preferences" element={<Preferences />} />

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="dashboard/preferences" element={<Preferences />} />
        </Route>

        {/* 404 Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Merchant Admin Portal Routes Protected by AdminRoute */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="reviews" element={<AdminReviews />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
