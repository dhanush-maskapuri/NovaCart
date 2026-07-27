import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiCheckCircle, FiExternalLink } from 'react-icons/fi';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import { forgotPassword } from '../../services/authService';

/**
 * ForgotPasswordModal Component
 * Interactive modal popup to trigger password recovery via backend API.
 */
const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetTokenInfo, setResetTokenInfo] = useState('');
  const [serverMessage, setServerMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');

    try {
      const res = await forgotPassword(email);
      setIsSent(true);
      if (res.message) {
        setServerMessage(res.message);
      }
      if (res.resetToken) {
        setResetTokenInfo(res.resetToken);
      } else if (res.data?.resetToken) {
        setResetTokenInfo(res.data.resetToken);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to process password reset');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsSent(false);
    setEmail('');
    setError('');
    setResetTokenInfo('');
    setServerMessage('');
    onClose();
  };

  const handleNavigateReset = () => {
    const token = resetTokenInfo;
    handleClose();
    if (token) {
      navigate(`/reset-password/${token}`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Reset Password" size="sm">
      {isSent ? (
        <div className="flex flex-col items-center text-center gap-3 py-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 rounded-full">
            <FiCheckCircle className="w-8 h-8" />
          </div>
          <h4 className="font-bold text-base text-gray-900 dark:text-gray-100">
            Reset Request Processed!
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {serverMessage || `Instructions sent to ${email}`}
          </p>
          {resetTokenInfo && (
            <div className="w-full p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 text-left space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 block">
                🔑 Password Reset Token Generated
              </span>
              <p className="text-xs font-mono text-indigo-700 dark:text-indigo-300 break-all bg-white dark:bg-slate-900 p-2 rounded-xl border border-indigo-100 dark:border-indigo-900">
                {resetTokenInfo}
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleNavigateReset}
                className="w-full flex items-center justify-center gap-1.5"
              >
                <span>Proceed to Password Reset Page</span>
                <FiExternalLink className="w-3.5 h-3.5" />
              </Button>
            </div>
          )}
          <Button onClick={handleClose} className="w-full mt-2">
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Enter your registered email address and we'll process your password reset request.
          </p>
          {error && (
            <div className="p-2.5 rounded-2xl bg-rose-50 text-rose-600 text-xs font-bold">
              {error}
            </div>
          )}
          <Input
            label="Email Address"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<FiMail className="w-4 h-4" />}
          />
          <Button type="submit" fullWidth isDisabled={loading}>
            {loading ? 'Processing...' : 'Send Reset Link'}
          </Button>
        </form>
      )}
    </Modal>
  );
};

export default ForgotPasswordModal;
