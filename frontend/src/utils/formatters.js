import { CURRENCY } from './constants';

/**
 * Format raw number into Indian currency format (e.g., ₹1,49,999)
 * @param {number} amount
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  const numericVal = Number(amount || 0);
  return `${CURRENCY}${numericVal.toLocaleString('en-IN')}`;
};

/**
 * Format date string into human readable format
 * @param {string} dateString
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Calculate Indian GST breakdown (Standard 18% inclusive)
 * @param {number} totalAmount
 * @returns {object} Base price, CGST (9%), SGST (9%), Total GST
 */
export const calculateGST = (totalAmount = 0) => {
  const numericVal = Number(totalAmount || 0);
  const basePrice = Math.round((numericVal * 100) / 118);
  const totalGst = numericVal - basePrice;
  const cgst = Math.round(totalGst / 2);
  const sgst = totalGst - cgst;

  return {
    basePrice,
    cgst,
    sgst,
    totalGst,
  };
};

/**
 * Validate Indian Pincode format (6 digits)
 * @param {string} pincode
 * @returns {boolean}
 */
export const isValidPincode = (pincode) => {
  return /^[1-9][0-9]{5}$/.test(String(pincode).trim());
};

/**
 * Validate 10-digit Indian Mobile Number
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  const cleanPhone = String(phone || '').replace(/\D/g, '');
  return /^[6-9]\d{9}$/.test(cleanPhone);
};
