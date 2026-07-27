const validateOrderInput = (req) => {
  const { orderItems, shippingAddress, totalPrice } = req.body || {};
  const errors = [];

  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    errors.push('Order items array cannot be empty');
  }

  if (!shippingAddress || typeof shippingAddress !== 'object') {
    errors.push('Shipping address object is required');
  } else {
    const { street, city, state, zipCode } = shippingAddress;
    if (!street || !city || !state || !zipCode) {
      errors.push('Complete shipping address (street, city, state, zipCode) is required');
    }
  }

  if (totalPrice === undefined || isNaN(Number(totalPrice)) || Number(totalPrice) <= 0) {
    errors.push('Valid total order price is required');
  }

  return errors.length > 0 ? { error: errors } : { value: req.body };
};

module.exports = { validateOrderInput };