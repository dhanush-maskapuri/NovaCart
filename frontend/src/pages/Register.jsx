import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { fadeIn } from '../animations/variants';
import { APP_NAME, APP_TAGLINE } from '../utils/constants';

/**
 * Register Page Component - NOVACART
 * Features Password Strength Meter, Terms Acceptance, & NOVACART Account Creation.
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

  // Password Strength Calculation
  const getPasswordStrength = (pass) => {
    if (!pass) return { label: 'Empty', score: 0, color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 2) return { label: 'Weak', score: 25, color: 'bg-rose-500' };
    if (score <= 4) return { label: 'Medium', score: 65, color: 'bg-amber-500' };
    return { label: 'Strong (Great)', score: 100, color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(password);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
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

    setSubmitting(true);
    try {
      const res = await register({ name: name.trim(), email: email.trim(), password });
      if (res.success) {
        navigate('/profile');
      } else {
        setError(res.error || 'Registration failed');
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="max-w-md mx-auto py-8 md:py-16"
    >
      <div className="p-8 md:p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
            JOIN {APP_NAME}
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Create your Account
          </h2>
          <p className="text-xs text-slate-500">{APP_TAGLINE}</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-xs font-bold text-rose-600 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            required
            placeholder="Rahul Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<FiUser className="w-4 h-4" />}
          />

          <Input
            label="Email Address"
            type="email"
            required
            placeholder="rahul@novacart.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<FiMail className="w-4 h-4" />}
          />

          <div className="space-y-1">
            <Input
              label="Password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<FiLock className="w-4 h-4" />}
            />

            {password && (
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-500">
                  <span>Password Strength:</span>
                  <span className={strength.score === 100 ? 'text-emerald-500' : 'text-slate-500'}>
                    {strength.label}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full ${strength.color} transition-all duration-300`}
                    style={{ width: `${strength.score}%` }}
                  />
                </div>
              </div>
            )}
          </div>

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
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 dark:text-slate-400 font-medium select-none">
              <input
                type="checkbox"
                required
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-indigo-600"
              />
              <span>
                I agree to the{' '}
                <a href="#terms" className="font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline">
                  Terms of Service
                </a>{' '}
                and GST Invoice policies.
              </span>
            </label>
          </div>

          <Button type="submit" fullWidth rightIcon={<FiArrowRight className="w-4 h-4" />}>
            Create {APP_NAME} Account
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs text-slate-500 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
