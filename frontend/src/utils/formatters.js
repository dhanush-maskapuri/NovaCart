import { CURRENCY } from './constants';

/**
 * Format raw number into currency format
 * @param {number} amount
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return `${CURRENCY}${Number(amount || 0).toLocaleString('en-IN')}`;
};

/**
 * Format date string into human readable format
 * @param {string} dateString
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
