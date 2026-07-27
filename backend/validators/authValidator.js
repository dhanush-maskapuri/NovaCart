const validateRegisterInput = (req) => {
  const { name, email, password, phone, address } = req.body || {};
  const errors = [];

  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.push('Full name is required');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    errors.push('Valid email address is required');
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (phone && !/^[0-9+\-\s]{8,15}$/.test(phone)) {
    errors.push('Invalid phone number format');
  }

  if (address && address.pincode && !/^\d{5,6}$/.test(address.pincode)) {
    errors.push('Pin code / Zip code must be 5 or 6 digits');
  }

  return errors.length > 0 ? { error: errors } : { value: req.body };
};

const validateLoginInput = (req) => {
  const { email, password } = req.body || {};
  const errors = [];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    errors.push('Valid email address is required');
  }

  if (!password) {
    errors.push('Password is required');
  }

  return errors.length > 0 ? { error: errors } : { value: req.body };
};

const validateForgotPasswordInput = (req) => {
  const { email } = req.body || {};
  const errors = [];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    errors.push('Valid email address is required');
  }

  return errors.length > 0 ? { error: errors } : { value: req.body };
};

const validateResetPasswordInput = (req) => {
  const { token, newPassword } = req.body || {};
  const errors = [];

  if (!token || typeof token !== 'string' || !token.trim()) {
    errors.push('Password reset token is required');
  }

  if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
    errors.push('New password must be at least 6 characters long');
  }

  return errors.length > 0 ? { error: errors } : { value: req.body };
};

const validateProfileUpdateInput = (req) => {
  const { name, phone, address } = req.body || {};
  const errors = [];

  if (name !== undefined && (!name || typeof name !== 'string' || !name.trim())) {
    errors.push('Full name cannot be empty');
  }

  if (phone && !/^[0-9+\-\s]{8,15}$/.test(phone)) {
    errors.push('Invalid phone number format');
  }

  if (address && address.pincode && !/^\d{5,6}$/.test(address.pincode)) {
    errors.push('Pin code must be 5 or 6 digits');
  }

  return errors.length > 0 ? { error: errors } : { value: req.body };
};

const validateChangePasswordInput = (req) => {
  const { currentPassword, newPassword } = req.body || {};
  const errors = [];

  if (!currentPassword) {
    errors.push('Current password is required');
  }

  if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
    errors.push('New password must be at least 6 characters long');
  }

  return errors.length > 0 ? { error: errors } : { value: req.body };
};

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateForgotPasswordInput,
  validateResetPasswordInput,
  validateProfileUpdateInput,
  validateChangePasswordInput,
};