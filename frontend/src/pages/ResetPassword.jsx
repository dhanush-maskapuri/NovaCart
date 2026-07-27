import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiCheckCircle, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { resetPassword } from '../services/authService';
import { fadeIn } from '../animations/variants';
import { APP_NAME } from '../utils/constants';

/**
 * ResetPassword Page Component - NOVACART
 * Handles password reset verification via secret URL token.
 */
const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
    return { label: 'Strong', score: 100, color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(newPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!token) {
      setError('Missing or invalid password reset token in URL.');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await resetPassword(token, newPassword);
      setSuccessMessage(res.message || 'Password reset successfully! You can now log in with your new password.');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to reset password. Token may be invalid or expired.');
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
            {APP_NAME} SECURITY
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Reset Your Password
          </h2>
          <p className="text-xs text-slate-500">
            Enter your new password below to recover account access.
          </p>
        </div>

        {successMessage ? (
          <div className="flex flex-col items-center text-center gap-4 py-4">
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-emerald-600 rounded-full">
              <FiCheckCircle className="w-10 h-10" />
            </div>
            <h4 className="font-black text-lg text-slate-900 dark:text-slate-100">
              Password Reset Complete!
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {successMessage}
            </p>
            <Button onClick={() => navigate('/login')} fullWidth rightIcon={<FiArrowRight className="w-4 h-4" />}>
              Sign In to {APP_NAME}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-xs font-bold text-rose-600 text-center">
                {error}
              </div>
            )}

            <div className="space-y-1 relative">
              <Input
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                leftIcon={<FiLock className="w-4 h-4" />}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>

              {newPassword && (
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
              label="Confirm New Password"
              type="password"
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              leftIcon={<FiLock className="w-4 h-4" />}
            />

            <Button type="submit" fullWidth isDisabled={submitting} rightIcon={<FiArrowRight className="w-4 h-4" />}>
              {submitting ? 'Updating Password...' : 'Reset Password'}
            </Button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs text-slate-500 font-medium">
            Remembered your password?{' '}
            <Link to="/login" className="font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
