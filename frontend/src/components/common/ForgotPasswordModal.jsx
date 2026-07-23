import { useState } from 'react';
import { FiMail, FiCheckCircle } from 'react-icons/fi';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';

/**
 * ForgotPasswordModal Component
 * Interactive modal popup to trigger password recovery.
 */
const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSent(true);
    }
  };

  const handleClose = () => {
    setIsSent(false);
    setEmail('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Reset Password" size="sm">
      {isSent ? (
        <div className="flex flex-col items-center text-center gap-3 py-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 rounded-full">
            <FiCheckCircle className="w-8 h-8" />
          </div>
          <h4 className="font-bold text-base text-gray-900 dark:text-gray-100">
            Reset Link Sent!
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            We sent a password reset link to <strong className="text-gray-800 dark:text-gray-200">{email}</strong>. Please check your inbox.
          </p>
          <Button onClick={handleClose} className="w-full mt-2">
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Enter your registered email address and we'll send you instructions to reset your password.
          </p>
          <Input
            label="Email Address"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<FiMail className="w-4 h-4" />}
          />
          <Button type="submit" fullWidth>
            Send Reset Link
          </Button>
        </form>
      )}
    </Modal>
  );
};

export default ForgotPasswordModal;
