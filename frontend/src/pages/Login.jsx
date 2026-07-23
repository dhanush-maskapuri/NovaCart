import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { FaGoogle, FaApple } from 'react-icons/fa';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ForgotPasswordModal from '../components/common/ForgotPasswordModal';
import { useAuth } from '../hooks/useAuth';
import { fadeIn } from '../animations/variants';

/**
 * Login Page Component
 * Minimal Apple/Stripe inspired authentication form with social sign-in and ForgotPasswordModal.
 */
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = login(email, password);
    if (res.success) {
      navigate('/shop');
    } else {
      setError(res.error || 'Invalid email or password');
    }
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="max-w-md mx-auto py-8 md:py-16"
    >
      <div className="p-8 md:p-10 bg-white dark:bg-dark-card border border-gray-200/80 dark:border-dark-border rounded-3xl shadow-xl space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Sign in to access your ShopSphere account & saved wishlist
          </p>
        </div>

        {/* Social Sign-In Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 dark:border-dark-border text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <FaGoogle className="w-4 h-4 text-red-500" />
            <span>Google</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 dark:border-dark-border text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <FaApple className="w-4 h-4" />
            <span>Apple</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-gray-200 dark:border-dark-border w-full" />
          <span className="bg-white dark:bg-dark-card px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider absolute">
            Or with email
          </span>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-xs font-semibold text-red-600 dark:text-red-400 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<FiMail className="w-4 h-4" />}
          />

          <Input
            label="Password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<FiLock className="w-4 h-4" />}
          />

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-400 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:bg-dark-bg"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              onClick={() => setIsForgotModalOpen(true)}
              className="font-semibold text-primary-600 dark:text-primary-400 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <Button type="submit" fullWidth rightIcon={<FiArrowRight className="w-4 h-4" />}>
            Sign In to ShopSphere
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100 dark:border-dark-border/60">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-primary-600 dark:text-primary-400 hover:underline">
              Create One
            </Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
    </motion.div>
  );
};

export default Login;

