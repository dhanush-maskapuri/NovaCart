const validateProductInput = (req) => {
  const { name, price, description, category, stock } = req.body || {};
  const errors = [];

  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.push('Product name is required');
  }

  if (price === undefined || isNaN(Number(price)) || Number(price) < 0) {
    errors.push('Valid non-negative product price is required');
  }

  if (!description || typeof description !== 'string') {
    errors.push('Product description is required');
  }

  if (!category || typeof category !== 'string') {
    errors.push('Product category is required');
  }

  if (stock === undefined || isNaN(Number(stock)) || Number(stock) < 0) {
    errors.push('Valid stock count is required');
  }

  return errors.length > 0 ? { error: errors } : { value: req.body };
};

module.exports = { validateProductInput };