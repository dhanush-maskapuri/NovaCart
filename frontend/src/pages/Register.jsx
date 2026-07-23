import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { fadeIn } from '../animations/variants';

/**
 * Register Page Component
 * Clean Apple/Stripe inspired user registration page.
 */
const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Full Name is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service');
      return;
    }

    register({ name, email });
    navigate('/shop');
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
            Create your Account
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Join ShopSphere to get personalized AI recommendations and fast checkout
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-xs font-semibold text-red-600 dark:text-red-400 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            required
            placeholder="Alex Mercer"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<FiUser className="w-4 h-4" />}
          />

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

          <Input
            label="Confirm Password"
            type="password"
            required
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            leftIcon={<FiLock className="w-4 h-4" />}
          />

          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-600 dark:text-gray-400 select-none">
              <input
                type="checkbox"
                required
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:bg-dark-bg"
              />
              <span>
                I agree to the{' '}
                <a href="#terms" className="font-bold text-primary-600 dark:text-primary-400 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#privacy" className="font-bold text-primary-600 dark:text-primary-400 hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>

          <Button type="submit" fullWidth rightIcon={<FiArrowRight className="w-4 h-4" />}>
            Create Account
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100 dark:border-dark-border/60">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-primary-600 dark:text-primary-400 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;

