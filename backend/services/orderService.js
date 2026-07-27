const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');
const Notification = require('../models/notificationModel');
const ApiError = require('../utils/apiError');

const createOrder = async (userId, orderData) => {
  const { orderItems, shippingAddress, paymentMethod = 'UPI / Cards', discount = 0, deliveryFee = 0 } = orderData;
  if (!orderItems || orderItems.length === 0) {
    throw ApiError.badRequest('No order items provided');
  }

  if (!shippingAddress) {
    throw ApiError.badRequest('Shipping address is required');
  }

  let subtotal = 0;
  const processedItems = [];

  // Stock verification & inventory decrement
  for (const item of orderItems) {
    const prodId = item.product || item._id;
    const product = await Product.findById(prodId);
    if (!product) {
      throw ApiError.notFound(`Product not found`);
    }

    if (product.stock < item.quantity) {
      throw ApiError.badRequest(`Insufficient stock for ${product.name}. Available: ${product.stock}`);
    }

    // Decrement stock
    product.stock -= item.quantity;
    if (product.stock === 0) {
      product.status = 'out_of_stock';
    }
    await product.save();

    const itemPrice = item.price || product.price;
    subtotal += itemPrice * item.quantity;

    processedItems.push({
      product: product._id,
      name: product.name,
      image: product.image || (product.images && product.images[0]?.url) || item.image,
      quantity: item.quantity,
      price: itemPrice,
      hsnCode: '8518',
    });
  }

  // Calculate GST Tax breakdown (18% inclusive)
  const totalGst = Math.round((subtotal * 18) / 118);
  const cgst = Math.round(totalGst / 2);
  const sgst = totalGst - cgst;
  const taxableAmount = subtotal - totalGst;

  const totalPrice = Math.max(0, subtotal - discount + deliveryFee);
  const invoiceNumber = `INV-2026-${Math.floor(100000 + Math.random() * 900000)}`;

  const formattedAddress = {
    fullName: shippingAddress.fullName || shippingAddress.name || 'Customer',
    phone: shippingAddress.phone || '9876543210',
    street: shippingAddress.street || `${shippingAddress.house || ''} ${shippingAddress.area || ''}`,
    city: shippingAddress.city || 'City',
    state: shippingAddress.state || 'State',
    zipCode: shippingAddress.zipCode || shippingAddress.pincode || '400001',
    country: shippingAddress.country || 'India',
  };

  const initialTimeline = [
    { status: 'Placed', timestamp: new Date(), location: 'NovaCart Warehouse', description: 'Order successfully placed & payment verified.' },
    { status: 'Confirmed', timestamp: new Date(Date.now() + 600000), location: 'Fulfillment Hub', description: 'Seller confirmed order item(s).' },
  ];

  const order = await Order.create({
    user: userId,
    orderItems: processedItems,
    shippingAddress: formattedAddress,
    paymentMethod,
    invoiceNumber,
    companyGstin: '27AAACN1234F1Z5',
    gstDetails: {
      taxableAmount,
      cgst,
      sgst,
      totalGst,
    },
    subtotal,
    discount,
    deliveryFee,
    totalPrice,
    isPaid: true,
    paidAt: new Date(),
    orderStatus: 'Placed',
    timeline: initialTimeline,
  });

  // Clear user cart after successful order creation
  await Cart.findOneAndUpdate({ user: userId }, { items: [], appliedCoupon: undefined, subtotal: 0, finalAmount: 0 });

  // Create notification
  await Notification.create({
    user: userId,
    title: '🎉 Order Placed Successfully!',
    message: `Your order #${order._id} (Invoice: ${order.invoiceNumber}) has been placed. Expected delivery by ${new Date(order.expectedDeliveryDate).toLocaleDateString('en-IN')}.`,
    type: 'order_placed',
    orderId: order._id,
  });

  return order;
};

const getUserOrders = async (userId) => {
  return await Order.find({ user: userId }).sort({ createdAt: -1 });
};

const getOrderById = async (orderId, userId) => {
  const order = await Order.findOne({ _id: orderId, user: userId }).populate('user', 'name email phone');
  if (!order) {
    throw ApiError.notFound('Order not found');
  }
  return order;
};

const cancelOrder = async (orderId, userId) => {
  const order = await Order.findOne({ _id: orderId, user: userId });
  if (!order) {
    throw ApiError.notFound('Order not found');
  }

  if (['Delivered', 'Cancelled', 'Returned'].includes(order.orderStatus)) {
    throw ApiError.badRequest(`Order cannot be cancelled in status: ${order.orderStatus}`);
  }

  order.orderStatus = 'Cancelled';
  order.cancelledAt = new Date();
  order.timeline.push({
    status: 'Cancelled',
    timestamp: new Date(),
    location: 'System Hub',
    description: 'Order was cancelled by the buyer.',
  });
  await order.save();

  // Restore inventory stock
  for (const item of order.orderItems) {
    const product = await Product.findById(item.product);
    if (product) {
      product.stock += item.quantity;
      if (product.stock > 0 && product.status === 'out_of_stock') {
        product.status = 'in_stock';
      }
      await product.save();
    }
  }

  // Create notification
  await Notification.create({
    user: userId,
    title: '❌ Order Cancelled',
    message: `Order #${order._id} has been cancelled. Refund initialized to original payment method.`,
    type: 'cancelled',
    orderId: order._id,
  });

  return order;
};

const returnOrder = async (orderId, userId) => {
  const order = await Order.findOne({ _id: orderId, user: userId });
  if (!order) {
    throw ApiError.notFound('Order not found');
  }

  if (order.orderStatus !== 'Delivered') {
    throw ApiError.badRequest('Only delivered orders can be requested for return.');
  }

  order.orderStatus = 'Returned';
  order.returnedAt = new Date();
  order.timeline.push({
    status: 'Returned',
    timestamp: new Date(),
    location: 'Reverse Logistics Hub',
    description: 'Return request submitted. Pickup scheduled within 48 hours.',
  });
  await order.save();

  await Notification.create({
    user: userId,
    title: '🔄 Return Initiated',
    message: `Return request submitted for Order #${order._id}. Courier rider assigned for pickup.`,
    type: 'returned',
    orderId: order._id,
  });

  return order;
};

const getOrderTracking = async (orderId, userId) => {
  const order = await Order.findOne({ _id: orderId, user: userId });
  if (!order) {
    throw ApiError.notFound('Order not found');
  }

  return {
    orderId: order._id,
    orderStatus: order.orderStatus,
    trackingId: order.trackingId,
    courierPartner: order.courierPartner,
    expectedDeliveryDate: order.expectedDeliveryDate,
    timeline: order.timeline,
  };
};

const reorderItems = async (orderId, userId) => {
  const order = await Order.findOne({ _id: orderId, user: userId });
  if (!order) {
    throw ApiError.notFound('Order not found');
  }

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  for (const item of order.orderItems) {
    const existingIndex = cart.items.findIndex(
      (it) => it.product.toString() === item.product.toString()
    );
    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += item.quantity;
    } else {
      cart.items.push({
        product: item.product,
        quantity: item.quantity,
        price: item.price,
      });
    }
  }

  await cart.save();
  return cart;
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  returnOrder,
  getOrderTracking,
  reorderItems,
};