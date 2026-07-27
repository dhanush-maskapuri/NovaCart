export const CURRENCY = '₹';

export const CURRENCY_RATES = {
  'INR (₹)': { rate: 1, symbol: '₹' },
  'USD ($)': { rate: 0.012, symbol: '$' },
  'EUR (€)': { rate: 0.011, symbol: '€' },
  'GBP (£)': { rate: 0.0095, symbol: '£' },
  'JPY (¥)': { rate: 1.78, symbol: '¥' },
  'AED (DH)': { rate: 0.044, symbol: 'AED ' },
};

/**
 * Format raw number into dynamic currency format (e.g. ₹1,49,999, $1,799.98)
 * @param {number} amountInINR
 * @param {string} currencyStr
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amountInINR, currencyStr = 'INR (₹)') => {
  const numericVal = Number(amountInINR || 0);
  const curr = CURRENCY_RATES[currencyStr] || CURRENCY_RATES['INR (₹)'];
  const converted = Math.round(numericVal * curr.rate);
  return `${curr.symbol}${converted.toLocaleString()}`;
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
    taxableAmount: basePrice,
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
