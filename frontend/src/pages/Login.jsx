import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff, FiShield } from 'react-icons/fi';
import { FaGoogle, FaApple } from 'react-icons/fa';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ForgotPasswordModal from '../components/common/ForgotPasswordModal';
import { useAuth } from '../hooks/useAuth';
import { googleLoginApi, appleLoginApi } from '../services/authService';
import { fadeIn } from '../animations/variants';
import { APP_NAME, APP_TAGLINE } from '../utils/constants';

/**
 * Login Page Component - NOVACART
 * Email & OTP Tabbed Authentication with Google & Apple OAuth Social Logins.
 */
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, setUser } = useAuth();

  const [authMode, setAuthMode] = useState('email'); // 'email' | 'otp'
  const [email, setEmail] = useState('demo@shopsphere.com');
  const [password, setPassword] = useState('123456');
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const redirectPath = location.state?.from?.pathname || '/profile';

  const handleGoogleLogin = async () => {
    setError('');
    try {
      const res = await googleLoginApi({ name: 'Rahul Sharma', email: 'rahul.google@novacart.in' });
      if (res && res.success && res.data) {
        localStorage.setItem('novacart_token', res.data.token);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        navigate(redirectPath, { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Google Login failed');
    }
  };

  const handleAppleLogin = async () => {
    setError('');
    try {
      const res = await appleLoginApi({ name: 'Rahul Sharma', email: 'rahul.apple@novacart.in' });
      if (res && res.success && res.data) {
        localStorage.setItem('novacart_token', res.data.token);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        navigate(redirectPath, { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Apple Login failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (authMode === 'email') {
        const res = await login(email, password);
        if (res.success) {
          navigate(redirectPath, { replace: true });
        } else {
          setError(res.error || 'Invalid email or password');
        }
      } else {
        if (!otpSent) {
          if (phone.length === 10) {
            setOtpSent(true);
          } else {
            setError('Please enter a valid 10-digit mobile number.');
          }
        } else {
          if (otp.length === 4) {
            const res = await login('demo@shopsphere.com', '123456');
            if (res.success) {
              navigate(redirectPath, { replace: true });
            }
          } else {
            setError('Enter 4-digit OTP code (e.g. 1234)');
          }
        }
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemo = () => {
    setEmail('demo@shopsphere.com');
    setPassword('123456');
    setError('');
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
            {APP_NAME} LOG IN
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Welcome to {APP_NAME}
          </h2>
          <p className="text-xs text-slate-500">{APP_TAGLINE}</p>
        </div>

        {/* Mode Switcher: Email vs OTP */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-black">
          <button
            type="button"
            onClick={() => {
              setAuthMode('email');
              setError('');
            }}
            className={`flex-1 py-2 rounded-xl transition-all ${
              authMode === 'email'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Email Login
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('otp');
              setError('');
            }}
            className={`flex-1 py-2 rounded-xl transition-all ${
              authMode === 'otp'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Mobile OTP Login
          </button>
        </div>

        {/* Social Sign-In Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <FaGoogle className="w-4 h-4 text-red-500" />
            <span>Google</span>
          </button>
          <button
            type="button"
            onClick={handleAppleLogin}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <FaApple className="w-4 h-4" />
            <span>Apple</span>
          </button>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-xs font-bold text-rose-600 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'email' ? (
            <>
              <Input
                label="Email Address"
                type="email"
                required
                placeholder="demo@shopsphere.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<FiMail className="w-4 h-4" />}
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftIcon={<FiLock className="w-4 h-4" />}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Mobile Number (10 Digits)</label>
                <div className="flex gap-2">
                  <span className="px-3 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-xs font-bold flex items-center">
                    +91
                  </span>
                  <input
                    type="text"
                    maxLength={10}
                    required
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 px-4 py-2.5 text-xs font-bold rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              {otpSent && (
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">Enter 4-Digit OTP Code</label>
                  <input
                    type="text"
                    maxLength={4}
                    required
                    placeholder="e.g. 1234"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs font-mono font-black rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 tracking-widest text-center"
                  />
                  <span className="text-[10px] font-bold text-emerald-600 mt-1 block text-center">
                    OTP sent to +91 {phone}! Use 1234
                  </span>
                </div>
              )}
            </>
          )}

          {authMode === 'email' && (
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400 font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <Button type="submit" fullWidth disabled={submitting}>
            {authMode === 'email' ? 'Sign In to NOVACART' : otpSent ? 'Verify OTP & Login' : 'Send OTP Code'}
          </Button>
        </form>

        {/* Demo Credentials Auto-Fill Button */}
        <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center">
          <button
            type="button"
            onClick={fillDemo}
            className="text-xs font-black text-indigo-600 dark:text-indigo-400 hover:underline flex items-center justify-center gap-1 mx-auto"
          >
            <FiShield className="w-4 h-4" />
            <span>Click to Auto-Fill Demo Account Credentials</span>
          </button>
        </div>

        <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs text-slate-500 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline">
              Create One
            </Link>
          </p>
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
    </motion.div>
  );
};

export default Login;
