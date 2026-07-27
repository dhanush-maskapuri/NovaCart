const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  location: { type: String, default: 'Warehouse Hub' },
  description: { type: String, default: '' },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        hsnCode: { type: String, default: '8518' },
      },
    ],
    shippingAddress: {
      fullName: { type: String, default: '' },
      phone: { type: String, default: '' },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true, default: 'India' },
    },
    paymentMethod: {
      type: String,
      required: true,
      default: 'UPI / Cards',
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    companyGstin: {
      type: String,
      default: '27AAACN1234F1Z5',
    },
    gstDetails: {
      taxableAmount: { type: Number, default: 0 },
      cgst: { type: Number, default: 0 },
      sgst: { type: Number, default: 0 },
      totalGst: { type: Number, default: 0 },
    },
    subtotal: {
      type: Number,
      required: true,
      default: 0.0,
    },
    discount: {
      type: Number,
      default: 0.0,
    },
    deliveryFee: {
      type: Number,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: true,
    },
    paidAt: {
      type: Date,
      default: Date.now,
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ['Placed', 'Confirmed', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned'],
      default: 'Placed',
    },
    trackingId: {
      type: String,
      default: () => `TRK-SFX-${Math.floor(100000000 + Math.random() * 900000000)}`,
    },
    courierPartner: {
      type: String,
      default: 'Shadowfax Express Rider',
    },
    expectedDeliveryDate: {
      type: Date,
      default: () => new Date(Date.now() + 86400000 * 2), // 2 days
    },
    timeline: [timelineSchema],
    deliveredAt: Date,
    cancelledAt: Date,
    returnedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
