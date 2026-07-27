const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      index: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand name is required'],
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      index: true,
    },
    subcategory: {
      type: String,
      default: '',
      trim: true,
      index: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: 0,
      index: true,
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    gst: {
      type: Number,
      default: 18,
    },
    stock: {
      type: Number,
      required: [true, 'Stock count is required'],
      default: 0,
      min: 0,
    },
    sku: {
      type: String,
      default: '',
      trim: true,
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, default: '' },
      },
    ],
    image: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    specs: {
      type: Map,
      of: String,
      default: {},
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    seller: {
      type: String,
      default: 'NovaCart Official Retailer',
    },
    warranty: {
      type: String,
      default: '1 Year Manufacturer Warranty',
    },
    deliveryEstimate: {
      type: String,
      default: '10 Mins Express Delivery',
    },
    deliveryTime: {
      type: String,
      default: '10 Mins Express Delivery',
    },
    returnPolicy: {
      type: String,
      default: '7 Days Replacement Policy',
    },
    highlights: [
      {
        type: String,
      },
    ],
    tags: [
      {
        type: String,
        index: true,
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isTrending: {
      type: Boolean,
      default: false,
      index: true,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
      index: true,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
      index: true,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    offer: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'out_of_stock'],
      default: 'active',
    },
  },
  { timestamps: true }
);

// Virtual property to calculate stock availability
productSchema.virtual('inStock').get(function () {
  return this.stock > 0 && this.status !== 'out_of_stock';
});

// Middleware to sync image URL & status based on stock
productSchema.pre('save', function (next) {
  if (this.images && this.images.length > 0 && !this.image) {
    this.image = this.images[0].url;
  }
  if (!this.reviewsCount && this.numReviews) {
    this.reviewsCount = this.numReviews;
  } else if (!this.numReviews && this.reviewsCount) {
    this.numReviews = this.reviewsCount;
  }
  if (this.stock === 0) {
    this.status = 'out_of_stock';
  } else if (this.status === 'out_of_stock' && this.stock > 0) {
    this.status = 'active';
  }
  next();
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
